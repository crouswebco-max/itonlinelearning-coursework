import { render, screen, fireEvent } from '@testing-library/react';
import StyledButton from './StyledButton';

test('the heading has its inline styles', () => {
  render(<StyledButton />);
  expect(screen.getByRole('heading')).toHaveStyle({ textAlign: 'center', backgroundColor: '#087ea4' });
});

test('the button has a className and starts enabled', () => {
  render(<StyledButton />);
  const button = screen.getByRole('button', { name: /click to disable me/i });
  expect(button).toHaveClass('styled-button');
  expect(button).toBeEnabled();
  expect(button).toHaveStyle({ borderRadius: '999px' });
});

test('hovering changes the style', () => {
  render(<StyledButton />);
  const button = screen.getByRole('button', { name: /click to disable me/i });
  fireEvent.mouseEnter(button);
  expect(button).toHaveStyle({ backgroundColor: '#087ea4' });
  fireEvent.mouseLeave(button);
  expect(button).toHaveStyle({ backgroundColor: '#58c4dc' });
});

test('clicking disables the button, and it can be enabled again', () => {
  render(<StyledButton />);
  fireEvent.click(screen.getByRole('button', { name: /click to disable me/i }));
  expect(screen.getByRole('button', { name: /button disabled/i })).toBeDisabled();
  fireEvent.click(screen.getByRole('button', { name: /enable it again/i }));
  expect(screen.getByRole('button', { name: /click to disable me/i })).toBeEnabled();
});
