export function SquareCornerDot({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 28"
      className={className}
    >
      <g fill="#000">
        <path d="M 8 8 m 4 0h -4v 4v 4v 4h 4h 4h 4v -4v -4v -4h -4h -4" />
      </g>
    </svg>
  );
}
