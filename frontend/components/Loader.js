import { motion } from 'framer-motion';
import styles from '../styles/Dashboard.module.scss';

const spinnerVariants = {
  animate: {
    rotate: 360,
    transition: {
      repeat: Infinity,
      duration: 1.2,
      ease: 'linear'
    }
  }
};

const dotsVariants = {
  animate: {
    opacity: [0.2, 1, 0.2],
    transition: {
      duration: 1.2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

export default function Loader() {
  return (
    <div className={styles.loaderContainer}>
      <motion.svg
        className={styles.spinner}
        width="64"
        height="64"
        viewBox="0 0 100 100"
        variants={spinnerVariants}
        animate="animate"
      >
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="#3b82f6"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />
      </motion.svg>
      <div className={styles.loaderText}>
        <span>Searching listings</span>
        <motion.span className={styles.dot} variants={dotsVariants} animate="animate">.</motion.span>
        <motion.span className={styles.dot} variants={dotsVariants} animate="animate" transition={{ delay: 0.2 }}>. </motion.span>
        <motion.span className={styles.dot} variants={dotsVariants} animate="animate" transition={{ delay: 0.4 }}>.</motion.span>
      </div>
    </div>
  );
}
