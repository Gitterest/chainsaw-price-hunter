# --- ResultList.js ---
resultlist_code = """
import styles from '../styles/Dashboard.module.scss';
import ResultCard from './ResultCard';

export default function ResultList({ results }) {
  if (!results.length) {
    return <p className={styles.noResults}>No results found.</p>;
  }

  return (
    <div className={styles.resultsGrid}>
      {results.map((r, idx) => (
        <ResultCard key={idx} result={r} />
      ))}
    </div>
  );
}
"""