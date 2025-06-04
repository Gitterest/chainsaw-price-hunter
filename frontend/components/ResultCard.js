import { FaExternalLinkAlt } from 'react-icons/fa';
import styles from '../styles/Dashboard.module.scss';

export default function ResultCard({ item }) {
  const { title, price, url, location, image } = item;

  return (
    <div className={styles.resultCard}>
      <img src={image || '/fallback.jpg'} alt={title} className={styles.cardImage} />

      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardPrice}>{price || 'N/A'}</p>
        <p className={styles.cardLocation}>{location || 'Unknown location'}</p>

        <a href={url} target="_blank" rel="noopener noreferrer" className={styles.cardLink}>
          View Listing <FaExternalLinkAlt />
        </a>
      </div>
    </div>
  );
}
