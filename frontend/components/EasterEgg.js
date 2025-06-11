import { useEffect, useState } from 'react';

export default function EasterEgg() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const sequence = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    let index = 0;
    const handler = (e) => {
      if (e.key === sequence[index]) {
        index += 1;
        if (index === sequence.length) {
          setActive(true);
          index = 0;
        }
      } else {
        index = 0;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  if (!active) return null;

  return (
    <div
      onClick={() => setActive(false)}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0,0,0,0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        zIndex: 1000,
        flexDirection: 'column',
        cursor: 'pointer'
      }}
    >
      <p style={{ fontSize: '2rem', marginBottom: '1rem' }}>
        You found the secret chainsaw! 🪓
      </p>
      <p>(click anywhere to close)</p>
    </div>
  );
}
