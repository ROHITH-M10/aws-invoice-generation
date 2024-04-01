import React from "react";

const UsersMobile = () => {



    // replace the below with the actual data
    
    const verified = "verified";
    const pending = "pending";
    const rejected = "rejected";





    return (
        <div className="usersmobile">
            <div className="userinfo">
                <div className="userinfo-container">
                    <div className="userinfo-heading">
                        Profile Information
                    </div>  
                    <div className="userinfo-details">
                        <div className="user-info">
                            <div className="user-name">
                                <span>Name</span> <input type="text" defaultValue="Fname Lname" />
                            </div>
                            <div className="user-phone">
                                <span>Phone</span> <input type="tel" defaultValue="Phone no" />
                            </div>
                            <div className="user-email">
                                <span>Email</span> <input type="email" defaultValue="Email" />
                            </div>
                            <div className="user-address">
                                <span>Address</span> <input type="text" defaultValue="Address" />
                            </div>
                            <div className="user-invoices">
                                <span>Total Invoices Uploaded</span> 5
                            </div>
                            <button>Update Profile Information</button>
                        </div>
                    </div>
                </div>
            </div>
            


            <div className="status">
            <div className="status-container">


                { /*map*/ }
                <div className="status-block">

                    <div className="invoice-info">
                        <div className="invoice-number-text">
                            Invoice Number
                        </div>
                        <div className="invoice-number">
                            {"120381922"}
                        </div>
                    </div>
                    

                    <div className="invoice-status">
                        <div className="invoice-status-text">
                            Status
                        </div>
                        <div className={`invoice-status-result ${verified}`}>
                            {"Verified"}                      
                        </div>
                    </div>
                </div>




                
                

              
                
            </div>
        </div>
    </div>
    );
};

export default UsersMobile;
