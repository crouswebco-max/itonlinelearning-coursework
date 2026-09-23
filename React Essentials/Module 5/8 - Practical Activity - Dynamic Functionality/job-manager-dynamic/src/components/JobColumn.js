import React, { useState } from 'react';
import './JobColumn.css';
import JobStatus from './JobStatus';

const JobColumn = ({ title, image, status, jobs = [], deleteJob, updateJobStatus }) => {
  const [isOver, setIsOver] = useState(false);

  // Bonus 1: dropping a dragged job here gives it this column's status
  const handleDrop = (event) => {
    event.preventDefault();
    setIsOver(false);
    const id = Number(event.dataTransfer.getData('text/plain'));
    if (id) {
      updateJobStatus(id, status);
    }
  };

  return (
    <section
      className={isOver ? 'job-column job-column--over' : 'job-column'}
      onDragOver={(event) => {
        event.preventDefault(); // allows dropping
        setIsOver(true);
      }}
      onDragLeave={() => setIsOver(false)}
      onDrop={handleDrop}
    >
      <h2 className="job-column__heading">
        <img className="job-column__icon" src={image} alt="" />
        {title}
        <span className="job-column__count">{jobs.length}</span>
      </h2>

      {jobs.length === 0 ? (
        <p className="job-column__empty">Drop jobs here.</p>
      ) : (
        <ul className="job-column__list">
          {jobs.map((job) => (
            <JobStatus key={job.id} job={job} deleteJob={deleteJob} updateJobStatus={updateJobStatus} />
          ))}
        </ul>
      )}
    </section>
  );
};

export default JobColumn;
