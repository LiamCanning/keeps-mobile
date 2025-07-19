import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Home } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { benefits } from '@/constants/benefits';
import { userAssets } from '@/constants/assets';
import BenefitCard from '@/components/BenefitCard';

export default function BenefitsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(userAssets[0]?.id || null);
  
  const handleHomePress = () => {
    router.push('/(tabs)');
  };
  
  const filteredBenefits = selectedAssetId 
    ? benefits.filter(benefit => benefit.assetId === selectedAssetId)
    : [];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.homeButton} onPress={handleHomePress}>
            <Home size={20} color={Colors.text.white} />
          </TouchableOpacity>
          <View style={styles.headerTitles}>
            <Text style={styles.headerTitle}>Your Benefits</Text>
            <Text style={styles.headerSubtitle}>Exclusive perks for your investments</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.assetSelector}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.assetSelectorContent}>
          {userAssets.map((asset) => (
            <TouchableOpacity
              key={asset.id}
              style={[
                styles.assetButton,
                selectedAssetId === asset.id && styles.assetButtonActive,
              ]}
              onPress={() => setSelectedAssetId(asset.id)}
            >
              <Text
                style={[
                  styles.assetButtonText,
                  selectedAssetId === asset.id && styles.assetButtonTextActive,
                ]}
              >
                {asset.name}
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
        {filteredBenefits.length > 0 ? (
          filteredBenefits.map((benefit) => (
            <BenefitCard key={benefit.id} benefit={benefit} />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No benefits found for this asset</Text>
          </View>
        )}
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
  assetSelector: {
    paddingVertical: 16,
  },
  assetSelectorContent: {
    paddingHorizontal: 12,
  },
  assetButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  assetButtonActive: {
    backgroundColor: Colors.primary.orange,
  },
  assetButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text.white,
  },
  assetButtonTextActive: {
    color: Colors.text.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: Colors.text.white,
    opacity: 0.7,
  },
});