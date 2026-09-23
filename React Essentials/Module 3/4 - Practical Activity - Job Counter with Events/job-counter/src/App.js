import React from 'react';
import './App.css';
import JobCounter from './JobCounter';
import JobCounterWithState from './JobCounterWithState';

function App() {
  return (
    <div className="App">
      <header className="intro">
        <h1>Events and State</h1>
        <p>Open the console (F12), then click <strong>Add Job</strong> on both counters.</p>
      </header>

      <main className="side-by-side">
        <section>
          <h2 className="label">Regular variable (the task)</h2>
          <JobCounter />
          <p className="explain">
            The console counts up, but the page stays at 0. Changing a normal variable doesn't make React
            render again, and every render starts <code>jobCount</code> back at 0.
          </p>
        </section>

        <section>
          <h2 className="label">useState (the bonus)</h2>
          <JobCounterWithState />
          <p className="explain">
            <code>setJobCount</code> saves the new value and tells React to render again, so the page updates.
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;
