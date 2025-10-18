# 项目协作说明（Copilot 指南 · TS/Node）
你在本仓库中生成/补全代码时，必须遵循以下规则要点（精简版）：
- 结构：controller → service → repository → domain/model，禁止跨层耦合。
- 命名：文件 kebab-case，类/类型 PascalCase，变量 camelCase。
- 错误：使用 src/shared/AppError.ts 的统一错误体系（含错误码）。
- 日志：使用 pino，在入口中注入 logger。不要 console.log。
- 配置：使用 dotenv + zod 校验，禁止硬编码 URL/密钥。
- HTTP 客户端：统一用 undici(fetch) 或 axios，并启用请求/响应拦截器、超时、重试（axios-retry/p-retry）。
- 数据校验：接口输入输出用 zod 校验；DTO/返回值必须严格匹配 schema。
- 测试：用 vitest + supertest，优先表驱动 + 边界用例，最低覆盖率 80%。
- 文档：所有架构/方案/流程文档放在 /docs 下，按 RULES_docs_spec.md 的结构组织。
