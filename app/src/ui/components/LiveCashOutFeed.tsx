import { TrendingUp, Loader2 } from 'lucide-react';

interface CashOut {
  id: string;
  player: string;
  amount: number;
  multiplier: number;
  timestamp: number;
}

interface LiveCashOutFeedProps {
  cashOuts: CashOut[];
  isLoading?: boolean;
  error?: string;
  isUpdating?: boolean;
}

export default function LiveCashOutFeed({
  cashOuts,
  isLoading = false,
  error,
  isUpdating = false
}: LiveCashOutFeedProps) {
  // LOADING STATE
  if (isLoading) {
    return (
      <div className="rounded-xl p-4 border"
           style={{
             backgroundColor: 'rgba(255, 255, 255, 0.02)',
             borderColor: 'var(--border)'
           }}>
        <div className="flex items-center gap-2 mb-3">
          <Loader2 size={14} className="animate-spin" style={{ color: 'var(--voltage)' }} />
          <h3 className="text-sm font-bold">Live Cash-Outs</h3>
        </div>
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between animate-pulse">
              <div className="h-4 w-24 bg-white/10 rounded" />
              <div className="h-4 w-16 bg-white/10 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ERROR STATE
  if (error) {
    return (
      <div className="rounded-xl p-4 border text-center"
           style={{
             backgroundColor: 'rgba(255, 107, 53, 0.05)',
             borderColor: 'var(--caution)'
           }}>
        <p className="text-xs text-white/60">Feed unavailable</p>
      </div>
    );
  }

  // EMPTY STATE
  if (cashOuts.length === 0) {
    return (
      <div className="rounded-xl p-4 border text-center"
           style={{
             backgroundColor: 'rgba(255, 255, 255, 0.02)',
             borderColor: 'var(--border)'
           }}>
        <h3 className="text-sm font-bold mb-2">Live Cash-Outs</h3>
        <p className="text-xs text-white/60">No recent activity</p>
      </div>
    );
  }

  // ACTIVE STATE
  return (
    <div className="rounded-xl p-4 border overflow-hidden"
         style={{
           backgroundColor: 'rgba(255, 255, 255, 0.02)',
           borderColor: 'var(--border)'
         }}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold flex items-center gap-2">
          <TrendingUp size={14} style={{ color: 'var(--safe)' }} />
          Live Cash-Outs
        </h3>
        {isUpdating && (
          <div className="w-2 h-2 rounded-full animate-pulse"
               style={{ backgroundColor: 'var(--safe)' }} />
        )}
      </div>

      {/* Scrolling feed */}
      <div className="space-y-2 max-h-32 overflow-y-auto">
        {cashOuts.map((cashOut, index) => (
          <div
            key={cashOut.id}
            className="flex items-center justify-between text-xs py-2 border-b last:border-b-0 animate-in slide-in-from-right"
            style={{
              borderColor: 'var(--border)',
              animationDelay: `${index * 50}ms`
            }}
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className="font-mono text-white/40 truncate">
                {cashOut.player.slice(0, 4)}...{cashOut.player.slice(-3)}
              </div>
              <span className="text-white/20">·</span>
              <div className="font-mono font-bold" style={{ color: 'var(--voltage)' }}>
                ×{cashOut.multiplier.toFixed(2)}
              </div>
            </div>
            <div className="font-mono font-bold flex-shrink-0" style={{ color: 'var(--safe)' }}>
              +{cashOut.amount.toFixed(3)} SOL
            </div>
          </div>
        ))}
      </div>

      {/* Ticker animation for newest item */}
      {cashOuts.length > 0 && (
        <div className="mt-2 pt-2 border-t text-xs text-center text-white/40"
             style={{ borderColor: 'var(--border)' }}>
          {cashOuts.length} recent wins
        </div>
      )}
    </div>
  );
}

// Compact version for sidebar
export function LiveCashOutTicker({ cashOuts, isUpdating }: {
  cashOuts: CashOut[];
  isUpdating?: boolean;
}) {
  if (cashOuts.length === 0) return null;

  const latest = cashOuts[0];

  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-lg border animate-in slide-in-from-top"
         style={{
           backgroundColor: 'rgba(0, 255, 163, 0.05)',
           borderColor: 'var(--safe)'
         }}>
      <TrendingUp size={12} style={{ color: 'var(--safe)' }} />
      <span className="text-xs font-mono">
        {latest.player.slice(0, 4)}...{latest.player.slice(-2)}
      </span>
      <span className="text-xs text-white/40">cashed out</span>
      <span className="text-xs font-mono font-bold" style={{ color: 'var(--voltage)' }}>
        {latest.amount.toFixed(2)} SOL
      </span>
      {isUpdating && (
        <div className="w-1.5 h-1.5 rounded-full animate-pulse ml-auto"
             style={{ backgroundColor: 'var(--safe)' }} />
      )}
    </div>
  );
}
