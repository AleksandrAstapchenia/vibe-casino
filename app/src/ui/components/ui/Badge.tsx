interface BadgeProps {
  variant?: 'safe' | 'risk' | 'death' | 'voltage' | 'trust' | 'neutral';
  children: React.ReactNode;
  size?: 'sm' | 'md';
}

export default function Badge({ variant = 'neutral', children, size = 'md' }: BadgeProps) {
  const styles = {
    safe: 'bg-[#00ffa3]/10 text-[#00ffa3] border-[#00ffa3]/30',
    risk: 'bg-[#ff6b35]/10 text-[#ff6b35] border-[#ff6b35]/30',
    death: 'bg-[#ff006e]/10 text-[#ff006e] border-[#ff006e]/30',
    voltage: 'bg-[#ffeb3b]/10 text-[#ffeb3b] border-[#ffeb3b]/30',
    trust: 'bg-[#00d4ff]/10 text-[#00d4ff] border-[#00d4ff]/30',
    neutral: 'bg-white/5 text-white/60 border-white/10'
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm'
  };

  return (
    <span className={`
      inline-flex items-center justify-center rounded-full border font-medium
      ${styles[variant]} ${sizeClasses[size]}
    `}>
      {children}
    </span>
  );
}
