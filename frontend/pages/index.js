import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaFacebook, FaEnvelope } from 'react-icons/fa';
import styles from '../styles/Home.module.scss';
import ResultCard from '../components/ResultCard';

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/prices?query=${query}`);
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error('Search failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <motion.div className={styles.background} initial={{ opacity: 0 }} animate={{ opacity: 1 }} />

      <section className={styles.hero}>
<motion.h1
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.3 }}
>
  🪚 Sawprice Hunter
</motion.h1>

