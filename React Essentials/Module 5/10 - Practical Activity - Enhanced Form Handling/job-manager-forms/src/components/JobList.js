import React from 'react';
import './JobList.css';

const STATUS_NAMES = { 'need-to-start': 'Need to Start', 'in-progress': 'In Progress', completed: 'Completed' };

// Task 6: a separate component that only displays the jobs
const JobList = ({ jobs = [], onEdit, onDelete, editingId }) => {
  if (jobs.length === 0) {
    return <p className="job-list__empty">No jobs yet. Add one with the form above.</p>;
  }

  return (
    <ul className="job-list">
      {jobs.map((job) => (
        <li key={job.id} className={job.id === editingId ? 'job-row job-row--editing' : 'job-row'}>
          <div>
            <p className="job-row__title">{job.title}</p>
            <span className="job-row__category">{job.category}</span>
            <span className={`job-row__status job-row__status--${job.status}`}>{STATUS_NAMES[job.status]}</span>
          </div>
          <div className="job-row__actions">
            <button type="button" onClick={() => onEdit(job)} aria-label={`Edit ${job.title}`}>
              Edit
            </button>
            <button type="button" className="job-row__delete" onClick={() => onDelete(job.id)} aria-label={`Delete ${job.title}`}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default JobList;
