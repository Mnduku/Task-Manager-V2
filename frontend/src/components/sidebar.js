// src/components/Sidebar.js
import React from 'react';

const Sidebar = () => (
  <div className="left">
    <div className="header">
      <a a href="#" className="menyu">Menu</a>
    </div>
    <div className="option start selectedtab" id="alltasks">
      <img src="../public/images/1.png" className="icon" alt="All Tasks" />
      <a a href="#" className="iconname">All</a>
    </div>
    <div className="option" id="star">
      <img src="../public/images/8.png" className="icon" alt="Favorited" />
      <a a href="#" className="iconname">Favorited</a>
    </div>
    <div className="option" id="na1">
      <img src="../public/images/7.png" className="icon" alt="N/A" />
      <a a href="#" className="iconname">N/A</a>
    </div>
    <div className="option" id="na2">
      <img src="../public/images/7.png" className="icon" alt="N/A" />
      <a a href="#" className="iconname">N/A</a>
    </div>
    <div className="bar"></div>
    <div className="header">
      <a a href="#" className="iconname">Projects</a>
    </div>
    <div className="projectlist">
      <img src="../public/images/nothing.png" className="nothing" alt="No Projects" />
    </div>
    <button className="addproj">+</button>
    <form className="cname" action="#" method="get">
      <div className="form">
        <input type="text" id="projname" required maxLength="14" />
        <button className="submit" type="submit">Add</button>
      </div>
    </form>
  </div>
);

export default Sidebar;
