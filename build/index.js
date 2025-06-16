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
    const value = Arithmetic.add(firstNumber, secondNumber);
    return {
        content: [{
                type: "text",
                text: `${value}`
            }]
    };
});
/**
 * Subtraction operation
 * Subtracts the second number from the first number
 */
mathServer.tool("subtract", "Subtracts the second number from the first number", {
    minuend: z.number().describe("The number to subtract from (minuend)"),
    subtrahend: z.number().describe("The number being subtracted (subtrahend)")
}, async ({ minuend, subtrahend }) => {
    const value = Arithmetic.subtract(minuend, subtrahend);
    return {
        content: [{
                type: "text",
                text: `${value}`
            }]
    };
});
/**
 * Multiplication operation
 * Multiplies two numbers together
 */
mathServer.tool("multiply", "Multiplies two numbers together", {
    firstNumber: z.number().describe("The first number"),
    secondNumber: z.number().describe("The second number")
}, async ({ firstNumber, secondNumber }) => {
    const value = Arithmetic.multiply(firstNumber, secondNumber);
    return {
        content: [{
                type: "text",
                text: `${value}`
            }]
    };
});
/**
 * Division operation
 * Divides the first number by the second number
 */
mathServer.tool("division", "Divides the first number by the second number", {
    numerator: z.number().describe("The number being divided (numerator)"),
    denominator: z.number().describe("The number to divide by (denominator)")
}, async ({ numerator, denominator }) => {
    const value = Arithmetic.division(numerator, denominator);
    return {
        content: [{
                type: "text",
                text: `${value}`
            }]
    };
});
/**
 * Sum operation
 * Calculates the sum of an array of numbers
 */
mathServer.tool("sum", "Adds any number of numbers together", {
    numbers: z.array(z.number()).min(1).describe("Array of numbers to sum")
}, async ({ numbers }) => {
    const value = Arithmetic.sum(numbers);
    return {
        content: [{
                type: "text",
                text: `${value}`
            }]
    };
});
/**
 * Mean operation
 * Calculates the arithmetic mean of an array of numbers
 */
mathServer.tool("mean", "Calculates the arithmetic mean of a list of numbers", {
    numbers: z.array(z.number()).min(1).describe("Array of numbers to find the mean of")
}, async ({ numbers }) => {
    const value = Statistics.mean(numbers);
    return {
        content: [{
                type: "text",
                text: `${value}`
            }]
    };
});
/**
 * Median operation
 * Calculates the median of an array of numbers
 */
mathServer.tool("median", "Calculates the median of a list of numbers", {
    numbers: z.array(z.number()).min(1).describe("Array of numbers to find the median of")
}, async ({ numbers }) => {
    const value = Statistics.median(numbers);
    return {
        content: [{
                type: "text",
                text: `${value}`
            }]
    };
});
/**
 * Mode operation
 * Finds the most common number in an array of numbers
 */
mathServer.tool("mode", "Finds the most common number in a list of numbers", {
    numbers: z.array(z.number()).describe("Array of numbers to find the mode of")
}, async ({ numbers }) => {
    const value = Statistics.mode(numbers);
    return {
        content: [{
                type: "text",
                text: `${Array.isArray(value) ? value.join(', ') : value}`
            }]
    };
});
/**
 * Minimum operation
 * Finds the smallest number in an array
 */
mathServer.tool("min", "Finds the minimum value from a list of numbers", {
    numbers: z.array(z.number()).describe("Array of numbers to find the minimum of")
}, async ({ numbers }) => {
    const value = Statistics.min(numbers);
    return {
        content: [{
                type: "text",
                text: `${value}`
            }]
    };
});
/**
 * Maximum operation
 * Finds the largest number in an array
 */
mathServer.tool("max", "Finds the maximum value from a list of numbers", {
    numbers: z.array(z.number()).describe("Array of numbers to find the maximum of")
}, async ({ numbers }) => {
    const value = Statistics.max(numbers);
    return {
        content: [{
                type: "text",
                text: `${value}`
            }]
    };
});
/**
 * Variance operation
 * Calculates the population variance of an array of numbers
 */
mathServer.tool("variance", "Calculates the population variance of a list of numbers", {
    numbers: z.array(z.number()).min(1).describe("Array of numbers to calculate the variance of")
}, async ({ numbers }) => {
    const value = Statistics.variance(numbers);
    return {
        content: [{
                type: "text",
                text: `${value}`
            }]
    };
});
/**
 * Standard deviation operation
 * Calculates the standard deviation of an array of numbers
 */
mathServer.tool("standardDeviation", "Calculates the standard deviation of a list of numbers", {
    numbers: z.array(z.number()).min(1).describe("Array of numbers to calculate the standard deviation of")
}, async ({ numbers }) => {
    const value = Statistics.standardDeviation(numbers);
    return {
        content: [{
                type: "text",
                text: `${value}`
            }]
    };
});
/**
 * Range operation
 * Calculates the range (max - min) of an array of numbers
 */
mathServer.tool("range", "Calculates the range (difference between max and min) of a list of numbers", {
    numbers: z.array(z.number()).min(1).describe("Array of numbers to calculate the range of")
}, async ({ numbers }) => {
    const value = Statistics.range(numbers);
    return {
        content: [{
                type: "text",
                text: `${value}`
            }]
    };
});
/**
 * Percentile operation
 * Calculates the percentile value of an array of numbers
 */
mathServer.tool("percentile", "Calculates the percentile value of a list of numbers", {
    numbers: z.array(z.number()).min(1).describe("Array of numbers to calculate the percentile from"),
    p: z.number().min(0).max(100).describe("The percentile to calculate (0-100)")
}, async ({ numbers, p }) => {
    const value = Statistics.percentile(numbers, p);
    return {
        content: [{
                type: "text",
                text: `${value}`
            }]
    };
});
/**
 * Floor operation
 * Rounds a number down to the nearest integer
 */
mathServer.tool("floor", "Rounds a number down to the nearest integer", {
    number: z.number().describe("The number to round down"),
}, async ({ number }) => {
    const value = Arithmetic.floor(number);
    return {
        content: [{
                type: "text",
                text: `${value}`
            }]
    };
});
/**
 * Ceiling operation
 * Rounds a number up to the nearest integer
 */
mathServer.tool("ceiling", "Rounds a number up to the nearest integer", {
    number: z.number().describe("The number to round up"),
}, async ({ number }) => {
    const value = Arithmetic.ceil(number);
    return {
        content: [{
                type: "text",
                text: `${value}`
            }]
    };
});
/**
 * Round operation
 * Rounds a number to the nearest integer
 */
mathServer.tool("round", "Rounds a number to the nearest integer", {
    number: z.number().describe("The number to round"),
}, async ({ number }) => {
    const value = Arithmetic.round(number);
    return {
        content: [{
                type: "text",
                text: `${value}`
            }]
    };
});
/**
 * Round to precision operation
 * Rounds a number to a specified number of decimal places
 */
mathServer.tool("roundToPrecision", "Rounds a number to a specified number of decimal places", {
    number: z.number().describe("The number to round"),
    decimalPlaces: z.number().int().min(0).max(15).describe("The number of decimal places to round to (0-15)")
}, async ({ number, decimalPlaces }) => {
    const value = Arithmetic.roundToPrecision(number, decimalPlaces);
    return {
        content: [{
                type: "text",
                text: `${value}`
            }]
    };
});
/**
 * Floor to precision operation
 * Floors a number to a specified number of decimal places
 */
mathServer.tool("floorToPrecision", "Floors a number to a specified number of decimal places", {
    number: z.number().describe("The number to floor"),
    decimalPlaces: z.number().int().min(0).max(15).describe("The number of decimal places to floor to (0-15)")
}, async ({ number, decimalPlaces }) => {
    const value = Arithmetic.floorToPrecision(number, decimalPlaces);
    return {
        content: [{
                type: "text",
                text: `${value}`
            }]
    };
});
/**
 * Ceil to precision operation
 * Ceils a number to a specified number of decimal places
 */
mathServer.tool("ceilToPrecision", "Ceils a number to a specified number of decimal places", {
    number: z.number().describe("The number to ceil"),
    decimalPlaces: z.number().int().min(0).max(15).describe("The number of decimal places to ceil to (0-15)")
}, async ({ number, decimalPlaces }) => {
    const value = Arithmetic.ceilToPrecision(number, decimalPlaces);
    return {
        content: [{
                type: "text",
                text: `${value}`
            }]
    };
});
/**
 * Power operation
 * Raises a base number to the power of an exponent
 */
mathServer.tool("power", "Raises a base number to the power of an exponent", {
    base: z.number().describe("The base number"),
    exponent: z.number().describe("The exponent to raise the base to")
}, async ({ base, exponent }) => {
    const value = Arithmetic.power(base, exponent);
    return {
        content: [{
                type: "text",
                text: `${value}`
            }]
    };
});
/**
 * Square root operation
 * Calculates the square root of a number
 */
mathServer.tool("sqrt", "Calculates the square root of a number", {
    number: z.number().min(0).describe("The number to find the square root of (must be non-negative)")
}, async ({ number }) => {
    const value = Arithmetic.sqrt(number);
    return {
        content: [{
                type: "text",
                text: `${value}`
            }]
    };
});
/**
 * Absolute value operation
 * Calculates the absolute value of a number
 */
mathServer.tool("abs", "Calculates the absolute value of a number", {
    number: z.number().describe("The number to find the absolute value of")
}, async ({ number }) => {
    const value = Arithmetic.abs(number);
    return {
        content: [{
                type: "text",
                text: `${value}`
            }]
    };
});
/**
 * GCD operation
 * Calculates the greatest common divisor of two integers using Euclidean algorithm
 */
mathServer.tool("gcd", "Calculates the greatest common divisor (GCD) of two integers", {
    a: z.number().int().describe("The first integer"),
    b: z.number().int().describe("The second integer")
}, async ({ a, b }) => {
    const value = Arithmetic.gcd(a, b);
    return {
        content: [{
                type: "text",
                text: `${value}`
            }]
    };
});
/**
 * LCM operation
 * Calculates the least common multiple of two integers
 */
mathServer.tool("lcm", "Calculates the least common multiple (LCM) of two integers", {
    a: z.number().int().describe("The first integer"),
    b: z.number().int().describe("The second integer")
}, async ({ a, b }) => {
    const value = Arithmetic.lcm(a, b);
    return {
        content: [{
                type: "text",
                text: `${value}`
            }]
    };
});
/**
 * Factorial operation
 * Calculates the factorial of a non-negative integer
 */
mathServer.tool("factorial", "Calculates the factorial of a non-negative integer", {
    n: z.number().int().min(0).describe("The non-negative integer to calculate factorial of")
}, async ({ n }) => {
    const value = Arithmetic.factorial(n);
    return {
        content: [{
                type: "text",
                text: `${value}`
            }]
    };
});
// Initialize the server transport and connect
const transport = new StdioServerTransport();
await mathServer.connect(transport);
