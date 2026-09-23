import React, { useState } from 'react';
import JobCard from './JobCard';

// Task 6: gets title, status and jobs as props, and filters the jobs itself
function JobColumn({ title, status, jobs, onEdit, onMoveJob, editingId }) {
  const [isOver, setIsOver] = useState(false);
  const columnJobs = jobs.filter((job) => job.status === status);

  // Bonus 2: a job dropped here moves to this column's status
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
      {/* Task 8: a JobCard for each job in this column */}
      {columnJobs.length === 0 ? (
        <p className="job-column__empty">No jobs here.</p>
      ) : (
        columnJobs.map((job) => <JobCard key={job.id} job={job} onEdit={onEdit} isEditing={job.id === editingId} />)
      )}
    </section>
  );
}

export default JobColumn;
