// pages/index.js - FINAL AXIOS-INTEGRATED VERSION
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { FaSearch, FaFacebook, FaEnvelope, FaDonate } from 'react-icons/fa';
import styles from '../styles/Home.module.scss';
import Loader from '../components/Loader';
import ResultList from '../components/ResultList';
import HeroDecoration from '../components/HeroDecoration';
import Donate from '../components/Donate';
import api from '@/utils/api';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export default function Home() {
  const [query, setQuery] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Optionally autofocus search input
  }, []);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    setError('');

    const regionParam = selectedState ? `&region=${encodeURIComponent(selectedState)}` : '';
    const cityParam = selectedCity ? `&city=${encodeURIComponent(selectedCity)}` : '';

    try {
      const { data } = await api.get(`/api/prices?query=${encodeURIComponent(query)}${regionParam}${cityParam}`);
      setResults(data.listings || []);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || err.message || 'Failed to load chainsaw listings. Try again later.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Sawprice Hunter</title>
        <meta name="description" content="A chainsaw price tracker for finding current values and deals." />
      </Head>

      <HeroDecoration />

      <main className={styles.main}>
        <h1 className={styles.title}>Sawprice Hunter</h1>
        <p className={styles.description}>A chainsaw price tracker for finding current values and deals.</p>

        <div className={styles.filters}>
          <select value={selectedState} onChange={e => setSelectedState(e.target.value)}>
            <option value="">Select State</option>
            {/* ...state options... */}
          </select>
          <select
            value={selectedCity}
            onChange={e => setSelectedCity(e.target.value)}
            disabled={!selectedState}
          >
            <option value="">Select City</option>
            {/* ...city options based on state... */}
          </select>
        </div>

        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="e.g. husqvarna chainsaw"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={styles.searchButton}
            onClick={handleSearch}
            aria-label="Search"
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
          <a href="https://facebook.com/yourpage" aria-label="Facebook"><FaFacebook /></a>
          <a href="mailto:youremail@example.com" aria-label="Email"><FaEnvelope /></a>
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
          aria-label="Toggle Donate"
          onClick={() => {/* toggle donate modal */}}
        >
          <FaDonate />
        </motion.button>
      </footer>
    </div>
  );
}
