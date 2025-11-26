export function DotCorner({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="50"
      viewBox="0 0 50 50"
      className={className}
      fill="currentColor"
    >
      <path d="M 25.5 1a 24.5 24.5 0 1 0 0.1 0zm 0 7a 17.5 17.5 0 1 1 -0.1 0Z" />
    </svg>
  );
}
