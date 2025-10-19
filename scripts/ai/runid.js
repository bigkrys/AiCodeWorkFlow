// scripts/runid.js
const fs = require('fs');
const path = require('path');

const slug = process.env.FEATURE_SLUG || 'feature-x';
const pad = n => String(n).padStart(2, '0');
const now = new Date();
const RUN_ID = [
  now.getFullYear(),
  pad(now.getMonth() + 1),
  pad(now.getDate())
].join('') + '-' + [pad(now.getHours()), pad(now.getMinutes()), pad(now.getSeconds())].join('');

const OUT_DIR = path.join('docs', 'runs', `${RUN_ID}-${slug}`);
fs.mkdirSync(OUT_DIR, { recursive: true });

// 同时输出一份 .env 片段供 shell 使用
fs.writeFileSync('.ai-env', `RUN_ID=${RUN_ID}\nFEATURE_SLUG=${slug}\nOUT_DIR=${OUT_DIR}\n`, 'utf8');

// 将 RUN_ID 打印回 stdout 供 tasks.json 做可视化/调试
process.stdout.write(RUN_ID);
