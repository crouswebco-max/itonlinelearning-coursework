import React, { useState } from 'react';
import './AppForm.css';

const CATEGORIES = ['Read Emails', 'Web Parsing', 'Send Emails'];

// Task 4: a form for adding new jobs. It calls addNewJob, which comes from App as a prop
const JobForm = ({ addNewJob }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('need-to-start');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title.trim() === '' || category === '') {
      setMessage('Please enter a job and choose a category.');
      return;
    }
    addNewJob(title.trim(), category, status);
    setMessage(`Added "${title.trim()}".`);
    setTitle('');
    setCategory('');
    setStatus('need-to-start');
  };

  return (
    <div className="form-header">
      <form onSubmit={handleSubmit} noValidate>
        <input
          type="text"
          className="bot-input"
          placeholder="Enter the job"
          aria-label="Job title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <div className="form-details">
          <div className="bottom-line" role="group" aria-label="Category">
            {CATEGORIES.map((name) => (
              <button
                key={name}
                type="button"
                className={category === name ? 'tag tag--selected' : 'tag'}
                aria-pressed={category === name}
                onClick={() => setCategory(name)}
              >
                {name}
              </button>
            ))}
          </div>
          <div>
            <select className="job-status" aria-label="New job status" value={status} onChange={(event) => setStatus(event.target.value)}>
              <option value="need-to-start">Need to Start</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <button type="submit" className="submit-data">
              Add Job
            </button>
          </div>
        </div>
        {message && (
          <p className="form-message" role="status">
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default JobForm;
