import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
const server = new McpServer({
    name: "math",
    version: "1.0.0"
});
server.tool("add", "Adds two numbers together", {
    numberA: z.number().describe("The first number"),
    numberB: z.number().describe("The second number")
}, async ({ numberA, numberB }) => {
    const total = numberA + numberB;
    return {
        content: [{
                type: "text",
                text: `${total}`
            }]
    };
});
server.tool("sum", "Adds any number of numbers together", {
    numbers: z.array(z.number()).describe("Array of numbers to sum")
}, async ({ numbers }) => {
    const sum = numbers.reduce((total, num) => total + num, 0);
    return {
        content: [{
                type: "text",
                text: `${sum}`
            }]
    };
});
const transport = new StdioServerTransport();
await server.connect(transport);
