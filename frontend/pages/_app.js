import '../styles/globals.css';
import '@fontsource/bebas-neue';
import dynamic from 'next/dynamic';

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
