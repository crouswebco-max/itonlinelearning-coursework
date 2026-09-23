import { render, screen, fireEvent } from '@testing-library/react';
import AppForm from './components/AppForm';

beforeEach(() => jest.spyOn(console, 'log').mockImplementation(() => {}));
afterEach(() => jest.restoreAllMocks());

test('has every form element', () => {
  render(<AppForm />);
  expect(screen.getByPlaceholderText('Enter the job')).toBeInTheDocument();
  ['Read Emails', 'Web Parsing', 'Send Emails'].forEach((name) => expect(screen.getByRole('button', { name })).toBeInTheDocument());
  expect(screen.getByRole('combobox', { name: 'Job status' })).toHaveValue('start');
  expect(screen.getByRole('button', { name: 'Add Job' })).toHaveAttribute('type', 'submit');
});

test('will not submit an empty form', () => {
  render(<AppForm />);
  fireEvent.click(screen.getByRole('button', { name: 'Add Job' }));
  expect(screen.getByRole('status')).toHaveTextContent('Please enter a job');
  expect(console.log).not.toHaveBeenCalled();
});

test('logs the job data and resets the form', () => {
  render(<AppForm />);
  fireEvent.change(screen.getByPlaceholderText('Enter the job'), { target: { value: 'Check inbox' } });
  fireEvent.click(screen.getByRole('button', { name: 'Read Emails' }));
  expect(screen.getByRole('button', { name: 'Read Emails' })).toHaveAttribute('aria-pressed', 'true');
  fireEvent.change(screen.getByRole('combobox', { name: 'Job status' }), { target: { value: 'running' } });
  fireEvent.click(screen.getByRole('button', { name: 'Add Job' }));
  expect(console.log).toHaveBeenCalledWith('New job:', { title: 'Check inbox', category: 'Read Emails', status: 'running' });
  expect(screen.getByPlaceholderText('Enter the job')).toHaveValue('');
});

test('dark mode toggle', () => {
  const App = require('./App').default;
  const { container } = render(<App />);
  fireEvent.click(screen.getByRole('button', { name: /dark mode/i }));
  expect(container.firstChild).toHaveClass('app--dark');
  fireEvent.click(screen.getByRole('button', { name: /light mode/i }));
  expect(container.firstChild).not.toHaveClass('app--dark');
});
