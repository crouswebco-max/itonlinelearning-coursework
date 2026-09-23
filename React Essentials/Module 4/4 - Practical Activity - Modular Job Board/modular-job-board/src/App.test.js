import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

const jobNames = () => screen.queryAllByRole('heading', { level: 3 }).map((h) => h.textContent);

test('renders the header, jobs and footer', () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 1, name: 'Job Board' })).toBeInTheDocument();
  expect(jobNames()).toEqual(['Read Emails', 'Web Parsing', 'Send Emails']);
  expect(screen.getByText(/3 jobs on the board/)).toBeInTheDocument();
});

test('styles jobs by status', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: 'Read Emails' }).closest('li')).toHaveClass('job-item--completed');
  expect(screen.getByRole('heading', { name: 'Web Parsing' }).closest('li')).toHaveClass('job-item--running');
});

test('hides and shows the job list', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: 'Hide Jobs' }));
  expect(jobNames()).toEqual([]);
  fireEvent.click(screen.getByRole('button', { name: 'Show Jobs' }));
  expect(jobNames()).toHaveLength(3);
});

test('Add Job, delete, search and the custom form', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: 'Add Job' }));
  expect(jobNames()).toContain('New Job 4');

  fireEvent.click(screen.getByRole('button', { name: 'Delete Read Emails' }));
  expect(jobNames()).not.toContain('Read Emails');

  fireEvent.change(screen.getByLabelText('Job name'), { target: { value: 'Backup Files' } });
  fireEvent.change(screen.getByLabelText('Job status'), { target: { value: 'completed' } });
  fireEvent.click(screen.getByRole('button', { name: 'Add' }));
  expect(screen.getByRole('heading', { name: 'Backup Files' }).closest('li')).toHaveClass('job-item--completed');

  fireEvent.change(screen.getByLabelText('Search jobs by name'), { target: { value: 'email' } });
  expect(jobNames()).toEqual(['Send Emails']);
});
