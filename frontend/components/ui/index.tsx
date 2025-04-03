import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  ImageBackground,
  ActivityIndicator,
  Animated,
  Dimensions,
  Text,
  Platform,
  TouchableOpacity,
} from 'react-native';
import Collapsible from '../components/Collapsible';
import SearchBar from '../components/SearchBar';
import ResultCard from '../components/ResultCard';

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // URL switching for mobile/web
  const BASE_URL =
    Platform.OS === 'web'
      ? 'http://localhost:5000'
      : 'http://10.0.0.92:5000'; // replace with actual IP

  // Header animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 1, duration: 1200, useNativeDriver: true }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.05, duration: 700, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
        ])
      ),
    ]).start();
  }, []);

  const searchChainsaws = async () => {
    if (!query) return;
    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const response = await fetch(`${BASE_URL}/api/prices?query=${query}`);
      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.error('❌ Fetch error:', err);
      setError('Failed to fetch listings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://i.imgur.com/49ecK3H.jpeg' }}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Animated.View style={[styles.header, { opacity: fadeAnim, transform: [{ scale: pulseAnim }] }]}>
          <Text style={styles.title}>Chainsaw Price Hunter 🪓</Text>
          <Text style={styles.subtitle}>FB, OfferUp & Mercari deals</Text>
        </Animated.View>

        <SearchBar query={query} setQuery={setQuery} onSearch={searchChainsaws} />

        {loading && <ActivityIndicator size="large" color="#f96c00" style={{ marginVertical: 20 }} />}

        {error && <Text style={styles.error}>{error}</Text>}

        <FlatList
          data={results}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => <ResultCard item={item} index={index} />}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={
            !loading && results.length === 0 ? (
              <Text style={styles.noResults}>🪵 No listings yet... try searching!</Text>
            ) : null
          }
        />

        <Text style={styles.footer}>⚙️ Built by Relentless Dev ⚙️</Text>
      </View>
    </ImageBackground>
  );
}

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: 'cover', justifyContent: 'center' },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
    padding: 20,
    justifyContent: 'flex-start',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: screenHeight * 0.07,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: '#f96c00',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
  },
  subtitle: {
    color: '#f96c00',
    fontSize: 14,
    marginTop: 5,
  },
  error: {
    textAlign: 'center',
    color: '#ff4d4d',
    marginVertical: 10,
    fontWeight: 'bold',
  },
  noResults: {
    textAlign: 'center',
    color: '#ccc',
    marginTop: 30,
    fontSize: 15,
  },
  footer: {
    textAlign: 'center',
    color: '#888',
    fontSize: 12,
    marginTop: 20,
  },
});
