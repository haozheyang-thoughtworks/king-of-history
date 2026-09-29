import { useState } from 'react';
import { createGame } from '../api/client';
import { useUiStore } from '../store/uiStore';
import { GameHeader } from '../components/GameHeader';
import { playBackgroundMusic } from '../utils/audio';

export function WelcomeScreen() {
  const startGame = useUiStore((s) => s.startGame);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStart = async () => {
    // 必须在点击事件的同步调用栈内触发 play()，否则会被浏览器自动播放策略拦截。
    void playBackgroundMusic();

    setLoading(true);
    setError(null);
    try {
      const data = await createGame();
      startGame(data.gameId, data.hint, data.maxAttempts);
    } catch (e) {
      setError(e instanceof Error ? e.message : '创建对局失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="panel welcome-screen">
      <div className="welcome-emblem">🏆</div>
      <GameHeader />
      <p>
        历史长河中，无数豪杰群星璀璨……系统将为你随机抽取一位神秘历史英雄，
        并逐步给出提示，你一共有 <strong>5 次机会</strong>猜出他的名字！
      </p>
      <button className="primary-button" onClick={handleStart} disabled={loading}>
        {loading ? '抽取中…' : '🎲 开始游戏'}
      </button>
      {error && <p className="error-text">{error}</p>}
    </div>
  );
}

