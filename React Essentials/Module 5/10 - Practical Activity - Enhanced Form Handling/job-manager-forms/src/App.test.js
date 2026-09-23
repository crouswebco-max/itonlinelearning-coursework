import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  localStorage.clear();
  jest.spyOn(console, 'log').mockImplementation(() => {});
});
afterEach(() => jest.restoreAllMocks());

const fillForm = (title, category, status) => {
  fireEvent.change(screen.getByLabelText('Job title'), { target: { value: title } });
  fireEvent.click(screen.getByLabelText(category));
  fireEvent.change(screen.getByLabelText('Status'), { target: { value: status } });
};

test('submit is disabled until every field is filled', () => {
  render(<App />);
  const submit = screen.getByRole('button', { name: 'Add Job' });
  expect(submit).toBeDisabled();
  fillForm('Check inbox', 'Read Emails', 'in-progress');
  expect(submit).toBeEnabled();
});

test('shows an error for an empty or too-short title', () => {
  render(<App />);
  const title = screen.getByLabelText('Job title');
  fireEvent.blur(title);
  expect(screen.getByText('Please enter a job title.')).toBeInTheDocument();
  fireEvent.change(title, { target: { value: 'ab' } });
  expect(screen.getByText('The job title must be at least 3 characters.')).toBeInTheDocument();
});

test('submitting logs the details, shows success, lists the job and resets', () => {
  render(<App />);
  fillForm('Check inbox', 'Read Emails', 'in-progress');
  fireEvent.click(screen.getByRole('button', { name: 'Add Job' }));
  expect(console.log).toHaveBeenCalledWith('Job details:', { title: 'Check inbox', category: 'Read Emails', status: 'in-progress' });
  expect(screen.getByRole('status')).toHaveTextContent('"Check inbox" was added.');
  expect(screen.getByText('Added Jobs (1)')).toBeInTheDocument();
  expect(screen.getByLabelText('Job title')).toHaveValue('');
});

test('reset clears the form', () => {
  render(<App />);
  fillForm('Check inbox', 'Read Emails', 'completed');
  fireEvent.click(screen.getByRole('button', { name: 'Reset' }));
  expect(screen.getByLabelText('Job title')).toHaveValue('');
  expect(screen.getByLabelText('Status')).toHaveValue('');
});

test('edits a job, and jobs are saved to localStorage', () => {
  const { unmount } = render(<App />);
  fillForm('Check inbox', 'Read Emails', 'need-to-start');
  fireEvent.click(screen.getByRole('button', { name: 'Add Job' }));
  fireEvent.click(screen.getByRole('button', { name: 'Edit Check inbox' }));
  expect(screen.getByLabelText('Job title')).toHaveValue('Check inbox');
  fireEvent.change(screen.getByLabelText('Job title'), { target: { value: 'Check both inboxes' } });
  fireEvent.click(screen.getByRole('button', { name: 'Save Changes' }));
  expect(screen.getByText('Check both inboxes')).toBeInTheDocument();
  unmount();
  render(<App />);
  expect(screen.getByText('Check both inboxes')).toBeInTheDocument();
});
