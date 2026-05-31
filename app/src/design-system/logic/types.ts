import type { ReactNode } from 'react';
import type { GameState } from './deriveGameState';

export type { GameState };

export type ErrorType =
  | 'insufficient_balance'
  | 'sign_rejected'
  | 'rpc_error'
  | 'treasury_insufficient'
  | 'network_error'
  | 'generic';

export interface DeathOverlayData {
  betAmount: number;
  step: number;
  roll: number;
  threshold: number;
  direction: string;
  roundPda?: string;
}

export interface CashOutOverlayData {
  winAmount: number;
  betAmount: number;
  multiplier: number;
  steps: number;
  roundPda?: string;
}

export interface LiveCashOutItem {
  id: string;
  player: string;
  amount: number;
  multiplier: number;
  timestamp: number;
}

export interface RoundHistoryItem {
  id: string;
  status: 'active' | 'cashed_out' | 'dead' | 'pending_reveal';
  betAmount: number;
  step: number;
  multiplier?: number;
  payout?: number;
  timestamp: number;
}

export interface GodViewDirection {
  direction: number;
  roll: number;
  safe: boolean;
}

export interface VerifyProofStep {
  label: string;
  ok: boolean;
  detail: string;
}

export interface HomePageViewProps {
  gameState: GameState;
  walletConnected: boolean;
  walletPublicKey?: string;
  casinoSol: number;
  walletSol: number;
  betSol: string;
  setBetSol: (value: string) => void;
  betAmount: number;
  canStartRound: boolean;
  hasActiveRound: boolean;
  maxSteps: number;
  currentStep: number;
  /** Step cap reached — only cash-out allowed (no further steps). */
  mustCashOut?: boolean;
  multiplier: number;
  playingBetAmount: number;
  currentPosition: { q: number; r: number };
  visitedCells: Set<string>;
  openRoundKey?: string;
  onConnect: () => void | Promise<void>;
  onStartRound: () => void;
  onDirection: (direction: number) => void;
  onCashOut: () => void;
  onDeposit: (amount: number) => void;
  onWithdraw: (amount: number) => void;
  onVerifyRound: (roundId: string) => void;
  onNavigateVerify: (roundId: string) => void;
  onPlayAgain: () => void;
  onRetryReveal: () => void;
  onCancelPending?: () => void;
  onSeedExplainerContinue: () => void;
  onSeedExplainerSkip: () => void;
  onDismissMutationError: () => void;
  liveFeed: {
    cashOuts: LiveCashOutItem[];
    isLoading: boolean;
    error?: string;
    isUpdating: boolean;
  };
  roundHistory: {
    rounds: RoundHistoryItem[];
    isLoading: boolean;
    error?: string;
  };
  txPending: boolean;
  /** First hex pick: start + reveal (+ register session) in one Phantom sign. */
  pickPending?: boolean;
  hexPickEnabled?: boolean;
  /** Overrides default ready-state hint under the hex grid. */
  readyHint?: string;
  quickPlayReady?: boolean;
  stepPending: boolean;
  cashOutPending: boolean;
  retryRevealPending: boolean;
  cancelPendingPending?: boolean;
  deathData: DeathOverlayData | null;
  cashOutData: CashOutOverlayData | null;
  deathDirection: number | null;
  showDeathImpact: boolean;
  mutationError: { type: ErrorType; message?: string } | null;
  showWallet: boolean;
  setShowWallet: (show: boolean) => void;
  showHistory: boolean;
  setShowHistory: (show: boolean) => void;
  showMenu: boolean;
  setShowMenu: (show: boolean) => void;
  showHowItWorks: boolean;
  setShowHowItWorks: (show: boolean) => void;
  showSeedExplainer: boolean;
  showResumeRoundBanner?: boolean;
  onResumeRound?: () => void;
  devnetBanner?: ReactNode;
}
