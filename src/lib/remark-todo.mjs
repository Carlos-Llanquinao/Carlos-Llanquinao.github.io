import { splitTodo, hasTodo } from './todo.mjs';

/**
 * Remark plugin: turns placeholder tokens inside Markdown text nodes into
 * `<mark class="todo">` so case-study bodies get the same hazard styling as frontmatter.
 * Inline code and code blocks are left untouched.
 */
export function remarkTodo() {
  return (tree) => walk(tree);
}

function walk(node) {
  if (!node.children) return;
  const next = [];
  for (const child of node.children) {
    if (child.type === 'text' && hasTodo(child.value)) {
      for (const part of splitTodo(child.value)) {
        next.push(
          part.todo
            ? { type: 'html', value: `<mark class="todo">${escapeHtml(part.text)}</mark>` }
            : { type: 'text', value: part.text },
        );
      }
    } else {
      if (child.type !== 'code' && child.type !== 'inlineCode') walk(child);
      next.push(child);
    }
  }
  node.children = next;
}

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
