# TypeScript 开发规则

## 通用
- 所有代码必须通过 TS 编译（`noImplicitAny` 打开）
- 使用 async/await，不使用 then 链。
- 明确 Promise 返回类型。
- 严禁使用 `any` 或 `as unknown as`。
- 枚举、常量统一放 `src/constants`。

## 命名
- 函数：camelCase
- 类：PascalCase
- 接口：I 前缀禁止（直接 PascalCase）
- 文件名：小写 + 中划线，例如 `user-service.ts`

## 错误处理
- 捕获异常必须使用自定义错误类（`AppError`）
- 所有错误必须含 `code` 与 `message` 字段。
- 返回 HTTP 层时，封装为 `{ success, data?, error? }`

## 日志/监控
- 关键步骤打印 `logger.info` 或 `logger.error`
- 不打印敏感信息（token、password）

## 单测可测性
- 函数外部依赖通过参数注入
- 不依赖全局状态
