import { useRef, useState } from 'react';
import styles from '../styles/InteractiveChainsaw.module.scss';

export default function InteractiveChainsaw() {
  const audioRef = useRef(null);
  const [active, setActive] = useState(false);

  const handleClick = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.muted = false;
      audioRef.current.volume = 1;
      audioRef.current.play().catch((err) => {
        // Log error for debugging
        console.error('Audio playback failed:', err);
        // Optionally show a user-friendly message
      });
    }
    setActive(true);
    setTimeout(() => setActive(false), 1000);
  };

  return (
    <div className={styles.container} onClick={handleClick} aria-label="Play chainsaw">
      <audio ref={audioRef} src="/chainsaw-01.mp3" preload="auto" />
      <svg className={styles.chainsaw} viewBox="0 0 120 50" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="15" width="35" height="20" rx="4" className={styles.body} />
        <rect x="32" y="20" width="80" height="10" rx="5" className={styles.blade} />
        <path
          d="M35 20 h70 a5 5 0 0 1 5 5 v0 a5 5 0 0 1 -5 5 h-70 a5 5 0 0 1 -5 -5 v0 a5 5 0 0 1 5 -5 z"
          className={active ? styles.chainActive : styles.chain}
        />
      </svg>
    </div>
  );
}
