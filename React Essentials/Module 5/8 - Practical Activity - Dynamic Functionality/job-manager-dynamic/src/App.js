import React, { useState, useEffect } from 'react';
import './App.css';
import JobForm from './components/JobForm';
import JobColumn from './components/JobColumn';
import needToStartIcon from './assets/need-to-start.svg';
import inProgressIcon from './assets/in-progress.svg';
import completedIcon from './assets/completed.svg';

const STARTING_JOBS = [
  { id: 1, title: 'Check the support inbox', category: 'Read Emails', status: 'need-to-start' },
  { id: 2, title: 'Scrape competitor prices', category: 'Web Parsing', status: 'in-progress' },
  { id: 3, title: 'Send the monthly newsletter', category: 'Send Emails', status: 'completed' },
];

// Bonus 3: load saved jobs, or the starting jobs if nothing is saved
const loadJobs = () => {
  try {
    const saved = JSON.parse(localStorage.getItem('jobs'));
    return Array.isArray(saved) ? saved : STARTING_JOBS;
  } catch {
    return STARTING_JOBS;
  }
};

const COLUMNS = [
  { status: 'need-to-start', title: 'Need to Start', image: needToStartIcon },
  { status: 'in-progress', title: 'In Progress', image: inProgressIcon },
  { status: 'completed', title: 'Completed', image: completedIcon },
];

function App() {
  // Instruction 1: the job list lives in state
  const [jobs, setJobs] = useState(loadJobs);
  const [search, setSearch] = useState('');

  // Bonus 3: save the jobs whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('jobs', JSON.stringify(jobs));
    } catch {
      // storage is full or blocked: the app still works, it just won't remember
    }
  }, [jobs]);

  // Task 1: remove the job with this id. filter makes a new array, so state isn't changed directly
  const deleteJob = (id) => {
    setJobs((previous) => previous.filter((job) => job.id !== id));
  };

  // Task 2: change one job's status with map and a copied object
  const updateJobStatus = (id, status) => {
    setJobs((previous) => previous.map((job) => (job.id === id ? { ...job, status } : job)));
  };

  // Task 3: create a job object and add it to a new array
  const addNewJob = (title, category, status) => {
    setJobs((previous) => [...previous, { id: Date.now(), title, category, status }]);
  };

  // Bonus 2: search by title
  const term = search.trim().toLowerCase();
  const visibleJobs = jobs.filter((job) => job.title.toLowerCase().includes(term));

  return (
    <div className="app">
      <h1 className="app__title">Job Management</h1>
      <JobForm addNewJob={addNewJob} />

      <input
        type="search"
        className="app__search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search jobs by title…"
        aria-label="Search jobs by title"
      />
      <p className="app__hint">Drag a job to another column, or change its status with the dropdown.</p>

      {/* Task 6: one column per status, each given only its own jobs */}
      <main className="app__columns">
        {COLUMNS.map((column) => (
          <JobColumn
            key={column.status}
            title={column.title}
            image={column.image}
            status={column.status}
            jobs={visibleJobs.filter((job) => job.status === column.status)}
            deleteJob={deleteJob}
            updateJobStatus={updateJobStatus}
          />
        ))}
      </main>
    </div>
  );
}

export default App;
