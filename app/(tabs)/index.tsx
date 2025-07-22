import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import AssetCard from '@/components/AssetCard';
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

  const handleInvestorsPress = (assetId: string) => {
    router.push(`/investors/${assetId}`);
  };

  const handleTabChange = (tab: 'live' | 'coming-soon' | 'completed') => {
    setActiveTab(tab);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <Header username="Liam Canning" />
      
      {/* Temporary Intro Preview Button */}
      <TouchableOpacity 
        style={styles.tempButton}
        onPress={() => router.push('/intro-preview')}
      >
        <Text style={styles.tempButtonText}>Intro</Text>
      </TouchableOpacity>
      
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
        
        {userAssets.map((asset) => (
          <AssetCard 
            key={asset.id} 
            asset={asset} 
            onPress={() => handleAssetPress(asset.id)}
          />
        ))}
        
        <SectionTitle title="Coming Soon" />
        
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
  tempButton: {
    position: 'absolute',
    top: 60,
    right: 16,
    backgroundColor: Colors.accent.purple,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    zIndex: 1000,
  },
  tempButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600' as const,
  },
});