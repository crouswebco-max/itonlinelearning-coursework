import { useState } from 'react';

// Picks a random whole number from 0 to max - 1.
// crypto.getRandomValues is the browser's secure random number generator, which suits passwords better than Math.random()
const randomIndex = (max) => {
  const values = new Uint32Array(1);
  crypto.getRandomValues(values);
  return values[0] % max;
};

function PasswordGenerator() {
  // Task 3: the four state variables
  const [length, setLength] = useState(10);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const [copied, setCopied] = useState(false);

  // Bonus 1: build a random password from the current settings
  const generatePassword = () => {
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (numberAllowed) characters += '0123456789';
    if (characterAllowed) characters += '!@#$%^&*()-_=+[]{};:,.?/~';

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += characters[randomIndex(characters.length)];
    }
    setPassword(newPassword);
    setCopied(false);
  };

  // Bonus 2: copy the password to the clipboard
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

  // Task 4: the UI, styled with Tailwind
  return (
    <div className="w-full max-w-md mx-auto rounded-2xl bg-slate-800 px-6 py-8 shadow-xl text-orange-400">
      <h1 className="text-2xl font-bold text-white text-center mb-6">Password Generator</h1>

      <div className="flex rounded-lg overflow-hidden mb-5">
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

      <div className="flex flex-col gap-4 text-sm">
        {/* The length slider: bound to the length state */}
        <div className="flex items-center gap-3">
          <input
            id="length"
            type="range"
            min={6}
            max={100}
            value={length}
            onChange={(event) => setLength(Number(event.target.value))}
            className="w-full cursor-pointer accent-orange-400"
          />
          <label htmlFor="length" className="shrink-0 w-24 text-right">
            Length: {length}
          </label>
        </div>

        {/* The checkboxes: bound to their state */}
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={numberAllowed} onChange={() => setNumberAllowed((previous) => !previous)} className="h-4 w-4 accent-orange-400" />
            Numbers
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={characterAllowed}
              onChange={() => setCharacterAllowed((previous) => !previous)}
              className="h-4 w-4 accent-orange-400"
            />
            Special characters
          </label>
        </div>

        <button
          type="button"
          onClick={generatePassword}
          className="mt-2 rounded-lg bg-orange-500 px-4 py-2 font-bold text-slate-900 hover:bg-orange-400 transition-colors"
        >
          Generate
        </button>
      </div>
    </div>
  );
}

export default PasswordGenerator;
