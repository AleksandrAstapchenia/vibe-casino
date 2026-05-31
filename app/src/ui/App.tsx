import { useState } from 'react';
import HexGrid from './components/HexGrid';
import { DirectionControls } from './components/DirectionControls';
import DeathOverlay from './components/DeathOverlay';
import CashOutOverlay from './components/CashOutOverlay';
import WalletModal from './components/WalletModal';
import RoundHistory from './components/RoundHistory';
import VerifyPage from './components/VerifyPage';
import PendingRevealState from './components/PendingRevealState';
import TrustBadge from './components/ui/TrustBadge';
import { DevnetBanner, PendingRoundBanner, MaxDepthBanner, TxStatusBanner } from './components/Banners';
import MultiplierDisplay from './components/MultiplierDisplay';
import LiveCashOutFeed from './components/LiveCashOutFeed';
import HowItWorksModal from './components/HowItWorksModal';
import SeedFlowExplainer from './components/SeedFlowExplainer';
import ToastProvider from './components/ToastProvider';
import { Zap, Wallet, History, Menu, X } from 'lucide-react';
import { toast } from './utils/toast';

type GameState = 'preview' | 'ready' | 'playing' | 'win' | 'loss' | 'pending_reveal' | 'verify';
type TxState = 'idle' | 'signing' | 'broadcasting' | 'confirming';

export default function App() {
  // App state
  const [gameState, setGameState] = useState<GameState>('preview');
  const [isConnected, setIsConnected] = useState(false);
  const [isWrongNetwork, setIsWrongNetwork] = useState(false);

  // Wallet & Balance
  const [casinoBalance, setCasinoBalance] = useState(0.5);
  const [walletBalance, setWalletBalance] = useState(1.25);
  const [walletAddress] = useState('7xK9mN2pQr8Hs4vL3wT1fY6cB5dA8eR2');
  const [showWallet, setShowWallet] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [showSeedExplainer, setShowSeedExplainer] = useState(false);
  const [hasSeenSeedExplainer, setHasSeenSeedExplainer] = useState(false);

  // Game state
  const [currentStep, setCurrentStep] = useState(0);
  const [multiplier, setMultiplier] = useState(1.00);
  const [betAmount, setBetAmount] = useState(0.01);
  const [visitedCells] = useState(new Set(['0,0']));
  const [currentPosition] = useState({ q: 0, r: 0 });
  const [hasActiveRound, setHasActiveRound] = useState(false);
  const [txState, setTxState] = useState<TxState>('idle');

  // Round data for verification
  const [lastRoundData] = useState({
    roundId: 'abc123def456',
    clientSeed: 'a3f9c2b1e8d7f6a5c4b3e2d1f9a8b7c6',
    serverSig: 'cc12abff45ee98dd77aa66bb55ee44dd33cc22bb11aa00ff99ee88dd77cc66bb55aa44ee33dd22cc11bb00aa99ff88ee77dd66cc55bb44aa33ee22dd11cc00bb',
    directions: [2, 2, 5],
    rolls: [23, 55, 71],
    thresholds: [85, 78, 71],
    outcome: 'dead' as const,
    finalStep: 3
  });

  // Mock rounds
  const [rounds] = useState([
    {
      id: 'round-001',
      status: 'cashed_out' as const,
      betAmount: 0.05,
      step: 4,
      multiplier: 1.48,
      payout: 0.074,
      timestamp: Date.now() - 3600000
    },
    {
      id: 'round-002',
      status: 'dead' as const,
      betAmount: 0.1,
      step: 2,
      timestamp: Date.now() - 1800000
    }
  ]);

  // Actions
  const handleConnect = () => {
    setIsConnected(true);
    setGameState('ready');
    toast.wallet.connected(walletAddress);
  };

  const handleStartRound = () => {
    if (betAmount < 0.01 || betAmount > casinoBalance) return;

    // Show seed explainer on first round
    if (!hasSeenSeedExplainer) {
      setShowSeedExplainer(true);
      return;
    }

    startRoundFlow();
  };

  const startRoundFlow = () => {
    const toastId = toast.transaction.signing();
    setTxState('signing');
    setTimeout(() => {
      toast.transaction.broadcasting(toastId);
      setTxState('broadcasting');
      setTimeout(() => {
        toast.transaction.confirming(toastId);
        setTxState('confirming');
        setTimeout(() => {
          toast.transaction.success(toastId, 'Round started');
          toast.game.roundStarted(betAmount);
          setGameState('playing');
          setHasActiveRound(true);
          setCurrentStep(1);
          setMultiplier(1.12);
          setTxState('idle');
        }, 1000);
      }, 500);
    }, 1000);
  };

  const handleDirection = (direction: number) => {
    console.log('Selected direction:', direction);
    setCurrentStep(prev => prev + 1);
    setMultiplier(prev => prev + 0.12);

    // Simulate random outcome (in real app, would be on-chain)
    const isLastStep = currentStep >= 6;
    if (isLastStep) {
      // Force cash out at max depth
      handleCashOut();
    }
  };

  const handleCashOut = () => {
    const winAmount = betAmount * multiplier;
    setCasinoBalance(prev => prev + (winAmount - betAmount));
    setGameState('win');
    setHasActiveRound(false);
    toast.game.cashedOut(winAmount, multiplier);
  };

  const handleLoss = () => {
    setCasinoBalance(prev => prev - betAmount);
    setGameState('loss');
    setHasActiveRound(false);
    toast.game.death(currentStep);
  };

  const handleDeposit = (amount: number) => {
    setCasinoBalance(prev => prev + amount);
    setWalletBalance(prev => prev - amount);
    setShowWallet(false);
    toast.wallet.deposited(amount);
  };

  const handleWithdraw = (amount: number) => {
    setCasinoBalance(prev => prev - amount);
    setWalletBalance(prev => prev + amount);
    setShowWallet(false);
    toast.wallet.withdrawn(amount);
  };

  const handleVerifyRound = (roundId: string) => {
    setGameState('verify');
    setShowHistory(false);
  };

  const getTxMessage = () => {
    switch (txState) {
      case 'signing': return 'Waiting for signature...';
      case 'broadcasting': return 'Broadcasting transaction...';
      case 'confirming': return 'Confirming on-chain...';
      default: return null;
    }
  };

  const txMessage = getTxMessage();

  // VERIFY PAGE
  if (gameState === 'verify') {
    return (
      <VerifyPage
        {...lastRoundData}
        onClose={() => setGameState('ready')}
      />
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row">
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:block w-80 border-r flex-shrink-0"
             style={{ borderColor: 'var(--border)' }}>
        <div className="sticky top-0 h-screen flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b" style={{ borderColor: 'var(--border)' }}>
            <h1 className="font-display text-2xl font-extrabold tracking-tight">
              THE <span style={{ color: 'var(--safe)' }}>ZONE</span>
            </h1>
            <p className="text-xs text-white/60 font-mono mt-1">
              Provably Fair · Devnet
            </p>
          </div>

          {/* Balance Card */}
          <div className="p-4 border-b" style={{ borderColor: 'var(--border)' }}>
            <div className="rounded-xl p-4 border"
                 style={{
                   backgroundColor: 'rgba(0, 255, 163, 0.05)',
                   borderColor: 'var(--safe)'
                 }}>
              <div className="text-xs text-white/60 mb-2">Casino Balance</div>
              <div className="text-2xl font-bold font-mono mb-3" style={{ color: 'var(--safe)' }}>
                {casinoBalance.toFixed(3)} <span className="text-sm text-white/60">SOL</span>
              </div>
              <button
                onClick={() => setShowWallet(true)}
                className="w-full py-2 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
              >
                <Wallet size={14} className="inline mr-2" />
                Manage Wallet
              </button>
            </div>
          </div>

          {/* Live Cash-Out Feed */}
          <div className="p-4 border-b" style={{ borderColor: 'var(--border)' }}>
            <LiveCashOutFeed variant="ticker" />
          </div>

          {/* Round History */}
          <div className="flex-1 overflow-y-auto p-4">
            <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
              <History size={16} />
              Recent Rounds
            </h3>
            <RoundHistory rounds={rounds} onVerifyRound={handleVerifyRound} />
          </div>

          {/* Trust Badge */}
          <div className="p-4 border-t" style={{ borderColor: 'var(--border)' }}>
            <button
              onClick={() => setShowHowItWorks(true)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg hover:bg-white/5 transition-colors"
            >
              <TrustBadge variant="inline" />
              <span className="text-sm">How it works</span>
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col">
        {/* Banners */}
        {isWrongNetwork && <DevnetBanner onSwitch={() => setIsWrongNetwork(false)} />}
        {hasActiveRound && gameState === 'ready' && (
          <PendingRoundBanner onContinue={() => setGameState('playing')} />
        )}
        {gameState === 'playing' && currentStep >= 7 && <MaxDepthBanner />}
        {txMessage && <TxStatusBanner message={txMessage} type="info" />}

        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-50 backdrop-blur-lg border-b"
                style={{
                  backgroundColor: 'rgba(13, 13, 18, 0.9)',
                  borderColor: 'var(--border)'
                }}>
          <div className="flex items-center justify-between px-4 py-3">
            <div className="font-display text-xl font-bold tracking-tight">
              THE <span style={{ color: 'var(--safe)' }}>ZONE</span>
            </div>

            {isConnected ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowWallet(true)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <div className="text-right">
                    <div className="font-mono text-sm font-bold" style={{ color: 'var(--safe)' }}>
                      {casinoBalance.toFixed(2)}
                    </div>
                  </div>
                  <Wallet size={16} />
                </button>
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  {showMenu ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            ) : (
              <button
                onClick={handleConnect}
                className="px-4 py-2 rounded-lg font-medium hover:bg-white/10 transition-colors"
                style={{
                  backgroundColor: 'rgba(0, 255, 163, 0.1)',
                  color: 'var(--safe)'
                }}
              >
                Connect
              </button>
            )}
          </div>

          {/* Mobile Menu */}
          {showMenu && (
            <div className="border-t p-4 space-y-3" style={{ borderColor: 'var(--border)' }}>
              <button
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

        {/* Game Content */}
        <div className="flex-1 flex items-center justify-center p-4">
          {/* PREVIEW STATE */}
          {gameState === 'preview' && !isConnected && (
            <div className="max-w-md w-full space-y-8 text-center">
              <div>
                <h1 className="font-display text-5xl font-extrabold mb-2 tracking-tight lg:hidden">
                  THE <span style={{ color: 'var(--safe)' }}>ZONE</span>
                </h1>
                <p className="text-white/60 font-mono text-sm lg:hidden">
                  Provably Fair · Solana Devnet
                </p>
              </div>

              <HexGrid
                currentPosition={{ q: 0, r: 0 }}
                visitedCells={new Set(['0,0'])}
                isPlaying={false}
              />

              <div className="space-y-4">
                <p className="text-xl text-white/90 font-medium">
                  Expand the safe zone
                </p>
                <p className="text-sm text-white/60">
                  Choose directions · Build multiplier · Cash out before death
                </p>
              </div>

              <button
                onClick={handleConnect}
                className="w-full py-5 rounded-2xl font-bold text-lg hover:scale-[1.02] transition-all shadow-lg"
                style={{
                  backgroundColor: 'var(--safe)',
                  color: '#000',
                  boxShadow: '0 0 30px var(--safe-glow)'
                }}
              >
                Connect Wallet to Play
              </button>

              <div className="flex items-center justify-center gap-2 text-sm"
                   style={{ color: 'var(--trust)' }}>
                <Zap size={16} />
                <span>Every round verifiable on-chain</span>
              </div>
            </div>
          )}

          {/* READY STATE */}
          {gameState === 'ready' && (
            <div className="max-w-md w-full space-y-6">
              <HexGrid
                currentPosition={currentPosition}
                visitedCells={visitedCells}
                isPlaying={false}
              />

              <div className="space-y-4">
                <div className="rounded-xl p-4 border"
                     style={{
                       backgroundColor: 'rgba(255, 255, 255, 0.03)',
                       borderColor: 'var(--border)'
                     }}>
                  <label className="text-sm text-white/60 mb-2 block font-medium">
                    Bet Amount
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={betAmount}
                      onChange={(e) => setBetAmount(parseFloat(e.target.value) || 0.01)}
                      step="0.01"
                      min="0.01"
                      max={casinoBalance}
                      className="flex-1 rounded-lg px-4 py-3 text-lg font-mono text-white focus:outline-none border-2 focus:border-opacity-50"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                      }}
                    />
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => setBetAmount(0.01)}
                        className="px-3 py-1.5 rounded text-xs hover:bg-white/20 transition-colors"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                      >
                        MIN
                      </button>
                      <button
                        onClick={() => setBetAmount(Math.floor((casinoBalance / 2) * 100) / 100)}
                        className="px-3 py-1.5 rounded text-xs hover:bg-white/20 transition-colors"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                      >
                        HALF
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleStartRound}
                  disabled={betAmount < 0.01 || betAmount > casinoBalance || txState !== 'idle'}
                  className="w-full py-6 rounded-2xl font-bold text-xl disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] transition-all shadow-lg"
                  style={{
                    backgroundColor: 'var(--voltage)',
                    color: '#000',
                    boxShadow: '0 0 30px var(--voltage-glow)'
                  }}
                >
                  {txState !== 'idle' ? 'Starting...' : 'START ROUND'}
                </button>

                <p className="text-center text-xs text-white/40">
                  One Phantom confirm · Seeds committed on-chain
                </p>
              </div>
            </div>
          )}

          {/* PLAYING STATE */}
          {gameState === 'playing' && (
            <div className="w-full max-w-2xl space-y-8">
              {/* Multiplier */}
              <div className="flex justify-center">
                <MultiplierDisplay
                  value={multiplier}
                  state="ticking"
                  potentialWin={betAmount * multiplier}
                  size="xl"
                />
              </div>

              {/* Hex Grid */}
              <div className="lg:scale-110">
                <HexGrid
                  currentPosition={currentPosition}
                  visitedCells={visitedCells}
                  onDirectionSelect={handleDirection}
                  isPlaying={true}
                />
              </div>

              {/* Direction Controls */}
              <DirectionControls onSelectDirection={handleDirection} />

              {/* Cash Out Button */}
              <button
                onClick={handleCashOut}
                disabled={currentStep === 0}
                className="w-full py-6 rounded-2xl font-bold text-xl disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] transition-all shadow-lg animate-pulse"
                style={{
                  backgroundColor: 'var(--voltage)',
                  color: '#000',
                  boxShadow: '0 0 30px var(--voltage-glow)'
                }}
              >
                CASH OUT +{(betAmount * multiplier).toFixed(3)} SOL
              </button>

              {/* Trust Indicator */}
              <button className="w-full flex items-center justify-center gap-2 text-sm py-2 hover:opacity-80 transition-opacity"
                      style={{ color: 'var(--trust)' }}>
                <Zap size={14} />
                <span>This round is verifiable</span>
              </button>
            </div>
          )}
        </div>
      </main>

      {/* OVERLAYS & MODALS */}
      {gameState === 'win' && (
        <CashOutOverlay
          winAmount={betAmount * multiplier}
          betAmount={betAmount}
          multiplier={multiplier}
          steps={currentStep}
          onVerify={() => setGameState('verify')}
          onPlayAgain={() => {
            setGameState('ready');
            setCurrentStep(0);
            setMultiplier(1.00);
          }}
          onClose={() => setGameState('ready')}
        />
      )}

      {gameState === 'loss' && (
        <DeathOverlay
          betAmount={betAmount}
          step={currentStep}
          roll={71}
          threshold={64}
          direction="↓"
          onVerify={() => setGameState('verify')}
          onPlayAgain={() => {
            setGameState('ready');
            setCurrentStep(0);
            setMultiplier(1.00);
          }}
          onClose={() => setGameState('ready')}
        />
      )}

      {showWallet && (
        <WalletModal
          casinoBalance={casinoBalance}
          walletBalance={walletBalance}
          walletAddress={walletAddress}
          hasActiveRound={hasActiveRound}
          onClose={() => setShowWallet(false)}
          onDeposit={handleDeposit}
          onWithdraw={handleWithdraw}
        />
      )}

      {showHistory && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowHistory(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-[var(--background-overlay)] rounded-t-3xl border-t border-[var(--border)] max-h-[80vh] overflow-y-auto animate-in slide-in-from-bottom">
            <div className="sticky top-0 bg-[var(--background-overlay)] border-b border-[var(--border)] p-4 flex items-center justify-between">
              <h2 className="font-bold text-lg">Round History</h2>
              <button onClick={() => setShowHistory(false)} className="p-2 rounded-lg hover:bg-white/10">
                <X size={20} />
              </button>
            </div>
            <div className="p-4">
              <RoundHistory rounds={rounds} onVerifyRound={handleVerifyRound} />
            </div>
          </div>
        </div>
      )}

      {gameState === 'pending_reveal' && (
        <PendingRevealState
          onRetry={() => console.log('Retry reveal')}
        />
      )}

      {showHowItWorks && (
        <HowItWorksModal
          onClose={() => setShowHowItWorks(false)}
        />
      )}

      {showSeedExplainer && (
        <SeedFlowExplainer
          onContinue={() => {
            setShowSeedExplainer(false);
            setHasSeenSeedExplainer(true);
            startRoundFlow();
          }}
          onSkip={() => {
            setShowSeedExplainer(false);
            setHasSeenSeedExplainer(true);
          }}
        />
      )}

      <ToastProvider />
    </div>
  );
}
