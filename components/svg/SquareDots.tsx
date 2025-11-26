export function SquareDots({ className }: { className?: string }) {
  return (
    <svg shapeRendering="crispEdges" viewBox="0 0 20 20" className={className}>
      <defs />
      <g fill="#000">
        <path d="M 0 0 m 4 0h -4v 4h 4v -4" />
        <path d="M 12 0 m 4 0h -4v 4v 4h -4v 4v 4h 4v -4h 4v -4h 4v -4v -4h -4" />
        <path d="M 0 8 m 4 4v -4h -4v 4v 4h 4v -4" />
        <path d="M 4 16 m 4 0h -4v 4h 4v -4" />
        <path d="M 12 16 m 4 0h -4v 4h 4h 4v -4h -4" />
      </g>
    </svg>
  );
}
