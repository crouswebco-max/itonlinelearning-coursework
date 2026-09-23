import { render, screen, fireEvent, within } from '@testing-library/react';
import DynamicBotManager from './DynamicBotManager';

const fill = (label, value) => fireEvent.change(screen.getByLabelText(label), { target: { value } });
const botNames = () => screen.queryAllByRole('listitem').map((li) => li.querySelector('.bot__name')?.textContent);

test('shows the starting bots', () => {
  render(<DynamicBotManager />);
  expect(botNames()).toEqual(['Email Bot', 'Data Bot']);
});

test('will not add a bot with empty fields or a duplicate ID', () => {
  render(<DynamicBotManager />);
  fireEvent.click(screen.getByRole('button', { name: 'Add Bot' }));
  expect(screen.getByRole('alert')).toHaveTextContent('Please fill in');
  fill('ID', '1');
  fill('Name', 'Copy Bot');
  fill('Status', 'Active');
  fireEvent.click(screen.getByRole('button', { name: 'Add Bot' }));
  expect(screen.getByRole('alert')).toHaveTextContent('already a bot with ID 1');
  expect(botNames()).toHaveLength(2);
});

test('adds a bot and clears the inputs', () => {
  render(<DynamicBotManager />);
  fill('ID', '3');
  fill('Name', 'Report Bot');
  fill('Status', 'Active');
  fireEvent.click(screen.getByRole('button', { name: 'Add Bot' }));
  expect(botNames()).toEqual(['Email Bot', 'Data Bot', 'Report Bot']);
  expect(screen.getByLabelText('ID')).toHaveValue('');
  expect(screen.getByLabelText('Name')).toHaveValue('');
});

test('deletes a bot', () => {
  render(<DynamicBotManager />);
  fireEvent.click(screen.getByRole('button', { name: 'Delete Email Bot' }));
  expect(botNames()).toEqual(['Data Bot']);
});

test('edits a bot', () => {
  render(<DynamicBotManager />);
  fireEvent.click(screen.getByRole('button', { name: 'Edit Data Bot' }));
  const row = screen.getByLabelText('Bot name').closest('li');
  fireEvent.change(within(row).getByLabelText('Bot name'), { target: { value: 'Data Bot 2' } });
  fireEvent.change(within(row).getByLabelText('Bot status'), { target: { value: 'Active' } });
  fireEvent.click(within(row).getByRole('button', { name: 'Save' }));
  expect(botNames()).toEqual(['Email Bot', 'Data Bot 2']);
});

test('searches by name', () => {
  render(<DynamicBotManager />);
  fireEvent.change(screen.getByPlaceholderText(/search bots/i), { target: { value: 'data' } });
  expect(botNames()).toEqual(['Data Bot']);
});
