import React from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/Home.module.scss';

export default function ResultCard({ item }) {
  return (
    <motion.div
      className={styles.card}
      whileHover={{ scale: 1.03, y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.cardImageWrap}>
        <img
          src={item.image}
          alt={item.title || 'Chainsaw Image'}
          className={styles.cardImage}
        />
      </div>

      <div className={styles.cardContent}>
        <h3>{item.title}</h3>
        {item.price && <p className={styles.price}>{item.price}</p>}
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          View Listing
        </a>
        <span className={styles.sourceTag}>{item.source}</span>
      </div>
    </motion.div>
  );
}

