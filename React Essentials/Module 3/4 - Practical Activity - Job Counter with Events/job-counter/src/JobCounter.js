import React from 'react';

const JobCounter = () => {
  // 5. A regular variable to keep track of the job count
  let jobCount = 0;

  // 3. Called when the button is clicked
  const handleAddJob = () => {
    // Task 1: increment the variable
    jobCount = jobCount + 1;

    // Task 2: log the new value. The console shows 1, 2, 3...
    console.log('Job count is now:', jobCount);
  };

  // Task 4: the number on the page stays at 0, because changing a regular
  // variable doesn't tell React to render the component again
  return (
    <div className="counter">
      <h1>Job Counter</h1>
      <p className="count">Current Jobs: {jobCount}</p>
      {/* 4. onClick calls handleAddJob when the button is clicked */}
      <button onClick={handleAddJob}>Add Job</button>
    </div>
  );
};

export default JobCounter;
