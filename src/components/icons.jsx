import React from 'react';
import Logout from './logout';
import Profile from './profile';

const Icons = () => {

  return (
    <div className='icons'>
      <div className="icons-container">
      <Profile/>
      <Logout/>
      </div>
    </div>
  );
}

export default Icons;
