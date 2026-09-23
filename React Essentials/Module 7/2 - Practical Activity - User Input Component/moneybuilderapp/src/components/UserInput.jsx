import React, { useState } from 'react';

const INITIAL_INPUT = {
  initialInvestment: 10000,
  annualInvestment: 1200,
  expectedReturn: 6,
  duration: 10,
};

// Bonus 3: the currencies the user can switch between
const CURRENCIES = { USD: '$', EUR: '€', GBP: '£' };

const UserInput = () => {
  // Task 3: all four values in one state object
  const [userInput, setUserInput] = useState(INITIAL_INPUT);
  const [currency, setCurrency] = useState('USD');

  // Task 4: update one value, keeping the others.
  // The + turns the input's text into a number. An empty box is kept as '' so it can be cleared while typing
  const handleChange = (inputIdentifier, newValue) => {
    setUserInput((prevUserInput) => ({
      ...prevUserInput,
      [inputIdentifier]: newValue === '' ? '' : +newValue,
    }));
  };

  // Bonus 2: back to the starting values
  const handleReset = () => setUserInput(INITIAL_INPUT);

  // Bonus 1: every field must be filled and positive (duration at least 1 year)
  const getError = (key) => {
    const value = userInput[key];
    if (value === '') return 'Required';
    if (value < 0) return 'Must be positive';
    if (key === 'duration' && value < 1) return 'At least 1 year';
    return '';
  };

  const symbol = CURRENCIES[currency];
  const fields = [
    { id: 'initialInvestment', label: `Initial Investment (${symbol})` },
    { id: 'annualInvestment', label: `Annual Investment (${symbol})` },
    { id: 'expectedReturn', label: 'Expected Return (%)' },
    { id: 'duration', label: 'Duration (years)' },
  ];

  const hasErrors = fields.some((field) => getError(field.id));

  return (
    <section id="user-input">
      <div className="currency-row">
        <label htmlFor="currency">Currency</label>
        <select id="currency" value={currency} onChange={(event) => setCurrency(event.target.value)}>
          {Object.keys(CURRENCIES).map((code) => (
            <option key={code} value={code}>
              {code} ({CURRENCIES[code]})
            </option>
          ))}
        </select>
      </div>

      {/* Task 5: the form, with every input bound to state (two-way binding) */}
      <form onSubmit={(event) => event.preventDefault()} noValidate>
        {fields.map((field) => {
          const error = getError(field.id);
          return (
            <div className="input-group" key={field.id}>
              <label htmlFor={field.id}>{field.label}</label>
              <div className="input-wrap">
                <input
                  type="number"
                  id={field.id}
                  min={field.id === 'duration' ? 1 : 0}
                  value={userInput[field.id]}
                  onChange={(event) => handleChange(field.id, event.target.value)}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? `${field.id}-error` : undefined}
                />
                {error && (
                  <span id={`${field.id}-error`} className="input-error">
                    {error}
                  </span>
                )}
              </div>
            </div>
          );
        })}

        <div className="form-footer">
          <p className={hasErrors ? 'status status--error' : 'status'}>
            {hasErrors ? 'Please fix the highlighted fields.' : 'All inputs are valid.'}
          </p>
          <button type="button" className="reset-button" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>

      {/* Shows the state updating live as you type */}
      <p className="live-state">
        State: <code>{JSON.stringify(userInput)}</code>
      </p>
    </section>
  );
};

export default UserInput;
