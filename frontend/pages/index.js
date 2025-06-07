// 🔧 Fixed version of pages/index.js
// This assumes previous JSX structure based on your layout
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { FaSearch, FaFacebook, FaEnvelope, FaDonate } from 'react-icons/fa';
import styles from '../styles/Home.module.css';
import Loader from '../components/Loader';
import ResultList from '../components/ResultList';
import HeroDecoration from '../components/HeroDecoration';
import Donate from '../components/Donate';
import api from '../src/utils/api';

export default function Home() {
  const [query, setQuery] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get(`/api/prices?query=${encodeURIComponent(query)}`);
      setResults(data.listings || []);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Sawprice Hunter</title>
        <meta name="description" content="Track chainsaw prices from multiple sources" />
      </Head>
      <HeroDecoration />
      <main className={styles.main}>
        <h1 className={styles.title}>Sawprice Hunter</h1>
        <p className={styles.description}>Chainsaw pricing across major platforms</p>

        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="e.g. husqvarna chainsaw"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={styles.searchButton}
            onClick={handleSearch}
          >
            <FaSearch /> Search
          </motion.button>
        </div>

        {loading && <Loader />}
        {error && <p className={styles.error}>{error}</p>}
        {results.length > 0 && <ResultList listings={results} />}
      </main>

      <footer className={styles.footer}>
        <div className={styles.socials}>
          <a href="https://facebook.com" aria-label="Facebook"><FaFacebook /></a>
          <a href="mailto:you@example.com" aria-label="Email"><FaEnvelope /></a>
        </div>
        <Donate />
        <motion.button
          whileHover={{ scale: 1.1 }}
          style={{
            position: 'fixed', bottom: 20, right: 20,
            background: '#fff', borderRadius: '50%', width: 50, height: 50,
            boxShadow: '0 10px 20px rgba(0,0,0,0.2)', zIndex: 1000,
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
          }}
          aria-label="Donate"
          onClick={() => {}}
        >
          <FaDonate />
        </motion.button>
      </footer>
    </div>
  );
}
