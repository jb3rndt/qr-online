export function SquareCorner({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="50"
      viewBox="0 0 50 50"
      className={className}
      fill="currentColor"
    >
      <path d="M 0 0v 49h 49v -49zM 7 7h 35v 35h -35z" />
    </svg>
  );
}
