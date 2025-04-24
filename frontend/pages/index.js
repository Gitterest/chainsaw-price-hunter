// pages/index.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaFacebook, FaEnvelope, FaDonate } from 'react-icons/fa';
import styles from '../styles/Home.module.scss';
import Loader from '../components/Loader';
import ResultList from '../components/ResultList';
import HeroDecoration from '../components/HeroDecoration';
import Donate from '../components/Donate';
import Head from 'next/head';

export default function Home() {
  const [query, setQuery] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDonate, setShowDonate] = useState(false);
  const [pulse, setPulse] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);

    const API_BASE =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:5000'
        : process.env.NEXT_PUBLIC_API_URL;

    if (!API_BASE) {
      console.error('❌ Missing NEXT_PUBLIC_API_URL. Aborting fetch.');
      setError('API not configured properly. Please contact support.');
      setLoading(false);
      return;
    }

    try {
      const url = `${API_BASE}/api/prices?query=${encodeURIComponent(query)}${selectedState ? `&state=${selectedState}` : ''}`;
      console.log('🔗 Fetching:', url);

      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const text = await res.text();
      console.log('📥 Raw response:', text);

      if (!res.ok) {
        throw new Error(`Server error ${res.status}: ${text}`);
      }

      const data = JSON.parse(text);
      setResults(data);
      if (data && data.length > 0) {
        setPulse(true);
        setTimeout(() => setPulse(false), 800);
      }
    } catch (err) {
      console.error('🚨 Fetch failed:', err.message || err);
      setError('Failed to load chainsaw listings. Try again later.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const US_STATES = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
    "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
    "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
    "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
    "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
  ];

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

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <motion.img
            src="/chainsaw.gif"
            alt="chainsaw"
            className={styles.gif}
            initial={{ rotate: 0 }}
            animate={pulse ? { scale: [1, 1.2, 1], rotate: [0, 20, -20, 0] } : { rotate: [0, 20, -20, 0], x: [0, -1, 1, 0], y: [0, 1, -1, 0] }}
            transition={{ duration: pulse ? 0.6 : 1.2, repeat: pulse ? 0 : Infinity, ease: 'easeInOut' }}
            style={{ display: 'inline-block', marginBottom: '0.75rem' }}
          />

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{ fontFamily: "'Bleeding Cowboys', cursive" }}
          >
            Sawprice Hunter
          </motion.h1>

          {pulse && (
            <motion.div
              className="chainsaw-sparks"
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: [0.8, 0], y: -40, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                bottom: '-10px',
                left: '5%',
                fontSize: '1.5rem',
                color: '#facc15',
                pointerEvents: 'none'
              }}
            >
              ✨
            </motion.div>
          )}
        </div>

        <p className={styles.subtitle} style={{ marginTop: '1rem' }}>
          A chainsaw price tracker for finding current values and deals.
        </p>

        <div style={{ margin: '1rem 0', display: 'flex', justifyContent: 'center' }}>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              border: '1px solid #ccc',
              fontSize: '1rem'
            }}
          >
            <option value="">All States</option>
            {US_STATES.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        <motion.div
          className={styles.searchBar}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <input
            type="text"
            placeholder="Search chainsaws, e.g. 'Husqvarna 372XP'"
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
            <FaSearch /> 𝓢𝓮𝓪𝓻𝓬𝓱
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
          <p className={styles.placeholderText}>
            Driving a race car is like dancing with a chainsaw.
          </p>
        )}
      </section>

      {showDonate && <Donate />}

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

      {/* Floating donate button */}
      <motion.button
        onClick={() => setShowDonate(!showDonate)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          background: '#4D4D4D',
          color: '#F7931A',
          border: 'none',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          fontSize: '1.2rem',
          boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer'
        }}
        aria-label="Toggle Donate"
      >
        <FaDonate />
      </motion.button>
    </div>
  );
}
