import React, { useState } from 'react';
import './JobManager.css';
import JobColumn from './JobColumn';

const CATEGORIES = ['Read Emails', 'Send Emails', 'Web Parsing'];
const STATUSES = ['Need to Complete', 'In Progress', 'Completed'];

function JobManager() {
  // Task 2: the jobs, stored in state
  const [jobs, setJobs] = useState([
    { id: 1, activity: 'Check the support inbox', categories: ['Read Emails'], status: 'Need to Complete' },
    { id: 2, activity: 'Collect competitor prices', categories: ['Web Parsing'], status: 'In Progress' },
    { id: 3, activity: 'Send the weekly summary', categories: ['Read Emails', 'Send Emails'], status: 'Completed' },
  ]);

  // Task 4: the form's fields
  const [activity, setActivity] = useState('');
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState('Need to Complete');
  const [error, setError] = useState('');

  const [editingId, setEditingId] = useState(null); // Bonus 1
  const [search, setSearch] = useState(''); // Bonus 3

  // Categories can be chosen several at a time
  const toggleCategory = (category) => {
    setCategories(categories.includes(category) ? categories.filter((c) => c !== category) : [...categories, category]);
    setError('');
  };

  const clearForm = () => {
    setActivity('');
    setCategories([]);
    setStatus('Need to Complete');
    setEditingId(null);
    setError('');
  };

  // Task 5: add the new job (or save the one being edited) when the form is submitted
  const handleSubmit = (event) => {
    event.preventDefault();
    if (activity.trim() === '' || categories.length === 0) {
      setError('Please enter an activity and choose at least one category.');
      return;
    }

    const details = { activity: activity.trim(), categories, status };
    if (editingId) {
      setJobs(jobs.map((job) => (job.id === editingId ? { ...job, ...details } : job)));
    } else {
      setJobs([...jobs, { id: Date.now(), ...details }]);
    }
    clearForm();
  };

  // Bonus 1: load a job into the form
  const startEdit = (job) => {
    setEditingId(job.id);
    setActivity(job.activity);
    setCategories(job.categories);
    setStatus(job.status);
    setError('');
  };

  // Bonus 2: move a job to another column
  const moveJob = (id, newStatus) => {
    setJobs(jobs.map((job) => (job.id === id ? { ...job, status: newStatus } : job)));
  };

  // Bonus 3: search by activity or category
  const term = search.trim().toLowerCase();
  const visibleJobs = jobs.filter(
    (job) => job.activity.toLowerCase().includes(term) || job.categories.some((c) => c.toLowerCase().includes(term))
  );

  return (
    <div className="job-manager">
      <h1>Job Manager</h1>

      <form className="job-form" onSubmit={handleSubmit} noValidate>
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
            <button type="button" className="secondary-button" onClick={clearForm}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <input
        type="search"
        className="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search by activity or category…"
        aria-label="Search jobs"
      />

      {/* Task 3: three columns, one per status */}
      <div className="columns">
        {STATUSES.map((title) => (
          <JobColumn key={title} title={title} status={title} jobs={visibleJobs} onEdit={startEdit} onMoveJob={moveJob} editingId={editingId} />
        ))}
      </div>
    </div>
  );
}

export default JobManager;
