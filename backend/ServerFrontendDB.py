from fastapi import FastAPI, Depends, HTTPException, UploadFile, File, Form
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel, EmailStr
from typing import Optional, Dict, List
import base64
import psycopg2
from psycopg2.extras import DictCursor
from fastapi.middleware.cors import CORSMiddleware
import io

DATABASE_URL = "dbname=aws_invoice user=aws_invoice_user password=oFsKPV03cSTIvRFwmkEiiJhnc99dNhxp host=dpg-cnu1hgda73kc73f5966g-a.singapore-postgres.render.com port=5432"

app = FastAPI()

# Allow CORS for all origins during development (replace "*" with your actual frontend URL in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

class Invoice(BaseModel):
    invoice_number: str
    bill_date: str
    due_date: str
    client_name: str
    client_address: str
    client_email: EmailStr
    client_phone: str
    supplier_name: str
    supplier_address: str
    supplier_email: EmailStr
    supplier_phone: str
    tax: float
    sub_total: float
    grand_total: float
    remark: Optional[str] = None
    image: Optional[str] = None
    employee_id: int

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/invoices/")
async def create_invoice(
    invoice_number: str = Form(...),
    bill_date: str = Form(...),
    due_date: str = Form(...),
    client_name: str = Form(...),
    client_address: str = Form(...),
    client_email: str = Form(...),
    client_phone: str = Form(...),
    supplier_name: str = Form(...),
    supplier_address: str = Form(...),
    supplier_email: str = Form(...),
    supplier_phone: str = Form(...),
    tax: float = Form(...),
    sub_total: float = Form(...),
    grand_total: float = Form(...),
    remark: str = Form(None),
    image: str = Form(None),
    employee_id: int = Form(...),
    file: UploadFile = File(...)
):
    conn = psycopg2.connect(DATABASE_URL)
    cursor = conn.cursor()

    # Convert the file to bytes
    file_bytes = await file.read()

    insert = f"""
        INSERT INTO "invoice_forms2" (invoice_number, bill_date, due_date, client_name, client_address, client_email, client_phone, supplier_name, supplier_address, supplier_email, supplier_phone, tax, sub_total, grand_total, remark, image, employee_id, file_data)
        VALUES ('{invoice_number}', '{bill_date}', '{due_date}', '{client_name}', '{client_address}', '{client_email}', '{client_phone}', '{supplier_name}',
                '{supplier_address}', '{supplier_email}', '{supplier_phone}', {tax}, {sub_total}, {grand_total}, '{remark}', '{image}', {employee_id}, {psycopg2.Binary(file_bytes)})
    """

    cursor.execute(insert)
    conn.commit()

    cursor.close()
    conn.close()

    return {"status": "Invoice created"}
@app.post("/upload-image/")
async def upload_image(file: UploadFile = File(...)) -> Dict:
    return {
        "invoice_number": "141671",
        "bill_date": "2022-10-04",
        "due_date": "2022-11-04",
        "client_name": "Client Name",
        "client_address": "Client Address",
        "client_email": "client@example.com",
        "client_phone": "1234567890",
        "supplier_name": "Supplier Name",
        "supplier_address": "Supplier Address",
        "supplier_email": "supplier@example.com",
        "supplier_phone": "0987654321",
        "tax": 10.0,
        "sub_total": 100.0,
        "grand_total": 110.0,
        "remark": "Sample remark",
        "image": file.filename,
        "employee_id": 1
    }

@app.get("/getinvoices/{employee_id}")
async def get_invoices(employee_id: int):
    conn = psycopg2.connect(DATABASE_URL)
    cursor = conn.cursor()

    # Fetch the invoice details
    select_invoices = f"""
        SELECT invoice_number, status FROM "invoice_forms2" WHERE employee_id = {employee_id}
    """
    cursor.execute(select_invoices)
    invoices = cursor.fetchall()

    # Fetch the employee details
    select_employee = f"""
        SELECT employee_name, employee_phone, employee_email, employee_address, employee_dept FROM "employee_details" WHERE employee_id = {employee_id}
    """
    cursor.execute(select_employee)
    employee = cursor.fetchone()

    cursor.close()
    conn.close()

    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    return {
        "count": len(invoices),
        "invoices": [{"invoice_number": invoice[0], "status": invoice[1]} for invoice in invoices],
        "employeedetails": {
            "name": employee[0],
            "phone": employee[1],
            "email": employee[2],
            "address": employee[3],
            "dept": employee[4],
        },
    }
@app.get("/allinvoices/")
async def get_invoices():
    conn = psycopg2.connect(DATABASE_URL)
    cursor = conn.cursor()


    cursor.execute("""SELECT invoice_id, invoice_number, status, client_name FROM "invoice_forms2" """)
    invoices = cursor.fetchall()

    cursor.close()
    conn.close()

    return {"invoices": invoices}

@app.get("/selectedinvoice/{invoice_id}")
async def get_invoice(invoice_id: int):
    conn = psycopg2.connect(DATABASE_URL)
    cursor = conn.cursor(cursor_factory=DictCursor)

    cursor.execute(f"""SELECT * FROM "invoice_forms2" WHERE invoice_id = {invoice_id}""")
    invoice = cursor.fetchone()

    cursor.close()
    conn.close()

    if invoice['file_data'] is not None:
        # Convert the file data to a base64 string
        file_data = invoice['file_data']
        base64_string = base64.b64encode(file_data).decode()

        # Prepend the appropriate MIME type to create a data URL
        data_url = f"data:application/pdf;base64,{base64_string}"

        # Replace the file data with the data URL
        invoice['file_data'] = data_url
    

    return {"invoice": invoice}



class InvoiceStatus(BaseModel):
    invoice_id: int
    status: str

@app.post("/statuschange/")
async def change_status(invoice_status: InvoiceStatus):
    conn = psycopg2.connect(DATABASE_URL)
    cursor = conn.cursor()

    update = f"""
        UPDATE "invoice_forms2"
        SET status = '{invoice_status.status}'
        WHERE invoice_id = {invoice_status.invoice_id}
    """
    cursor.execute(update)
    updated_rows = cursor.rowcount

    conn.commit()
    cursor.close()
    conn.close()

    if updated_rows == 0:
        raise HTTPException(status_code=404, detail="Invoice not found")

    return {"status": "Status updated"}

class UserInfo(BaseModel):
    employee_id: int
    name: str
    phone: str
    email: str
    address: str
    dept: str

@app.post("/updateuserinfo")
async def update_user_info(user_info: UserInfo):
    conn = psycopg2.connect(DATABASE_URL)
    cursor = conn.cursor()

    update_query = f"""
        UPDATE "employee_details"
        SET employee_name = '{user_info.name}', employee_phone = '{user_info.phone}', employee_email = '{user_info.email}', employee_address = '{user_info.address}', employee_dept = '{user_info.dept}'
        WHERE employee_id = {user_info.employee_id}
    """

    cursor.execute(update_query)
    conn.commit()

    cursor.close()
    conn.close()

    return {"status": "User information updated successfully"}

# {
#   "invoice_number": "141671",
#   "bill_date": "2022-10-04",
#   "due_date": "2022-11-04",
#   "client_name": "Client Name",
#   "client_address": "Client Address",
#   "client_email": "client@example.com",
#   "client_phone": "1234567890",
#   "supplier_name": "Supplier Name",
#   "supplier_address": "Supplier Address",
#   "supplier_email": "supplier@example.com",
#   "supplier_phone": "0987654321",
#   "tax": 10.0,
#   "sub_total": 100.0,
#   "grand_total": 110.0,
#   "remark": "Sample remark",
#   "image": "Sample image"
# }