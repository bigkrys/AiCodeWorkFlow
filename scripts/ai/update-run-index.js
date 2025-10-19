// scripts/ai/update-run-index.js
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function readEnv() {
  const meta = JSON.parse(require('child_process').execSync('node scripts/ai/env.js json').toString());

  return meta;
}
const { RUN_ROOT } = readEnv();

const artifactPath = process.argv[2];   // 绝对或相对 RUN_ROOT
const kind = process.argv[3];           // SPEC|PLAN|TASKS|IMPL|TESTS|FLOW|RESEARCH|REVIEW
if (!artifactPath || !kind) {
  console.error('Usage: node scripts/update-run-index.js <artifactPath> <kind>');
  process.exit(1);
}
const abs = path.isAbsolute(artifactPath) ? artifactPath : path.join(RUN_ROOT, artifactPath);
if (!fs.existsSync(abs)) {
  console.error(`[index] not found: ${abs}`);
  process.exit(2);
}
const rel = path.relative(RUN_ROOT, abs);
const sha1 = crypto.createHash('sha1').update(fs.readFileSync(abs)).digest('hex');

const idxPath = path.join(RUN_ROOT, 'index.json');
let idx = { artifacts: {} };
if (fs.existsSync(idxPath)) idx = JSON.parse(fs.readFileSync(idxPath, 'utf8'));
idx.artifacts[kind] ||= [];
idx.artifacts[kind].push({
  path: rel,
  sha1,
  size: fs.statSync(abs).size,
  mtime: new Date().toISOString()
});
fs.writeFileSync(idxPath, JSON.stringify(idx, null, 2));
console.log(`[index] ${kind} -> ${rel}`);
