import { ChevronDown, ChevronUp } from 'lucide-react';

export interface SolAmountPreset {
  label: string;
  value: string;
}

interface SolAmountInputProps {
  value: string;
  onChange: (value: string) => void;
  max: number;
  min?: number;
  step?: number;
  disabled?: boolean;
  presets?: SolAmountPreset[];
  id?: string;
  'aria-label'?: string;
}

function clampAmount(raw: number, min: number, max: number): string {
  if (!Number.isFinite(raw)) return min.toFixed(2);
  const clamped = Math.min(max, Math.max(min, raw));
  return clamped.toFixed(2);
}

function parseAmount(value: string, fallback: number): number {
  const n = parseFloat(value);
  return Number.isFinite(n) ? n : fallback;
}

export function SolAmountInput({
  value,
  onChange,
  max,
  min = 0.01,
  step = 0.01,
  disabled = false,
  presets,
  id,
  'aria-label': ariaLabel = 'Amount in SOL',
}: SolAmountInputProps) {
  const current = parseAmount(value, min);
  const atMin = current <= min + 1e-9;
  const atMax = current >= max - 1e-9;

  const bump = (delta: number) => {
    onChange(clampAmount(current + delta, min, max));
  };

  return (
    <div className="flex gap-2">
      <div className="relative flex-1 min-w-0">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => onChange(clampAmount(current, min, max))}
          step={String(step)}
          min={String(min)}
          max={max}
          disabled={disabled}
          aria-label={ariaLabel}
          className="sol-amount-input w-full rounded-lg py-3 pl-4 pr-11 text-lg font-mono text-white focus:outline-none border-2 focus:border-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderColor: 'rgba(255, 255, 255, 0.2)',
          }}
        />
        <div className="absolute right-1 top-1 bottom-1 flex flex-col justify-center gap-0.5">
          <button
            type="button"
            aria-label="Increase amount"
            disabled={disabled || atMax}
            onClick={() => bump(step)}
            className="flex h-7 w-8 items-center justify-center rounded-md hover:bg-white/15 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ color: 'var(--voltage)' }}
          >
            <ChevronUp size={16} strokeWidth={2.5} />
          </button>
          <button
            type="button"
            aria-label="Decrease amount"
            disabled={disabled || atMin}
            onClick={() => bump(-step)}
            className="flex h-7 w-8 items-center justify-center rounded-md hover:bg-white/15 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ color: 'var(--voltage)' }}
          >
            <ChevronDown size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {presets && presets.length > 0 && (
        <div className="flex flex-col gap-1 shrink-0">
          {presets.map((preset) => (
            <button
              key={preset.label}
              type="button"
              disabled={disabled}
              onClick={() => onChange(preset.value)}
              className="px-3 py-1.5 rounded text-xs hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              {preset.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SolAmountInput;
