import React from 'react';
import { motion } from 'framer-motion';

export default function HeroDecoration() {
  return (
    <motion.svg
      width="200"
      height="200"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute top-[-40px] right-[-40px] z-0 opacity-20"
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
    >
      <circle cx="50" cy="50" r="45" stroke="#3b82f6" strokeWidth="5" strokeDasharray="10,5" />
      <circle cx="50" cy="50" r="35" stroke="#1e40af" strokeWidth="2" strokeDasharray="5,5" />
      <circle cx="50" cy="50" r="25" fill="#1e3a8a" opacity="0.1" />
    </motion.svg>
  );
}
