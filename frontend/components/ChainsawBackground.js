import React from 'react';
import styles from '../styles/ChainsawBackground.module.scss';

export default function ChainsawBackground() {
  return (
    <div className={styles.container} aria-hidden="true">
      <svg
        className={styles.chainsaw}
        viewBox="0 0 300 120"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="rotate(-15 150 60)">
          <rect x="20" y="40" width="90" height="50" rx="8" className={styles.body} />
          <rect x="110" y="55" width="170" height="20" rx="10" className={styles.blade} />
          <path
            d="M115 55 h160 a5 5 0 0 1 5 5 v10 a5 5 0 0 1 -5 5 h-160 a5 5 0 0 1 -5 -5 v-10 a5 5 0 0 1 5 -5 z"
            className={styles.chain}
          />
        </g>
      </svg>
    </div>
  );
}
