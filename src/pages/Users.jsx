import React from 'react';
import Userinfo from '../components/userinfo';
import Status from '../components/status';

function Users() {

    return ( 
        <div className="users">
            <div className="users-container">
                <Userinfo />
                <Status />
            </div>
        </div>
    );
}

export default Users;
