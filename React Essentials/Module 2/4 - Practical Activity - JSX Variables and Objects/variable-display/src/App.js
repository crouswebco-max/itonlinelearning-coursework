import React, { useState } from 'react';
import './App.css';
import VariableDisplay from './VariableDisplay';

function App() {
  // Changing the key makes React create VariableDisplay again,
  // so the random condition runs again
  const [run, setRun] = useState(1);

  return (
    <div className="App">
      <main className="container">
        <VariableDisplay key={run} />
        <button type="button" className="run-again" onClick={() => setRun(run + 1)}>
          Run again (new random number)
        </button>
      </main>
    </div>
  );
}

export default App;
