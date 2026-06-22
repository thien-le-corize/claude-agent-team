#!/usr/bin/env node
import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';

const [branchName, repoDir = '.', baseBranch = 'develop'] = process.argv.slice(2);

if (!branchName) {
  console.error('Usage: git-branch.mjs <branch-name> [repo-dir] [base-branch]');
  process.exit(1);
}

const gitDir = join(process.cwd(), repoDir, '.git');
if (!existsSync(gitDir)) {
  console.log('no-git');
  process.exit(0);
}

try {
  execSync(`git -C "${repoDir}" fetch origin ${baseBranch}:${baseBranch} 2>/dev/null || true`);
  execSync(`git -C "${repoDir}" checkout ${baseBranch}`);
  execSync(`git -C "${repoDir}" checkout -b ${branchName}`);
  console.log(`✅ Created branch: ${branchName} from ${baseBranch}`);
} catch (err) {
  console.error(`❌ Git branch failed: ${err.message}`);
  process.exit(1);
}
