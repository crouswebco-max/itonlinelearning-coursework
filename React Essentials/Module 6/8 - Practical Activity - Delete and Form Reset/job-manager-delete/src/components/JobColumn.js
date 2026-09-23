import React, { useState } from 'react';
import JobCard from './JobCard';

// Gets title, status and jobs as props, filters the jobs itself, and passes deleteJob on to each card (Task 4)
function JobColumn({ title, status, jobs, deleteJob, onEdit, onMoveJob, editingId }) {
  const [isOver, setIsOver] = useState(false);
  const columnJobs = jobs.filter((job) => job.status === status);

  // Drag and drop, from the last activity: a job dropped here moves to this column's status
  const handleDrop = (event) => {
    event.preventDefault();
    setIsOver(false);
    onMoveJob(Number(event.dataTransfer.getData('text/plain')), status);
  };

  return (
    <section
      className={isOver ? 'job-column job-column--over' : 'job-column'}
      data-status={status}
      onDragOver={(event) => {
        event.preventDefault();
        setIsOver(true);
      }}
      onDragLeave={() => setIsOver(false)}
      onDrop={handleDrop}
    >
      <h2>
        {title} <span className="job-column__count">{columnJobs.length}</span>
      </h2>
      {/* A JobCard for each job in this column */}
      {columnJobs.length === 0 ? (
        <p className="job-column__empty">No jobs here.</p>
      ) : (
        columnJobs.map((job) => <JobCard key={job.id} job={job} deleteJob={deleteJob} onEdit={onEdit} isEditing={job.id === editingId} />)
      )}
    </section>
  );
}

export default JobColumn;
