import { useState } from 'react';
import { submitGuess } from '../api/client';
import { useUiStore } from '../store/uiStore';
import { GameHeader } from '../components/GameHeader';
import { HintPanel } from '../components/HintPanel';
import { GuessForm } from '../components/GuessForm';

export function GuessingScreen() {
  const { gameId, hints, attemptsUsed, maxAttempts, appendHint, finishGame } = useUiStore();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remaining = maxAttempts - attemptsUsed;

  const handleGuess = async (name: string) => {
    if (!gameId) return;
    setSubmitting(true);
    setError(null);
    try {
      const result = await submitGuess(gameId, name);

      if (result.hero && result.correct) {
        finishGame('WIN', result.hero, result.attemptsUsed);
        return;
      }
      if (result.hero && result.finished) {
        finishGame('LOSE', result.hero, result.attemptsUsed);
        return;
      }
      if (result.hint) {
        appendHint(result.hint, result.attemptsUsed);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : '提交猜测失败，请稍后重试');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <GameHeader />
      <div className="panel guessing-panel">
        <HintPanel hints={hints} attemptsUsed={attemptsUsed} maxAttempts={maxAttempts} />
        <GuessForm disabled={submitting || remaining <= 0} onSubmit={handleGuess} />
        {error && <p className="error-text">{error}</p>}
      </div>
    </>
  );
}

