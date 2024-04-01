import React, { useState, useContext } from 'react';

import ErrorMessage from "./ErrorMessage";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Log = () => {
  let navigate = useNavigate(); 
 

  const [role, setRole] = useState("");
  const dashboard = () => {
    let path = role === 'admin' ? "/Dept" : "/Home";
    navigate(path);
  }


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [, setToken] = useContext(UserContext);

  const submitLogin = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: JSON.stringify(
        `grant_type=&username=${email}&password=${password}&scope=&client_id=&client_secret=`
      ),
    };

    const response = await fetch("https://login-backend-m1qk.onrender.com/api/token", requestOptions);
   
    const data = await response.json();

    if (!response.ok) {
      setErrorMessage(data.detail);
    } else {
      setToken(data.access_token);
      dashboard()
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitLogin();
  };



















  return (
    <div className='login-page'>
      <div className='login-box'>
        <div className='header'>Login</div>
        <form onSubmit={handleSubmit}>
          <div className='description'>Welcome back!</div>
          <label className='input-labels'>User ID</label>
          <br />
          <input
            className='input-boxes'
            type='email'
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            name='user_id'
            placeholder='example: abcd@efgh.com'
            required
          />
          <br />
          <label className='input-labels'>Password</label>
          <br />
          <input
            className='input-boxes'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name='password'
            placeholder='********'
            required
          />
          <br />
          <label className='input-labels'>Role</label>
          <br />
          <select className='input-boxes' name='role' required onChange={(e) => setRole(e.target.value)}>
            <option value=''>Select Role</option>
            <option value='admin'>Finance Dept. Member</option>
            <option value='user'>Employee</option>
          </select>
          <br />
          <input className='submit-button' type='submit' value='Submit' />
          <br/>
            <ErrorMessage message = {errorMessage}></ErrorMessage>
        </form>
      </div>
      <div className='art-div'></div>
    </div>
  );
};

export default Log;
