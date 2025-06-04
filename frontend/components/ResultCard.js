import React from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/Home.module.scss';

export default function ResultCard({ item }) {
  return (
    <motion.div
      className={styles.card}
      whileHover={{ scale: 1.05, rotate: 1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ boxShadow: '0 10px 20px rgba(0,0,0,0.15)', borderRadius: '16px' }}
    >
      <div className={styles.cardImageWrap}>
        <img
          src={item.image}
          alt={item.title || 'Chainsaw Image'}
          className={styles.cardImage}
          style={{ borderRadius: '12px' }}
        />
      </div>

      <div className={styles.cardContent}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>{item.title}</h3>
        {item.price && <p className={styles.price} style={{ color: '#16a34a', fontWeight: '500' }}>{item.price}</p>}
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
          style={{ display: 'inline-block', marginTop: '0.75rem', color: '#2563eb', fontWeight: '500' }}
        >
          🔗 View Listing
        </a>
        <span className={styles.sourceTag} style={{ display: 'block', marginTop: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
          {item.source}
        </span>
      </div>
    </motion.div>
  );
}
