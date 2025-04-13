import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaFacebook, FaEnvelope } from 'react-icons/fa';
import styles from '../styles/Home.module.scss';
import Loader from '../components/Loader';
import ResultList from '../components/ResultList';
import HeroDecoration from '../components/HeroDecoration';

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

      const res = await fetch(`${API_BASE}/api/prices?query=${encodeURIComponent(query)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error('Search failed:', err);
      setError('Could not fetch results. Please try again.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <motion.div
        className={styles.background}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      />

      <section className={styles.hero} style={{ position: 'relative', overflow: 'hidden' }}>
        <HeroDecoration />

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <img src="/chainsaw.gif" alt="chainsaw" className={styles.gif} />
          Sawprice Hunter
        </motion.h1>

        <p className={styles.subtitle}>
          A chainsaw price tracker for finding current values and deals.
        </p>

        <motion.div className={styles.searchBar} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <input
            type="text"
            placeholder="Search chainsaws e.g. 'Husqvarna 372XP'"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className={styles.searchInput}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSearch}
            className={styles.searchButton}
          >
            <FaSearch /> Search
          </motion.button>
        </motion.div>
      </section>

      <section className={styles.resultsSection}>
        {loading ? (
          <Loader />
        ) : error ? (
          <p className={styles.errorMessage}>{error}</p>
        ) : results.length > 0 ? (
          <ResultList results={results} />
        ) : (
          <p className={styles.placeholderText}>Try searching for a chainsaw above ⬆</p>
        )}
      </section>

      <motion.footer
        className={styles.footer}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <p>© {new Date().getFullYear()} Sawprice Hunter | Built by the creators of the Fuck Saw</p>
        <div className={styles.socials}>
          <a href="#"><FaFacebook /></a>
          <a href="#"><FaEnvelope /></a>
        </div>
      </motion.footer>
    </div>
  );
}
