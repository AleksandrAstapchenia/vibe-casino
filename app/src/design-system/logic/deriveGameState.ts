export type GameState = 'preview' | 'ready' | 'playing' | 'win' | 'loss' | 'pending_reveal';

export function deriveGameState(input: {
  walletConnected: boolean;
  showCashOut: boolean;
  showDeath: boolean;
  isPending: boolean;
  isActive: boolean;
}): GameState {
  if (!input.walletConnected) return 'preview';
  if (input.showCashOut) return 'win';
  if (input.showDeath) return 'loss';
  if (input.isPending) return 'pending_reveal';
  if (input.isActive) return 'playing';
  return 'ready';
}
