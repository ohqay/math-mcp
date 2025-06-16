export class DataScience {
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
     * Normalize an array of numbers using min-max normalization (0-1 scale)
     * @param numbers - Array of numbers to normalize
     * @returns Array of normalized numbers between 0 and 1
     * @throws Error if array is empty or contains invalid numbers
     */
    static normalizeArray(numbers: number[]): number[] {
        this.validateNumberArray(numbers, 'numbers');
        
        // Find min and max values
        const min = Math.min(...numbers);
        const max = Math.max(...numbers);
        
        // Handle case where all values are the same
        if (min === max) {
            return new Array(numbers.length).fill(0);
        }
        
        const range = max - min;
        
        // Apply min-max normalization formula: (x - min) / (max - min)
        return numbers.map(num => (num - min) / range);
    }

    /**
     * Standardize an array of numbers using z-score standardization
     * @param numbers - Array of numbers to standardize
     * @returns Array of standardized numbers (mean=0, std=1)
     * @throws Error if array is empty or contains invalid numbers
     */
    static standardizeArray(numbers: number[]): number[] {
        this.validateNumberArray(numbers, 'numbers');
        
        if (numbers.length < 2) {
            throw new Error('Array must have at least 2 elements for standardization');
        }
        
        // Calculate mean
        const mean = numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
        
        // Calculate standard deviation
        const variance = numbers.reduce((sum, num) => sum + Math.pow(num - mean, 2), 0) / numbers.length;
        const stdDev = Math.sqrt(variance);
        
        // Handle case where standard deviation is zero
        if (stdDev === 0) {
            return new Array(numbers.length).fill(0);
        }
        
        // Apply z-score standardization formula: (x - mean) / stdDev
        return numbers.map(num => (num - mean) / stdDev);
    }
}