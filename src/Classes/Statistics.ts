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

    /**
     * Calculate the population variance of an array of numbers
     * @param numbers - Array of numbers to calculate the variance of
     * @returns The population variance value
     * @throws Error if array is empty or contains invalid numbers
     */
    static variance(numbers: number[]): number {
        this.validateNumberArray(numbers, 'numbers');
        
        const mean = this.mean(numbers);
        const squaredDifferences = numbers.map(num => Math.pow(num - mean, 2));
        const variance = squaredDifferences.reduce((sum, squaredDiff) => sum + squaredDiff, 0) / numbers.length;

        return variance;
    }

    /**
     * Calculate the standard deviation of an array of numbers
     * @param numbers - Array of numbers to calculate the standard deviation of
     * @returns The standard deviation value
     * @throws Error if array is empty or contains invalid numbers
     */
    static standardDeviation(numbers: number[]): number {
        this.validateNumberArray(numbers, 'numbers');
        
        const varianceValue = this.variance(numbers);
        const standardDev = Math.sqrt(varianceValue);

        return standardDev;
    }

    /**
     * Calculate the range (difference between max and min) of an array of numbers
     * @param numbers - Array of numbers to calculate the range of
     * @returns The range value (max - min)
     * @throws Error if array is empty or contains invalid numbers
     */
    static range(numbers: number[]): number {
        this.validateNumberArray(numbers, 'numbers');
        
        const maxValue = this.max(numbers);
        const minValue = this.min(numbers);
        const rangeValue = maxValue - minValue;

        return rangeValue;
    }

    /**
     * Calculate the percentile value of an array of numbers
     * @param numbers - Array of numbers to calculate the percentile from
     * @param p - The percentile to calculate (0-100)
     * @returns The percentile value
     * @throws Error if array is empty, contains invalid numbers, or p is out of range
     */
    static percentile(numbers: number[], p: number): number {
        this.validateNumberArray(numbers, 'numbers');
        
        if (typeof p !== 'number' || isNaN(p) || !isFinite(p)) {
            throw new Error('p must be a valid number');
        }
        if (p < 0 || p > 100) {
            throw new Error('p must be between 0 and 100');
        }
        
        // Create a copy and sort the array
        const sortedNumbers = [...numbers].sort((a, b) => a - b);
        
        // Handle edge cases
        if (p === 0) return sortedNumbers[0];
        if (p === 100) return sortedNumbers[sortedNumbers.length - 1];
        
        // Calculate the index using the nearest-rank method
        const index = (p / 100) * (sortedNumbers.length - 1);
        
        // If index is an integer, return the value at that index
        if (Number.isInteger(index)) {
            return sortedNumbers[index];
        }
        
        // Otherwise, interpolate between the two nearest values
        const lowerIndex = Math.floor(index);
        const upperIndex = Math.ceil(index);
        const weight = index - lowerIndex;
        
        const percentileValue = sortedNumbers[lowerIndex] * (1 - weight) + sortedNumbers[upperIndex] * weight;

        return percentileValue;
    }

    /**
     * Calculate the Pearson correlation coefficient between two arrays of numbers
     * @param xArray - The first array of numbers
     * @param yArray - The second array of numbers
     * @returns The Pearson correlation coefficient (-1 to 1)
     * @throws Error if arrays are empty, contain invalid numbers, or have different lengths
     */
    static correlation(xArray: number[], yArray: number[]): number {
        this.validateNumberArray(xArray, 'xArray');
        this.validateNumberArray(yArray, 'yArray');
        
        if (xArray.length !== yArray.length) {
            throw new Error(`Arrays must have the same length. xArray has ${xArray.length} elements, yArray has ${yArray.length} elements`);
        }
        
        if (xArray.length < 2) {
            throw new Error('Arrays must have at least 2 elements for correlation calculation');
        }
        
        const n = xArray.length;
        const meanX = this.mean(xArray);
        const meanY = this.mean(yArray);
        
        let numerator = 0;
        let sumXSquares = 0;
        let sumYSquares = 0;
        
        for (let i = 0; i < n; i++) {
            const xDiff = xArray[i] - meanX;
            const yDiff = yArray[i] - meanY;
            
            numerator += xDiff * yDiff;
            sumXSquares += xDiff * xDiff;
            sumYSquares += yDiff * yDiff;
        }
        
        const denominator = Math.sqrt(sumXSquares * sumYSquares);
        
        // Handle case where one variable has no variance
        if (denominator === 0) {
            return 0;
        }
        
        return numerator / denominator;
    }

    /**
     * Calculate the sample covariance between two arrays of numbers
     * @param xArray - The first array of numbers
     * @param yArray - The second array of numbers
     * @returns The sample covariance
     * @throws Error if arrays are empty, contain invalid numbers, or have different lengths
     */
    static covariance(xArray: number[], yArray: number[]): number {
        this.validateNumberArray(xArray, 'xArray');
        this.validateNumberArray(yArray, 'yArray');
        
        if (xArray.length !== yArray.length) {
            throw new Error(`Arrays must have the same length. xArray has ${xArray.length} elements, yArray has ${yArray.length} elements`);
        }
        
        if (xArray.length < 2) {
            throw new Error('Arrays must have at least 2 elements for covariance calculation');
        }
        
        const n = xArray.length;
        const meanX = this.mean(xArray);
        const meanY = this.mean(yArray);
        
        let sumProducts = 0;
        
        for (let i = 0; i < n; i++) {
            sumProducts += (xArray[i] - meanX) * (yArray[i] - meanY);
        }
        
        // Use n-1 for sample covariance (Bessel's correction)
        return sumProducts / (n - 1);
    }

    /**
     * Calculate the z-score (standard score) for a given value
     * @param value - The value to calculate the z-score for
     * @param mean - The mean of the distribution
     * @param stdDev - The standard deviation of the distribution
     * @returns The z-score
     * @throws Error if any parameter is invalid or standard deviation is zero
     */
    static zscore(value: number, mean: number, stdDev: number): number {
        if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) {
            throw new Error('value must be a valid finite number');
        }
        if (typeof mean !== 'number' || isNaN(mean) || !isFinite(mean)) {
            throw new Error('mean must be a valid finite number');
        }
        if (typeof stdDev !== 'number' || isNaN(stdDev) || !isFinite(stdDev)) {
            throw new Error('stdDev must be a valid finite number');
        }
        if (stdDev === 0) {
            throw new Error('Standard deviation cannot be zero');
        }
        if (stdDev < 0) {
            throw new Error('Standard deviation must be positive');
        }
        
        return (value - mean) / stdDev;
    }

}
