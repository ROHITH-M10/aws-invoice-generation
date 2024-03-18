import React from 'react';

const Profile = () => {

  return (
    <div className='profile'>
      <div className="profile-container">
      <button onClick={() => {
        // navigate to profile page
        window.location.href = '/users';
        }
        }><i class="fa fa-user"></i></button>
      </div>
    </div>
  );
}

export default Profile;
