import React from 'react';
import logo from './logo.svg';
import './App.css';
import Goals from './Goals';

// The main component: shows my welcome message and my React goals
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="React logo" />
        <h1>Welcome to My First React App!</h1>
        <p>I'm excited to learn React!</p>

        {/* Bonus challenge: a component from its own file, Goals.js */}
        <Goals name="Juan" />
      </header>
    </div>
  );
}

export default App;
