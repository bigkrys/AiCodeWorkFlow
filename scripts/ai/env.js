// scripts/ai/env.js
const fs = require('fs');
const path = require('path');

function readRunId() {
  const p = '.ai-runid';
  if (!fs.existsSync(p)) {
    console.error('[env] .ai-runid not found. Run "AI · 生成运行ID" first.');
    process.exit(1);
  }
  return fs.readFileSync(p, 'utf8').trim();
}
const RUN_ID = readRunId();
const FEATURE_SLUG = (process.env.FEATURE_SLUG || 'feature-x').trim();
const RUN_ROOT = path.join('runs', `${RUN_ID}-${FEATURE_SLUG}`);

function ensureDirs() {
  const sub = ['ctx', 'spec', 'impl', 'tests', 'docs', 'review'];
  fs.mkdirSync(RUN_ROOT, { recursive: true });
  sub.forEach(d => fs.mkdirSync(path.join(RUN_ROOT, d), { recursive: true }));
}

function cmdJson() {
  ensureDirs();
  process.stdout.write(JSON.stringify({ RUN_ID, FEATURE_SLUG, RUN_ROOT }, null, 2));
}

function cmdGet(key) {
  ensureDirs();
  const map = { RUN_ID, FEATURE_SLUG, RUN_ROOT };
  if (!map[key]) {
    console.error(`[env] unknown key: ${key}`);
    process.exit(2);
  }
  process.stdout.write(map[key]);
}

function cmdJoin(rel) {
  ensureDirs();
  if (!rel) {
    console.error('Usage: node scripts/env.js join <relpath-under-run>');
    process.exit(2);
  }
  const abs = path.join(RUN_ROOT, rel);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  process.stdout.write(abs);
}

function cmdExport() {
  ensureDirs();
  const lines = [
    `RUN_ID=${RUN_ID}`,
    `FEATURE_SLUG=${FEATURE_SLUG}`,
    `RUN_ROOT=${RUN_ROOT}`
  ];
  fs.writeFileSync('.ai-env', lines.join('\n') + '\n');
  process.stdout.write(lines.join('\n'));
}

const [,, sub, arg] = process.argv;
switch (sub) {
  case 'json': cmdJson(); break;
  case 'get': cmdGet(arg); break;
  case 'join': cmdJoin(arg); break;
  case 'export': cmdExport(); break;
  default:
    console.error('Usage: node scripts/env.js [json|get RUN_ID|FEATURE_SLUG|RUN_ROOT|join <rel>|export]');
    process.exit(2);
}
