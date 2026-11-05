import React from 'react';

// Pyro — the app's flame mascot. Drawn as SVG so it stays crisp and instant.
export default function PyroMascot({ size = 120, className = '', mood = 'happy' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label="Pyro the flame mascot"
      className={className}
      style={{ filter: 'drop-shadow(0 18px 34px rgba(74, 222, 128, 0.35))' }}
    >
      <defs>
        <linearGradient id="pyroOuter" x1="20" y1="10" x2="82" y2="92" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#a3e635" />
          <stop offset="48%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
        <linearGradient id="pyroInner" x1="38" y1="46" x2="62" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#fb923c" />
        </linearGradient>
      </defs>

      <path
        d="M50 5c7 18 24 25 24 47 0 21-11 36-24 36S26 73 26 52c0-13 7-22 13-31 1 9 4 14 9 17 0-13 2-23 2-33z"
        fill="url(#pyroOuter)"
        opacity="0.95"
      />
      <path
        d="M50 44c4 9 12 13 12 24 0 11-5 18-12 18s-12-7-12-18c0-7 3-11 7-16 0 5 2 8 4 10 0-7 1-12 1-18z"
        fill="url(#pyroInner)"
        opacity="0.9"
      />

      {mood === 'wow' ? (
        <>
          <circle cx="43" cy="53" r="4.2" fill="#0b1020" />
          <circle cx="57" cy="53" r="4.2" fill="#0b1020" />
          <circle cx="44.4" cy="51.6" r="1.5" fill="#ffffff" />
          <circle cx="58.4" cy="51.6" r="1.5" fill="#ffffff" />
          <ellipse cx="50" cy="65" rx="4.6" ry="5.4" fill="#0b1020" />
        </>
      ) : (
        <>
          <circle cx="43" cy="53" r="4" fill="#0b1020" />
          <circle cx="57" cy="53" r="4" fill="#0b1020" />
          <circle cx="44.5" cy="51.5" r="1.4" fill="#ffffff" />
          <circle cx="58.5" cy="51.5" r="1.4" fill="#ffffff" />
          <path d="M43.5 63c2.6 3.6 10.4 3.6 13 0" stroke="#0b1020" strokeWidth="2.6" strokeLinecap="round" fill="none" />
        </>
      )}
    </svg>
  );
}