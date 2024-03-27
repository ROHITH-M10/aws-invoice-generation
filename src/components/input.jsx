import React, { useState } from "react";

const Input = () => {
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [billDate, setBillDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [supplierAddress, setSupplierAddress] = useState("");
  const [supplierEmail, setSupplierEmail] = useState("");
  const [supplierPhone, setSupplierPhone] = useState("");
  const [tax, setTax] = useState("");
  const [subTotal, setSubTotal] = useState("");
  const [grandTotal, setGrandTotal] = useState("");
  const [remark, setRemark] = useState("");
  const [image, setImage] = useState("None");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const invoice = {
      invoice_number: invoiceNumber,
      bill_date: billDate,
      due_date: dueDate,
      client_name: clientName,
      client_address: clientAddress,
      client_email: clientEmail,
      client_phone: clientPhone,
      supplier_name: supplierName,
      supplier_address: supplierAddress,
      supplier_email: supplierEmail,
      supplier_phone: supplierPhone,
      tax: tax,
      sub_total: subTotal,
      grand_total: grandTotal,
      remark: remark,
      image: image
    };

    const response = await fetch("https://invoiceforms-dbpush.onrender.com/invoices", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(invoice)
    });

    if (response.ok) {
      console.log("Invoice created");
      alert("Invoice created");
    } else {
      console.error("Error creating invoice");
      alert("Error creating invoice");
    }
  };

  return (
    <div className='input'>
      <div className="input-container">
        <div className="invoice-top-label">
          Invoice Details
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-container-contain">
            <label htmlFor="invoice-number">
              <div>Invoice Number</div>
              <input type="text" id="invoice-number" name="invoice-number" placeholder="Invoice Number" value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} />
            </label>
            <label htmlFor="bill-date">
              <div>Bill Date</div>
              <input type="date" id="bill-date" name="bill-date" value={billDate} onChange={(e) => setBillDate(e.target.value)} />
            </label>
            <label htmlFor="due-date">
              <div>Due Date</div>
              <input type="date" id="due-date" name="due-date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            </label>
            <label htmlFor="client-name">
              <div>Client Name</div>
              <input type="text" id="client-name" name="client-name" placeholder="Client Name" value={clientName} onChange={(e) => setClientName(e.target.value)} />
            </label>
            <label htmlFor="client-address">
              <div>Client Address</div>
              <input type="text" id="client-address" name="client-address" placeholder="Client Address" value={clientAddress} onChange={(e) => setClientAddress(e.target.value)} />
            </label>
            <label htmlFor="client-email">
              <div>Client Email</div>
              <input type="email" id="client-email" name="client-email" placeholder="Client Email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} />
            </label>
            <label htmlFor="client-phone">
              <div>Client Phone</div>
              <input type="tel" id="client-phone" name="client-phone" placeholder="Client Phone" value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} />
            </label>
            <label htmlFor="supplier-name">
              <div>Supplier Name</div>
              <input type="text" id="supplier-name" name="supplier-name" placeholder="Supplier Name" value={supplierName} onChange={(e) => setSupplierName(e.target.value)} />
            </label>
            <label htmlFor="supplier-address">
              <div>Supplier Address</div>
              <input type="text" id="supplier-address" name="supplier-address" placeholder="Supplier Address" value={supplierAddress} onChange={(e) => setSupplierAddress(e.target.value)} />
            </label>
            <label htmlFor="supplier-email">
              <div>Supplier Email</div>
              <input type="email" id="supplier-email" name="supplier-email" placeholder="Supplier Email" value={supplierEmail} onChange={(e) => setSupplierEmail(e.target.value)} />
            </label>
            <label htmlFor="supplier-phone">
              <div>Supplier Phone</div>
              <input type="tel" id="supplier-phone" name="supplier-phone" placeholder="Supplier Phone" value={supplierPhone} onChange={(e) => setSupplierPhone(e.target.value)} />
            </label>
            <label htmlFor="tax">
              <div>Tax</div>
              <input type="number" id="tax" name="tax" placeholder="Tax" value={tax} onChange={(e) => setTax(e.target.value)} />
            </label>
            <label htmlFor="sub-total">
              <div>Sub Total</div>
              <input type="number" id="sub-total" name="sub-total" placeholder="Sub Total" value={subTotal} onChange={(e) => setSubTotal(e.target.value)} />
            </label>
            <label htmlFor="grand-total">
              <div>Grand Total</div>
              <input type="number" id="grand-total" name="grand-total" placeholder="Grand Total" value={grandTotal} onChange={(e) => setGrandTotal(e.target.value)} />
            </label>
            <label htmlFor="remark">
              <div>Remark</div>
              <input type="text" id="remark" name="remark" placeholder="Remark" value={remark} onChange={(e) => setRemark(e.target.value)} />
            </label>
            <label htmlFor="image">
              <div>Image</div>
              <input type="text" id="image" name="image" placeholder="Image" value={image} onChange={(e) => setImage(e.target.value)} />
            </label>
            <label htmlFor="submit">
              <input type="submit" id="submit" name="submit" value="Submit" />
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Input;
