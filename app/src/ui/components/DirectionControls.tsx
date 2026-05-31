interface DirectionControlsProps {
  onSelectDirection: (direction: number) => void;
  disabled?: boolean;
  currentPosition?: boolean;
}

const DIRECTIONS = [
  { index: 0, label: '↖', angle: -135 },
  { index: 1, label: '↑', angle: -90 },
  { index: 2, label: '↗', angle: -45 },
  { index: 3, label: '→', angle: 0 },
  { index: 4, label: '↘', angle: 45 },
  { index: 5, label: '↓', angle: 90 },
  { index: 6, label: '↙', angle: 135 },
];

export default function DirectionControls({
  onSelectDirection,
  disabled = false,
  currentPosition = false
}: DirectionControlsProps) {
  return (
    <div className="relative w-full aspect-square max-w-xs mx-auto">
      {/* Center position indicator */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center text-3xl border-2 z-10"
        style={{
          backgroundColor: 'rgba(0, 255, 163, 0.2)',
          borderColor: 'var(--safe)',
          color: 'var(--safe)'
        }}
      >
        ●
      </div>

      {/* Direction buttons arranged in circle */}
      {DIRECTIONS.map((dir) => {
        const radius = 120; // Distance from center
        const angleRad = (dir.angle * Math.PI) / 180;
        const x = Math.cos(angleRad) * radius;
        const y = Math.sin(angleRad) * radius;

        return (
          <button
            key={dir.index}
            onClick={(e) => {
              e.stopPropagation();
              if (!disabled) onSelectDirection(dir.index);
            }}
            disabled={disabled}
            className={`
              absolute w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-bold
              transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
              border-2
            `}
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'rgba(255, 107, 53, 0.1)',
              borderColor: 'rgba(255, 107, 53, 0.3)',
              color: 'var(--caution)',
            }}
          >
            {dir.label}
          </button>
        );
      })}

      {/* Direction labels (keyboard hints) */}
      <div className="absolute bottom-0 left-0 right-0 text-center text-xs text-white/40 font-mono">
        Tap or use keys 1-7
      </div>
    </div>
  );
}
