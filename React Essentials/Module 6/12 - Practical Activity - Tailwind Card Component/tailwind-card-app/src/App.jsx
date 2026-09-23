import { useState, useEffect } from 'react';
import Card from './components/Card';
import AddCardForm from './components/AddCardForm';
import reactImage from './assets/react-card.svg';
import tailwindImage from './assets/tailwind-card.svg';

// Task 5: the data for each card. The images are local files, imported above
const startingCards = [
  {
    title: 'React Development',
    description: 'Learn how to build web applications with React and Tailwind CSS.',
    buttonText: 'Learn More',
    imageUrl: reactImage,
  },
  {
    title: 'Tailwind CSS Mastery',
    description: 'Master the art of rapid UI development with Tailwind CSS.',
    buttonText: 'Explore',
    imageUrl: tailwindImage,
  },
];

const App = () => {
  const [cardData, setCardData] = useState(startingCards);
  const [isDark, setIsDark] = useState(false);

  // Bonus 2: Tailwind's dark: classes apply when <html> has the "dark" class
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const addCard = (card) => setCardData([...cardData, card]);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900">
      <div className="container mx-auto p-4">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setIsDark(!isDark)}
            aria-pressed={isDark}
            className="rounded-full border-2 border-slate-400 px-4 py-1 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-200 dark:text-white dark:hover:bg-slate-700"
          >
            {isDark ? '☀️ Light mode' : '🌙 Dark mode'}
          </button>
        </div>

        <h1 className="text-3xl font-bold text-center mb-8 text-slate-900 dark:text-white">My Card Application</h1>

        <AddCardForm onAddCard={addCard} />

        <div className="flex flex-wrap justify-center">
          {cardData.map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
