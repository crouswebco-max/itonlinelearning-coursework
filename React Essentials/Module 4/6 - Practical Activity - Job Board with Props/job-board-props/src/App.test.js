import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import JobList from './components/JobList';
import JobItem from './components/JobItem';

const jobNames = () => screen.queryAllByRole('heading', { level: 3 }).map((h) => h.textContent);

test('shows every job with a status class', () => {
  render(<App />);
  expect(jobNames()).toEqual(['Read Emails', 'Web Parsing', 'Send Emails', 'Backup Database']);
  expect(screen.getByRole('heading', { name: 'Backup Database' }).closest('li')).toHaveClass('job-item--failed');
});

test('delete is passed down from App and removes the job', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: 'Delete Web Parsing' }));
  expect(jobNames()).toEqual(['Read Emails', 'Send Emails', 'Backup Database']);
});

test('adds, edits and filters jobs', () => {
  render(<App />);
  fireEvent.change(screen.getByLabelText('New job name'), { target: { value: 'Clean Logs' } });
  fireEvent.click(screen.getByRole('button', { name: 'Add Job' }));
  expect(jobNames()).toContain('Clean Logs');

  fireEvent.click(screen.getByRole('button', { name: 'Edit Clean Logs' }));
  fireEvent.change(screen.getByLabelText('Job status'), { target: { value: 'Completed' } });
  fireEvent.click(screen.getByRole('button', { name: 'Save' }));

  fireEvent.click(screen.getByRole('button', { name: 'Completed' }));
  expect(jobNames()).toEqual(['Read Emails', 'Clean Logs']);
});

test('copes with missing props', () => {
  render(<JobList />);
  expect(screen.getByText('No jobs to show.')).toBeInTheDocument();
  const { container } = render(<ul><JobItem /></ul>);
  expect(container.querySelector('li')).toBeNull();
  render(<ul><JobItem job={{ id: 9 }} /></ul>);
  expect(screen.getByRole('heading', { name: 'Untitled job' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Delete Untitled job' })); // no onDelete given: no crash
});
