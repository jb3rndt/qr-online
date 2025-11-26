export function DotCornerDot({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 28"
      className={className}
      fill="currentColor"
    >
      <path d="M 8 8 m 6 0a 6 6 0 0 0 0 12a 6 6 0 0 0 0 -12" />
    </svg>
  );
}
