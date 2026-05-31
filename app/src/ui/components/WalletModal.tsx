import { useState } from 'react';
import { X, Wallet, ArrowDownToLine, ArrowUpFromLine, ExternalLink, AlertCircle } from 'lucide-react';
import SolAmountInput from './SolAmountInput';

interface WalletModalProps {
  casinoBalance: number;
  walletBalance: number;
  walletAddress: string;
  hasActiveRound: boolean;
  onClose: () => void;
  onDeposit: (amount: number) => void;
  onWithdraw: (amount: number) => void;
}

export default function WalletModal({
  casinoBalance,
  walletBalance,
  walletAddress,
  hasActiveRound,
  onClose,
  onDeposit,
  onWithdraw
}: WalletModalProps) {
  const [tab, setTab] = useState<'deposit' | 'withdraw'>('deposit');
  const [amount, setAmount] = useState('0.01');

  const handleDeposit = () => {
    const value = parseFloat(amount);
    if (value >= 0.01 && value <= walletBalance) {
      onDeposit(value);
    }
  };

  const handleWithdraw = () => {
    const value = parseFloat(amount);
    if (!hasActiveRound && value >= 0.01 && value <= casinoBalance) {
      onWithdraw(value);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl border-t sm:border overflow-hidden animate-in slide-in-from-bottom sm:zoom-in-95"
           style={{
             backgroundColor: 'var(--background-overlay)',
             borderColor: 'var(--border)'
           }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b"
             style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-2">
            <Wallet size={20} />
            <h2 className="font-bold text-lg">Wallet</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Balances */}
        <div className="px-6 py-4 space-y-3">
          {/* Casino Balance */}
          <div className="rounded-xl p-4 border"
               style={{
                 backgroundColor: 'rgba(0, 255, 163, 0.05)',
                 borderColor: 'var(--safe)'
               }}>
            <div className="text-xs text-white/60 mb-1">Casino Balance</div>
            <div className="text-3xl font-bold font-mono" style={{ color: 'var(--safe)' }}>
              {casinoBalance.toFixed(3)} <span className="text-lg text-white/60">SOL</span>
            </div>
          </div>

          {/* Wallet Balance */}
          <div className="rounded-xl p-4 border"
               style={{
                 backgroundColor: 'rgba(255, 255, 255, 0.03)',
                 borderColor: 'var(--border)'
               }}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-white/60 mb-1">Wallet Balance</div>
                <div className="text-xl font-bold font-mono">
                  {walletBalance.toFixed(3)} <span className="text-sm text-white/60">SOL</span>
                </div>
              </div>
              <a
                href={`https://solscan.io/account/${walletAddress}?cluster=devnet`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/60 hover:text-white"
              >
                <ExternalLink size={16} />
              </a>
            </div>
            <div className="text-xs text-white/40 mt-2 font-mono">
              {walletAddress.slice(0, 4)}...{walletAddress.slice(-4)}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 pb-4">
          <div className="flex gap-2 p-1 rounded-lg"
               style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
            <button
              onClick={() => setTab('deposit')}
              className={`flex-1 py-2 rounded-md font-medium text-sm transition-all ${
                tab === 'deposit'
                  ? 'bg-white/10'
                  : 'hover:bg-white/5'
              }`}
            >
              <ArrowDownToLine size={16} className="inline mr-2" />
              Deposit
            </button>
            <button
              onClick={() => setTab('withdraw')}
              className={`flex-1 py-2 rounded-md font-medium text-sm transition-all ${
                tab === 'withdraw'
                  ? 'bg-white/10'
                  : 'hover:bg-white/5'
              }`}
            >
              <ArrowUpFromLine size={16} className="inline mr-2" />
              Withdraw
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6 space-y-4">
          {tab === 'deposit' ? (
            <>
              <div>
                <label className="text-sm text-white/60 mb-2 block">Amount (SOL)</label>
                <SolAmountInput
                  value={amount}
                  onChange={setAmount}
                  min={0.01}
                  max={walletBalance}
                  presets={[
                    { label: 'MIN', value: '0.01' },
                    { label: 'MAX', value: walletBalance.toFixed(3) },
                  ]}
                />
                <p className="text-xs text-white/40 mt-2">
                  Min: 0.01 SOL · Max: {walletBalance.toFixed(3)} SOL
                </p>
              </div>

              <button
                onClick={handleDeposit}
                disabled={parseFloat(amount) < 0.01 || parseFloat(amount) > walletBalance}
                className="w-full py-4 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] transition-all"
                style={{
                  backgroundColor: 'var(--safe)',
                  color: '#000'
                }}
              >
                Deposit {amount} SOL
              </button>
            </>
          ) : (
            <>
              {hasActiveRound && (
                <div className="flex gap-2 p-3 rounded-lg border"
                     style={{
                       backgroundColor: 'rgba(255, 107, 53, 0.05)',
                       borderColor: 'var(--caution)'
                     }}>
                  <AlertCircle size={16} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--caution)' }} />
                  <p className="text-sm text-white/80">
                    Withdraw blocked while active round is in progress
                  </p>
                </div>
              )}

              <div>
                <label className="text-sm text-white/60 mb-2 block">Amount (SOL)</label>
                <SolAmountInput
                  value={amount}
                  onChange={setAmount}
                  min={0.01}
                  max={casinoBalance}
                  disabled={hasActiveRound}
                  presets={[
                    { label: 'MIN', value: '0.01' },
                    { label: 'MAX', value: casinoBalance.toFixed(3) },
                  ]}
                />
                <p className="text-xs text-white/40 mt-2">
                  Available: {casinoBalance.toFixed(3)} SOL
                </p>
              </div>

              <button
                onClick={handleWithdraw}
                disabled={hasActiveRound || parseFloat(amount) < 0.01 || parseFloat(amount) > casinoBalance}
                className="w-full py-4 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] transition-all"
                style={{
                  backgroundColor: 'var(--voltage)',
                  color: '#000'
                }}
              >
                Withdraw {amount} SOL
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
