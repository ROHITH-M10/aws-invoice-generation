import React from 'react'
import Sidebar from '../components/sidebar'
import Input from '../components/input'
import Logout from '../components/logout'

const Home = () => {
  return (
    <div className="home">
      <Logout/>
      <div className="home-container"> 
        <Input />
        <Sidebar />
      </div>
    </div>
  )
}

export default Home