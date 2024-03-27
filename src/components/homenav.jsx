import React from 'react';

const HomeNav = () => {

  return (
    <div className='homenav'>
      <div className="homenav-container">
      <button onClick={() => {
        // navigate to profile page
        window.location.href = '/home';
        }
        }><i class="fa fa-home"></i></button>
      </div>
    </div>
  );
}

export default HomeNav;
