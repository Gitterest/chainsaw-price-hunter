'use client';

import { useEffect } from 'react';
import { textFlag } from 'cursor-effects';

export default function CursorEffects() {
  useEffect(() => {
    const effect = new textFlag({
      text: 'Get Sawed',
      color: ['#FF5C1F', '#FF9F1C', '#FFDC00', '#00FFB2', '#00CFFF']
    });

    const cursor = document.createElement('div');
    cursor.id = 'color-cursor';
    document.body.appendChild(cursor);

    const move = (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    window.addEventListener('mousemove', move);

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

    // Create cursor trail effect
    const createTrail = () => {
      const trail = document.createElement('div');
      trail.style.position = 'fixed';
      trail.style.width = '6px';
      trail.style.height = '6px';
      trail.style.borderRadius = '50%';
      trail.style.background = 'linear-gradient(45deg, #0ff, #f97316)';
      trail.style.pointerEvents = 'none';
      trail.style.zIndex = '9999';
      trail.style.transition = 'all 0.1s ease';
      trail.style.boxShadow = '0 0 8px #0ff, 0 0 16px #f97316';
      return trail;
    };

    const trails = Array.from({ length: 8 }, () => createTrail());
    trails.forEach(trail => document.body.appendChild(trail));

    let mouseX = 0;
    let mouseY = 0;
    let trailPositions = Array.from({ length: 8 }, () => ({ x: 0, y: 0 }));

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animateTrails = () => {
      // Update trail positions
      trailPositions.forEach((pos, index) => {
        if (index === 0) {
          pos.x = mouseX;
          pos.y = mouseY;
        } else {
          const prevPos = trailPositions[index - 1];
          pos.x += (prevPos.x - pos.x) * 0.3;
          pos.y += (prevPos.y - pos.y) * 0.3;
        }

        const trail = trails[index];
        if (trail) {
          trail.style.left = pos.x - 3 + 'px';
          trail.style.top = pos.y - 3 + 'px';
          trail.style.opacity = (8 - index) / 8;
          trail.style.transform = `scale(${(8 - index) / 8})`;
        }
      });
      requestAnimationFrame(animateTrails);
    };

    document.addEventListener('mousemove', handleMouseMove);
    animateTrails();

    return () => {
      window.removeEventListener('mousemove', move);
      cursor.remove();
      if (effect?.destroy) effect.destroy();
      document.removeEventListener('mousemove', handleMouseMove);
      trails.forEach(trail => trail.remove());
    };
  }, []);

  return null;
}
