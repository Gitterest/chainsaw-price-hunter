// pages/index.js - FULLY GOD-TIER VERSION
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaFacebook, FaEnvelope, FaDonate } from 'react-icons/fa';
import styles from '../styles/Home.module.scss';
import Loader from '../components/Loader';
import ResultList from '../components/ResultList';
import HeroDecoration from '../components/HeroDecoration';
import Donate from '../components/Donate';
import Head from 'next/head';
import statesCities from '../data/us_states_cities.json';

export default function Home() {
  const [query, setQuery] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDonate, setShowDonate] = useState(false);
  const [pulse, setPulse] = useState(false);
  const [availableCities, setAvailableCities] = useState([]);

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setSelectedCity('');
    if (state && statesCities[state]) {
      setAvailableCities(statesCities[state]);
    } else {
      setAvailableCities([]);
    }
  };

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);

    const API_BASE =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:5000'
        : process.env.NEXT_PUBLIC_API_URL;

    try {
      const stateParam = selectedState ? `&state=${encodeURIComponent(selectedState)}` : '';
      const cityParam = selectedCity ? `&city=${encodeURIComponent(selectedCity)}` : '';
      const url = `${API_BASE}/api/prices?query=${encodeURIComponent(query)}${stateParam}${cityParam}`;
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

  return (
    <div className={styles.page}>
      <motion.div className={styles.background} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} />

      <section className={styles.hero} style={{ position: 'relative', overflow: 'hidden' }}>
        <HeroDecoration />

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <motion.img
            src="/chainsaw.gif"
            alt="chainsaw"
            className={styles.gif}
            animate={pulse ? { scale: [1, 1.2, 1], rotate: [0, 20, -20, 0] } : { rotate: [0, 20, -20, 0], x: [0, -1, 1, 0], y: [0, 1, -1, 0] }}
            transition={{ duration: pulse ? 0.6 : 1.2, repeat: pulse ? 0 : Infinity, ease: 'easeInOut' }}
            style={{ marginBottom: '0.75rem' }}
          />

          <motion.h1 style={{ fontFamily: "'Bleeding Cowboys', cursive" }} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}>
            Sawprice Hunter
          </motion.h1>

          <p className={styles.subtitle} style={{ marginTop: '1rem' }}>
            A chainsaw price tracker for finding current values and deals.
          </p>

          <select
            value={selectedState}
            onChange={handleStateChange}
            className={styles.dropdown}
            style={{ marginTop: '1rem', padding: '0.5rem', fontSize: '1rem' }}
          >
            <option value="">Select State</option>
            {Object.keys(statesCities).map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>

          {availableCities.length > 0 && (
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className={styles.dropdown}
              style={{ marginTop: '1rem', padding: '0.5rem', fontSize: '1rem' }}
            >
              <option value="">Select City</option>
              {availableCities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          )}
        </div>

        <motion.div className={styles.searchBar} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <input
            type="text"
            placeholder="Search chainsaws, e.g. 'Husqvarna 372XP'"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className={styles.searchInput}
          />
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleSearch} className={styles.searchButton}>
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
          <p className={styles.placeholderText}>Driving a race car is like dancing with a chainsaw.</p>
        )}
      </section>

      {showDonate && <Donate />}

      <motion.footer className={styles.footer} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <p>© {new Date().getFullYear()} Sawprice Hunter | Built by the creators of the Fuck Saw</p>
        <div className={styles.socials}>
          <a href="#"><FaFacebook /></a>
          <a href="#"><FaEnvelope /></a>
        </div>
      </motion.footer>

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
