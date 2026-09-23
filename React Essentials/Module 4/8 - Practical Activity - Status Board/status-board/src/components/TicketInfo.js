import React from 'react';
import './TicketInfo.css';

// A reusable card for one status.
// result: "completed", "in-progress" or "failed", which sets the colours
// image: the icon to show
// children: whatever is written between <TicketInfo> and </TicketInfo> (the status text)
function TicketInfo({ result, image, count = 0, isOpen = false, onClick, tickets = [], onChangeStatus, children }) {
  return (
    <section className={`ticket-info ticket-info--${result}${isOpen ? ' ticket-info--open' : ''}`}>
      {/* Bonus 1: the whole card is a button that shows the tickets in this status */}
      <button type="button" className="ticket-info__summary" onClick={onClick} aria-expanded={isOpen}>
        <img src={image} alt="" className="ticket-info__image" />
        <span className="ticket-info__text">{children}</span>
        {/* Bonus 3: the key changes with the count, so the pop animation plays again */}
        <span key={count} className="ticket-info__count">
          {count}
        </span>
      </button>

      {isOpen && (
        <ul className="ticket-info__details">
          {tickets.length === 0 && <li className="ticket-info__none">No tickets here.</li>}
          {tickets.map((ticket) => (
            <li key={ticket.id}>
              <span>
                #{ticket.id} {ticket.title}
              </span>
              <select
                value={ticket.status}
                onChange={(event) => onChangeStatus(ticket.id, event.target.value)}
                aria-label={`Status of ${ticket.title}`}
              >
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
                <option value="failed">Failed</option>
              </select>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default TicketInfo;
