import React from 'react';

// The variables start as TechCorp and 5 jobs, like the starter template.
// They're props with default values, so App can also show other job counts to test the messages
const JobBoard = ({ companyName = 'TechCorp', jobCount = 5 }) => {
  // Returns a different message depending on how many jobs there are
  const getJobMessage = () => {
    if (jobCount === 0) {
      return 'No jobs to schedule today';
    } else if (jobCount <= 5) {
      return `Jobs running today from bot: ${jobCount}`;
    } else {
      return `Busy day! Jobs running today from bot: ${jobCount}`;
    }
  };

  // Bonus 1: the expected number of jobs next week, rounded to a whole job
  const nextWeekJobs = Math.round(jobCount * 1.5);

  // Picks a colour for the status badge
  const status = jobCount === 0 ? 'none' : jobCount <= 5 ? 'normal' : 'busy';

  return (
    <article className={`job-board job-board--${status}`}>
      <h1>{companyName}</h1>
      <p className="job-board__message">{getJobMessage()}</p>

      <dl className="job-board__stats">
        <div>
          <dt>Today</dt>
          <dd>{jobCount}</dd>
        </div>
        <div>
          <dt>Expected next week</dt>
          <dd>{nextWeekJobs}</dd>
        </div>
      </dl>

      <p className="job-board__footer">
        {jobCount === 1 ? '1 job is' : `${jobCount} jobs are`} scheduled at {companyName}.
      </p>
    </article>
  );
};

export default JobBoard;
