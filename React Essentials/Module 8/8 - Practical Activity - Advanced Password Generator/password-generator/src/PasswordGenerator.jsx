// Task 3: useRef is imported with the other hooks
import { useState, useCallback, useEffect, useRef } from 'react';
import usePasswordGenerator from './hooks/usePasswordGenerator';
import { MIN_LENGTH, MAX_LENGTH } from './utils/password';
import StrengthMeter from './components/StrengthMeter';

const OPTIONS = [
  { key: 'lowercase', label: 'Lowercase (a–z)' },
  { key: 'uppercase', label: 'Uppercase (A–Z)' },
  { key: 'numbers', label: 'Numbers (0–9)' },
  { key: 'symbols', label: 'Special characters' },
];

function PasswordGenerator() {
  // Task 5: everything about making passwords comes from the custom hook
  const {
    length,
    setLength,
    options,
    toggleOption,
    excludeSimilar,
    setExcludeSimilar,
    count,
    setCount,
    password,
    passwords,
    error,
    strength,
    passwordGenerator,
  } = usePasswordGenerator();

  const [copiedIndex, setCopiedIndex] = useState(null);
  const [copyError, setCopyError] = useState('');

  // Task 3: a ref to the password input, so it can be selected
  const passwordRef = useRef(null);

  // Task 3: select the text in the input, then copy it. useCallback only rebuilds this when password changes
  const copyPasswordToClipboard = useCallback(async () => {
    if (!password) return;
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, MAX_LENGTH);
    try {
      await navigator.clipboard.writeText(password);
      setCopiedIndex(0);
      setCopyError('');
      setTimeout(() => setCopiedIndex(null), 1500);
    } catch {
      setCopyError('Copying is blocked in this browser. The password is selected, so press Ctrl+C (or ⌘+C).');
    }
  }, [password]);

  // Bonus 2: copy one of the extra passwords
  const copyExtra = async (value, index) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1500);
    } catch {
      setCopyError('Copying is blocked in this browser.');
    }
  };

  // Bonus 3: Alt+G generates new passwords and Alt+C copies the first one
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
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [passwordGenerator, copyPasswordToClipboard]);

  return (
    <div className="w-full max-w-lg mx-auto rounded-2xl bg-slate-800 px-5 py-7 sm:px-8 shadow-xl text-orange-400">
      <h1 className="text-2xl sm:text-3xl font-bold text-white text-center mb-6">Password Generator</h1>

      <div className="flex rounded-lg overflow-hidden mb-3">
        <input
          ref={passwordRef}
          type="text"
          value={password}
          placeholder="No password"
          readOnly
          aria-label="Generated password"
          className="w-full min-w-0 px-3 py-2 font-mono text-sm sm:text-base text-slate-900 bg-white outline-none selection:bg-orange-300"
        />
        {/* Task 4: the button changes when the password is copied */}
        <button
          type="button"
          onClick={copyPasswordToClipboard}
          disabled={!password}
          className={`shrink-0 px-4 py-2 font-semibold text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
            copiedIndex === 0 ? 'bg-emerald-600' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {copiedIndex === 0 ? 'Copied!' : 'Copy'}
        </button>
      </div>

      <StrengthMeter strength={strength} />

      {(error || copyError) && (
        <p role="alert" className="mt-3 rounded-md bg-red-500/15 px-3 py-2 text-sm font-semibold text-red-300">
          {error || copyError}
        </p>
      )}

      <div className="mt-5 flex flex-col gap-4 text-sm">
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

        <fieldset>
          <legend className="mb-2 text-xs uppercase tracking-wider text-slate-400">Include</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {OPTIONS.map((option) => (
              <label key={option.key} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={options[option.key]} onChange={() => toggleOption(option.key)} className="h-4 w-4 accent-orange-400" />
                {option.label}
              </label>
            ))}
            <label className="flex items-center gap-2 cursor-pointer sm:col-span-2">
              <input type="checkbox" checked={excludeSimilar} onChange={() => setExcludeSimilar((previous) => !previous)} className="h-4 w-4 accent-orange-400" />
              Exclude similar characters (i, l, 1, o, 0…)
            </label>
          </div>
        </fieldset>

        {/* Bonus 2: how many passwords */}
        <div className="flex items-center gap-3">
          <label htmlFor="count" className="font-semibold">
            How many passwords
          </label>
          <select
            id="count"
            value={count}
            onChange={(event) => setCount(Number(event.target.value))}
            className="rounded bg-white px-2 py-1 text-slate-900"
          >
            {[1, 3, 5, 10].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {passwords.length > 1 && (
          <ul className="flex flex-col gap-2" aria-label="More passwords">
            {passwords.slice(1).map((value, i) => (
              <li key={`${i}-${value}`} className="flex rounded-md overflow-hidden">
                <span className="w-full min-w-0 truncate bg-slate-700 px-3 py-1.5 font-mono text-slate-100">{value}</span>
                <button
                  type="button"
                  onClick={() => copyExtra(value, i + 1)}
                  className={`shrink-0 px-3 py-1.5 text-xs font-semibold text-white ${copiedIndex === i + 1 ? 'bg-emerald-600' : 'bg-slate-600 hover:bg-slate-500'}`}
                >
                  {copiedIndex === i + 1 ? 'Copied!' : 'Copy'}
                </button>
              </li>
            ))}
          </ul>
        )}

        <button type="button" onClick={passwordGenerator} className="rounded-lg bg-orange-500 px-4 py-2 font-bold text-slate-900 hover:bg-orange-400 transition-colors">
          Generate New {count > 1 ? 'Passwords' : 'Password'}
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
