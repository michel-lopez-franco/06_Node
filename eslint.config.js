import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    ignores: ['**/node_modules/', '**/dist/', '**/.astro/'],
  },
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.node,
    },
    rules: {
      // Los stubs de ejercicios declaran parámetros que el alumno todavía no usa.
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },
  {
    files: ['ejercicios/**/*.js'],
    rules: { 'no-unused-vars': 'off' },
  },
];
