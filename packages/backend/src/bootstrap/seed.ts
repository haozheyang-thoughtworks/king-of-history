import { AppDataSource } from '../db/dataSource';
import { Hero } from '../entities';
import { logger } from '../utils/logger';
import seedHeroes from '../seedData/heroes.seed.json';

/** 幂等地把种子英雄数据 upsert 进数据库，多次重启容器不会重复插入。 */
export async function runSeed(): Promise<void> {
  const repo = AppDataSource.getRepository(Hero);
  await repo.upsert(seedHeroes, ['name']);
  const count = await repo.count();
  logger.info(`✅ 已同步 ${seedHeroes.length} 位历史武将种子数据（数据库当前共 ${count} 位）`);
}

