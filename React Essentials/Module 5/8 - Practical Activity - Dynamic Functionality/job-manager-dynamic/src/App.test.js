import { render, screen, fireEvent, within } from '@testing-library/react';
import App from './App';

beforeEach(() => localStorage.clear());

const column = (title) => screen.getByRole('heading', { level: 2, name: new RegExp(title) }).closest('section');
const titlesIn = (title) => within(column(title)).queryAllByRole('listitem').map((li) => li.querySelector('.job-card__title').textContent);

test('deletes a job', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: 'Delete Check the support inbox' }));
  expect(titlesIn('Need to Start')).toEqual([]);
});

test('updates a status, which moves the job', () => {
  render(<App />);
  fireEvent.change(screen.getByLabelText('Status of Scrape competitor prices'), { target: { value: 'completed' } });
  expect(titlesIn('Completed')).toEqual(expect.arrayContaining(['Send the monthly newsletter', 'Scrape competitor prices']));
  expect(titlesIn('In Progress')).toEqual([]);
});

test('adds a new job from the form', () => {
  render(<App />);
  fireEvent.change(screen.getByPlaceholderText('Enter the job'), { target: { value: 'Parse product pages' } });
  fireEvent.click(screen.getByRole('button', { name: 'Web Parsing' }));
  fireEvent.change(screen.getByLabelText('New job status'), { target: { value: 'in-progress' } });
  fireEvent.click(screen.getByRole('button', { name: 'Add Job' }));
  expect(titlesIn('In Progress')).toContain('Parse product pages');
});

test('drag and drop moves a job', () => {
  render(<App />);
  const card = screen.getByText('Check the support inbox').closest('li');
  const data = {};
  const dataTransfer = { setData: (k, v) => (data[k] = v), getData: (k) => data[k] };
  fireEvent.dragStart(card, { dataTransfer });
  fireEvent.dragOver(column('Completed'), { dataTransfer });
  fireEvent.drop(column('Completed'), { dataTransfer });
  expect(titlesIn('Completed')).toContain('Check the support inbox');
});

test('search, and jobs saved to localStorage', () => {
  const { unmount } = render(<App />);
  fireEvent.click(screen.getByRole('button', { name: 'Delete Send the monthly newsletter' }));
  unmount();
  render(<App />);
  expect(titlesIn('Completed')).toEqual([]);
  fireEvent.change(screen.getByLabelText('Search jobs by title'), { target: { value: 'inbox' } });
  expect(titlesIn('Need to Start')).toEqual(['Check the support inbox']);
  expect(titlesIn('In Progress')).toEqual([]);
});
