# --- ResultCard.js ---
resultcard_code = """
import styles from '../styles/Dashboard.module.scss';

export default function ResultCard({ result }) {
  return (
    <a href={result.link} target="_blank" rel="noopener noreferrer" className={styles.card}>
      <h3>{result.title}</h3>
    </a>
  );
}
"""