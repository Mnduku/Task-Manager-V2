// src/components/TaskForm.js
import React from 'react';

const TaskForm = () => (
  <div className="optionpane">
    <form action="#" method="get" className="taskform" noValidate>
      <legend>Task info</legend>
      <div className="formdiv">
        <label htmlFor="tinput1" className="tlabel" id="tlabel1">Name</label>
        <input type="text" className="tinput" id="tinput1" maxLength="15" required />
      </div>
      <div className="formdiv">
        <label htmlFor="tinput2" className="tlabel" id="tlabel2">Description</label>
        <textarea className="tinput" id="tinput2" wrap="hard" maxLength="133"></textarea>
      </div>
      <div className="dates">
        <div className="formdiv type">
          <label htmlFor="tinput3" className="tlabel" id="tlabel3">Date</label>
          <input type="date" className="tinput" id="tinput3" />
        </div>
        <div className="formdiv type">
          <label htmlFor="tinput4" className="tlabel" id="tlabel4">Deadline</label>
          <input type="date" className="tinput" id="tinput4" />
        </div>
      </div>
      <div className="buttons">
        <button className="addtasker" title="Add Task" type="submit">+</button>
        <button className="back" title="Go back" type="button"></button>
      </div>
    </form>
  </div>
);

export default TaskForm;
