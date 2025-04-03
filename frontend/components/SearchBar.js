<<<<<<< HEAD
# --- SearchBar.js ---
searchbar_code = """
import styles from '../styles/Dashboard.module.scss';
import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchBar}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for chainsaws..."
        className={styles.searchInput}
      />
      <button type="submit" className={styles.searchButton}>Hunt 🔍</button>
    </form>
  );
}
"""
=======
import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Text, View } from 'react-native';

export default function SearchBar({ query, setQuery, onSearch }) {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.input}
        placeholder="Search chainsaw models..."
        placeholderTextColor="#ddd"
        value={query}
        onChangeText={setQuery}
      />
      <TouchableOpacity style={styles.button} onPress={onSearch}>
        <Text style={styles.buttonText}>Find Deals</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 20 
  },
  input: { 
    flex: 1, 
    borderWidth: 1, 
    borderColor: '#f96c00', 
    borderRadius: 5, 
    padding: 12, 
    color: '#fff' 
  },
  button: { 
    backgroundColor: '#f96c00', 
    padding: 12, 
    borderRadius: 5, 
    marginLeft: 10 
  },
  buttonText: { 
    color: '#fff', 
    fontWeight: 'bold' 
  },
});
>>>>>>> 0227a6536bc3d9e0fa6ccf9dc65e331aaa322d53
