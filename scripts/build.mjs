import { readdir, mkdir, copyFile, rm } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const skillsDir = join(root, 'skills');
const claudeDir = join(root, '.claude', 'commands');
const codexDir = join(root, '.codex', 'skills');

async function build() {
  await rm(claudeDir, { recursive: true, force: true });
  await rm(codexDir, { recursive: true, force: true });
  await mkdir(claudeDir, { recursive: true });
  await mkdir(codexDir, { recursive: true });

  const files = await readdir(skillsDir);
  const skillFiles = files.filter(f => f.endsWith('.md'));

  for (const file of skillFiles) {
    const name = file.replace('.md', '');
    const src = join(skillsDir, file);

    await copyFile(src, join(claudeDir, file));

    const codexSkillDir = join(codexDir, name);
    await mkdir(codexSkillDir, { recursive: true });
    await copyFile(src, join(codexSkillDir, 'SKILL.md'));

    console.log(`  ${name} → .claude/commands/${file}  .codex/skills/${name}/SKILL.md`);
  }

  console.log(`\nBuilt ${skillFiles.length} skills.`);
}

build().catch(err => { console.error(err); process.exit(1); });
