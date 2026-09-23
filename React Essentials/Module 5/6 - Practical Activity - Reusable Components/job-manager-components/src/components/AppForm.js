import React, { useState } from 'react';
import './AppForm.css';

const CATEGORIES = ['Read Emails', 'Web Parsing', 'Send Emails'];

// The form from the last activity, now reusable: it hands the new job to its parent with onAddJob
const AppForm = ({ onAddJob }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title.trim() === '' || category === '') {
      setMessage('Please enter a job and choose a category.');
      return;
    }
    // Bonus 2: new jobs go into the "Need to Start" column
    onAddJob({ title: title.trim(), category, status: 'need-to-start' });
    setMessage(`Added "${title.trim()}" to Need to Start.`);
    setTitle('');
    setCategory('');
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
