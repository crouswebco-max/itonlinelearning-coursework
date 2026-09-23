import React, { useState } from 'react';

const STATUSES = ['Pending', 'Running', 'Completed', 'Failed'];

// Task 3: shows one job. It gets the data AND the functions it needs as props.
// Bonus 1: default values mean missing props don't crash the component
function JobItem({ job, onDelete = () => {}, onEdit = () => {} }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftName, setDraftName] = useState(job?.name ?? '');
  const [draftStatus, setDraftStatus] = useState(job?.status ?? 'Pending');

  // Bonus 1: nothing to show without a job
  if (!job) {
    return null;
  }

  const name = job.name || 'Untitled job';
  const status = STATUSES.includes(job.status) ? job.status : 'Pending';

  // Bonus 2: save the edited job by passing it UP to App
  const handleSave = (event) => {
    event.preventDefault();
    if (draftName.trim() === '') {
      return;
    }
    onEdit({ ...job, name: draftName.trim(), status: draftStatus });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <li className={`job-item job-item--${status.toLowerCase()}`}>
        <form className="job-item__edit" onSubmit={handleSave}>
          <input value={draftName} onChange={(event) => setDraftName(event.target.value)} aria-label="Job name" />
          <select value={draftStatus} onChange={(event) => setDraftStatus(event.target.value)} aria-label="Job status">
            {STATUSES.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          <button type="submit" className="button">
            Save
          </button>
          <button type="button" className="button button--secondary" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      </li>
    );
  }

  return (
    // The status sets the CSS class, and so the colour
    <li className={`job-item job-item--${status.toLowerCase()}`}>
      <div className="job-item__text">
        <h3 className="job-item__name">{name}</h3>
        <span className="job-item__status">{status}</span>
      </div>
      <div className="job-item__actions">
        <button type="button" className="button button--secondary" onClick={() => setIsEditing(true)} aria-label={`Edit ${name}`}>
          Edit
        </button>
        {/* The delete button calls the function that came down from App */}
        <button type="button" className="button button--danger" onClick={() => onDelete(job.id)} aria-label={`Delete ${name}`}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default JobItem;
