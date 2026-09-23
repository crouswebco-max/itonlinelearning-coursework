import { render, screen, fireEvent } from '@testing-library/react';
import AdvancedJobCounter from './AdvancedJobCounter';

const click = (name) => fireEvent.click(screen.getByRole('button', { name }));

test('starts at 0 with the no-jobs message', () => {
  render(<AdvancedJobCounter />);
  expect(screen.getByText('Current Jobs:')).toHaveTextContent('Current Jobs: 0');
  expect(screen.getByText('No jobs available')).toBeInTheDocument();
});

test('adds, removes and resets jobs, with the right messages', () => {
  render(<AdvancedJobCounter />);
  click('Add Job');
  expect(screen.getByText('Few jobs available')).toBeInTheDocument();
  for (let i = 0; i < 5; i++) click('Add Job');
  expect(screen.getByText('Current Jobs:')).toHaveTextContent('6');
  expect(screen.getByText('Many jobs available')).toBeInTheDocument();
  click('Remove Job');
  expect(screen.getByText('Current Jobs:')).toHaveTextContent('5');
  click('Reset');
  expect(screen.getByText('Current Jobs:')).toHaveTextContent('0');
});

test('never goes below zero', () => {
  render(<AdvancedJobCounter />);
  expect(screen.getByRole('button', { name: 'Remove Job' })).toBeDisabled();
  click('Add Job');
  click('Remove Job');
  expect(screen.getByText('Current Jobs:')).toHaveTextContent('0');
});

test('toggles the environment', () => {
  render(<AdvancedJobCounter />);
  expect(screen.getByText('Production')).toBeInTheDocument();
  click('Switch to UAT');
  expect(screen.getByText('UAT')).toBeInTheDocument();
  click('Switch to Production');
  expect(screen.getByText('Production')).toBeInTheDocument();
});
