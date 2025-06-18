export default function Logo() {
  return (
    <svg
      width="180"
      height="60"
      viewBox="0 0 300 60"
      xmlns="http://www.w3.org/2000/svg"
      className="cursor-pointer transition-all hover:opacity-80"
    >
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: "#ff416c" }} />
          <stop offset="100%" style={{ stopColor: "#ff4b2b" }} />
        </linearGradient>
      </defs>
      <text
        x="0"
        y="40"
        fontFamily="Poppins, sans-serif"
        fontWeight="700"
        fontSize="36"
        fill="url(#grad1)"
      >
        ShopNext
      </text>
    </svg>
  );
}
