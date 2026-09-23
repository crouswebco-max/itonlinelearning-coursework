import React, { useState } from 'react';
import './App.css';
import AppForm from './components/AppForm';

function App() {
  // Bonus 2: dark mode on or off
  const [isDark, setIsDark] = useState(false);

  return (
    <div className={isDark ? 'app app--dark' : 'app'}>
      <header className="app__header">
        <h1>Job Management</h1>
        <button type="button" className="theme-toggle" onClick={() => setIsDark(!isDark)} aria-pressed={isDark}>
          {isDark ? '☀️ Light mode' : '🌙 Dark mode'}
        </button>
      </header>
      <AppForm />
    </div>
  );
}

export default App;
