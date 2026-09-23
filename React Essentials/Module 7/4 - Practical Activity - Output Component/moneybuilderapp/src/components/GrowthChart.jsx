import React from 'react';
import { formatter } from '../util/investment';

// Bonus 3: a line chart of the investment's value, drawn with SVG (no extra library)
const WIDTH = 640;
const HEIGHT = 260;
const PAD = { top: 20, right: 20, bottom: 36, left: 70 };

const GrowthChart = ({ rows }) => {
  if (rows.length === 0) {
    return null;
  }

  const maxValue = Math.max(...rows.map((row) => row.investmentValue));
  const x = (index) => PAD.left + (index / Math.max(rows.length - 1, 1)) * (WIDTH - PAD.left - PAD.right);
  const y = (value) => HEIGHT - PAD.bottom - (value / maxValue) * (HEIGHT - PAD.top - PAD.bottom);

  const line = (key) => rows.map((row, index) => `${x(index)},${y(row[key])}`).join(' ');
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((fraction) => fraction * maxValue);

  return (
    <figure className="chart">
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-labelledby="chart-title chart-desc">
        <title id="chart-title">Investment growth</title>
        <desc id="chart-desc">
          The investment grows from {formatter.format(rows[0].investmentValue)} after year 1 to{' '}
          {formatter.format(rows[rows.length - 1].investmentValue)} after year {rows.length}.
        </desc>

        {ticks.map((tick) => (
          <g key={tick}>
            <line x1={PAD.left} x2={WIDTH - PAD.right} y1={y(tick)} y2={y(tick)} className="chart__grid" />
            <text x={PAD.left - 8} y={y(tick) + 4} textAnchor="end" className="chart__label">
              {formatter.format(tick)}
            </text>
          </g>
        ))}

        {rows.map((row, index) =>
          rows.length <= 15 || index % Math.ceil(rows.length / 10) === 0 ? (
            <text key={row.year} x={x(index)} y={HEIGHT - 12} textAnchor="middle" className="chart__label">
              {row.year}
            </text>
          ) : null
        )}

        <polyline points={line('investedCapital')} className="chart__line chart__line--capital" />
        <polyline points={line('investmentValue')} className="chart__line chart__line--value" />
      </svg>
      <figcaption className="chart__legend">
        <span className="chart__key chart__key--value">Investment value</span>
        <span className="chart__key chart__key--capital">Invested capital</span>
      </figcaption>
    </figure>
  );
};

export default GrowthChart;
