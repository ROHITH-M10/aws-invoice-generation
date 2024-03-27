import React from 'react'
import Sidebar from '../components/sidebar'
import Input from '../components/input'
import Iconshome from '../components/iconshome'

const Home = () => {
  return (
    <div className="home">
      <Iconshome />
      <div className="home-container"> 
        <Input />
        <Sidebar />
      </div>
    </div>
  )
}

export default Home