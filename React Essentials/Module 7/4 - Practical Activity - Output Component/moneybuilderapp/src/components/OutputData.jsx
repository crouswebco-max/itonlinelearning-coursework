import React from 'react';
import { calculateInvestmentResults } from '../util/investment';
import GrowthChart from './GrowthChart';

// Bonus 1: a message for each problem with the input, or [] if it's all fine
const getInputErrors = (inputValue) => {
  const errors = [];
  const names = {
    initialInvestment: 'Initial investment',
    annualInvestment: 'Annual investment',
    expectedReturn: 'Expected return',
    duration: 'Duration',
  };
  Object.entries(inputValue).forEach(([key, value]) => {
    if (value === '' || Number.isNaN(Number(value))) {
      errors.push(`${names[key]} must be a number.`);
    } else if (Number(value) < 0) {
      errors.push(`${names[key]} can't be negative.`);
    }
  });
  if (inputValue.duration !== '' && Number(inputValue.duration) < 1) {
    errors.push('Duration must be at least 1 year.');
  }
  return errors;
};

// Task 2: OutputData gets the user's input as a prop
const OutputData = ({ inputValue }) => {
  const errors = getInputErrors(inputValue);
  if (errors.length > 0) {
    return (
      <div className="output-errors" role="alert">
        <p>Please check your input:</p>
        <ul>
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      </div>
    );
  }

  // Task 3: the calculation, with every value turned into a number
  const resultData = calculateInvestmentResults({
    initialInvestment: +inputValue.initialInvestment,
    annualInvestment: +inputValue.annualInvestment,
    expectedReturn: +inputValue.expectedReturn,
    duration: +inputValue.duration,
  });

  // calculateInvestmentResults gives valueEndOfYear, interest and annualInvestment,
  // so the table's other columns are worked out from them
  const rows = resultData.map((yearData) => {
    const investedCapital = +inputValue.initialInvestment + yearData.annualInvestment * yearData.year;
    return {
      year: yearData.year,
      investmentValue: yearData.valueEndOfYear,
      interest: yearData.interest,
      totalInterest: yearData.valueEndOfYear - investedCapital,
      investedCapital,
    };
  });

  // Bonus 2: the year that earned the most interest
  const highestInterest = Math.max(...rows.map((row) => row.interest));

  return (
    <div className="output">
      <GrowthChart rows={rows} />

      {/* Task 4: the results table */}
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Year</th>
              <th>Investment Value</th>
              <th>Interest (Year)</th>
              <th>Total Interest</th>
              <th>Invested Capital</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((yearData, index) => (
              <tr key={index} className={yearData.interest === highestInterest ? 'highest' : undefined}>
                <td>{yearData.year}</td>
                <td>{yearData.investmentValue.toFixed(2)}</td>
                <td>
                  {yearData.interest.toFixed(2)}
                  {yearData.interest === highestInterest && <span className="highest__badge"> ★ highest</span>}
                </td>
                <td>{yearData.totalInterest.toFixed(2)}</td>
                <td>{yearData.investedCapital.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OutputData;
