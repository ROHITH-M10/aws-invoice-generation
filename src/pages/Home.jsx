import React from 'react'
import Sidebar from '../components/sidebar'
import Input from '../components/input'
import Icons from '../components/icons'

const Home = () => {
  return (
    <div className="home">
      <Icons />
      <div className="home-container"> 
        <Input />
        <Sidebar />
      </div>
    </div>
  )
}

export default Home