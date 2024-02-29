import React from 'react';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-container">
        
        <label htmlFor="upload" className="upload">
          <span>Upload Invoice</span>   
          <input type="file" id="upload" name="upload" className="upload" style={{display: "none"}}/> 
        </label>
      </div>
    </div>
  );
}

export default Sidebar;
