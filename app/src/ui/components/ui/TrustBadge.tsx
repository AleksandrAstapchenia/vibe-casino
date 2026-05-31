import { Zap } from 'lucide-react';

interface TrustBadgeProps {
  onClick?: () => void;
  variant?: 'inline' | 'button';
}

export default function TrustBadge({ onClick, variant = 'inline' }: TrustBadgeProps) {
  const content = (
    <>
      <Zap size={14} className="fill-current" />
      <span className="font-medium">Verified</span>
    </>
  );

  if (variant === 'button') {
    return (
      <button
        onClick={onClick}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all hover:bg-[#00d4ff]/10"
        style={{ color: 'var(--trust)' }}
      >
        {content}
      </button>
    );
  }

  return (
    <div className="inline-flex items-center gap-1.5 text-sm" style={{ color: 'var(--trust)' }}>
      {content}
    </div>
  );
}
