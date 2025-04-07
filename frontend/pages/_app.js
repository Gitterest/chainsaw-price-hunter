import dynamic from 'next/dynamic';
import '../styles/globals.css';

const DynamicCursorEffects = dynamic(() => import('../components/CursorEffects'), {
  ssr: false,
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* <DynamicCursorEffects /> */}
     </>
  );
}

export default MyApp;