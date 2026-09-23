import React, { useState } from 'react';
import './AppForm.css';

const CATEGORIES = ['Read Emails', 'Web Parsing', 'Send Emails'];

const AppForm = () => {
  // Bonus 1: state for each part of the form
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('start');
  const [message, setMessage] = useState('');

  // Bonus 2: log the form data when it's submitted
  const handleSubmit = (event) => {
    event.preventDefault();

    // Bonus 3: every field must be filled
    if (title.trim() === '' || category === '') {
      setMessage('Please enter a job and choose a category.');
      return;
    }

    const job = { title: title.trim(), category, status };
    console.log('New job:', job);
    setMessage(`Added "${job.title}". Open the console to see the job data.`);
    setTitle('');
    setCategory('');
    setStatus('start');
  };

  return (
    <div className="form-header">
      <form onSubmit={handleSubmit} noValidate>
        {/* Task 1: the job title */}
        <input
          type="text"
          className="bot-input"
          placeholder="Enter the job"
          aria-label="Job title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <div className="form-details">
          {/* Task 2: category buttons. type="button" stops them submitting the form */}
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
            {/* Task 3: the job status dropdown */}
            <select className="job-status" aria-label="Job status" value={status} onChange={(event) => setStatus(event.target.value)}>
              <option value="start">Start Process</option>
              <option value="running">Running</option>
              <option value="completed">Completed</option>
              <option value="stopped">Stopped</option>
            </select>

            {/* Task 4: the submit button */}
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

export default AppForm;
