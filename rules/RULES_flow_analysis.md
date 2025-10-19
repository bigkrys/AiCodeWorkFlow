# 代码流程分析规则

## 输出目标
- 文件：`docs/<feature>-flow.md`
- 格式：Markdown + Mermaid + 文本树

## 内容要求
1. 入口函数签名与文件路径
2. 调用链（函数名 → 被调用函数）
3. Mermaid 时序图（sequenceDiagram）
4. 数据流（输入→处理→输出）
5. 外部依赖表（HTTP/DB/Cache）
6. 不一致清单（与 SPEC 差异）
7. 改进建议（TODO）

## 标准
- 以真实调用关系为准（非注释推测）
- 忽略 util/helper 层
- 所有函数链不少于三层调用时必须绘制 Mermaid 图
