import fs from 'fs'
import path from 'path'

const args = process.argv.slice(2)
const get = k => { const i = args.indexOf(k); return i >= 0 ? args[i+1] : null }

const inRoot  = get('--in')   || '.'
const outFile = get('--out')  || 'ai_review_result.md'

const specPath = path.join(inRoot, 'spec/SPEC.md')
const planPath = path.join(inRoot, 'spec/PLAN.md')
const srcDir   = 'src'

const spec = fs.existsSync(specPath) ? fs.readFileSync(specPath, 'utf-8') : ''
const plan = fs.existsSync(planPath) ? fs.readFileSync(planPath, 'utf-8') : ''
const codeFiles = fs.existsSync(srcDir) ? fs.readdirSync(srcDir) : []

let report = `# 🤖 Local AI Review (只审不写)\n\n`
report += `## 文件扫描结果\n`
report += `- SPEC.md: ${spec.length} chars\n- PLAN.md: ${plan.length} chars\n- src/: ${codeFiles.length} files\n\n`
report += `## 可能的问题\n`
report += `- [ ] 检查 TS 类型一致性\n- [ ] 检查错误处理规范\n- [ ] 检查 PLAN 与代码功能是否对齐\n\n`
report += `## 结论\n🟡 需要人工复查\n`

fs.mkdirSync(path.dirname(outFile), { recursive: true })
fs.writeFileSync(outFile, report)
console.log(`✅ 本地 AI 审查完成 → ${outFile}`)
