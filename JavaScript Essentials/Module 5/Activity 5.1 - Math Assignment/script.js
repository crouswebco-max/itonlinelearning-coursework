// 1. Toxin levels from the five river samples
const toxinLevels = [0.453, 1.287, 0.869, 2.154, 1.628];

// 2. Calculates the mean (average) of an array of numbers
function calculateMean(numbers) {
    // 2.3.1 Start the sum at 0
    let sum = 0;

    // 2.3.2 and 2.3.3 Add each value in the array to the sum
    for (let i = 0; i < numbers.length; i++) {
        sum = sum + numbers[i];
    }

    // 2.3.4 Divide the sum by how many values there are
    return sum / numbers.length;
}

// 3. Store the result of the function
const mean = calculateMean(toxinLevels);

// 4. Round to two decimal places: multiply by 100, round to a whole number, divide by 100
const roundedMean = Math.round(mean * 100) / 100;

// 5. Join the result onto a message that explains it
const message = "The mean toxin level of the five river samples is: " + roundedMean;

// 6. Log the message and final result to the console
console.log(message);
