#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

const args = process.argv.slice(2)
const get = k => { const i = args.indexOf(k); return i >= 0 ? args[i+1] : null }

const promptFile = get('--prompt')
const rulesPath  = get('--rules')
const out        = get('--out')
const apply      = get('--apply')
const inFile     = get('--in')

const prompt = promptFile ? fs.readFileSync(promptFile, 'utf-8') : ''
let rules = ''
if (rulesPath) {
  const stat = fs.statSync(rulesPath)
  if (stat.isDirectory()) {
    rules = fs.readdirSync(rulesPath)
      .filter(f => f.startsWith('RULES'))
      .map(f => fs.readFileSync(path.join(rulesPath, f), 'utf-8'))
      .join('\n\n')
  } else {
    rules = fs.readFileSync(rulesPath, 'utf-8')
  }
}
const context = fs.existsSync('context.cache.md') ? fs.readFileSync('context.cache.md', 'utf-8') : ''
const prior   = inFile && fs.existsSync(inFile) ? fs.readFileSync(inFile, 'utf-8') : ''

const input = [
  `# PROMPT\n${prompt}`,
  `\n---\n# RULES\n${rules}`,
  `\n---\n# PRIOR\n${prior}`,
  `\n---\n# CONTEXT\n${context}`
].join('\n')

console.log(`\n🧩 [Codex] prompt=${promptFile}\n→ rules=${rulesPath}\n→ in=${inFile || '(none)'}\n`)

function nextVersionPath(p) {
  if (!fs.existsSync(p)) return p;
  const { dir, name, ext } = path.parse(p);
  const m = name.match(/^(.*)-v(\d+)$/);
  if (m) {
    const base = m[1], n = parseInt(m[2], 10) + 1;
    return nextVersionPath(path.join(dir, `${base}-v${n}${ext}`));
  }
  return nextVersionPath(path.join(dir, `${name}-v2${ext}`));
}

if (out) {
  fs.mkdirSync(path.dirname(out), { recursive: true });
  const finalOut = nextVersionPath(out);     // ← 使用滚动版本
  fs.writeFileSync(finalOut, `# 自动生成内容\n\n${input}`);
  console.log(`→ out: ${finalOut}`);
}
if (apply) {
  console.log(`(dry-run) would apply to: ${apply}`)
}

  