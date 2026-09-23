import { render, screen, fireEvent } from '@testing-library/react';
import StatusBoard from './components/StatusBoard';
import TicketInfo from './components/TicketInfo';

const card = (label) => screen.getByRole('button', { name: new RegExp(`^${label}`) });

test('TicketInfo shows its children and uses result for the class', () => {
  const { container } = render(
    <TicketInfo result="failed" image="icon.svg" count={2}>
      Failed
    </TicketInfo>
  );
  expect(screen.getByText('Failed')).toBeInTheDocument();
  expect(container.firstChild).toHaveClass('ticket-info--failed');
});

test('shows three statuses with counts', () => {
  render(<StatusBoard />);
  expect(card('Completed')).toHaveTextContent('Completed2');
  expect(card('In Progress')).toHaveTextContent('In Progress1');
  expect(card('Failed')).toHaveTextContent('Failed1');
});

test('clicking a status shows its tickets', () => {
  render(<StatusBoard />);
  fireEvent.click(card('Failed'));
  expect(screen.getByText('#104 Send weekly report')).toBeInTheDocument();
});

test('adding a ticket and changing a status update the counts', () => {
  render(<StatusBoard />);
  fireEvent.change(screen.getByLabelText('Ticket title'), { target: { value: 'Fix login' } });
  fireEvent.change(screen.getByLabelText('New ticket status'), { target: { value: 'failed' } });
  fireEvent.click(screen.getByRole('button', { name: 'Add Ticket' }));
  expect(card('Failed')).toHaveTextContent('Failed2');

  fireEvent.click(card('Failed'));
  fireEvent.change(screen.getByLabelText('Status of Fix login'), { target: { value: 'completed' } });
  expect(card('Completed')).toHaveTextContent('Completed3');
  expect(card('Failed')).toHaveTextContent('Failed1');
});
