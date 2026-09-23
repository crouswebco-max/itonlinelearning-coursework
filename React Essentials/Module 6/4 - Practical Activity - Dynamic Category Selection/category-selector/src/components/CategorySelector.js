import React, { useState } from 'react';
import CategoryButton from './CategoryButton';

// Task 2: one background colour per category, plus a default for unselected buttons.
// Text colours are chosen so every combination is easy to read
const categoryStyles = {
  readEmails: { backgroundColor: 'orange', color: '#1c1917', borderColor: '#c2410c' },
  sendEmails: { backgroundColor: 'yellow', color: '#1c1917', borderColor: '#a16207' },
  webParsing: { backgroundColor: 'blue', color: '#ffffff', borderColor: '#1e3a8a' },
  default: { backgroundColor: 'white', color: '#1e293b', borderColor: '#cbd5e1' },
};

const CATEGORIES = [
  { key: 'readEmails', label: 'Read Emails' },
  { key: 'sendEmails', label: 'Send Emails' },
  { key: 'webParsing', label: 'Web Parsing' },
];

// Shared by every button
const baseButtonStyle = {
  padding: '12px 20px',
  fontSize: '16px',
  fontWeight: 600,
  border: '2px solid',
  borderRadius: '999px',
  cursor: 'pointer',
  // Bonus 2: fade between colours
  transition: 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, transform 0.15s ease',
};

const CategorySelector = () => {
  // Task 3: only one category at a time, so a single string (or '' for none)
  const [selectedCategory, setSelectedCategory] = useState('');
  const [message, setMessage] = useState('');

  // Task 4: true if a category has been chosen
  const validateCategory = () => selectedCategory !== '';

  // Task 6: selecting a category replaces the old one, so only one is ever selected (Task 8)
  const handleSelect = (key) => {
    setSelectedCategory(key);
    setMessage('');
  };

  // Task 7: the selected button gets its category's colours, the others get the default
  const getButtonStyle = (key) => ({
    ...baseButtonStyle,
    ...(selectedCategory === key ? categoryStyles[key] : categoryStyles.default),
    transform: selectedCategory === key ? 'scale(1.05)' : 'scale(1)',
  });

  const handleContinue = () => {
    if (validateCategory()) {
      const label = CATEGORIES.find((category) => category.key === selectedCategory).label;
      setMessage(`✅ "${label}" is selected.`);
    } else {
      setMessage('⚠️ Please select a category first.');
    }
  };

  const selectedLabel = CATEGORIES.find((category) => category.key === selectedCategory)?.label;

  return (
    <section style={{ maxWidth: '560px', margin: '0 auto', padding: '28px', background: '#ffffff', borderRadius: '16px', boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)' }}>
      <h2 style={{ margin: '0 0 6px', fontSize: '22px' }}>Choose a Category</h2>
      <p style={{ margin: '0 0 20px', color: '#64748b' }}>{selectedLabel ? `Selected: ${selectedLabel}` : 'Nothing selected yet.'}</p>

      {/* Task 5: a button for each category */}
      <div role="group" aria-label="Categories" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {CATEGORIES.map((category) => (
          <CategoryButton
            key={category.key}
            label={category.label}
            style={getButtonStyle(category.key)}
            isSelected={selectedCategory === category.key}
            onSelect={() => handleSelect(category.key)}
          />
        ))}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '24px' }}>
        <button type="button" onClick={handleContinue} style={{ ...baseButtonStyle, background: '#0f172a', color: '#ffffff', borderColor: '#0f172a', borderRadius: '10px' }}>
          Continue
        </button>
        {/* Bonus 1: clear the selection */}
        <button
          type="button"
          onClick={() => {
            setSelectedCategory('');
            setMessage('');
          }}
          style={{ ...baseButtonStyle, background: 'none', color: '#1e293b', borderColor: '#cbd5e1', borderRadius: '10px' }}
        >
          Reset
        </button>
      </div>

      {message && (
        <p role="status" style={{ margin: '16px 0 0', fontWeight: 600 }}>
          {message}
        </p>
      )}
    </section>
  );
};

export default CategorySelector;
