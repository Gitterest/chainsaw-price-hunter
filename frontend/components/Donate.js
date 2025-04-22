// components/Donate.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Donate = () => {
  const [copied, setCopied] = useState(false);
  const [currency, setCurrency] = useState('btc');

  const btcAddress = 'bc1q2urpq80ttg7qmk5thheku4upjvsuwg6z8wjedm';
  const xmrAddress = '8AXgixS8eYa13vczPAnZyzDNuzXqr92x6bMcCWM25fv9g2EfFvt4NMvenJuQyqBvKHPzp5fcxVRz3MJGrDovAZB88YAzcWX';

  const handleCopy = () => {
    const addr = currency === 'btc' ? btcAddress : xmrAddress;
    navigator.clipboard.writeText(addr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const address = currency === 'btc' ? btcAddress : xmrAddress;
  const qrData = currency === 'btc' ? `bitcoin:${btcAddress}` : `monero:${xmrAddress}`;

  return (
    <div style={{ position: 'relative' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        viewport={{ once: true }}
        style={{
          background: 'rgba(255, 255, 255, 0.75)',
          borderRadius: '1.25rem',
          padding: '2rem',
          maxWidth: '480px',
          margin: '4rem auto',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          textAlign: 'center',
          backdropFilter: 'blur(8px)',
          position: 'relative',
          zIndex: 10
        }}
      >
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
          Support Sawprice Hunter 
        </h2>
        <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          BTC and XMR donations are appreciated.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <button
            onClick={() => setCurrency('btc')}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.75rem',
              border: currency === 'btc' ? '2px solid black' : '1px solid #ccc',
              background: currency === 'btc' ? '#000' : '#f0f0f0',
              color: currency === 'btc' ? '#fff' : '#000',
              cursor: 'pointer',
            }}
          >
            Bitcoin
          </button>
          <button
            onClick={() => setCurrency('xmr')}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.75rem',
              border: currency === 'xmr' ? '2px solid black' : '1px solid #ccc',
              background: currency === 'xmr' ? '#000' : '#f0f0f0',
              color: currency === 'xmr' ? '#fff' : '#000',
              cursor: 'pointer',
            }}
          >
            Monero
          </button>
        </div>

        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrData}`}
          alt={`${currency.toUpperCase()} QR Code`}
          style={{ margin: '0 auto 1rem', borderRadius: '0.5rem' }}
        />

        <code style={{ fontSize: '0.8rem', wordBreak: 'break-all', display: 'block', marginBottom: '0.5rem' }}>
          {address}
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

      <motion.div
        initial={{ scale: 0, rotate: 0 }}
        animate={{ scale: [1.4, 1.5, 1.4], rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          bottom: '-20px',
          right: '-20px',
          width: '80px',
          height: '80px',
          background: 'linear-gradient(135deg, #3b82f6, #9333ea)',
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          opacity: 0.4,
          zIndex: 1,
          filter: 'blur(2px)',
        }}
      />
    </div>
  );
};

export default Donate;