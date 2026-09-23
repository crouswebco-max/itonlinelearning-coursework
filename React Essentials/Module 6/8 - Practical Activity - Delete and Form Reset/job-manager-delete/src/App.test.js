import { render, screen, fireEvent, within } from '@testing-library/react';
import JobManager from './components/JobManager';

beforeEach(() => localStorage.clear());
afterEach(() => jest.restoreAllMocks());

const column = (title) => screen.getByRole('heading', { level: 2, name: new RegExp(`^${title}`) }).closest('section');
const activitiesIn = (title) => within(column(title)).queryAllByRole('heading', { level: 3 }).map((h) => h.textContent);

test('deletes a job after confirming', () => {
  jest.spyOn(window, 'confirm').mockReturnValue(true);
  render(<JobManager />);
  fireEvent.click(screen.getByRole('button', { name: 'Delete Collect competitor prices' }));
  expect(window.confirm).toHaveBeenCalled();
  expect(activitiesIn('In Progress')).toEqual([]);
});

test('keeps the job if the user cancels', () => {
  jest.spyOn(window, 'confirm').mockReturnValue(false);
  render(<JobManager />);
  fireEvent.click(screen.getByRole('button', { name: 'Delete Collect competitor prices' }));
  expect(activitiesIn('In Progress')).toEqual(['Collect competitor prices']);
});

test('the form resets after adding a job', () => {
  render(<JobManager />);
  fireEvent.change(screen.getByLabelText('Job activity'), { target: { value: 'Archive old mail' } });
  fireEvent.click(screen.getByRole('button', { name: 'Read Emails' }));
  fireEvent.change(screen.getByLabelText('Status'), { target: { value: 'Completed' } });
  fireEvent.click(screen.getByRole('button', { name: 'Add Job' }));
  expect(activitiesIn('Completed')).toContain('Archive old mail');
  expect(screen.getByLabelText('Job activity')).toHaveValue('');
  expect(screen.getByLabelText('Status')).toHaveValue('Need to Complete');
  expect(screen.getByRole('button', { name: 'Read Emails' })).toHaveAttribute('aria-pressed', 'false');
});

test('jobs are saved in localStorage', () => {
  jest.spyOn(window, 'confirm').mockReturnValue(true);
  const { unmount } = render(<JobManager />);
  fireEvent.click(screen.getByRole('button', { name: 'Delete Check the support inbox' }));
  unmount();
  render(<JobManager />);
  expect(activitiesIn('Need to Complete')).toEqual([]);
});
