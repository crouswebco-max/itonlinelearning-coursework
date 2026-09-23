import React, { useState } from 'react';
import './JobForm.css';
import useCategorySelection from '../hooks/useCategorySelection';

const CATEGORIES = ['Read Emails', 'Web Parsing', 'Send Emails', 'Data Entry', 'Reports', 'File Backup', 'Invoices', 'Scheduling'];
const MAX_CATEGORIES = 3;

const JobForm = () => {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('need-to-start');
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Task 1: the category toggle logic lives in the custom hook
  const categories = useCategorySelection(MAX_CATEGORIES);

  const handleCategoryToggle = (category) => {
    categories.toggle(category);
    setError('');
  };

  // The job being built, including the selected categories
  const jobDetails = { title: title.trim(), categories: categories.selected, status };

  // Task 4: log the job with its categories
  const handleSubmit = (event) => {
    event.preventDefault();

    // Task 5: a title and at least one category are needed
    if (jobDetails.title === '') {
      setError('Please enter a job title.');
      return;
    }
    if (jobDetails.categories.length === 0) {
      setError('Please select at least one category.');
      return;
    }

    console.log('Job details:', jobDetails);
    setMessage(`Added "${jobDetails.title}" with ${jobDetails.categories.join(', ')}. See the console.`);
    setError('');
    setTitle('');
    categories.clear();
  };

  // Bonus 2: filter the category buttons by the search text
  const visibleCategories = CATEGORIES.filter((category) => category.toLowerCase().includes(search.trim().toLowerCase()));

  return (
    <div className="form-header">
      <form onSubmit={handleSubmit} noValidate>
        <input
          type="text"
          className="bot-input"
          placeholder="Enter the job"
          aria-label="Job title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
            setError('');
          }}
        />

        <div className="category-header">
          <span className="field-label">
            Categories ({categories.selected.length}/{MAX_CATEGORIES})
          </span>
          <input
            type="search"
            className="category-search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Filter categories…"
            aria-label="Filter categories"
          />
        </div>

        <div className="bottom-line" role="group" aria-label="Categories">
          {visibleCategories.map((category) => {
            const selected = categories.isSelected(category);
            return (
              // Task 2: selected buttons get a different style
              <button
                key={category}
                type="button"
                className={selected ? 'tag tag--selected' : 'tag'}
                aria-pressed={selected}
                onClick={() => handleCategoryToggle(category)}
                disabled={!selected && categories.isFull}
              >
                {selected ? '✓ ' : ''}
                {category}
              </button>
            );
          })}
          {visibleCategories.length === 0 && <span className="no-match">No categories match "{search}".</span>}
        </div>
        {categories.limitMessage && <p className="field-error">{categories.limitMessage}</p>}

        {/* Task 3: the selected categories */}
        <div className="selected-box" aria-live="polite">
          <strong>Selected:</strong>{' '}
          {categories.selected.length === 0 ? (
            <span className="no-match">none yet</span>
          ) : (
            categories.selected.map((category) => (
              <span key={category} className="selected-chip">
                {category}
              </span>
            ))
          )}
        </div>

        <div className="form-actions">
          <select className="job-status" aria-label="Job status" value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="need-to-start">Need to Start</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          {/* Task 6: clear every selected category */}
          <button type="button" className="reset-data" onClick={categories.clear} disabled={categories.selected.length === 0}>
            Clear Categories
          </button>
          <button type="submit" className="submit-data">
            Add Job
          </button>
        </div>

        {error && (
          <p className="field-error" role="alert">
            {error}
          </p>
        )}
        {message && (
          <p className="form-message" role="status">
            ✅ {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default JobForm;
