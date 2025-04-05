import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/Dashboard.module.scss';
import Loader from '../components/Loader';
import { FaUser, FaCode, FaFacebook, FaSearch, FaEnvelope } from 'react-icons/fa';

export default function Home() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!query.trim()) return;
        setLoading(true);

        const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

        try {
            const res = await fetch(`${apiBase}/api/prices?query=${query}`);
            const data = await res.json();
            setResults(data);
        } catch (err) {
            console.error('Search failed:', err);
        } finally {
            setLoading(false);
        }
    };

    const AnimatedButton = ({ onClick, children, className }) => (
        <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`${styles.button} ${className}`}
        >
            {children}
        </motion.button>
    );

    const AnimatedBackground = () => (
        <motion.div
            className={styles.animatedBackground}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
        />
    );

    const ResultCard = ({ item }) => (
        <motion.div className={styles.card} whileHover={{ scale: 1.02 }}>
            <Image src={item.image} alt={item.title} className={styles.cardImage} />
            <div className={styles.cardContent}>
                <h3>{item.title}</h3>
                {item.price && <p>{item.price}</p>}
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                    View Listing
                </a>
                <p className={styles.sourceTag}>{item.source}</p>
            </div>
        </motion.div>
    );

    return (
        <div className={styles.page}>
            <AnimatedBackground />

            <header className={styles.header}>
                <h1 className={styles.title}>🪚 Sawprice Hunter</h1>
                <p className={styles.subtitle}>
                    Find and compare the best chainsaw prices across trusted marketplaces.
                </p>
            </header>

            <div className={styles.searchSection}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className={styles.input}
                    placeholder="Search chainsaws, e.g. Husqvarna 455..."
                />
                <AnimatedButton onClick={handleSearch}>
                    <FaSearch /> Search
                </AnimatedButton>
            </div>

            {loading ? (
                <Loader />
            ) : (
                <div className={styles.resultsGrid}>
                    {results.length > 0 &&
                        results.map((item, index) => (
                            <ResultCard key={index} item={item} />
                        ))}
                </div>
            )}

            <footer className={styles.footer}>
                <p>© {new Date().getFullYear()} Chainsaw Price Hunter</p>
                <div className={styles.socials}>
                    <a href="#"><FaFacebook /></a>
                    <a href="#"><FaEnvelope /></a>
                </div>
            </footer>
        </div>
    );
}
