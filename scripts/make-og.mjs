#!/usr/bin/env node
/**
 * Renders src/pages/og-card.astro to public/og.png (1200×630), the link-preview image.
 *
 * Usage (with the dev server running in another terminal: `npm run dev`):
 *   npm run og                      # uses http://localhost:4321/og-card/
 *   npm run og -- http://host/og-card/
 *
 * Uses an installed Chrome or Microsoft Edge through playwright-core (no browser download).
 * Set OG_BROWSER=chrome or OG_BROWSER=msedge to pick one.
 */
import { chromium } from 'playwright-core';

const url = process.argv[2] ?? 'http://localhost:4321/og-card/';
const out = 'public/og.png';
const channels = process.env.OG_BROWSER ? [process.env.OG_BROWSER] : ['chrome', 'msedge'];

let browser;
for (const channel of channels) {
  try {
    browser = await chromium.launch({ channel });
    break;
  } catch {
    /* try the next installed browser */
  }
}
if (!browser) {
  console.error('No Chrome or Edge found. Install one, or set OG_BROWSER.');
  process.exit(1);
}

const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, colorScheme: 'light' });
await page.goto(url, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
// The dev server injects Astro's toolbar; keep it out of the image.
await page.addStyleTag({ content: 'astro-dev-toolbar{display:none!important}' });
await page.screenshot({ path: out, clip: { x: 0, y: 0, width: 1200, height: 630 } });
await browser.close();
console.log(`Wrote ${out} from ${url}`);
