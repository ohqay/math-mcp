export class Arithmetic {
    /**
     * Validates that a value is a valid number (not NaN or infinite)
     * @param value - The value to validate
     * @param paramName - The parameter name for error messages
     * @throws Error if value is not a valid finite number
     */
    static validateNumber(value, paramName) {
        if (typeof value !== 'number') {
            throw new Error(`${paramName} must be a number, received ${typeof value}`);
        }
        if (isNaN(value)) {
            throw new Error(`${paramName} cannot be NaN`);
        }
        if (!isFinite(value)) {
            throw new Error(`${paramName} must be a finite number, received ${value}`);
        }
    }
    /**
     * Validates that an array contains only valid numbers
     * @param numbers - The array to validate
     * @param paramName - The parameter name for error messages
     * @throws Error if array is empty or contains invalid numbers
     */
    static validateNumberArray(numbers, paramName) {
        if (!Array.isArray(numbers)) {
            throw new Error(`${paramName} must be an array, received ${typeof numbers}`);
        }
        if (numbers.length === 0) {
            throw new Error(`${paramName} cannot be empty`);
        }
        numbers.forEach((num, index) => {
            this.validateNumber(num, `${paramName}[${index}]`);
        });
    }
    /**
     * Add two numbers together
     * @param firstNumber - The first number
     * @param secondNumber - The second number
     * @returns sum
     * @throws Error if either number is invalid
     */
    static add(firstNumber, secondNumber) {
        this.validateNumber(firstNumber, 'firstNumber');
        this.validateNumber(secondNumber, 'secondNumber');
        const sum = firstNumber + secondNumber;
        return sum;
    }
    /**
     * Subtract one number from another
     * @param minuend - The number to subtract from
     * @param subtrahend - The number to subtract
     * @returns difference
     * @throws Error if either number is invalid
     */
    static subtract(minuend, subtrahend) {
        this.validateNumber(minuend, 'minuend');
        this.validateNumber(subtrahend, 'subtrahend');
        const difference = minuend - subtrahend;
        return difference;
    }
    /**
     * Multiply two numbers together
     * @param firstNumber - The first number
     * @param secondNumber - The second number
     * @returns product
     * @throws Error if either number is invalid
     */
    static multiply(firstNumber, secondNumber) {
        this.validateNumber(firstNumber, 'firstNumber');
        this.validateNumber(secondNumber, 'secondNumber');
        const product = firstNumber * secondNumber;
        return product;
    }
    /**
     * Divide one number by another
     * @param numerator - The number to be divided
     * @param denominator - The number to divide by
     * @returns quotient
     * @throws Error if either number is invalid or denominator is zero
     */
    static division(numerator, denominator) {
        this.validateNumber(numerator, 'numerator');
        this.validateNumber(denominator, 'denominator');
        if (denominator === 0) {
            throw new Error('Division by zero is not allowed. Denominator cannot be zero.');
        }
        const quotient = numerator / denominator;
        return quotient;
    }
    /**
     * Calculate the sum of an array of numbers
     * @param numbers - Array of numbers to sum
     * @returns sum of all numbers in the array
     * @throws Error if array is empty or contains invalid numbers
     */
    static sum(numbers) {
        this.validateNumberArray(numbers, 'numbers');
        // Use reduce to accumulate the sum, starting with 0
        const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        return sum;
    }
    /**
     * Calculate the floor of a number
     * @param number - Number to find the floor of
     * @returns floor of the number
     * @throws Error if number is invalid
     */
    static floor(number) {
        this.validateNumber(number, 'number');
        const floor = Math.floor(number);
        return floor;
    }
    /**
     * Calculate the ceil of a number
     * @param number - Number to find the ceil of
     * @returns ceil of the number
     * @throws Error if number is invalid
     */
    static ceil(number) {
        this.validateNumber(number, 'number');
        const ceil = Math.ceil(number);
        return ceil;
    }
    /**
     * Calculate the round of a number
     * @param number - Number to find the round of
     * @returns round of the number
     * @throws Error if number is invalid
     */
    static round(number) {
        this.validateNumber(number, 'number');
        const round = Math.round(number);
        return round;
    }
}
