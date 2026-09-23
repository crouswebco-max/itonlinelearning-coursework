# Activity 7.1: Basic Calculator

A calculator that adds, subtracts, multiplies and divides two numbers. Everything is in one file: the CSS is in `<style>` in the `<head>`, and the JavaScript is in `<script>` at the bottom of the `<body>`. Open `index.html` in a browser.

## How `calculate(operation)` works

| Step | Code |
|---|---|
| **5.1 Get and parse the inputs** | `parseFloat(document.getElementById("number1").value)`, and the same for `number2` |
| **5.2 Check they're numbers** | `if (isNaN(number1) \|\| isNaN(number2))` shows "Please enter two valid numbers." |
| **5.3 Do the operation** | A `switch` on `operation` with `"add"`, `"subtract"`, `"multiply"` and `"divide"` cases. Each builds the answer with a template literal, e.g. `` `${number1} + ${number2} = ${number1 + number2}` `` |
| **5.4 Divide by zero** | In the `"divide"` case, `if (number2 === 0)` shows "You can't divide by zero." |
| **5.5 Show the result** | `document.getElementById("result").innerText = result;` |
| **6. Buttons** | Each button calls it with `onclick`, e.g. `onclick="calculate('add')"` |

## Example results

| Input | Result |
|---|---|
| 12 + 4 | `12 + 4 = 16` |
| 2.5 × 4 | `2.5 × 4 = 10` |
| 10 ÷ 4 | `10 ÷ 4 = 2.5` |
| 10 ÷ 0 | `You can't divide by zero.` |
| (empty) + 4 | `Please enter two valid numbers.` |

## Things to notice

- **`0.1 + 0.2` shows `0.30000000000000004`.** Computers store decimals in binary, so some can't be stored exactly. It happens in every JavaScript program, not just this one.
- **`parseFloat` turns text into a number.** Input values are always text, so without it `"12" + "4"` would give `"124"`.
