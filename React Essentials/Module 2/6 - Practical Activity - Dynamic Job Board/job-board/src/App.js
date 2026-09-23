import React from 'react';
import './App.css';
import JobBoard from './JobBoard';

function App() {
  return (
    <div className="App">
      <main className="container">
        {/* The job board from the task: TechCorp with 5 jobs */}
        <JobBoard />

        {/* Task 4: testing different jobCount values */}
        <h2 className="section-title">Testing different job counts</h2>
        <div className="board-grid">
          <JobBoard jobCount={0} />
          <JobBoard jobCount={1} />
          <JobBoard jobCount={8} />
        </div>
      </main>
    </div>
  );
}

export default App;
