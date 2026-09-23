// Bonus: a bar that fills up as the password gets stronger
const COLOURS = ['bg-slate-600', 'bg-red-500', 'bg-amber-400', 'bg-lime-400', 'bg-emerald-400'];

function StrengthMeter({ strength }) {
  return (
    <div>
      <div className="flex gap-1" aria-hidden="true">
        {[1, 2, 3, 4].map((step) => (
          <span key={step} className={`h-2 flex-1 rounded-full transition-colors ${strength.level >= step ? COLOURS[strength.level] : 'bg-slate-600'}`} />
        ))}
      </div>
      <p className="mt-1 text-xs text-slate-300" aria-live="polite">
        Strength: <strong className="text-white">{strength.label}</strong> ({strength.bits} bits)
      </p>
    </div>
  );
}

export default StrengthMeter;
