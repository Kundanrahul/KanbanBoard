import React, { useState, useEffect } from 'react';
import { fetchTickets } from '../api';
import TicketCard from './Ticketcard';
import Controls from './Controls';
import AddIcon from '../assets/add.svg'; 
import dott from '../assets/3 dot menu.svg';
import './KanbanBoard.css';
import TodoIcon from '../assets/To-do.svg';
import InProgressIcon from '../assets/in-progress.svg';
import BacklogIcon from '../assets/Backlog.svg';
import DoneIcon from '../assets/Done.svg';
import UnassignedIcon from '../assets/SVG - Urgent Priority grey.svg';
import UrgentIcon from '../assets/SVG - Urgent Priority colour.svg';
import HighIcon from '../assets/Img - High Priority.svg';
import MediumIcon from '../assets/Img - Medium Priority.svg';
import LowIcon from '../assets/Img - Low Priority.svg';
import NoPriorityIcon from '../assets/No-priority.svg';
import DefaultIcon from '../assets/Defaultuser.png';

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState(localStorage.getItem('groupBy') || 'status');
  const [sortOption, setSortOption] = useState(null);
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchTickets();
      setTickets(data.tickets);
      setUsers(data.users);
    };
    loadData();
  }, []);
  useEffect(() => {
    localStorage.setItem('groupBy', groupBy);
  }, [groupBy]);
  const groupTickets = () => {
    if (groupBy === 'status') {
      return groupByStatus(tickets);
    } else if (groupBy === 'user') {
      return groupByUser(tickets, users);
    } else if (groupBy === 'priority') {
      return groupByPriority(tickets);
    }
  };

  const groupIcons = {
    'Todo': TodoIcon,
    'In Progress': InProgressIcon,
    'Backlog': BacklogIcon,
    'Done': DoneIcon,
    'Unassigned': UnassignedIcon,
    'Urgent': UrgentIcon,
    'High': HighIcon,
    'Medium': MediumIcon,
    'Low': LowIcon,
    'No Priority': NoPriorityIcon,
  };

  const getGroupIcon = (groupName) => {
    return groupIcons[groupName] || DefaultIcon;
  };

  const groupByStatus = (tickets) => {
    const statusGroups = {
      'Todo': [],
      'In Progress': [],
      'Backlog': [],
      'Done': [],
    };

    tickets.forEach((ticket) => {
      if (statusGroups[ticket.status]) {
        statusGroups[ticket.status].push(ticket);
      } else {
        console.warn(`Unknown status: ${ticket.status}`);
      }
    });

    return Object.entries(statusGroups).map(([status, tickets]) => ({
      name: status,
      tickets,
    }));
  };

  const groupByUser = (tickets, users) => {
    const userGroups = {};

    tickets.forEach((ticket) => {
      const user = users.find((u) => u.id === ticket.userId)?.name || 'Unassigned';
      if (!userGroups[user]) {
        userGroups[user] = [];
      }
      userGroups[user].push(ticket);
    });

    return Object.entries(userGroups).map(([user, tickets]) => ({
      name: user,
      tickets: sortTickets(tickets),
    }));
  };

  const groupByPriority = (tickets) => {
    const priorityGroups = {
      Urgent: [],
      High: [],
      Medium: [],
      Low: [],
      'No Priority': [],
    };

    tickets.forEach((ticket) => {
      if (ticket.priority === 4) priorityGroups.Urgent.push(ticket);
      if (ticket.priority === 3) priorityGroups.High.push(ticket);
      if (ticket.priority === 2) priorityGroups.Medium.push(ticket);
      if (ticket.priority === 1) priorityGroups.Low.push(ticket);
      if (ticket.priority === 0) priorityGroups['No Priority'].push(ticket);
    });

    return Object.entries(priorityGroups).map(([priority, tickets]) => ({
      name: priority,
      tickets: sortTickets(tickets),
    }));
  };

  const sortTickets = (tickets) => {
    if (sortOption === 'priority') {
      return tickets.sort((a, b) => b.priority - a.priority);
    } else if (sortOption === 'title') {
      return tickets.sort((a, b) => a.title.localeCompare(b.title));
    }
    return tickets;
  };

  const groupedTickets = groupTickets();

  return (
    <div>
      <Controls groupBy={groupBy} setGroupBy={setGroupBy} setSortOption={setSortOption} />
      <div className="kanban-board">
        {groupedTickets.map((group, index) => (
          <div key={index} className="column">
            <div className="icon-bar">
              <img src={getGroupIcon(group.name)} alt={`${group.name} icon`} className={`group-icon ${group.name === 'Unassigned' ? 'default-icon' : ''}`} />
              <div className="gnames">{group.name}</div>
              <div className="count">{group.tickets.length}</div>
              <div className="right-icons">
                <img src={AddIcon} alt="Add" className="icon" />
                <img src={dott} alt="Menu" className="icon" />
              </div>
            </div>

            {group.tickets.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;

