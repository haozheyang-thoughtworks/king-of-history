import type { ErrorRequestHandler } from 'express';
import { logger } from '../utils/logger';

const NOT_FOUND_HINTS = ['不存在', '已过期', '已结束'];

/** 统一错误处理中间件：把 Error 转换成 { error: message } 的 JSON 响应。 */
export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const message = err instanceof Error ? err.message : '服务器内部错误';
  logger.error(message);

  const status = NOT_FOUND_HINTS.some((hint) => message.includes(hint)) ? 404 : 400;
  res.status(status).json({ error: message });
};

