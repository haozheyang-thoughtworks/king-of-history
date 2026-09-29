import { AppDataSource } from '../db/dataSource';
import { logger } from '../utils/logger';

export async function initDatabase(): Promise<void> {
  await AppDataSource.initialize();
  logger.info('✅ 数据库连接成功，heroes 表已自动同步');
}

