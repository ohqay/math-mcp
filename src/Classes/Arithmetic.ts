export class Arithmetic {
    /**
     * Validates that a value is a valid number (not NaN or infinite)
     * @param value - The value to validate
     * @param paramName - The parameter name for error messages
     * @throws Error if value is not a valid finite number
     */
    private static validateNumber(value: number, paramName: string): void {
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
    private static validateNumberArray(numbers: number[], paramName: string): void {
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
     * Validates that a value is a valid integer
     * @param value - The value to validate
     * @param paramName - The parameter name for error messages
     * @throws Error if value is not a valid integer
     */
    private static validateInteger(value: number, paramName: string): void {
        this.validateNumber(value, paramName);
        if (!Number.isInteger(value)) {
            throw new Error(`${paramName} must be an integer, received ${value}`);
        }
    }

    /**
     * Add two numbers together
     * @param firstNumber - The first number 
     * @param secondNumber - The second number
     * @returns sum
     * @throws Error if either number is invalid
     */
    static add(firstNumber: number, secondNumber: number): number {
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
    static subtract(minuend: number, subtrahend: number): number {
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
    static multiply(firstNumber: number, secondNumber: number): number {
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
    static division(numerator: number, denominator: number): number {
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
    static sum(numbers: number[]): number {
        this.validateNumberArray(numbers, 'numbers');
        
        // Use reduce to accumulate the sum, starting with 0
        const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        return sum;
    }

    /**
     * Validates that a decimal places value is a valid non-negative integer within range
     * @param decimalPlaces - The decimal places value to validate
     * @param paramName - The parameter name for error messages
     * @throws Error if decimal places is not a valid non-negative integer (0-15 range)
     */
    private static validateDecimalPlaces(decimalPlaces: number, paramName: string): void {
        if (typeof decimalPlaces !== 'number') {
            throw new Error(`${paramName} must be a number, received ${typeof decimalPlaces}`);
        }
        if (isNaN(decimalPlaces)) {
            throw new Error(`${paramName} cannot be NaN`);
        }
        if (!Number.isInteger(decimalPlaces)) {
            throw new Error(`${paramName} must be an integer, received ${decimalPlaces}`);
        }
        if (decimalPlaces < 0) {
            throw new Error(`${paramName} must be non-negative, received ${decimalPlaces}`);
        }
        if (decimalPlaces > 15) {
            throw new Error(`${paramName} must be 15 or less, received ${decimalPlaces}`);
        }
    }

    /**
     * Calculate the floor of a number
     * @param number - Number to find the floor of
     * @returns floor of the number
     * @throws Error if number is invalid
     */
    static floor(number: number): number {
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
    static ceil(number: number): number {
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
    static round(number: number): number {
        this.validateNumber(number, 'number');
        
        const round = Math.round(number);
        return round;
    }

    /**
     * Raise a number to a power
     * @param base - The base number
     * @param exponent - The exponent to raise the base to
     * @returns base raised to the power of exponent
     * @throws Error if either number is invalid
     */
    static power(base: number, exponent: number): number {
        this.validateNumber(base, 'base');
        this.validateNumber(exponent, 'exponent');
        
        const result = Math.pow(base, exponent);
        return result;
    }

    /**
     * Calculate the square root of a number
     * @param number - Number to find the square root of
     * @returns square root of the number
     * @throws Error if number is invalid or negative
     */
    static sqrt(number: number): number {
        this.validateNumber(number, 'number');
        
        if (number < 0) {
            throw new Error('Cannot calculate square root of negative number');
        }
        
        const result = Math.sqrt(number);
        return result;
    }

    /**
     * Calculate the absolute value of a number
     * @param number - Number to find the absolute value of
     * @returns absolute value of the number
     * @throws Error if number is invalid
     */
    static abs(number: number): number {
        this.validateNumber(number, 'number');
        
        const result = Math.abs(number);
        return result;
    }

    /**
     * Round a number to a specified number of decimal places
     * @param number - Number to round
     * @param decimalPlaces - Number of decimal places to round to (0-15)
     * @returns rounded number to specified decimal places
     * @throws Error if number or decimalPlaces is invalid
     */
    static roundToPrecision(number: number, decimalPlaces: number): number {
        this.validateNumber(number, 'number');
        this.validateDecimalPlaces(decimalPlaces, 'decimalPlaces');
        
        const multiplier = Math.pow(10, decimalPlaces);
        const rounded = Math.round(number * multiplier) / multiplier;
        return rounded;
    }

    /**
     * Floor a number to a specified number of decimal places
     * @param number - Number to floor
     * @param decimalPlaces - Number of decimal places to floor to (0-15)
     * @returns floored number to specified decimal places
     * @throws Error if number or decimalPlaces is invalid
     */
    static floorToPrecision(number: number, decimalPlaces: number): number {
        this.validateNumber(number, 'number');
        this.validateDecimalPlaces(decimalPlaces, 'decimalPlaces');
        
        const multiplier = Math.pow(10, decimalPlaces);
        const floored = Math.floor(number * multiplier) / multiplier;
        return floored;
    }

    /**
     * Ceil a number to a specified number of decimal places
     * @param number - Number to ceil
     * @param decimalPlaces - Number of decimal places to ceil to (0-15)
     * @returns ceiled number to specified decimal places
     * @throws Error if number or decimalPlaces is invalid
     */
    static ceilToPrecision(number: number, decimalPlaces: number): number {
        this.validateNumber(number, 'number');
        this.validateDecimalPlaces(decimalPlaces, 'decimalPlaces');
        
        const multiplier = Math.pow(10, decimalPlaces);
        const ceiled = Math.ceil(number * multiplier) / multiplier;
        return ceiled;
    }
}
