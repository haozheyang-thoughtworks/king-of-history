import type { CreateGameResponse, GuessResponse } from '@king-of-history/shared';

const API_BASE_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? 'http://localhost:4000/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const message = (data as { error?: string } | null)?.error ?? '请求失败，请稍后重试';
    throw new Error(message);
  }

  return data as T;
}

/** 创建新的一局游戏（后端随机抽取一位英雄），返回第一条提示。 */
export function createGame(): Promise<CreateGameResponse> {
  return request<CreateGameResponse>('/games', { method: 'POST' });
}

/** 提交一次猜测。 */
export function submitGuess(gameId: string, name: string): Promise<GuessResponse> {
  return request<GuessResponse>(`/games/${gameId}/guesses`, {
    method: 'POST',
    body: JSON.stringify({ name }),
  });
}

