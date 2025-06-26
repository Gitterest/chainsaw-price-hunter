import React, { useEffect, useRef } from 'react';

export default function AnimatedBackground() {
  const svgRef = useRef(null);

  useEffect(() => {
    // Throttled scroll handler for better performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          if (svgRef.current) {
            svgRef.current.style.transform = `translateY(${scrollY * 0.1}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.7,
      }}
      viewBox="0 0 1920 1080"
      preserveAspectRatio="none"
    >
      <defs>
        <radialGradient id="bg1" cx="50%" cy="40%" r="80%">
          <stop offset="0%" stopColor="#f97316" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#0f0f0f" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="glow1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0ff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#f97316" stopOpacity="0.2" />
        </linearGradient>
        <filter id="blur1" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="60" />
        </filter>
      </defs>
      {/* Glowing background blobs */}
      <circle cx="600" cy="400" r="320" fill="url(#bg1)" filter="url(#blur1)" />
      <circle cx="1500" cy="700" r="260" fill="url(#glow1)" filter="url(#blur1)" />
      {/* Chainsaw blade shape (stylized) */}
      <g opacity="0.18">
        <ellipse cx="1200" cy="300" rx="180" ry="40" fill="#fff" filter="url(#blur1)" />
        <rect x="1100" y="270" width="200" height="60" rx="30" fill="#f97316" filter="url(#blur1)" />
      </g>
      {/* Parallax sparkles */}
      {[...Array(18)].map((_, i) => (
        <circle
          key={i}
          cx={Math.random() * 1920}
          cy={Math.random() * 1080}
          r={Math.random() * 6 + 2}
          fill="#fff"
          opacity={Math.random() * 0.2 + 0.1}
        />
      ))}
    </svg>
  );
} 