'use client';

import { useEffect } from 'react';

export default function CursorEffects() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/cursor-effects@latest/dist/browser.js';
    script.async = true;
    script.onload = () => {
      if (window.cursoreffects?.textFlag) {
        const effect = new window.cursoreffects.textFlag({
          text: 'Get Sawed',
          color: ['#FF4D00'],
        });

        window._cursorEffectInstance = effect;
      }
    };

    document.body.appendChild(script);

    return () => {
      if (window._cursorEffectInstance?.destroy) {
        window._cursorEffectInstance.destroy();
      }
    };
  }, []);

  return null;
}
