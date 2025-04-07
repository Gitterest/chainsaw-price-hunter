'use client';

import { useEffect } from 'react';

const CursorEffects = () => {
  useEffect(() => {
    let cursorInstance;

    import('https://unpkg.com/cursor-effects@latest/dist/esm.js')
      .then(({ textFlag }) => {
        cursorInstance = new textFlag({
          text: 'Get Sawed',
          color: ['#FF6800'],
        });
      })
      .catch((err) => {
        console.error('Failed to load cursor-effects:', err);
      });

    return () => {
      if (cursorInstance?.destroy) cursorInstance.destroy();
    };
  }, []);

  return null;
};

export default CursorEffects;
