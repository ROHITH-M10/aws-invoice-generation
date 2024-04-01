import React, { useState,useEffect } from 'react';
import Sidebar from '../components/sidebar';
import Input from '../components/input';
import Iconshome from '../components/iconshome';

const Home = () => {
  const [data, setData] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  return (
    <div className="home">
      <Iconshome />
      <div className="home-container"> 
        <Input data={data} uploadedFile={uploadedFile} />
        <Sidebar setData={setData} setUploadedFile={setUploadedFile} />
      </div>
    </div>
  );
}

export default Home;