import { render, screen, fireEvent } from '@testing-library/react';
import CategorySelector from './components/CategorySelector';

const button = (name) => screen.getByRole('button', { name: new RegExp(`^(✓ )?${name}$`) });

test('the selected button gets its category colour, the others stay white', () => {
  render(<CategorySelector />);
  fireEvent.click(button('Read Emails'));
  expect(button('Read Emails')).toHaveStyle({ backgroundColor: 'orange' });
  expect(button('Web Parsing')).toHaveStyle({ backgroundColor: 'white' });
});

test('only one category can be selected at a time', () => {
  render(<CategorySelector />);
  fireEvent.click(button('Read Emails'));
  fireEvent.click(button('Web Parsing'));
  expect(button('Web Parsing')).toHaveStyle({ backgroundColor: 'blue' });
  expect(button('Read Emails')).toHaveStyle({ backgroundColor: 'white' });
  expect(screen.getAllByRole('button', { pressed: true })).toHaveLength(1);
});

test('validateCategory is used by Continue', () => {
  render(<CategorySelector />);
  fireEvent.click(screen.getByRole('button', { name: 'Continue' }));
  expect(screen.getByRole('status')).toHaveTextContent('Please select a category first.');
  fireEvent.click(button('Send Emails'));
  fireEvent.click(screen.getByRole('button', { name: 'Continue' }));
  expect(screen.getByRole('status')).toHaveTextContent('"Send Emails" is selected.');
});

test('reset clears the selection', () => {
  render(<CategorySelector />);
  fireEvent.click(button('Send Emails'));
  fireEvent.click(screen.getByRole('button', { name: 'Reset' }));
  expect(screen.queryAllByRole('button', { pressed: true })).toHaveLength(0);
  expect(screen.getByText('Nothing selected yet.')).toBeInTheDocument();
});
