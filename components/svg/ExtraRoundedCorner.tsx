export function ExtraRoundedCorner({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 28"
      className={className}
    >
      <path
        d="M 0 12v 4a 12 12 0 0 0 12 12h 4a 12 12 0 0 0 12 -12v -4a 12 12 0 0 0 -12 -12h -4a 12 12 0 0 0 -12 12M 12 4h 4a 8 8, 0, 0, 1, 8 8v 4a 8 8, 0, 0, 1, -8 8h -4a 8 8, 0, 0, 1, -8 -8v -4a 8 8, 0, 0, 1, 8 -8"
        fill="#000"
      />
    </svg>
  );
}
