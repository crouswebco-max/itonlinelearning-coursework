import React, { useState } from 'react';
import { calculateInvestmentResults, calculateMonthlyResults, formatter } from '../util/investment';
import GrowthChart from './GrowthChart';

const OutputData = ({ inputValue }) => {
  // Bonus 2: which view to show
  const [view, setView] = useState('yearly');

  // Task 5: a friendly message instead of an empty table
  if (inputValue.duration <= 0) {
    return <p className="center-message">Please enter a duration greater than zero.</p>;
  }
  if (Object.values(inputValue).some((value) => value === '' || value < 0)) {
    return <p className="center-message">Please fill in every field with a number that isn't negative.</p>;
  }

  // Task 1: the yearly results
  const resultData = calculateInvestmentResults(inputValue);

  // Task 2: work out each row's totals, as in the brief
  const yearlyRows = resultData.map((yearData) => {
    const totalInterest = yearData.valueEndOfYear - yearData.annualInvestment * yearData.year - inputValue.initialInvestment;
    const totalAmountInvested = yearData.valueEndOfYear - totalInterest;
    return {
      key: yearData.year,
      label: yearData.year,
      value: yearData.valueEndOfYear,
      interest: yearData.interest,
      totalInterest,
      totalAmountInvested,
    };
  });

  // Bonus 2: the same columns, month by month
  const monthlyRows = calculateMonthlyResults(inputValue).map((monthData) => ({
    key: monthData.month,
    label: `Y${Math.ceil(monthData.month / 12)} M${((monthData.month - 1) % 12) + 1}`,
    value: monthData.valueEndOfMonth,
    interest: monthData.interest,
    totalInterest: monthData.valueEndOfMonth - monthData.investedCapital,
    totalAmountInvested: monthData.investedCapital,
  }));

  const rows = view === 'yearly' ? yearlyRows : monthlyRows;
  const last = rows[rows.length - 1];

  // The chart always shows years, so it stays readable
  const chartRows = yearlyRows.map((row) => ({
    year: row.label,
    investmentValue: row.value,
    investedCapital: row.totalAmountInvested,
  }));

  return (
    <div className="output">
      {/* Bonus 3: the line chart */}
      <GrowthChart rows={chartRows} />

      <div className="view-toggle" role="group" aria-label="Table view">
        <button type="button" aria-pressed={view === 'yearly'} onClick={() => setView('yearly')}>
          Yearly
        </button>
        <button type="button" aria-pressed={view === 'monthly'} onClick={() => setView('monthly')}>
          Monthly
        </button>
      </div>

      <div className="table-scroll">
        <table id="result">
          <thead>
            <tr>
              <th>{view === 'yearly' ? 'Year' : 'Month'}</th>
              <th>Investment Value</th>
              <th>Interest ({view === 'yearly' ? 'Year' : 'Month'})</th>
              <th>Total Interest</th>
              <th>Invested Capital</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.key}>
                <td>{row.label}</td>
                <td>{formatter.format(row.value)}</td>
                <td>{formatter.format(row.interest)}</td>
                <td>{formatter.format(row.totalInterest)}</td>
                <td>{formatter.format(row.totalAmountInvested)}</td>
              </tr>
            ))}
          </tbody>
          {/* Bonus 1: the summary at the bottom */}
          <tfoot>
            <tr>
              <th scope="row">Total</th>
              <td>{formatter.format(last.value)}</td>
              <td></td>
              <td>{formatter.format(last.totalInterest)}</td>
              <td>{formatter.format(last.totalAmountInvested)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <p className="summary">
        After {inputValue.duration} {inputValue.duration === 1 ? 'year' : 'years'} you'll have invested{' '}
        <strong>{formatter.format(last.totalAmountInvested)}</strong> and earned{' '}
        <strong>{formatter.format(last.totalInterest)}</strong> in interest.
      </p>
    </div>
  );
};

export default OutputData;
