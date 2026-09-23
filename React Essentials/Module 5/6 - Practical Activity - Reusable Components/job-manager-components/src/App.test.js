import { render, screen, fireEvent, within } from '@testing-library/react';
import App from './App';

const column = (title) => screen.getByRole('heading', { level: 2, name: new RegExp(title) }).closest('section');
const titlesIn = (title) => within(column(title)).queryAllByRole('listitem').map((li) => li.querySelector('.job-card__title').textContent);

test('shows three columns with the right jobs', () => {
  render(<App />);
  expect(titlesIn('Need to Start')).toEqual(['Check the support inbox', 'Collect new supplier listings']);
  expect(titlesIn('In Progress')).toEqual(['Scrape competitor prices']);
  expect(titlesIn('Completed')).toEqual(['Send the monthly newsletter']);
});

test('moves a job forward and back', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: 'Move Check the support inbox forward' }));
  expect(titlesIn('In Progress')).toContain('Check the support inbox');
  fireEvent.click(screen.getByRole('button', { name: 'Move Check the support inbox back' }));
  expect(titlesIn('Need to Start')).toContain('Check the support inbox');
});

test('the form adds jobs to Need to Start', () => {
  render(<App />);
  fireEvent.change(screen.getByPlaceholderText('Enter the job'), { target: { value: 'Reply to invoices' } });
  fireEvent.click(screen.getByRole('button', { name: 'Send Emails' }));
  fireEvent.click(screen.getByRole('button', { name: 'Add Job' }));
  expect(titlesIn('Need to Start')).toContain('Reply to invoices');
});

test('search filters every column', () => {
  render(<App />);
  fireEvent.change(screen.getByLabelText('Search all jobs'), { target: { value: 'web parsing' } });
  expect(titlesIn('Need to Start')).toEqual(['Collect new supplier listings']);
  expect(titlesIn('In Progress')).toEqual(['Scrape competitor prices']);
  expect(titlesIn('Completed')).toEqual([]);
});
