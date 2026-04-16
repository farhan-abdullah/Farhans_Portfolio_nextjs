import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'payload-types.ts',
      'app/(payload)/admin/importMap.js',
      'media/**',
    ],
  },
  ...compat.extends('next/core-web-vitals'),
];
