'use client';

import { useEffect } from 'react';
import { textFlag } from 'cursoreffects';

const CursorEffects = () => {
  useEffect(() => {
    const effect = new textFlag({
      text: 'Get Sawed',
      color: ['#FF6800'],
    });

    return () => effect.destroy();
  }, []);

  return null;
};

export default CursorEffects;
