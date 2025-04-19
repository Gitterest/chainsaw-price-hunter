import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Donate = () => {
  const [copied, setCopied] = useState(false);
  const btcAddress = 'bc1q2urpq80ttg7qmk5thheku4upjvsuwg6z8wjedm';

  const handleCopy = () => {
    navigator.clipboard.writeText(btcAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.7 }}
      viewport={{ once: true }}
      style={{
        background: 'rgba(255, 255, 255, 0.7)',
        borderRadius: '1.25rem',
        padding: '2rem',
        maxWidth: '420px',
        margin: '4rem auto',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        textAlign: 'center',
        backdropFilter: 'blur(8px)',
      }}
    >
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
        Support the Sawprice Hunter 💚
      </h2>
      <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
        Donations help keep this app fast, free, and ad-free.
      </p>
      <img
        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=bitcoin:${btcAddress}`}
        alt="Bitcoin QR Code"
        style={{ margin: '0 auto 1rem', borderRadius: '0.5rem' }}
      />
      <code style={{ fontSize: '0.8rem', wordBreak: 'break-all', display: 'block', marginBottom: '0.5rem' }}>
        {btcAddress}
      </code>
      <button
        onClick={handleCopy}
        style={{
          padding: '0.5rem 1.5rem',
          background: 'black',
          color: 'white',
          border: 'none',
          borderRadius: '0.75rem',
          fontSize: '0.9rem',
          cursor: 'pointer',
        }}
      >
        {copied ? '✅ Copied!' : '📋 Copy Address'}
      </button>
    </motion.div>
  );
};

export default Donate;
