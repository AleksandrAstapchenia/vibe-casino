import { AlertTriangle } from 'lucide-react';

interface MultiplierDisplayProps {
  value: number;
  state?: 'idle' | 'ticking' | 'max_risk' | 'win' | 'loss';
  potentialWin?: number;
  currentStep?: number;
  maxSteps?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function MultiplierDisplay({
  value,
  state = 'idle',
  potentialWin,
  currentStep,
  maxSteps = 7,
  size = 'xl'
}: MultiplierDisplayProps) {
  const sizeClasses = {
    sm: 'text-3xl',
    md: 'text-5xl',
    lg: 'text-6xl',
    xl: 'text-7xl lg:text-8xl'
  };

  const getColor = () => {
    switch (state) {
      case 'win':
        return 'var(--safe)';
      case 'loss':
        return 'var(--void)';
      case 'max_risk':
        return 'var(--void)';
      case 'ticking':
      case 'idle':
      default:
        return 'var(--voltage)';
    }
  };

  const getGlow = () => {
    switch (state) {
      case 'win':
        return '0 0 40px var(--safe-glow)';
      case 'loss':
        return '0 0 40px var(--void-glow)';
      case 'max_risk':
        return '0 0 50px var(--void-glow)';
      case 'ticking':
        return '0 0 30px var(--voltage-glow)';
      default:
        return '0 0 20px var(--voltage-glow)';
    }
  };

  const getAnimation = () => {
    switch (state) {
      case 'ticking':
        return 'animate-pulse';
      case 'max_risk':
        return 'animate-pulse';
      case 'win':
        return 'animate-bounce';
      default:
        return '';
    }
  };

  return (
    <div className="text-center">
      {/* Main multiplier */}
      <div className={`
        font-extrabold font-mono
        ${sizeClasses[size]}
        ${getAnimation()}
      `}
           style={{
             color: getColor(),
             filter: `drop-shadow(${getGlow()})`
           }}>
        ×{value.toFixed(2)}
      </div>

      {/* State-specific info */}
      <div className="mt-2 space-y-1">
        {/* Potential win */}
        {potentialWin !== undefined && state !== 'loss' && (
          <div className="text-sm text-white/50 font-mono">
            Potential win: +{potentialWin.toFixed(3)} SOL
          </div>
        )}

        {/* Current step */}
        {currentStep !== undefined && state !== 'idle' && state !== 'win' && state !== 'loss' && (
          <div className="text-xs text-white/40 font-mono">
            STEP {currentStep} / {maxSteps}
          </div>
        )}

        {/* Max risk warning */}
        {state === 'max_risk' && (
          <div className="flex items-center justify-center gap-1 text-xs font-bold mt-2"
               style={{ color: 'var(--void)' }}>
            <AlertTriangle size={12} />
            MAX DEPTH - CASH OUT NOW
          </div>
        )}

        {/* Win state */}
        {state === 'win' && (
          <div className="text-sm font-medium" style={{ color: 'var(--safe)' }}>
            Cashed Out!
          </div>
        )}

        {/* Loss state */}
        {state === 'loss' && (
          <div className="text-sm font-medium" style={{ color: 'var(--void)' }}>
            Round Over
          </div>
        )}

        {/* Ticking disclaimer */}
        {state === 'ticking' && (
          <div className="text-xs text-white/30 mt-2 max-w-xs mx-auto">
            Display multiplier is cosmetic · Settlement uses step at TX confirm
          </div>
        )}
      </div>
    </div>
  );
}

// Compact version for cards
export function MultiplierBadge({ value, state = 'idle' }: {
  value: number;
  state?: 'idle' | 'live' | 'final';
}) {
  const getColor = () => {
    switch (state) {
      case 'live':
        return 'var(--voltage)';
      case 'final':
        return 'var(--safe)';
      default:
        return 'var(--muted-foreground)';
    }
  };

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md font-mono font-bold text-sm ${
      state === 'live' ? 'animate-pulse' : ''
    }`}
          style={{
            backgroundColor: `${getColor()}20`,
            color: getColor()
          }}>
      ×{value.toFixed(2)}
      {state === 'live' && (
        <span className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: getColor() }} />
      )}
    </span>
  );
}
