import React, { useState } from 'react';

// Bonus 3: the shortest input that can be submitted
const MIN_LENGTH = 3;

const DynamicForm = () => {
  // Task 1: state for what's typed in the input
  const [inputValue, setInputValue] = useState('');

  // Bonus 2: state for the list of submitted items
  const [submittedItems, setSubmittedItems] = useState([]);

  // Bonus 3: state for the error message
  const [error, setError] = useState('');

  // Task 5: this runs every time React renders the component
  console.log('DynamicForm rendered. inputValue is:', JSON.stringify(inputValue));

  // Task 2: update the state as the user types
  const handleInputChange = (event) => {
    console.log('onChange: the user typed, new value is', JSON.stringify(event.target.value));
    setInputValue(event.target.value);
    if (error) {
      setError('');
    }
  };

  // Task 3: clear the input
  const handleReset = () => {
    console.log('Reset clicked');
    setInputValue('');
    setError('');
  };

  // Bonus 2 and 3: check the input, then add it to the list
  const handleSubmit = (event) => {
    event.preventDefault(); // stop the form reloading the page
    const trimmed = inputValue.trim();

    if (trimmed.length < MIN_LENGTH) {
      console.log('Submit blocked: too short');
      setError(`Please type at least ${MIN_LENGTH} characters.`);
      return;
    }

    console.log('Submitted:', trimmed);
    setSubmittedItems([...submittedItems, trimmed]); // a new array, never push into state
    setInputValue('');
    setError('');
  };

  return (
    <div className="dynamic-form">
      <h1>Dynamic Form</h1>

      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="textInput" className="visually-hidden">
          Type something
        </label>
        <input
          id="textInput"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type something..."
          maxLength={100}
          aria-invalid={error !== ''}
          aria-describedby="charCount formError"
        />

        {/* Bonus 1: the character count updates on every keystroke */}
        <p id="charCount" className="char-count">
          {inputValue.length} / 100 characters
        </p>

        {error && (
          <p id="formError" className="error" role="alert">
            {error}
          </p>
        )}

        <div className="buttons">
          <button type="submit">Submit</button>
          <button type="button" className="secondary" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>

      {/* Task 4: the current input, shown in real time */}
      <div className="panel">
        <h2>Current Input:</h2>
        <p className="current">{inputValue || <span className="placeholder">Nothing typed yet</span>}</p>
      </div>

      {/* Bonus 2: everything that has been submitted */}
      <div className="panel">
        <h2>Submitted Items ({submittedItems.length})</h2>
        {submittedItems.length === 0 ? (
          <p className="placeholder">Nothing submitted yet.</p>
        ) : (
          <ol className="submitted">
            {submittedItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ol>
        )}
      </div>

      <p className="tip">Open the console (F12) to see a message every time React re-renders.</p>
    </div>
  );
};

export default DynamicForm;
