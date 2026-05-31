import type { GameState } from './deriveGameState';

/** When UI may send a step (hex, direction pad, or keys 1–7). */
export function canAcceptStepInput(input: {
  gameState: GameState;
  mustCashOut: boolean;
  stepInFlight: boolean;
  stepPending: boolean;
  cashOutPending: boolean;
}): boolean {
  return (
    input.gameState === 'playing' &&
    !input.mustCashOut &&
    !input.stepInFlight &&
    !input.stepPending &&
    !input.cashOutPending
  );
}

/** When a neighbor hex polygon should handle pointer clicks. */
export function hexNeighborClickEnabled(isPlaying: boolean, showDeathImpact: boolean): boolean {
  return isPlaying && !showDeathImpact;
}
