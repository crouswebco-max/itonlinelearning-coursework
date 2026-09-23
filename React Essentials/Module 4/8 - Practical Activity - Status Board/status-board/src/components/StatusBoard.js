import React, { useState } from 'react';
import './StatusBoard.css';
import TicketInfo from './TicketInfo';
// Task 1: import the images
import completedImage from '../assets/completed.svg';
import inProgressImage from '../assets/in-progress.svg';
import failedImage from '../assets/failed.svg';

function StatusBoard() {
  const [tickets, setTickets] = useState([
    { id: 101, title: 'Reset password email', status: 'completed' },
    { id: 102, title: 'Import customer list', status: 'completed' },
    { id: 103, title: 'Parse supplier website', status: 'in-progress' },
    { id: 104, title: 'Send weekly report', status: 'failed' },
  ]);
  const [openStatus, setOpenStatus] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newStatus, setNewStatus] = useState('in-progress');

  // Task 4: count the tickets in one status
  const ticketsWith = (status) => tickets.filter((ticket) => ticket.status === status);

  // Bonus 1: open or close a status card
  const toggleOpen = (status) => setOpenStatus(openStatus === status ? null : status);

  // Bonus 2: add a ticket, and the counts update by themselves
  const addTicket = (event) => {
    event.preventDefault();
    if (newTitle.trim() === '') {
      return;
    }
    const nextId = Math.max(100, ...tickets.map((ticket) => ticket.id)) + 1;
    setTickets([...tickets, { id: nextId, title: newTitle.trim(), status: newStatus }]);
    setNewTitle('');
  };

  // Bonus 2 and 3: move a ticket to another status
  const changeStatus = (id, status) => {
    setTickets(tickets.map((ticket) => (ticket.id === id ? { ...ticket, status } : ticket)));
  };

  // The three cards share everything except these values
  const columns = [
    { result: 'completed', image: completedImage, label: 'Completed' },
    { result: 'in-progress', image: inProgressImage, label: 'In Progress' },
    { result: 'failed', image: failedImage, label: 'Failed' },
  ];

  return (
    <div className="status-board">
      <h1>Ticket Status Board</h1>
      <p className="status-board__hint">Click a status to see its tickets and move them.</p>

      {/* Task 3: a flex row of three TicketInfo components */}
      <div className="status-board__row">
        {columns.map((column) => (
          <TicketInfo
            key={column.result}
            result={column.result}
            image={column.image}
            count={ticketsWith(column.result).length}
            tickets={ticketsWith(column.result)}
            isOpen={openStatus === column.result}
            onClick={() => toggleOpen(column.result)}
            onChangeStatus={changeStatus}
          >
            {/* props.children: the status text */}
            {column.label}
          </TicketInfo>
        ))}
      </div>

      <form className="status-board__form" onSubmit={addTicket}>
        <h2>Add a Ticket</h2>
        <div className="status-board__fields">
          <input value={newTitle} onChange={(event) => setNewTitle(event.target.value)} placeholder="Ticket title" aria-label="Ticket title" />
          <select value={newStatus} onChange={(event) => setNewStatus(event.target.value)} aria-label="New ticket status">
            <option value="completed">Completed</option>
            <option value="in-progress">In Progress</option>
            <option value="failed">Failed</option>
          </select>
          <button type="submit">Add Ticket</button>
        </div>
      </form>
    </div>
  );
}

export default StatusBoard;
