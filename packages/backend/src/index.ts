import 'reflect-metadata';
import express from 'express';
import cors from 'cors';

import { env } from './config/env';
import { initDatabase } from './bootstrap/initDatabase';
import { runSeed } from './bootstrap/seed';
import { startGameStoreCleanupTimer } from './store/gameStore';
import { apiRouter } from './routes';
import { errorHandler } from './middlewares/errorHandler';
import { logger } from './utils/logger';

async function main() {
  await initDatabase();
  await runSeed();
  startGameStoreCleanupTimer();

  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get('/health', (_req, res) => res.json({ ok: true }));
  app.use('/api', apiRouter);

  // 统一错误处理中间件，必须放在所有路由之后。
  app.use(errorHandler);

  app.listen(env.PORT, () => {
    logger.info(`🚀 REST API ready at http://localhost:${env.PORT}/api`);
  });
}

main().catch((err) => {
  logger.error('后端启动失败:', err);
  process.exit(1);
});

