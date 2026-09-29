import { useUiStore } from '../store/uiStore';
import { HeroRevealCard } from '../components/HeroRevealCard';

interface ResultScreenProps {
  outcome: 'WIN' | 'LOSE';
}

export function ResultScreen({ outcome }: ResultScreenProps) {
  const { hero, attemptsUsed, maxAttempts, resetToWelcome } = useUiStore();

  if (!hero) return null;

  const isWin = outcome === 'WIN';
  const bannerText = isWin
    ? `🎉 恭喜你！用了 ${attemptsUsed} 次机会就猜中了！`
    : `💀 很遗憾，${maxAttempts} 次机会都没有猜中……`;

  return (
    <div className="result-screen">
      <h1 className={`result-banner outcome-${isWin ? 'win' : 'lose'}`}>{bannerText}</h1>
      <p className="hint-text">{isWin ? '真身揭晓：' : '正确答案是：'}</p>
      <HeroRevealCard hero={hero} />
      <div className="result-actions">
        <button className="primary-button" onClick={resetToWelcome}>
          🔄 再玩一次
        </button>
      </div>
    </div>
  );
}

