import React,{useContext} from 'react';

import { UserContext } from "../context/UserContext";

const Logout = () => {
  const [token, setToken] = useContext(UserContext);

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("LoginToken");
    window.location.href = '/';
  };

  return (
    <div className='logout'>
      <div className="logout-container">
      <button onClick={handleLogout}><i class="fa fa-sign-out"></i></button>
      
      </div>
    </div>
  );
}

export default Logout;
