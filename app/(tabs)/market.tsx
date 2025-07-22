import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Search, Home, Heart, TrendingUp, LineChart } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { marketListings } from '@/constants/market';
import MarketListingCard from '@/components/MarketListingCard';

const performanceData = {
  '5min': { price: 1205, change: +5, percentage: +0.42 },
  '24h': { price: 1180, change: +25, percentage: +2.16 },
  '1w': { price: 1150, change: +55, percentage: +5.02 },
  '1m': { price: 1100, change: +105, percentage: +10.55 },
  '6m': { price: 1000, change: +205, percentage: +25.75 },
};

const timeframes = [
  { key: '5min', label: '5 min' },
  { key: '24h', label: '24h' },
  { key: '1w', label: '1 week' },
  { key: '1m', label: '1 month' },
  { key: '6m', label: '6 months' },
];

export default function MarketScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<'market' | 'wishlist' | 'performance'>('market');
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const { filter } = useLocalSearchParams();



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
      
      <View style={styles.tabContainer}>
        <View style={styles.tabHeader}>
          <View style={styles.tabButtons}>
            <TouchableOpacity 
              style={[styles.tabButton, activeTab === 'market' && styles.tabButtonActive]}
              onPress={() => setActiveTab('market')}
            >
              <Text style={[styles.tabButtonText, activeTab === 'market' && styles.tabButtonTextActive]}>
                Market
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tabButton, activeTab === 'wishlist' && styles.tabButtonActive]}
              onPress={() => setActiveTab('wishlist')}
            >
              <Heart size={16} color={activeTab === 'wishlist' ? Colors.text.white : Colors.text.light} />
              <Text style={[styles.tabButtonText, activeTab === 'wishlist' && styles.tabButtonTextActive]}>
                Wishlist
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tabButton, activeTab === 'performance' && styles.tabButtonActive]}
              onPress={() => setActiveTab('performance')}
            >
              <TrendingUp size={16} color={activeTab === 'performance' ? Colors.text.white : Colors.text.light} />
              <Text style={[styles.tabButtonText, activeTab === 'performance' && styles.tabButtonTextActive]}>
                Performance
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity 
            style={styles.listAssetButton}
            onPress={() => router.push('/list-asset')}
          >
            <Text style={styles.listAssetButtonText}>List Asset</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'market' && (
          <>
            <Text style={styles.sectionTitle}>All Available Assets</Text>
            {filteredListings.map((listing) => (
              <MarketListingCard 
                key={listing.id} 
                listing={listing} 
                onPress={() => handleListingPress(listing.id)}
              />
            ))}
          </>
        )}

        {activeTab === 'wishlist' && (
          <>
            <Text style={styles.sectionTitle}>Your Wishlist</Text>
            <View style={styles.emptyState}>
              <Heart size={48} color={Colors.text.light} />
              <Text style={styles.emptyStateTitle}>No items in wishlist</Text>
              <Text style={styles.emptyStateSubtitle}>Add assets to your wishlist to track them here</Text>
            </View>
          </>
        )}

        {activeTab === 'performance' && (
          <>
            <View style={styles.performanceHeader}>
              <View style={styles.assetInfo}>
                <Text style={styles.assetName}>McLaren Racing</Text>
                <Text style={styles.currentPrice}>£{performanceData[selectedTimeframe].price}</Text>
                <View style={styles.priceChange}>
                  <Text style={[styles.changeText, { color: performanceData[selectedTimeframe].change > 0 ? '#4CAF50' : '#F44336' }]}>
                    {performanceData[selectedTimeframe].change > 0 ? '+' : ''}£{performanceData[selectedTimeframe].change} ({performanceData[selectedTimeframe].percentage > 0 ? '+' : ''}{performanceData[selectedTimeframe].percentage}%)
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.timeframeContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {timeframes.map((timeframe) => (
                  <TouchableOpacity
                    key={timeframe.key}
                    style={[styles.timeframeButton, selectedTimeframe === timeframe.key && styles.timeframeButtonActive]}
                    onPress={() => setSelectedTimeframe(timeframe.key)}
                  >
                    <Text style={[styles.timeframeButtonText, selectedTimeframe === timeframe.key && styles.timeframeButtonTextActive]}>
                      {timeframe.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.chartContainer}>
              <LineChart size={200} color={Colors.primary.orange} />
              <Text style={styles.chartPlaceholder}>Performance Chart</Text>
              <Text style={styles.chartSubtext}>Historical price data for selected timeframe</Text>
            </View>

            <View style={styles.performanceStats}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Volume (24h)</Text>
                <Text style={styles.statValue}>£2.4M</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Market Cap</Text>
                <Text style={styles.statValue}>£156M</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>All-time High</Text>
                <Text style={styles.statValue}>£1,350</Text>
              </View>
              <View style={[styles.statItem, { borderBottomWidth: 0 }]}>
                <Text style={styles.statLabel}>All-time Low</Text>
                <Text style={styles.statValue}>£850</Text>
              </View>
            </View>
          </>
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
  tabContainer: {
    marginTop: 16,
    marginBottom: 8,
  },
  tabHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
    justifyContent: 'space-between',
  },
  tabButtons: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 25,
    padding: 4,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 2,
  },
  tabButtonActive: {
    backgroundColor: Colors.primary.orange,
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text.light,
    marginLeft: 4,
  },
  tabButtonTextActive: {
    color: Colors.text.white,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text.white,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    fontSize: 14,
    color: Colors.text.light,
    textAlign: 'center',
  },
  performanceHeader: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  assetInfo: {
    alignItems: 'center',
  },
  assetName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.white,
    marginBottom: 8,
  },
  currentPrice: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.text.white,
    marginBottom: 4,
  },
  priceChange: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontSize: 16,
    fontWeight: '600',
  },
  timeframeContainer: {
    marginBottom: 20,
  },
  timeframeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  timeframeButtonActive: {
    backgroundColor: Colors.primary.orange,
  },
  timeframeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text.light,
  },
  timeframeButtonTextActive: {
    color: Colors.text.white,
  },
  chartContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  chartPlaceholder: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text.white,
    marginTop: 16,
    marginBottom: 4,
  },
  chartSubtext: {
    fontSize: 14,
    color: Colors.text.light,
    textAlign: 'center',
  },
  performanceStats: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
  },
  statItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  statLabel: {
    fontSize: 16,
    color: Colors.text.light,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
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