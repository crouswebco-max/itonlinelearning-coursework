import React, { useState } from 'react';

const AdvancedJobCounter = () => {
  // Task 1: state for the job count, starting at 0
  const [jobCount, setJobCount] = useState(0);

  // Bonus 1: a second state variable for the environment
  const [environment, setEnvironment] = useState('Production');

  // Task 2: add a job. The state is never changed directly, only through setJobCount.
  // The (previous) => form always uses the latest value
  const handleAddJob = () => {
    setJobCount((previous) => previous + 1);
  };

  // Task 3: remove a job, but never go below zero
  const handleRemoveJob = () => {
    setJobCount((previous) => Math.max(previous - 1, 0));
  };

  // Task 4: back to zero
  const handleResetJobs = () => {
    setJobCount(0);
  };

  // Bonus 2: switch between Production and UAT
  const handleToggleEnvironment = () => {
    setEnvironment((previous) => (previous === 'Production' ? 'UAT' : 'Production'));
  };

  // Task 6: a different message for 0, 1–5 and more than 5 jobs
  let message;
  let level;
  if (jobCount === 0) {
    message = 'No jobs available';
    level = 'none';
  } else if (jobCount <= 5) {
    message = 'Few jobs available';
    level = 'few';
  } else {
    message = 'Many jobs available';
    level = 'many';
  }

  return (
    <div className={`job-counter job-counter--${level}`}>
      {/* Bonus 3: the current environment, shown with the job count */}
      <p className={`environment environment--${environment.toLowerCase()}`}>{environment}</p>

      <h1>Advanced Job Counter</h1>
      <p className="count">
        Current Jobs: <strong>{jobCount}</strong>
      </p>
      <p className="message" aria-live="polite">
        {message}
      </p>

      {/* Task 5: a button for each action */}
      <div className="buttons">
        <button type="button" onClick={handleAddJob}>
          Add Job
        </button>
        <button type="button" onClick={handleRemoveJob} disabled={jobCount === 0}>
          Remove Job
        </button>
        <button type="button" className="secondary" onClick={handleResetJobs} disabled={jobCount === 0}>
          Reset
        </button>
      </div>

      <button type="button" className="toggle" onClick={handleToggleEnvironment}>
        Switch to {environment === 'Production' ? 'UAT' : 'Production'}
      </button>
    </div>
  );
};

export default AdvancedJobCounter;
