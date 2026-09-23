# Activity 5.1: Math Assignment

Five water samples from a river were tested for a toxin. This code works out the mean (average) toxin level and rounds it to two decimal places.

**Mean = Sum ÷ Count**

## Run it

```text
node script.js
```

Or open `index.html` in a browser and open the console (F12). Either way the output is:

```text
The mean toxin level of the five river samples is: 1.28
```

## How `script.js` follows the steps

The code comments are numbered to match the activity's instructions.

| Step | Code |
|---|---|
| **1. Array of five decimals** | `const toxinLevels = [0.453, 1.287, 0.869, 2.154, 1.628];` |
| **2. Named function with the array as a parameter** | `function calculateMean(numbers)` |
| **2.3.1 Sum starts at 0** | `let sum = 0;` |
| **2.3.2–2.3.3 Loop that adds the values** | `for (let i = 0; i < numbers.length; i++) { sum = sum + numbers[i]; }` |
| **2.3.4 Divide by the count** | `return sum / numbers.length;` |
| **3. Store the mean** | `const mean = calculateMean(toxinLevels);` (1.2782) |
| **4. Round with `Math.round()`** | `Math.round(mean * 100) / 100` gives 1.28 |
| **5. Join onto a message** | `"The mean toxin level ... is: " + roundedMean` |
| **6. Log it** | `console.log(message);` |

## Things to notice

- **`Math.round()` only rounds to whole numbers.** To keep two decimal places, multiply by 100 (127.82), round (128), then divide by 100 (1.28).
- **`numbers.length` is the count**, so the function still works if you add more samples to the array.
