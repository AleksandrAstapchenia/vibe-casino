import { Toaster } from 'sonner';

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: 'var(--background-overlay)',
          color: 'var(--foreground)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          fontSize: '14px',
          fontFamily: 'inherit'
        },
        className: 'backdrop-blur-lg'
      }}
      richColors
      closeButton
      duration={4000}
    />
  );
}
