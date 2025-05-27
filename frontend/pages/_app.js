import '@/styles/globals.css';
import '@/styles/Home.module.css';
import '@/styles/Dashboard.module.scss';
import '@/styles/Collapsible.module.css';
import '@/styles/app.css';
import dynamic from 'next/dynamic';

const DynamicCursorEffects = dynamic(() => import('@/components/CursorEffects'), {
  ssr: false,
});

function MyApp({ Component, pageProps }) {
  return (
    <div className="bg-chainsaw min-h-screen">
      <DynamicCursorEffects />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
