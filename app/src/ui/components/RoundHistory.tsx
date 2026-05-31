import { ExternalLink, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import Badge from './ui/Badge';
import TrustBadge from './ui/TrustBadge';

interface Round {
  id: string;
  status: 'active' | 'cashed_out' | 'dead' | 'pending_reveal';
  betAmount: number;
  step: number;
  multiplier?: number;
  payout?: number;
  timestamp: number;
}

interface RoundHistoryProps {
  rounds: Round[];
  onVerifyRound: (roundId: string) => void;
  isLoading?: boolean;
  error?: string;
}

export default function RoundHistory({ rounds, onVerifyRound, isLoading = false, error }: RoundHistoryProps) {
  // LOADING STATE
  if (isLoading) {
    return (
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-lg p-4 border animate-pulse"
               style={{
                 backgroundColor: 'rgba(255, 255, 255, 0.02)',
                 borderColor: 'var(--border)'
               }}>
            <div className="flex items-center justify-between mb-2">
              <div className="h-5 w-20 bg-white/10 rounded" />
              <div className="h-4 w-16 bg-white/10 rounded" />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-4 w-24 bg-white/10 rounded" />
                <div className="h-4 w-16 bg-white/10 rounded" />
              </div>
              <div className="h-6 w-20 bg-white/10 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // ERROR STATE
  if (error) {
    return (
      <div className="rounded-xl p-6 text-center border"
           style={{
             backgroundColor: 'rgba(255, 0, 110, 0.05)',
             borderColor: 'var(--void)'
           }}>
        <AlertCircle size={24} className="mx-auto mb-2" style={{ color: 'var(--void)' }} />
        <p className="text-sm font-medium mb-1">Failed to Load History</p>
        <p className="text-xs text-white/40">{error}</p>
      </div>
    );
  }

  // EMPTY STATE
  if (rounds.length === 0) {
    return (
      <div className="rounded-xl p-8 text-center border"
           style={{
             backgroundColor: 'rgba(255, 255, 255, 0.02)',
             borderColor: 'var(--border)'
           }}>
        <div className="text-white/40 mb-2">📊</div>
        <p className="text-sm text-white/60">No rounds played yet</p>
        <p className="text-xs text-white/40 mt-1">Your game history will appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {rounds.map((round) => (
        <RoundRow
          key={round.id}
          round={round}
          onVerify={() => onVerifyRound(round.id)}
        />
      ))}
    </div>
  );
}

function RoundRow({ round, onVerify }: { round: Round; onVerify: () => void }) {
  const getStatusBadge = () => {
    switch (round.status) {
      case 'active':
        return <Badge variant="voltage" size="sm">ACTIVE</Badge>;
      case 'cashed_out':
        return <Badge variant="safe" size="sm">CASHED OUT</Badge>;
      case 'dead':
        return <Badge variant="death" size="sm">DEAD</Badge>;
      case 'pending_reveal':
        return <Badge variant="neutral" size="sm">PENDING</Badge>;
    }
  };

  const getOutcome = () => {
    if (round.status === 'cashed_out' && round.payout) {
      const profit = round.payout - round.betAmount;
      return (
        <div className="flex items-center gap-1 font-mono font-bold" style={{ color: 'var(--safe)' }}>
          <TrendingUp size={14} />
          +{profit.toFixed(3)} SOL
        </div>
      );
    }
    if (round.status === 'dead') {
      return (
        <div className="flex items-center gap-1 font-mono font-bold" style={{ color: 'var(--void)' }}>
          <TrendingDown size={14} />
          -{round.betAmount.toFixed(3)} SOL
        </div>
      );
    }
    if (round.status === 'active' && round.multiplier) {
      return (
        <div className="font-mono font-bold" style={{ color: 'var(--voltage)' }}>
          ×{round.multiplier.toFixed(2)} LIVE
        </div>
      );
    }
    return <span className="text-white/40 text-sm">—</span>;
  };

  return (
    <button
      onClick={onVerify}
      className="w-full rounded-lg p-4 border hover:bg-white/5 transition-all text-left group"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        borderColor: 'var(--border)'
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {getStatusBadge()}
          <span className="text-xs text-white/40 font-mono">
            #{round.id.slice(0, 8)}
          </span>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <TrustBadge variant="inline" />
          <ExternalLink size={12} className="text-white/40" />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="text-sm text-white/60">
            Bet: <span className="font-mono text-white">{round.betAmount.toFixed(3)} SOL</span>
          </div>
          <div className="text-sm text-white/60">
            Step: <span className="font-mono text-white">{round.step}</span>
          </div>
        </div>
        <div className="text-right">
          {getOutcome()}
        </div>
      </div>
    </button>
  );
}
