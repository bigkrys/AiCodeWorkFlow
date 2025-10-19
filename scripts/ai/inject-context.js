import fs from 'fs'
import path from 'path'

const sources = process.argv.includes('--sources')
  ? process.argv[process.argv.indexOf('--sources') + 1].split(',')
  : ['src', 'docs', 'spec']

let content = ''
for (const src of sources) {
  if (fs.existsSync(src)) {
    const files = fs.readdirSync(src)
    for (const f of files) {
      if (f.endsWith('.md') || f.endsWith('.ts')) {
        content += `\n\n## ${src}/${f}\n` + fs.readFileSync(path.join(src, f), 'utf-8').slice(0, 2000)
      }
    }
  }
}
fs.writeFileSync('context.cache.md', content)
console.log('✅ Context built → context.cache.md')
