import React from 'react';
import './JobColumn.css';

// One reusable column. Everything that differs between columns comes in as props:
// title, image, the jobs to show, and where jobs can move to
const JobColumn = ({ title, image, jobs = [], previousStatus, nextStatus, onMoveJob }) => {
  return (
    <section className="job-column">
      <h2 className="job-column__heading">
        <img className="job-column__icon" src={image} alt="" />
        {title}
        <span className="job-column__count">{jobs.length}</span>
      </h2>

      {/* Task 5: map through the jobs in this column */}
      {jobs.length === 0 ? (
        <p className="job-column__empty">No jobs here.</p>
      ) : (
        <ul className="job-column__list">
          {jobs.map((job) => (
            <li key={job.id} className="job-card">
              <p className="job-card__title">{job.title}</p>
              <span className="job-card__category">{job.category}</span>

              {/* Bonus 1: move the job to the column before or after this one */}
              <div className="job-card__moves">
                {previousStatus && (
                  <button type="button" onClick={() => onMoveJob(job.id, previousStatus)} aria-label={`Move ${job.title} back`}>
                    ← Back
                  </button>
                )}
                {nextStatus && (
                  <button type="button" onClick={() => onMoveJob(job.id, nextStatus)} aria-label={`Move ${job.title} forward`}>
                    Next →
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default JobColumn;
