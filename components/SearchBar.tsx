import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity, ScrollView, Dimensions, Platform } from 'react-native';
import { Search } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { userAssets, comingSoonAssets } from '@/constants/assets';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onAssetSelect?: (assetId: string) => void;
}

export default function SearchBar({ value, onChangeText, placeholder = 'Search Entities', onAssetSelect }: SearchBarProps) {
  const [showResults, setShowResults] = useState(false);
  const { width } = Dimensions.get('window');
  const isDesktop = Platform.OS === 'web' && width > 768;
  
  const allAssets = [...userAssets, ...comingSoonAssets];
  const filteredAssets = value.length > 0 
    ? allAssets.filter(asset => 
        asset.name.toLowerCase().includes(value.toLowerCase())
      )
    : [];

  const handleTextChange = (text: string) => {
    onChangeText(text);
    setShowResults(text.length > 0);
  };

  const handleAssetPress = (assetId: string) => {
    setShowResults(false);
    onChangeText('');
    onAssetSelect?.(assetId);
  };

  return (
    <View style={[styles.container, isDesktop && styles.desktopContainer]}>
      <View style={[styles.inputContainer, isDesktop && styles.desktopInputContainer]}>
        <Search size={20} color={Colors.text.light} style={styles.icon} />
        <TextInput
          style={[styles.input, isDesktop && styles.desktopInput]}
          value={value}
          onChangeText={handleTextChange}
          placeholder={placeholder}
          placeholderTextColor={Colors.text.light}
          onFocus={() => setShowResults(value.length > 0)}
        />
      </View>
      
      {showResults && filteredAssets.length > 0 && (
        <View style={styles.resultsContainer}>
          <ScrollView style={styles.resultsList} keyboardShouldPersistTaps="handled">
            {filteredAssets.map((asset) => (
              <TouchableOpacity
                key={asset.id}
                style={styles.resultItem}
                onPress={() => handleAssetPress(asset.id)}
              >
                <Text style={styles.resultText}>{asset.name}</Text>
                <Text style={styles.resultType}>
                  {asset.type === 'coming_soon' ? 'Coming Soon' : 'Live Now'}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 16,
    position: 'relative',
    zIndex: 1000,
  },
  desktopContainer: {
    marginHorizontal: 32,
    marginBottom: 24,
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  desktopInputContainer: {
    height: 56,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: '100%',
    color: Colors.text.white,
    fontSize: 16,
  },
  desktopInput: {
    fontSize: 18,
  },
  resultsContainer: {
    position: 'absolute',
    top: 52,
    left: 0,
    right: 0,
    backgroundColor: Colors.background.card,
    borderRadius: 12,
    maxHeight: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  resultsList: {
    maxHeight: 200,
  },
  resultItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  resultText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.dark,
  },
  resultType: {
    fontSize: 12,
    color: Colors.text.light,
    marginTop: 2,
  },
});