import { createElement } from 'react';
import { toast as sonnerToast } from 'sonner';
import { CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const icon = (Icon: typeof CheckCircle2) => createElement(Icon, { size: 18 });

export const toast = {
  success: (message: string, description?: string) => {
    return sonnerToast.success(message, {
      description,
      icon: icon(CheckCircle2),
      style: {
        borderColor: 'var(--safe)'
      }
    });
  },

  error: (message: string, description?: string) => {
    return sonnerToast.error(message, {
      description,
      icon: icon(AlertCircle),
      style: {
        borderColor: 'var(--void)'
      }
    });
  },

  warning: (message: string, description?: string) => {
    return sonnerToast.warning(message, {
      description,
      icon: AlertTriangle,
      style: {
        borderColor: 'var(--caution)'
      }
    });
  },

  info: (message: string, description?: string) => {
    return sonnerToast.info(message, {
      description,
      icon: icon(Info),
      style: {
        borderColor: 'var(--trust)'
      }
    });
  },

  // Custom toast types
  transaction: {
    signing: () => {
      return sonnerToast.loading('Waiting for signature...', {
        description: 'Please approve the transaction in your wallet',
        style: {
          borderColor: 'var(--trust)'
        }
      });
    },

    broadcasting: (id: string | number) => {
      return sonnerToast.loading('Broadcasting transaction...', {
        id,
        description: 'Sending to Solana network',
        style: {
          borderColor: 'var(--voltage)'
        }
      });
    },

    confirming: (id: string | number) => {
      return sonnerToast.loading('Confirming on-chain...', {
        id,
        description: 'Waiting for network confirmation',
        style: {
          borderColor: 'var(--voltage)'
        }
      });
    },

    success: (id: string | number, message: string) => {
      return sonnerToast.success(message, {
        id,
        description: 'Transaction confirmed',
        style: {
          borderColor: 'var(--safe)'
        }
      });
    },

    failed: (id: string | number, reason: string) => {
      return sonnerToast.error('Transaction failed', {
        id,
        description: reason,
        style: {
          borderColor: 'var(--void)'
        }
      });
    }
  },

  // Gameplay toasts
  game: {
    roundStarted: (betAmount: number) => {
      return sonnerToast.success('Round started!', {
        description: `Bet: ${betAmount.toFixed(3)} SOL`,
        style: {
          borderColor: 'var(--voltage)'
        }
      });
    },

    cashedOut: (amount: number, multiplier: number) => {
      return sonnerToast.success(`Cashed out at ×${multiplier.toFixed(2)}!`, {
        description: `Won ${amount.toFixed(3)} SOL`,
        style: {
          borderColor: 'var(--safe)'
        }
      });
    },

    death: (step: number) => {
      return sonnerToast.error('Round over', {
        description: `Died at step ${step}`,
        style: {
          borderColor: 'var(--void)'
        }
      });
    },

    maxDepth: () => {
      return sonnerToast.warning('Maximum depth reached!', {
        description: 'Cash out now - cannot go deeper',
        style: {
          borderColor: 'var(--void)'
        }
      });
    }
  },

  // Wallet toasts
  wallet: {
    connected: (address: string) => {
      return sonnerToast.success('Wallet connected', {
        description: `${address.slice(0, 4)}...${address.slice(-4)}`,
        style: {
          borderColor: 'var(--safe)'
        }
      });
    },

    disconnected: () => {
      return sonnerToast.info('Wallet disconnected', {
        style: {
          borderColor: 'var(--trust)'
        }
      });
    },

    deposited: (amount: number) => {
      return sonnerToast.success('Deposit successful', {
        description: `${amount.toFixed(3)} SOL added to casino balance`,
        style: {
          borderColor: 'var(--safe)'
        }
      });
    },

    withdrawn: (amount: number) => {
      return sonnerToast.success('Withdrawal successful', {
        description: `${amount.toFixed(3)} SOL returned to wallet`,
        style: {
          borderColor: 'var(--voltage)'
        }
      });
    }
  }
};
