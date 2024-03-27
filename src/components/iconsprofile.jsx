import React from 'react';
import Logout from './logout';
import Profile from './profile';
import HomeNav from './homenav';


const Iconsprofile = () => {

  return (
    <div className='icons-profile'>
        <div className="icons-container-profile">
        <HomeNav/>
        <Logout/>
        </div>
    </div>
    );
}

export default Iconsprofile;
