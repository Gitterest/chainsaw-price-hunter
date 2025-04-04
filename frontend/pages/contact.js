import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaUser, FaPaperPlane, FaComments, FaPhoneAlt } from 'react-icons/fa';
import styles from '../styles/Home.module.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // 🔄 Hook to actual backend API if needed
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className={styles.page}>
      {/* Title */}
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-4xl font-bold flex items-center gap-2"
      >
        <FaComments /> Contact Us
      </motion.h1>

      {/* Description */}
      <p className="text-gray-300 max-w-md mb-6">
        Got a question? Want to collaborate? Just want to say you love chainsaws?
        Drop us a message below.
      </p>

      {/* Contact Form */}
      <motion.form
        onSubmit={handleSubmit}
        className={styles.contactForm}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.inputGroup}>
          <FaUser className={styles.inputIcon} />
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <FaEnvelope className={styles.inputIcon} />
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <FaPhoneAlt className={styles.inputIcon} />
          <textarea
            name="message"
            placeholder="What&apos;s on your mind?"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            required
          />
        </div>

        <motion.button
          type="submit"
          className={styles.submitButton}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaPaperPlane /> Send Message
        </motion.button>

        {submitted && (
          <motion.p
            className={styles.successMsg}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            ✅ Message sent! We shall get back to you soon.
          </motion.p>
        )}
      </motion.form>
    </div>
  );
};

export default Contact;
