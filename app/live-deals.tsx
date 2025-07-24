import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, Image } from 'react-native';
import { Stack } from 'expo-router';
import { useRouter } from 'expo-router';

import SearchBar from '@/components/SearchBar';
import AssetCard from '@/components/AssetCard';
import ActionBanner from '@/components/ActionBanner';

import Colors from '@/constants/colors';
import { userAssets } from '@/constants/assets';

export default function LiveDealsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'live' | 'coming-soon' | 'completed'>('live');
  const router = useRouter();

  const handleAssetPress = (assetId: string) => {
    router.push(`/asset/${assetId}`);
  };

  const handleSearchAssetSelect = (assetId: string) => {
    router.push(`/asset/${assetId}`);
  };

  const handleTabChange = (tab: 'live' | 'coming-soon' | 'completed') => {
    setActiveTab(tab);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Live Deals',
          headerStyle: { backgroundColor: Colors.primary.blue },
          headerTintColor: Colors.text.white,
          headerTitleStyle: { fontWeight: 'bold' },
        }} 
      />
      
      <View style={styles.searchContainer}>
        <SearchBar 
          value={searchQuery} 
          onChangeText={setSearchQuery}
          onAssetSelect={handleSearchAssetSelect}
        />
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.titleContainer}>
          <Image 
            source={{ uri: 'https://r2-pub.rork.com/generated-images/8ed8a159-de50-4daf-99eb-e1c0ae8c7865.png' }}
            style={styles.tickIcon}
          />
          <Text style={styles.title}>All Live Deals</Text>
        </View>
        
        {userAssets.map((asset) => (
          <AssetCard 
            key={asset.id} 
            asset={asset} 
            onPress={() => handleAssetPress(asset.id)}
          />
        ))}
      </ScrollView>
      
      <ActionBanner activeTab={activeTab} onTabChange={handleTabChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.blue,
  },
  searchContainer: {
    paddingTop: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 8,
  },
  tickIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.white,
  },
});