import React from 'react';
import './App.css';
import ProfileCard from './components/ProfileCard';

// The profiles to show. Each object has the props ProfileCard needs
const profiles = [
  {
    id: 1,
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    name: 'Amara Okafor',
    jobTitle: 'Frontend Developer',
    bio: 'Builds fast, accessible interfaces and loves turning designs into pixel-perfect React components.',
    skills: ['React', 'JavaScript', 'CSS', 'Accessibility'],
  },
  {
    id: 2,
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    name: 'Daniel Reyes',
    jobTitle: 'UX Designer',
    bio: 'Talks to users first and designs second. Happiest with a whiteboard and a stack of sticky notes.',
    skills: ['Figma', 'User Research', 'Prototyping'],
  },
  {
    id: 3,
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    name: 'Sofia Lindqvist',
    jobTitle: 'Backend Engineer',
    bio: 'Designs APIs that are a pleasure to use and databases that stay fast as they grow.',
    skills: ['Node.js', 'SQL', 'APIs', 'Docker'],
  },
  {
    id: 4,
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
    name: 'Kwame Mensah',
    jobTitle: 'Project Manager',
    bio: 'Keeps projects on track and teams talking, and makes sure every launch goes out on time.',
    skills: ['Agile', 'Scrum', 'Communication'],
  },
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Meet the Team</h1>
        <p>Every card below is the same ProfileCard component, given different props.</p>
      </header>

      <main className="card-grid">
        {/* One ProfileCard for each profile object */}
        {profiles.map((profile) => (
          <ProfileCard
            key={profile.id}
            image={profile.image}
            name={profile.name}
            jobTitle={profile.jobTitle}
            bio={profile.bio}
            skills={profile.skills}
          />
        ))}
      </main>
    </div>
  );
}

export default App;
