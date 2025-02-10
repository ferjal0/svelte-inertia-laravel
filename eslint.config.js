import eslint from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginSvelte from 'eslint-plugin-svelte';
import svelteParser from 'svelte-eslint-parser';

export default [
    { ignores: ['dist', 'node_modules', 'vendor', 'public', 'bootstrap'] },
    {
        files: ['**/*.{js,ts}'],
        ...eslint.configs.recommended,
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parser: tsParser,
            parserOptions: {
                project: './tsconfig.eslint.json',
            },
            globals: {
                document: 'readonly',
                window: 'readonly',
                console: 'readonly',
            },
        },
        plugins: {
            '@typescript-eslint': tseslint,
            prettier: eslintPluginPrettier,
        },
        rules: {
            ...tseslint.configs.recommended.rules,
            'prettier/prettier': 'error',
        },
    },
    {
        files: ['**/*.svelte'],
        plugins: {
            svelte: eslintPluginSvelte,
            '@typescript-eslint': tseslint,
            prettier: eslintPluginPrettier,
        },
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parser: svelteParser,
            parserOptions: {
                parser: {
                    ts: tsParser,
                    js: tsParser,
                },
                extraFileExtensions: ['.svelte'],
            },
            globals: {
                document: 'readonly',
                window: 'readonly',
                console: 'readonly',
            },
        },
        rules: {
            ...tseslint.configs.recommended.rules,
            'prettier/prettier': 'error',
            'svelte/valid-compile': 'error',
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'off',
            '@typescript-eslint/no-unsafe-call': 'off',
        },
    },
];
