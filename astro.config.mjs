// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import { remarkTodo } from './src/lib/remark-todo.mjs';

// Deployed as a GitHub Pages *user site* (https://<username>.github.io), so no `base` path.
// Replace the placeholder below with the real URL once the GitHub username is final.
export default defineConfig({
  site: 'https://USERNAME.github.io',
  trailingSlash: 'ignore',
  build: { inlineStylesheets: 'always' },
  markdown: {
    // Wraps [TODO: ...] and [UPPERCASE] placeholders in Markdown bodies with <mark class="todo">.
    processor: unified({ remarkPlugins: [remarkTodo] }),
  },
});
