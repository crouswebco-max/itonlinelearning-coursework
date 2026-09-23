import { render, screen } from '@testing-library/react';
import App from './App';

test('shows the welcome message', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /welcome to my first react app/i })).toBeInTheDocument();
  expect(screen.getByText(/i'm excited to learn react/i)).toBeInTheDocument();
});

test('shows the Goals component with a list', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /what juan wants to learn/i })).toBeInTheDocument();
  expect(screen.getAllByRole('listitem')).toHaveLength(3);
});
