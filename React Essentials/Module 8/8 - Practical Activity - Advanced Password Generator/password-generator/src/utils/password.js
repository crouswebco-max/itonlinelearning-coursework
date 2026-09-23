// Shared password logic: the character sets, the generator and the strength score

export const CHARACTER_SETS = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  symbols: '!@#$%^&*()-_=+[]{};:,.?/~',
};

// Characters that are easy to mix up when reading a password: i, l, 1, L, I, o, O, 0 and |
const SIMILAR_CHARACTERS = /[ilLI1oO0|]/g;

export const MIN_LENGTH = 6;
export const MAX_LENGTH = 100;

// A random whole number from 0 to max - 1, from the browser's secure random number generator.
// Math.random() isn't designed for security, so it's avoided for passwords
export function randomIndex(max) {
  const values = new Uint32Array(1);
  crypto.getRandomValues(values);
  return values[0] % max;
}

// Removes similar-looking characters from a set, if asked to
export function prepareSet(set, excludeSimilar) {
  return excludeSimilar ? set.replace(SIMILAR_CHARACTERS, '') : set;
}

// The character sets for the chosen options, ready to use. Returns an array of strings
export function buildSets({ lowercase = true, uppercase = true, numbers = false, symbols = false, excludeSimilar = false }) {
  const sets = [];
  if (lowercase) sets.push(CHARACTER_SETS.lowercase);
  if (uppercase) sets.push(CHARACTER_SETS.uppercase);
  if (numbers) sets.push(CHARACTER_SETS.numbers);
  if (symbols) sets.push(CHARACTER_SETS.symbols);
  return sets.map((set) => prepareSet(set, excludeSimilar));
}

// How many different characters the chosen sets can produce
export function poolSize(sets) {
  return new Set(sets.join('')).size;
}

// Builds a password with at least one character from EVERY chosen set, then shuffles it
// so those guaranteed characters aren't always at the start
export function createPassword(length, sets) {
  const pool = sets.join('');
  const characters = sets.map((set) => set[randomIndex(set.length)]);

  while (characters.length < length) {
    characters.push(pool[randomIndex(pool.length)]);
  }

  // Fisher–Yates shuffle
  for (let i = characters.length - 1; i > 0; i--) {
    const j = randomIndex(i + 1);
    [characters[i], characters[j]] = [characters[j], characters[i]];
  }

  return characters.join('');
}

// How hard the password would be to guess, from its length and how many different characters it could use.
// "Bits of entropy" = length × log2(pool size): every extra bit doubles the number of guesses needed
export function getStrength(length, poolSize) {
  if (poolSize === 0) {
    return { bits: 0, label: 'None', level: 0 };
  }
  const bits = Math.round(length * Math.log2(poolSize));
  if (bits < 45) return { bits, label: 'Weak', level: 1 };
  if (bits < 65) return { bits, label: 'Fair', level: 2 };
  if (bits < 90) return { bits, label: 'Strong', level: 3 };
  return { bits, label: 'Very strong', level: 4 };
}
