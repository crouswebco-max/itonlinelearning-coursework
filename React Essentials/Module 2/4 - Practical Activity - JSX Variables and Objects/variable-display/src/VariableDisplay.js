import React from 'react';
import SkillList from './SkillList';

function VariableDisplay() {
  // 2. The variables
  let stringVar = 'Welcome to React';
  let numberVar = 42;
  let booleanVar = true;
  let arrayVar = ['React', 'JSX', 'Variables'];
  let objectVar = { name: 'John', age: 30, role: 'Developer' };

  // 4. A random condition that changes one of the variables
  const randomNumber = Math.random();
  if (randomNumber > 0.5) {
    stringVar = 'Welcome to advanced React';
  }

  // Challenge 3: a function that returns a JSX element
  function renderRoleBadge() {
    return <span className="badge">{objectVar.role}</span>;
  }

  // 3 and 5. Display each variable type
  return (
    <div className="variable-display">
      <h1>{stringVar}</h1>
      <p className="random">
        Random number: {randomNumber.toFixed(2)} (
        {randomNumber > 0.5 ? 'more than 0.5, so the heading changed' : '0.5 or less, so the heading stayed the same'})
      </p>

      <section className="card">
        <h2>String</h2>
        <p>{stringVar}</p>
        <p className="note">Strings render as they are.</p>
      </section>

      <section className="card">
        <h2>Number</h2>
        <p>{numberVar}</p>
        <p>Doubled: {numberVar * 2}</p>
        <p className="note">Numbers render as they are, and you can do maths inside the braces.</p>
      </section>

      <section className="card">
        <h2>Boolean</h2>
        <p>
          Rendered directly: <code>[{booleanVar}]</code>
        </p>
        <p>
          As text: <code>{String(booleanVar)}</code>
        </p>
        <p>With a ternary: {booleanVar ? '✅ Yes, it is true' : '❌ No, it is false'}</p>
        <p className="note">
          <strong>Challenge 1:</strong> <code>{'{booleanVar}'}</code> shows nothing. React ignores <code>true</code>,{' '}
          <code>false</code>, <code>null</code> and <code>undefined</code>, so the brackets above are empty.
          Use <code>String()</code> or a ternary to show it.
        </p>
      </section>

      <section className="card">
        <h2>Array</h2>
        <p>
          Rendered directly: <code>{arrayVar}</code>
        </p>
        <p>
          Joined with commas: <code>{arrayVar.join(', ')}</code>
        </p>
        <p>First item: {arrayVar[0]}, and there are {arrayVar.length} items.</p>
        <p className="note">Arrays render, but the items are joined with no spaces.</p>

        {/* Bonus: a list component that takes the array as a prop */}
        <h3>As a list (bonus: SkillList component)</h3>
        <SkillList items={arrayVar} />
      </section>

      <section className="card">
        <h2>Object</h2>
        <p>Name: {objectVar.name}</p>
        <p>Age: {objectVar.age}</p>
        <p>Role: {renderRoleBadge()}</p>
        <p>
          As text: <code>{JSON.stringify(objectVar)}</code>
        </p>
        <p className="note">
          <strong>Challenge 2:</strong> <code>{'{objectVar}'}</code> crashes the app with the error{' '}
          <em>"Objects are not valid as a React child (found: object with keys &#123;name, age, role&#125;)"</em>.
          Show each property on its own (<code>objectVar.name</code>), or turn the object into text with{' '}
          <code>JSON.stringify()</code>.
        </p>
        <p className="note">
          <strong>Challenge 3:</strong> the role badge comes from <code>renderRoleBadge()</code>, a function that returns JSX.
        </p>
      </section>
    </div>
  );
}

export default VariableDisplay;
