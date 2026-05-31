import { create } from 'zustand';
import type { CashOutOverlayData, DeathOverlayData, ErrorType } from './types';

interface UiState {
  txMessage: string | null;
  txBannerType: 'info' | 'success' | 'error';
  lastOutcome: string | null;
  showDeath: boolean;
  showCashOut: boolean;
  deathData: DeathOverlayData | null;
  cashOutData: CashOutOverlayData | null;
  deathDirection: number | null;
  showDeathImpact: boolean;
  mutationError: { type: ErrorType; message?: string } | null;
  betHistoryVersion: number;
  setTxMessage: (msg: string | null, type?: 'info' | 'success' | 'error') => void;
  setLastOutcome: (msg: string | null) => void;
  triggerDeath: (data: DeathOverlayData, direction: number) => void;
  triggerCashOut: (data: CashOutOverlayData) => void;
  setMutationError: (err: { type: ErrorType; message?: string } | null) => void;
  bumpBetHistory: () => void;
  clearOverlays: () => void;
  dismissDeathImpact: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  txMessage: null,
  txBannerType: 'info',
  lastOutcome: null,
  showDeath: false,
  showCashOut: false,
  deathData: null,
  cashOutData: null,
  deathDirection: null,
  showDeathImpact: false,
  mutationError: null,
  betHistoryVersion: 0,
  setTxMessage: (msg, type = 'info') => set({ txMessage: msg, txBannerType: type }),
  setLastOutcome: (lastOutcome) => set({ lastOutcome }),
  triggerDeath: (data, direction) =>
    set({
      showDeath: true,
      deathData: data,
      deathDirection: direction,
      showDeathImpact: true,
      showCashOut: false,
      cashOutData: null,
    }),
  triggerCashOut: (data) =>
    set({
      showCashOut: true,
      cashOutData: data,
      showDeath: false,
      deathData: null,
    }),
  setMutationError: (mutationError) => set({ mutationError }),
  bumpBetHistory: () => set((s) => ({ betHistoryVersion: s.betHistoryVersion + 1 })),
  clearOverlays: () =>
    set({
      showDeath: false,
      showCashOut: false,
      deathData: null,
      cashOutData: null,
      deathDirection: null,
      showDeathImpact: false,
    }),
  dismissDeathImpact: () => set({ showDeathImpact: false }),
}));
