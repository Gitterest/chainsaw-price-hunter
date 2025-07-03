import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBtc, FaMonero, FaDollarSign, FaPaypal } from 'react-icons/fa';
import Image from 'next/image';


function Donate() {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [platform, setPlatform] = useState('btc');

  const btcAddress = 'bc1q2urpq80ttg7qmk5thheku4upjvsuwg6z8wjedm';
  const xmrAddress = '8AXgixS8eYa13vczPAnZyzDNuzXqr92x6bMcCWM25fv9g2EfFvt4NMvenJuQyqBvKHPzp5fcxVRz3MJGrDovAZB88YAzcWX';

  const handleCopy = () => {
    let addr = '';
    if (platform === 'btc') addr = btcAddress;
    else if (platform === 'xmr') addr = xmrAddress;
    setCopied(true);
    navigator.clipboard.writeText(addr);
    setTimeout(() => setCopied(false), 2000);
  };

  // Platform data
  const platforms = [
    {
      key: 'btc',
      label: 'Bitcoin',
      icon: <FaBtc color="#f7931a" size={22} />,
      qr: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=bitcoin:${btcAddress}`,
      address: btcAddress,
      info: 'BTC Address',
      color: '#f7931a',
    },
    {
      key: 'xmr',
      label: 'Monero',
      icon: <FaMonero color="#ff6600" size={22} />,
      qr: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=monero:${xmrAddress}`,
      address: xmrAddress,
      info: 'XMR Address',
      color: '#ff6600',
    },
    {
      key: 'cashapp',
      label: 'Cash App',
      icon: <FaDollarSign color="#00d632" size={22} />,
      qr: '/IMG_0668.jpeg',
      address: '$bimmerduder',
      info: 'Cash App $Cashtag',
      color: '#00d632',
      link: 'https://cash.app/$bimmerduder',
    },
    {
      key: 'paypal',
      label: 'PayPal',
      icon: <FaPaypal color="#0070ba" size={22} />,
      qr: '/paypal-qr.jpeg',
      address: '',
      info: 'Scan to tip via PayPal',
      color: '#0070ba',
      link: '',
    },
  ];

  const selected = platforms.find((p) => p.key === platform);

  return (
    <>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.8)',
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
  transition={{ duration: 0.3 }}
  style={{
    background: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(14px)',
    WebkitBackdropFilter: 'blur(14px)',
    borderRadius: '1.25rem',
    padding: '1.5rem',
    maxWidth: '360px',
    width: '95%',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.45)',
    textAlign: 'center',
    position: 'relative',
    color: '#fff',
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
                color: '#fff',
                cursor: 'pointer',
              }}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="neon-fire-orange" style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem', letterSpacing: 1 }}>Support Sawprice Hunter</h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, margin: '0.5rem 0 1.2rem' }}>
              {platforms.map((p) => (
                <button
                  key={p.key}
                  onClick={() => setPlatform(p.key)}
                  style={{
                    background: platform === p.key ? p.color : '#222',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    padding: '0.4rem 0.7rem',
                    margin: 0,
                    fontWeight: 600,
                    fontSize: 13,
                    boxShadow: platform === p.key ? `0 0 8px ${p.color}` : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                    cursor: 'pointer',
                    transition: 'background 0.2s, box-shadow 0.2s',
                  }}
                  aria-label={p.label}
                >
                  {p.icon} {p.label}
                </button>
              ))}
            </div>
            <div style={{ margin: '0 auto', maxWidth: 180, background: '#181818', borderRadius: 12, padding: 12, boxShadow: `0 0 0 2px ${selected.color}33` }}>
              {selected.key === 'btc' || selected.key === 'xmr' ? (
                <>
                  <Image
                    src={selected.qr}
                    alt={`${selected.label} QR Code`}
                    width={120}
                    height={120}
                    style={{ margin: '0 auto', borderRadius: 8 }}
                  />
                  <code style={{ fontSize: '0.8rem', wordBreak: 'break-all', display: 'block', margin: '0.5rem 0', color: selected.color }}>
                    {selected.address}
                  </code>
                  <button
                    onClick={handleCopy}
                    style={{
                      padding: '0.4rem 1.2rem',
                      background: selected.color,
                      color: '#fff',
                      border: 'none',
                      borderRadius: '0.75rem',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      marginTop: 4,
                    }}
                  >
                    {copied ? 'Address copied!' : 'Copy Address'}
                  </button>
                </>
              ) : selected.key === 'cashapp' ? (
                <>
                  <a
                    href={selected.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'inline-block', marginBottom: 8 }}
                  >
                    <Image
                      src={selected.qr}
                      alt="Cash App QR for $bimmerduder"
                      width={120}
                      height={120}
                      style={{ borderRadius: 8, border: '1px solid #eee' }}
                    />
                  </a>
                  <div style={{ fontWeight: 600, color: selected.color, fontSize: 15 }}>
                    Cash App $Cashtag: <a href={selected.link} target="_blank" rel="noopener noreferrer" style={{ color: selected.color }}>$bimmerduder</a>
                  </div>
                </>
              ) : selected.key === 'paypal' ? (
                <>
                  <Image
                    src={selected.qr}
                    alt="PayPal Tip Jar QR Code"
                    width={120}
                    height={120}
                    style={{ borderRadius: 8, border: '1px solid #eee' }}
                    onError={e => { e.target.onerror = null; e.target.src = '/file.svg'; }}
                  />
                  <div style={{ marginTop: 8, color: selected.color, fontWeight: 'bold', fontSize: 15 }}>
                    Scan to tip via PayPal
                  </div>
                </>
              ) : null}
            </div>
          </motion.div>
        </div>
      )}

      {/* Glowing animated donate button */}
       {/* Glowing animated donate button */}
      <motion.button
        whileHover={{ scale: 1.15, boxShadow: '0 0 16px #f97316, 0 0 32px #fff' }}
        animate={{
          boxShadow: [
            '0 0 8px #f97316, 0 0 0px #fff',
            '0 0 16px #f97316, 0 0 8px #fff',
            '0 0 8px #f97316, 0 0 0px #fff',
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, repeatType: 'loop' }}
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          background: 'linear-gradient(135deg, #f97316 60%, #fff 100%)',
          borderRadius: '50%',
          width: 54,
          height: 54,
          boxShadow: '0 0 12px #f97316',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 999,
          border: 'none',
          outline: 'none',
          padding: 0,
        }}
        aria-label="Toggle Donate"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          src="/donateicon.jpeg"
          alt="Donate"
          style={{ width: '32px', height: '32px' }}
        />
      </motion.button>
    </>
  );
}

export default Donate;
