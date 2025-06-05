import { motion } from 'framer-motion';
import styles from '../styles/Dashboard.module.scss';
import ResultCard from './ResultCard';

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

export default function ResultList({ results }) {
  if (!results || results.length === 0) {
    return (
      <div className={styles.noResultsWrap}>
        <p className={styles.noResults}>No chainsaws found. Try another search.</p>
      </div>
    );
  }

  return (
    <motion.div
      className={styles.resultsGrid}
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {results.map((item, index) => (
        <motion.div key={index} variants={itemVariants}>
          <ResultCard item={item} />
        </motion.div>
      ))}
    </motion.div>
  );
}
