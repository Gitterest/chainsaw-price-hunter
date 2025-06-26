import { useEffect, useState } from 'react';
import Image from 'next/image';

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

  useEffect(() => {
    if (active) {
      // Play chainsaw sound
      const audio = new Audio('/chainsaw-01.mp3');
      audio.play().catch(e => console.log('Audio play failed:', e));
      // Confetti
      import('canvas-confetti').then(confetti => {
        confetti.default({
          particleCount: 200,
          spread: 120,
          origin: { y: 0.6 },
          zIndex: 2000
        });
      });
    }
  }, [active]);

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
        cursor: 'pointer',
        fontFamily: 'Rajdhani, sans-serif',
      }}
    >
      <div style={{ marginBottom: '2rem', animation: 'shake 0.5s infinite alternate' }}>
        <Image 
          src="/chainsaw.gif" 
          alt="Chainsaw" 
          width={180} 
          height={180}
          style={{ filter: 'drop-shadow(0 0 24px #f97316)' }}
        />
      </div>
      <p style={{ fontSize: '2rem', marginBottom: '1rem', textShadow: '0 0 16px #0ff' }}>
        You found the secret chainsaw! 🪓
      </p>
      <p style={{ fontSize: '1.1rem', color: '#f97316', marginBottom: '2rem' }}>
        (click anywhere to close)
      </p>
      <style>{`
        @keyframes shake {
          0% { transform: rotate(-8deg); }
          100% { transform: rotate(8deg); }
        }
      `}</style>
    </div>
  );
}
