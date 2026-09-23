import { render, screen, fireEvent, within } from '@testing-library/react';
import JobCounter from './JobCounter';
import JobCounterWithState from './JobCounterWithState';

afterEach(() => jest.restoreAllMocks());

test('regular variable: the console counts up but the page stays at 0', () => {
  const log = jest.spyOn(console, 'log').mockImplementation(() => {});
  render(<JobCounter />);
  const button = screen.getByRole('button', { name: 'Add Job' });
  fireEvent.click(button);
  fireEvent.click(button);
  fireEvent.click(button);
  expect(log).toHaveBeenLastCalledWith('Job count is now:', 3);
  expect(screen.getByText('Current Jobs: 0')).toBeInTheDocument();
});

test('useState: the page updates on every click', () => {
  jest.spyOn(console, 'log').mockImplementation(() => {});
  const { container } = render(<JobCounterWithState />);
  const button = within(container).getByRole('button', { name: 'Add Job' });
  fireEvent.click(button);
  fireEvent.click(button);
  expect(screen.getByText('Current Jobs: 2')).toBeInTheDocument();
});
