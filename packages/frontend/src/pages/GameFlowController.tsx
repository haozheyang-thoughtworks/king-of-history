import { useUiStore } from '../store/uiStore';
import { WelcomeScreen } from './WelcomeScreen';
import { GuessingScreen } from './GuessingScreen';
import { ResultScreen } from './ResultScreen';

export function GameFlowController() {
  const screen = useUiStore((s) => s.screen);

  switch (screen) {
    case 'WELCOME':
      return <WelcomeScreen />;
    case 'GUESSING':
      return <GuessingScreen />;
    case 'WIN':
      return <ResultScreen outcome="WIN" />;
    case 'LOSE':
      return <ResultScreen outcome="LOSE" />;
    default:
      return null;
  }
}

