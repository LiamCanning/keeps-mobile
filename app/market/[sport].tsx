import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { Filter } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { marketListings, sportCategories } from '@/constants/market';
import MarketListingCard from '@/components/MarketListingCard';
import BackButton from '@/components/BackButton';

export default function SportMarketScreen() {
  const router = useRouter();
  const { sport } = useLocalSearchParams();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  const sportCategory = sportCategories.find(s => s.id === sport);
  const sportListings = marketListings.filter(listing => listing.sport === sport);
  
  const uniqueAssetIds = [...new Set(sportListings.map(listing => listing.assetId))];
  
  const filteredListings = activeFilter 
    ? sportListings.filter(listing => listing.assetId === activeFilter)
    : sportListings;

  const handleListingPress = (listingId: string) => {
    router.push(`/buy-secondary/${listingId}`);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: sportCategory?.name || 'Sport Market',
          headerStyle: { backgroundColor: Colors.primary.blue },
          headerTintColor: Colors.text.white,
          headerTitleStyle: { fontWeight: 'bold' },
          headerLeft: () => <BackButton />,
        }} 
      />
      
      <View style={styles.searchContainer}>
        <View style={styles.filterContainer}>
          <View style={styles.filterHeader}>
            <Filter size={16} color={Colors.text.white} />
            <Text style={styles.filterTitle}>Filter by Asset</Text>
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
              const asset = sportListings.find(listing => listing.assetId === assetId);
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
  searchContainer: {
    paddingTop: 16,
  },
  filterContainer: {
    marginBottom: 8,
  },
  filterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
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
});