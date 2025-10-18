# 中间件/HTTP 客户端规范（TS/Node）
- 统一客户端：src/shared/http.ts 暴露 httpClient（axios 或 fetch 封装）
- 功能：请求超时、重试（指数退避）、请求/响应日志、错误归一化（AppError）
- 必须传递 requestId（header: x-request-id），并落日志
- 对外服务响应需用 zod 校验解析，失败即抛业务错误（ErrorBusiness）
- 可选本地缓存（lru-cache）用于热点查询，设置合理 TTL
