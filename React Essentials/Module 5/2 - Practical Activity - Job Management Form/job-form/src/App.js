import React from 'react';
import './App.css';
import JobForm from './components/JobForm';

// Task 6: the JobForm is used in App
function App() {
  return (
    <div className="app">
      <h1>Job Management</h1>
      <JobForm />
    </div>
  );
}

export default App;
