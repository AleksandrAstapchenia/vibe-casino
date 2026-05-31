import { Lock, CheckCircle2 } from 'lucide-react';

interface SeedFlowExplainerProps {
  onContinue: () => void;
  onSkip?: () => void;
}

export default function SeedFlowExplainer({ onContinue, onSkip }: SeedFlowExplainerProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-2xl border overflow-hidden"
           style={{
             backgroundColor: 'var(--background-overlay)',
             borderColor: 'var(--border)'
           }}>
        {/* Header */}
        <div className="p-6 pb-4 text-center">
          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
               style={{ backgroundColor: 'rgba(0, 212, 255, 0.15)' }}>
            <Lock size={32} style={{ color: 'var(--trust)' }} />
          </div>
          <h2 className="text-2xl font-bold mb-2">Sign 2 Transactions Once</h2>
          <p className="text-sm text-white/60">
            This commits the randomness for your entire round
          </p>
        </div>

        {/* Explanation */}
        <div className="px-6 pb-6 space-y-4">
          {/* Step 1 */}
          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                 style={{
                   backgroundColor: 'var(--trust)',
                   color: '#000'
                 }}>
              1
            </div>
            <div>
              <h3 className="font-bold mb-1">Commit Transaction</h3>
              <p className="text-sm text-white/70">
                Locks your bet and commits seed hashes on-chain. At this point, neither you nor the house know the final seeds.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                 style={{
                   backgroundColor: 'var(--trust)',
                   color: '#000'
                 }}>
              2
            </div>
            <div>
              <h3 className="font-bold mb-1">Reveal Transaction</h3>
              <p className="text-sm text-white/70">
                Reveals both seeds and verifies the house signature. Now all outcomes for your round are mathematically determined.
              </p>
            </div>
          </div>

          {/* Why Box */}
          <div className="rounded-xl p-4 border"
               style={{
                 backgroundColor: 'rgba(0, 255, 163, 0.05)',
                 borderColor: 'var(--safe)'
               }}>
            <div className="flex items-start gap-2">
              <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--safe)' }} />
              <div className="text-xs text-white/80">
                <strong className="text-white">Why 2 transactions?</strong>
                <br/>
                This prevents both you and the house from seeing the final randomness before committing.
                It's cryptographically impossible to cheat - the seeds are locked before anyone knows what they are.
              </div>
            </div>
          </div>

          {/* Important note */}
          <div className="rounded-lg p-3 text-xs text-white/60"
               style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }}>
            ⚡ After this, each step is a single transaction - no double-signing during gameplay
          </div>

          {/* Actions */}
          <div className="space-y-2 pt-2">
            <button
              onClick={onContinue}
              className="w-full py-4 rounded-xl font-bold hover:scale-[1.02] transition-all"
              style={{
                backgroundColor: 'var(--trust)',
                color: '#000'
              }}
            >
              Got It - Continue
            </button>

            {onSkip && (
              <button
                onClick={onSkip}
                className="w-full py-2 text-sm text-white/60 hover:text-white transition-colors"
              >
                Don't show this again
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Compact inline version for first-time users
export function SeedFlowInlineHint() {
  return (
    <div className="rounded-lg p-3 flex items-start gap-2 border"
         style={{
           backgroundColor: 'rgba(0, 212, 255, 0.05)',
           borderColor: 'var(--trust)'
         }}>
      <Lock size={16} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--trust)' }} />
      <div className="text-xs">
        <p className="text-white/80 mb-1">
          <strong>You'll sign 2 transactions:</strong>
        </p>
        <p className="text-white/60">
          One to commit seeds (lock randomness), one to reveal them (verify fairness).
          After this, each step is a single transaction.
        </p>
      </div>
    </div>
  );
}
