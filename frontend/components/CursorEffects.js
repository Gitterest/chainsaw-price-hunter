'use client';

import { useEffect } from 'react';
import { textFlag } from 'cursor-effects';

export default function CursorEffects() {
  useEffect(() => {
    const effect = new textFlag({
      text: 'Get Sawed',
      color: ['#FF5C1F', '#FF9F1C', '#FFDC00', '#00FFB2', '#00CFFF']
    });

    const enhanceGlow = () => {
      const canvas = document.querySelector('canvas');
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.font = 'bold 22px "Rajdhani", sans-serif';
      ctx.shadowColor = '#FF5C1F';
      ctx.shadowBlur = 10;
      ctx.globalAlpha = 0.85;
    };

    setTimeout(enhanceGlow, 200);

    return () => {
      if (effect?.destroy) effect.destroy();
    };
  }, []);

  return null;
}
