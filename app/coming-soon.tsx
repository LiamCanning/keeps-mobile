import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { useRouter } from 'expo-router';

import SearchBar from '@/components/SearchBar';
import AssetCard from '@/components/AssetCard';
import SectionTitle from '@/components/SectionTitle';

import Colors from '@/constants/colors';
import { comingSoonAssets } from '@/constants/assets';

export default function ComingSoonScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleAssetPress = (assetId: string) => {
    router.push(`/asset/${assetId}`);
  };

  const handleSearchAssetSelect = (assetId: string) => {
    router.push(`/asset/${assetId}`);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Coming Soon',
          headerStyle: { backgroundColor: Colors.primary.blue },
          headerTintColor: Colors.primary.white,
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
        <SectionTitle title="All Coming Soon Deals ⏰" />
        
        {comingSoonAssets.map((asset) => (
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
});