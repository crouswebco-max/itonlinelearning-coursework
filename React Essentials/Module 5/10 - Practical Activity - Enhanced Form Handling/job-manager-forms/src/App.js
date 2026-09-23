import React, { useState, useEffect } from 'react';
import './App.css';
import JobForm from './components/JobForm';
import JobList from './components/JobList';

// Bonus 3: read saved jobs, or start with none
const loadJobs = () => {
  try {
    const saved = JSON.parse(localStorage.getItem('jobs'));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
};

function App() {
  const [jobs, setJobs] = useState(loadJobs);
  const [jobToEdit, setJobToEdit] = useState(null);

  // Bonus 3: save the jobs every time they change
  useEffect(() => {
    try {
      localStorage.setItem('jobs', JSON.stringify(jobs));
    } catch {
      // storage is full or blocked: the app still works without it
    }
  }, [jobs]);

  // Adds a new job, or replaces the one being edited
  const handleSave = (details) => {
    if (jobToEdit) {
      setJobs((previous) => previous.map((job) => (job.id === jobToEdit.id ? { ...job, ...details } : job)));
      setJobToEdit(null);
    } else {
      setJobs((previous) => [...previous, { id: Date.now(), ...details }]);
    }
  };

  const handleDelete = (id) => {
    setJobs((previous) => previous.filter((job) => job.id !== id));
    if (jobToEdit && jobToEdit.id === id) {
      setJobToEdit(null);
    }
  };

  return (
    <div className="app">
      <h1 className="app__title">Job Management</h1>
      <JobForm onSave={handleSave} jobToEdit={jobToEdit} onCancelEdit={() => setJobToEdit(null)} />

      <h2 className="app__subtitle">Added Jobs ({jobs.length})</h2>
      <JobList jobs={jobs} onEdit={setJobToEdit} onDelete={handleDelete} editingId={jobToEdit?.id} />
    </div>
  );
}

export default App;
