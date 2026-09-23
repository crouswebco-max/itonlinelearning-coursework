// A bank account with a number, an owner and a balance
export class BankAccount {
    // Private field: the # means only code inside this class can change the balance,
    // so money can only go in or out through deposit() and withdraw()
    #balance;

    constructor(accountNumber, accountHolder, balance = 0) {
        this.accountNumber = accountNumber;
        this.accountHolder = accountHolder;
        this.#balance = balance;
    }

    // Getter: lets other code READ the balance (account.balance) but not set it
    get balance() {
        return this.#balance;
    }

    // Adds money to the account
    deposit(amount) {
        if (typeof amount !== "number" || amount <= 0) {
            console.log("Deposit failed: the amount must be a number more than £0.");
            return false;
        }
        this.#balance += amount;
        console.log(`Deposited £${amount.toFixed(2)} into ${this.accountNumber}. New balance: £${this.#balance.toFixed(2)}`);
        return true;
    }

    // Takes money out, as long as there is enough in the account
    withdraw(amount) {
        if (typeof amount !== "number" || amount <= 0) {
            console.log("Withdrawal failed: the amount must be a number more than £0.");
            return false;
        }
        if (amount > this.#balance) {
            console.log(`Withdrawal failed: ${this.accountHolder} only has £${this.#balance.toFixed(2)}.`);
            return false;
        }
        this.#balance -= amount;
        console.log(`Withdrew £${amount.toFixed(2)} from ${this.accountNumber}. New balance: £${this.#balance.toFixed(2)}`);
        return true;
    }

    // Shows and returns the current balance
    checkBalance() {
        console.log(`${this.accountHolder} (${this.accountNumber}) has £${this.#balance.toFixed(2)}`);
        return this.#balance;
    }
}
