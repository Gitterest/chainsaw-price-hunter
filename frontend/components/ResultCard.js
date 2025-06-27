import Image from 'next/image';
import styles from '../styles/Dashboard.module.scss';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function ResultCard({ item }) {
  const { title, price, url, location, image } = item;
  const [imageError, setImageError] = useState(false);
  const [currentImageSrc, setCurrentImageSrc] = useState(image || '/chainsaw.gif');

  useEffect(() => {
    console.log('ResultCard image:', { original: image, current: currentImageSrc, error: imageError });
  }, [image, currentImageSrc, imageError]);

  const handleImageError = () => {
    console.log('Image failed to load, using fallback:', currentImageSrc);
    if (!imageError) {
      setImageError(true);
      setCurrentImageSrc('/chainsaw.gif');
    }
  };

  return (
    <motion.div
      className={styles.resultCard}
      whileHover={{ scale: 1.04, boxShadow: '0 0 24px #0ff, 0 0 48px #f97316' }}
      transition={{ type: 'spring', stiffness: 200 }}
      tabIndex={0}
      aria-label={`Chainsaw listing: ${title}`}
    >
      <div className={styles.cardImage} style={{ boxShadow: '0 0 16px #0ff88a44' }}>
        <Image
          src={currentImageSrc}
          alt={title || 'Chainsaw listing'}
          width={300}
          height={200}
          style={{ objectFit: 'cover', borderRadius: '0.5rem', border: '2px solid #0ff' }}
          onError={handleImageError}
        />
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{title || 'Untitled'}</h3>
        <p className={styles.cardPrice}>{price || 'N/A'}</p>
        <p className={styles.cardLocation}>{location || 'Unknown location'}</p>
        <a href={url} target="_blank" rel="noopener noreferrer" className={styles.cardLink} aria-label="View listing">
          View Listing <FaExternalLinkAlt />
        </a>
      </div>
    </motion.div>
  );
}
