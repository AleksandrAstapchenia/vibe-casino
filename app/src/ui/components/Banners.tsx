import { AlertTriangle, AlertCircle, Zap } from 'lucide-react';

export function DevnetBanner({
  onSwitch,
  hint,
}: {
  onSwitch: () => void;
  hint?: string;
}) {
  return (
    <div
      className="w-full py-3 px-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b"
      style={{
        backgroundColor: 'rgba(255, 107, 53, 0.1)',
        borderColor: 'var(--caution)',
      }}
    >
      <div className="flex flex-col gap-1 min-w-0">
        <div className="flex items-center gap-2">
          <AlertTriangle size={16} style={{ color: 'var(--caution)' }} />
          <span className="text-sm font-medium">Wrong network detected</span>
        </div>
        {hint ? (
          <span className="text-xs text-white/50 pl-6">{hint}</span>
        ) : null}
      </div>
      <button
        type="button"
        onClick={onSwitch}
        className="px-4 py-1.5 rounded-lg font-medium text-sm hover:bg-white/10 transition-colors shrink-0"
        style={{ color: 'var(--caution)' }}
      >
        Reload
      </button>
    </div>
  );
}

export function TreasuryMigrateBanner() {
  return (
    <div
      className="w-full py-3 px-4 border-b text-sm"
      style={{
        backgroundColor: 'rgba(255, 0, 110, 0.08)',
        borderColor: 'var(--void)',
        color: 'var(--void)',
      }}
    >
      <span className="font-medium">Devnet program out of date</span>
      <span className="text-white/50">
        {' '}
        — steps simulate-fail until deployer runs{' '}
        <code className="text-xs font-mono text-white/70">./scripts/deploy-devnet.sh</code> then{' '}
        <code className="text-xs font-mono text-white/70">make migrate-treasury</code> (~3.3 SOL on
        deploy wallet)
      </span>
    </div>
  );
}

export function PendingRoundBanner({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="w-full py-3 px-4 flex items-center justify-between border-b"
         style={{
           backgroundColor: 'rgba(255, 235, 59, 0.1)',
           borderColor: 'var(--voltage)'
         }}>
      <div className="flex items-center gap-2">
        <AlertCircle size={16} style={{ color: 'var(--voltage)' }} />
        <span className="text-sm font-medium">Active round in progress</span>
      </div>
      <button
        onClick={onContinue}
        className="px-4 py-1.5 rounded-lg font-medium text-sm hover:bg-white/10 transition-colors"
        style={{ color: 'var(--voltage)' }}
      >
        Continue
      </button>
    </div>
  );
}

export function MaxDepthBanner() {
  return (
    <div className="w-full py-3 px-4 flex items-center justify-center gap-2 border-y animate-pulse"
         style={{
           backgroundColor: 'rgba(255, 0, 110, 0.15)',
           borderColor: 'var(--void)'
         }}>
      <Zap size={16} style={{ color: 'var(--void)' }} />
      <span className="font-bold" style={{ color: 'var(--void)' }}>
        MAX DEPTH REACHED — CASH OUT NOW
      </span>
    </div>
  );
}

export function TxStatusBanner({ message, type = 'info' }: { message: string; type?: 'info' | 'success' | 'error' }) {
  const colors = {
    info: { bg: 'rgba(0, 212, 255, 0.1)', border: 'var(--trust)', text: 'var(--trust)' },
    success: { bg: 'rgba(0, 255, 163, 0.1)', border: 'var(--safe)', text: 'var(--safe)' },
    error: { bg: 'rgba(255, 0, 110, 0.1)', border: 'var(--void)', text: 'var(--void)' }
  };

  return (
    <div className="w-full py-2 px-4 flex items-center justify-center gap-2 border-b text-sm font-medium"
         style={{
           backgroundColor: colors[type].bg,
           borderColor: colors[type].border,
           color: colors[type].text
         }}>
      <div className="w-1 h-1 rounded-full animate-pulse" style={{ backgroundColor: colors[type].text }} />
      {message}
    </div>
  );
}
