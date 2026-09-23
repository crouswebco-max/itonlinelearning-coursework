import React from 'react';

// Task 3: one job, styled by its status
function JobItem({ job, onDelete }) {
  const isCompleted = job.status === 'completed';

  return (
    <li className={`job-item ${isCompleted ? 'job-item--completed' : 'job-item--running'}`}>
      <div>
        <h3 className="job-item__name">{job.name}</h3>
        <p className="job-item__status">
          {/* Conditional rendering: a different icon and text for each status */}
          {isCompleted ? '✅ Completed' : '⏳ Running'}
        </p>
      </div>
      {/* Bonus 1: delete */}
      <button type="button" className="job-item__delete" onClick={() => onDelete(job.id)} aria-label={`Delete ${job.name}`}>
        Delete
      </button>
    </li>
  );
}

export default JobItem;
