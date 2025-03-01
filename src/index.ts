import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
    name: "math",
    version: "1.0.0"
})

server.tool("add", "Adds two numbers together", {
    numberA: z.number().describe("The first number"),
    numberB: z.number().describe("The second number")
}, async ({ numberA, numberB }) => {
    const total = numberA + numberB
    return {
        content: [{
            type: "text",
            text: `${total}`
        }]
    }
})

server.tool("subtract", "Subtract numberA from numberB", {
    numberA: z.number().describe("The number being subtracted"),
    numberB: z.number().describe("The number subtracting")
}, async ({ numberA, numberB }) => {
    const total = numberA - numberB
    return {
        content: [{
            type: "text",
            text: `${total}`
        }]
    }
})

server.tool("multiply", "Multiply numberA and numberB", {
    numberA: z.number().describe("The first number"),
    numberB: z.number().describe("The second number")
}, async ({ numberA, numberB }) => {
    const total = numberA * numberB
    return {
        content: [{
            type: "text",
            text: `${total}`
        }]
    }
})

server.tool("division", "Divide numberB from numberA", {
    numberA: z.number().describe("The numerator"),
    numberB: z.number().describe("The devisor")
}, async ({ numberA, numberB }) => {
    const total = numberA / numberB
    return {
        content: [{
            type: "text",
            text: `${total}`
        }]
    }
})

server.tool("sum", "Adds any number of numbers together", {
    numbers: z.array(z.number()).describe("Array of numbers to sum")
}, async ({ numbers }) => {
    const sum = numbers.reduce((total, num) => total + num, 0);
    return {
        content: [{
            type: "text",
            text: `${sum}`
        }]
    }
})

server.tool("average", "Finds the average of a list of numbers", {
    numbers: z.array(z.number()).describe("Array of numbers to find the average of")
}, async ({ numbers }) => {
    const sum = numbers.reduce((total, num) => total + num, 0) / numbers.length;
    return {
        content: [{
            type: "text",
            text: `${sum}`
        }]
    }
})

server.tool("min", "Finds the minimum from a list of numbers", {
    numbers: z.array(z.number()).describe("Array of numbers to find the minimum of")
}, async ({ numbers }) => {
    const sum = Math.min(...numbers);
    return {
        content: [{
            type: "text",
            text: `${sum}`
        }]
    }
})

server.tool("max", "Finds the maximum from a list of numbers", {
    numbers: z.array(z.number()).describe("Array of numbers to find the maximum of")
}, async ({ numbers }) => {
    const sum = Math.max(...numbers);
    return {
        content: [{
            type: "text",
            text: `${sum}`
        }]
    }
})

server.tool("floor", "Rounds a number down", {
    numberA: z.number().describe("The number"),
}, async ({ numberA }) => {
    const num = Math.floor(numberA)
    return {
        content: [{
            type: "text",
            text: `${num}`
        }]
    }
})

server.tool("Ceiling", "Rounds a number up", {
    numberA: z.number().describe("The number"),
}, async ({ numberA }) => {
    const num = Math.ceil(numberA)
    return {
        content: [{
            type: "text",
            text: `${num}`
        }]
    }
})

server.tool("Round", "Rounds a number", {
    numberA: z.number().describe("The number"),
}, async ({ numberA }) => {
    const num = Math.round(numberA)
    return {
        content: [{
            type: "text",
            text: `${num}`
        }]
    }
})

const transport = new StdioServerTransport();
await server.connect(transport)
