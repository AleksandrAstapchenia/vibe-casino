import { X, Shield, Key, Lock, CheckCircle, Code } from 'lucide-react';

interface HowItWorksModalProps {
  onClose: () => void;
}

const STEPS = [
  {
    icon: Key,
    title: 'You Generate Random Seed',
    description: 'Your browser creates a 32-byte random seed using crypto.getRandomValues(). This is YOUR randomness - the house never sees it.',
    technical: 'clientSeed = crypto.getRandomValues(new Uint8Array(32))',
    color: 'var(--safe)'
  },
  {
    icon: Lock,
    title: 'House Signs Commitment',
    description: 'We hash your seed and ask the house to sign it with Ed25519. The signature is deterministic - same input always gives same output.',
    technical: 'serverSig = Ed25519.sign(SHA256(clientSeed), housePrivateKey)',
    color: 'var(--trust)'
  },
  {
    icon: Shield,
    title: 'On-Chain Verification',
    description: 'Both seeds are committed on-chain BEFORE the round starts. The house public key is in the program bytecode - anyone can verify the signature.',
    technical: 'Ed25519.verify(serverSig, clientSeedHash, HOUSE_PUBKEY) ✓',
    color: 'var(--voltage)'
  },
  {
    icon: Code,
    title: 'Deterministic Roll Formula',
    description: 'Each step outcome is calculated from: your seed + server seed + step number + direction + position. Same inputs = same roll.',
    technical: 'roll = SHA256(clientSeed || serverSeed || step || direction || position) mod 100',
    color: 'var(--caution)'
  },
  {
    icon: CheckCircle,
    title: 'You Can Verify Everything',
    description: 'After the round, replay all steps in console. God-view shows what would have happened if you picked different directions.',
    technical: 'Every outcome is mathematically provable - not animation or server decision.',
    color: 'var(--safe)'
  }
];

export default function HowItWorksModal({ onClose }: HowItWorksModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full sm:max-w-3xl rounded-t-3xl sm:rounded-2xl border-t sm:border overflow-hidden max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom sm:zoom-in-95"
           style={{
             backgroundColor: 'var(--background-overlay)',
             borderColor: 'var(--border)'
           }}>
        {/* Header */}
        <div className="sticky top-0 z-10 backdrop-blur-lg border-b"
             style={{
               backgroundColor: 'rgba(13, 13, 18, 0.95)',
               borderColor: 'var(--border)'
             }}>
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <h2 className="font-bold text-xl">How Provability Works</h2>
              <p className="text-xs text-white/60 mt-1">Cryptographic fairness explained</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Introduction */}
          <div className="rounded-xl p-6 border"
               style={{
                 backgroundColor: 'rgba(0, 212, 255, 0.05)',
                 borderColor: 'var(--trust)'
               }}>
            <p className="text-sm text-white/80 leading-relaxed">
              Traditional online casinos ask you to trust that they're being fair.
              <strong className="text-white"> We don't ask for trust - we give you mathematical proof.</strong>
              {' '}Every outcome in The Zone can be independently verified by anyone, without trusting our frontend, backend, or database.
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-4">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="rounded-xl p-5 border"
                     style={{
                       backgroundColor: 'rgba(255, 255, 255, 0.02)',
                       borderColor: 'var(--border)'
                     }}>
                  <div className="flex items-start gap-4">
                    {/* Step number & icon */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center relative"
                           style={{ backgroundColor: `${step.color}20` }}>
                        <Icon size={24} style={{ color: step.color }} />
                        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                             style={{
                               backgroundColor: step.color,
                               color: '#000'
                             }}>
                          {index + 1}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold mb-2">{step.title}</h3>
                      <p className="text-sm text-white/70 mb-3 leading-relaxed">
                        {step.description}
                      </p>

                      {/* Technical detail */}
                      <div className="rounded-lg p-3 font-mono text-xs overflow-x-auto"
                           style={{
                             backgroundColor: 'rgba(0, 0, 0, 0.3)',
                             borderLeft: `3px solid ${step.color}`
                           }}>
                        <code className="text-white/60">{step.technical}</code>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Why This Matters */}
          <div className="rounded-xl p-6 border space-y-4"
               style={{
                 backgroundColor: 'rgba(0, 255, 163, 0.05)',
                 borderColor: 'var(--safe)'
               }}>
            <h3 className="font-bold flex items-center gap-2">
              <Shield size={20} style={{ color: 'var(--safe)' }} />
              Why This Matters
            </h3>
            <div className="space-y-3 text-sm text-white/80">
              <div className="flex gap-3">
                <span className="text-[var(--safe)]">✓</span>
                <p>
                  <strong>The house cannot cheat.</strong> The server signature is created BEFORE your seed is revealed.
                  Ed25519 is deterministic - they can't "pick a favorable outcome" after seeing your seed.
                </p>
              </div>
              <div className="flex gap-3">
                <span className="text-[var(--safe)]">✓</span>
                <p>
                  <strong>The frontend cannot lie.</strong> All outcomes are on-chain.
                  If our UI shows a different result than what's in the Solana transaction, you'll see it on Solscan.
                </p>
              </div>
              <div className="flex gap-3">
                <span className="text-[var(--safe)]">✓</span>
                <p>
                  <strong>Anyone can verify.</strong> You don't need to trust us, our server, or even this explanation.
                  Copy the seeds from Solscan, run the formula in your browser console, and verify every step yourself.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center space-y-3">
            <p className="text-sm text-white/60">
              After every round, click <strong className="text-[var(--trust)]">"Verify"</strong> to see the proof
            </p>
            <button
              onClick={onClose}
              className="px-8 py-3 rounded-xl font-bold hover:scale-[1.02] transition-all"
              style={{
                backgroundColor: 'var(--safe)',
                color: '#000'
              }}
            >
              Got It
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
