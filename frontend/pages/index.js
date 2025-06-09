import React, { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { FaSearch, FaFacebook, FaEnvelope } from 'react-icons/fa';
import styles from '../styles/Home.module.scss';
import Loader from '../components/Loader';
import ResultList from '../components/ResultList';
import HeroDecoration from '../components/HeroDecoration';
import Donate from '../components/Donate';
import API from '../utils/api';

const cityMap = {
  California: ["Los Angeles", "San Francisco", "San Diego"],
  Texas: ["Houston", "Dallas", "Austin"],
  New York: ["New York City", "Buffalo", "Rochester"],
  Florida: ["Miami", "Orlando", "Tampa"],
  Washington: ["Seattle", "Spokane", "Tacoma"],
  Idaho: ["Boise", "Idaho Falls", "Twin Falls"],
  Indiana: ["Indianapolis", "Fort Wayne", "Evansville"]
};

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
      const res = await API.get('/prices', {
        params: {
          query,
          region: selectedState,
          city: selectedCity
        }
      });

      setResults(res.data.listings || []);
    } catch (err) {
      console.error('Search error:', err);
      setError(err?.response?.data?.error || 'Failed to fetch data');
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
        <Donate />
      </footer>
    </div>
  );
}
