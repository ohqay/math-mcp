/**
 * Math MCP Server
 *
 * This file implements a Model Context Protocol (MCP) server that provides
 * various mathematical operations as tools. Each tool accepts numeric inputs
 * and returns the calculated result.
 */
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { Arithmetic } from "./Classes/Arithmetic.js";
import { Statistics } from "./Classes/Statistics.js";
import { ExpressionEvaluator } from "./Classes/ExpressionEvaluator.js";
import { DataScience } from "./Classes/DataScience.js";
// Initialize the MCP server with name and version
const mathServer = new McpServer({
    name: "math",
    version: "0.1.1"
});
/**
 * Addition operation
 * Adds two numbers and returns their sum
 */
mathServer.tool("add", "Performs addition of two numbers using standard arithmetic. Returns the sum of the first and second number.", {
    firstNumber: z.number().describe("The first addend (number to be added)"),
    secondNumber: z.number().describe("The second addend (number to be added)")
}, async ({ firstNumber, secondNumber }) => {
    try {
        const value = Arithmetic.add(firstNumber, secondNumber);
        return {
            content: [{
                    type: "text",
                    text: `${value}`
                }]
        };
    }
    catch (error) {
        return {
            content: [{
                    type: "text",
                    text: `Error: ${error instanceof Error ? error.message : 'An unexpected error occurred during addition.'}`
                }]
        };
    }
});
/**
 * Subtraction operation
 * Subtracts the second number from the first number
 */
mathServer.tool("subtract", "Performs subtraction by removing the second number from the first number. Returns the difference (minuend - subtrahend).", {
    minuend: z.number().describe("The number to subtract from (minuend)"),
    subtrahend: z.number().describe("The number being subtracted (subtrahend)")
}, async ({ minuend, subtrahend }) => {
    try {
        const value = Arithmetic.subtract(minuend, subtrahend);
        return {
            content: [{
                    type: "text",
                    text: `${value}`
                }]
        };
    }
    catch (error) {
        return {
            content: [{
                    type: "text",
                    text: `Error: ${error instanceof Error ? error.message : 'An unexpected error occurred during subtraction.'}`
                }]
        };
    }
});
/**
 * Multiplication operation
 * Multiplies two numbers together
 */
mathServer.tool("multiply", "Performs multiplication of two numbers using standard arithmetic. Returns the product of the first and second number.", {
    firstNumber: z.number().describe("The first multiplicand (number to be multiplied)"),
    secondNumber: z.number().describe("The second multiplicand (number to be multiplied)")
}, async ({ firstNumber, secondNumber }) => {
    try {
        const value = Arithmetic.multiply(firstNumber, secondNumber);
        return {
            content: [{
                    type: "text",
                    text: `${value}`
                }]
        };
    }
    catch (error) {
        return {
            content: [{
                    type: "text",
                    text: `Error: ${error instanceof Error ? error.message : 'An unexpected error occurred during multiplication.'}`
                }]
        };
    }
});
/**
 * Division operation
 * Divides the first number by the second number
 */
mathServer.tool("division", "Performs division by dividing the first number by the second number. Returns the quotient (numerator ÷ denominator). Handles division by zero with appropriate error.", {
    numerator: z.number().describe("The number being divided (numerator)"),
    denominator: z.number().describe("The number to divide by (denominator, must not be zero)")
}, async ({ numerator, denominator }) => {
    try {
        const value = Arithmetic.division(numerator, denominator);
        return {
            content: [{
                    type: "text",
                    text: `${value}`
                }]
        };
    }
    catch (error) {
        return {
            content: [{
                    type: "text",
                    text: `Error: ${error instanceof Error ? error.message : 'An unexpected error occurred during division.'}`
                }]
        };
    }
});
/**
 * Sum operation
 * Calculates the sum of an array of numbers
 */
mathServer.tool("sum", "Calculates the sum of multiple numbers by adding all values in the array. Returns the total sum of all elements.", {
    numbers: z.array(z.number()).min(1).describe("Array of numbers to sum (must contain at least 1 element)")
}, async ({ numbers }) => {
    try {
        const value = Arithmetic.sum(numbers);
        return {
            content: [{
                    type: "text",
                    text: `${value}`
                }]
        };
    }
    catch (error) {
        return {
            content: [{
                    type: "text",
                    text: `Error: ${error instanceof Error ? error.message : 'An unexpected error occurred during sum calculation.'}`
                }]
        };
    }
});
/**
 * Mean operation
 * Calculates the arithmetic mean of an array of numbers
 */
mathServer.tool("mean", "Calculates the arithmetic mean (average) of a dataset by summing all values and dividing by the count. Formula: (sum of all values) / (number of values).", {
    numbers: z.array(z.number()).min(1).describe("Array of numbers to calculate the mean of (must contain at least 1 element)")
}, async ({ numbers }) => {
    try {
        const value = Statistics.mean(numbers);
        return {
            content: [{
                    type: "text",
                    text: `${value}`
                }]
        };
    }
    catch (error) {
        return {
            content: [{
                    type: "text",
                    text: `Error: ${error instanceof Error ? error.message : 'An unexpected error occurred during mean calculation.'}`
                }]
        };
    }
});
/**
 * Median operation
 * Calculates the median of an array of numbers
 */
mathServer.tool("median", "Calculates the median (middle value) of a dataset. For odd-length arrays, returns the middle value. For even-length arrays, returns the average of the two middle values.", {
    numbers: z.array(z.number()).min(1).describe("Array of numbers to calculate the median of (must contain at least 1 element)")
}, async ({ numbers }) => {
    try {
        const value = Statistics.median(numbers);
        return {
            content: [{
                    type: "text",
                    text: `${value}`
                }]
        };
    }
    catch (error) {
        return {
            content: [{
                    type: "text",
                    text: `Error: ${error instanceof Error ? error.message : 'An unexpected error occurred during median calculation.'}`
                }]
        };
    }
});
/**
 * Mode operation
 * Finds the most common number in an array of numbers
 */
mathServer.tool("mode", "Finds the most frequently occurring value(s) in a dataset. Returns a single number if one mode exists, or an array of numbers if multiple values tie for highest frequency.", {
    numbers: z.array(z.number()).min(1).describe("Array of numbers to find the mode of (must contain at least 1 element)")
}, async ({ numbers }) => {
    try {
        const value = Statistics.mode(numbers);
        return {
            content: [{
                    type: "text",
                    text: `${Array.isArray(value) ? value.join(', ') : value}`
                }]
        };
    }
    catch (error) {
        return {
            content: [{
                    type: "text",
                    text: `Error: ${error instanceof Error ? error.message : 'An unexpected error occurred during mode calculation.'}`
                }]
        };
    }
});
/**
 * Minimum operation
 * Finds the smallest number in an array
 */
mathServer.tool("min", "Finds the smallest value in a dataset. Efficiently determines the minimum value without sorting the entire array.", {
    numbers: z.array(z.number()).min(1).describe("Array of numbers to find the minimum of (must contain at least 1 element)")
}, async ({ numbers }) => {
    try {
        const value = Statistics.min(numbers);
        return {
            content: [{
                    type: "text",
                    text: `${value}`
                }]
        };
    }
    catch (error) {
        return {
            content: [{
                    type: "text",
                    text: `Error: ${error instanceof Error ? error.message : 'An unexpected error occurred during minimum calculation.'}`
                }]
        };
    }
});
/**
 * Maximum operation
 * Finds the largest number in an array
 */
mathServer.tool("max", "Finds the largest value in a dataset. Efficiently determines the maximum value without sorting the entire array.", {
    numbers: z.array(z.number()).min(1).describe("Array of numbers to find the maximum of (must contain at least 1 element)")
}, async ({ numbers }) => {
    try {
        const value = Statistics.max(numbers);
        return {
            content: [{
                    type: "text",
                    text: `${value}`
                }]
        };
    }
    catch (error) {
        return {
            content: [{
                    type: "text",
                    text: `Error: ${error instanceof Error ? error.message : 'An unexpected error occurred during maximum calculation.'}`
                }]
        };
    }
});
/**
 * Variance operation
 * Calculates the population variance of an array of numbers
 */
mathServer.tool("variance", "Calculates the population variance of a dataset, measuring how spread out the data points are from the mean. Uses the formula: Σ(x - μ)² / N where μ is the mean and N is the population size.", {
    numbers: z.array(z.number()).min(1).describe("Array of numbers to calculate the population variance of (must contain at least 1 element)")
}, async ({ numbers }) => {
    try {
        const value = Statistics.variance(numbers);
        return {
            content: [{
                    type: "text",
                    text: `${value}`
                }]
        };
    }
    catch (error) {
        return {
            content: [{
                    type: "text",
                    text: `Error: ${error instanceof Error ? error.message : 'An unexpected error occurred during variance calculation.'}`
                }]
        };
    }
});
/**
 * Standard deviation operation
 * Calculates the standard deviation of an array of numbers
 */
mathServer.tool("standardDeviation", "Calculates the population standard deviation of a dataset, representing the average distance of data points from the mean. Computed as the square root of the population variance.", {
    numbers: z.array(z.number()).min(1).describe("Array of numbers to calculate the population standard deviation of (must contain at least 1 element)")
}, async ({ numbers }) => {
    try {
        const value = Statistics.standardDeviation(numbers);
        return {
            content: [{
                    type: "text",
                    text: `${value}`
                }]
        };
    }
    catch (error) {
        return {
            content: [{
                    type: "text",
                    text: `Error: ${error instanceof Error ? error.message : 'An unexpected error occurred during standard deviation calculation.'}`
                }]
        };
    }
});
/**
 * Range operation
 * Calculates the range (max - min) of an array of numbers
 */
mathServer.tool("range", "Calculates the range of a dataset, which is the difference between the maximum and minimum values. Formula: max - min. Provides a simple measure of data spread.", {
    numbers: z.array(z.number()).min(1).describe("Array of numbers to calculate the range of (must contain at least 1 element)")
}, async ({ numbers }) => {
    try {
        const value = Statistics.range(numbers);
        return {
            content: [{
                    type: "text",
                    text: `${value}`
                }]
        };
    }
    catch (error) {
        return {
            content: [{
                    type: "text",
                    text: `Error: ${error instanceof Error ? error.message : 'An unexpected error occurred during range calculation.'}`
                }]
        };
    }
});
/**
 * Percentile operation
 * Calculates the percentile value of an array of numbers
 */
mathServer.tool("percentile", "Calculates the value below which a given percentage of data points fall using the nearest-rank method with linear interpolation. Useful for understanding data distribution and identifying outliers.", {
    numbers: z.array(z.number()).min(1).describe("Array of numbers to calculate the percentile from (must contain at least 1 element)"),
    p: z.number().min(0).max(100).describe("The percentile to calculate (0-100, where 50 is the median)")
}, async ({ numbers, p }) => {
    try {
        const value = Statistics.percentile(numbers, p);
        return {
            content: [{
                    type: "text",
                    text: `${value}`
                }]
        };
    }
    catch (error) {
        return {
            content: [{
                    type: "text",
                    text: `Error: ${error instanceof Error ? error.message : 'An unexpected error occurred during percentile calculation.'}`
                }]
        };
    }
});
/**
 * Floor operation
 * Rounds a number down to the nearest integer
 */
mathServer.tool("floor", "Rounds a number down to the nearest integer using the mathematical floor function. Always rounds toward negative infinity (e.g., 2.7 → 2, -2.3 → -3).", {
    number: z.number().describe("The number to round down to the nearest integer"),
}, async ({ number }) => {
    try {
        const value = Arithmetic.floor(number);
        return {
            content: [{
                    type: "text",
                    text: `${value}`
                }]
        };
    }
    catch (error) {
        return {
            content: [{
                    type: "text",
                    text: `Error: ${error instanceof Error ? error.message : 'An unexpected error occurred during floor operation.'}`
                }]
        };
    }
});
/**
 * Ceiling operation
 * Rounds a number up to the nearest integer
 */
mathServer.tool("ceiling", "Rounds a number up to the nearest integer using the mathematical ceiling function. Always rounds toward positive infinity (e.g., 2.1 → 3, -2.7 → -2).", {
    number: z.number().describe("The number to round up to the nearest integer"),
}, async ({ number }) => {
    try {
        const value = Arithmetic.ceil(number);
        return {
            content: [{
                    type: "text",
                    text: `${value}`
                }]
        };
    }
    catch (error) {
        return {
            content: [{
                    type: "text",
                    text: `Error: ${error instanceof Error ? error.message : 'An unexpected error occurred during ceiling operation.'}`
                }]
        };
    }
});
/**
 * Round operation
 * Rounds a number to the nearest integer
 */
mathServer.tool("round", "Rounds a number to the nearest integer using standard rounding rules. Values with .5 decimal are rounded away from zero (e.g., 2.5 → 3, -2.5 → -3).", {
    number: z.number().describe("The number to round to the nearest integer"),
}, async ({ number }) => {
    try {
        const value = Arithmetic.round(number);
        return {
            content: [{
                    type: "text",
                    text: `${value}`
                }]
        };
    }
    catch (error) {
        return {
            content: [{
                    type: "text",
                    text: `Error: ${error instanceof Error ? error.message : 'An unexpected error occurred during rounding operation.'}`
                }]
        };
    }
});
/**
 * Round to precision operation
 * Rounds a number to a specified number of decimal places
 */
mathServer.tool("roundToPrecision", "Rounds a number to a specified number of decimal places using standard rounding rules. Useful for controlling precision in calculations and display formatting.", {
    number: z.number().describe("The number to round"),
    decimalPlaces: z.number().int().min(0).max(15).describe("The number of decimal places to round to (0-15, where 0 rounds to integer)")
}, async ({ number, decimalPlaces }) => {
    try {
        const value = Arithmetic.roundToPrecision(number, decimalPlaces);
        return {
            content: [{
                    type: "text",
                    text: `${value}`
                }]
        };
    }
    catch (error) {
        return {
            content: [{
                    type: "text",
                    text: `Error: ${error instanceof Error ? error.message : 'An unexpected error occurred during precision rounding.'}`
                }]
        };
    }
});
/**
 * Floor to precision operation
 * Floors a number to a specified number of decimal places
 */
mathServer.tool("floorToPrecision", "Floors a number to a specified number of decimal places, always rounding down toward negative infinity at the specified precision level.", {
    number: z.number().describe("The number to floor"),
    decimalPlaces: z.number().int().min(0).max(15).describe("The number of decimal places to floor to (0-15, where 0 floors to integer)")
}, async ({ number, decimalPlaces }) => {
    try {
        const value = Arithmetic.floorToPrecision(number, decimalPlaces);
        return {
            content: [{
                    type: "text",
                    text: `${value}`
                }]
        };
    }
    catch (error) {
        return {
            content: [{
                    type: "text",
                    text: `Error: ${error instanceof Error ? error.message : 'An unexpected error occurred during precision floor operation.'}`
                }]
        };
    }
});
/**
 * Ceil to precision operation
 * Ceils a number to a specified number of decimal places
 */
mathServer.tool("ceilToPrecision", "Ceils a number to a specified number of decimal places, always rounding up toward positive infinity at the specified precision level.", {
    number: z.number().describe("The number to ceil"),
    decimalPlaces: z.number().int().min(0).max(15).describe("The number of decimal places to ceil to (0-15, where 0 ceils to integer)")
}, async ({ number, decimalPlaces }) => {
    try {
        const value = Arithmetic.ceilToPrecision(number, decimalPlaces);
        return {
            content: [{
                    type: "text",
                    text: `${value}`
                }]
        };
    }
    catch (error) {
        return {
            content: [{
                    type: "text",
                    text: `Error: ${error instanceof Error ? error.message : 'An unexpected error occurred during precision ceiling operation.'}`
                }]
        };
    }
});
/**
 * Power operation
 * Raises a base number to the power of an exponent
 */
mathServer.tool("power", "Calculates exponentiation by raising a base number to the power of an exponent. Formula: base^exponent. Handles integer, fractional, and negative exponents.", {
    base: z.number().describe("The base number to be raised to a power"),
    exponent: z.number().describe("The exponent (power) to raise the base to")
}, async ({ base, exponent }) => {
    try {
        const value = Arithmetic.power(base, exponent);
        return {
            content: [{
                    type: "text",
                    text: `${value}`
                }]
        };
    }
    catch (error) {
        return {
            content: [{
                    type: "text",
                    text: `Error: ${error instanceof Error ? error.message : 'An unexpected error occurred during power operation.'}`
                }]
        };
    }
});
/**
 * Square root operation
 * Calculates the square root of a number
 */
mathServer.tool("sqrt", "Calculates the square root of a number, finding the value that when multiplied by itself equals the original number. Returns NaN for negative inputs.", {
    number: z.number().describe("The number to find the square root of (should be non-negative for real results)")
}, async ({ number }) => {
    try {
        const value = Arithmetic.sqrt(number);
        return {
            content: [{
                    type: "text",
                    text: `${value}`
                }]
        };
    }
    catch (error) {
        return {
            content: [{
                    type: "text",
                    text: `Error: ${error instanceof Error ? error.message : 'An unexpected error occurred during square root calculation.'}`
                }]
        };
    }
});
/**
 * Absolute value operation
 * Calculates the absolute value of a number
 */
mathServer.tool("abs", "Calculates the absolute value of a number, returning the non-negative magnitude without regard to sign. Formula: |x| where |5| = 5 and |-5| = 5.", {
    number: z.number().describe("The number to find the absolute value of")
}, async ({ number }) => {
    try {
        const value = Arithmetic.abs(number);
        return {
            content: [{
                    type: "text",
                    text: `${value}`
                }]
        };
    }
    catch (error) {
        return {
            content: [{
                    type: "text",
                    text: `Error: ${error instanceof Error ? error.message : 'An unexpected error occurred during absolute value calculation.'}`
                }]
        };
    }
});
/**
 * GCD operation
 * Calculates the greatest common divisor of two integers using Euclidean algorithm
 */
mathServer.tool("gcd", "Calculates the greatest common divisor (GCD) of two integers using the Euclidean algorithm. Returns the largest positive integer that divides both numbers without remainder.", {
    a: z.number().int().describe("The first integer"),
    b: z.number().int().describe("The second integer")
}, async ({ a, b }) => {
    try {
        const value = Arithmetic.gcd(a, b);
        return {
            content: [{
                    type: "text",
                    text: `${value}`
                }]
        };
    }
    catch (error) {
        return {
            content: [{
                    type: "text",
                    text: `Error: ${error instanceof Error ? error.message : 'An unexpected error occurred during GCD calculation.'}`
                }]
        };
    }
});
/**
 * LCM operation
 * Calculates the least common multiple of two integers
 */
mathServer.tool("lcm", "Calculates the least common multiple (LCM) of two integers, finding the smallest positive integer that is divisible by both numbers. Formula: LCM(a,b) = |a*b| / GCD(a,b).", {
    a: z.number().int().describe("The first integer"),
    b: z.number().int().describe("The second integer")
}, async ({ a, b }) => {
    try {
        const value = Arithmetic.lcm(a, b);
        return {
            content: [{
                    type: "text",
                    text: `${value}`
                }]
        };
    }
    catch (error) {
        return {
            content: [{
                    type: "text",
                    text: `Error: ${error instanceof Error ? error.message : 'An unexpected error occurred during LCM calculation.'}`
                }]
        };
    }
});
/**
 * Factorial operation
 * Calculates the factorial of a non-negative integer
 */
mathServer.tool("factorial", "Calculates the factorial of a non-negative integer, computing the product of all positive integers less than or equal to n. Formula: n! = n × (n-1) × ... × 2 × 1, where 0! = 1.", {
    n: z.number().int().min(0).describe("The non-negative integer to calculate factorial of (must be ≥ 0)")
}, async ({ n }) => {
    try {
        const value = Arithmetic.factorial(n);
        return {
            content: [{
                    type: "text",
                    text: `${value}`
                }]
        };
    }
    catch (error) {
        return {
            content: [{
                    type: "text",
                    text: `Error: ${error instanceof Error ? error.message : 'An unexpected error occurred during factorial calculation.'}`
                }]
        };
    }
});
/**
 * Expression evaluation operation
 * Evaluates complex mathematical expressions as strings
 */
mathServer.tool("evaluate", "Evaluates complex mathematical expressions from strings with support for arithmetic operators (+, -, *, /, ^), mathematical functions (sin, cos, sqrt, log, etc.), statistical functions (mean, median, etc.), and constants (pi, e). Example: 'sin(pi/2) + sqrt(16) * 2' or 'mean([1,2,3,4,5]) + variance([10,20,30])'.", {
    expression: z.string().describe("The mathematical expression to evaluate as a string (supports operators, functions, constants, and arrays)")
}, async ({ expression }) => {
    try {
        const value = ExpressionEvaluator.evaluate(expression);
        return {
            content: [{
                    type: "text",
                    text: `${value}`
                }]
        };
    }
    catch (error) {
        // Return error message instead of throwing to provide better user experience
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return {
            content: [{
                    type: "text",
                    text: `Error: ${errorMessage}`
                }]
        };
    }
});
/**
 * Correlation operation
 * Calculates the Pearson correlation coefficient between two arrays of numbers
 */
mathServer.tool("correlation", "Calculates the Pearson correlation coefficient between two datasets, measuring the strength and direction of their linear relationship. Returns a value between -1 and 1, where -1 indicates perfect negative correlation, 0 indicates no linear correlation, and 1 indicates perfect positive correlation.", {
    xArray: z.array(z.number()).min(2).describe("The first array of numbers (must have at least 2 elements)"),
    yArray: z.array(z.number()).min(2).describe("The second array of numbers (must have at least 2 elements and same length as xArray)")
}, async ({ xArray, yArray }) => {
    try {
        const value = Statistics.correlation(xArray, yArray);
        return {
            content: [{
                    type: "text",
                    text: `${value}`
                }]
        };
    }
    catch (error) {
        return {
            content: [{
                    type: "text",
                    text: `Error: ${error instanceof Error ? error.message : 'An unexpected error occurred during correlation calculation.'}`
                }]
        };
    }
});
/**
 * Covariance operation
 * Calculates the sample covariance between two arrays of numbers
 */
mathServer.tool("covariance", "Calculates the sample covariance between two datasets, measuring how they change together. Positive values indicate variables tend to increase together, negative values indicate one increases as the other decreases. Uses Bessel's correction (n-1) for unbiased estimation.", {
    xArray: z.array(z.number()).min(2).describe("The first array of numbers (must have at least 2 elements)"),
    yArray: z.array(z.number()).min(2).describe("The second array of numbers (must have at least 2 elements and same length as xArray)")
}, async ({ xArray, yArray }) => {
    try {
        const value = Statistics.covariance(xArray, yArray);
        return {
            content: [{
                    type: "text",
                    text: `${value}`
                }]
        };
    }
    catch (error) {
        return {
            content: [{
                    type: "text",
                    text: `Error: ${error instanceof Error ? error.message : 'An unexpected error occurred during covariance calculation.'}`
                }]
        };
    }
});
/**
 * Z-score operation
 * Calculates the z-score (standard score) for a given value
 */
mathServer.tool("zscore", "Calculates the z-score (standard score) indicating how many standard deviations a value is from the mean. Formula: (value - mean) / stdDev. Positive z-scores indicate values above the mean, negative z-scores indicate values below the mean.", {
    value: z.number().describe("The value to calculate the z-score for"),
    mean: z.number().describe("The mean of the distribution"),
    stdDev: z.number().positive().describe("The standard deviation of the distribution (must be positive)")
}, async ({ value, mean, stdDev }) => {
    try {
        const zScore = Statistics.zscore(value, mean, stdDev);
        return {
            content: [{
                    type: "text",
                    text: `${zScore}`
                }]
        };
    }
    catch (error) {
        return {
            content: [{
                    type: "text",
                    text: `Error: ${error instanceof Error ? error.message : 'An unexpected error occurred during z-score calculation.'}`
                }]
        };
    }
});
/**
 * Normalize array operation
 * Normalizes an array of numbers using min-max normalization (0-1 scale)
 */
mathServer.tool("normalizeArray", "Normalizes an array of numbers using min-max normalization, scaling all values to a 0-1 range. Formula: (x - min) / (max - min). Useful for machine learning preprocessing and data visualization. If all values are identical, returns array of zeros.", {
    numbers: z.array(z.number()).min(1).describe("Array of numbers to normalize to 0-1 scale (must contain at least 1 element)")
}, async ({ numbers }) => {
    try {
        const normalizedArray = DataScience.normalizeArray(numbers);
        return {
            content: [{
                    type: "text",
                    text: `[${normalizedArray.join(', ')}]`
                }]
        };
    }
    catch (error) {
        return {
            content: [{
                    type: "text",
                    text: `Error: ${error instanceof Error ? error.message : 'An unexpected error occurred during array normalization.'}`
                }]
        };
    }
});
/**
 * Standardize array operation
 * Standardizes an array of numbers using z-score standardization (mean=0, std=1)
 */
mathServer.tool("standardizeArray", "Standardizes an array of numbers using z-score standardization, transforming the data to have a mean of 0 and standard deviation of 1. Formula: (x - mean) / stdDev. Useful for machine learning algorithms that assume normally distributed data. If standard deviation is zero, returns array of zeros.", {
    numbers: z.array(z.number()).min(2).describe("Array of numbers to standardize to mean=0, std=1 (must have at least 2 elements)")
}, async ({ numbers }) => {
    try {
        const standardizedArray = DataScience.standardizeArray(numbers);
        return {
            content: [{
                    type: "text",
                    text: `[${standardizedArray.join(', ')}]`
                }]
        };
    }
    catch (error) {
        return {
            content: [{
                    type: "text",
                    text: `Error: ${error instanceof Error ? error.message : 'An unexpected error occurred during array standardization.'}`
                }]
        };
    }
});
// Initialize the server transport and connect
const transport = new StdioServerTransport();
await mathServer.connect(transport);
