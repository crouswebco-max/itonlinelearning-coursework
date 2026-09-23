import React from 'react';

// Task 5: one job card, with a status dropdown and a delete button.
// It doesn't change any state itself: it calls the functions App passed down
const JobStatus = ({ job, deleteJob, updateJobStatus }) => {
  // Bonus 1: remember which job is being dragged
  const handleDragStart = (event) => {
    event.dataTransfer.setData('text/plain', String(job.id));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <li className="job-card" draggable onDragStart={handleDragStart}>
      <p className="job-card__title">{job.title}</p>
      <span className="job-card__category">{job.category}</span>

      <div className="job-card__actions">
        <select
          value={job.status}
          onChange={(event) => updateJobStatus(job.id, event.target.value)}
          aria-label={`Status of ${job.title}`}
        >
          <option value="need-to-start">Need to Start</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button type="button" className="job-card__delete" onClick={() => deleteJob(job.id)} aria-label={`Delete ${job.title}`}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default JobStatus;
