import { X } from 'lucide-react';
import TrustBadge from './ui/TrustBadge';

interface DeathOverlayProps {
  betAmount: number;
  step: number;
  roll: number;
  threshold: number;
  direction: string;
  onVerify: () => void;
  onPlayAgain: () => void;
  onClose: () => void;
}

export default function DeathOverlay({
  betAmount,
  step,
  roll,
  threshold,
  direction,
  onVerify,
  onPlayAgain,
  onClose
}: DeathOverlayProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-md rounded-2xl border overflow-hidden"
           style={{
             backgroundColor: 'var(--background-overlay)',
             borderColor: 'var(--void)'
           }}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-colors z-10"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="relative px-6 pt-12 pb-6 text-center"
             style={{
               background: 'linear-gradient(180deg, rgba(255, 0, 110, 0.1) 0%, transparent 100%)'
             }}>
          <div className="text-6xl font-extrabold font-display mb-3"
               style={{ color: 'var(--void)' }}>
            ROUND OVER
          </div>
          <div className="text-2xl font-bold font-mono mb-2"
               style={{ color: 'var(--void-dim)' }}>
            -{betAmount.toFixed(3)} SOL
          </div>
        </div>

        {/* Roll details */}
        <div className="px-6 pb-6 space-y-4">
          <div className="rounded-xl p-4 border"
               style={{
                 backgroundColor: 'rgba(255, 255, 255, 0.03)',
                 borderColor: 'var(--border)'
               }}>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/60">Step</span>
                <span className="font-mono font-bold">{step}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/60">Direction</span>
                <span className="text-2xl">{direction}</span>
              </div>
              <div className="h-px bg-white/10" />
              <div className="flex items-center justify-between">
                <span className="text-white/60">Roll</span>
                <span className="font-mono text-xl font-bold" style={{ color: 'var(--void)' }}>
                  {roll}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60">Threshold</span>
                <span className="font-mono text-xl font-bold">{threshold}</span>
              </div>
              <div className="text-center text-xs text-white/40 font-mono">
                {roll} ≥ {threshold} = DEAD
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <button
              onClick={onVerify}
              className="w-full py-4 rounded-xl border font-medium hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
              style={{
                borderColor: 'var(--trust)',
                color: 'var(--trust)'
              }}
            >
              <TrustBadge variant="inline" />
              <span>See What Happened</span>
            </button>

            <button
              onClick={onPlayAgain}
              className="w-full py-4 rounded-xl font-bold hover:scale-[1.02] transition-all"
              style={{
                backgroundColor: 'var(--safe)',
                color: '#000'
              }}
            >
              Play Again
            </button>
          </div>

          {/* Explanation */}
          <p className="text-center text-xs text-white/40">
            Every outcome is verifiable on-chain
          </p>
        </div>
      </div>
    </div>
  );
}
