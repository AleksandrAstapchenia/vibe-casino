"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  useAccount,
  useChainId,
  useReadContract,
  useSwitchChain,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { formatEther, parseEther } from "viem";
import { useEffect, useMemo, useState } from "react";
import {
  CASINO_ADDRESS,
  SEPOLIA_CHAIN_ID,
  casinoAbi,
  explorerAddressUrl,
  explorerTxUrl,
  HOUSE_EDGE_PERCENT,
  MAX_BET_ETH,
  MIN_BET_ETH,
  PAYOUT_MULTIPLIER,
} from "@/lib/contract";

type LastResult = {
  won: boolean;
  resultHeads: boolean;
  payout: string;
  txHash: string;
};

function formatEth(value: bigint | undefined) {
  if (value === undefined) return "—";
  return `${Number(formatEther(value)).toFixed(4)} ETH`;
}

function shortHash(hash: string) {
  return `${hash.slice(0, 8)}…${hash.slice(-6)}`;
}

export function CasinoApp() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChainAsync } = useSwitchChain();
  const [depositAmount, setDepositAmount] = useState("0.05");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [betAmount, setBetAmount] = useState("0.01");
  const [choiceHeads, setChoiceHeads] = useState(true);
  const [pendingAction, setPendingAction] = useState<string | null>(null);
  const [lastResult, setLastResult] = useState<LastResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const wrongNetwork = isConnected && chainId !== SEPOLIA_CHAIN_ID;
  const contractReady = CASINO_ADDRESS !== "0x0000000000000000000000000000000000000000";

  const { data: balance, refetch: refetchBalance } = useReadContract({
    address: CASINO_ADDRESS,
    abi: casinoAbi,
    functionName: "balances",
    args: address ? [address] : undefined,
    query: { enabled: Boolean(address && contractReady) },
  });

  const { data: houseBalance } = useReadContract({
    address: CASINO_ADDRESS,
    abi: casinoAbi,
    functionName: "houseBalance",
    query: { enabled: contractReady },
  });

  const { writeContractAsync, data: txHash, isPending, reset } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash: txHash });

  useEffect(() => {
    if (isSuccess && txHash) {
      refetchBalance();
      setPendingAction(null);
    }
  }, [isSuccess, txHash, refetchBalance]);

  const busy = isPending || isConfirming;

  const betValidation = useMemo(() => {
    const value = Number(betAmount);
    if (Number.isNaN(value) || value <= 0) return "Enter a valid bet amount";
    if (value < MIN_BET_ETH) return `Minimum bet is ${MIN_BET_ETH} ETH`;
    if (value > MAX_BET_ETH) return `Maximum bet is ${MAX_BET_ETH} ETH`;
    if (balance !== undefined && parseEther(betAmount) > balance) return "Insufficient casino balance";
    return null;
  }, [betAmount, balance]);

  async function ensureSepolia() {
    if (chainId !== SEPOLIA_CHAIN_ID) {
      await switchChainAsync({ chainId: SEPOLIA_CHAIN_ID });
    }
  }

  async function runAction(label: string, fn: () => Promise<`0x${string}`>) {
    setError(null);
    setLastResult(null);
    setPendingAction(label);
    reset();
    try {
      await ensureSepolia();
      await fn();
    } catch (e) {
      setPendingAction(null);
      setError(e instanceof Error ? e.message.split("\n")[0] : "Transaction rejected");
    }
  }

  async function handleDeposit() {
    const value = parseEther(depositAmount);
    await runAction("Depositing…", () =>
      writeContractAsync({
        address: CASINO_ADDRESS,
        abi: casinoAbi,
        functionName: "deposit",
        value,
      }),
    );
  }

  async function handleWithdraw() {
    const amount = withdrawAmount ? parseEther(withdrawAmount) : (balance ?? 0n);
    await runAction("Withdrawing…", () =>
      writeContractAsync({
        address: CASINO_ADDRESS,
        abi: casinoAbi,
        functionName: "withdraw",
        args: [amount],
      }),
    );
  }

  async function handlePlay() {
    if (betValidation) {
      setError(betValidation);
      return;
    }
    await runAction("Flipping coin…", () =>
      writeContractAsync({
        address: CASINO_ADDRESS,
        abi: casinoAbi,
        functionName: "playCoinFlip",
        args: [choiceHeads, parseEther(betAmount)],
      }),
    );
  }

  return (
    <div className="min-h-screen bg-[#07070d] text-zinc-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.12),_transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.08),_transparent_40%)]" />

      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-amber-400/80">Sepolia testnet</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">Vibe Casino</h1>
        </div>
        <ConnectButton showBalance={false} chainStatus="icon" accountStatus="address" />
      </header>

      <main className="relative z-10 mx-auto grid max-w-6xl gap-6 px-6 pb-16 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur">
          <p className="text-sm text-zinc-400">On-chain coin flip</p>
          <h2 className="mt-2 text-4xl font-bold tracking-tight">
            Heads or tails.
            <span className="block text-amber-400">Verifiable on Etherscan.</span>
          </h2>
          <p className="mt-4 max-w-xl text-zinc-400">
            Deposit Sepolia ETH, play from your casino balance, withdraw anytime. Every deposit, flip, and
            payout emits events you can audit on-chain.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <Stat label="Payout" value={`${PAYOUT_MULTIPLIER}x`} />
            <Stat label="House edge" value={`${HOUSE_EDGE_PERCENT}%`} />
            <Stat label="House bankroll" value={formatEth(houseBalance)} />
          </div>

          {contractReady ? (
            <a
              href={explorerAddressUrl(CASINO_ADDRESS)}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex text-sm text-amber-400 hover:text-amber-300"
            >
              View contract on Etherscan →
            </a>
          ) : (
            <p className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
              Set <code className="text-amber-100">NEXT_PUBLIC_CASINO_ADDRESS</code> after deploying the contract.
            </p>
          )}
        </section>

        <section className="space-y-4">
          {!isConnected ? (
            <Panel title="Connect wallet">
              <p className="text-sm text-zinc-400">Connect MetaMask on Sepolia to start playing.</p>
              <div className="mt-4">
                <ConnectButton />
              </div>
            </Panel>
          ) : wrongNetwork ? (
            <Panel title="Wrong network">
              <p className="text-sm text-zinc-400">Switch to Sepolia testnet to continue.</p>
              <button
                type="button"
                onClick={() => switchChainAsync({ chainId: SEPOLIA_CHAIN_ID })}
                className="mt-4 w-full rounded-xl bg-amber-400 px-4 py-3 font-medium text-black transition hover:bg-amber-300"
              >
                Switch to Sepolia
              </button>
            </Panel>
          ) : (
            <>
              <Panel title="Casino balance">
                <p className="text-3xl font-semibold text-amber-400">{formatEth(balance)}</p>
                <p className="mt-1 text-xs text-zinc-500">Internal balance held by the smart contract</p>
              </Panel>

              <Panel title="Deposit">
                <label className="text-xs uppercase tracking-wide text-zinc-500">Amount (ETH)</label>
                <input
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none ring-amber-400/40 focus:ring"
                  placeholder="0.05"
                />
                <ActionButton disabled={busy || !contractReady} onClick={handleDeposit}>
                  Deposit to casino
                </ActionButton>
              </Panel>

              <Panel title="Play coin flip">
                <div className="grid grid-cols-2 gap-3">
                  <ChoiceButton active={choiceHeads} onClick={() => setChoiceHeads(true)} label="Heads" emoji="🪙" />
                  <ChoiceButton active={!choiceHeads} onClick={() => setChoiceHeads(false)} label="Tails" emoji="✦" />
                </div>
                <label className="mt-4 block text-xs uppercase tracking-wide text-zinc-500">Bet (ETH)</label>
                <input
                  value={betAmount}
                  onChange={(e) => setBetAmount(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none ring-amber-400/40 focus:ring"
                />
                {betValidation && <p className="mt-2 text-sm text-rose-400">{betValidation}</p>}
                <ActionButton disabled={busy || !contractReady || Boolean(betValidation)} onClick={handlePlay}>
                  Flip coin
                </ActionButton>
              </Panel>

              <Panel title="Withdraw">
                <label className="text-xs uppercase tracking-wide text-zinc-500">Amount (ETH, empty = max)</label>
                <input
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none ring-amber-400/40 focus:ring"
                  placeholder={balance ? formatEther(balance) : "0"}
                />
                <ActionButton disabled={busy || !contractReady || !balance} onClick={handleWithdraw}>
                  Withdraw to wallet
                </ActionButton>
              </Panel>
            </>
          )}

          {(error || pendingAction || txHash) && (
            <Panel title="Activity">
              {pendingAction && <p className="text-sm text-amber-300">{pendingAction}</p>}
              {error && <p className="text-sm text-rose-400">{error}</p>}
              {txHash && (
                <a
                  href={explorerTxUrl(txHash)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex text-sm text-amber-400 hover:text-amber-300"
                >
                  {isConfirming ? "Confirming" : isSuccess ? "Confirmed" : "Submitted"}: {shortHash(txHash)} →
                </a>
              )}
              {lastResult && (
                <p className="mt-2 text-sm text-zinc-300">
                  {lastResult.won ? "You won" : "You lost"} — result{" "}
                  {lastResult.resultHeads ? "Heads" : "Tails"}, payout {lastResult.payout} ETH
                </p>
              )}
            </Panel>
          )}
        </section>
      </main>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
      <h3 className="text-sm font-medium uppercase tracking-wide text-zinc-400">{title}</h3>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
      <p className="text-xs uppercase tracking-wide text-zinc-500">{label}</p>
      <p className="mt-1 text-lg font-semibold">{value}</p>
    </div>
  );
}

function ActionButton({
  children,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="mt-4 w-full rounded-xl bg-amber-400 px-4 py-3 font-medium text-black transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  );
}

function ChoiceButton({
  active,
  label,
  emoji,
  onClick,
}: {
  active: boolean;
  label: string;
  emoji: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border px-4 py-4 text-left transition ${
        active
          ? "border-amber-400 bg-amber-400/15 text-amber-100"
          : "border-white/10 bg-black/20 text-zinc-300 hover:border-white/20"
      }`}
    >
      <span className="text-2xl">{emoji}</span>
      <span className="mt-2 block font-medium">{label}</span>
    </button>
  );
}
