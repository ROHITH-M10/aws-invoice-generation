import React from "react";
import { useState,useEffect } from "react";

const UserInfo = ({ invoiceCount, employeedetails }) => {
    if (!employeedetails) {
        return null; // or return a loading spinner
    }
    const [employee_id, setemployee_id] = useState(0);
    const getUser = async() =>{
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
          setemployee_id(userID.id);
      
        };
        useEffect(()=> {
            getUser();
          },[]);
    const [name, setName] = useState(employeedetails ? employeedetails.name : "");
    const [phone, setPhone] = useState(employeedetails ? employeedetails.phone : "");
    const [email, setEmail] = useState(employeedetails ? employeedetails.email : "");
    const [address, setAddress] = useState(employeedetails ? employeedetails.address : "");
    const [dept, setDept] = useState(employeedetails ? employeedetails.dept : "");

    const updateUserInfo = async () => {
        const response = await fetch('https://invoiceforms-dbpush.onrender.com/updateuserinfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                employee_id: employee_id,
                name: name,
                phone: phone,
                email: email,
                address: address,
                dept: dept,
            }),
        });

        const data = await response.json();
        console.log(data);
        alert("Profile Information Updated Successfully");
    };
    return (
        <div className="userinfo">
            <div className="userinfo-container">
                <div className="userinfo-heading">
                    Profile Information
                </div>  
                <div className="userinfo-details">
                    <div className="user-info">
                        <div className="user-name">
                            <span>Name</span> <input type="text" value={name } onChange={e => setName(e.target.value)} defaultValue="Fname Lname" />
                        </div>
                        <div className="user-phone">
                            <span>Phone</span> <input type="tel" value={phone } onChange={e => setPhone(e.target.value)} defaultValue="Phone no" />
                        </div>
                        <div className="user-email">
                            <span>Email</span> <input type="email" value={email } onChange={e => setEmail(e.target.value)} defaultValue="Email" />
                        </div>
                        <div className="user-address">
                            <span>Address</span> <input type="text" value={address } onChange={e => setAddress(e.target.value)} defaultValue="Address" />
                        </div>
                        <div className="">
                            <span>Employee Department</span> <input type="text" value={dept } onChange={e => setDept(e.target.value)} defaultValue="Department" />
                        </div>
                        <div className="user-invoices">
                            <span>Total Invoices Uploaded:</span> {invoiceCount}
                        </div>
                        <button onClick={()=>updateUserInfo()}>Update Profile Information</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;