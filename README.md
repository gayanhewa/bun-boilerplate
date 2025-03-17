# Bun Express TypeScript Project

A simple Express.js application built with Bun and TypeScript, including unit and integration tests.

## Prerequisites

- [Bun](https://bun.sh/) installed on your system
- Node.js (for development tools)

## Installation

```bash
# Install dependencies
bun install
```

## Running the Application

```bash
# Start the development server with hot reload
bun run dev

# Start the production server
bun run start
```

## Running Tests

```bash
# Run all tests
bun test

# Run unit tests only
bun run test:unit

# Run integration tests only
bun run test:integration
```

## API Endpoints

- `GET /api/health` - Health check endpoint

## Project Structure

```
.
├── src/
│   ├── index.ts           # Main application file
│   └── __tests__/
│       ├── unit/         # Unit tests
│       └── integration/  # Integration tests
├── package.json
├── tsconfig.json
└── README.md
``` 