import React from 'react';
import Userinfo from '../components/userinfo';
import Status from '../components/status';
import Iconsprofile from '../components/iconsprofile';
import Usersmobile from '../components/usersmobile';

function Users() {

    return ( 
        <div className="users">  
            <Iconsprofile />
            <div className="users-container">
                <Userinfo />
                <Status />
            </div>
            <div className="users-container-small-screen">
                <Usersmobile />
            </div>
        </div>
    );
}

export default Users;
