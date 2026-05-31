import type { LiveCashOutItem } from './types';

export interface ParsedCashOutLog {
  player: string;
  payoutLamports: number;
  step: number;
}

/** Parse Anchor `RoundEnded` logs for cashed-out rounds (FR-06). */
export function parseRoundEndedLogs(logs: string[]): ParsedCashOutLog | null {
  const joined = logs.join('\n');
  if (!joined.toLowerCase().includes('cashedout') && !joined.includes('cashed_out')) {
    return null;
  }
  const payoutMatch = joined.match(/payout[":\s]+(\d+)/i);
  const stepMatch = joined.match(/final_step[":\s]+(\d+)/i);
  const playerMatch = joined.match(/player[":\s]+([1-9A-HJ-NP-Za-km-z]{32,44})/i);
  if (!payoutMatch) return null;
  return {
    player: playerMatch?.[1] ?? 'unknown',
    payoutLamports: Number(payoutMatch[1]),
    step: stepMatch ? Number(stepMatch[1]) : 0,
  };
}

export function parsedLogToFeedItem(
  signature: string,
  parsed: ParsedCashOutLog,
  multiplierAtStep: (step: number) => number,
): LiveCashOutItem {
  return {
    id: signature,
    player: parsed.player,
    amount: parsed.payoutLamports / 1e9,
    multiplier: multiplierAtStep(parsed.step),
    timestamp: Date.now(),
  };
}
