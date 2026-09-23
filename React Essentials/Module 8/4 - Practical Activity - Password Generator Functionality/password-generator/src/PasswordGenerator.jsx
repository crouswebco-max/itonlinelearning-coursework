// Task 1: useCallback is imported with useState
import { useState, useCallback } from 'react';
import { MIN_LENGTH, MAX_LENGTH, buildSets, poolSize, createPassword, getStrength } from './utils/password';
import StrengthMeter from './components/StrengthMeter';

function PasswordGenerator() {
  const [length, setLength] = useState(12);
  const [lengthText, setLengthText] = useState('12');
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [excludeSimilar, setExcludeSimilar] = useState(false);
  const [password, setPassword] = useState('');
  const [justGenerated, setJustGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [lengthError, setLengthError] = useState('');

  // Tasks 1 and 4: useCallback keeps the same function between renders, and only makes a new one
  // when something it uses changes: length, numberAllowed, characterAllowed or excludeSimilar
  const passwordGenerator = useCallback(() => {
    // Task 3: letters are always used, and numbers and symbols are added when ticked.
    // createPassword always includes at least one character from every chosen set
    const sets = buildSets({ numbers: numberAllowed, symbols: characterAllowed, excludeSimilar });
    setPassword(createPassword(length, sets));
    setCopied(false);

    // Task 5: the Generate button turns green for a moment
    setJustGenerated(true);
    setTimeout(() => setJustGenerated(false), 700);
  }, [length, numberAllowed, characterAllowed, excludeSimilar]);

  // Task 5: the length must stay between 6 and 100
  const handleLengthText = (value) => {
    setLengthText(value);
    const number = Number(value);
    if (value === '' || !Number.isInteger(number) || number < MIN_LENGTH || number > MAX_LENGTH) {
      setLengthError(`Enter a whole number from ${MIN_LENGTH} to ${MAX_LENGTH}.`);
      return;
    }
    setLengthError('');
    setLength(number);
  };

  const handleSlider = (value) => {
    setLength(value);
    setLengthText(String(value));
    setLengthError('');
  };

  // Bonus 3: copy to the clipboard
  const copyPassword = async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      alert('Copying is blocked in this browser. Select the password and copy it by hand.');
    }
  };

  // Bonus 1: the strength updates as soon as an option changes
  const strength = getStrength(length, poolSize(buildSets({ numbers: numberAllowed, symbols: characterAllowed, excludeSimilar })));

  return (
    <div className="w-full max-w-md mx-auto rounded-2xl bg-slate-800 px-6 py-8 shadow-xl text-orange-400">
      <h1 className="text-2xl font-bold text-white text-center mb-6">Password Generator</h1>

      <div className="flex rounded-lg overflow-hidden mb-3">
        <input
          type="text"
          value={password}
          placeholder="Click Generate"
          readOnly
          aria-label="Generated password"
          className="w-full min-w-0 px-3 py-2 font-mono text-slate-900 bg-white outline-none"
        />
        <button
          type="button"
          onClick={copyPassword}
          disabled={!password}
          className="shrink-0 px-4 py-2 font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      <StrengthMeter strength={strength} />

      <div className="mt-5 flex flex-col gap-4 text-sm">
        {/* Task 2: the length range, connected to the length state */}
        <div className="flex items-center gap-3">
          <input
            id="length"
            type="range"
            min={MIN_LENGTH}
            max={MAX_LENGTH}
            value={length}
            onChange={(event) => handleSlider(Number(event.target.value))}
            className="w-full cursor-pointer accent-orange-400"
            aria-label="Password length"
          />
          <label htmlFor="length-number" className="sr-only">
            Length
          </label>
          <input
            id="length-number"
            type="number"
            min={MIN_LENGTH}
            max={MAX_LENGTH}
            value={lengthText}
            onChange={(event) => handleLengthText(event.target.value)}
            aria-invalid={Boolean(lengthError)}
            className="w-16 rounded px-2 py-1 text-slate-900 aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-500"
          />
        </div>
        {lengthError && (
          <p role="alert" className="-mt-2 text-red-400 font-semibold">
            {lengthError}
          </p>
        )}

        {/* Task 2: checkboxes for numbers and special characters */}
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={numberAllowed} onChange={() => setNumberAllowed((previous) => !previous)} className="h-4 w-4 accent-orange-400" />
            Numbers
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={characterAllowed} onChange={() => setCharacterAllowed((previous) => !previous)} className="h-4 w-4 accent-orange-400" />
            Special characters
          </label>
          {/* Bonus 2 */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={excludeSimilar} onChange={() => setExcludeSimilar((previous) => !previous)} className="h-4 w-4 accent-orange-400" />
            Exclude similar (i, l, 1, o, 0…)
          </label>
        </div>

        {/* Task 5: help text about strength */}
        <p className="text-xs leading-relaxed text-slate-300">
          Longer is stronger, and each type of character you add makes it harder to guess. Aim for at least 14 characters with
          numbers and special characters.
        </p>

        {/* Task 2: the Generate button calls passwordGenerator */}
        <button
          type="button"
          onClick={passwordGenerator}
          disabled={Boolean(lengthError)}
          className={`mt-1 rounded-lg px-4 py-2 font-bold text-slate-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
            justGenerated ? 'bg-emerald-400' : 'bg-orange-500 hover:bg-orange-400'
          }`}
        >
          {justGenerated ? '✓ Generated' : 'Generate'}
        </button>
      </div>
    </div>
  );
}

export default PasswordGenerator;
