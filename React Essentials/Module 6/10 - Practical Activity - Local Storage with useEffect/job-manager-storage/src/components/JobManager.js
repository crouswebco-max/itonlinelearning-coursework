import React, { useState, useEffect } from 'react';
import './JobManager.css';
import JobColumn from './JobColumn';

const CATEGORIES = ['Read Emails', 'Send Emails', 'Web Parsing'];
const STATUSES = ['Need to Complete', 'In Progress', 'Completed'];

// Bonus 2: a readable time, like "23 Sep, 14:05"
const formatTime = (timestamp) =>
  new Date(timestamp).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });

function JobManager() {
  // Task 3: read the saved jobs once, when the component first renders.
  // A function passed to useState only runs the first time
  const [jobs, setJobs] = useState(() => {
    try {
      const savedJobs = localStorage.getItem('jobs');
      return savedJobs ? JSON.parse(savedJobs) : [];
    } catch {
      return []; // the saved data was broken, or storage is blocked
    }
  });

  // Task 4: save the jobs whenever the jobs state changes.
  // [jobs] is the dependency array: the effect only runs when jobs changes
  useEffect(() => {
    try {
      localStorage.setItem('jobs', JSON.stringify(jobs));
    } catch {
      // storage is blocked: the app still works, it just won't remember
    }
  }, [jobs]);

  // The form's fields. Every input is controlled
  const [activity, setActivity] = useState('');
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState('Need to Complete');
  const [error, setError] = useState('');

  const [editingId, setEditingId] = useState(null); // Bonus 1: editing
  const [search, setSearch] = useState(''); // search, from an earlier activity

  // Categories can be chosen several at a time
  const toggleCategory = (category) => {
    setCategories(categories.includes(category) ? categories.filter((c) => c !== category) : [...categories, category]);
    setError('');
  };

  // Puts every field back to its starting value (from the last activity)
  const resetForm = () => {
    setActivity('');
    setCategories([]);
    setStatus('Need to Complete');
    setEditingId(null);
    setError('');
  };

  // Task 6: delete using the current jobs (prevJobs). It still asks first, as in the last activity
  const deleteJob = (jobId) => {
    const job = jobs.find((j) => j.id === jobId);
    if (!window.confirm(`Delete "${job.activity}"? This can't be undone.`)) {
      return;
    }
    setJobs((prevJobs) => prevJobs.filter((j) => j.id !== jobId));
    if (editingId === jobId) {
      resetForm();
    }
  };

  // Task 7: remove every job, and the saved copy
  const clearAllJobs = () => {
    if (jobs.length === 0 || !window.confirm('Delete every job? This cannot be undone.')) {
      return;
    }
    setJobs([]);
    localStorage.removeItem('jobs');
    resetForm();
  };

  // Task 5: add the job using the current jobs (prevJobs), then reset the form.
  // Bonus 1: when editing, the change is saved to localStorage by the same useEffect
  const addJob = (event) => {
    event.preventDefault();
    if (activity.trim() === '' || categories.length === 0) {
      setError('Please enter an activity and choose at least one category.');
      return;
    }

    const details = { activity: activity.trim(), categories, status };
    if (editingId) {
      setJobs((prevJobs) => prevJobs.map((job) => (job.id === editingId ? { ...job, ...details } : job)));
    } else {
      // Bonus 2: createdAt records when the job was added
      const newJob = { id: Date.now(), createdAt: Date.now(), ...details };
      setJobs((prevJobs) => [...prevJobs, newJob]);
    }
    resetForm();
  };

  // Bonus 1: load a job into the form
  const startEdit = (job) => {
    setEditingId(job.id);
    setActivity(job.activity);
    setCategories(job.categories);
    setStatus(job.status);
    setError('');
  };

  // Bonus 3: drag and drop a job into another column
  const moveJob = (id, newStatus) => {
    setJobs((prevJobs) => prevJobs.map((job) => (job.id === id ? { ...job, status: newStatus } : job)));
  };

  // Search by activity or category, from an earlier activity
  const term = search.trim().toLowerCase();
  // Bonus 2: newest first, so each column is sorted by the date it was added
  const visibleJobs = jobs
    .filter((job) => job.activity.toLowerCase().includes(term) || job.categories.some((c) => c.toLowerCase().includes(term)))
    .sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0));

  return (
    <div className="job-manager">
      <h1>Job Manager</h1>

      <form className="job-form" onSubmit={addJob} noValidate>
        <h2>{editingId ? 'Edit Job' : 'Add a Job'}</h2>
        <label className="field">
          <span>Job activity</span>
          <input value={activity} onChange={(event) => setActivity(event.target.value)} placeholder="What needs doing?" />
        </label>

        <fieldset className="field">
          <legend>Categories</legend>
          <div className="category-buttons">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                className={categories.includes(category) ? 'category-button category-button--selected' : 'category-button'}
                aria-pressed={categories.includes(category)}
                onClick={() => toggleCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </fieldset>

        <label className="field">
          <span>Status</span>
          <select value={status} onChange={(event) => setStatus(event.target.value)}>
            {STATUSES.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>

        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}

        <div className="form-buttons">
          <button type="submit" className="primary-button">
            {editingId ? 'Save Changes' : 'Add Job'}
          </button>
          {editingId && (
            <button type="button" className="secondary-button" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="board-toolbar">
        <p className="saved-note">
          {jobs.length} {jobs.length === 1 ? 'job' : 'jobs'} saved in this browser
        </p>
        {/* Task 8: the Clear All Jobs button */}
        <button type="button" className="clear-button" onClick={clearAllJobs} disabled={jobs.length === 0}>
          Clear All Jobs
        </button>
      </div>

      <input
        type="search"
        className="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search by activity or category…"
        aria-label="Search jobs"
      />

      {/* One column per status */}
      <div className="columns">
        {STATUSES.map((title) => (
          <JobColumn key={title} title={title} status={title} jobs={visibleJobs} deleteJob={deleteJob} onEdit={startEdit} formatTime={formatTime} onMoveJob={moveJob} editingId={editingId} />
        ))}
      </div>
    </div>
  );
}

export default JobManager;
