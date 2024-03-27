import React from 'react';
import Logout from './logout';
import Profile from './profile';

const Iconshome = () => {

  return (
    <div className='icons-home'>
      <div className="icons-container-home">
      <Profile/>
      <Logout/>
      </div>
    </div>
  );
}

export default Iconshome;
