import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { FaSearch, FaFacebook, FaEnvelope } from 'react-icons/fa';
import styles from '../styles/Home.module.scss';
import Loader from '../components/Loader';
import ResultList from '../components/ResultList';
import HeroDecoration from '../components/HeroDecoration';
import Donate from '../components/Donate';
import EasterEgg from '../components/EasterEgg';
import ChainsawBackground from '../components/ChainsawBackground';
import InteractiveChainsaw from '../components/InteractiveChainsaw';
import CursorEffects from '../components/CursorEffects';
import API from '../src/utils/api';
import dynamic from 'next/dynamic';

const cityMap = {
  California: ["Los Angeles", "San Francisco", "San Diego"],
  Texas: ["Houston", "Dallas", "Austin"],
  "New York": ["New York City", "Buffalo", "Rochester"],
  Florida: ["Miami", "Orlando", "Tampa"],
  Washington: ["Seattle", "Spokane", "Tacoma"],
  Idaho: ["Boise", "Idaho Falls", "Twin Falls"],
  Indiana: ["Indianapolis", "Fort Wayne", "Evansville"]
};

const AnimatedBackground = dynamic(() => import('../components/AnimatedBackground'), { ssr: false });

export default function Home() {
  const [query, setQuery] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const availableCities = cityMap[selectedState] || [];

  const handleSearch = async () => {
    if (!query.trim() || !selectedState || !selectedCity) {
      setError("Please enter a search, select a state and a city.");
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log('Making API request to:', '/api/scraper/prices');
      console.log('With params:', { query, region: selectedState, city: selectedCity });
      
      const res = await API.get('/api/scraper/prices', {
        params: {
          query,
          region: selectedState,
          city: selectedCity
        },
        timeout: 30000 // 30 second timeout
      });

      console.log('API response:', res.data);
      setResults(res.data.listings || []);
    } catch (err) {
      console.error('Search error:', err);
      console.error('Error response:', err?.response);
      console.error('Error message:', err?.message);
      
      if (err?.code === 'ECONNREFUSED') {
        setError('Backend server is not running. Please start the backend server first.');
      } else if (err?.response?.status === 404) {
        setError('API endpoint not found. Please check if the backend is running correctly.');
      } else if (err?.response?.status === 500) {
        setError('Server error: ' + (err?.response?.data?.error || 'Unknown server error'));
      } else {
        setError(err?.response?.data?.error || err?.message || 'Failed to fetch data');
      }
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Easter egg: secret dark mode toggle
  useEffect(() => {
    const secretBtn = document.getElementById('secret-dark-toggle');
    if (secretBtn) {
      secretBtn.onclick = () => {
        document.body.classList.toggle('dark-mode');
      };
    }
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Sawprice Hunter</title>
        <meta name="description" content="A chainsaw price tracker for finding current values and deals." />
      </Head>

      <AnimatedBackground />
      <HeroDecoration />
      <EasterEgg />
      <ChainsawBackground />
      <InteractiveChainsaw />
      <CursorEffects />

      <main className={styles.main}>
        <h1 className={styles.title}>
          <span className={styles.neonGlow}>Sawprice Hunter</span>
        </h1>
        <p className={styles.description}>Chainsaw pricing across major platforms</p>

        <div className={styles.filters}>
          <select value={selectedState} onChange={e => setSelectedState(e.target.value)}>
            <option value="">Select State</option>
            {Object.keys(cityMap).map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>

          <select
            value={selectedCity}
            onChange={e => setSelectedCity(e.target.value)}
            disabled={!availableCities.length}
          >
            <option value="">Select City</option>
            {availableCities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className={styles.searchBar}
        >
          <input
            type="text"
            placeholder="e.g. husqvarna chainsaw"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search chainsaw listings"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={styles.searchButton}
            aria-label="Search"
          >
            <FaSearch /> Search
          </motion.button>
        </form>

        {loading && <Loader />}
        {error && <p className={styles.error}>{error}</p>}
        {results.length > 0 && <ResultList results={results} />}
      </main>

      <footer className={styles.footer}>
        <div className={styles.socials}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook />
          </a>
          <a href="mailto:contact@sawpricehunter.com">
            <FaEnvelope />
          </a>
        </div>
        <button id="secret-dark-toggle" style={{ opacity: 0, position: 'absolute', left: '-9999px' }} aria-label="Toggle dark mode" tabIndex={-1}></button>
        <Donate />
      </footer>
    </div>
  );
}
