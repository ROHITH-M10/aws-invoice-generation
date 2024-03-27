import React from 'react'

const Log = () => {
  return (
    <div className='login-page'>
      <div className='login-box'>
          <div className="header">
            Login
          </div>
          <form action="">
            <div className='description'>Welcome back!</div>
            <label className='input-labels' >User ID</label>
            <br/>
            <input className="input-boxes"  type='email' placeholder='example:abcd@efgh.com' ></input>
            <br/> 
            <label className='input-labels'>Password</label>
            <br/>
            <input className="input-boxes"type='password' placeholder='********'></input>
            <br/>
            <input className="submit-button" type="submit" value="Submit" />
            <hr/>
            <label className='google-label'>Google Sign in</label>
            <br/>

            <button className='google-button'>
             <img src="src/img/images.jpeg"/>Sign in
            </button>

          </form>
      </div>
      <div className='art-div'>

      </div>
    </div>
  )
}

export default Log
