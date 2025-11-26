export function Dots({ className }: { className?: string }) {
  return (
    <svg shapeRendering="crispEdges" viewBox="0 0 20 20" className={className}>
      <defs />
      <circle cx="2" cy="2" r="2" fill="#000" />
      <circle cx="14" cy="2" r="2" fill="#000" />
      <circle cx="18" cy="2" r="2" fill="#000" />
      <circle cx="14" cy="6" r="2" fill="#000" />
      <circle cx="18" cy="6" r="2" fill="#000" />
      <circle cx="2" cy="10" r="2" fill="#000" />
      <circle cx="10" cy="10" r="2" fill="#000" />
      <circle cx="14" cy="10" r="2" fill="#000" />
      <circle cx="2" cy="14" r="2" fill="#000" />
      <circle cx="10" cy="14" r="2" fill="#000" />
      <circle cx="6" cy="18" r="2" fill="#000" />
      <circle cx="14" cy="18" r="2" fill="#000" />
      <circle cx="18" cy="18" r="2" fill="#000" />
    </svg>
  );
}
