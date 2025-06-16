import { Arithmetic } from './Arithmetic.js';
import { Statistics } from './Statistics.js';
import { DataScience } from './DataScience.js';

/**
 * ExpressionEvaluator class provides functionality to parse and evaluate mathematical expressions
 * Supports:
 * - Basic operators: +, -, *, /, ^ (power)
 * - Arithmetic functions: sqrt(), abs(), power(), floor(), ceil(), round(), sum()
 * - Precision functions: roundToPrecision(), floorToPrecision(), ceilToPrecision()
 * - Number theory: factorial(), gcd(), lcm()
 * - Statistical functions: mean(), median(), mode(), min(), max(), variance(), standardDeviation(), range(), percentile()
 * - Advanced statistics: correlation(), covariance(), zscore()
 * - Data science: normalizeArray(), standardizeArray()
 * - Constants: pi, e
 * - Array notation: [1,2,3] for statistical functions
 * - Proper parentheses handling and operator precedence
 */
export class ExpressionEvaluator {
    // Mathematical constants
    private static readonly CONSTANTS: { [key: string]: number } = {
        'pi': Math.PI,
        'e': Math.E
    };

    // Supported functions
    private static readonly FUNCTIONS = [
        // Arithmetic functions
        'sqrt', 'abs', 'power', 'floor', 'ceil', 'round', 'sum',
        // Precision functions
        'roundtoprecision', 'floortoprecision', 'ceiltoprecision',
        // Number theory functions
        'factorial', 'gcd', 'lcm',
        // Statistical functions
        'mean', 'median', 'mode', 'min', 'max', 'variance', 'standarddeviation', 'range', 'percentile',
        // Advanced statistics
        'correlation', 'covariance', 'zscore',
        // Data science functions
        'normalizearray', 'standardizearray'
    ];

    /**
     * Tokenizes the expression into an array of tokens
     * @param expression - The mathematical expression to tokenize
     * @returns Array of tokens
     */
    private static tokenize(expression: string): string[] {
        // Remove all whitespace
        const cleaned = expression.replace(/\s+/g, '');
        
        // Regular expression to match tokens
        const tokenRegex = /([a-zA-Z_][a-zA-Z0-9_]*|\d+\.?\d*|\[[\d,.\s-]+\]|[+\-*/^()])/g;
        const tokens = cleaned.match(tokenRegex);
        
        if (!tokens) {
            throw new Error('Invalid mathematical expression: no valid tokens found');
        }
        
        return tokens;
    }

    /**
     * Parses an array notation like [1,2,3] into a number array
     * @param arrayStr - The array string to parse
     * @returns Array of numbers
     */
    private static parseArray(arrayStr: string): number[] {
        // Remove brackets and split by comma
        const inner = arrayStr.slice(1, -1).trim();
        if (!inner) {
            throw new Error('Empty array notation is not allowed');
        }
        
        const elements = inner.split(',').map(s => s.trim());
        const numbers: number[] = [];
        
        for (const element of elements) {
            const num = parseFloat(element);
            if (isNaN(num) || !isFinite(num)) {
                throw new Error(`Invalid number in array: ${element}`);
            }
            numbers.push(num);
        }
        
        if (numbers.length === 0) {
            throw new Error('Array cannot be empty');
        }
        
        return numbers;
    }

    /**
     * Evaluates a function call
     * @param funcName - Name of the function
     * @param args - Arguments for the function
     * @returns The result of the function call (number or number[])
     */
    private static evaluateFunction(funcName: string, args: (number | number[])[]): number | number[] {
        switch (funcName.toLowerCase()) {
            case 'sqrt':
                if (args.length !== 1 || Array.isArray(args[0])) {
                    throw new Error('sqrt() requires exactly one numeric argument');
                }
                return Arithmetic.sqrt(args[0] as number);
                
            case 'abs':
                if (args.length !== 1 || Array.isArray(args[0])) {
                    throw new Error('abs() requires exactly one numeric argument');
                }
                return Arithmetic.abs(args[0] as number);
                
            case 'mean':
                if (args.length !== 1 || !Array.isArray(args[0])) {
                    throw new Error('mean() requires exactly one array argument');
                }
                return Statistics.mean(args[0] as number[]);
                
            case 'min':
                if (args.length !== 1 || !Array.isArray(args[0])) {
                    throw new Error('min() requires exactly one array argument');
                }
                return Statistics.min(args[0] as number[]);
                
            case 'max':
                if (args.length !== 1 || !Array.isArray(args[0])) {
                    throw new Error('max() requires exactly one array argument');
                }
                return Statistics.max(args[0] as number[]);
                
            case 'correlation':
                if (args.length !== 2 || !Array.isArray(args[0]) || !Array.isArray(args[1])) {
                    throw new Error('correlation() requires exactly two array arguments');
                }
                return Statistics.correlation(args[0] as number[], args[1] as number[]);
                
            case 'covariance':
                if (args.length !== 2 || !Array.isArray(args[0]) || !Array.isArray(args[1])) {
                    throw new Error('covariance() requires exactly two array arguments');
                }
                return Statistics.covariance(args[0] as number[], args[1] as number[]);
                
            case 'zscore':
                if (args.length !== 3 || Array.isArray(args[0]) || Array.isArray(args[1]) || Array.isArray(args[2])) {
                    throw new Error('zscore() requires exactly three numeric arguments: value, mean, stdDev');
                }
                return Statistics.zscore(args[0] as number, args[1] as number, args[2] as number);
                
            case 'normalizearray':
                if (args.length !== 1 || !Array.isArray(args[0])) {
                    throw new Error('normalizeArray() requires exactly one array argument');
                }
                return DataScience.normalizeArray(args[0] as number[]);
                
            case 'standardizearray':
                if (args.length !== 1 || !Array.isArray(args[0])) {
                    throw new Error('standardizeArray() requires exactly one array argument');
                }
                return DataScience.standardizeArray(args[0] as number[]);
                
            default:
                throw new Error(`Unsupported function in expression: ${funcName}`);
        }
    }

    /**
     * Parses and evaluates an expression using recursive descent parsing
     * @param tokens - Array of tokens to parse
     * @param index - Current position in tokens array
     * @returns Object containing the result and new index position
     */
    private static parseExpression(tokens: string[], index: { value: number }): number {
        return this.parseAdditionSubtraction(tokens, index);
    }

    /**
     * Parses an argument expression that can be either a number or an array
     * Used for function arguments that may accept array-returning functions
     * @param tokens - Array of tokens to parse
     * @param index - Current position in tokens array
     * @returns Either a number or an array
     */
    private static parseArgumentExpression(tokens: string[], index: { value: number }): number | number[] {
        // Check if this is a function call that might return an array
        if (index.value < tokens.length && 
            this.FUNCTIONS.includes(tokens[index.value].toLowerCase()) &&
            (tokens[index.value].toLowerCase() === 'normalizearray' || tokens[index.value].toLowerCase() === 'standardizearray')) {
            
            const funcName = tokens[index.value].toLowerCase();
            index.value++;
            
            if (index.value >= tokens.length || tokens[index.value] !== '(') {
                throw new Error(`Function ${funcName} must be followed by parentheses`);
            }
            
            index.value++; // Skip opening parenthesis
            
            // Parse function arguments
            const args: (number | number[])[] = [];
            
            if (index.value < tokens.length && tokens[index.value] !== ')') {
                // Parse first argument
                if (tokens[index.value].startsWith('[') && tokens[index.value].endsWith(']')) {
                    // Array argument
                    args.push(this.parseArray(tokens[index.value]));
                    index.value++;
                } else {
                    // Numeric argument or nested function
                    const arg = this.parseArgumentExpression(tokens, index);
                    args.push(arg);
                }
                
                // Parse additional arguments (if any)
                while (index.value < tokens.length && tokens[index.value] === ',') {
                    index.value++; // Skip comma
                    
                    if (tokens[index.value].startsWith('[') && tokens[index.value].endsWith(']')) {
                        // Array argument
                        args.push(this.parseArray(tokens[index.value]));
                        index.value++;
                    } else {
                        // Numeric argument or nested function
                        const arg = this.parseArgumentExpression(tokens, index);
                        args.push(arg);
                    }
                }
            }
            
            if (index.value >= tokens.length || tokens[index.value] !== ')') {
                throw new Error(`Mismatched parentheses: missing closing parenthesis for function ${funcName}`);
            }
            
            index.value++; // Skip closing parenthesis
            return this.evaluateFunction(funcName, args);
        }
        
        // Otherwise, parse as a regular numeric expression
        return this.parseExpression(tokens, index);
    }

    /**
     * Parses addition and subtraction (lowest precedence)
     */
    private static parseAdditionSubtraction(tokens: string[], index: { value: number }): number {
        let left = this.parseMultiplicationDivision(tokens, index);
        
        while (index.value < tokens.length && (tokens[index.value] === '+' || tokens[index.value] === '-')) {
            const operator = tokens[index.value];
            index.value++;
            const right = this.parseMultiplicationDivision(tokens, index);
            
            if (operator === '+') {
                left = Arithmetic.add(left, right);
            } else {
                left = Arithmetic.subtract(left, right);
            }
        }
        
        return left;
    }

    /**
     * Parses multiplication and division (medium precedence)
     */
    private static parseMultiplicationDivision(tokens: string[], index: { value: number }): number {
        let left = this.parsePower(tokens, index);
        
        while (index.value < tokens.length && (tokens[index.value] === '*' || tokens[index.value] === '/')) {
            const operator = tokens[index.value];
            index.value++;
            const right = this.parsePower(tokens, index);
            
            if (operator === '*') {
                left = Arithmetic.multiply(left, right);
            } else {
                left = Arithmetic.division(left, right);
            }
        }
        
        return left;
    }

    /**
     * Parses power operations (highest precedence, right-associative)
     */
    private static parsePower(tokens: string[], index: { value: number }): number {
        let left = this.parseFactor(tokens, index);
        
        if (index.value < tokens.length && tokens[index.value] === '^') {
            index.value++;
            const right = this.parsePower(tokens, index); // Right-associative
            left = Arithmetic.power(left, right);
        }
        
        return left;
    }

    /**
     * Parses factors (numbers, constants, functions, parentheses)
     */
    private static parseFactor(tokens: string[], index: { value: number }): number {
        if (index.value >= tokens.length) {
            throw new Error('Unexpected end of expression');
        }
        
        const token = tokens[index.value];
        
        // Handle negative numbers
        if (token === '-') {
            index.value++;
            return Arithmetic.multiply(-1, this.parseFactor(tokens, index));
        }
        
        // Handle positive sign
        if (token === '+') {
            index.value++;
            return this.parseFactor(tokens, index);
        }
        
        // Handle parentheses
        if (token === '(') {
            index.value++;
            const result = this.parseExpression(tokens, index);
            
            if (index.value >= tokens.length || tokens[index.value] !== ')') {
                throw new Error('Mismatched parentheses: missing closing parenthesis');
            }
            
            index.value++;
            return result;
        }
        
        // Handle numbers
        if (/^\d+\.?\d*$/.test(token)) {
            index.value++;
            const num = parseFloat(token);
            if (isNaN(num) || !isFinite(num)) {
                throw new Error(`Invalid number: ${token}`);
            }
            return num;
        }
        
        // Handle array notation
        if (token.startsWith('[') && token.endsWith(']')) {
            throw new Error('Array notation can only be used as function arguments');
        }
        
        // Handle constants
        if (this.CONSTANTS.hasOwnProperty(token.toLowerCase())) {
            index.value++;
            return this.CONSTANTS[token.toLowerCase()];
        }
        
        // Handle functions
        if (this.FUNCTIONS.includes(token.toLowerCase())) {
            const funcName = token.toLowerCase();
            index.value++;
            
            if (index.value >= tokens.length || tokens[index.value] !== '(') {
                throw new Error(`Function ${funcName} must be followed by parentheses`);
            }
            
            index.value++; // Skip opening parenthesis
            
            // Parse function arguments
            const args: (number | number[])[] = [];
            
            if (index.value < tokens.length && tokens[index.value] !== ')') {
                // Parse first argument
                if (tokens[index.value].startsWith('[') && tokens[index.value].endsWith(']')) {
                    // Array argument
                    args.push(this.parseArray(tokens[index.value]));
                    index.value++;
                } else {
                    // Could be a numeric argument or a function call that returns an array
                    const arg = this.parseArgumentExpression(tokens, index);
                    args.push(arg);
                }
                
                // Parse additional arguments (if any)
                while (index.value < tokens.length && tokens[index.value] === ',') {
                    index.value++; // Skip comma
                    
                    if (tokens[index.value].startsWith('[') && tokens[index.value].endsWith(']')) {
                        // Array argument
                        args.push(this.parseArray(tokens[index.value]));
                        index.value++;
                    } else {
                        // Could be a numeric argument or a function call that returns an array
                        const arg = this.parseArgumentExpression(tokens, index);
                        args.push(arg);
                    }
                }
            }
            
            if (index.value >= tokens.length || tokens[index.value] !== ')') {
                throw new Error(`Mismatched parentheses: missing closing parenthesis for function ${funcName}`);
            }
            
            index.value++; // Skip closing parenthesis
            const result = this.evaluateFunction(funcName, args);
            
            // Functions that return arrays cannot be used directly in arithmetic expressions
            // Only in the main expression parsing, not in argument parsing
            if (Array.isArray(result)) {
                throw new Error(`Function ${funcName}() returns an array and cannot be used directly in arithmetic expressions. Arrays can only be used as function arguments.`);
            }
            
            return result;
        }
        
        throw new Error(`Unexpected token: ${token}`);
    }

    /**
     * Validates parentheses matching in the expression
     * @param tokens - Array of tokens to validate
     * @throws Error if parentheses are mismatched
     */
    private static validateParentheses(tokens: string[]): void {
        let openCount = 0;
        
        for (const token of tokens) {
            if (token === '(') {
                openCount++;
            } else if (token === ')') {
                openCount--;
                if (openCount < 0) {
                    throw new Error('Mismatched parentheses: unexpected closing parenthesis');
                }
            }
        }
        
        if (openCount > 0) {
            throw new Error('Mismatched parentheses: missing closing parenthesis');
        }
    }

    /**
     * Evaluates a mathematical expression string
     * @param expression - The mathematical expression to evaluate
     * @returns The calculated result
     * @throws Error if the expression is invalid or evaluation fails
     */
    static evaluate(expression: string): number {
        if (typeof expression !== 'string') {
            throw new Error('Expression must be a string');
        }
        
        if (!expression.trim()) {
            throw new Error('Expression cannot be empty');
        }
        
        try {
            // Tokenize the expression
            const tokens = this.tokenize(expression);
            
            // Validate parentheses
            this.validateParentheses(tokens);
            
            // Parse and evaluate
            const index = { value: 0 };
            const result = this.parseExpression(tokens, index);
            
            // Check if all tokens were consumed
            if (index.value < tokens.length) {
                throw new Error(`Unexpected token at end of expression: ${tokens[index.value]}`);
            }
            
            // Validate the result
            if (isNaN(result) || !isFinite(result)) {
                throw new Error('Expression evaluation resulted in an invalid number');
            }
            
            return result;
            
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Invalid mathematical expression: ${error.message}`);
            } else {
                throw new Error('Invalid mathematical expression: unknown error occurred');
            }
        }
    }
}