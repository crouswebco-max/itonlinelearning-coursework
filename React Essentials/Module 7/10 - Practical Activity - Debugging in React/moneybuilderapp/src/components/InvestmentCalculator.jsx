import React, { useState } from 'react';
import { formatter } from '../util/investment';
import useInvestmentForm from '../hooks/useInvestmentForm';

// The fixed version. The form logic lives in the useInvestmentForm hook
const InvestmentCalculator = () => {
  const { values, errors, isValid, handleChange } = useInvestmentForm({
    initialInvestment: 1000,
    annualInvestment: 100,
    expectedReturn: 5,
    duration: 3,
  });
  const [results, setResults] = useState([]);

  const calculateInvestment = () => {
    // Task 5: don't calculate with invalid input
    if (!isValid) {
      console.warn('[InvestmentCalculator] Calculation skipped: the form has errors', errors);
      return;
    }

    const rows = [];
    let investmentValue = values.initialInvestment;
    for (let year = 1; year <= values.duration; year++) {
      const interest = investmentValue * (values.expectedReturn / 100);
      investmentValue = investmentValue + interest + values.annualInvestment; // numbers now, so + adds
      rows.push({ year, interest, investmentValue });
    }

    // Task 5: log the inputs and results as tables in the console
    console.log('[InvestmentCalculator] Calculating with:');
    console.table(values);
    console.table(rows);
    setResults(rows);
  };

  return (
    <section className="calculator calculator--fixed">
      <h2>✅ Fixed calculator</h2>
      <p className="hint">The same steps now give the right answer. Try a negative number too.</p>
      {Object.keys(values).map((name) => (
        <label key={name} className="calc-field">
          {name}
          <input type="number" name={name} value={values[name]} onChange={handleChange} aria-invalid={Boolean(errors[name])} />
          {errors[name] && <span className="calc-error">{errors[name]}</span>}
        </label>
      ))}
      <button type="button" onClick={calculateInvestment} disabled={!isValid}>
        Calculate
      </button>
      {!isValid && <p className="calc-error">Please fix the errors above.</p>}
      <ul className="calc-results">
        {results.map((row) => (
          <li key={row.year}>
            Year {row.year}: {formatter.format(row.investmentValue)}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default InvestmentCalculator;
