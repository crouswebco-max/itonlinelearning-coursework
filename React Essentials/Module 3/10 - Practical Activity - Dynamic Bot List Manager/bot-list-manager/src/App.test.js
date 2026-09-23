import { render, screen, fireEvent, within } from '@testing-library/react';
import BotListManager from './BotListManager';

const botItem = (name) => screen.getByRole('heading', { name }).closest('li');

test('shows each bot with its id, name, status and task', () => {
  render(<BotListManager />);
  expect(screen.getAllByRole('listitem')).toHaveLength(3);
  const bot = botItem('Data Analyzer');
  expect(bot).toHaveTextContent('Bot #3');
  expect(bot).toHaveTextContent('Analyzing data');
  expect(within(bot).getByText('Stopped')).toHaveClass('status--stopped');
});

test('Trigger Job sets the bot to Running, and Stop stops it', () => {
  render(<BotListManager />);
  fireEvent.click(within(botItem('Data Analyzer')).getByRole('button', { name: 'Trigger Job' }));
  expect(within(botItem('Data Analyzer')).getByText('Running')).toHaveClass('status--running');
  fireEvent.click(within(botItem('Data Analyzer')).getByRole('button', { name: 'Stop' }));
  expect(within(botItem('Data Analyzer')).getByText('Stopped')).toBeInTheDocument();
});

test('filters by status', () => {
  render(<BotListManager />);
  fireEvent.click(screen.getByRole('button', { name: 'Completed (1)' }));
  expect(screen.getAllByRole('listitem')).toHaveLength(1);
  expect(screen.getByRole('heading', { name: 'Notification Sender' })).toBeInTheDocument();
});

test('adds and deletes bots', () => {
  render(<BotListManager />);
  fireEvent.click(screen.getByRole('button', { name: 'Add Bot' }));
  expect(screen.getByRole('alert')).toHaveTextContent('Please enter a name and a task.');

  fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Report Builder' } });
  fireEvent.change(screen.getByLabelText('Task'), { target: { value: 'Building reports' } });
  fireEvent.click(screen.getByRole('button', { name: 'Add Bot' }));
  expect(botItem('Report Builder')).toHaveTextContent('Bot #4');

  fireEvent.click(screen.getByRole('button', { name: 'Delete Email Extractor' }));
  expect(screen.queryByRole('heading', { name: 'Email Extractor' })).not.toBeInTheDocument();
  expect(screen.getAllByRole('listitem')).toHaveLength(3);
});
