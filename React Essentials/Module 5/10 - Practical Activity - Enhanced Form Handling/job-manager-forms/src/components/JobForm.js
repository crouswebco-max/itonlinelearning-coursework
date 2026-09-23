import React, { useState, useEffect } from 'react';
import './AppForm.css';

const CATEGORIES = ['Read Emails', 'Web Parsing', 'Send Emails'];
const INITIAL_DETAILS = { title: '', category: '', status: '' };
const MIN_TITLE = 3;

// Bonus 1: an error message for each field, or '' if the field is fine
const getErrors = (details) => ({
  title:
    details.title.trim() === ''
      ? 'Please enter a job title.'
      : details.title.trim().length < MIN_TITLE
        ? `The job title must be at least ${MIN_TITLE} characters.`
        : '',
  category: details.category === '' ? 'Please choose a category.' : '',
  status: details.status === '' ? 'Please choose a status.' : '',
});

// A form that only handles the form. It passes finished jobs up with onSave
const JobForm = ({ onSave, jobToEdit = null, onCancelEdit }) => {
  const [jobDetails, setJobDetails] = useState(INITIAL_DETAILS);
  const [touched, setTouched] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // Bonus 2: when a job is picked for editing, put its details in the form
  useEffect(() => {
    if (jobToEdit) {
      setJobDetails({ title: jobToEdit.title, category: jobToEdit.category, status: jobToEdit.status });
      setTouched({});
      setSuccessMessage('');
    }
  }, [jobToEdit]);

  const errors = getErrors(jobDetails);
  const isValid = !errors.title && !errors.category && !errors.status;

  // Task 1: one handler for every input. The input's name says which property to update
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setJobDetails((previous) => ({ ...previous, [name]: value }));
    setTouched((previous) => ({ ...previous, [name]: true }));
    setSuccessMessage('');
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched((previous) => ({ ...previous, [name]: true }));
  };

  // Task 4: back to the starting values
  const resetForm = () => {
    setJobDetails(INITIAL_DETAILS);
    setTouched({});
  };

  // Task 2: stop the page reloading, log the details, hand them up and reset
  const handleSubmit = (event) => {
    event.preventDefault();

    // Task 3: if anything is missing, show every error instead of submitting
    if (!isValid) {
      setTouched({ title: true, category: true, status: true });
      return;
    }

    const job = { ...jobDetails, title: jobDetails.title.trim() };
    console.log('Job details:', job);
    onSave(job);

    // Task 5: feedback that it worked
    setSuccessMessage(jobToEdit ? `Saved changes to "${job.title}".` : `"${job.title}" was added.`);
    resetForm();
  };

  const handleCancel = () => {
    resetForm();
    setSuccessMessage('');
    onCancelEdit();
  };

  const showError = (field) => touched[field] && errors[field];

  return (
    <div className="form-header">
      <form onSubmit={handleSubmit} noValidate>
        <h2 className="form-title">{jobToEdit ? 'Edit Job' : 'Add a Job'}</h2>

        <label htmlFor="title" className="field-label">
          Job title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          className="bot-input"
          placeholder="Enter the job"
          value={jobDetails.title}
          onChange={handleInputChange}
          onBlur={handleBlur}
          aria-invalid={Boolean(showError('title'))}
          aria-describedby="title-error"
        />
        {showError('title') && (
          <p id="title-error" className="field-error">
            {errors.title}
          </p>
        )}

        <div className="form-details">
          {/* Categories are radio buttons styled as tags, so they share handleInputChange */}
          <fieldset className="bottom-line" aria-describedby="category-error">
            <legend className="field-label">Category</legend>
            {CATEGORIES.map((name) => (
              <label key={name} className={jobDetails.category === name ? 'tag tag--selected' : 'tag'}>
                <input
                  type="radio"
                  name="category"
                  value={name}
                  checked={jobDetails.category === name}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className="visually-hidden"
                />
                {name}
              </label>
            ))}
          </fieldset>

          <div className="status-field">
            <label htmlFor="status" className="field-label">
              Status
            </label>
            <select
              id="status"
              name="status"
              className="job-status"
              value={jobDetails.status}
              onChange={handleInputChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(showError('status'))}
              aria-describedby="status-error"
            >
              <option value="">Choose…</option>
              <option value="need-to-start">Need to Start</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
        {showError('category') && (
          <p id="category-error" className="field-error">
            {errors.category}
          </p>
        )}
        {showError('status') && (
          <p id="status-error" className="field-error">
            {errors.status}
          </p>
        )}

        <div className="form-actions">
          {/* Task 3: disabled until every field is valid */}
          <button type="submit" className="submit-data" disabled={!isValid}>
            {jobToEdit ? 'Save Changes' : 'Add Job'}
          </button>
          <button type="button" className="reset-data" onClick={jobToEdit ? handleCancel : resetForm}>
            {jobToEdit ? 'Cancel' : 'Reset'}
          </button>
          {!isValid && <span className="form-hint">Fill in every field to {jobToEdit ? 'save' : 'add the job'}.</span>}
        </div>

        {successMessage && (
          <p className="form-message" role="status">
            ✅ {successMessage}
          </p>
        )}
      </form>
    </div>
  );
};

export default JobForm;
