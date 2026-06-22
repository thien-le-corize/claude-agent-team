#!/usr/bin/env node
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PIPELINE_FILE = join(__dirname, '..', 'state', 'pipeline.json');

try {
  const pipeline = JSON.parse(readFileSync(PIPELINE_FILE, 'utf8'));
  const steps = pipeline.steps || {};

  let hasErrors = false;
  ['pm', 'architect', 'frontend'].forEach(step => {
    if (!steps[step] || steps[step].status !== 'passed') {
      console.error(`❌ Step ${step} not completed`);
      hasErrors = true;
    }
  });

  if (hasErrors) {
    console.error('❌ Workflow validation failed');
    process.exit(1);
  }

  console.log('✅ Workflow validation passed');
} catch (err) {
  console.error('❌ Cannot read pipeline state');
  process.exit(1);
}
