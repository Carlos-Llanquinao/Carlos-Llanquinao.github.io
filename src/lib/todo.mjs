/**
 * Placeholder convention used across the whole site.
 *
 * Anything written as `[TODO: something]` or as an all-caps token such as `[SURNAME]`,
 * `[SECTOR]`, `[YEAR]` is treated as unfinished content. It renders with the hazard-stripe
 * `.todo` style, is listed by `npm run check:todo`, and is kept (marked) in llms-full.txt.
 *
 * Mixed-case brackets like `[SerializeReference]` are NOT placeholders.
 */
export const TODO_PATTERN = /\[(?:TODO[^\]]*|[A-Z][A-Z0-9 _/&–-]*[A-Z0-9])\]/g;

/** True when the string contains at least one placeholder. */
export function hasTodo(value) {
  if (typeof value !== 'string') return false;
  TODO_PATTERN.lastIndex = 0;
  return TODO_PATTERN.test(value);
}

/**
 * Splits a string into plain-text and placeholder parts.
 * @param {string} value
 * @returns {{ text: string, todo: boolean }[]}
 */
export function splitTodo(value) {
  const parts = [];
  let last = 0;
  TODO_PATTERN.lastIndex = 0;
  for (const match of value.matchAll(TODO_PATTERN)) {
    const start = match.index ?? 0;
    if (start > last) parts.push({ text: value.slice(last, start), todo: false });
    parts.push({ text: match[0], todo: true });
    last = start + match[0].length;
  }
  if (last < value.length) parts.push({ text: value.slice(last), todo: false });
  return parts;
}
