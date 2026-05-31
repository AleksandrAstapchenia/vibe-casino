import { Loader2 } from 'lucide-react';

export function PageLoader() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: 'var(--background)' }}
    >
      <Loader2 size={32} className="animate-spin" style={{ color: 'var(--safe)' }} />
    </div>
  );
}
