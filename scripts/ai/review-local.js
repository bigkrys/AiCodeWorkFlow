import fs from 'fs'
import path from 'path'

const spec = fs.readFileSync('spec/SPEC.md', 'utf-8')
const plan = fs.readFileSync('spec/PLAN.md', 'utf-8')
const codeFiles = fs.readdirSync('src')

let report = `# 🤖 Local AI Review (只审不写)\n\n`
report += `## 文件扫描结果\n`
report += `- SPEC.md: ${spec.length} chars\n- PLAN.md: ${plan.length} chars\n- src/: ${codeFiles.length} files\n\n`
report += `## 可能的问题\n`
report += `- [ ] 检查 TS 类型一致性\n- [ ] 检查错误处理规范\n- [ ] 检查 PLAN 与代码功能是否对齐\n\n`
report += `## 结论\n🟡 需要人工复查`

fs.writeFileSync('ai_review_result.md', report)
console.log('✅ 本地 AI 审查完成 → ai_review_result.md')
