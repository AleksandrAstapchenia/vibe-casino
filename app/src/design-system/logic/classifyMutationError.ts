import type { ErrorType } from './types';

export function classifyMutationError(error: unknown): { type: ErrorType; message: string } {
  const message =
    error instanceof Error ? error.message : typeof error === 'string' ? error : 'Something went wrong';
  const lower = message.toLowerCase();

  if (
    lower.includes('user rejected') ||
    lower.includes('rejected the request') ||
    lower.includes('cancelled')
  ) {
    return { type: 'sign_rejected', message };
  }
  if (lower.includes('bet too large') || lower.includes('min bet')) {
    if (/max\s+0(\.0+)?\s/i.test(message)) {
      return { type: 'insufficient_balance', message };
    }
    return { type: 'treasury_insufficient', message };
  }
  if (lower.includes('insufficient') && lower.includes('sol')) {
    return { type: 'insufficient_balance', message };
  }
  if (lower.includes('connect wallet')) {
    return { type: 'generic', message: 'Connect wallet to continue' };
  }
  if (lower.includes('sign failed (401)') || lower.includes('worker_secret')) {
    return {
      type: 'generic',
      message:
        'House signer auth failed — restart `make dev-worker` and `make dev-app` (same WORKER_SECRET as worker/.dev.vars).',
    };
  }
  if (lower.includes('treasury') || lower.includes('house cannot')) {
    return { type: 'treasury_insufficient', message };
  }
  if (
    lower.includes('instructionfallbacknotfound') ||
    lower.includes('fallback functions are not supported') ||
    message.includes('0x65')
  ) {
    return {
      type: 'generic',
      message:
        'Devnet program is outdated for this app build. Run ./scripts/deploy-devnet.sh (then migrate-treasury if needed) and hard-refresh.',
    };
  }
  if (lower.includes('accountnotinitialized') && lower.includes('game_session')) {
    return {
      type: 'generic',
      message:
        'Quick-play session account missing on-chain — disable quick play or register session again.',
    };
  }
  if (
    lower.includes('simulation failed') ||
    lower.includes('blockhash not found') ||
    lower.includes('accountdidnotdeserialize') ||
    lower.includes('invalid account data')
  ) {
    const anchorLine = message
      .split('\n')
      .find((line) => /anchorerror|custom program error|error code:/i.test(line));
    if (anchorLine) {
      return { type: 'generic', message: anchorLine.trim() };
    }
    if (lower.includes('accountdidnotdeserialize') || lower.includes('invalid account data')) {
      return {
        type: 'generic',
        message:
          'On-chain treasury layout may be stale — run make migrate-treasury, hard-refresh, retry.',
      };
    }
    return {
      type: 'generic',
      message:
        'Transaction simulation failed — switch Phantom to Devnet, retry, or hard-refresh if the app was open during deploy.',
    };
  }
  if (lower.includes('network') || lower.includes('fetch failed') || lower.includes('429')) {
    return { type: 'network_error', message };
  }
  if (lower.includes('rpc') || lower.includes('blockhash') || lower.includes('timeout')) {
    return { type: 'rpc_error', message };
  }
  return { type: 'generic', message };
}
