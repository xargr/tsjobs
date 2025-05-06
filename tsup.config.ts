import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  target: 'node20',
  clean: true,
  outDir: 'dist',
  splitting: false,
  banner: {
    js: '#!/usr/bin/env node',
  },
})
