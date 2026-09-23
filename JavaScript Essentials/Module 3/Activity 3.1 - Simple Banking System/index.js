// Entry point: creates some accounts and tries out each method
import { BankAccount } from "./bankAccount.js";

// Two different bank accounts
const juanAccount = new BankAccount("ACC-1001", "Juan", 500);
const samAccount = new BankAccount("ACC-1002", "Sam");

console.log("=== Simple Banking System ===");

// Checking balances
juanAccount.checkBalance();
samAccount.checkBalance();

// Depositing money
juanAccount.deposit(250);
samAccount.deposit(100);

// Withdrawing money
juanAccount.withdraw(200);

// Scenarios that should fail
samAccount.withdraw(1000);      // more than the balance
juanAccount.deposit(-50);       // negative amount

// Final balances
juanAccount.checkBalance();
samAccount.checkBalance();

// In the browser, make the class and accounts usable from the console
if (typeof window !== "undefined") {
    window.BankAccount = BankAccount;
    window.juanAccount = juanAccount;
    window.samAccount = samAccount;
    console.log("Try it: juanAccount.deposit(20), samAccount.withdraw(10), or new BankAccount(\"ACC-1003\", \"Alex\", 50)");
}
