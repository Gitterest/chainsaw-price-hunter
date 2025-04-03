<<<<<<< HEAD
# --- ResultCard.js ---
resultcard_code = """
import styles from '../styles/Dashboard.module.scss';

export default function ResultCard({ result }) {
  return (
    <a href={result.link} target="_blank" rel="noopener noreferrer" className={styles.card}>
      <h3>{result.title}</h3>
    </a>
  );
}
"""
=======
import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Animated, Image, Linking } from 'react-native';

export default function ResultCard({ item, index }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400 + index * 100,
      useNativeDriver: true
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>{item.price}</Text>
      <Text style={styles.source}>{item.source}</Text>
      <TouchableOpacity onPress={() => Linking.openURL(item.link)}>
        <Text style={styles.link}>View Deal 🔗</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: { 
    backgroundColor: '#1e1e1e', 
    borderRadius: 8, 
    padding: 15, 
    marginBottom: 20 
  },
  image: { 
    width: '100%', 
    height: 160, 
    borderRadius: 5, 
    marginBottom: 10 
  },
  title: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#fff' 
  },
  price: { 
    fontSize: 14, 
    color: '#ccc', 
    marginTop: 5 
  },
  source: {
    fontSize: 12,
    color: '#f96c00',
    marginTop: 5
  },
  link: { 
    fontSize: 14, 
    color: '#f96c00', 
    marginTop: 10, 
    fontWeight: 'bold' 
  },
});
>>>>>>> 0227a6536bc3d9e0fa6ccf9dc65e331aaa322d53
