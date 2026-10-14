# 历史英雄猜猜猜

单人 vs 系统的猜历史人物（武将）小游戏：系统先给出一条范围较大的提示，玩家输入英雄名字进行竞猜；
猜错则显示下一条范围更小的提示，最多 5 次机会；猜对立即获胜展示英雄生平，5 次机会用完仍未猜中则判定失败，
同样展示英雄生平（失败风格呈现）。

## 目录结构

```
packages/
  shared/    # 前后端共享 TS 的类型
  backend/   # Node.js + TypeScript + Express(REST, MVC 分层) + TypeORM
  frontend/  # React + TypeScript + Vite（原生 fetch 调用 REST API）
```

后端采用 MVC 分层：
- **Model**：`entities/Hero.ts`（TypeORM 实体，唯一持久化表）+ `store/`（内存对局状态）
- **Controller**：`controllers/gameController.ts`（处理 HTTP 请求/响应）
- **Service**：`services/`（业务逻辑：抽卡、猜测判定、提示推进）
- **Route**：`routes/`（REST 路由定义）

## REST API

| Method | Path | 说明 |
|---|---|---|
| POST | `/api/games` | 创建新的一局游戏，随机抽取一位英雄，返回 `gameId` 与第一条提示 |
| POST | `/api/games/:gameId/guesses` | 提交一次猜测（body: `{ name }`），返回是否猜对/下一条提示/结束时的英雄生平 |
| GET | `/health` | 健康检查 |

## 快速开始（Docker，推荐）

```bash
cp .env.example .env
docker compose up --build   # 首次：建立镜像 + 自动建 heroes 表 + 灌种子数据
```

打开浏览器访问 <http://localhost:5173>。

- 前端：<http://localhost:5173>
- 后端 REST API：<http://localhost:4000/api>
- 数据库：`localhost:5432`（`kohuser` / `kohpass` / `king_of_history`）

之后修改 `packages/backend/src` 或 `packages/frontend/src` 下任意源码，容器内的
`nodemon` / `vite` 会自动热更新，**无需重新执行 `docker build`**。只有当某个包的
`package.json` 依赖发生变化时才需要 `docker compose up --build`。

> 对局状态（当前局的英雄、已用次数、已展示提示）保存在后端进程内存中，重启 backend
> 容器会导致当前对局重置；只有 `heroes`（英雄卡 + 5 条提示）数据持久化在 PostgreSQL 中。

## 本地不使用 Docker 单独跑（可选）

```bash
corepack enable
pnpm install
# 需要本地或远程有一个可用的 PostgreSQL，并设置好 DATABASE_URL 环境变量
pnpm --filter @king-of-history/backend dev
pnpm --filter @king-of-history/frontend dev
```

## 当前实现状态

单人猜英雄核心闭环已跑通：欢迎页 → 抽卡 + 展示提示 → 输入猜测 → 猜对进入胜利页 /
猜错展示下一条提示 / 5 次用完进入失败页，均通过 REST API + MVC 分层实现。

