import { useState } from "react";
import styles from "../styles/Home.module.scss";

export default function Home() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [savedSearches, setSavedSearches] = useState([]);

    const fetchPrices = async () => {
        if (!query) return;

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://localhost:5000/api/prices?query=${query}`);
            const data = await response.json();
            setResults(data);

            // Save search history
            setSavedSearches((prev) => [...new Set([query, ...prev])]);
        } catch (err) {
            setError("Failed to fetch prices.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h1>🪚 Chainsaw Price Tracker 🛠️</h1>
            <div className={styles.searchBox}>
                <div className={styles.inputField}>
                    <input
                        type="text"
                        placeholder="Enter chainsaw model..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
                <button className={styles.button} onClick={fetchPrices}>🔍 Search</button>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* Saved Searches */}
            {savedSearches.length > 0 && (
                <div>
                    <h3>Recent Searches:</h3>
                    <ul>
                        {savedSearches.map((search, index) => (
                            <li key={index} onClick={() => setQuery(search)} style={{ cursor: "pointer", color: "#00bfff" }}>
                                {search}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className={styles.results}>
                {results.map((item, index) => (
                    <div key={index} className={styles.resultCard}>
                        <img src={item.image} alt={item.title} />
                        <h3>{item.title}</h3>
                        <p>{item.price}</p>
                        <a href={item.link} target="_blank" rel="noopener noreferrer">🔗 View on Facebook</a>
                    </div>
                ))}
            </div>
        </div>
    );
}
