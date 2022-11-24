export const AlertIcon = () => (
  <svg
    width="50"
    height="60"
    viewBox="0 0 50 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#a)">
      <circle cx="25" cy="25" r="25" fill="#EB541E" />
    </g>
    <path
      d="M25 11.25v20"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="25" cy="37.5" r="1.25" fill="#fff" />
    <defs>
      <filter
        id="a"
        x="-3"
        y="0"
        width="56"
        height="56"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="3" />
        <feGaussianBlur stdDeviation="1.5" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0.55 0 0 0 0 0.55 0 0 0 0 0.55 0 0 0 0.2 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_822_34651"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_822_34651"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
