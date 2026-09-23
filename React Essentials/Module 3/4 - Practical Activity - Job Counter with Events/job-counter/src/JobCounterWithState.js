import React, { useState } from 'react';

// Bonus: the same counter using the useState hook
const JobCounterWithState = () => {
  // jobCount is state, and setJobCount is the only way to change it
  const [jobCount, setJobCount] = useState(0);

  const handleAddJob = () => {
    // Calling the setter tells React to render the component again with the new value
    setJobCount(jobCount + 1);
    console.log('useState version: asked React to change the count to', jobCount + 1);
  };

  return (
    <div className="counter counter--state">
      <h1>Job Counter</h1>
      <p className="count">Current Jobs: {jobCount}</p>
      <button onClick={handleAddJob}>Add Job</button>
    </div>
  );
};

export default JobCounterWithState;
