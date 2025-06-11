import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaDonate } from 'react-icons/fa';

function Donate() {
  const [copied, setCopied] = useState(false);
  const [currency, setCurrency] = useState('btc');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const btcAddress = 'bc1q2urpq80ttg7qmk5thheku4upjvsuwg6z8wjedm';
  const xmrAddress = '8AXgixS8eYa13vczPAnZyzDNuzXqr92x6bMcCWM25fv9g2EfFvt4NMvenJuQyqBvKHPzp5fcxVRz3MJGrDovAZB88YAzcWX';

  const handleCopy = () => {
    const addr = currency === 'btc' ? btcAddress : xmrAddress;
    navigator.clipboard.writeText(addr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const qrData = currency === 'btc'
    ? `bitcoin:${btcAddress}`
    : `monero:${xmrAddress}`;

  const address = currency === 'btc' ? btcAddress : xmrAddress;

  return (
    <>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999
          }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              background: 'rgba(255, 255, 255, 0.85)',
              borderRadius: '1.25rem',
              padding: '2rem',
              maxWidth: '480px',
              width: '90%',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              textAlign: 'center',
              backdropFilter: 'blur(8px)',
              position: 'relative'
            }}
          >
            <button
              onClick={() => setIsOpen(false)}
              style={{
                position: 'absolute',
                top: '0.5rem',
              right: '0.5rem',
              background: 'transparent',
              border: 'none',
              fontSize: '1.25rem',
              cursor: 'pointer'
            }}
            aria-label="Close"
          >
            &times;
          </button>
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
            {copied ? 'Address copied!' : 'Copy Address'}
          </button>
          </motion.div>
        </div>
      )}

      <motion.button
        whileHover={{ scale: 1.1 }}
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          background: '#fff',
          borderRadius: '50%',
          width: 50,
          height: 50,
          boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 999
        }}
        aria-label="Toggle Donate"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaDonate color="#f97316" />
      </motion.button>
    </>
  );
}

export default Donate;
