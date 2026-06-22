#!/usr/bin/env node
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TASKS_DIR = join(__dirname, '..', 'tasks');
mkdirSync(TASKS_DIR, { recursive: true });

const [taskId, status, ...args] = process.argv.slice(2);

if (!taskId || !status) {
  console.error('Usage: update-task.mjs <TASK-ID> <status> [key=value...]');
  process.exit(1);
}

const task = {
  id: taskId,
  status,
  timestamp: new Date().toISOString()
};

args.forEach(arg => {
  const [key, value] = arg.split('=');
  task[key] = value;
});

const TASK_FILE = join(TASKS_DIR, `${taskId}.json`);
writeFileSync(TASK_FILE, JSON.stringify(task, null, 2));
console.log(`✅ Task: ${taskId} → ${status}`);
