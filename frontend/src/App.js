// src/App.js
import React from 'react';
import './App.css'; 
import Header from './components/header';
import Sidebar from './components/sidebar';
import TaskList from './components/tasklist';
import TaskForm from './components/taskform';
import Pagination from './components/changepage';

function App() {
  return (
    <div className="main">
      {/* Header Component */}
      <Header />

      <div className="bottom">
        {/* Sidebar Component */}
        <Sidebar />

        {/* Right Section for Task Management */}
        <div className="right">
          <button className="addtask" title="Add Project">+</button>

          {/* Task List Component */}
          <TaskList />

          {/* Pagination Component */}
          <Pagination />

          {/* Task Form Component */}
          <TaskForm />
        </div>
      </div>
    </div>
  );
}

export default App;