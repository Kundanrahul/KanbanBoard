import React from 'react';
import './KanbanBoard.css';
import dott from '../assets/Display.svg';


const Controls = ({ groupBy, setGroupBy }) => {
  return (
    <>
    <div className="controls">
      <img src={dott} alt="Menu" />
      <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
        <option value="status">Group by Status</option>
        <option value="user">Group by User</option>
        <option value="priority">Group by Priority</option>
      </select>
    </div>
   
    </>
    
  );
};

export default Controls;

