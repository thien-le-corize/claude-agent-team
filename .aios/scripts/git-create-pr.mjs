#!/usr/bin/env node
import { execSync } from 'child_process';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const [title, bodyFile, baseBranch = 'develop', repoDir = '.'] = process.argv.slice(2);

if (!title || !bodyFile) {
  console.error('Usage: git-create-pr.mjs "<title>" <body-file> [base-branch] [repo-dir]');
  process.exit(1);
}

const gitDir = join(process.cwd(), repoDir, '.git');
if (!existsSync(gitDir)) {
  console.log('no-git');
  process.exit(0);
}

try {
  const body = readFileSync(bodyFile, 'utf8');
  const branch = execSync(`git -C "${repoDir}" rev-parse --abbrev-ref HEAD`, { encoding: 'utf8' }).trim();

  execSync(`gh pr create --title "${title}" --body "${body}" --base ${baseBranch} --head ${branch}`, {
    cwd: repoDir,
    stdio: 'inherit'
  });
  console.log(`✅ PR created: ${title}`);
} catch (err) {
  console.log(`⚠️  PR creation skipped (no gh CLI or not authenticated)`);
}
