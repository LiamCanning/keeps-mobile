import React from 'react';
import { StyleSheet, View, ScrollView, Text, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';
import { benefits } from '@/constants/benefits';
import { userAssets, comingSoonAssets, completedAssets } from '@/constants/assets';
import BenefitCard from '@/components/BenefitCard';
import BackButton from '@/components/BackButton';

export default function AssetBenefitsScreen() {
  const { id, fromPortfolio, userTier } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  
  const asset = [...userAssets, ...comingSoonAssets, ...completedAssets].find(a => a.id === id);
  const assetBenefits = benefits.filter(benefit => benefit.assetId === id);
  const isFromPortfolio = fromPortfolio === 'true';
  const userTierString = typeof userTier === 'string' ? userTier.toLowerCase() : '';
  
  if (!asset) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Asset not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          headerShown: true,
          headerTitle: `${asset.name} Benefits`,
          headerStyle: { backgroundColor: Colors.primary.blue },
          headerTintColor: Colors.text.white,
          headerTitleStyle: { fontWeight: 'bold' },
          headerLeft: () => <BackButton />,
        }} 
      />
      <StatusBar style="light" />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerSection}>
          <View style={styles.assetHeader}>
            <Image source={{ uri: asset.logo }} style={styles.assetLogo} />
            <View style={styles.assetInfo}>
              <Text style={styles.assetName}>{asset.name}</Text>
              <Text style={styles.headerTitle}>Exclusive Benefits</Text>
            </View>
          </View>
          <Text style={styles.headerSubtitle}>
            {asset.type === 'debenture' 
              ? 'Benefits are tiered based on your debenture level'
              : 'Benefits increase with your investment amount'
            }
          </Text>
        </View>
        
        {assetBenefits.length > 0 ? (
          assetBenefits.map((benefit) => (
            <BenefitCard 
              key={benefit.id} 
              benefit={benefit} 
              highlightUserTier={isFromPortfolio && benefit.level === userTierString}
            />
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  headerSection: {
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
    marginBottom: 16,
  },
  assetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  assetLogo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginRight: 16,
  },
  assetInfo: {
    flex: 1,
  },
  assetName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primary.orange,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.text.light,
    lineHeight: 22,
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
  errorText: {
    color: Colors.text.white,
    fontSize: 18,
    textAlign: 'center',
    marginTop: 100,
  },
});