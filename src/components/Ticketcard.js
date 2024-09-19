import React from 'react';
import './TicketCard.css';
import UrgentIcon from '../assets/SVG - Urgent Priority colour.svg';
import Canceled from '../assets/Cancelled.svg';
import HighIcon from '../assets/Img - High Priority.svg';
import MediumIcon from '../assets/Img - Medium Priority.svg';
import LowIcon from '../assets/Img - Low Priority.svg';
import NoPriorityIcon from '../assets/No-priority.svg';
import TodoIcon from '../assets/To-do.svg';
import InProgressIcon from '../assets/in-progress.svg';
import DoneIcon from '../assets/Done.svg';
import BacklogIcon from '../assets/Backlog.svg';

const TicketCard = ({ ticket }) => {
  const getPriorityIcon = () => {
    switch (ticket.priority) {
      case 4:
        return <img src={UrgentIcon} alt="Urgent Priority" />;
      case 3:
        return <img src={HighIcon} alt="High Priority" />;
      case 2:
        return <img src={MediumIcon} alt="Medium Priority" />;
      case 1:
        return <img src={LowIcon} alt="Low Priority" />;
      case 0:
        return <img src={Canceled} alt="cancelled"/>
      default:
        return <img src={NoPriorityIcon} alt="No Priority" />;
    }
  };

  const getStatusIcon = () => {
    switch (ticket.status) {
      case 'Todo':
        return <img src={TodoIcon} alt="To Do" />;
      case 'In Progress':
        return <img src={InProgressIcon} alt="In Progress" />;
      case 'Done':
        return <img src={DoneIcon} alt="Done" />;
      case 'Backlog':
        return <img src={BacklogIcon} alt="Backlog" />;
      default:
        return <img src={Canceled} alt="Canceled" />;
    }
  };

  return (
    <div className="ticket-card">
      <p className='ids'>{ticket.id}</p>
      <div className="ticket-header">
        <div className="status-icon">{getStatusIcon()}</div>
        <h3>{ticket.title}</h3>
      </div>
      <div className="ticket-body">
        <p>{ticket.tag.join(', ')}</p>
      </div>
      <div className="ticket-footer">
        <div className="priority-icon">{getPriorityIcon()}</div>
      </div>
    </div>
  );
};

export default TicketCard;
