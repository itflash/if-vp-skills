import { cp, readdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homedir } from 'node:os';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const home = homedir();

const claudeTarget = join(home, '.claude', 'commands');
const codexTarget = join(home, '.codex', 'skills');

async function deploy() {
  // Claude Code: flat files
  const claudeSrc = join(root, '.claude', 'commands');
  const claudeFiles = await readdir(claudeSrc);
  for (const f of claudeFiles.filter(f => f.endsWith('.md'))) {
    await cp(join(claudeSrc, f), join(claudeTarget, f));
    console.log(`  Claude Code: ${f}`);
  }

  // Codex: directory + SKILL.md
  const codexSrc = join(root, '.codex', 'skills');
  const codexDirs = await readdir(codexSrc);
  for (const d of codexDirs) {
    await cp(join(codexSrc, d), join(codexTarget, d), { recursive: true });
    console.log(`  Codex: ${d}/SKILL.md`);
  }

  const count = claudeFiles.filter(f => f.endsWith('.md')).length;
  console.log(`\nDeployed ${count} skills.`);
}

deploy().catch(err => { console.error(err); process.exit(1); });
