import fs from 'fs'
import path from 'path'

const roots = process.argv.includes('--sources')
  ? process.argv[process.argv.indexOf('--sources') + 1].split(',')
  : ['src', 'docs', 'spec', 'rules', '.prompts', 'package.json', 'tsconfig.json']

const MAX_PER_FILE = 4000; // 每文件最多截断 4k chars

function listAll(p) {
  if (!fs.existsSync(p)) return [];
  const st = fs.statSync(p);
  if (st.isFile()) return [p];
  return fs.readdirSync(p).flatMap(f => listAll(path.join(p, f)));
}

let content = '# Context Snapshot\n';
for (const root of roots) {
  for (const file of listAll(root)) {
    const ok = /\.(md|ts|tsx|js|json)$/.test(file);
    if (!ok) continue;
    const raw = fs.readFileSync(file, 'utf-8');
    const body = raw.slice(0, MAX_PER_FILE);
    content += `\n\n## ${file}\n\`\`\`${path.extname(file).slice(1) || 'txt'}\n${body}\n\`\`\`\n`;
  }
}

fs.writeFileSync('context.cache.md', content);
console.log('✅ Context built → context.cache.md');
