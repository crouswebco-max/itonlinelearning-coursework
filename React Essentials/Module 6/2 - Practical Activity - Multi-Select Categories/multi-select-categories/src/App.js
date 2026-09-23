import React from 'react';
import './App.css';
import JobForm from './components/JobForm';

function App() {
  return (
    <div className="app">
      <h1 className="app__title">Job Management</h1>
      <JobForm />
    </div>
  );
}

export default App;
