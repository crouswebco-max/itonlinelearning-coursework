import { useState } from 'react';

// Bonus 3: a custom hook that holds the category selection logic,
// so any component can reuse it: const { selected, toggle, clear } = useCategorySelection(3);
export default function useCategorySelection(maxSelected = Infinity) {
  const [selected, setSelected] = useState([]);
  const [limitMessage, setLimitMessage] = useState('');

  const toggle = (category) => {
    // Already selected: remove it with filter (a new array)
    if (selected.includes(category)) {
      setSelected(selected.filter((item) => item !== category));
      setLimitMessage('');
      return;
    }
    // Bonus 1: stop at the maximum
    if (selected.length >= maxSelected) {
      setLimitMessage(`You can choose up to ${maxSelected} categories.`);
      return;
    }
    // Not selected yet: add it with the spread operator (a new array)
    setSelected([...selected, category]);
    setLimitMessage('');
  };

  const clear = () => {
    setSelected([]);
    setLimitMessage('');
  };

  const isSelected = (category) => selected.includes(category);

  return { selected, toggle, clear, isSelected, limitMessage, isFull: selected.length >= maxSelected };
}
