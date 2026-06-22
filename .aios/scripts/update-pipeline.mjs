#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const STATE_DIR = join(__dirname, '..', 'state');
const PIPELINE_FILE = join(STATE_DIR, 'pipeline.json');

mkdirSync(STATE_DIR, { recursive: true });

const [stepId, status, message] = process.argv.slice(2);

if (!stepId || !status) {
  console.error('Usage: update-pipeline.mjs <step_id> <status> "<message>"');
  process.exit(1);
}

let pipeline = {};
try {
  pipeline = JSON.parse(readFileSync(PIPELINE_FILE, 'utf8'));
} catch {}

if (!pipeline.steps) pipeline.steps = {};

pipeline.steps[stepId] = {
  status,
  message: message || '',
  timestamp: new Date().toISOString()
};

writeFileSync(PIPELINE_FILE, JSON.stringify(pipeline, null, 2));
console.log(`✅ Pipeline: ${stepId} → ${status}`);
