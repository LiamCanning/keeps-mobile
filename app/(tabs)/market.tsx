import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Filter, Search, Home } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { marketListings, sportCategories } from '@/constants/market';
import MarketListingCard from '@/components/MarketListingCard';

export default function MarketScreen() {
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const { filter } = useLocalSearchParams();

  useEffect(() => {
    if (filter && typeof filter === 'string') {
      setActiveFilter(filter);
    }
  }, [filter]);
  
  const handleSportPress = (sportId: string) => {
    router.push(`/market/${sportId}`);
  };

  const handleListingPress = (listingId: string) => {
    router.push(`/buy-secondary/${listingId}`);
  };

  const handleHomePress = () => {
    router.push('/(tabs)');
  };

  const filteredListings = searchQuery
    ? marketListings.filter(listing => 
        listing.assetName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.seller.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : marketListings;

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.homeButton} onPress={handleHomePress}>
            <Home size={20} color={Colors.text.white} />
          </TouchableOpacity>
          <View style={styles.headerTitles}>
            <Text style={styles.headerTitle}>Secondary Market</Text>
            <Text style={styles.headerSubtitle}>Buy and sell sports assets</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.searchContainer}>
        <Search size={20} color={Colors.text.light} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search assets or sellers..."
          placeholderTextColor={Colors.text.light}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      
      <View style={styles.filterContainer}>
        <View style={styles.filterHeader}>
          <View style={styles.filterLeft}>
            <Filter size={16} color={Colors.text.white} />
            <Text style={styles.filterTitle}>Filter by Asset</Text>
          </View>
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
          {sportCategories.sort((a, b) => a.name.localeCompare(b.name)).map((sport) => (
            <TouchableOpacity
              key={sport.id}
              style={styles.filterButton}
              onPress={() => handleSportPress(sport.id)}
            >
              <Text style={styles.filterButtonText}>
                {sport.name}
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
        <Text style={styles.sectionTitle}>All Available Assets</Text>
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
  filterLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text.white,
    marginLeft: 12,
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.white,
    marginBottom: 16,
    marginTop: 8,
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    color: Colors.text.white,
    fontSize: 16,
  },
});