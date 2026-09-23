import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import VariableDisplay from './VariableDisplay';

afterEach(() => jest.restoreAllMocks());

test('heading stays the same when the random number is 0.5 or less', () => {
  jest.spyOn(Math, 'random').mockReturnValue(0.2);
  render(<VariableDisplay />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Welcome to React');
});

test('heading changes when the random number is more than 0.5', () => {
  jest.spyOn(Math, 'random').mockReturnValue(0.9);
  render(<VariableDisplay />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Welcome to advanced React');
});

test('shows object properties and the array as a list', () => {
  render(<VariableDisplay />);
  expect(screen.getByText('Name: John')).toBeInTheDocument();
  expect(screen.getByText('Developer')).toBeInTheDocument();
  expect(screen.getAllByRole('listitem').map((item) => item.textContent)).toEqual(['React', 'JSX', 'Variables']);
});

test('Run again picks a new random number', () => {
  const random = jest.spyOn(Math, 'random').mockReturnValue(0.2);
  render(<App />);
  random.mockReturnValue(0.9);
  fireEvent.click(screen.getByRole('button', { name: /run again/i }));
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Welcome to advanced React');
});
