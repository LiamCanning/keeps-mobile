import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Search, Home, Heart, TrendingUp, LineChart, BarChart3, Users, Filter } from 'lucide-react-native';
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
    name: 'Cardiff City',
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
  const [activeTab, setActiveTab] = useState<'market' | 'watchlist' | 'analysis' | 'discover'>('market');
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
        <Search size={20} color="#CCCCCC" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search assets or sellers..."
          placeholderTextColor="#CCCCCC"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      
      <View style={styles.tabContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabScrollContainer}
        >
          <TouchableOpacity 
            style={[styles.mainTabButton, activeTab === 'market' && styles.mainTabButtonActive]}
            onPress={() => setActiveTab('market')}
          >
            <Text style={[styles.mainTabButtonText, activeTab === 'market' && styles.mainTabButtonTextActive]}>
              Market
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.mainTabButton, activeTab === 'watchlist' && styles.mainTabButtonActive]}
            onPress={() => setActiveTab('watchlist')}
          >
            <Heart size={16} color={activeTab === 'watchlist' ? Colors.text.white : '#CCCCCC'} />
            <Text style={[styles.mainTabButtonText, activeTab === 'watchlist' && styles.mainTabButtonTextActive]}>
              Watchlist
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.mainTabButton, activeTab === 'analysis' && styles.mainTabButtonActive]}
            onPress={() => setActiveTab('analysis')}
          >
            <BarChart3 size={16} color={activeTab === 'analysis' ? Colors.text.white : '#CCCCCC'} />
            <Text style={[styles.mainTabButtonText, activeTab === 'analysis' && styles.mainTabButtonTextActive]}>
              Analysis
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.mainTabButton, activeTab === 'discover' && styles.mainTabButtonActive]}
            onPress={() => setActiveTab('discover')}
          >
            <Users size={16} color={activeTab === 'discover' ? Colors.text.white : '#CCCCCC'} />
            <Text style={[styles.mainTabButtonText, activeTab === 'discover' && styles.mainTabButtonTextActive]}>
              Discover
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.listAssetButton}
            onPress={() => router.push('/list-asset')}
          >
            <Text style={styles.listAssetButtonText}>List Asset</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'market' && (
          <>
            <View style={styles.filterContainer}>
              <TouchableOpacity style={styles.filterButton}>
                <Filter size={16} color="#CCCCCC" />
                <Text style={styles.filterButtonText}>Filter by Asset</Text>
              </TouchableOpacity>
            </View>
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
                <Text style={styles.currentPrice}>£{performanceData[selectedTimeframe as keyof typeof performanceData].price}</Text>
                <View style={styles.priceChange}>
                  <Text style={[styles.changeText, { color: performanceData[selectedTimeframe as keyof typeof performanceData].change > 0 ? '#4CAF50' : '#F44336' }]}>
                    {performanceData[selectedTimeframe as keyof typeof performanceData].change > 0 ? '+' : ''}£{performanceData[selectedTimeframe as keyof typeof performanceData].change} ({performanceData[selectedTimeframe as keyof typeof performanceData].percentage > 0 ? '+' : ''}{performanceData[selectedTimeframe as keyof typeof performanceData].percentage}%)
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

        {activeTab === 'discover' && (
          <>
            <Text style={styles.sectionTitle}>Top Investors</Text>
            <Text style={styles.sectionSubtitle}>Follow successful investors and copy their trades</Text>
            
            {[
              {
                id: '1',
                name: 'Sarah Mitchell',
                username: '@sarahinvests',
                followers: '12.4K',
                returns: '+34.2%',
                period: '6 months',
                recentInvestments: ['McLaren Racing', 'Liverpool FC'],
                avatar: '👩‍💼'
              },
              {
                id: '2', 
                name: 'James Rodriguez',
                username: '@jamesports',
                followers: '8.7K',
                returns: '+28.9%',
                period: '6 months',
                recentInvestments: ['Cardiff City', 'Arsenal FC'],
                avatar: '👨‍💼'
              },
              {
                id: '3',
                name: 'Emma Thompson',
                username: '@emmainvests',
                followers: '15.2K',
                returns: '+41.7%',
                period: '6 months',
                recentInvestments: ['Manchester City', 'Chelsea FC'],
                avatar: '👩‍🎓'
              }
            ].map((investor) => (
              <View key={investor.id} style={styles.investorCard}>
                <View style={styles.investorHeader}>
                  <View style={styles.investorInfo}>
                    <Text style={styles.investorAvatar}>{investor.avatar}</Text>
                    <View style={styles.investorDetails}>
                      <Text style={styles.investorName}>{investor.name}</Text>
                      <Text style={styles.investorUsername}>{investor.username}</Text>
                      <Text style={styles.investorFollowers}>{investor.followers} followers</Text>
                    </View>
                  </View>
                  <View style={styles.investorStats}>
                    <Text style={styles.investorReturns}>{investor.returns}</Text>
                    <Text style={styles.investorPeriod}>{investor.period}</Text>
                  </View>
                </View>
                
                <View style={styles.investorInvestments}>
                  <Text style={styles.investorInvestmentsTitle}>Recent Investments:</Text>
                  <View style={styles.investorInvestmentsList}>
                    {investor.recentInvestments.map((investment, index) => (
                      <View key={index} style={styles.investmentTag}>
                        <Text style={styles.investmentTagText}>{investment}</Text>
                      </View>
                    ))}
                  </View>
                </View>
                
                <View style={styles.investorActions}>
                  <TouchableOpacity style={styles.followButton}>
                    <Text style={styles.followButtonText}>Follow</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.investWithButton}>
                    <Text style={styles.investWithButtonText}>Invest with {investor.name.split(' ')[0]}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
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
  tabScrollContainer: {
    paddingHorizontal: 16,
    alignItems: 'center',
    gap: 12,
  },
  mainTabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    minWidth: 80,
    justifyContent: 'center',
  },
  mainTabButtonActive: {
    backgroundColor: Colors.primary.orange,
  },
  mainTabButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text.white,
    marginLeft: 4,
  },
  mainTabButtonTextActive: {
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
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    minWidth: 100,
    alignItems: 'center',
    justifyContent: 'center',
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
  filterContainer: {
    marginBottom: 16,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  filterButtonText: {
    color: '#CCCCCC',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#CCCCCC',
    marginBottom: 20,
    marginTop: -8,
  },
  investorCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  investorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  investorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  investorAvatar: {
    fontSize: 32,
    marginRight: 12,
  },
  investorDetails: {
    flex: 1,
  },
  investorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.white,
    marginBottom: 2,
  },
  investorUsername: {
    fontSize: 14,
    color: Colors.text.light,
    marginBottom: 2,
  },
  investorFollowers: {
    fontSize: 12,
    color: Colors.text.light,
  },
  investorStats: {
    alignItems: 'flex-end',
  },
  investorReturns: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 2,
  },
  investorPeriod: {
    fontSize: 12,
    color: Colors.text.light,
  },
  investorInvestments: {
    marginBottom: 16,
  },
  investorInvestmentsTitle: {
    fontSize: 14,
    color: Colors.text.light,
    marginBottom: 8,
  },
  investorInvestmentsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  investmentTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  investmentTagText: {
    fontSize: 12,
    color: Colors.text.white,
    fontWeight: '500',
  },
  investorActions: {
    flexDirection: 'row',
    gap: 12,
  },
  followButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  followButtonText: {
    color: Colors.text.white,
    fontSize: 14,
    fontWeight: '600',
  },
  investWithButton: {
    flex: 1,
    backgroundColor: Colors.primary.orange,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  investWithButtonText: {
    color: Colors.text.white,
    fontSize: 14,
    fontWeight: '600',
  },
});