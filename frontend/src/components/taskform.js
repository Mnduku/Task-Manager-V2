// src/components/TaskForm.js
import React, { useState } from 'react';

const TaskForm = ({ addTask, toggleFormVisibility }) => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [taskDeadline, setTaskDeadline] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim()) {
      addTask({
        name: taskName,
        desc: taskDescription,
        date: taskDate,
        due: taskDeadline,
        priority: false,
      });
      clearForm();
      toggleFormVisibility(); // Close the form after adding the task
    }
  };

  // Clear form inputs
  const clearForm = () => {
    setTaskName('');
    setTaskDescription('');
    setTaskDate('');
    setTaskDeadline('');
  };

  return (
    <div className="optionpane">
      <form className="taskform" onSubmit={handleSubmit} noValidate>
        <legend>Task info</legend>
        <div className="formdiv">
          <label htmlFor="tinput1" className="tlabel" id="tlabel1">Name</label>
          <input
            type="text"
            className="tinput"
            id="tinput1"
            maxLength="15"
            required
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
        </div>
        <div className="formdiv">
          <label htmlFor="tinput2" className="tlabel" id="tlabel2">Description</label>
          <textarea
            className="tinput"
            id="tinput2"
            wrap="hard"
            maxLength="133"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
        </div>
        <div className="dates">
          <div className="formdiv type">
            <label htmlFor="tinput3" className="tlabel" id="tlabel3">Date</label>
            <input
              type="date"
              className="tinput"
              id="tinput3"
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
            />
          </div>
          <div className="formdiv type">
            <label htmlFor="tinput4" className="tlabel" id="tlabel4">Deadline</label>
            <input
              type="date"
              className="tinput"
              id="tinput4"
              value={taskDeadline}
              onChange={(e) => setTaskDeadline(e.target.value)}
            />
          </div>
        </div>
        <div className="buttons">
          <button className="addtasker" title="Add Task" type="submit">+</button>
          <button
            className="back"
            title="Go back"
            type="button"
            onClick={toggleFormVisibility} // Close the form without adding a task
          />
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
