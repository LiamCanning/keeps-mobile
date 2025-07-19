import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Filter } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { marketListings } from '@/constants/market';
import MarketListingCard from '@/components/MarketListingCard';

export default function MarketScreen() {
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const router = useRouter();
  const { filter } = useLocalSearchParams();

  useEffect(() => {
    if (filter && typeof filter === 'string') {
      setActiveFilter(filter);
    }
  }, [filter]);
  
  const uniqueAssetIds = [...new Set(marketListings.map(listing => listing.assetId))];
  
  const filteredListings = activeFilter 
    ? marketListings.filter(listing => listing.assetId === activeFilter)
    : marketListings;

  const handleListingPress = (listingId: string) => {
    router.push(`/buy-secondary/${listingId}`);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <Text style={styles.headerTitle}>Secondary Market</Text>
        <Text style={styles.headerSubtitle}>Buy and sell sports assets</Text>
      </View>
      
      <View style={styles.filterContainer}>
        <View style={styles.filterHeader}>
          <Filter size={16} color={Colors.text.white} />
          <Text style={styles.filterTitle}>Filter by sport</Text>
          <TouchableOpacity 
            style={styles.listAssetButton}
            onPress={() => router.push('/list-asset')}
          >
            <Text style={styles.listAssetButtonText}>List Asset</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterButtonsContainer}
        >
          <TouchableOpacity
            style={[
              styles.filterButton,
              activeFilter === null && styles.filterButtonActive,
            ]}
            onPress={() => setActiveFilter(null)}
          >
            <Text
              style={[
                styles.filterButtonText,
                activeFilter === null && styles.filterButtonTextActive,
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
          
          {uniqueAssetIds.map((assetId) => {
            const asset = marketListings.find(listing => listing.assetId === assetId);
            return (
              <TouchableOpacity
                key={assetId}
                style={[
                  styles.filterButton,
                  activeFilter === assetId && styles.filterButtonActive,
                ]}
                onPress={() => setActiveFilter(assetId)}
              >
                <Text
                  style={[
                    styles.filterButtonText,
                    activeFilter === assetId && styles.filterButtonTextActive,
                  ]}
                >
                  {asset?.assetName}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredListings.map((listing) => (
          <MarketListingCard 
            key={listing.id} 
            listing={listing} 
            onPress={() => handleListingPress(listing.id)}
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
  header: {
    paddingHorizontal: 16,
    paddingBottom: 8,
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
  filterContainer: {
    marginTop: 16,
    marginBottom: 8,
  },
  filterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
    justifyContent: 'space-between',
  },
  filterTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text.white,
    marginLeft: 8,
  },
  filterButtonsContainer: {
    paddingHorizontal: 12,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  filterButtonActive: {
    backgroundColor: Colors.primary.orange,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text.white,
  },
  filterButtonTextActive: {
    color: Colors.text.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  listAssetButton: {
    backgroundColor: Colors.primary.orange,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  listAssetButtonText: {
    color: Colors.text.white,
    fontSize: 14,
    fontWeight: '600',
  },
});