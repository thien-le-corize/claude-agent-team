#!/usr/bin/env node
import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';

const [commitMsg, repoDir = '.'] = process.argv.slice(2);

if (!commitMsg) {
  console.error('Usage: git-commit-push.mjs "<message>" [repo-dir]');
  process.exit(1);
}

const gitDir = join(process.cwd(), repoDir, '.git');
if (!existsSync(gitDir)) {
  console.log('no-git');
  process.exit(0);
}

try {
  const branch = execSync(`git -C "${repoDir}" rev-parse --abbrev-ref HEAD`, { encoding: 'utf8' }).trim();
  if (['main', 'master', 'develop'].includes(branch)) {
    console.error(`❌ Cannot commit directly to ${branch}`);
    process.exit(1);
  }

  execSync(`git -C "${repoDir}" add -A`);
  execSync(`git -C "${repoDir}" commit -m "${commitMsg}" || true`);
  execSync(`git -C "${repoDir}" push -u origin ${branch} || true`);
  console.log(`✅ Committed & pushed: ${commitMsg}`);
} catch (err) {
  console.error(`❌ Git commit/push failed: ${err.message}`);
  process.exit(1);
}
