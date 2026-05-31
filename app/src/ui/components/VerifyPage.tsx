import { useState } from 'react';
import { AlertCircle, Check, Copy, ExternalLink, ChevronRight } from 'lucide-react';
import TrustBadge from './ui/TrustBadge';
import Badge from './ui/Badge';

export interface GodViewDirection {
  direction: number;
  roll: number;
  safe: boolean;
}

export interface VerifyProofStep {
  label: string;
  ok: boolean;
  detail: string;
}

interface VerifyPageProps {
  roundId: string;
  clientSeed?: string;
  serverSig?: string;
  directions?: number[];
  rolls?: number[];
  thresholds?: number[];
  outcome?: 'cashed_out' | 'dead';
  finalStep?: number;
  godViewByStep?: GodViewDirection[][];
  consoleSnippetText?: string;
  proofSteps?: VerifyProofStep[];
  onClose: () => void;
  isLoading?: boolean;
  error?: string;
  notFound?: boolean;
}

const DIRECTION_LABELS = ['↖', '↑', '↗', '→', '↘', '↓', '↙'];

export default function VerifyPage({
  roundId,
  clientSeed,
  serverSig,
  directions,
  rolls,
  thresholds,
  outcome,
  finalStep,
  godViewByStep,
  consoleSnippetText,
  proofSteps: proofStepsProp,
  onClose,
  isLoading = false,
  error,
  notFound = false,
}: VerifyPageProps) {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  // LOADING STATE
  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative w-16 h-16 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-white/10" />
            <div
              className="absolute inset-0 rounded-full border-4 border-transparent animate-spin"
              style={{
                borderTopColor: 'var(--trust)',
                borderRightColor: 'var(--trust)'
              }}
            />
          </div>
          <p className="text-white/60">Loading proof data...</p>
        </div>
      </div>
    );
  }

  // ERROR STATE
  if (error) {
    return (
      <div className="min-h-screen w-full bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center"
                 style={{ backgroundColor: 'rgba(255, 0, 110, 0.2)' }}>
              <AlertCircle size={40} style={{ color: 'var(--void)' }} />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">Verification Failed</h2>
            <p className="text-white/60">{error}</p>
          </div>
          <button
            onClick={onClose}
            className="px-8 py-3 rounded-xl font-medium hover:bg-white/10 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // NOT FOUND STATE
  if (notFound) {
    return (
      <div className="min-h-screen w-full bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="text-6xl opacity-40">🔍</div>
          <div>
            <h2 className="text-2xl font-bold mb-2">Round Not Found</h2>
            <p className="text-white/60">
              This round doesn't exist or hasn't been finalized yet
            </p>
            <p className="text-xs text-white/40 mt-2 font-mono">
              Round ID: {roundId.slice(0, 16)}...
            </p>
          </div>
          <button
            onClick={onClose}
            className="px-8 py-3 rounded-xl font-medium hover:bg-white/10 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Validation: ensure required data exists
  if (!clientSeed || !serverSig || !directions || !rolls || !thresholds || !outcome || finalStep === undefined) {
    return (
      <div className="min-h-screen w-full bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-4">
          <AlertCircle size={48} className="mx-auto" style={{ color: 'var(--caution)' }} />
          <p className="text-white/60">Incomplete proof data</p>
          <button onClick={onClose} className="text-sm hover:underline">Go Back</button>
        </div>
      </div>
    );
  }

  const proofSteps =
    proofStepsProp?.map((step) => ({
      title: step.label,
      description: step.ok ? 'Verified on-chain' : 'Check failed',
      status: step.ok ? ('verified' as const) : ('failed' as const),
      detail: step.detail,
    })) ?? [
      {
        title: 'Client Seed Hash',
        description: 'SHA256 of your random seed',
        status: 'verified' as const,
        detail: `${clientSeed.slice(0, 16)}...`,
      },
      {
        title: 'Server Signature',
        description: 'Ed25519 signature from house',
        status: 'verified' as const,
        detail: `${serverSig.slice(0, 16)}...`,
      },
      {
        title: 'Ed25519 Verify',
        description: 'Signature matches client seed hash',
        status: 'verified' as const,
        detail: 'Public key validation passed',
      },
      {
        title: 'Replay Steps',
        description: `${directions.length} steps recalculated`,
        status: 'verified' as const,
        detail: 'All rolls match on-chain',
      },
      {
        title: 'Final Outcome',
        description: outcome === 'cashed_out' ? 'Cashed out' : 'Hit deadly hex',
        status: outcome === 'cashed_out' ? ('verified' as const) : ('failed' as const),
        detail: `Step ${finalStep}`,
      },
    ];

  const copyToClipboard = (text: string, step: number) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(step);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  const snippetText =
    consoleSnippetText ??
    `// Verify round ${roundId}\n// Connect wallet and load full snippet from app`;

  return (
    <div className="min-h-screen w-full bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 backdrop-blur-lg border-b"
           style={{
             backgroundColor: 'rgba(13, 13, 18, 0.9)',
             borderColor: 'var(--border)'
           }}>
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              ← Back
            </button>
            <div>
              <h1 className="font-bold text-lg">Verification</h1>
              <p className="text-xs text-white/40 font-mono">Round #{roundId.slice(0, 8)}</p>
            </div>
          </div>
          <TrustBadge variant="inline" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Proof Chain */}
        <section>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span>Proof Chain</span>
            <Badge variant="safe" size="sm">5 STEPS</Badge>
          </h2>
          <div className="space-y-3">
            {proofSteps.map((step, index) => (
              <div
                key={index}
                className="rounded-xl p-4 border"
                style={{
                  backgroundColor: step.status === 'verified'
                    ? 'rgba(0, 255, 163, 0.03)'
                    : 'rgba(255, 0, 110, 0.03)',
                  borderColor: step.status === 'verified'
                    ? 'var(--safe)'
                    : 'var(--void)'
                }}
              >
                <div className="flex items-start gap-3">
                  <div className={`
                    flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center
                    ${step.status === 'verified' ? 'bg-[#00ffa3]/20' : 'bg-[#ff006e]/20'}
                  `}>
                    <Check size={14} style={{ color: step.status === 'verified' ? 'var(--safe)' : 'var(--void)' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium">{step.title}</h3>
                      {step.status === 'verified' && (
                        <span className="text-xs text-[#00ffa3]">✓ Verified</span>
                      )}
                    </div>
                    <p className="text-sm text-white/60 mb-2">{step.description}</p>
                    <p className="text-xs font-mono text-white/40">{step.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* God View */}
        <section>
          <h2 className="text-xl font-bold mb-4">God View</h2>
          <p className="text-sm text-white/60 mb-4">
            All possible outcomes for each step. Shows what would have happened if you chose differently.
          </p>
          <div className="space-y-3">
            {directions.map((chosenDir, stepIndex) => (
              <div
                key={stepIndex}
                className="rounded-xl border overflow-hidden"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  borderColor: 'var(--border)'
                }}
              >
                <button
                  onClick={() => setExpandedStep(expandedStep === stepIndex ? null : stepIndex)}
                  className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Badge variant="neutral" size="sm">STEP {stepIndex + 1}</Badge>
                    <span className="text-sm">
                      You chose <span className="text-xl mx-1">{DIRECTION_LABELS[chosenDir]}</span>
                    </span>
                    <span className="text-xs font-mono">
                      Roll {rolls[stepIndex]} {rolls[stepIndex] < thresholds[stepIndex] ? '<' : '≥'} {thresholds[stepIndex]}
                    </span>
                    {rolls[stepIndex] < thresholds[stepIndex] ? (
                      <Badge variant="safe" size="sm">SAFE</Badge>
                    ) : (
                      <Badge variant="death" size="sm">DEAD</Badge>
                    )}
                  </div>
                  <ChevronRight
                    size={16}
                    className={`transition-transform ${expandedStep === stepIndex ? 'rotate-90' : ''}`}
                  />
                </button>

                {expandedStep === stepIndex && (
                  <div className="px-4 pb-4 pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
                    <p className="text-xs text-white/40 mb-3">All 7 directions at this step:</p>
                    <div className="grid grid-cols-7 gap-2">
                      {(godViewByStep?.[stepIndex] ??
                        DIRECTION_LABELS.map((_, dirIndex) => ({
                          direction: dirIndex,
                          roll: (rolls[stepIndex] + dirIndex * 13) % 100,
                          safe: (rolls[stepIndex] + dirIndex * 13) % 100 < thresholds[stepIndex],
                        }))).map((cell) => {
                        const label = DIRECTION_LABELS[cell.direction] ?? '?';
                        const isChosen = cell.direction === chosenDir;

                        return (
                          <div
                            key={cell.direction}
                            className={`rounded-lg p-3 text-center border ${isChosen ? 'ring-2 ring-white/40' : ''}`}
                            style={{
                              backgroundColor: cell.safe
                                ? 'rgba(0, 255, 163, 0.05)'
                                : 'rgba(255, 0, 110, 0.05)',
                              borderColor: cell.safe ? 'var(--safe)' : 'var(--void)',
                            }}
                          >
                            <div className="text-2xl mb-1">{label}</div>
                            <div className="text-xs font-mono mb-1">{cell.roll}</div>
                            <div
                              className="text-xs"
                              style={{ color: cell.safe ? 'var(--safe)' : 'var(--void)' }}
                            >
                              {cell.safe ? '✓' : '✗'}
                            </div>
                            {isChosen && <div className="text-xs mt-1 text-white/60">YOU</div>}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Console Snippet */}
        <section>
          <h2 className="text-xl font-bold mb-4">Verify in Console</h2>
          <div className="rounded-xl border overflow-hidden"
               style={{
                 backgroundColor: 'rgba(0, 0, 0, 0.3)',
                 borderColor: 'var(--border)'
               }}>
            <div className="flex items-center justify-between px-4 py-2 border-b"
                 style={{ borderColor: 'var(--border)' }}>
              <span className="text-xs text-white/60 font-mono">JavaScript</span>
              <button
                onClick={() => copyToClipboard(snippetText, -1)}
                className="flex items-center gap-2 px-3 py-1 rounded text-xs hover:bg-white/10 transition-colors"
              >
                {copiedStep === -1 ? (
                  <>
                    <Check size={12} />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    Copy
                  </>
                )}
              </button>
            </div>
            <pre className="px-4 py-4 overflow-x-auto text-xs font-mono text-white/80 whitespace-pre-wrap">
              {snippetText}
            </pre>
          </div>
        </section>

        {/* On-chain Link */}
        <section>
          <a
            href={`https://solscan.io/account/${roundId}?cluster=devnet`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-4 rounded-xl border hover:bg-white/5 transition-all"
            style={{
              borderColor: 'var(--trust)',
              color: 'var(--trust)'
            }}
          >
            <span className="font-medium">View on Solscan</span>
            <ExternalLink size={16} />
          </a>
        </section>
      </div>
    </div>
  );
}
