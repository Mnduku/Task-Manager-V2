// src/components/TaskList.js
import React, { useState } from 'react';

const TaskList = ({ project, addTask, deleteTask, toggleFavorite, maxTasksPerPage }) => {
  const [newTaskName, setNewTaskName] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  // Handles adding a new task to the project
  const handleAddTask = () => {
    if (newTaskName.trim()) {
      addTask({ name: newTaskName, completed: false, priority: false });
      setNewTaskName('');
    }
  };

  // Paginate tasks based on the current page and maxTasksPerPage
  const paginatedTasks = project.tasks.slice(
    currentPage * maxTasksPerPage,
    (currentPage + 1) * maxTasksPerPage
  );

  // Event handlers for pagination buttons
  const goToPreviousPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if ((currentPage + 1) * maxTasksPerPage < project.tasks.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="tasklist-container">
      <h2>{project.name} - Tasks</h2>
      <input
        type="text"
        value={newTaskName}
        onChange={(e) => setNewTaskName(e.target.value)}
        placeholder="New Task"
      />
      <button onClick={handleAddTask}>Add Task</button>
      
      <ul className="tasklist">
        {paginatedTasks.map((task) => (
          <li key={task.id} className={`task ${task.priority ? 'priority' : ''}`}>
            <span>{task.name}</span>
            <button onClick={() => toggleFavorite(task.id)} className="favorite-btn">
              {task.priority ? '★' : '☆'}
            </button>
            <button onClick={() => deleteTask(task.id)} className="delete-btn">🗑️</button>
          </li>
        ))}
      </ul>
      
      {/* Pagination controls */}
      <div className="pagination-controls">
        <button onClick={goToPreviousPage} disabled={currentPage === 0}>
          Previous
        </button>
        <span>
          Page {currentPage + 1} of {Math.ceil(project.tasks.length / maxTasksPerPage)}
        </span>
        <button onClick={goToNextPage} disabled={(currentPage + 1) * maxTasksPerPage >= project.tasks.length}>
          Next
        </button>
      </div>
    </div>
  );
};

export default TaskList;
