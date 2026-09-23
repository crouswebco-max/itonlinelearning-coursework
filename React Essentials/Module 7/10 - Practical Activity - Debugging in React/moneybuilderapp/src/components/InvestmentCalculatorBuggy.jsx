import React, { useState } from 'react';
import { formatter } from '../util/investment';

// ⚠️ THIS VERSION HAS A DELIBERATE BUG, for practising with the browser's debugger.
// Task 2: open DevTools > Sources, find this file, and set breakpoints on the lines marked 🔴.
const InvestmentCalculatorBuggy = () => {
  const [inputs, setInputs] = useState({ initialInvestment: 1000, annualInvestment: 100, expectedReturn: 5, duration: 3 });
  const [results, setResults] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // 🔴 Breakpoint here. Hover over `value`: it's "1000", a string in quotes, not the number 1000.
    // BUG: the string is saved into state as it is
    setInputs({ ...inputs, [name]: value });
  };

  const calculateInvestment = () => {
    const rows = [];
    // 🔴 Breakpoint here, then step through the loop (F10) and watch investmentValue
    let investmentValue = inputs.initialInvestment;
    for (let year = 1; year <= inputs.duration; year++) {
      const interest = investmentValue * (inputs.expectedReturn / 100);
      // BUG: after typing, investmentValue and annualInvestment are strings,
      // so + joins them: "1000" + 50 + "100" = "100050100"
      investmentValue = investmentValue + interest + inputs.annualInvestment;
      rows.push({ year, interest, investmentValue });
    }
    setResults(rows);
  };

  return (
    <section className="calculator calculator--buggy">
      <h2>🐞 Buggy calculator</h2>
      <p className="hint">Change the initial investment (even just retype it), then click Calculate.</p>
      {Object.keys(inputs).map((name) => (
        <label key={name} className="calc-field">
          {name}
          <input type="number" name={name} value={inputs[name]} onChange={handleInputChange} />
        </label>
      ))}
      <button type="button" onClick={calculateInvestment}>
        Calculate
      </button>
      <ul className="calc-results">
        {results.map((row) => (
          <li key={row.year}>
            Year {row.year}: {typeof row.investmentValue === 'number' ? formatter.format(row.investmentValue) : `"${row.investmentValue}"`}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default InvestmentCalculatorBuggy;
