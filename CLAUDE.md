# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Math-Tools is a Model Context Protocol (MCP) server that provides mathematical and statistical functions to Large Language Models. It's built with TypeScript and uses the MCP SDK to expose mathematical operations as tools.

## Development Commands

```bash
# Build the project (compiles TypeScript to JavaScript)
npm run build

# Start the server (builds and runs)
npm start

# Compile TypeScript manually
tsc
```

## Architecture

### Core Structure
- **Entry Point**: `src/index.ts` - Defines the MCP server and registers all mathematical tools
- **Classes**: Two main utility classes in `src/Classes/`
  - `Arithmetic.ts` - Basic math operations (add, subtract, multiply, divide, sum, floor, ceil, round)
  - `Statistics.ts` - Statistical functions (mean, median, mode, min, max)

### MCP Tool Registration
The server registers mathematical operations as MCP tools using Zod schemas for validation:
- Each tool accepts numeric parameters and returns text responses
- Tools are grouped by functionality (arithmetic vs statistical)
- All operations are static methods in their respective classes

### Build Process
- TypeScript compiles from `src/` to `build/` directory
- Build output is executable Node.js module (`build/index.js`)
- Uses ES modules (`"type": "module"` in package.json)

## Key Implementation Details

### Tool Parameters
- Uses Zod for parameter validation and description
- Arithmetic operations use descriptive parameter names (minuend/subtrahend, numerator/denominator)
- Array-based operations require minimum one element

### Known Issues
- `Statistics.median()` method is incomplete (missing return statement at line 36)
- Parameter name inconsistency in multiply tool (`SecondNumber` vs `secondNumber`)
- README documents "average" tool but code implements "mean" tool

### Dependencies
- `@modelcontextprotocol/sdk` - MCP server implementation
- `zod` - Schema validation and type safety
- No test framework currently configured

## MCP Integration
- Configured for Smithery package manager deployment
- Uses stdio transport for communication
- Server name: "math", version matches package.json