import { useEffect } from 'react';
import { History, Menu, Wallet, X, Zap } from 'lucide-react';
import HexGrid from '../components/HexGrid';
import DeathOverlay from '../components/DeathOverlay';
import CashOutOverlay from '../components/CashOutOverlay';
import WalletModal from '../components/WalletModal';
import RoundHistory from '../components/RoundHistory';
import PendingRevealState from '../components/PendingRevealState';
import TrustBadge from '../components/ui/TrustBadge';
import { PendingRoundBanner } from '../components/Banners';
import MultiplierDisplay from '../components/MultiplierDisplay';
import SolAmountInput from '../components/SolAmountInput';
import LiveCashOutFeed, { LiveCashOutTicker } from '../components/LiveCashOutFeed';
import HowItWorksModal from '../components/HowItWorksModal';
import SeedFlowExplainer from '../components/SeedFlowExplainer';
import { ErrorBanner } from '../components/ErrorState';
import type { HomePageViewProps } from '@zone/design-system';

function HomePageView({
  gameState,
  walletConnected,
  walletPublicKey,
  casinoSol,
  walletSol,
  betSol,
  setBetSol,
  betAmount,
  canStartRound,
  hasActiveRound,
  maxSteps,
  currentStep,
  mustCashOut = false,
  multiplier,
  playingBetAmount,
  currentPosition,
  visitedCells,
  openRoundKey,
  onConnect,
  onStartRound: _onStartRound,
  onDirection,
  onCashOut,
  onDeposit,
  onWithdraw,
  onVerifyRound,
  onNavigateVerify,
  onPlayAgain,
  onRetryReveal,
  onCancelPending,
  onSeedExplainerContinue,
  onSeedExplainerSkip,
  onDismissMutationError,
  liveFeed,
  roundHistory,
  txPending: _txPending,
  pickPending = false,
  hexPickEnabled = false,
  readyHint,
  quickPlayReady = false,
  stepPending,
  cashOutPending,
  retryRevealPending,
  cancelPendingPending = false,
  deathData,
  cashOutData,
  deathDirection,
  showDeathImpact,
  mutationError,
  showWallet,
  setShowWallet,
  showHistory,
  setShowHistory,
  showMenu,
  setShowMenu,
  showHowItWorks,
  setShowHowItWorks,
  showSeedExplainer,
  showResumeRoundBanner,
  onResumeRound,
  devnetBanner,
}: HomePageViewProps) {
  useEffect(() => {
    if (gameState !== 'playing' || stepPending || cashOutPending || mustCashOut) {
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      const n = Number(e.key);
      if (n >= 1 && n <= 7) onDirection(n - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [gameState, onDirection, stepPending, cashOutPending, mustCashOut]);

  return (
    <div className="min-h-dvh w-full flex flex-col lg:flex-row">
      <aside className="hidden lg:block w-80 border-r flex-shrink-0" style={{ borderColor: 'var(--border)' }}>
        <div className="sticky top-0 h-dvh flex flex-col min-h-0 overflow-hidden">
          <div className="p-6 border-b" style={{ borderColor: 'var(--border)' }}>
            <h1 className="font-display text-2xl font-extrabold tracking-tight">
              THE <span style={{ color: 'var(--safe)' }}>ZONE</span>
            </h1>
            <p className="text-xs text-white/60 font-mono mt-1">Provably Fair · Devnet</p>
          </div>

          {walletConnected && (
            <div className="p-4 border-b" style={{ borderColor: 'var(--border)' }}>
              <div
                className="rounded-xl p-4 border"
                style={{
                  backgroundColor: 'rgba(0, 255, 163, 0.05)',
                  borderColor: 'var(--safe)',
                }}
              >
                <div className="text-xs text-white/60 mb-2">Casino Balance</div>
                <div className="text-2xl font-bold font-mono mb-3" style={{ color: 'var(--safe)' }}>
                  {casinoSol.toFixed(3)} <span className="text-sm text-white/60">SOL</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowWallet(true)}
                  className="w-full py-2 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                >
                  <Wallet size={14} className="inline mr-2" />
                  Manage Wallet
                </button>
              </div>
            </div>
          )}

          <div className="p-4 border-b" style={{ borderColor: 'var(--border)' }}>
            {liveFeed.cashOuts.length > 0 ? (
              <LiveCashOutTicker cashOuts={liveFeed.cashOuts} isUpdating={liveFeed.isUpdating} />
            ) : (
              <LiveCashOutFeed
                cashOuts={liveFeed.cashOuts}
                isLoading={liveFeed.isLoading}
                error={liveFeed.error}
                isUpdating={liveFeed.isUpdating}
              />
            )}
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto p-4">
            <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
              <History size={16} />
              Recent Rounds
            </h3>
            {walletConnected ? (
              <RoundHistory
                rounds={roundHistory.rounds}
                onVerifyRound={onVerifyRound}
                isLoading={roundHistory.isLoading}
                error={roundHistory.error}
              />
            ) : (
              <div
                className="rounded-xl p-8 text-center border"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  borderColor: 'var(--border)',
                }}
              >
                <p className="text-sm text-white/60">Connect wallet to see history</p>
              </div>
            )}
          </div>

          <div className="p-4 border-t" style={{ borderColor: 'var(--border)' }}>
            <button
              type="button"
              onClick={() => setShowHowItWorks(true)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg hover:bg-white/5 transition-colors"
            >
              <TrustBadge variant="inline" />
              <span className="text-sm">How it works</span>
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-h-0 min-w-0 overflow-y-auto">
        {devnetBanner}
        {(showResumeRoundBanner || (hasActiveRound && gameState === 'ready')) && (
          <PendingRoundBanner onContinue={onResumeRound ?? (() => undefined)} />
        )}
        {mutationError && (
          <ErrorBanner
            type={mutationError.type}
            message={mutationError.message}
            onDismiss={onDismissMutationError}
          />
        )}

        <header
          className="lg:hidden sticky top-0 z-50 backdrop-blur-lg border-b"
          style={{
            backgroundColor: 'rgba(13, 13, 18, 0.9)',
            borderColor: 'var(--border)',
          }}
        >
          <div className="flex items-center justify-between px-4 py-3">
            <div className="font-display text-xl font-bold tracking-tight">
              THE <span style={{ color: 'var(--safe)' }}>ZONE</span>
            </div>

            {walletConnected ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowWallet(true)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <div className="text-right">
                    <div className="font-mono text-sm font-bold" style={{ color: 'var(--safe)' }}>
                      {casinoSol.toFixed(2)}
                    </div>
                  </div>
                  <Wallet size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setShowMenu(!showMenu)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  {showMenu ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={onConnect}
                className="px-4 py-2 rounded-lg font-medium hover:bg-white/10 transition-colors"
                style={{
                  backgroundColor: 'rgba(0, 255, 163, 0.1)',
                  color: 'var(--safe)',
                }}
              >
                Connect
              </button>
            )}
          </div>

          {showMenu && walletConnected && (
            <div className="border-t p-4 space-y-3" style={{ borderColor: 'var(--border)' }}>
              <button
                type="button"
                onClick={() => {
                  setShowHistory(true);
                  setShowMenu(false);
                }}
                className="w-full flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors"
              >
                <History size={16} />
                <span>Round History</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowHowItWorks(true);
                  setShowMenu(false);
                }}
                className="w-full flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors"
              >
                <Zap size={16} />
                <span>How Verification Works</span>
              </button>
            </div>
          )}
        </header>

        <div className="w-full p-4 py-6 flex flex-col items-center">
          {gameState === 'preview' && !walletConnected && (
            <div className="max-w-md w-full space-y-8 text-center">
              <div>
                <h1 className="font-display text-5xl font-extrabold mb-2 tracking-tight lg:hidden">
                  THE <span style={{ color: 'var(--safe)' }}>ZONE</span>
                </h1>
                <p className="text-white/60 font-mono text-sm lg:hidden">Provably Fair · Solana Devnet</p>
              </div>

              <HexGrid
                currentPosition={{ q: 0, r: 0 }}
                visitedCells={new Set(['0,0'])}
                isPlaying={false}
              />

              <div className="space-y-4">
                <p className="text-xl text-white/90 font-medium">Expand the safe zone</p>
                <p className="text-sm text-white/60">
                  Choose directions · Build multiplier · Cash out before death
                </p>
              </div>

              <button
                type="button"
                onClick={onConnect}
                className="w-full py-5 rounded-2xl font-bold text-lg hover:scale-[1.02] transition-all shadow-lg"
                style={{
                  backgroundColor: 'var(--safe)',
                  color: '#000',
                  boxShadow: '0 0 30px var(--safe-glow)',
                }}
              >
                Connect Wallet to Play
              </button>

              <div className="flex items-center justify-center gap-2 text-sm" style={{ color: 'var(--trust)' }}>
                <Zap size={16} />
                <span>Every round verifiable on-chain</span>
              </div>
            </div>
          )}

          {gameState === 'ready' && (
            <div className="max-w-md w-full space-y-6">
              <div
                className="rounded-xl px-4 py-3 border text-center text-sm"
                style={{
                  backgroundColor: 'rgba(255, 235, 59, 0.08)',
                  borderColor: 'var(--voltage)',
                  color: 'var(--voltage)',
                }}
              >
                {pickPending
                  ? 'Sign once in Phantom — bet, reveal & first step'
                  : quickPlayReady
                    ? 'Tap a direction — one sign to start, then instant hex moves'
                    : 'Tap a direction — sign once to enable quick play & start'}
              </div>

              <div
                className="rounded-xl p-4 border"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  borderColor: 'var(--border)',
                }}
              >
                <label className="text-sm text-white/60 mb-2 block font-medium">Bet Amount</label>
                <SolAmountInput
                  value={betSol}
                  onChange={setBetSol}
                  min={0.01}
                  max={casinoSol}
                  disabled={pickPending}
                  presets={[
                    { label: 'MIN', value: '0.01' },
                    {
                      label: 'HALF',
                      value: String(Math.floor((casinoSol / 2) * 100) / 100),
                    },
                  ]}
                />
              </div>

              <HexGrid
                currentPosition={currentPosition}
                visitedCells={visitedCells}
                onDirectionSelect={hexPickEnabled ? onDirection : undefined}
                isPlaying={hexPickEnabled}
              />

              <p className="text-center text-xs text-white/40 font-mono">
                {readyHint ??
                  (hexPickEnabled
                    ? 'Pick your first cell · keys 1–7 · Provably fair on-chain'
                    : betAmount > casinoSol
                      ? 'Deposit more SOL to play'
                      : !canStartRound
                        ? 'Finish or refund your open round first'
                        : 'Set bet (min 0.01 SOL)')}
              </p>
            </div>
          )}

          {gameState === 'playing' && (
            <div className="w-full max-w-2xl space-y-8">
              <div className="flex justify-center">
                <MultiplierDisplay
                  value={multiplier}
                  state={mustCashOut ? 'max_risk' : 'ticking'}
                  potentialWin={playingBetAmount * multiplier}
                  currentStep={currentStep}
                  maxSteps={maxSteps}
                  size="xl"
                />
              </div>

              <div className="lg:scale-110 max-w-md mx-auto">
                <HexGrid
                  currentPosition={currentPosition}
                  visitedCells={visitedCells}
                  onDirectionSelect={mustCashOut ? undefined : onDirection}
                  isPlaying={!mustCashOut}
                  deathDirection={deathDirection ?? undefined}
                  showDeathImpact={showDeathImpact}
                />
                {!mustCashOut && (
                  <p className="text-center text-xs text-white/40 font-mono mt-2">
                    {quickPlayReady
                      ? 'Tap neighbors — no wallet popup per step'
                      : 'Tap a neighbor · keys 1–7'}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={onCashOut}
                disabled={cashOutPending || currentStep === 0}
                className="w-full py-6 rounded-2xl font-bold text-xl disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] transition-all shadow-lg animate-pulse"
                style={{
                  backgroundColor: 'var(--voltage)',
                  color: '#000',
                  boxShadow: '0 0 30px var(--voltage-glow)',
                }}
              >
                CASH OUT +{(playingBetAmount * multiplier).toFixed(3)} SOL
              </button>

              <button
                type="button"
                onClick={() => openRoundKey && onNavigateVerify(openRoundKey)}
                className="w-full flex items-center justify-center gap-2 text-sm py-2 hover:opacity-80 transition-opacity"
                style={{ color: 'var(--trust)' }}
              >
                <Zap size={14} />
                <span>This round is verifiable</span>
              </button>
            </div>
          )}
        </div>
      </main>

      {gameState === 'win' && cashOutData && (
        <CashOutOverlay
          winAmount={cashOutData.winAmount}
          betAmount={cashOutData.betAmount}
          multiplier={cashOutData.multiplier}
          steps={cashOutData.steps}
          onVerify={() => cashOutData.roundPda && onNavigateVerify(cashOutData.roundPda)}
          onPlayAgain={onPlayAgain}
          onClose={onPlayAgain}
        />
      )}

      {gameState === 'loss' && deathData && (
        <DeathOverlay
          betAmount={deathData.betAmount}
          step={deathData.step}
          roll={deathData.roll}
          threshold={deathData.threshold}
          direction={deathData.direction}
          onVerify={() => deathData.roundPda && onNavigateVerify(deathData.roundPda)}
          onPlayAgain={onPlayAgain}
          onClose={onPlayAgain}
        />
      )}

      {showWallet && walletPublicKey && (
        <WalletModal
          casinoBalance={casinoSol}
          walletBalance={walletSol}
          walletAddress={walletPublicKey}
          hasActiveRound={hasActiveRound}
          onClose={() => setShowWallet(false)}
          onDeposit={onDeposit}
          onWithdraw={onWithdraw}
        />
      )}

      {showHistory && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowHistory(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-[var(--background-overlay)] rounded-t-3xl border-t border-[var(--border)] max-h-[80vh] overflow-y-auto animate-in slide-in-from-bottom">
            <div className="sticky top-0 bg-[var(--background-overlay)] border-b border-[var(--border)] p-4 flex items-center justify-between">
              <h2 className="font-bold text-lg">Round History</h2>
              <button type="button" onClick={() => setShowHistory(false)} className="p-2 rounded-lg hover:bg-white/10">
                <X size={20} />
              </button>
            </div>
            <div className="p-4">
              <RoundHistory
                rounds={roundHistory.rounds}
                onVerifyRound={onVerifyRound}
                isLoading={roundHistory.isLoading}
                error={roundHistory.error}
              />
            </div>
          </div>
        </div>
      )}

      {gameState === 'pending_reveal' && (
        <PendingRevealState
          onRetry={onRetryReveal}
          onRefund={onCancelPending}
          isRetrying={retryRevealPending}
          isRefunding={cancelPendingPending}
        />
      )}

      {showHowItWorks && <HowItWorksModal onClose={() => setShowHowItWorks(false)} />}

      {showSeedExplainer && (
        <SeedFlowExplainer onContinue={onSeedExplainerContinue} onSkip={onSeedExplainerSkip} />
      )}
    </div>
  );
}

export { HomePageView };
export default HomePageView;
export type { HomePageViewProps } from '@zone/design-system';
