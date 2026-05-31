import { Sparkles, X } from 'lucide-react';
import TrustBadge from './ui/TrustBadge';

interface CashOutOverlayProps {
  winAmount: number;
  betAmount: number;
  multiplier: number;
  steps: number;
  onVerify: () => void;
  onPlayAgain: () => void;
  onClose: () => void;
}

export default function CashOutOverlay({
  winAmount,
  betAmount,
  multiplier,
  steps,
  onVerify,
  onPlayAgain,
  onClose
}: CashOutOverlayProps) {
  const profit = winAmount - betAmount;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-md rounded-2xl border overflow-hidden"
           style={{
             backgroundColor: 'var(--background-overlay)',
             borderColor: 'var(--voltage)'
           }}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-colors z-10"
        >
          <X size={20} />
        </button>

        {/* Celebration header */}
        <div className="relative px-6 pt-12 pb-6 text-center overflow-hidden"
             style={{
               background: 'linear-gradient(180deg, rgba(255, 235, 59, 0.15) 0%, transparent 100%)'
             }}>
          {/* Decorative sparkles */}
          <div className="absolute top-8 left-8 animate-pulse">
            <Sparkles size={24} style={{ color: 'var(--voltage)' }} />
          </div>
          <div className="absolute top-12 right-12 animate-pulse delay-150">
            <Sparkles size={20} style={{ color: 'var(--safe)' }} />
          </div>

          <div className="text-5xl font-extrabold font-display mb-3"
               style={{ color: 'var(--safe)' }}>
            CASHED OUT!
          </div>
          <div className="text-4xl font-bold font-mono mb-2"
               style={{
                 color: 'var(--voltage)',
                 filter: 'drop-shadow(0 0 20px var(--voltage-glow))'
               }}>
            +{profit.toFixed(3)} SOL
          </div>
          <div className="text-sm text-white/60 font-mono">
            {betAmount.toFixed(3)} SOL × {multiplier.toFixed(2)} = {winAmount.toFixed(3)} SOL
          </div>
        </div>

        {/* Stats */}
        <div className="px-6 pb-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl p-4 text-center border"
                 style={{
                   backgroundColor: 'rgba(255, 255, 255, 0.03)',
                   borderColor: 'var(--border)'
                 }}>
              <div className="text-2xl font-bold font-mono" style={{ color: 'var(--voltage)' }}>
                ×{multiplier.toFixed(2)}
              </div>
              <div className="text-xs text-white/60 mt-1">Multiplier</div>
            </div>
            <div className="rounded-xl p-4 text-center border"
                 style={{
                   backgroundColor: 'rgba(255, 255, 255, 0.03)',
                   borderColor: 'var(--border)'
                 }}>
              <div className="text-2xl font-bold font-mono" style={{ color: 'var(--safe)' }}>
                {steps}
              </div>
              <div className="text-xs text-white/60 mt-1">Steps</div>
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
              <span>Prove This Round Was Fair</span>
            </button>

            <button
              onClick={onPlayAgain}
              className="w-full py-4 rounded-xl font-bold hover:scale-[1.02] transition-all"
              style={{
                backgroundColor: 'var(--safe)',
                color: '#000',
                boxShadow: '0 0 20px var(--safe-glow)'
              }}
            >
              Play Again
            </button>
          </div>

          {/* Provenance */}
          <p className="text-center text-xs text-white/40">
            This win is cryptographically verifiable
          </p>
        </div>
      </div>
    </div>
  );
}
