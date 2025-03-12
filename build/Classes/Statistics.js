export class Statistics {
    static mean(numbers) {
        // Calculate sum and divide by the count of numbers
        const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        const mean = sum / numbers.length;
        return mean;
    }
    static median(numbers) {
        //Sort numbers
        numbers.sort();
        //Find the median index
        const medianIndex = numbers.length / 2;
        let medianValue;
        if (numbers.length % 2 !== 0) {
            //If number is odd
            medianValue = numbers[Math.floor(medianIndex)];
        }
        else {
            //If number is even
            medianValue = (numbers[medianIndex] + numbers[medianIndex - 1]) / 2;
        }
    }
    static mode(numbers) {
        const modeMap = new Map();
        //Set each entry parameter into the map and assign it the number of times it appears in the list
        numbers.forEach((value) => {
            if (modeMap.has(value)) {
                modeMap.set(value, modeMap.get(value) + 1);
            }
            else {
                modeMap.set(value, 1);
            }
        });
        //Find the max frequency in the map
        let maxFrequency = 0;
        for (const numberFrequency of modeMap.values()) {
            if (numberFrequency > maxFrequency) {
                maxFrequency = numberFrequency;
            }
        }
        const modeResult = [];
        //Find the entries with the highest frequency
        for (const [key, value] of modeMap.entries()) {
            if (value === maxFrequency) {
                modeResult.push(key);
            }
        }
        return {
            modeResult: modeResult,
            maxFrequency: maxFrequency
        };
    }
    static min(numbers) {
        const minValue = Math.min(...numbers);
        return minValue;
    }
    static max(numbers) {
        const maxValue = Math.max(...numbers);
        return maxValue;
    }
}
