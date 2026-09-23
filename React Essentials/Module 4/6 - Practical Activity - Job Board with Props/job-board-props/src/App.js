import React, { useState } from 'react';
import './App.css';
import JobList from './components/JobList';

const FILTERS = ['All', 'Pending', 'Running', 'Completed', 'Failed'];

function App() {
  // The jobs live here, in App. Data flows DOWN through props
  const [jobs, setJobs] = useState([
    { id: 1, name: 'Read Emails', status: 'Completed' },
    { id: 2, name: 'Web Parsing', status: 'Running' },
    { id: 3, name: 'Send Emails', status: 'Pending' },
    { id: 4, name: 'Backup Database', status: 'Failed' },
  ]);
  const [newJobName, setNewJobName] = useState('');
  const [filter, setFilter] = useState('All');

  // Task 1: remove a job. JobItem calls this through props, so actions flow UP
  const handleDeleteJob = (id) => {
    setJobs(jobs.filter((job) => job.id !== id));
  };

  // Bonus 2: replace a job with its edited copy
  const handleEditJob = (updatedJob) => {
    setJobs(jobs.map((job) => (job.id === updatedJob.id ? updatedJob : job)));
  };

  // Task 5 (optional): add a job
  const handleAddJob = (event) => {
    event.preventDefault();
    if (newJobName.trim() === '') {
      return;
    }
    const nextId = jobs.length > 0 ? Math.max(...jobs.map((job) => job.id)) + 1 : 1;
    setJobs([...jobs, { id: nextId, name: newJobName.trim(), status: 'Pending' }]);
    setNewJobName('');
  };

  // Bonus 3: only show jobs with the chosen status
  const visibleJobs = filter === 'All' ? jobs : jobs.filter((job) => job.status === filter);

  return (
    <div className="app">
      <main className="container">
        <h1>Job Board</h1>

        <form className="add-job" onSubmit={handleAddJob}>
          <input
            value={newJobName}
            onChange={(event) => setNewJobName(event.target.value)}
            placeholder="New job name"
            aria-label="New job name"
          />
          <button type="submit" className="button">
            Add Job
          </button>
        </form>

        <div className="filters" role="group" aria-label="Filter by status">
          {FILTERS.map((option) => (
            <button
              key={option}
              type="button"
              className="filter"
              aria-pressed={filter === option}
              onClick={() => setFilter(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <JobList jobs={visibleJobs} onDeleteJob={handleDeleteJob} onEditJob={handleEditJob} />
      </main>
    </div>
  );
}

export default App;
