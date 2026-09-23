import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import ProfileCard from './components/ProfileCard';

test('renders one card per profile', () => {
  render(<App />);
  expect(screen.getAllByRole('article')).toHaveLength(4);
  expect(screen.getByRole('heading', { name: 'Amara Okafor' })).toBeInTheDocument();
});

test('ProfileCard shows its props and skills', () => {
  render(
    <ProfileCard image="photo.jpg" name="Test Person" jobTitle="Tester" bio="Writes tests." skills={['Jest', 'React']} />
  );
  expect(screen.getByText('Tester')).toBeInTheDocument();
  expect(screen.getByText('Writes tests.')).toBeInTheDocument();
  expect(screen.getAllByRole('listitem')).toHaveLength(2);
});

test('ProfileCard shows initials if the image fails', () => {
  render(<ProfileCard image="broken.jpg" name="Test Person" jobTitle="Tester" bio="Bio" />);
  fireEvent.error(screen.getByRole('img'));
  expect(screen.getByText('TP')).toBeInTheDocument();
  expect(screen.queryByRole('list')).not.toBeInTheDocument();
});
