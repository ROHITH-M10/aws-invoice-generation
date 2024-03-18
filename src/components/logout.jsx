import React from 'react';

const Logout = () => {

  return (
    <div className='logout'>
      <div className="logout-container">
      <button onClick={() => {
        localStorage.removeItem('token');
        window.location.href = '/';
      }
      }><i class="fa fa-sign-out"></i></button>
      
      </div>
    </div>
  );
}

export default Logout;
