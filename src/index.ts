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

// Initialize the MCP server with name and version
const mathServer = new McpServer({
    name: "math",
    version: "1.0.0"
})

/**
 * Addition operation
 * Adds two numbers and returns their sum
 */
mathServer.tool("add", "Adds two numbers together", {
    firstNumber: z.number().describe("The first addend"),
    secondNumber: z.number().describe("The second addend")
}, async ({ firstNumber, secondNumber }) => {
    const sum = firstNumber + secondNumber;
    return {
        content: [{
            type: "text",
            text: `${sum}`
        }]
    }
})

/**
 * Subtraction operation
 * Subtracts the second number from the first number
 */
mathServer.tool("subtract", "Subtracts the second number from the first number", {
    minuend: z.number().describe("The number to subtract from (minuend)"),
    subtrahend: z.number().describe("The number being subtracted (subtrahend)")
}, async ({ minuend, subtrahend }) => {
    const difference = minuend - subtrahend;
    return {
        content: [{
            type: "text",
            text: `${difference}`
        }]
    }
})

/**
 * Multiplication operation
 * Multiplies two numbers together
 */
mathServer.tool("multiply", "Multiplies two numbers together", {
    firstFactor: z.number().describe("The first factor"),
    secondFactor: z.number().describe("The second factor")
}, async ({ firstFactor, secondFactor }) => {
    const product = firstFactor * secondFactor;
    return {
        content: [{
            type: "text",
            text: `${product}`
        }]
    }
})

/**
 * Division operation
 * Divides the first number by the second number
 */
mathServer.tool("division", "Divides the first number by the second number", {
    numerator: z.number().describe("The number being divided (numerator)"),
    denominator: z.number().describe("The number to divide by (denominator)")
}, async ({ numerator, denominator }) => {
    const quotient = numerator / denominator;
    return {
        content: [{
            type: "text",
            text: `${quotient}`
        }]
    }
})

/**
 * Sum operation
 * Calculates the sum of an array of numbers
 */
mathServer.tool("sum", "Adds any number of numbers together", {
    numbers: z.array(z.number()).describe("Array of numbers to sum")
}, async ({ numbers }) => {
    // Use reduce to accumulate the sum, starting with 0
    const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return {
        content: [{
            type: "text",
            text: `${sum}`
        }]
    }
})

/**
 * Mean operation
 * Calculates the arithmetic mean of an array of numbers
 */
mathServer.tool("mean", "Calculates the arithmetic mean of a list of numbers", {
    numbers: z.array(z.number()).describe("Array of numbers to find the mean of")
}, async ({ numbers }) => {
    // Calculate sum and divide by the count of numbers
    const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const mean = sum / numbers.length;
    return {
        content: [{
            type: "text",
            text: `${mean}`
        }]
    }
})

/**
 * Median operation
 * Calculates the median of an array of numbers
 */
mathServer.tool("median", "Calculates the median of a list of numbers", {
    numbers: z.array(z.number()).describe("Array of numbers to find the median of")
}, async ({ numbers }) => {
    if (numbers.length === 0) {
        return {
            content: [{
                type: "text",
                text: `An empty array was passed in`
            }]
        }
    }

    //Sort numbers
    numbers.sort()

    //Find the median index
    const medianIndex = numbers.length / 2

    let medianValue: number;
    if (numbers.length % 2 !== 0) {
        //If number is odd
        medianValue = numbers[Math.floor(medianIndex)]
    } else {
        //If number is even
        medianValue = (numbers[medianIndex] + numbers[medianIndex - 1]) / 2
    }
    return {
        content: [{
            type: "text",
            text: `${medianValue}`
        }]
    }
})

/**
 * Mode operation
 * Finds the most common number in an array of numbers
 */
mathServer.tool("mode", "Finds the most common number in a list of numbers", {
    numbers: z.array(z.number()).describe("Array of numbers to find the mode of")
}, async ({ numbers }) => {
    const modeMap = new Map<number, number>()

    //Set each entry parameter into the map and assign it the number of times it appears in the list
    numbers.forEach((value) => {
        if (modeMap.has(value)) {
            modeMap.set(value, modeMap.get(value)! + 1)
        } else {
            modeMap.set(value, 1)
        }
    });

    //Find the max frequency in the map
    let maxFrequency = 0;
    for (const numberFrequency of modeMap.values()) {
        if (numberFrequency > maxFrequency) {
            maxFrequency = numberFrequency;
        }
    }


    const modeResult = []
    //Find the entries with the highest frequency
    for (const [key, value] of modeMap.entries()) {
        if (value === maxFrequency) {
            modeResult.push(key)
        }
    }

    return {
        content: [{
            type: "text",
            text: `Entries (${modeResult.join(', ')}) appeared ${maxFrequency} times`
        }]
    }
})

/**
 * Minimum operation
 * Finds the smallest number in an array
 */
mathServer.tool("min", "Finds the minimum value from a list of numbers", {
    numbers: z.array(z.number()).describe("Array of numbers to find the minimum of")
}, async ({ numbers }) => {
    const minValue = Math.min(...numbers);
    return {
        content: [{
            type: "text",
            text: `${minValue}`
        }]
    }
})

/**
 * Maximum operation
 * Finds the largest number in an array
 */
mathServer.tool("max", "Finds the maximum value from a list of numbers", {
    numbers: z.array(z.number()).describe("Array of numbers to find the maximum of")
}, async ({ numbers }) => {
    const maxValue = Math.max(...numbers);
    return {
        content: [{
            type: "text",
            text: `${maxValue}`
        }]
    }
})

/**
 * Floor operation
 * Rounds a number down to the nearest integer
 */
mathServer.tool("floor", "Rounds a number down to the nearest integer", {
    value: z.number().describe("The number to round down"),
}, async ({ value }) => {
    const floorValue = Math.floor(value);
    return {
        content: [{
            type: "text",
            text: `${floorValue}`
        }]
    }
})

/**
 * Ceiling operation
 * Rounds a number up to the nearest integer
 */
mathServer.tool("ceiling", "Rounds a number up to the nearest integer", {
    value: z.number().describe("The number to round up"),
}, async ({ value }) => {
    const ceilingValue = Math.ceil(value);
    return {
        content: [{
            type: "text",
            text: `${ceilingValue}`
        }]
    }
})

/**
 * Round operation
 * Rounds a number to the nearest integer
 */
mathServer.tool("round", "Rounds a number to the nearest integer", {
    value: z.number().describe("The number to round"),
}, async ({ value }) => {
    const roundedValue = Math.round(value);
    return {
        content: [{
            type: "text",
            text: `${roundedValue}`
        }]
    }
})

// Initialize the server transport and connect
const transport = new StdioServerTransport();
await mathServer.connect(transport);

// Server is now running and ready to process requests
