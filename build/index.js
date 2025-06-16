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
mathServer.tool("add", "Adds two numbers together", {
    firstNumber: z.number().describe("The first addend"),
    secondNumber: z.number().describe("The second addend")
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
mathServer.tool("subtract", "Subtracts the second number from the first number", {
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
mathServer.tool("multiply", "Multiplies two numbers together", {
    firstNumber: z.number().describe("The first number"),
    secondNumber: z.number().describe("The second number")
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
mathServer.tool("division", "Divides the first number by the second number", {
    numerator: z.number().describe("The number being divided (numerator)"),
    denominator: z.number().describe("The number to divide by (denominator)")
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
mathServer.tool("sum", "Adds any number of numbers together", {
    numbers: z.array(z.number()).min(1).describe("Array of numbers to sum")
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
mathServer.tool("mean", "Calculates the arithmetic mean of a list of numbers", {
    numbers: z.array(z.number()).min(1).describe("Array of numbers to find the mean of")
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
mathServer.tool("median", "Calculates the median of a list of numbers", {
    numbers: z.array(z.number()).min(1).describe("Array of numbers to find the median of")
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
mathServer.tool("mode", "Finds the most common number in a list of numbers", {
    numbers: z.array(z.number()).describe("Array of numbers to find the mode of")
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
mathServer.tool("min", "Finds the minimum value from a list of numbers", {
    numbers: z.array(z.number()).describe("Array of numbers to find the minimum of")
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
mathServer.tool("max", "Finds the maximum value from a list of numbers", {
    numbers: z.array(z.number()).describe("Array of numbers to find the maximum of")
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
mathServer.tool("variance", "Calculates the population variance of a list of numbers", {
    numbers: z.array(z.number()).min(1).describe("Array of numbers to calculate the variance of")
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
mathServer.tool("standardDeviation", "Calculates the standard deviation of a list of numbers", {
    numbers: z.array(z.number()).min(1).describe("Array of numbers to calculate the standard deviation of")
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
mathServer.tool("range", "Calculates the range (difference between max and min) of a list of numbers", {
    numbers: z.array(z.number()).min(1).describe("Array of numbers to calculate the range of")
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
mathServer.tool("percentile", "Calculates the percentile value of a list of numbers", {
    numbers: z.array(z.number()).min(1).describe("Array of numbers to calculate the percentile from"),
    p: z.number().min(0).max(100).describe("The percentile to calculate (0-100)")
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
mathServer.tool("floor", "Rounds a number down to the nearest integer", {
    number: z.number().describe("The number to round down"),
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
mathServer.tool("ceiling", "Rounds a number up to the nearest integer", {
    number: z.number().describe("The number to round up"),
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
mathServer.tool("round", "Rounds a number to the nearest integer", {
    number: z.number().describe("The number to round"),
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
mathServer.tool("roundToPrecision", "Rounds a number to a specified number of decimal places", {
    number: z.number().describe("The number to round"),
    decimalPlaces: z.number().int().min(0).max(15).describe("The number of decimal places to round to (0-15)")
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
mathServer.tool("floorToPrecision", "Floors a number to a specified number of decimal places", {
    number: z.number().describe("The number to floor"),
    decimalPlaces: z.number().int().min(0).max(15).describe("The number of decimal places to floor to (0-15)")
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
mathServer.tool("ceilToPrecision", "Ceils a number to a specified number of decimal places", {
    number: z.number().describe("The number to ceil"),
    decimalPlaces: z.number().int().min(0).max(15).describe("The number of decimal places to ceil to (0-15)")
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
mathServer.tool("power", "Raises a base number to the power of an exponent", {
    base: z.number().describe("The base number"),
    exponent: z.number().describe("The exponent to raise the base to")
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
mathServer.tool("sqrt", "Calculates the square root of a number", {
    number: z.number().min(0).describe("The number to find the square root of (must be non-negative)")
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
mathServer.tool("abs", "Calculates the absolute value of a number", {
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
mathServer.tool("gcd", "Calculates the greatest common divisor (GCD) of two integers", {
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
mathServer.tool("lcm", "Calculates the least common multiple (LCM) of two integers", {
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
mathServer.tool("factorial", "Calculates the factorial of a non-negative integer", {
    n: z.number().int().min(0).describe("The non-negative integer to calculate factorial of")
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
mathServer.tool("evaluate", "Evaluates a mathematical expression string with support for operators, functions, and constants", {
    expression: z.string().describe("The mathematical expression to evaluate (e.g., '2^16 + sqrt(144)', 'mean([1,2,3]) * pi')")
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
mathServer.tool("correlation", "Calculates the Pearson correlation coefficient between two arrays of numbers", {
    xArray: z.array(z.number()).min(2).describe("The first array of numbers (must have at least 2 elements)"),
    yArray: z.array(z.number()).min(2).describe("The second array of numbers (must have at least 2 elements and same length as xArray)")
}, async ({ xArray, yArray }) => {
    const value = Statistics.correlation(xArray, yArray);
    return {
        content: [{
                type: "text",
                text: `${value}`
            }]
    };
});
/**
 * Covariance operation
 * Calculates the sample covariance between two arrays of numbers
 */
mathServer.tool("covariance", "Calculates the sample covariance between two arrays of numbers", {
    xArray: z.array(z.number()).min(2).describe("The first array of numbers (must have at least 2 elements)"),
    yArray: z.array(z.number()).min(2).describe("The second array of numbers (must have at least 2 elements and same length as xArray)")
}, async ({ xArray, yArray }) => {
    const value = Statistics.covariance(xArray, yArray);
    return {
        content: [{
                type: "text",
                text: `${value}`
            }]
    };
});
/**
 * Z-score operation
 * Calculates the z-score (standard score) for a given value
 */
mathServer.tool("zscore", "Calculates the z-score (standard score) for a given value", {
    value: z.number().describe("The value to calculate the z-score for"),
    mean: z.number().describe("The mean of the distribution"),
    stdDev: z.number().positive().describe("The standard deviation of the distribution (must be positive)")
}, async ({ value, mean, stdDev }) => {
    const zScore = Statistics.zscore(value, mean, stdDev);
    return {
        content: [{
                type: "text",
                text: `${zScore}`
            }]
    };
});
/**
 * Normalize array operation
 * Normalizes an array of numbers using min-max normalization (0-1 scale)
 */
mathServer.tool("normalizeArray", "Normalizes an array of numbers using min-max normalization (0-1 scale)", {
    numbers: z.array(z.number()).min(1).describe("Array of numbers to normalize")
}, async ({ numbers }) => {
    const normalizedArray = DataScience.normalizeArray(numbers);
    return {
        content: [{
                type: "text",
                text: `[${normalizedArray.join(', ')}]`
            }]
    };
});
/**
 * Standardize array operation
 * Standardizes an array of numbers using z-score standardization (mean=0, std=1)
 */
mathServer.tool("standardizeArray", "Standardizes an array of numbers using z-score standardization (mean=0, std=1)", {
    numbers: z.array(z.number()).min(2).describe("Array of numbers to standardize (must have at least 2 elements)")
}, async ({ numbers }) => {
    const standardizedArray = DataScience.standardizeArray(numbers);
    return {
        content: [{
                type: "text",
                text: `[${standardizedArray.join(', ')}]`
            }]
    };
});
// Initialize the server transport and connect
const transport = new StdioServerTransport();
await mathServer.connect(transport);
