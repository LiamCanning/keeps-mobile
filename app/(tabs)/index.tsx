import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Dimensions, Platform } from 'react-native';
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
  const { width } = Dimensions.get('window');
  const isDesktop = Platform.OS === 'web' && width > 768;

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
      <SearchBar 
        value={searchQuery} 
        onChangeText={setSearchQuery}
        onAssetSelect={handleSearchAssetSelect}
      />
      
      <ActionBanner activeTab={activeTab} onTabChange={handleTabChange} />
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, isDesktop && styles.desktopScrollContent]}
      >
        <View style={[styles.contentContainer, isDesktop && styles.desktopContentContainer]}>
          <SectionTitle title="✅ Featured Deals" />
          
          <View style={[styles.assetsGrid, isDesktop && styles.desktopAssetsGrid]}>
            {userAssets.map((asset) => (
              <View key={asset.id} style={[styles.assetWrapper, isDesktop && styles.desktopAssetWrapper]}>
                <AssetCard 
                  asset={asset} 
                  onPress={() => handleAssetPress(asset.id)}
                />
              </View>
            ))}
          </View>
          
          <SectionTitle title="Coming Soon" />
          
          <View style={[styles.assetsGrid, isDesktop && styles.desktopAssetsGrid]}>
            {comingSoonAssets.map((asset) => (
              <View key={asset.id} style={[styles.assetWrapper, isDesktop && styles.desktopAssetWrapper]}>
                <AssetCard 
                  asset={asset} 
                  onPress={() => handleAssetPress(asset.id)}
                />
              </View>
            ))}
          </View>
        </View>
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
    paddingBottom: 100,
  },
  desktopScrollContent: {
    paddingHorizontal: 0,
    alignItems: 'center',
    paddingBottom: 120,
  },
  contentContainer: {
    width: '100%',
  },
  desktopContentContainer: {
    maxWidth: 1200,
    width: '90%',
    paddingHorizontal: 32,
  },
  assetsGrid: {
    width: '100%',
  },
  desktopAssetsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 20,
  },
  assetWrapper: {
    width: '100%',
  },
  desktopAssetWrapper: {
    width: '48%',
    minWidth: 400,
  },
});