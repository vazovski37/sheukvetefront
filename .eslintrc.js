module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    settings: {
        react: {
            version: 'detect', // Automatically detect the React version
        },
    },
    env: {
        node: true,
        browser: true,
        es6: true,
        commonjs: true,
    },
    extends: [
        'eslint:recommended', // Basic ESLint rules
        'plugin:react/recommended', // React-specific linting rules
        'plugin:react-hooks/recommended', // Rules for React hooks
        'plugin:@typescript-eslint/recommended', // TypeScript-specific linting rules
        'plugin:@next/next/recommended', // Next.js-specific linting rules
        'prettier', // Prettier integration
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true, // Enable JSX
        },
        ecmaVersion: 2020, // Support modern ECMAScript features
        sourceType: 'module', // Use ES modules
        project: './tsconfig.json', // Path to TypeScript configuration file
    },
    plugins: ['@typescript-eslint', 'react', 'react-hooks'],
    rules: {
        'import/prefer-default-export': 'off', // Allow named exports
        'no-console': 'warn', // Warn on console usage
        'no-nested-ternary': 'off', // Allow nested ternaries
        'no-underscore-dangle': 'off', // Allow dangling underscores in identifiers
        'no-unused-expressions': ['error', { allowTernary: true }], // Allow ternary expressions
        camelcase: 'off', // Disable camelcase enforcement
        'react/self-closing-comp': 'warn', // Warn for unnecessary closing tags
        'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.jsx'] }], // Allow JSX in .tsx and .jsx files
        'react/prop-types': 'off', // Disable prop-types (we're using TypeScript)
        'react/destructuring-assignment': 'off', // Allow props without destructuring
        'react/jsx-no-comment-textnodes': 'off', // Disable warnings for comments in JSX
        'react/jsx-props-no-spreading': 'off', // Allow prop spreading
        'react/no-array-index-key': 'off', // Allow array index as key
        'react/no-unescaped-entities': 'off', // Allow unescaped entities
        'react/require-default-props': 'off', // Disable default props requirement
        'react/react-in-jsx-scope': 'off', // No need to import React in Next.js
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Warn for unused variables, ignore those starting with `_`
        '@typescript-eslint/explicit-module-boundary-types': 'off', // Disable requirement for explicit return types on module exports
        'linebreak-style': ['error', 'unix'], // Enforce Unix-style linebreaks
        semi: ['error', 'never'], // Enforce no semicolons
    },
}
