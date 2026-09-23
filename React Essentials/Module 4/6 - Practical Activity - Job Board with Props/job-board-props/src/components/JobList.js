import React from 'react';
import JobItem from './JobItem';

// Task 2: map the jobs prop to JobItems, passing each one its job and the functions
function JobList({ jobs = [], onDeleteJob, onEditJob }) {
  // Bonus 1: jobs might not be an array
  if (!Array.isArray(jobs) || jobs.length === 0) {
    return <p className="empty">No jobs to show.</p>;
  }

  return (
    <ul className="job-list">
      {jobs.map((job) => (
        // Task 4: the key goes on the component in the list, using the job's unique id
        <JobItem key={job.id} job={job} onDelete={onDeleteJob} onEdit={onEditJob} />
      ))}
    </ul>
  );
}

export default JobList;
