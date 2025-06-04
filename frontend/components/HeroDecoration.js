
import React from 'react';
import { motion } from 'framer-motion';

export default function HeroDecoration() {
  return (
    <div style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 0 }}>
      <motion.svg
        width="120"
        height="120"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ rotate: 0, scale: 1 }}
        animate={{ 
          rotate: 360,
          scale: [1, 1.05, 1],
        }}
        transition={{
          rotate: { repeat: Infinity, duration: 30, ease: 'linear' },
          scale: { repeat: Infinity, duration: 6, ease: 'easeInOut' }
        }}
        style={{ maxWidth: '25vw', height: 'auto', opacity: 0.2 }}
      >
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          stroke="#3b82f6"
          strokeWidth="5"
          strokeDasharray="10,5"
          animate={{ stroke: ["#3b82f6", "#38bdf8", "#3b82f6"] }}
          transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
        />
        <motion.circle
          cx="50"
          cy="50"
          r="35"
          stroke="#1e40af"
          strokeWidth="2"
          strokeDasharray="5,5"
          animate={{ stroke: ["#1e40af", "#6366f1", "#1e40af"] }}
          transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
        />
        <motion.circle
          cx="50"
          cy="50"
          r="25"
          fill="#1e3a8a"
          opacity="0.1"
          animate={{ opacity: [0.05, 0.15, 0.05] }}
          transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        />
      </motion.svg>
    </div>
  );
}
