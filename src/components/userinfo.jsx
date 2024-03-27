import React from "react";

const UserInfo = () => {
    return (
        <div className="userinfo">
            <div className="userinfo-container">
                <div className="userinfo-heading">
                    Profile Information
                </div>  
                <div className="userinfo-details">
                    <div className="user-info">
                        <div className="user-name">
                            <span>Name:</span> <input type="text" defaultValue="Fname Lname" />
                        </div>
                        <div className="user-phone">
                            <span>Phone:</span> <input type="tel" defaultValue="Phone no" />
                        </div>
                        <div className="user-email">
                            <span>Email:</span> <input type="email" defaultValue="Email" />
                        </div>
                        <div className="user-address">
                            <span>Address:</span> <input type="text" defaultValue="Address" />
                        </div>
                        <div className="user-invoices">
                            <span>Total Invoices Uploaded:</span> 5
                        </div>
                        <button>Update Profile Information</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;
