root/
  .vscode/
    tasks.json
  .github/
    copilot-instructions.md        # Copilot 的项目级 Rules
    workflows/ai-review.yml        # PR上只审不写 Gate
  .prompts/
    01_project_understanding.md    # “项目梳理文档Rule”对应的提示模板
    02_solution_design.md          # “技术方案详细设计Rule”提示模板
    03_code_impl.md                # “根据技术方案生成代码”模板
    04_unit_test.md                # “生成单测”模板
    05_flow_analysis.md            # “梳理项目Rule”（代码流程深挖）
    99_research.md                 # 深度研究模板（切 Claude/Perplexity）
  rules/
    RULES_docs_spec.md             # 〈项目文档规范〉
    RULES_flow_analysis.md         # 〈代码分析规则〉
    RULES_solution_spec.md         # 〈技术方案设计文档规范〉
    RULES_ts_dev_guidelines.md     # 〈TypeScript 项目开发规范
    RULES_ts_dev_guidelines.md       # TypeScript/Node 通用开发规范
    RULES_docs_spec.md               # 文档规范
    RULES_solution_spec.md           # 技术方案模板
    RULES_flow_analysis.md           # 代码/业务流程分析模板
    RULES_middleware_ts.md           # HTTP/中间件设计规范

    RULES_prd_generation.md          # 原 cursor-rules/PRD.rule.md
    RULES_task_generation.md         # 原 cursor-rules/TASKS.rule.md
    RULES_tasklist_execution.md      # 原 cursor-rules/TASKLIST.rule.md
  scripts/
    ai/
      codex-run.js                 # 统一 Codex 入口（会自动合并 Rules+上下文）
      inject-context.js            # 轻量 RAG：docs/与git diff 摘要注入
      provider.js                  # 根据阶段选择 Codex/Claude/Perplexity
    mcp/
      dingtalk-docs.sh             # 占位：钉钉搜索（CLI），输出 markdown
      task-split.sh                # 占位：任务分解（CLI），输出 checklist
  docs/                            # 所有 AI 产出的文档都落在这里
  src/                             # 代码
  spec/
    SPEC.md          # 规格：WHAT（约束、用例、接口、示例、边界、不可变）
    PLAN.md          # 方案计划：HOW的大轮廓（架构选择、影响面、权衡）
    TASKS.md         # 可执行任务：拆分为可指派的最小工作单元
  tests/                           # 单测/契约测
  package.json
