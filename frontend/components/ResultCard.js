import Image from 'next/image';
import styles from '../styles/Dashboard.module.scss';
import { FaExternalLinkAlt } from 'react-icons/fa';

export default function ResultCard({ item }) {
  const { title, price, url, location, image } = item;

  return (
    <div className={styles.resultCard}>
      <div className={styles.cardImage}>
        <Image
          src={image || '/fallback.jpg'}
          alt={title || 'Chainsaw listing'}
          width={300}
          height={200}
          objectFit="cover"
        />
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{title || 'Untitled'}</h3>
        <p className={styles.cardPrice}>{price || 'N/A'}</p>
        <p className={styles.cardLocation}>{location || 'Unknown location'}</p>
        <a href={url} target="_blank" rel="noopener noreferrer" className={styles.cardLink}>
          View Listing <FaExternalLinkAlt />
        </a>
      </div>
    </div>
  );
}
