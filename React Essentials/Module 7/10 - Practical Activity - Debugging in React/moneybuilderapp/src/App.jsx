import React from 'react';
import Header from './components/Header';
import InvestmentCalculatorBuggy from './components/InvestmentCalculatorBuggy';
import InvestmentCalculator from './components/InvestmentCalculator';

function App() {
  return (
    <>
      <Header title="Debugging in React" subtitle="Find the bug with the browser's developer tools, then compare the fix" />
      <main className="debug-page">
        <InvestmentCalculatorBuggy />
        <InvestmentCalculator />
      </main>
      <p className="devtools-tip">
        Open DevTools (F12): <strong>Sources</strong> to set breakpoints, <strong>Console</strong> for the logs, and the React{' '}
        <strong>Components</strong> tab to watch the state.
      </p>
    </>
  );
}

export default App;
