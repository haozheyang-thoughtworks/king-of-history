interface HintPanelProps {
  hints: string[];
  attemptsUsed: number;
  maxAttempts: number;
}

export function HintPanel({ hints, attemptsUsed, maxAttempts }: HintPanelProps) {
  const remaining = maxAttempts - attemptsUsed;

  return (
    <div className="hint-panel">
      <div className="hint-panel-title">
        📜 提示 {hints.length}/{maxAttempts} &nbsp;·&nbsp; 剩余机会{' '}
        <span className={remaining <= 1 ? 'quota-low' : undefined}>{remaining}</span>
      </div>
      <ol className="hint-list">
        {hints.map((hint, index) => (
          <li key={index} className="hint-item">
            {hint}
          </li>
        ))}
      </ol>
    </div>
  );
}

