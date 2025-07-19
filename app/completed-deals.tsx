import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { useRouter } from 'expo-router';

import SearchBar from '@/components/SearchBar';
import AssetCard from '@/components/AssetCard';
import SectionTitle from '@/components/SectionTitle';

import Colors from '@/constants/colors';
import { completedAssets } from '@/constants/assets';

export default function CompletedDealsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleAssetPress = (assetId: string) => {
    router.push(`/asset/${assetId}`);
  };

  const handleSearchAssetSelect = (assetId: string) => {
    router.push(`/asset/${assetId}`);
  };

  const handleSecondaryMarketPress = () => {
    router.push('/(tabs)/market');
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Completed Deals',
          headerStyle: { backgroundColor: Colors.primary.blue },
          headerTintColor: Colors.text.white,
          headerTitleStyle: { fontWeight: 'bold' },
        }} 
      />
      
      <SearchBar 
        value={searchQuery} 
        onChangeText={setSearchQuery}
        onAssetSelect={handleSearchAssetSelect}
      />
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <SectionTitle title="All Completed Deals ✅" />
        
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Funding is complete but you can still participate via the secondary market
          </Text>
          <TouchableOpacity style={styles.secondaryButton} onPress={handleSecondaryMarketPress}>
            <Text style={styles.secondaryButtonText}>View Secondary Market</Text>
          </TouchableOpacity>
        </View>
        
        {completedAssets.map((asset) => (
          <AssetCard 
            key={asset.id} 
            asset={asset} 
            onPress={() => handleAssetPress(asset.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.blue,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  infoBox: {
    backgroundColor: Colors.text.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoText: {
    fontSize: 14,
    color: Colors.text.dark,
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 20,
  },
  secondaryButton: {
    backgroundColor: Colors.primary.blue,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: Colors.text.white,
    fontSize: 16,
    fontWeight: '600',
  },
});