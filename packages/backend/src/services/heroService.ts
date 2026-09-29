import { AppDataSource } from '../db/dataSource';
import { Hero } from '../entities';

const heroRepository = () => AppDataSource.getRepository(Hero);

/** 从数据库随机抽取一张英雄卡。 */
export async function pickRandomHero(): Promise<Hero> {
  const hero = await heroRepository()
    .createQueryBuilder('hero')
    .orderBy('RANDOM()')
    .limit(1)
    .getOne();

  if (!hero) {
    throw new Error('No heroes available in database. Did the seed run?');
  }
  return hero;
}

export async function findHeroById(id: string): Promise<Hero | null> {
  return heroRepository().findOneBy({ id });
}

/** 精确匹配竞猜的英雄名字：去空格 + 忽略大小写。 */
export function isNameMatch(guess: string, actualName: string): boolean {
  const normalize = (s: string) => s.trim().toLowerCase().replace(/\s+/g, '');
  return normalize(guess) === normalize(actualName);
}

