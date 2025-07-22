import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Search, Home, Heart, TrendingUp, LineChart, BarChart3 } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { marketListings } from '@/constants/market';
import MarketListingCard from '@/components/MarketListingCard';

const performanceData = {
  '5min': { price: 1205, change: +5, percentage: +0.42 },
  '24h': { price: 1180, change: +25, percentage: +2.16 },
  '1w': { price: 1150, change: +55, percentage: +5.02 },
  '1m': { price: 1100, change: +105, percentage: +10.55 },
  '6m': { price: 1000, change: +205, percentage: +25.75 },
} as const;

const watchlistAssets = [
  {
    id: '1',
    name: 'McLaren Racing',
    price: 1205,
    change: +25,
    percentage: +2.16,
    volume: '£2.4M',
    marketCap: '£156M'
  },
  {
    id: '2', 
    name: 'Liverpool FC',
    price: 890,
    change: -12,
    percentage: -1.33,
    volume: '£1.8M',
    marketCap: '£234M'
  },
  {
    id: '3',
    name: 'Manchester United',
    price: 1450,
    change: +45,
    percentage: +3.21,
    volume: '£3.2M',
    marketCap: '£298M'
  }
];

const analysisMetrics = {
  mclaren: {
    peRatio: 18.5,
    revenueGrowth: 12.3,
    profitMargin: 8.7,
    debtToEquity: 0.45,
    returnOnEquity: 15.2,
    currentRatio: 2.1,
    quickRatio: 1.8,
    grossMargin: 24.5,
    operatingMargin: 11.2,
    netMargin: 8.7,
    assetTurnover: 1.3,
    inventoryTurnover: 6.2
  }
};

const timeframes = [
  { key: '5min', label: '5 min' },
  { key: '24h', label: '24h' },
  { key: '1w', label: '1 week' },
  { key: '1m', label: '1 month' },
  { key: '6m', label: '6 months' },
] as const;

type TimeframeKey = keyof typeof performanceData;

export default function MarketScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<'market' | 'watchlist' | 'analysis'>('market');
  const [selectedTimeframe, setSelectedTimeframe] = useState<TimeframeKey>('24h');
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
              style={[styles.tabButton, activeTab === 'watchlist' && styles.tabButtonActive]}
              onPress={() => setActiveTab('watchlist')}
            >
              <Heart size={16} color={activeTab === 'watchlist' ? Colors.text.white : Colors.text.light} />
              <Text style={[styles.tabButtonText, activeTab === 'watchlist' && styles.tabButtonTextActive]}>
                Watchlist
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tabButton, activeTab === 'analysis' && styles.tabButtonActive]}
              onPress={() => setActiveTab('analysis')}
            >
              <BarChart3 size={16} color={activeTab === 'analysis' ? Colors.text.white : Colors.text.light} />
              <Text style={[styles.tabButtonText, activeTab === 'analysis' && styles.tabButtonTextActive]}>
                Analysis
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

        {activeTab === 'watchlist' && (
          <>
            <Text style={styles.sectionTitle}>Your Watchlist</Text>
            {watchlistAssets.map((asset) => (
              <View key={asset.id} style={styles.watchlistCard}>
                <View style={styles.watchlistHeader}>
                  <Text style={styles.watchlistAssetName}>{asset.name}</Text>
                  <TouchableOpacity>
                    <Heart size={20} color={Colors.primary.orange} fill={Colors.primary.orange} />
                  </TouchableOpacity>
                </View>
                <View style={styles.watchlistData}>
                  <View style={styles.watchlistPrice}>
                    <Text style={styles.watchlistPriceText}>£{asset.price}</Text>
                    <Text style={[styles.watchlistChange, { color: asset.change > 0 ? '#4CAF50' : '#F44336' }]}>
                      {asset.change > 0 ? '+' : ''}£{asset.change} ({asset.percentage > 0 ? '+' : ''}{asset.percentage}%)
                    </Text>
                  </View>
                  <View style={styles.watchlistStats}>
                    <View style={styles.watchlistStat}>
                      <Text style={styles.watchlistStatLabel}>Volume</Text>
                      <Text style={styles.watchlistStatValue}>{asset.volume}</Text>
                    </View>
                    <View style={styles.watchlistStat}>
                      <Text style={styles.watchlistStatLabel}>Market Cap</Text>
                      <Text style={styles.watchlistStatValue}>{asset.marketCap}</Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </>
        )}

        {activeTab === 'analysis' && (
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
              <Text style={styles.metricsTitle}>Key Financial Metrics</Text>
              <View style={styles.metricsGrid}>
                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>P/E Ratio</Text>
                  <Text style={styles.metricValue}>{analysisMetrics.mclaren.peRatio}</Text>
                </View>
                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>Revenue Growth</Text>
                  <Text style={styles.metricValue}>{analysisMetrics.mclaren.revenueGrowth}%</Text>
                </View>
                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>Profit Margin</Text>
                  <Text style={styles.metricValue}>{analysisMetrics.mclaren.profitMargin}%</Text>
                </View>
                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>Debt/Equity</Text>
                  <Text style={styles.metricValue}>{analysisMetrics.mclaren.debtToEquity}</Text>
                </View>
                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>ROE</Text>
                  <Text style={styles.metricValue}>{analysisMetrics.mclaren.returnOnEquity}%</Text>
                </View>
                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>Current Ratio</Text>
                  <Text style={styles.metricValue}>{analysisMetrics.mclaren.currentRatio}</Text>
                </View>
              </View>
            </View>

            <View style={styles.performanceStats}>
              <Text style={styles.metricsTitle}>Operational Metrics</Text>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Gross Margin</Text>
                <Text style={styles.statValue}>{analysisMetrics.mclaren.grossMargin}%</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Operating Margin</Text>
                <Text style={styles.statValue}>{analysisMetrics.mclaren.operatingMargin}%</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Asset Turnover</Text>
                <Text style={styles.statValue}>{analysisMetrics.mclaren.assetTurnover}x</Text>
              </View>
              <View style={[styles.statItem, { borderBottomWidth: 0 }]}>
                <Text style={styles.statLabel}>Inventory Turnover</Text>
                <Text style={styles.statValue}>{analysisMetrics.mclaren.inventoryTurnover}x</Text>
              </View>
            </View>

            <View style={styles.performanceStats}>
              <Text style={styles.metricsTitle}>Market Data</Text>
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
  watchlistCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  watchlistHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  watchlistAssetName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.white,
  },
  watchlistData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  watchlistPrice: {
    flex: 1,
  },
  watchlistPriceText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.white,
    marginBottom: 4,
  },
  watchlistChange: {
    fontSize: 14,
    fontWeight: '600',
  },
  watchlistStats: {
    alignItems: 'flex-end',
  },
  watchlistStat: {
    alignItems: 'flex-end',
    marginBottom: 4,
  },
  watchlistStatLabel: {
    fontSize: 12,
    color: Colors.text.light,
  },
  watchlistStatValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text.white,
  },
  metricsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.white,
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricItem: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 12,
    color: Colors.text.light,
    marginBottom: 4,
    textAlign: 'center',
  },
  metricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.white,
  },
});