import React from 'react';
import JobItem from './JobItem';

// Task 2: map through the jobs prop and render a JobItem for each
function JobList({ jobs, onDelete }) {
  if (jobs.length === 0) {
    return <p className="empty">No jobs to show.</p>;
  }

  return (
    <ul className="job-list">
      {jobs.map((job) => (
        <JobItem key={job.id} job={job} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export default JobList;
