import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Home, ChevronRight, Gift } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { benefits } from '@/constants/benefits';
import { Asset, userAssets, comingSoonAssets, completedAssets } from '@/constants/assets';
import BenefitCard from '@/components/BenefitCard';

export default function BenefitsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<'live' | 'completed' | 'coming-soon'>('live');
  
  const handleHomePress = () => {
    router.push('/(tabs)');
  };

  const handleAssetPress = (assetId: string) => {
    router.push(`/benefits/${assetId}`);
  };
  
  // Combine all assets
  const allAssets = [...userAssets, ...comingSoonAssets, ...completedAssets];
  
  const getAssetsByStatus = (status: string): Asset[] => {
    if (status === 'live') {
      return userAssets;
    } else if (status === 'completed') {
      return completedAssets;
    } else if (status === 'coming-soon') {
      return comingSoonAssets;
    }
    return [];
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.homeButton} onPress={handleHomePress}>
            <Home size={20} color={Colors.text.white} />
          </TouchableOpacity>
          <View style={styles.headerTitles}>
            <Text style={styles.headerTitle}>All Benefits</Text>
            <Text style={styles.headerSubtitle}>Exclusive perks across all assets</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.tabSelector}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabSelectorContent}>
          {[
            { key: 'live', label: 'Live Assets' },
            { key: 'coming-soon', label: 'Coming Soon Assets' },
            { key: 'completed', label: 'Completed Assets' }
          ].map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[
                styles.tabButton,
                selectedTab === tab.key && [
                  styles.tabButtonActive,
                  {
                    backgroundColor: 
                      tab.key === 'live' ? Colors.accent.green :
                      tab.key === 'completed' ? Colors.accent.blue :
                      Colors.primary.orange
                  }
                ],
              ]}
              onPress={() => setSelectedTab(tab.key as any)}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  selectedTab === tab.key && styles.tabButtonTextActive,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {getAssetsByStatus(selectedTab).map((asset: Asset) => (
          <TouchableOpacity
            key={asset.id}
            style={styles.assetCard}
            onPress={() => handleAssetPress(asset.id)}
          >
            <View style={styles.assetCardContent}>
              <View style={styles.assetLogoContainer}>
                <Image source={{ uri: asset.logo }} style={styles.assetLogo} />
              </View>
              <View style={styles.assetInfo}>
                <View style={styles.assetHeader}>
                  <Text style={styles.assetName}>{asset.name}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: 
                    selectedTab === 'live' ? Colors.accent.green :
                    selectedTab === 'completed' ? Colors.accent.blue :
                    Colors.accent.orange
                  }]}>
                    <Text style={styles.statusText}>
                      {selectedTab === 'live' ? 'Live' :
                       selectedTab === 'completed' ? 'Completed' :
                       'Coming Soon'}
                    </Text>
                  </View>
                </View>
                <Text style={styles.assetDescription}>
                  {asset.description || 'Exclusive benefits and perks available'}
                </Text>
                <View style={styles.benefitsRow}>
                  <Gift size={16} color={Colors.accent.purple} />
                  <Text style={[styles.benefitsPreview, { color: Colors.accent.purple }]}>
                    Tap exclusive benefits
                  </Text>
                  <ChevronRight size={16} color={Colors.accent.purple} />
                </View>
              </View>
            </View>
          </TouchableOpacity>
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
  header: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  homeButton: {
    padding: 8,
    marginRight: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerTitles: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.white,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.text.white,
    opacity: 0.8,
  },
  tabSelector: {
    paddingVertical: 16,
  },
  tabSelectorContent: {
    paddingHorizontal: 12,
  },
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  tabButtonActive: {
    // Dynamic background color set inline
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text.white,
  },
  tabButtonTextActive: {
    color: Colors.text.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  assetCard: {
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 165, 0, 0.15)',
  },
  assetCardContent: {
    flexDirection: 'row',
    padding: 16,
  },
  assetLogoContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 165, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 165, 0, 0.2)',
  },
  assetLogo: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
  },
  assetInfo: {
    flex: 1,
  },
  assetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  assetName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.dark,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: Colors.text.white,
  },
  assetDescription: {
    fontSize: 14,
    color: Colors.text.light,
    lineHeight: 20,
    marginBottom: 12,
  },
  benefitsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  benefitsPreview: {
    fontSize: 14,
    color: Colors.primary.orange,
    fontWeight: '600',
    flex: 1,
  },
});