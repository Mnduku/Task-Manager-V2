// src/components/Sidebar.js
import React, { useState } from 'react';

const Sidebar = ({ projects, addProject, selectProject, handleTabChange, currentTab }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');

  const toggleAddForm = () => {
    setIsFormVisible((prev) => !prev);
    console.log("ss")
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    if (newProjectName.trim()) {
      addProject(newProjectName.trim());
      setNewProjectName('');
      toggleAddForm();

    }
  };

  return (
    <div className="left">
      <div className="header">
        <button className="headertext">Menu</button>
      </div>
      
      {/* Navigation Options */}
      <div className={`option ${currentTab === 'alltasks' ? 'selectedtab' : ''}`} id="alltasks" onClick={() => handleTabChange('alltasks')}>
        <img src="/images/1.png" className="icon" alt="All Tasks" />
        <button className="iconname">All</button>
      </div>
      <div className={`option ${currentTab === 'favtasks' ? 'selectedtab' : ''}`} id="star" onClick={() => handleTabChange('favtasks')}>
        <img src="/images/8.png" className="icon" alt="Favorited" />
        <button className="iconname">Favorited</button>
      </div>
      <div className="option" id="na1">
        <img src="/images/7.png" className="icon" alt="N/A" />
        <button className="iconname">N/A</button>
      </div>
      <div className="option" id="na2">
        <img src="/images/7.png" className="icon" alt="N/A" />
        <button className="iconname">N/A</button>
      </div>
      
      <div className="bar"></div>
      
      {/* Projects Section */}
      <div className="header">
        <button className="headertext">Projects</button>
      </div>
      
      {/* Dynamic Project List */}
      <div className="projectlist">
        {projects.length > 0 ? (
          projects.map((project) => (
            <div key={project.id} className="project-item" onClick={() => selectProject(project.id)}>
              {project.name}
            </div>
          ))
        ) : (
          <img src="/images/nothing.png" className="nothing" alt="No Projects" />
        )}
      </div>
      
      {/* Add Project Button and Form */}
      <button className="addproj" onClick={toggleAddForm}>+</button>
      {isFormVisible && (
        <form className="cname" onSubmit={handleAddProject}>
          <div className="form">
            <input
              type="text"
              id="projname"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              placeholder="New Project"
              required
              maxLength="14"
            />
            <button className="submit" type="submit">Add</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Sidebar;
