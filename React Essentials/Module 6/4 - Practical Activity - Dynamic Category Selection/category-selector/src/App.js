import React from 'react';
import CategorySelector from './components/CategorySelector';

function App() {
  return (
    <div style={{ minHeight: '100vh', padding: '48px 16px', boxSizing: 'border-box', background: '#f1f5f9', fontFamily: 'system-ui, sans-serif', color: '#1e293b' }}>
      <h1 style={{ textAlign: 'center', margin: '0 0 24px' }}>Category Selector</h1>
      <CategorySelector />
    </div>
  );
}

export default App;
