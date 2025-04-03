import styles from '../styles/Dashboard.module.scss';

export default function ResultCard({ result }) {
  return (
    <a
      href={result.link}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
    >
      {result.image && (
        <img src={result.image} alt={result.title} className={styles.resultImage} />
      )}
      <h3>{result.title}</h3>
      {result.price && <p>{result.price}</p>}
      {result.source && <p className={styles.source}>{result.source}</p>}
      <p className={styles.link}>🔗 View on Facebook</p>
    </a>
  );
}
