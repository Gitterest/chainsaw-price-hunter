'use client';

import { useEffect } from 'react';

const CursorEffects = () => {
  useEffect(() => {
    let cursor;

    // ✅ This dynamic import happens only in the browser after load
    import('https://unpkg.com/cursor-effects@1.1.0/dist/esm.js')
      .then(({ textFlag }) => {
        cursor = new textFlag({
          text: 'Get Sawed',
          color: ['#FF6800'],
        });
      })
      .catch((err) => {
        console.error('Failed to load cursor-effects:', err);
      });

    return () => {
      if (cursor?.destroy) cursor.destroy();
    };
  }, []);

  return null;
};

export default CursorEffects;
