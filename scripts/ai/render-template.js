// scripts/ai/render-template.js
const fs = require('fs');
const path = require('path');

function vars() {
  const meta = JSON.parse(require('child_process').execSync('node scripts/ai/env.js json').toString());
  return meta;
}
const { RUN_ID, FEATURE_SLUG, RUN_ROOT } = vars();

const [,, inPath, outPath] = process.argv;
if (!inPath || !outPath) {
  console.error('Usage: node scripts/ai/render-template.js <input.md> <output.md>');
  process.exit(1);
}
const tpl = fs.readFileSync(inPath, 'utf8');
const out = tpl
  .replace(/{{\s*RUN_ID\s*}}/g, RUN_ID)
  .replace(/{{\s*FEATURE_SLUG\s*}}/g, FEATURE_SLUG)
  .replace(/{{\s*RUN_ROOT\s*}}/g, RUN_ROOT);

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, out);
console.log(`[render] ${inPath} -> ${outPath}`);
