import React from 'react';

// Bonus: takes an array as a prop and shows each item as a list element
function SkillList({ items }) {
  return (
    <ul className="skill-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default SkillList;
