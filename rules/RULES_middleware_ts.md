# Middleware / HTTP 层规则

## 结构
- 中间件放 `src/middleware/`
- 每个中间件导出函数 `(req, res, next)`
- 必须声明类型：`RequestHandler<ReqType, ResType>`

## 校验
- 请求参数校验使用 `zod` 或 `class-validator`
- 响应格式统一 `{ success, data?, error? }`
- 所有外部 HTTP 调用封装在 `src/clients/*`

## 安全
- 过滤敏感头部（Authorization、Cookie）
- 所有跨域请求必须启用 `cors` 白名单机制
- 拒绝大体积 JSON (>5MB)

## 性能
- 限流、缓存、重试统一使用 `src/middleware/rate-limit.ts`
