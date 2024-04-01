import React, { useEffect, useState } from "react";

const Status = ({ setInvoiceCount,setEmployeedetails }) => {
    const [employee_id, setEmployee_id] = useState(0);
    const [invoices, setInvoices] = useState([]);

    const getUser = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("LoginToken")
            }
        };

        const userIDresp = await fetch("https://login-backend-m1qk.onrender.com/api/users/me", requestOptions);
        const userID = await userIDresp.json();
        console.log(userID);
        setEmployee_id(userID.id);
    };

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        if (employee_id !== 0) {
            getstatus(employee_id);
        }
    }, [employee_id]);

    const getstatus = async (employee_id) => {
        await fetch(`https://invoiceforms-dbpush.onrender.com/getinvoices/${employee_id}`, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            setInvoiceCount(data.count); // set the count of invoices
            setInvoices(data.invoices);
            setEmployeedetails(data.employeedetails);
            console.log(data.employeedetails);
;            console.log(data.count)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    return (
        <div className="status">
            <div className="status-container">
                {invoices.map((invoice, index) => (
                    <div className="status-block" key={index}>
                        <div className="invoice-info">
                            <div className="invoice-number-text">Invoice Number</div>
                            <div className="invoice-number">{invoice.invoice_number}</div>
                        </div>
                        <div className="invoice-status">
                            <div className="invoice-status-text">Status</div>
                            <div className={`invoice-status-result ${invoice.status}`}>{invoice.status}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Status;
