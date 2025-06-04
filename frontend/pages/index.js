
import React, { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { FaSearch, FaFacebook, FaEnvelope } from 'react-icons/fa';
import styles from '../styles/Home.module.scss';
import Loader from '../components/Loader';
import ResultList from '../components/ResultList';
import HeroDecoration from '../components/HeroDecoration';
import Donate from '../components/Donate';

const states = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
  "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
  "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
  "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico",
  "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
  "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
  "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

const cityMap = {
  California: ["Los Angeles", "San Diego", "San Francisco"],
  Texas: ["Houston", "Dallas", "Austin"],
  Indiana: ["Indianapolis", "Fort Wayne", "Lafayette"],
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
    if (!query.trim()) return;
    setLoading(true);
    setError('');

    try {
      const url = `/api/prices?query=${encodeURIComponent(query)}&region=${encodeURIComponent(selectedState)}&city=${encodeURIComponent(selectedCity)}`;
      const res = await fetch(url);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch results');
      setResults(data.listings || []);
    } catch (err) {
      console.error(err);
      setError(err.message);
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
            {states.map(state => <option key={state} value={state}>{state}</option>)}
          </select>
          <select
            value={selectedCity}
            onChange={e => setSelectedCity(e.target.value)}
            disabled={!availableCities.length}
          >
            <option value="">Select City</option>
            {availableCities.map(city => <option key={city} value={city}>{city}</option>)}
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
          <a href="https://facebook.com/yourpage" aria-label="Facebook"><FaFacebook /></a>
          <a href="mailto:youremail@example.com" aria-label="Email"><FaEnvelope /></a>
        </div>
        <Donate />
      </footer>
    </div>
  );
}
