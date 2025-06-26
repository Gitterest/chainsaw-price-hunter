import { motion } from 'framer-motion';
import styles from '../styles/Dashboard.module.scss';

export default function Loader() {
  return (
    <motion.div
      className={styles.loaderContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className={styles.spinner}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        style={{
          width: 64,
          height: 64,
          border: '4px solid rgba(59, 130, 246, 0.1)',
          borderTop: '4px solid #3b82f6',
          borderRadius: '50%',
          marginBottom: '1rem'
        }}
      />
      <motion.div
        className={styles.loaderText}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Hunting for chainsaws
        <span className={styles.dot}>.</span>
        <span className={styles.dot}>.</span>
        <span className={styles.dot}>.</span>
      </motion.div>
    </motion.div>
  );
}
