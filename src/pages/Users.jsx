import React,{useEffect,useState} from 'react';
import Userinfo from '../components/userinfo';
import Status from '../components/status';
import Iconsprofile from '../components/iconsprofile';
import Usersmobile from '../components/usersmobile';

function Users() {
    const [invoiceCount, setInvoiceCount] = useState(0);
    const [employeedetails, setEmployeedetails] = useState(null);

    return ( 
        <div className="users">  
            <Iconsprofile />
            <div className="users-container">
                <Userinfo invoiceCount={invoiceCount} employeedetails={employeedetails} />
                <Status setInvoiceCount={setInvoiceCount} setEmployeedetails={setEmployeedetails} />
            </div>
            <div className="users-container-small-screen">
                <Usersmobile />
            </div>
        </div>
    );
}

export default Users;