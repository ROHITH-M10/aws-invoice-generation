import React from 'react'
import Sidebar from '../components/sidebar'
import Input from '../components/input'

const Home = () => {
  return (
    <div className="home">
      <div className="home-container">
        <Input />
        <Sidebar />
      </div>
    </div>
  )
}

export default Home