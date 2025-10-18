# TypeScript/Node 项目开发规范（精要）
## 分层
- Controller：HTTP 入参校验（zod）、调用 Service、返回标准响应。
- Service：业务编排、事务/重试、幂等控制；禁止直接访问外部 I/O。
- Repository：数据访问（DB/缓存/外部 API 网关）。
- Domain/Model：领域对象与业务规则（不可依赖 Web/框架）。
## 命名与组织
- 目录按模块划分：src/modules/<module>/{controller,service,repository,model}.ts
- 接口/类型：以 `*DTO`、`*Params`、`*Result` 区分语义。
## 错误与日志
- 使用 AppError(code,message,meta)。禁止抛裸 Error。
- pino 记录请求 id、耗时、错误栈；日志脱敏敏感字段。
## 配置
- dotenv 加载；zod 校验；禁止硬编码密钥/URL。
## 测试
- vitest + supertest；覆盖异常路径、边界场景；>=80% 覆盖率。
## 代码风格
- ESLint + Prettier；import 分组：内建/第三方/本地；禁用 any（除非显式注释原因）。
