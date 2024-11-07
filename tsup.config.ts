import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'], // adjust entry point
    loader: {
    '.md': 'text',         // treat Markdown files as plain text
  },
});
