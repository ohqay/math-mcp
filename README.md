# Math Tools

```
███╗   ███╗ █████╗ ████████╗██╗  ██╗    ████████╗ ██████╗  ██████╗ ██╗     ███████╗
████╗ ████║██╔══██╗╚══██╔══╝██║  ██║    ╚══██╔══╝██╔═══██╗██╔═══██╗██║     ██╔════╝
██╔████╔██║███████║   ██║   ███████║       ██║   ██║   ██║██║   ██║██║     ███████╗
██║╚██╔╝██║██╔══██║   ██║   ██╔══██║       ██║   ██║   ██║██║   ██║██║     ╚════██║
██║ ╚═╝ ██║██║  ██║   ██║   ██║  ██║       ██║   ╚██████╔╝╚██████╔╝███████╗███████║
╚═╝     ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝       ╚═╝    ╚═════╝  ╚═════╝ ╚══════╝╚══════╝
```

A comprehensive Model Context Protocol (MCP) server that provides LLMs with **34+ mathematical tools** and a powerful **expression evaluator**. Transform your AI assistant into a mathematical computation powerhouse with support for everything from basic arithmetic to advanced statistical analysis and data science operations.

## 🚀 Features

### **Expression Evaluator**

The `evaluate` tool is the most powerful feature, allowing complex mathematical expressions in a single call:

- **Complex Mathematical Expressions**: Evaluate sophisticated mathematical expressions 
- **Function Composition**: Chain mathematical functions together seamlessly
- **Array Support**: Use array notation `[1,2,3,4,5]` directly in expressions
- **Operator Support**: Full support for `+`, `-`, `*`, `/`, `^` (power), `%` (modulo) operators
- **Constants**: Built-in mathematical constants (`pi`, `e`)
- **Precedence Handling**: Proper mathematical operator precedence and parentheses support

### **Professional Error Handling**

- Comprehensive input validation with clear, descriptive error messages
- Graceful handling of edge cases (division by zero, empty arrays, etc.)
- Type safety with Zod schema validation

## 📦 Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/ohqay/math-tools.git
    cd math-tools
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Build the project:**

    ```bash
    npm run build
    ```

4. **Configure Claude Desktop** by adding to your MCP settings:

    ```json
    {
        "mcpServers": {
            "math": {
                "command": "node",
                "args": ["PATH/TO/PROJECT/math-tools/build/index.js"]
            }
        }
    }
    ```

    Replace `PATH/TO/PROJECT` with the actual path where you cloned the repository.

## 💡 Usage Examples

### Expression Evaluator

The `evaluate` tool is the most powerful feature, allowing complex mathematical expressions:

```javascript
// Financial calculations
evaluate('(1 + 0.05)^10 * 10000'); // → Compound interest: $16,288.95

// Statistics with embedded calculations
evaluate('mean([1,2,3,4,5]) + variance([10,20,30,40,50])'); // → Mean + variance

// Advanced mathematical operations
evaluate('factorial(5) + gcd(48, 18) * sqrt(16)'); // → 120 + 6 * 4 = 144

// Machine learning preprocessing
evaluate('correlation([1,2,3,4], [2,4,6,8]) * 100'); // → Perfect correlation: 100

// Complex statistical analysis
evaluate('zscore(85, mean([70,75,80,85,90]), standardDeviation([70,75,80,85,90]))');

// Modulo operations in expressions
evaluate('17 % 5 + power(2, 3)'); // → 2 + 8 = 10
evaluate('(100 % 7) * factorial(3)'); // → 2 * 6 = 12
```

### Individual Tool Usage

Each mathematical operation is also available as a standalone tool:

```javascript
// Basic arithmetic
add(15, 27); // → 42
multiply(6, 7); // → 42
power(2, 10); // → 1024

// Modulo operations
modulo(17, 5); // → 2 (remainder when 17 is divided by 5)
remainder(17, 5); // → 2 (IEEE 754 remainder operation)
modulo(100, 7); // → 2 (checking divisibility)
modulo(123, 10); // → 3 (extracting last digit)

// Statistical analysis
mean([85, 92, 78, 96, 88]); // → 87.8
standardDeviation([10, 12, 14, 16, 18]); // → 2.83
percentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 75); // → 7.75

// Data science operations
normalizeArray([10, 20, 30, 40, 50]); // → [0, 0.25, 0.5, 0.75, 1]
correlation([1, 2, 3, 4, 5], [2, 4, 6, 8, 10]); // → 1 (perfect positive correlation)
```

## 🔧 Tool Reference

### Basic Arithmetic

| Tool       | Parameters                    | Description                        |
| ---------- | ----------------------------- | ---------------------------------- |
| `add`      | `firstNumber`, `secondNumber` | Addition of two numbers            |
| `subtract` | `minuend`, `subtrahend`       | Subtraction (minuend - subtrahend) |
| `multiply` | `firstNumber`, `secondNumber` | Multiplication of two numbers      |
| `division` | `numerator`, `denominator`    | Division with zero-check           |
| `sum`      | `numbers[]`                   | Sum all numbers in array           |
| `modulo`   | `dividend`, `divisor`         | Modulo operation (dividend % divisor) |
| `remainder`| `dividend`, `divisor`         | IEEE 754 remainder operation       |
| `power`    | `base`, `exponent`            | Exponentiation (base^exponent)     |
| `sqrt`     | `number`                      | Square root calculation            |
| `abs`      | `number`                      | Absolute value                     |

### Advanced Mathematics

| Tool        | Parameters | Description                |
| ----------- | ---------- | -------------------------- |
| `factorial` | `n` (≥0)   | Factorial calculation (n!) |
| `gcd`       | `a`, `b`   | Greatest Common Divisor    |
| `lcm`       | `a`, `b`   | Least Common Multiple      |
| `floor`     | `number`   | Round down to integer      |
| `ceiling`   | `number`   | Round up to integer        |
| `round`     | `number`   | Round to nearest integer   |

### Precision Rounding

| Tool               | Parameters                | Description                 |
| ------------------ | ------------------------- | --------------------------- |
| `roundToPrecision` | `number`, `decimalPlaces` | Round to N decimal places   |
| `floorToPrecision` | `number`, `decimalPlaces` | Floor to N decimal places   |
| `ceilToPrecision`  | `number`, `decimalPlaces` | Ceiling to N decimal places |

### Statistical Analysis

| Tool                | Parameters               | Description                    |
| ------------------- | ------------------------ | ------------------------------ |
| `mean`              | `numbers[]`              | Arithmetic mean (average)      |
| `median`            | `numbers[]`              | Middle value of sorted dataset |
| `mode`              | `numbers[]`              | Most frequent value(s)         |
| `min`               | `numbers[]`              | Minimum value                  |
| `max`               | `numbers[]`              | Maximum value                  |
| `variance`          | `numbers[]`              | Population variance            |
| `standardDeviation` | `numbers[]`              | Population standard deviation  |
| `range`             | `numbers[]`              | Max - Min difference           |
| `percentile`        | `numbers[]`, `p` (0-100) | Value at percentile p          |

### Machine Learning & Data Science

| Tool               | Parameters                | Description                       |
| ------------------ | ------------------------- | --------------------------------- |
| `correlation`      | `xArray[]`, `yArray[]`    | Pearson correlation coefficient   |
| `covariance`       | `xArray[]`, `yArray[]`    | Sample covariance                 |
| `zscore`           | `value`, `mean`, `stdDev` | Standard score calculation        |
| `normalizeArray`   | `numbers[]`               | Min-max normalization (0-1 scale) |
| `standardizeArray` | `numbers[]`               | Z-score standardization           |

### Expression Evaluator

| Tool       | Parameters            | Description                               |
| ---------- | --------------------- | ----------------------------------------- |
| `evaluate` | `expression` (string) | Evaluate complex mathematical expressions |

**Supported in expressions:**

- **Operators**: `+`, `-`, `*`, `/`, `^` (power), `%` (modulo)
- **Constants**: `pi`, `e`
- **Functions**: All 33+ mathematical tools listed above
- **Arrays**: `[1,2,3,4,5]` notation for statistical functions
- **Parentheses**: Full support for grouping and precedence

## 🎯 Real-World Applications

### Financial Analysis

```javascript
// Investment growth calculation
evaluate('10000 * (1 + 0.07)^20'); // $38,696.84 after 20 years at 7%

// Risk assessment using standard deviation
standardDeviation([12.5, 15.2, 8.7, 18.9, 11.3]); // Portfolio volatility
```

### Data Science & Analytics

```javascript
// Correlation analysis
correlation([100, 150, 200, 250, 300], [25, 30, 35, 40, 45]); // → 1.0

// Data preprocessing pipeline
evaluate('mean(normalizeArray([10, 20, 30, 40, 50]))'); // → 0.5
```

### Statistical Research

```javascript
// Population analysis
evaluate(
    'zscore(175, mean([160, 165, 170, 175, 180]), standardDeviation([160, 165, 170, 175, 180]))'
);

// Percentile calculations for distributions
percentile([45, 52, 58, 61, 66, 72, 78, 83, 89, 95], 90); // → 91.5
```

### Engineering Calculations

```javascript
// Complex mathematical formulas
evaluate('sqrt(power(3, 2) + power(4, 2))'); // → 5 (Pythagorean theorem)

// Precision engineering
roundToPrecision(3.14159265359, 4); // → 3.1416
```

### Programming & Algorithm Applications

```javascript
// Checking divisibility
modulo(128, 8); // → 0 (128 is divisible by 8)
modulo(129, 8); // → 1 (129 is not divisible by 8)

// Cycling through values (circular arrays)
evaluate('5 % 3'); // → 2 (index 5 maps to position 2 in 3-element array)
evaluate('(10 + 7) % 12'); // → 5 (hours calculation: 10 AM + 7 hours = 5 PM)

// Hash table indexing
modulo(1337, 101); // → 17 (hash value 1337 maps to bucket 17 in 101-bucket table)

// Digital signal processing
evaluate('modulo(123456, power(10, 3))'); // → 456 (extract last 3 digits)

// Game development (wrapping coordinates)
evaluate('(playerX + moveX) % mapWidth'); // Wrap player position on game map
```

## ⚙️ Technical Specifications

- **MCP SDK Version**: 1.6.0+
- **Node.js**: ES Modules support required
- **TypeScript**: Full type safety with Zod validation
- **Precision**: IEEE 754 double-precision floating point
- **Array Size**: No arbitrary limits (memory-constrained)
- **Expression Complexity**: Supports deeply nested expressions
- **Error Handling**: Comprehensive validation and user-friendly messages

## 🛡️ Error Handling

Math Tools provides robust error handling for all edge cases:

- **Division by zero**: Clear error messages for division and modulo operations
- **Invalid inputs**: Type validation with descriptive feedback
- **Empty arrays**: Minimum element requirements enforced
- **Malformed expressions**: Detailed parsing error information
- **Numerical overflow**: Proper handling of infinite/NaN results
- **Array length mismatches**: Validation for paired datasets

## 🚀 Getting Started

1. **Install** Math Tools using Smithery or manual setup
2. **Restart Claude Desktop** to load the new MCP server
3. **Test with simple operations**: Try `add(2, 3)` or `mean([1,2,3,4,5])`
4. **Explore the expression evaluator**: Use `evaluate("sqrt(16) + power(2, 3)")`
5. **Build complex calculations**: Combine multiple functions and operations

## 📝 License

MIT License - feel free to use in your projects!

---

**Transform your AI assistant into a mathematical powerhouse with 34+ tools and unlimited expression complexity.** 🧮✨
