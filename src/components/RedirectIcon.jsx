export default function RedirectIcon({
  color = "currentColor",
  size = 15,
  className = "",
  ...props
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      transform="matrix(1,0,0,-1,0,0)"
      className={className}
      {...props}
    >
      <rect x="3" y="3" width="14" height="14" rx="2" ry="2"></rect>
      <line x1="10" y1="10" x2="22" y2="22"></line>
      <polyline points="22,15 22,22 15,22"></polyline>
    </svg>
  );
}
