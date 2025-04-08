// frontend/pages/_app.js
import '../styles/globals.css';
import dynamic from 'next/dynamic';

// ⬇️ Dynamically import cursor for client-side only
const DynamicCursorEffects = dynamic(() => import('../components/CursorEffects'), {
  ssr: false,
});

export default function MyApp({ Component, pageProps }) {
  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh' }}>
      <DynamicCursorEffects />
      <Component {...pageProps} />
    </div>
  );
}
