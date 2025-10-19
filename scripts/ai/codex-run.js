#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

const args = process.argv.slice(2)
const promptFile = args[args.indexOf('--prompt') + 1]
const rulesDir = args[args.indexOf('--rules') + 1]
const out = args.includes('--out') ? args[args.indexOf('--out') + 1] : null
const apply = args.includes('--apply') ? args[args.indexOf('--apply') + 1] : null

const prompt = fs.readFileSync(promptFile, 'utf-8')
const rules = fs.readdirSync(rulesDir)
  .filter(f => f.startsWith('RULES'))
  .map(f => fs.readFileSync(path.join(rulesDir, f), 'utf-8'))
  .join('\n\n')

const context = fs.existsSync('context.cache.md') ? fs.readFileSync('context.cache.md', 'utf-8') : ''

const input = `${prompt}\n\n---\n\n# RULES\n${rules}\n\n# CONTEXT\n${context}`

// 模拟调用 Codex API
console.log(`\n🧩 [Codex] Running with prompt: ${promptFile}`)
console.log(`→ Using rules from: ${rulesDir}`)

if (out) fs.writeFileSync(out, `# 自动生成内容\n\n${input}`)
if (apply) console.log(`Would apply patch to: ${apply}`)
