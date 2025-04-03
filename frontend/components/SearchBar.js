# --- SearchBar.js ---
searchbar_code = """
import styles from '../styles/Dashboard.module.scss';
import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchBar}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for chainsaws..."
        className={styles.searchInput}
      />
      <button type="submit" className={styles.searchButton}>Hunt 🔍</button>
    </form>
  );
}
"""