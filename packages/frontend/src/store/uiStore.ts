import { create } from 'zustand';
import type { HeroReveal } from '@king-of-history/shared';

export type Screen = 'WELCOME' | 'GUESSING' | 'WIN' | 'LOSE';

interface UiState {
  screen: Screen;
  gameId: string | null;
  hints: string[];
  attemptsUsed: number;
  maxAttempts: number;
  hero: HeroReveal | null;

  /** 欢迎页创建对局成功后调用：进入猜测界面，展示第一条提示。 */
  startGame: (gameId: string, firstHint: string, maxAttempts: number) => void;
  /** 猜错但还有机会时调用：追加下一条提示。 */
  appendHint: (hint: string, attemptsUsed: number) => void;
  /** 游戏结束（猜对 / 次数用尽）时调用：跳转到胜利或失败页。 */
  finishGame: (outcome: 'WIN' | 'LOSE', hero: HeroReveal, attemptsUsed: number) => void;
  /** 重置回欢迎页，开始新的一局。 */
  resetToWelcome: () => void;
}

// 只存于前端内存，刷新页面即回到欢迎界面，与后端"对局数据不入库"的设计保持一致。
export const useUiStore = create<UiState>((set) => ({
  screen: 'WELCOME',
  gameId: null,
  hints: [],
  attemptsUsed: 0,
  maxAttempts: 5,
  hero: null,

  startGame: (gameId, firstHint, maxAttempts) =>
    set({
      screen: 'GUESSING',
      gameId,
      hints: [firstHint],
      attemptsUsed: 0,
      maxAttempts,
      hero: null,
    }),

  appendHint: (hint, attemptsUsed) =>
    set((state) => ({ hints: [...state.hints, hint], attemptsUsed })),

  finishGame: (outcome, hero, attemptsUsed) =>
    set({ screen: outcome, hero, attemptsUsed }),

  resetToWelcome: () =>
    set({ screen: 'WELCOME', gameId: null, hints: [], attemptsUsed: 0, hero: null }),
}));

