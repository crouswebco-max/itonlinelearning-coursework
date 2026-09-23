import { render, screen, fireEvent } from '@testing-library/react';
import DynamicForm from './DynamicForm';

beforeEach(() => jest.spyOn(console, 'log').mockImplementation(() => {}));
afterEach(() => jest.restoreAllMocks());

const type = (value) => fireEvent.change(screen.getByRole('textbox'), { target: { value } });

test('shows the input and character count as you type', () => {
  render(<DynamicForm />);
  type('Hello');
  expect(screen.getByText('Hello', { selector: '.current' })).toBeInTheDocument();
  expect(screen.getByText('5 / 100 characters')).toBeInTheDocument();
});

test('logs every render', () => {
  render(<DynamicForm />);
  type('Hi');
  expect(console.log).toHaveBeenCalledWith('DynamicForm rendered. inputValue is:', '"Hi"');
});

test('reset clears the input', () => {
  render(<DynamicForm />);
  type('Hello');
  fireEvent.click(screen.getByRole('button', { name: 'Reset' }));
  expect(screen.getByRole('textbox')).toHaveValue('');
  expect(screen.getByText('Nothing typed yet')).toBeInTheDocument();
});

test('too-short input shows an error and is not submitted', () => {
  render(<DynamicForm />);
  type('Hi');
  fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
  expect(screen.getByRole('alert')).toHaveTextContent('at least 3 characters');
  expect(screen.getByText('Submitted Items (0)')).toBeInTheDocument();
});

test('valid input is added to the list and the input clears', () => {
  render(<DynamicForm />);
  type('Learn useState');
  fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
  type('Build a form');
  fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
  expect(screen.getAllByRole('listitem').map((li) => li.textContent)).toEqual(['Learn useState', 'Build a form']);
  expect(screen.getByRole('textbox')).toHaveValue('');
});
