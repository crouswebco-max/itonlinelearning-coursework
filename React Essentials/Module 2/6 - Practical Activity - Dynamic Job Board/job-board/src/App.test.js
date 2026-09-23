import { render, screen } from '@testing-library/react';
import JobBoard from './JobBoard';

test('shows TechCorp with 5 jobs by default', () => {
  render(<JobBoard />);
  expect(screen.getByRole('heading', { name: 'TechCorp' })).toBeInTheDocument();
  expect(screen.getByText('Jobs running today from bot: 5')).toBeInTheDocument();
  expect(screen.getByText('8')).toBeInTheDocument(); // 5 × 1.5 = 7.5, rounded to 8
});

test('shows the no-jobs message for 0 jobs', () => {
  render(<JobBoard jobCount={0} />);
  expect(screen.getByText('No jobs to schedule today')).toBeInTheDocument();
});

test('shows the busy message for more than 5 jobs', () => {
  render(<JobBoard jobCount={8} />);
  expect(screen.getByText('Busy day! Jobs running today from bot: 8')).toBeInTheDocument();
  expect(screen.getByText('12')).toBeInTheDocument();
});

test('uses "1 job is" for exactly one job', () => {
  render(<JobBoard jobCount={1} />);
  expect(screen.getByText('1 job is scheduled at TechCorp.')).toBeInTheDocument();
});
