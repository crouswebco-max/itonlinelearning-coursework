// ============================================================
// 1. VARIABLES: var, let and const with different data types
// ============================================================
console.log("--- 1. Variables ---");

// var: the old way to declare a variable (can be changed)
var city = "London";                // string

// let: a variable that can be changed later
let age = 30;                       // number
let isStudent = true;               // boolean
let middleName;                     // undefined (no value yet)

// const: a value that can't be reassigned
const pi = 3.14;                    // number with decimals
const emptyValue = null;            // null (deliberately empty)

// Changing let and var variables
age = 31;
city = "Manchester";

console.log(city, typeof city);
console.log(age, typeof age);
console.log(isStudent, typeof isStudent);
console.log(middleName, typeof middleName);
console.log(pi, typeof pi);
console.log(emptyValue);

// ============================================================
// 2. FUNCTIONS: named, anonymous and built-in
// ============================================================
console.log("--- 2. Functions ---");

// Named function: declared with a name and called by that name
function greet(name) {
    return "Hello, " + name + "!";
}
console.log(greet("Juan"));

// Anonymous function: has no name, so it's stored in a variable
const addNumbers = function (a, b) {
    return a + b;
};
console.log("5 + 7 =", addNumbers(5, 7));

// Built-in functions: come with JavaScript, ready to use
console.log(Math.round(4.6));           // rounds to the nearest whole number: 5
console.log(Math.max(3, 9, 2));         // biggest number: 9
console.log(parseInt("42") + 8);        // turns the text "42" into a number: 50
console.log("hello".toUpperCase());     // HELLO

// ============================================================
// 3. CONDITIONAL STATEMENTS: if/else and switch
// ============================================================
console.log("--- 3. Conditionals ---");

// if / else if / else: runs different code depending on a condition
let score = 72;

if (score >= 80) {
    console.log("Grade: Distinction");
} else if (score >= 60) {
    console.log("Grade: Merit");
} else if (score >= 40) {
    console.log("Grade: Pass");
} else {
    console.log("Grade: Fail");
}

// switch: compares one value against several cases
let day = "Saturday";

switch (day) {
    case "Saturday":
    case "Sunday":
        console.log(day + " is the weekend");
        break;
    case "Friday":
        console.log(day + " is nearly the weekend");
        break;
    default:
        console.log(day + " is a weekday");
}

// ============================================================
// 4. ARRAYS: lists of values of different data types
// ============================================================
console.log("--- 4. Arrays ---");

// Array of strings
const fruits = ["apple", "banana", "cherry"];

// Array of numbers
const numbers = [10, 20, 30, 40];

// Array of booleans
const answers = [true, false, true];

// Mixed array: an array can hold different types together
const mixed = ["Juan", 30, true, null];

console.log(fruits);
console.log(numbers);
console.log(answers);
console.log(mixed);

// Reading and changing items (the first item is at index 0)
console.log("First fruit:", fruits[0]);
fruits.push("mango");                   // adds an item to the end
console.log("Fruits now:", fruits, "- length", fruits.length);

// ============================================================
// 5. LOOPS: going through an array
// ============================================================
console.log("--- 5. Loops ---");

// for loop: uses an index counter
for (let i = 0; i < fruits.length; i++) {
    console.log("Fruit " + (i + 1) + ": " + fruits[i]);
}

// for...of loop: gives each item directly
let total = 0;
for (const number of numbers) {
    total = total + number;
}
console.log("Total of numbers:", total);

// forEach: calls a function once for each item
mixed.forEach(function (item, index) {
    console.log(index, item, typeof item);
});
