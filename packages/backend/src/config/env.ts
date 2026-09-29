import { z } from 'zod';

// 集中管理并校验环境变量，缺失关键配置时启动即报错。
const envSchema = z.object({
  NODE_ENV: z.string().default('development'),
  PORT: z.coerce.number().default(4000),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  // 猜英雄游戏：每局最多可猜测的次数（对应最多展示的提示条数）。
  MAX_ATTEMPTS: z.coerce.number().default(5),
});

export const env = envSchema.parse(process.env);

