import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import JobList from './components/JobList';

const STARTING_JOBS = [
  { id: 1, name: 'Read Emails', status: 'completed' },
  { id: 2, name: 'Web Parsing', status: 'running' },
  { id: 3, name: 'Send Emails', status: 'running' },
];

function App() {
  const [jobs, setJobs] = useState(STARTING_JOBS);
  const [showJobs, setShowJobs] = useState(true); // Task 4
  const [search, setSearch] = useState(''); // Bonus 2
  const [newName, setNewName] = useState(''); // Bonus 3
  const [newStatus, setNewStatus] = useState('running');

  const nextId = () => (jobs.length > 0 ? Math.max(...jobs.map((job) => job.id)) + 1 : 1);

  // Task 6: add a job with a default name
  const handleAddJob = () => {
    const id = nextId();
    setJobs([...jobs, { id, name: `New Job ${id}`, status: 'running' }]);
  };

  // Bonus 3: add a job with custom details
  const handleSubmit = (event) => {
    event.preventDefault();
    if (newName.trim() === '') {
      return;
    }
    setJobs([...jobs, { id: nextId(), name: newName.trim(), status: newStatus }]);
    setNewName('');
  };

  // Bonus 1: delete
  const handleDelete = (id) => {
    setJobs(jobs.filter((job) => job.id !== id));
  };

  const visibleJobs = jobs.filter((job) => job.name.toLowerCase().includes(search.trim().toLowerCase()));

  return (
    <div className="app">
      <Header title="Job Board" />

      <main className="main">
        <div className="toolbar">
          <button type="button" className="button button--secondary" onClick={() => setShowJobs(!showJobs)} aria-expanded={showJobs}>
            {showJobs ? 'Hide Jobs' : 'Show Jobs'}
          </button>
          <button type="button" className="button" onClick={handleAddJob}>
            Add Job
          </button>
          <input
            type="search"
            className="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search jobs…"
            aria-label="Search jobs by name"
          />
        </div>

        {/* Task 4: the list only renders when showJobs is true */}
        {showJobs && <JobList jobs={visibleJobs} onDelete={handleDelete} />}

        <form className="job-form" onSubmit={handleSubmit}>
          <h2>Add a Custom Job</h2>
          <div className="job-form__fields">
            <input value={newName} onChange={(event) => setNewName(event.target.value)} placeholder="Job name" aria-label="Job name" />
            <select value={newStatus} onChange={(event) => setNewStatus(event.target.value)} aria-label="Job status">
              <option value="running">Running</option>
              <option value="completed">Completed</option>
            </select>
            <button type="submit" className="button">
              Add
            </button>
          </div>
        </form>
      </main>

      <Footer jobCount={jobs.length} />
    </div>
  );
}

export default App;
