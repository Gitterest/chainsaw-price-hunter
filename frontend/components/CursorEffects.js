'use client';

import { useEffect } from 'react';
import { textFlag } from 'cursor-effects'; // ⬅️ Now using NPM version

export default function CursorEffects() {
  useEffect(() => {
    const effect = new textFlag({
      text: 'Get Sawed',
      color: ['#FF5C1F'] // Neon orange glow
    });
	
	const enhanceGlow = () => {
      const canvas = document.querySelector('canvas');
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
	  ctx.font = 'bold 22px "Orbitron", sans-serif';
     
    };

    // Delay glow until canvas is rendered
    setTimeout(enhanceGlow, 200);


    return () => {
      if (effect?.destroy) effect.destroy();
    };
  }, []);

  return null;
}
