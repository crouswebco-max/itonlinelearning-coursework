import React from 'react';

// Bonus 3: one button, in its own component. The parent decides its style
const CategoryButton = ({ label, style, isSelected, onSelect }) => {
  return (
    <button type="button" style={style} aria-pressed={isSelected} onClick={onSelect}>
      {isSelected ? '✓ ' : ''}
      {label}
    </button>
  );
};

export default CategoryButton;
