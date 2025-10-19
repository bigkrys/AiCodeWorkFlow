# 技术方案规则（PLAN）

## 目标
1. 将 SPEC 中的“WHAT”变为可实现的“HOW”。
2. 输出 `docs/<feature>/PLAN.md`，用于指导开发任务与架构决策。

## 内容规范
- 方案必须包含模块图、接口分层、数据流。
- 所有关键决策需说明理由、替代方案、风险。
- 代码目录命名统一：  
  `src/controllers/`、`src/services/`、`src/repositories/`、`src/utils/`
- 提出任务拆分（TASKS 草案）：编号 + 目标 + 产物路径。
- 对外暴露接口要遵循 RESTful 或 GraphQL 约定。

## 格式约束
- 所有 TS 代码块必须编译通过。
- Mermaid 图用于描述模块交互。
- 每节结尾添加 “✅ 输出产物：<文件路径>”

## 输出控制
- 文件：`docs/<feature>/PLAN.mdd`（主）
- 若参数 `--deep` 存在，额外生成 `docs/<feature>/方案设计.md`
