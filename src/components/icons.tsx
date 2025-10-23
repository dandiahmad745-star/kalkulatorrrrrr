import * as React from 'react';

export const SteamingCoffeeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8v-4H8v4" />
    <path d="M18 8h2a2 2 0 0 1 2 2v6a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V10a2 2 0 0 1 2-2h2" />
    <path d="M12 2v2" />
    <path d="M8 2v2" />
    <path d="M16 2v2" />
    <style>
      {`
        @keyframes steam {
          0% { transform: translateY(0) scale(1); opacity: 0.6; }
          50% { transform: translateY(-5px) scale(1.1); opacity: 0.3; }
          100% { transform: translateY(-10px) scale(1.2); opacity: 0; }
        }
        .steam-1 { animation: steam 2s ease-out infinite; }
        .steam-2 { animation: steam 2s ease-out 0.5s infinite; }
        .steam-3 { animation: steam 2s ease-out 1s infinite; }
      `}
    </style>
    <g>
      <path className="steam-1" d="M12 7.5s-1 0-1-1" />
      <path className="steam-2" d="M10 6s-1 0-1-1" />
      <path className="steam-3" d="M14 6s-1 0-1-1" />
    </g>
  </svg>
);
