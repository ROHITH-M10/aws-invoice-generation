import React, { useState,useEffect } from 'react';

const Finance = () => {
  const [selectedinvoice, setSelectedinvoice] = useState(null);
  const [invoiceDetails, setinvoiceDetails] = useState(null);
  const [updateCount, setUpdateCount] = useState(0);
  const fetchinvoiceDetails = () => {
    // Simulating a backend call
    fetch('https://invoiceforms-dbpush.onrender.com/allinvoices/')
  .then((response) => response.json())
  .then((data) => {
    const invoices = data.invoices.map(([invoice_id, invoice_number, status, client_name]) => ({
      invoice_id,
      invoice_number,
      status,
      client_name,
    }));
    setinvoiceDetails(invoices);
  })
  .catch((error) => console.error('Error fetching invoice details:', error));
  };

  useEffect(() => {
    fetchinvoiceDetails();
  }, [updateCount]);

  const handleInvoiceClick = (invoice_id) => {
    // Simulating a backend call
    fetch(`https://invoiceforms-dbpush.onrender.com/selectedinvoice/${invoice_id}`)
      .then((response) => response.json())
      .then((data) => {
        setSelectedinvoice(data);
        console.log(data);
      })
      .catch((error) => console.error('Error fetching selected invoice details:', error));
  };

 


  const handleAccept = (invoice_id, value) => {
    fetch('https://invoiceforms-dbpush.onrender.com/statuschange/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ invoice_id, status: value === 1 ? 'Accepted' : 'Rejected' }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Refresh the invoice list after updating the status
        setUpdateCount(updateCount + 1);
      })
      .catch((error) => console.error('Error updating invoice status:', error));
  };


  return (
    <div className='container'>
      <div className='header'>Finance Overview</div>

      <div className='list'>
        {(invoiceDetails||[]).map((invoice) => (
          <div key={invoice.invoice_id} className="emp-entry"> 
            <div className='emp-details'>
              <p>{invoice.client_name}</p>
              <p>Invoice Numer: {invoice.invoice_number}</p>
              <p>Status: {invoice.status}</p>
            </div>
            <div className="button-container"> 
            <button className="acc" onClick={() => handleAccept(invoice.invoice_id, 1)}>Approve</button>
            <button className="rej" onClick={() => handleAccept(invoice.invoice_id, 0)}>Reject</button>
            <button className="view" onClick={() => handleInvoiceClick(invoice.invoice_id)}>View Details</button>
            </div>
          </div>
        ))}
      </div>
      {selectedinvoice && (
        <div className="overlay">
          <div className='left'>
            <h2>Invoice Details</h2>
            <p>ID: {selectedinvoice.invoice[0]}</p>
            <p>Name: {selectedinvoice.invoice[4]}</p>
            <p>Status: {selectedinvoice.invoice[17]}</p>
            {selectedinvoice && (
              <div>
                <h2>Additional Details</h2>
                <p>Invoice Number: {selectedinvoice.invoice[1]}</p>
                <p>Bill Date: {selectedinvoice.invoice[2]}</p>
                <p>Due Date: {selectedinvoice.invoice[3]}</p>
                <p>Client Name: {selectedinvoice.invoice[4]}</p>
                <p>Client Address: {selectedinvoice.invoice[5]}</p>
                <p>Client Email: {selectedinvoice.invoice[6]}</p>
                <p>Client Phone: {selectedinvoice.invoice[7]}</p>
                <p>Supplier Name: {selectedinvoice.invoice[8]}</p>
                <p>Supplier Address: {selectedinvoice.invoice[9]}</p>
                <p>Supplier Email: {selectedinvoice.invoice[10]}</p>
                <p>Supplier Phone: {selectedinvoice.invoice[11]}</p>
                <p>Tax: {selectedinvoice.invoice[12]}</p>
                <p>Sub Total: {selectedinvoice.invoice[13]}</p>
                <p>Grand Total: {selectedinvoice.invoice[14]}</p>
                {selectedinvoice.remark && <p>Remark: {selectedinvoice.invoice[15]}</p>}
                {/* {employeeDetails.image && (
                  <div>
                    <h3>Image:</h3>
                    <img src={employeeDetails.image} alt="Invoice" />
                  </div>
                )} */}
              </div>
            )}
          </div>
          <div className='right'>
            <button className="close" onClick={() => setSelectedinvoice(null)}>Close</button>
            <h2>Uploaded Invoice</h2>
            <embed src={selectedinvoice.invoice[19]} type="application/pdf" width="400" height="600" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Finance;
