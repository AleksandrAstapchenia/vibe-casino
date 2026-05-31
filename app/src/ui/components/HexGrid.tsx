import { useEffect, useState } from 'react';
import { hexNeighborClickEnabled } from '../../design-system/logic/canAcceptStepInput';

interface HexGridProps {
  currentPosition: { q: number; r: number };
  visitedCells: Set<string>;
  onDirectionSelect?: (direction: number) => void;
  isPlaying: boolean;
  deathDirection?: number; // Which direction led to death
  showDeathImpact?: boolean; // Show death animation
}

// Hex grid directions (even-q layout)
const DIRECTIONS = [
  { index: 0, label: '↖', dq: -1, dr: 0 },
  { index: 1, label: '↑', dq: 0, dr: -1 },
  { index: 2, label: '↗', dq: 1, dr: -1 },
  { index: 3, label: '→', dq: 1, dr: 0 },
  { index: 4, label: '↘', dq: 1, dr: 1 },
  { index: 5, label: '↓', dq: 0, dr: 1 },
  { index: 6, label: '↙', dq: -1, dr: 1 },
];

export default function HexGrid({
  currentPosition,
  visitedCells,
  onDirectionSelect,
  isPlaying,
  deathDirection,
  showDeathImpact = false
}: HexGridProps) {
  const [hoveredDirection, setHoveredDirection] = useState<number | null>(null);
  const [impactAnimationComplete, setImpactAnimationComplete] = useState(false);

  // Reset animation state when showDeathImpact changes
  useEffect(() => {
    if (showDeathImpact) {
      setImpactAnimationComplete(false);
      const t = setTimeout(() => setImpactAnimationComplete(true), 800);
      return () => clearTimeout(t);
    }
    setImpactAnimationComplete(false);
  }, [showDeathImpact]);

  // Generate hex positions for display
  const getHexPoints = (centerX: number, centerY: number, size: number) => {
    const points = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 6;
      points.push(
        `${centerX + size * Math.cos(angle)},${centerY + size * Math.sin(angle)}`
      );
    }
    return points.join(' ');
  };

  // Get screen position for axial coordinates
  const hexToScreen = (q: number, r: number) => {
    const size = 30;
    const x = 200 + size * (3/2 * q);
    const y = 200 + size * (Math.sqrt(3)/2 * q + Math.sqrt(3) * r);
    return { x, y };
  };

  // Generate neighbors
  const neighbors = DIRECTIONS.map(dir => ({
    ...dir,
    q: currentPosition.q + dir.dq,
    r: currentPosition.r + dir.dr,
    key: `${currentPosition.q + dir.dq},${currentPosition.r + dir.dr}`
  }));

  return (
    <div className="relative w-full aspect-square max-w-md mx-auto">
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 0 20px rgba(0, 255, 163, 0.1))' }}
      >
        <defs>
          <radialGradient id="safeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00ffa3" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#00ffa3" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="riskGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff6b35" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ff6b35" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="deathGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff006e" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ff006e" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Draw neighbor hexes (unknown/risky) */}
        {neighbors.map((neighbor) => {
          const pos = hexToScreen(neighbor.q, neighbor.r);
          const isVisited = visitedCells.has(neighbor.key);
          const isHovered = hoveredDirection === neighbor.index;
          const isDeathCell = deathDirection !== undefined && neighbor.index === deathDirection;

          return (
            <g key={neighbor.key}>
              {/* Death impact explosion */}
              {isDeathCell && showDeathImpact && !impactAnimationComplete && (
                <>
                  {/* Expanding red circle */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r="0"
                    className="fill-[#ff006e]/30"
                  >
                    <animate
                      attributeName="r"
                      from="0"
                      to="60"
                      dur="0.6s"
                      fill="freeze"
                    />
                    <animate
                      attributeName="opacity"
                      from="1"
                      to="0"
                      dur="0.6s"
                      fill="freeze"
                    />
                  </circle>
                  {/* Shockwave ring */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r="0"
                    className="stroke-[#ff006e] fill-none"
                    strokeWidth="3"
                  >
                    <animate
                      attributeName="r"
                      from="20"
                      to="70"
                      dur="0.8s"
                      fill="freeze"
                    />
                    <animate
                      attributeName="opacity"
                      from="1"
                      to="0"
                      dur="0.8s"
                      fill="freeze"
                    />
                  </circle>
                </>
              )}

              {/* Glow effect */}
              {isPlaying && !isVisited && !isDeathCell && (
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r="45"
                  fill={isHovered ? "url(#riskGlow)" : "none"}
                  className="transition-all duration-300"
                />
              )}

              {/* Death cell glow */}
              {isDeathCell && showDeathImpact && (
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r="50"
                  fill="url(#deathGlow)"
                  className="animate-pulse"
                />
              )}

              {/* Hex shape */}
              <polygon
                data-testid={`hex-dir-${neighbor.index}`}
                data-clickable={hexNeighborClickEnabled(isPlaying, showDeathImpact) ? 'true' : 'false'}
                points={getHexPoints(pos.x, pos.y, 28)}
                className={`
                  transition-all duration-300
                  ${isDeathCell && showDeathImpact
                    ? 'fill-[#ff006e]/30 stroke-[#ff006e] stroke-[4]'
                    : isVisited
                      ? 'fill-[#00ffa3]/20 stroke-[#00ffa3]/60'
                      : isPlaying
                        ? 'fill-[#ff6b35]/10 stroke-[#ff6b35]/40 cursor-pointer hover:fill-[#ff6b35]/20 hover:stroke-[#ff6b35]/60'
                        : 'fill-white/5 stroke-white/20'
                  }
                `}
                strokeWidth={isDeathCell && showDeathImpact ? "4" : "2"}
                onMouseEnter={() =>
                  hexNeighborClickEnabled(isPlaying, showDeathImpact) &&
                  setHoveredDirection(neighbor.index)
                }
                onMouseLeave={() => setHoveredDirection(null)}
                onClick={() => {
                  if (!hexNeighborClickEnabled(isPlaying, showDeathImpact)) return;
                  onDirectionSelect?.(neighbor.index);
                }}
              />

              {/* Direction label */}
              {isPlaying && !isVisited && !isDeathCell && (
                <text
                  x={pos.x}
                  y={pos.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className={`
                    font-mono text-2xl select-none pointer-events-none
                    transition-all duration-300
                    ${isHovered ? 'fill-[#ff6b35] opacity-100' : 'fill-white/40 opacity-60'}
                  `}
                >
                  {neighbor.label}
                </text>
              )}

              {/* Death icon */}
              {isDeathCell && showDeathImpact && (
                <text
                  x={pos.x}
                  y={pos.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-4xl select-none pointer-events-none animate-pulse"
                  fill="#ff006e"
                >
                  💀
                </text>
              )}

              {/* Safe marker for visited */}
              {isVisited && !isDeathCell && (
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r="4"
                  className="fill-[#00ffa3]"
                />
              )}
            </g>
          );
        })}

        {/* Draw current position (always safe) — no pointer events so neighbor hexes stay clickable */}
        {(() => {
          const pos = hexToScreen(currentPosition.q, currentPosition.r);
          return (
            <g pointerEvents="none" data-testid="hex-center">
              {/* Pulsing glow */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r="50"
                fill="url(#safeGlow)"
                className="animate-pulse"
              />

              {/* Current hex */}
              <polygon
                points={getHexPoints(pos.x, pos.y, 30)}
                className="fill-[#00ffa3]/30 stroke-[#00ffa3]"
                strokeWidth="3"
              />

              {/* Center marker */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r="6"
                className="fill-[#00ffa3]"
              />
            </g>
          );
        })()}
      </svg>
    </div>
  );
}
