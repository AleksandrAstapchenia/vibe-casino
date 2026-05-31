import { AlertCircle, RefreshCw, Wallet, TrendingDown, X } from 'lucide-react';

export type ErrorType =
  | 'insufficient_balance'
  | 'sign_rejected'
  | 'rpc_error'
  | 'treasury_insufficient'
  | 'network_error'
  | 'generic';

interface ErrorStateProps {
  type: ErrorType;
  message?: string;
  onRetry?: () => void;
  onDismiss?: () => void;
  context?: 'inline' | 'modal' | 'fullscreen';
}

const ERROR_CONFIG = {
  insufficient_balance: {
    icon: Wallet,
    title: 'Insufficient Balance',
    description: 'You don\'t have enough SOL for this action',
    color: 'var(--caution)',
    action: 'Deposit SOL'
  },
  sign_rejected: {
    icon: X,
    title: 'Transaction Rejected',
    description: 'You cancelled the transaction in your wallet',
    color: 'var(--void)',
    action: 'Try Again'
  },
  rpc_error: {
    icon: AlertCircle,
    title: 'Network Error',
    description: 'Could not connect to Solana network',
    color: 'var(--caution)',
    action: 'Retry'
  },
  treasury_insufficient: {
    icon: TrendingDown,
    title: 'Treasury Limit Reached',
    description: 'House cannot cover this cash-out. Try a smaller bet.',
    color: 'var(--void)',
    action: 'Go Back'
  },
  network_error: {
    icon: AlertCircle,
    title: 'Connection Lost',
    description: 'Check your internet connection and try again',
    color: 'var(--caution)',
    action: 'Retry'
  },
  generic: {
    icon: AlertCircle,
    title: 'Something Went Wrong',
    description: 'An unexpected error occurred',
    color: 'var(--void)',
    action: 'Retry'
  }
};

export default function ErrorState({
  type,
  message,
  onRetry,
  onDismiss,
  context = 'inline'
}: ErrorStateProps) {
  const config = ERROR_CONFIG[type];
  const Icon = config.icon;

  // INLINE VERSION (for cards, panels)
  if (context === 'inline') {
    return (
      <div className="rounded-xl p-4 border flex items-start gap-3"
           style={{
             backgroundColor: `${config.color}15`,
             borderColor: config.color
           }}>
        <Icon size={20} className="flex-shrink-0 mt-0.5" style={{ color: config.color }} />
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm mb-1">{config.title}</p>
          <p className="text-xs text-white/60">{message || config.description}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-2 text-xs font-medium hover:underline"
              style={{ color: config.color }}
            >
              {config.action} →
            </button>
          )}
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 p-1 rounded hover:bg-white/10 transition-colors"
          >
            <X size={14} className="text-white/40" />
          </button>
        )}
      </div>
    );
  }

  // MODAL VERSION
  if (context === 'modal') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
        <div className="relative w-full max-w-sm rounded-2xl border p-6 text-center space-y-4"
             style={{
               backgroundColor: 'var(--background-overlay)',
               borderColor: config.color
             }}>
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X size={16} />
            </button>
          )}

          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center"
                 style={{ backgroundColor: `${config.color}20` }}>
              <Icon size={32} style={{ color: config.color }} />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-2">{config.title}</h3>
            <p className="text-sm text-white/60">{message || config.description}</p>
          </div>

          {onRetry && (
            <button
              onClick={onRetry}
              className="w-full py-3 rounded-xl font-medium hover:scale-[1.02] transition-all"
              style={{
                backgroundColor: config.color,
                color: type === 'sign_rejected' || type === 'treasury_insufficient' || type === 'generic' ? '#fff' : '#000'
              }}
            >
              {config.action}
            </button>
          )}
        </div>
      </div>
    );
  }

  // FULLSCREEN VERSION (for critical errors)
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full flex items-center justify-center"
               style={{ backgroundColor: `${config.color}20` }}>
            <Icon size={48} style={{ color: config.color }} />
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold font-display mb-3">{config.title}</h2>
          <p className="text-white/60">{message || config.description}</p>
        </div>

        {onRetry && (
          <button
            onClick={onRetry}
            className="w-full py-4 rounded-2xl font-bold text-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            style={{
              backgroundColor: config.color,
              color: type === 'sign_rejected' || type === 'treasury_insufficient' || type === 'generic' ? '#fff' : '#000'
            }}
          >
            <RefreshCw size={20} />
            {config.action}
          </button>
        )}
      </div>
    </div>
  );
}

// HELPER: Error banner for top-level errors
export function ErrorBanner({ type, message, onDismiss }: {
  type: ErrorType;
  message?: string;
  onDismiss?: () => void;
}) {
  const config = ERROR_CONFIG[type];
  const Icon = config.icon;

  return (
    <div className="w-full py-3 px-4 flex items-center justify-between border-b"
         style={{
           backgroundColor: `${config.color}15`,
           borderColor: config.color
         }}>
      <div className="flex items-center gap-2">
        <Icon size={16} style={{ color: config.color }} />
        <span className="text-sm font-medium">{message || config.title}</span>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="p-1 rounded hover:bg-white/10 transition-colors"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
