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
