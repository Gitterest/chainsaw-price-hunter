import { useState } from "react";
import styles from "../styles/Dashboard.module.scss"; // use updated dark theme
import Loader from "../components/Loader";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [savedSearches, setSavedSearches] = useState([]);

  const fetchPrices = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const response = await fetch(`http://localhost:5000/api/prices?query=${query}`);
      const data = await response.json();
      setResults(data);

      // Save search if not already saved
      setSavedSearches((prev) => [...new Set([query, ...prev])]);
    } catch (err) {
      console.error("API Error:", err);
      setError("Failed to fetch prices.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🪚 Chainsaw Price Tracker 🛠️</h1>

      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Enter chainsaw model..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.searchInput}
        />
        <button className={styles.searchButton} onClick={fetchPrices}>
          🔍 Search
        </button>
      </div>

      {loading && <Loader />}
      {error && <p className={styles.error}>{error}</p>}

      {/* Recent Searches */}
      {savedSearches.length > 0 && (
        <div className={styles.recentSearches}>
          <h3>Recent Searches:</h3>
          <ul>
            {savedSearches.map((search, index) => (
              <li
                key={index}
                onClick={() => {
                  setQuery(search);
                  fetchPrices();
                }}
                className={styles.recentItem}
              >
                {search}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className={styles.resultsGrid}>
        {results.map((item, index) => (
          <div key={index} className={styles.resultCard}>
            {item.image && <img src={item.image} alt={item.title} className={styles.resultImage} />}
            <h3>{item.title}</h3>
            <p>{item.price}</p>
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              🔗 View on Facebook
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
