from fastapi import FastAPI, UploadFile, File, HTTPException
from pydantic import BaseModel
import logging
import uvicorn
# from pyngrok import ngrok
from fastapi.middleware.cors import CORSMiddleware
# import nest_asyncio
# import threading


from pytesseract import image_to_string
from PIL import Image
import pypdfium2 as pdfium
from tempfile import NamedTemporaryFile
import pandas as pd
import json
import requests
import os
from tempfile import NamedTemporaryFile
import time
from io import BytesIO
from typing import List, Union, Dict
from pydantic import BaseModel
import logging
from haystack.components.builders import PromptBuilder
import os
from haystack import Pipeline
from haystack_integrations.components.generators.google_ai import GoogleAIGeminiGenerator

# Set Google API key
os.environ["GOOGLE_API_KEY"] = env.apikey

# Set logging configuration
logging.basicConfig()
logging.getLogger("canals.pipeline.pipeline").setLevel(logging.DEBUG)

# Function to convert PDF to images


def convert_pdf_to_images(file_data: bytes, scale=300/72):
    pdf_file = pdfium.PdfDocument(BytesIO(file_data))
    page_indices = [i for i in range(len(pdf_file))]
    renderer = pdf_file.render(
        pdfium.PdfBitmap.to_pil, page_indices=page_indices, scale=scale)
    final_images = []
    for i, image in zip(page_indices, renderer):
        image_byte_array = BytesIO()
        image.save(image_byte_array, format='jpeg', optimize=True)
        image_byte_array = image_byte_array.getvalue()
        final_images.append({i: image_byte_array})
    return final_images

# Function to extract text from images


def extract_text_from_img(list_dict_final_images):
    image_list = [list(data.values())[0] for data in list_dict_final_images]
    image_content = []
    for index, image_bytes in enumerate(image_list):
        image = Image.open(BytesIO(image_bytes))
        raw_text = str(image_to_string(image))
        image_content.append(raw_text)
    return "\n".join(image_content)

# Function to extract content from PDF


def extract_content_from_pdf(file_data: bytes) -> str:
    images_list = convert_pdf_to_images(file_data)
    text_with_pytesseract = extract_text_from_img(images_list)
    return text_with_pytesseract

# Function to extract text from image data


def extract_text_from_image_data(image_data: bytes) -> str:
    image = Image.open(BytesIO(image_data))
    text = image_to_string(image)
    return text

# Function to run LLM pipeline


def final_llm(file_data: Union[bytes, Dict[str, bytes]]):
    # Extract content based on file type
    if isinstance(file_data, bytes):
        content = extract_content_from_pdf(file_data)
    elif isinstance(file_data, dict):
        image_data = file_data.get('file')
        if image_data:
            content = extract_text_from_image_data(image_data)
        else:
            raise ValueError(
                "Invalid file data format. Provide a 'file' key with image data.")
    else:
        raise ValueError(
            "Invalid file data type. Provide either bytes or a dictionary.")

    # Define prompt template and schema
    prompt_template = """Create a JSON object from the information present in this passage: {{passage}}.Format dates in the response as "YYYY-MM-DD".
    Only use information that is present in the passage. Follow this JSON schema, but only return the actual instances without any additional schema definition:
    {{schema}}
    Make sure your response is a dict not a list.

    {% if invalid_replies and error_message %}
    You already created the following output in a previous attempt: {{invalid_replies}}
    However, this doesn't comply with the format requirements from above and triggered this Python exception: {{error_message}}
    Correct the output and try again. Just return the corrected output without any extra explanations.
    {% endif %}
    """

    json_schema = InvoiceData.schema_json(indent=2)

    # Initialize pipeline components
    generator = GoogleAIGeminiGenerator(model="gemini-pro")
    prompt_builder = PromptBuilder(template=prompt_template)
    pipeline = Pipeline(max_loops_allowed=5)
    pipeline.add_component(instance=prompt_builder, name="prompt_builder")
    pipeline.add_component(instance=generator, name="llm")
    pipeline.connect("prompt_builder", "llm")

    # Run the pipeline
    passage = content
    result = pipeline.run(
        {"prompt_builder": {"passage": passage, "schema": json_schema}})

    return result

# Example JSON schema and classes


class Invoice(BaseModel):
    due_date: str
    client_name: str
    client_address: str
    client_email: str
    client_phone: str
    supplier_name: str
    supplier_address: str
    supplier_email: str
    supplier_phone: str
    tax: float
    sub_total: float
    grand_total: float


class InvoiceData(BaseModel):
    cities: List[Invoice]

# file_path = 'image.png'  # Replace 'example.pdf' with the path to your file
# with open(file_path, 'rb') as file:
#    file_data = file.read()


# Call final_llm function with file data
# result = final_llm(file_data)

# Print the result
# print(result)

def process_output(output):
    # Extract the first answer from the output
    answer = output.get('llm', {}).get('answers', ['{}'])[0]

    # Parse the JSON string to a dictionary
    answer_data = json.loads(answer)

    # Extract the first city from the answer data
    city_data = answer_data.get('cities', [{}])[0]

    # Create a new dictionary with the desired format
    processed_output = {
        "invoice_number": city_data.get('invoice_number'),
        "bill_date": city_data.get('bill_date'),
        "due_date": city_data.get('due_date'),
        "client_name": city_data.get('client_name'),
        "client_address": city_data.get('client_address'),
        "client_email": city_data.get('client_email'),
        "client_phone": city_data.get('client_phone'),
        "supplier_name": city_data.get('supplier_name'),
        "supplier_address": city_data.get('supplier_address'),
        "supplier_email": city_data.get('supplier_email'),
        "supplier_phone": city_data.get('supplier_phone'),
        "tax": city_data.get('tax'),
        "sub_total": city_data.get('sub_total'),
        "grand_total": city_data.get('grand_total'),
    }

    return processed_output


app = FastAPI()

# Allow CORS for all origins during development (replace "*" with your actual frontend URL in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)


@app.post("/process_file/")
async def process_file(file: UploadFile = File(...)):
    try:
        # Read file data
        file_data = await file.read()

        # Call final_llm function with file data
        result = final_llm(file_data)

        # Process the output to match the desired format
        processed_result = process_output(result)

        # Return the processed result
        return {"result": processed_result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
