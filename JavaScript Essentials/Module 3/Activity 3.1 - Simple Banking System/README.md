# JavaScript Banking System

A simple banking system built with an ES6 class. You can create bank accounts, deposit money, withdraw it and check the balance. It runs in the browser console and in Node.js.

## Files

| File | What it does |
|---|---|
| `bankAccount.js` | The `BankAccount` class: `accountNumber`, `accountHolder` and a private `#balance`, with `deposit()`, `withdraw()` and `checkBalance()`. Shared with `export` |
| `index.js` | The entry point. Imports the class, creates two accounts and tests every method, including a withdrawal that's too big and a negative deposit |
| `index.html` | Shows the title and loads `index.js` with `<script type="module">` |
| `package.json` | `"type": "module"` lets Node.js understand `import` and `export` |

## JavaScript concepts used

- **ES6 classes:** `class BankAccount` is a blueprint, and `new BankAccount(...)` makes each account from it.
- **Constructor:** sets up each new account. `balance = 0` is a default, so `new BankAccount("ACC-1002", "Sam")` starts with £0.
- **Methods:** `deposit()`, `withdraw()` and `checkBalance()` belong to every account.
- **Encapsulation:** `#balance` is a private field. Only code inside the class can change it, so money can only move through `deposit()` and `withdraw()`. A `get balance()` getter lets other code read it but not set it: `juanAccount.balance = 1000000` doesn't work.
- **Conditionals:** `if` statements reject amounts that aren't numbers or are £0 or less, and stop a withdrawal bigger than the balance.
- **ES6 modules:** `export class BankAccount` in one file, `import { BankAccount } from "./bankAccount.js"` in the other.
- **Template literals and console output:** messages like `` `Deposited £${amount.toFixed(2)}...` `` are logged with `console.log()`.

## Run it in the browser

Because it uses ES6 modules, the page must be served over HTTP. Double-clicking `index.html` won't work, because browsers block `import` from `file://`.

Run a local server from this folder:

```text
python3 -m http.server 8000
```

Then open `http://localhost:8000` and open the console (F12, then **Console**). You'll see the test results, and you can try the accounts yourself:

```js
juanAccount.deposit(20)
samAccount.withdraw(10)
const alex = new BankAccount("ACC-1003", "Alex", 50)
alex.checkBalance()
```

## Run it with Node.js

```text
node index.js
```

(or `npm start`). Expected output:

```text
=== Simple Banking System ===
Juan (ACC-1001) has £500.00
Sam (ACC-1002) has £0.00
Deposited £250.00 into ACC-1001. New balance: £750.00
Deposited £100.00 into ACC-1002. New balance: £100.00
Withdrew £200.00 from ACC-1001. New balance: £550.00
Withdrawal failed: Sam only has £100.00.
Deposit failed: the amount must be a number more than £0.
Juan (ACC-1001) has £550.00
Sam (ACC-1002) has £100.00
```
