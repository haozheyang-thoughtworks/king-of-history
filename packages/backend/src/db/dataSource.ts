import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { env } from '../config/env';
import { Hero } from '../entities';

// 数据库只需要管理 Hero 这一个实体；对局运行时状态为内存态，不进 TypeORM。
export const AppDataSource = new DataSource({
  type: 'postgres',
  url: env.DATABASE_URL,
  entities: [Hero],
  synchronize: true, // 开发环境：Entity 变化自动建表/加列
  logging: false,
});

