import React from 'react';

const FIELDS = [
  { id: 'initialInvestment', label: 'Initial Investment ($)' },
  { id: 'annualInvestment', label: 'Annual Investment ($)' },
  { id: 'expectedReturn', label: 'Expected Return (%)' },
  { id: 'duration', label: 'Duration (years)' },
];

// The state now lives in App. UserInput shows the values it's given
// and tells App about every change through onInputChange
const UserInput = ({ userInput, onInputChange }) => {
  return (
    <section id="user-input">
      <form onSubmit={(event) => event.preventDefault()} noValidate>
        {FIELDS.map((field) => (
          <div className="input-group" key={field.id}>
            <label htmlFor={field.id}>{field.label}</label>
            <input
              type="number"
              id={field.id}
              min={field.id === 'duration' ? 1 : 0}
              value={userInput[field.id]}
              onChange={(event) => onInputChange(field.id, event.target.value)}
            />
          </div>
        ))}
      </form>
    </section>
  );
};

export default UserInput;
