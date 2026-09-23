import { render, screen, fireEvent, within } from '@testing-library/react';
import JobManager from './components/JobManager';

const column = (title) => screen.getByRole('heading', { level: 2, name: new RegExp(`^${title}`) }).closest('section');
const activitiesIn = (title) => within(column(title)).queryAllByRole('heading', { level: 3 }).map((h) => h.textContent);

test('shows three columns with their jobs', () => {
  render(<JobManager />);
  expect(activitiesIn('Need to Complete')).toEqual(['Check the support inbox']);
  expect(activitiesIn('In Progress')).toEqual(['Collect competitor prices']);
  expect(within(column('Completed')).getByText('Send Emails')).toBeInTheDocument();
});

test('adds a job with several categories to the chosen column', () => {
  render(<JobManager />);
  fireEvent.click(screen.getByRole('button', { name: 'Add Job' }));
  expect(screen.getByRole('alert')).toBeInTheDocument();
  fireEvent.change(screen.getByLabelText('Job activity'), { target: { value: 'Scrape new listings' } });
  fireEvent.click(screen.getByRole('button', { name: 'Web Parsing' }));
  fireEvent.click(screen.getByRole('button', { name: 'Send Emails' }));
  fireEvent.change(screen.getByLabelText('Status'), { target: { value: 'In Progress' } });
  fireEvent.click(screen.getByRole('button', { name: 'Add Job' }));
  expect(activitiesIn('In Progress')).toContain('Scrape new listings');
});

test('edits a job', () => {
  render(<JobManager />);
  fireEvent.click(screen.getByRole('button', { name: 'Edit Check the support inbox' }));
  fireEvent.change(screen.getByLabelText('Status'), { target: { value: 'Completed' } });
  fireEvent.click(screen.getByRole('button', { name: 'Save Changes' }));
  expect(activitiesIn('Completed')).toContain('Check the support inbox');
});

test('drag and drop, and search', () => {
  render(<JobManager />);
  const data = {};
  const dataTransfer = { setData: (k, v) => (data[k] = v), getData: (k) => data[k] };
  fireEvent.dragStart(screen.getByRole('heading', { name: 'Collect competitor prices' }).parentElement, { dataTransfer });
  fireEvent.drop(column('Completed'), { dataTransfer });
  expect(activitiesIn('Completed')).toContain('Collect competitor prices');

  fireEvent.change(screen.getByLabelText('Search jobs'), { target: { value: 'send' } });
  expect(activitiesIn('Completed')).toEqual(['Send the weekly summary']);
  expect(activitiesIn('Need to Complete')).toEqual([]);
});
