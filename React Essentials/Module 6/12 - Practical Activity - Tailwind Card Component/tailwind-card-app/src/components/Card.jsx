// Task 4: a reusable card. Everything it shows comes from props
const Card = ({ title, description, buttonText, imageUrl }) => {
  return (
    // Bonus 1: the card lifts and its shadow grows on hover
    <div className="max-w-sm w-full rounded-xl overflow-hidden shadow-lg m-4 bg-white transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-2xl motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:bg-slate-800">
      <img className="w-full h-48 object-cover" src={imageUrl} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-slate-900 dark:text-white">{title}</div>
        <p className="text-gray-700 text-base dark:text-slate-300">{description}</p>
      </div>
      <div className="px-6 pt-4 pb-6">
        <button className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded transition-colors dark:bg-sky-500 dark:hover:bg-sky-400 dark:text-slate-900">
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Card;
