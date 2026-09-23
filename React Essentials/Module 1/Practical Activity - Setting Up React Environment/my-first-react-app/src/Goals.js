import React from 'react';

// Bonus challenge: a new component in a separate file, imported into App.js.
// It gets the name as a prop and builds the list from an array with .map()
function Goals({ name }) {
  const goals = [
    'Build components and pass them props',
    'Use state to make pages interactive',
    'Create a full React project for my portfolio',
  ];

  return (
    <section className="Goals">
      <h2>What {name} wants to learn</h2>
      <ul>
        {goals.map((goal) => (
          <li key={goal}>{goal}</li>
        ))}
      </ul>
    </section>
  );
}

export default Goals;
