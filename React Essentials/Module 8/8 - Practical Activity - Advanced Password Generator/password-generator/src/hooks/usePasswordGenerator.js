import { useState, useCallback, useEffect } from 'react';
import { MIN_LENGTH, MAX_LENGTH, buildSets, poolSize, createPassword, getStrength } from '../utils/password';

// Task 5: a custom hook that holds all the password logic.
// The component only has to show the result, and any other component could reuse this hook
export default function usePasswordGenerator() {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({ lowercase: true, uppercase: true, numbers: true, symbols: true });
  const [excludeSimilar, setExcludeSimilar] = useState(false); // Bonus 1
  const [count, setCount] = useState(1); // Bonus 2: how many passwords to make
  const [passwords, setPasswords] = useState([]);
  const [error, setError] = useState('');

  const toggleOption = (key) => setOptions((previous) => ({ ...previous, [key]: !previous[key] }));

  // Task 2: useCallback. The function is only rebuilt when length, options, excludeSimilar or count change.
  // Without it, a brand new function would be made on every render, and the useEffect below
  // (which depends on it) would run after every render, making new passwords all the time
  const passwordGenerator = useCallback(() => {
    // Task 4: at least one type of character is needed
    if (!Object.values(options).some(Boolean)) {
      setError('Choose at least one type of character.');
      setPasswords([]);
      return;
    }
    setError('');
    const safeLength = Math.min(Math.max(length, MIN_LENGTH), MAX_LENGTH);
    const sets = buildSets({ ...options, excludeSimilar });
    setPasswords(Array.from({ length: count }, () => createPassword(safeLength, sets)));
  }, [length, options, excludeSimilar, count]);

  // Task 1: useEffect makes a new password whenever passwordGenerator changes,
  // which happens whenever length or an option changes
  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator]);

  // Task 4: the strength updates in real time
  const strength = getStrength(length, poolSize(buildSets({ ...options, excludeSimilar })));

  return {
    length,
    setLength,
    options,
    toggleOption,
    excludeSimilar,
    setExcludeSimilar,
    count,
    setCount,
    password: passwords[0] ?? '',
    passwords,
    error,
    strength,
    passwordGenerator,
  };
}
