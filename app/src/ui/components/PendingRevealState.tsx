import { RefreshCw } from 'lucide-react';

interface PendingRevealStateProps {
  onRetry: () => void;
  onRefund?: () => void;
  isRetrying?: boolean;
  isRefunding?: boolean;
}

export default function PendingRevealState({
  onRetry,
  onRefund,
  isRetrying = false,
  isRefunding = false,
}: PendingRevealStateProps) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div
        className="max-w-md w-full rounded-2xl border p-8 text-center space-y-6"
        style={{
          backgroundColor: 'var(--background-overlay)',
          borderColor: 'var(--border)',
        }}
      >
        <div className="flex justify-center">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 rounded-full border-4 border-white/10" />
            <div
              className="absolute inset-0 rounded-full border-4 border-transparent animate-spin"
              style={{
                borderTopColor: 'var(--voltage)',
                borderRightColor: 'var(--voltage)',
              }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold">Revealing Seeds</h3>
          <p className="text-sm text-white/60">Waiting for on-chain confirmation...</p>
          <p className="text-xs text-white/40 font-mono">This may take a few seconds</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <button
            type="button"
            onClick={onRetry}
            disabled={isRetrying || isRefunding}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border font-medium hover:bg-white/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ borderColor: 'var(--border)' }}
          >
            <RefreshCw size={16} className={isRetrying ? 'animate-spin' : ''} />
            {isRetrying ? 'Retrying...' : 'Retry Reveal'}
          </button>
          {onRefund && (
            <button
              type="button"
              onClick={onRefund}
              disabled={isRetrying || isRefunding}
              className="px-6 py-3 rounded-xl border font-medium hover:bg-white/5 transition-all disabled:opacity-50"
              style={{ borderColor: 'var(--caution)', color: 'var(--caution)' }}
            >
              {isRefunding ? 'Refunding…' : 'Refund stuck round'}
            </button>
          )}
        </div>

        <p className="text-xs text-white/40">
          If this persists, check your wallet or refresh the page
        </p>
      </div>
    </div>
  );
}
