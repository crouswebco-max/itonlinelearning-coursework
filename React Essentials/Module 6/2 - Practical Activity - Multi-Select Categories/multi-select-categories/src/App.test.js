import { render, screen, fireEvent } from '@testing-library/react';
import JobForm from './components/JobForm';

beforeEach(() => jest.spyOn(console, 'log').mockImplementation(() => {}));
afterEach(() => jest.restoreAllMocks());

const tag = (name) => screen.getByRole('button', { name: new RegExp(`^(✓ )?${name}$`) });

test('toggles categories on and off', () => {
  render(<JobForm />);
  fireEvent.click(tag('Read Emails'));
  fireEvent.click(tag('Reports'));
  expect(tag('Read Emails')).toHaveAttribute('aria-pressed', 'true');
  expect(screen.getByText('Selected:').parentElement).toHaveTextContent('Read EmailsReports');
  fireEvent.click(tag('Read Emails'));
  expect(tag('Read Emails')).toHaveAttribute('aria-pressed', 'false');
});

test('stops at 3 categories', () => {
  render(<JobForm />);
  ['Read Emails', 'Reports', 'Invoices'].forEach((name) => fireEvent.click(tag(name)));
  expect(tag('Web Parsing')).toBeDisabled();
  expect(screen.getByText('Categories (3/3)')).toBeInTheDocument();
});

test('needs at least one category, then logs the categories', () => {
  render(<JobForm />);
  fireEvent.change(screen.getByLabelText('Job title'), { target: { value: 'Tidy inbox' } });
  fireEvent.click(screen.getByRole('button', { name: 'Add Job' }));
  expect(screen.getByRole('alert')).toHaveTextContent('Please select at least one category.');
  fireEvent.click(tag('Read Emails'));
  fireEvent.click(tag('Send Emails'));
  fireEvent.click(screen.getByRole('button', { name: 'Add Job' }));
  expect(console.log).toHaveBeenCalledWith('Job details:', { title: 'Tidy inbox', categories: ['Read Emails', 'Send Emails'], status: 'need-to-start' });
});

test('clear categories and filter the list', () => {
  render(<JobForm />);
  fireEvent.click(tag('Read Emails'));
  fireEvent.click(screen.getByRole('button', { name: 'Clear Categories' }));
  expect(screen.getByText('none yet')).toBeInTheDocument();
  fireEvent.change(screen.getByLabelText('Filter categories'), { target: { value: 'email' } });
  expect(screen.getAllByRole('button', { pressed: false }).map((b) => b.textContent)).toEqual(['Read Emails', 'Send Emails']);
});
