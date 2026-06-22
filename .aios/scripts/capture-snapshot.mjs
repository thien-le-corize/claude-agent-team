#!/usr/bin/env node
import { execSync } from 'child_process';
import { mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCREENSHOTS_DIR = join(__dirname, '..', 'screenshots');
mkdirSync(SCREENSHOTS_DIR, { recursive: true });

const [url, env, label] = process.argv.slice(2);

if (!url || !env || !label) {
  console.error('Usage: capture-snapshot.mjs <url> <env> <label>');
  process.exit(1);
}

const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
const filename = `${env}-${label}-${timestamp}.png`;
const filepath = join(SCREENSHOTS_DIR, filename);

try {
  execSync(`npx playwright screenshot "${url}" "${filepath}" --full-page 2>/dev/null`, {
    timeout: 10000
  });
  console.log(`✅ Screenshot: ${filename}`);
} catch (err) {
  console.log(`⚠️  Screenshot skipped: ${err.message}`);
}
