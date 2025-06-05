import React, { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { FaSearch, FaFacebook, FaEnvelope } from 'react-icons/fa';
import styles from '../styles/Home.module.scss';
import Loader from '../components/Loader';
import ResultList from '../components/ResultList';
import HeroDecoration from '../components/HeroDecoration';
import Donate from '../components/Donate';

const cityMap = {
  Alabama: ["Birmingham", "Montgomery", "Mobile"],
  Alaska: ["Anchorage", "Fairbanks", "Juneau"],
  Arizona: ["Phoenix", "Tucson", "Mesa"],
  Arkansas: ["Little Rock", "Fort Smith", "Fayetteville"],
  California: ["Los Angeles", "San Francisco", "San Diego"],
  Colorado: ["Denver", "Colorado Springs", "Aurora"],
  Connecticut: ["Bridgeport", "New Haven", "Hartford"],
  Delaware: ["Wilmington", "Dover", "Newark"],
  Florida: ["Miami", "Orlando", "Tampa"],
  Georgia: ["Atlanta", "Savannah", "Augusta"],
  Hawaii: ["Honolulu", "Hilo", "Kailua"],
  Idaho: ["Boise", "Idaho Falls", "Twin Falls"],
  Illinois: ["Chicago", "Springfield", "Peoria"],
  Indiana: ["Indianapolis", "Fort Wayne", "Evansville"],
  Iowa: ["Des Moines", "Cedar Rapids", "Davenport"],
  Kansas: ["Wichita", "Topeka", "Overland Park"],
  Kentucky: ["Louisville", "Lexington", "Bowling Green"],
  Louisiana: ["New Orleans", "Baton Rouge", "Shreveport"],
  Maine: ["Portland", "Augusta", "Bangor"],
  Maryland: ["Baltimore", "Annapolis", "Frederick"],
  Massachusetts: ["Boston", "Springfield", "Worcester"],
  Michigan: ["Detroit", "Lansing", "Grand Rapids"],
  Minnesota: ["Minneapolis", "Saint Paul", "Duluth"],
  Mississippi: ["Jackson", "Biloxi", "Hattiesburg"],
  Missouri: ["St. Louis", "Kansas City", "Springfield"],
  Montana: ["Billings", "Missoula", "Bozeman"],
  Nebraska: ["Omaha", "Lincoln", "Bellevue"],
  Nevada: ["Las Vegas", "Reno", "Carson City"],
  New Hampshire: ["Manchester", "Concord", "Nashua"],
  New Jersey: ["Newark", "Jersey City", "Trenton"],
  New Mexico: ["Albuquerque", "Santa Fe", "Las Cruces"],
  New York: ["New York City", "Buffalo", "Rochester"],
  North Carolina: ["Charlotte", "Raleigh", "Greensboro"],
  North Dakota: ["Fargo", "Bismarck", "Grand Forks"],
  Ohio: ["Columbus", "Cleveland", "Cincinnati"],
  Oklahoma: ["Oklahoma City", "Tulsa", "Norman"],
  Oregon: ["Portland", "Eugene", "Salem"],
  Pennsylvania: ["Philadelphia", "Pittsburgh", "Harrisburg"],
  Rhode Island: ["Providence", "Cranston", "Warwick"],
  South Carolina: ["Charleston", "Columbia", "Greenville"],
  South Dakota: ["Sioux Falls", "Rapid City", "Pierre"],
  Tennessee: ["Nashville", "Memphis", "Knoxville"],
  Texas: ["Houston", "Dallas", "Austin"],
  Utah: ["Salt Lake City", "Provo", "Ogden"],
  Vermont: ["Burlington", "Montpelier", "Rutland"],
  Virginia: ["Virginia Beach", "Richmond", "Norfolk"],
  Washington: ["Seattle", "Spokane", "Tacoma"],
  West Virginia: ["Charleston", "Morgantown", "Huntington"],
  Wisconsin: ["Milwaukee", "Madison", "Green Bay"],
  Wyoming: ["Cheyenne", "Casper", "Laramie"]
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
      const url = `/api/prices?query=${encodeURIComponent(query)}&region=${encodeURIComponent(selectedState)}&city=${encodeURIComponent(selectedCity)}`;
      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to fetch listings');
      setResults(Array.isArray(data.listings) ? data.listings : []);
    } catch (err) {
      console.error(err);
      setError(err.message || 'An unexpected error occurred.');
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
          <a href="https://facebook.com/yourpage" aria-label="Facebook"><FaFacebook /></a>
          <a href="mailto:youremail@example.com" aria-label="Email"><FaEnvelope /></a>
        </div>
        <Donate />
      </footer>
    </div>
  );
}
