import React from 'react';

const Signup = () => {
  return (
    <div className='signup'>
      <div className='signup-box'>
          <div className="header">
            Sign up
          </div>
          <form action="">
            <label className='input-labels'>Name</label>
            <br/>
            <input className="input-boxes" type='text' placeholder='Name'></input>
            <br/>
            <label className='input-labels'>Register as:</label> 
            <br/>
            <br/>
            <input className='inp-radio' type='radio' id='emp'name='emp'/>
            <label className='input-labels'for="emp"> Normal User    </label>
            <input className='inp-radio' type='radio' id='emp'name='emp'/>
            <label className='input-labels'for="emp"> Authorised Employee</label>
            <br/>
            <br/>
            <label className='input-labels' >E-mail id</label>
            <br/>
            <input className="input-boxes"  type='email' placeholder='example:abcd@efgh.com' ></input>
            <br/> 
            <label className='input-labels'>Password</label>
            <br/>
            <input className="input-boxes"type='password' placeholder='********'></input>
            <br/>
            <input className="submit-button" type="submit" value="Submit" />


          </form>
      </div>
      <div className='art-div'>

      </div>
    </div>
  );
};

export default Signup;
