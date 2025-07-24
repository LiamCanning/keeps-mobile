import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import AssetCarousel from '@/components/AssetCarousel';
import SectionTitle from '@/components/SectionTitle';
import ActionBanner from '@/components/ActionBanner';

import Colors from '@/constants/colors';
import { userAssets, comingSoonAssets } from '@/constants/assets';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'live' | 'coming-soon' | 'completed'>('live');
  const router = useRouter();

  const handleAssetPress = (assetId: string) => {
    router.push(`/asset/${assetId}`);
  };

  const handleSearchAssetSelect = (assetId: string) => {
    router.push(`/asset/${assetId}`);
  };

  const handleInvestPress = (assetId: string) => {
    // For coming soon assets, go to early access page
    const asset = [...userAssets, ...comingSoonAssets].find(a => a.id === assetId);
    if (asset?.type === 'coming_soon') {
      router.push(`/early-access/${assetId}`);
    } else {
      router.push(`/buy/${assetId}`);
    }
  };



  const handleTabChange = (tab: 'live' | 'coming-soon' | 'completed') => {
    setActiveTab(tab);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <Header username="Liam Canning" />
      <SearchBar 
        value={searchQuery} 
        onChangeText={setSearchQuery}
        onAssetSelect={handleSearchAssetSelect}
      />
      
      <ActionBanner activeTab={activeTab} onTabChange={handleTabChange} />
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <SectionTitle title="✅ Featured Deals" />
        <AssetCarousel 
          assets={userAssets}
          onAssetPress={handleAssetPress}
          showBackgroundImages={true}
          onInvestPress={handleInvestPress}
        />
        
        <SectionTitle title="Coming Soon" />
        <AssetCarousel 
          assets={comingSoonAssets}
          onAssetPress={handleAssetPress}
          showBackgroundImages={true}
          onInvestPress={handleInvestPress}
        />
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
    paddingBottom: 24,
  },
});