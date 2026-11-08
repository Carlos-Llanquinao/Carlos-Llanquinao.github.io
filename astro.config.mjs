// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import { remarkTodo } from './src/lib/remark-todo.mjs';

// Deployed as a GitHub Pages *user site* from the repository
// github.com/Carlos-Llanquinao/Carlos-Llanquinao.github.io, served at the domain root, so no `base` path.
export default defineConfig({
  site: 'https://carlos-llanquinao.github.io',
  trailingSlash: 'ignore',
  build: { inlineStylesheets: 'always' },
  markdown: {
    // Wraps [TODO: ...] and [UPPERCASE] placeholders in Markdown bodies with <mark class="todo">.
    processor: unified({ remarkPlugins: [remarkTodo] }),
  },
});
