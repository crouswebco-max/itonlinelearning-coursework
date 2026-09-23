import { useState } from 'react';

// Bonus: a custom hook for the form. It converts every value to a number (Task 4)
// and checks it (Task 5), so any component can use it:
//   const { values, errors, isValid, handleChange } = useInvestmentForm({ ... });
export default function useInvestmentForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Task 4: the fix. The unary plus turns "1000" into 1000 (parseFloat would work too)
    const numberValue = value === '' ? '' : +value;

    // Task 5: useful information for debugging
    console.log(`[useInvestmentForm] ${name}: raw value ${JSON.stringify(value)} (${typeof value}) → stored ${JSON.stringify(numberValue)} (${typeof numberValue})`);

    // Task 5: stop negative and empty values
    let message = '';
    if (numberValue === '') {
      message = 'Please enter a number.';
    } else if (numberValue < 0) {
      message = "Can't be negative.";
    } else if (name === 'duration' && numberValue < 1) {
      message = 'At least 1 year.';
    }

    if (message) {
      console.warn(`[useInvestmentForm] invalid ${name}:`, message);
    }

    setErrors((previous) => ({ ...previous, [name]: message }));
    setValues((previous) => ({ ...previous, [name]: numberValue }));
  };

  const isValid = Object.values(errors).every((message) => !message);

  return { values, errors, isValid, handleChange };
}
