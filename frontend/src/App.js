// src/App.js
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/header';
import Sidebar from './components/sidebar';
import TaskList from './components/tasklist';
import Pagination from './components/changepage';
import TaskForm from './components/taskform';
import './App.css';

function App() {
  const [projects, setProjects] = useState([]);
  const [currentProjectId, setCurrentProjectId] = useState(null);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [allTasks, setAllTasks] = useState([]);
  const [currentTab, setCurrentTab] = useState('alltasks');
  const [currentPage, setCurrentPage] = useState(0);
  const maxTasksPerPage = 9;


  const loadStorage =useCallback(() => {
    const savedProjects = JSON.parse(localStorage.getItem('projects')) || [];
    const savedAllTasks = JSON.parse(localStorage.getItem('allTasks')) || [];
    const savedCurrentProjectId = JSON.parse(localStorage.getItem('currentProjectId'));
    setProjects(savedProjects);
    setAllTasks(savedAllTasks);
    setCurrentProjectId(savedCurrentProjectId);
  }, []);


  const saveStorage =useCallback(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
    localStorage.setItem('allTasks', JSON.stringify(allTasks));
    localStorage.setItem('currentProjectId', currentProjectId);
  }, [projects, allTasks, currentProjectId]);


  useEffect(() => {
    loadStorage();
  }, [loadStorage]);

  useEffect(() => {
    saveStorage();
  }, [saveStorage]);

  const addProject = (projectName) => {
    const newProject = { class: 'project ', id: Date.now(), name: projectName, tasks: [] };
    setProjects([...projects, newProject]);
  };

  const selectProject = (projectId) => {

    setCurrentProjectId(projectId);
  };

  const addTask = (taskData) => {
    setProjects((prevProjects) => {
      return prevProjects.map((project) =>
        project.id === currentProjectId
          ? { ...project, tasks: [...project.tasks, { ...taskData, id: Date.now() }] }
          : project
      );
    });
    setAllTasks((prevAllTasks) => [...prevAllTasks, { ...taskData, id: Date.now() }]);
  };

  const handleTabChange = (newTab) => {
    setCurrentTab(newTab);
  };

  const toggleTaskForm = () => {
    setShowTaskForm(!showTaskForm);
  };

  const currentProject = projects.find((project) => project.id === currentProjectId);

  return (
    <div className="main">
      <Header />

      <div className="bottom">
        <Sidebar
          projects={projects}
          addProject={addProject}
          selectProject={selectProject}
          handleTabChange={handleTabChange}
          currentTab={currentTab}
        />

        <div className="right">
          <button className="addtask" title="Add Task" onClick={toggleTaskForm}>+</button>

          {currentProject && (
            <TaskList
              project={currentProject}
              addTask={addTask}
              currentTab={currentTab}
              currentPage={currentPage}
              maxTasksPerPage={maxTasksPerPage}
            />
          )}

          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalTasks={currentProject ? currentProject.tasks.length : 0}
            maxTasksPerPage={maxTasksPerPage}
          />

          {showTaskForm && (
            <TaskForm
              addTask={addTask}
              toggleFormVisibility={toggleTaskForm}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
