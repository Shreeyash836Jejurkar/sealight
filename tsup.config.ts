import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['index.ts'],
  format: ['esm'],
  outDir: 'dist',
  clean: true,
  splitting: false,
  dts: false,
  outExtension: () => ({ js: '.mjs' }),
});