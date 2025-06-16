export class Statistics {
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
            if (typeof num !== 'number') {
                throw new Error(`${paramName}[${index}] must be a number, received ${typeof num}`);
            }
            if (isNaN(num)) {
                throw new Error(`${paramName}[${index}] cannot be NaN`);
            }
            if (!isFinite(num)) {
                throw new Error(`${paramName}[${index}] must be a finite number, received ${num}`);
            }
        });
    }

    /**
     * Calculate the arithmetic mean (average) of an array of numbers
     * @param numbers - Array of numbers to calculate the mean of
     * @returns The arithmetic mean value
     * @throws Error if array is empty or contains invalid numbers
     */
    static mean(numbers: number[]): number {
        this.validateNumberArray(numbers, 'numbers');
        
        // Calculate sum and divide by the count of numbers
        const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        const mean = sum / numbers.length;

        return mean;
    }

    /**
     * Calculate the median (middle value) of an array of numbers
     * @param numbers - Array of numbers to calculate the median of
     * @returns The median value
     * @throws Error if array is empty or contains invalid numbers
     */
    static median(numbers: number[]): number {
        this.validateNumberArray(numbers, 'numbers');
        
        // Create a copy to avoid modifying the original array
        const sortedNumbers = [...numbers].sort((a, b) => a - b);

        // Find the median index
        const medianIndex = sortedNumbers.length / 2;

        let medianValue: number;
        if (sortedNumbers.length % 2 !== 0) {
            // If array length is odd
            medianValue = sortedNumbers[Math.floor(medianIndex)];
        } else {
            // If array length is even
            medianValue = (sortedNumbers[medianIndex] + sortedNumbers[medianIndex - 1]) / 2;
        }
        
        return medianValue;
    }

    /**
     * Calculate the mode (most frequent value(s)) of an array of numbers
     * @param numbers - Array of numbers to calculate the mode of
     * @returns The mode value(s) - a single number if one mode, or an array if multiple modes
     * @throws Error if array is empty or contains invalid numbers
     */
    static mode(numbers: number[]): number | number[] {
        this.validateNumberArray(numbers, 'numbers');
        
        const modeMap = new Map<number, number>();

        // Set each entry parameter into the map and assign it the number of times it appears in the list
        numbers.forEach((value) => {
            if (modeMap.has(value)) {
                modeMap.set(value, modeMap.get(value)! + 1);
            } else {
                modeMap.set(value, 1);
            }
        });

        // Find the max frequency in the map
        let maxFrequency = 0;
        for (const numberFrequency of modeMap.values()) {
            if (numberFrequency > maxFrequency) {
                maxFrequency = numberFrequency;
            }
        }

        const modeResult: number[] = [];
        // Find the entries with the highest frequency
        for (const [key, value] of modeMap.entries()) {
            if (value === maxFrequency) {
                modeResult.push(key);
            }
        }

        // Return single value if only one mode, otherwise return array
        return modeResult.length === 1 ? modeResult[0] : modeResult;
    }

    /**
     * Find the minimum value in an array of numbers
     * @param numbers - Array of numbers to find the minimum of
     * @returns The minimum value
     * @throws Error if array is empty or contains invalid numbers
     */
    static min(numbers: number[]): number {
        this.validateNumberArray(numbers, 'numbers');
        
        // Use reduce to avoid spread operator issues with large arrays
        const minValue = numbers.reduce((min, current) => current < min ? current : min, numbers[0]);

        return minValue;
    }

    /**
     * Find the maximum value in an array of numbers
     * @param numbers - Array of numbers to find the maximum of
     * @returns The maximum value
     * @throws Error if array is empty or contains invalid numbers
     */
    static max(numbers: number[]): number {
        this.validateNumberArray(numbers, 'numbers');
        
        // Use reduce to avoid spread operator issues with large arrays
        const maxValue = numbers.reduce((max, current) => current > max ? current : max, numbers[0]);

        return maxValue;
    }

}
