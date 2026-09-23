import { render, screen, fireEvent, within } from '@testing-library/react';
import JobManager from './components/JobManager';

beforeEach(() => localStorage.clear());
afterEach(() => jest.restoreAllMocks());

const column = (title) => screen.getByRole('heading', { level: 2, name: new RegExp(`^${title}`) }).closest('section');
const activitiesIn = (title) => within(column(title)).queryAllByRole('heading', { level: 3 }).map((h) => h.textContent);

const addJob = (activity, category, status) => {
  fireEvent.change(screen.getByLabelText('Job activity'), { target: { value: activity } });
  fireEvent.click(screen.getByRole('button', { name: category }));
  fireEvent.change(screen.getByLabelText('Status'), { target: { value: status } });
  fireEvent.click(screen.getByRole('button', { name: 'Add Job' }));
};

test('starts empty when nothing is saved', () => {
  render(<JobManager />);
  expect(screen.getByText('0 jobs saved in this browser')).toBeInTheDocument();
});

test('saves jobs to localStorage and loads them again', () => {
  const { unmount } = render(<JobManager />);
  addJob('Check inbox', 'Read Emails', 'In Progress');
  expect(JSON.parse(localStorage.getItem('jobs'))).toHaveLength(1);
  unmount();
  render(<JobManager />);
  expect(activitiesIn('In Progress')).toEqual(['Check inbox']);
});

test('newest jobs come first in a column', () => {
  let now = 1000;
  jest.spyOn(Date, 'now').mockImplementation(() => (now += 1000));
  render(<JobManager />);
  addJob('First job', 'Read Emails', 'Need to Complete');
  addJob('Second job', 'Send Emails', 'Need to Complete');
  expect(activitiesIn('Need to Complete')).toEqual(['Second job', 'First job']);
});

test('delete and Clear All Jobs update localStorage', () => {
  jest.spyOn(window, 'confirm').mockReturnValue(true);
  render(<JobManager />);
  addJob('One', 'Read Emails', 'Completed');
  addJob('Two', 'Web Parsing', 'Completed');
  fireEvent.click(screen.getByRole('button', { name: 'Delete One' }));
  expect(JSON.parse(localStorage.getItem('jobs')).map((j) => j.activity)).toEqual(['Two']);
  fireEvent.click(screen.getByRole('button', { name: 'Clear All Jobs' }));
  expect(activitiesIn('Completed')).toEqual([]);
  expect(localStorage.getItem('jobs')).toBe('[]');
});
