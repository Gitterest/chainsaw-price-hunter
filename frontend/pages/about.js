import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/Dashboard.module.scss';
import Loader from '../components/Loader';
import { FaInfoCircle, FaBolt, FaCode, FaLeaf } from 'react-icons/fa';

const About = () => {
  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-bold mb-4 flex items-center gap-2">
          <FaInfoCircle /> About Sawprice Hunter
        </h1>
        <p className="text-lg text-gray-300 max-w-xl">
          Welcome to Sawprice Hunter – your ultimate tool to find the best deals on chainsaws from various marketplaces. No logins. No fluff. Just clean, powerful price hunting.
        </p>
      </motion.div>

      {/* Feature Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.2 }}
      >
        <FeatureCard
          icon={<FaBolt />}
          title="Blazing Fast"
          description="We scrape data from OfferUp, Facebook Marketplace, and Mercari in real-time."
        />
        <FeatureCard
          icon={<FaCode />}
          title="Built for Power"
          description="Clean architecture with modern tech like Node.js, Puppeteer, MongoDB, and React."
        />
        <FeatureCard
          icon={<FaLeaf />}
          title="Simple by Nature"
          description="Built for users who just want to find tools fast, with no BS."
        />
      </motion.div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <motion.div
    className="bg-zinc-800 p-6 rounded-lg shadow-md border border-zinc-700 hover:scale-105 transition"
    whileHover={{ scale: 1.05 }}
  >
    <div className="text-3xl mb-3 text-green-400">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-300 text-sm">{description}</p>
  </motion.div>
);

export default About;
