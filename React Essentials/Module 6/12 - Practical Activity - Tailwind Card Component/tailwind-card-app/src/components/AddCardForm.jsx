import { useState } from 'react';
import componentsImage from '../assets/components-card.svg';

const EMPTY_CARD = { title: '', description: '', buttonText: '' };

// Bonus 3: a form to add new cards
const AddCardForm = ({ onAddCard }) => {
  const [card, setCard] = useState(EMPTY_CARD);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setCard({ ...card, [event.target.name]: event.target.value });
    setError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!card.title.trim() || !card.description.trim() || !card.buttonText.trim()) {
      setError('Please fill in every field.');
      return;
    }
    onAddCard({
      title: card.title.trim(),
      description: card.description.trim(),
      buttonText: card.buttonText.trim(),
      imageUrl: componentsImage,
    });
    setCard(EMPTY_CARD);
  };

  const inputClasses =
    'w-full rounded-lg border-2 border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-blue-600 focus:outline-none dark:border-slate-600 dark:bg-slate-900 dark:text-white';

  return (
    <form onSubmit={handleSubmit} noValidate className="mx-auto mb-8 max-w-3xl rounded-xl bg-white p-6 shadow-md dark:bg-slate-800">
      <h2 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">Add a Card</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          Title
          <input name="title" value={card.title} onChange={handleChange} className={`mt-1 ${inputClasses}`} />
        </label>
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 sm:col-span-2">
          Description
          <input name="description" value={card.description} onChange={handleChange} className={`mt-1 ${inputClasses}`} />
        </label>
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          Button text
          <input name="buttonText" value={card.buttonText} onChange={handleChange} className={`mt-1 ${inputClasses}`} />
        </label>
        <div className="flex items-end">
          <button type="submit" className="rounded-lg bg-emerald-600 px-4 py-2 font-bold text-white transition-colors hover:bg-emerald-800">
            Add Card
          </button>
        </div>
      </div>
      {error && (
        <p role="alert" className="mt-3 font-semibold text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </form>
  );
};

export default AddCardForm;
