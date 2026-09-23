import React, { useState } from 'react';
import './App.css';
import AppForm from './components/AppForm';
import JobColumn from './components/JobColumn';
// Task 2: import the icons for each status
import needToStartIcon from './assets/need-to-start.svg';
import inProgressIcon from './assets/in-progress.svg';
import completedIcon from './assets/completed.svg';

function App() {
  // Task 4: an array of job objects in state
  const [jobs, setJobs] = useState([
    { id: 1, title: 'Check the support inbox', category: 'Read Emails', status: 'need-to-start' },
    { id: 2, title: 'Scrape competitor prices', category: 'Web Parsing', status: 'in-progress' },
    { id: 3, title: 'Send the monthly newsletter', category: 'Send Emails', status: 'completed' },
    { id: 4, title: 'Collect new supplier listings', category: 'Web Parsing', status: 'need-to-start' },
  ]);
  const [search, setSearch] = useState('');

  const addJob = (job) => {
    const nextId = jobs.length > 0 ? Math.max(...jobs.map((j) => j.id)) + 1 : 1;
    setJobs([...jobs, { ...job, id: nextId }]);
  };

  // Bonus 1: change a job's status, which moves it to another column
  const moveJob = (id, status) => {
    setJobs(jobs.map((job) => (job.id === id ? { ...job, status } : job)));
  };

  // Bonus 3: search every column by title or category
  const term = search.trim().toLowerCase();
  const matchingJobs = jobs.filter(
    (job) => job.title.toLowerCase().includes(term) || job.category.toLowerCase().includes(term)
  );

  // Task 4: pass each column only the jobs with its status
  const jobsWith = (status) => matchingJobs.filter((job) => job.status === status);

  return (
    <div className="app">
      <h1 className="app__title">Job Management</h1>
      <AppForm onAddJob={addJob} />

      <input
        type="search"
        className="app__search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search all jobs…"
        aria-label="Search all jobs"
      />

      {/* Task 2: three JobColumns, one reusable component with different props */}
      <main className="app__columns">
        <JobColumn title="Need to Start" image={needToStartIcon} jobs={jobsWith('need-to-start')} nextStatus="in-progress" onMoveJob={moveJob} />
        <JobColumn
          title="In Progress"
          image={inProgressIcon}
          jobs={jobsWith('in-progress')}
          previousStatus="need-to-start"
          nextStatus="completed"
          onMoveJob={moveJob}
        />
        <JobColumn title="Completed" image={completedIcon} jobs={jobsWith('completed')} previousStatus="in-progress" onMoveJob={moveJob} />
      </main>
    </div>
  );
}

export default App;
