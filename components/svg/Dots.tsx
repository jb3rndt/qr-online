export function Dots({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="currentColor">
      <circle cx="2" cy="2" r="2" />
      <circle cx="14" cy="2" r="2" />
      <circle cx="18" cy="2" r="2" />
      <circle cx="14" cy="6" r="2" />
      <circle cx="18" cy="6" r="2" />
      <circle cx="2" cy="10" r="2" />
      <circle cx="10" cy="10" r="2" />
      <circle cx="14" cy="10" r="2" />
      <circle cx="2" cy="14" r="2" />
      <circle cx="10" cy="14" r="2" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="14" cy="18" r="2" />
      <circle cx="18" cy="18" r="2" />
    </svg>
  );
}
