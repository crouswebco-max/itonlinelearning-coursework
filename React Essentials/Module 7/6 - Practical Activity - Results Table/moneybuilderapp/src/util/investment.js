// Recreated from the course skeleton (the downloaded project had no src folder).
// Works out how an investment grows, year by year.
//   initialInvestment: the amount you start with
//   annualInvestment:  the amount added at the end of every year
//   expectedReturn:    the yearly return, as a percentage (6 means 6%)
//   duration:          the number of years
export function calculateInvestmentResults({ initialInvestment, annualInvestment, expectedReturn, duration }) {
  const annualData = [];
  let investmentValue = initialInvestment;

  for (let i = 0; i < duration; i++) {
    const interestEarnedInYear = investmentValue * (expectedReturn / 100);
    investmentValue += interestEarnedInYear + annualInvestment;
    annualData.push({
      year: i + 1,
      interest: interestEarnedInYear, // interest earned this year
      valueEndOfYear: investmentValue, // total value at the end of this year
      annualInvestment, // the amount added this year
    });
  }

  return annualData;
}

// Formats a number as dollars with no pennies, e.g. 1234.5 becomes "$1,235"
export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

// Bonus 2 (Module 7): the same investment, month by month.
// The yearly return is split into 12 monthly returns, and the annual investment into 12 monthly payments.
// Because interest compounds every month, the totals come out slightly different from the yearly view
export function calculateMonthlyResults({ initialInvestment, annualInvestment, expectedReturn, duration }) {
  const monthlyData = [];
  let investmentValue = initialInvestment;
  const monthlyRate = expectedReturn / 100 / 12;
  const monthlyInvestment = annualInvestment / 12;

  for (let month = 1; month <= duration * 12; month++) {
    const interest = investmentValue * monthlyRate;
    investmentValue += interest + monthlyInvestment;
    monthlyData.push({
      month,
      interest,
      valueEndOfMonth: investmentValue,
      investedCapital: initialInvestment + monthlyInvestment * month,
    });
  }

  return monthlyData;
}
