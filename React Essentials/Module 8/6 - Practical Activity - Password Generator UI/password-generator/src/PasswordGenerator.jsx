import { useState, useCallback, useEffect } from 'react';
import { MIN_LENGTH, MAX_LENGTH, buildSets, poolSize, createPassword, getStrength } from './utils/password';
import StrengthMeter from './components/StrengthMeter';

const OPTIONS = [
  { key: 'lowercase', label: 'Lowercase (a–z)' },
  { key: 'uppercase', label: 'Uppercase (A–Z)' },
  { key: 'numbers', label: 'Numbers (0–9)' },
  { key: 'symbols', label: 'Special characters' },
];

function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [lowercaseAllowed, setLowercaseAllowed] = useState(true);
  const [uppercaseAllowed, setUppercaseAllowed] = useState(true);
  // Task 2: the two checkboxes from the brief
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [excludeSimilar, setExcludeSimilar] = useState(false);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const options = { lowercase: lowercaseAllowed, uppercase: uppercaseAllowed, numbers: numberAllowed, symbols: characterAllowed };
  const setters = { lowercase: setLowercaseAllowed, uppercase: setUppercaseAllowed, numbers: setNumberAllowed, symbols: setCharacterAllowed };

  // Task 5: uses the current length and options
  const passwordGenerator = useCallback(() => {
    // Task 6: at least one type must be chosen
    if (!lowercaseAllowed && !uppercaseAllowed && !numberAllowed && !characterAllowed) {
      setError('Choose at least one type of character.');
      setPassword('');
      return;
    }
    // Task 6: keep the length in range, even if it's changed some other way
    const safeLength = Math.min(Math.max(length, MIN_LENGTH), MAX_LENGTH);

    setError('');
    setCopied(false);
    const sets = buildSets({
      lowercase: lowercaseAllowed,
      uppercase: uppercaseAllowed,
      numbers: numberAllowed,
      symbols: characterAllowed,
      excludeSimilar,
    });
    setPassword(createPassword(safeLength, sets));
  }, [length, lowercaseAllowed, uppercaseAllowed, numberAllowed, characterAllowed, excludeSimilar]);

  // Task 5: make a new password whenever any option changes
  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator]);

  // Task 3: copy the password, with feedback on the button
  const copyPasswordToClipboard = useCallback(async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setError('Copying is blocked in this browser. Select the password and copy it by hand.');
    }
  }, [password]);

  // Bonus 3: Alt+G generates a new password and Alt+C copies it.
  // event.code is used because Option+G types a symbol on a Mac, so event.key isn't "g"
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!event.altKey) return;
      if (event.code === 'KeyG') {
        event.preventDefault();
        passwordGenerator();
      } else if (event.code === 'KeyC') {
        event.preventDefault();
        copyPasswordToClipboard();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown); // clean up
  }, [passwordGenerator, copyPasswordToClipboard]);

  // Bonus 1: the strength updates in real time
  const strength = getStrength(
    length,
    poolSize(buildSets({ lowercase: lowercaseAllowed, uppercase: uppercaseAllowed, numbers: numberAllowed, symbols: characterAllowed, excludeSimilar }))
  );

  // Task 4: Tailwind styling, responsive from phone to desktop
  return (
    <div className="w-full max-w-lg mx-auto rounded-2xl bg-slate-800 px-5 py-7 sm:px-8 shadow-xl text-orange-400">
      <h1 className="text-2xl sm:text-3xl font-bold text-white text-center mb-6">Password Generator</h1>

      {/* Task 3: the Copy button next to the password */}
      <div className="flex rounded-lg overflow-hidden mb-3">
        <input
          type="text"
          value={password}
          placeholder="No password"
          readOnly
          aria-label="Generated password"
          className="w-full min-w-0 px-3 py-2 font-mono text-sm sm:text-base text-slate-900 bg-white outline-none"
        />
        <button
          type="button"
          onClick={copyPasswordToClipboard}
          disabled={!password}
          className={`shrink-0 px-4 py-2 font-semibold text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
            copied ? 'bg-emerald-600' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      <StrengthMeter strength={strength} />

      {error && (
        <p role="alert" className="mt-3 rounded-md bg-red-500/15 px-3 py-2 text-sm font-semibold text-red-300">
          {error}
        </p>
      )}

      <div className="mt-5 flex flex-col gap-4 text-sm">
        {/* Task 1: the length slider, with its value shown beside it */}
        <div className="flex items-center gap-3">
          <input
            id="length"
            type="range"
            min={MIN_LENGTH}
            max={MAX_LENGTH}
            value={length}
            onChange={(event) => setLength(Number(event.target.value))}
            className="w-full cursor-pointer accent-orange-400"
          />
          <label htmlFor="length" className="shrink-0 w-24 text-right font-semibold">
            Length: {length}
          </label>
        </div>

        {/* Task 2: one checkbox per character type */}
        <fieldset>
          <legend className="mb-2 text-xs uppercase tracking-wider text-slate-400">Include</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {OPTIONS.map((option) => (
              <label key={option.key} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options[option.key]}
                  onChange={() => setters[option.key]((previous) => !previous)}
                  className="h-4 w-4 accent-orange-400"
                />
                {option.label}
              </label>
            ))}
            {/* Bonus 2 */}
            <label className="flex items-center gap-2 cursor-pointer sm:col-span-2">
              <input type="checkbox" checked={excludeSimilar} onChange={() => setExcludeSimilar((previous) => !previous)} className="h-4 w-4 accent-orange-400" />
              Exclude similar characters (i, l, 1, o, 0…)
            </label>
          </div>
        </fieldset>

        <button
          type="button"
          onClick={passwordGenerator}
          className="rounded-lg bg-orange-500 px-4 py-2 font-bold text-slate-900 hover:bg-orange-400 transition-colors"
        >
          Generate New Password
        </button>

        <p className="text-center text-xs text-slate-400">
          Shortcuts: <kbd className="rounded bg-slate-700 px-1.5 py-0.5 text-slate-200">Alt</kbd> +{' '}
          <kbd className="rounded bg-slate-700 px-1.5 py-0.5 text-slate-200">G</kbd> generate ·{' '}
          <kbd className="rounded bg-slate-700 px-1.5 py-0.5 text-slate-200">Alt</kbd> +{' '}
          <kbd className="rounded bg-slate-700 px-1.5 py-0.5 text-slate-200">C</kbd> copy
        </p>
      </div>
    </div>
  );
}

export default PasswordGenerator;
