import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, TextInput, Image, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Search, Star, TrendingUp, TrendingDown, Eye, Plus, Minus, BarChart3, Activity, Bell } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { marketListings, sportCategories } from '@/constants/market';

interface TradingAsset {
  id: string;
  name: string;
  symbol: string;
  logo: string;
  currentPrice: number;
  change24h: number;
  changePercent: number;
  volume24h: number;
  marketCap: number;
  isWatched: boolean;
  sport: string;
}

const { width } = Dimensions.get('window');

export default function MarketScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<'watchlist' | 'discover' | 'portfolio'>('watchlist');
  const [searchQuery, setSearchQuery] = useState('');
  const [watchedAssets, setWatchedAssets] = useState<string[]>(['liverpool', 'mclaren', 'rydercup']);
  const router = useRouter();

  // Convert market listings to trading assets with mock price data
  const tradingAssets: TradingAsset[] = [
    {
      id: 'liverpool',
      name: 'Liverpool FC',
      symbol: 'LFC',
      logo: 'https://r2-pub.rork.com/attachments/4y28f2dzw4kzvdoid8e8b',
      currentPrice: 542.50,
      change24h: 12.50,
      changePercent: 2.36,
      volume24h: 1250000,
      marketCap: 2750000000,
      isWatched: watchedAssets.includes('liverpool'),
      sport: 'Football'
    },
    {
      id: 'mclaren',
      name: 'McLaren Racing',
      symbol: 'MCL',
      logo: 'https://r2-pub.rork.com/attachments/40293v65wbvdp8siu5o10',
      currentPrice: 1185.75,
      change24h: -15.25,
      changePercent: -1.27,
      volume24h: 890000,
      marketCap: 1850000000,
      isWatched: watchedAssets.includes('mclaren'),
      sport: 'Formula One'
    },
    {
      id: 'rydercup',
      name: 'Ryder Cup',
      symbol: 'RYD',
      logo: 'https://r2-pub.rork.com/attachments/t18y87ryxfb9d44snw5co',
      currentPrice: 5892.25,
      change24h: 67.25,
      changePercent: 1.15,
      volume24h: 450000,
      marketCap: 750000000,
      isWatched: watchedAssets.includes('rydercup'),
      sport: 'Golf'
    },
    {
      id: 'exeter-rugby',
      name: 'Exeter Chiefs',
      symbol: 'EXE',
      logo: 'https://r2-pub.rork.com/attachments/vgynqzajb5sdgj062fehn',
      currentPrice: 598.50,
      change24h: 18.50,
      changePercent: 3.19,
      volume24h: 320000,
      marketCap: 450000000,
      isWatched: watchedAssets.includes('exeter-rugby'),
      sport: 'Rugby Union'
    },
    {
      id: 'british-cycling',
      name: 'British Cycling',
      symbol: 'BCY',
      logo: 'https://r2-pub.rork.com/attachments/k8vc0htdz7zjsyloqf0il',
      currentPrice: 1176.80,
      change24h: -23.20,
      changePercent: -1.93,
      volume24h: 280000,
      marketCap: 680000000,
      isWatched: watchedAssets.includes('british-cycling'),
      sport: 'Cycling'
    },
    {
      id: 'ultimate-frisbee',
      name: 'Ultimate Frisbee Association',
      symbol: 'UFA',
      logo: 'https://r2-pub.rork.com/attachments/cvee64u70ztlq0267gjhb',
      currentPrice: 285.40,
      change24h: 10.40,
      changePercent: 3.78,
      volume24h: 150000,
      marketCap: 95000000,
      isWatched: watchedAssets.includes('ultimate-frisbee'),
      sport: 'Frisbee'
    }
  ];

  const toggleWatchlist = (assetId: string) => {
    setWatchedAssets(prev => 
      prev.includes(assetId) 
        ? prev.filter(id => id !== assetId)
        : [...prev, assetId]
    );
  };

  const handleAssetPress = (assetId: string) => {
    router.push(`/buy-secondary/${assetId}`);
  };

  const filteredAssets = searchQuery
    ? tradingAssets.filter(asset => 
        asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.sport.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : tradingAssets;

  const displayAssets = activeTab === 'watchlist' 
    ? filteredAssets.filter(asset => asset.isWatched)
    : filteredAssets;

  const renderAssetRow = (asset: TradingAsset) => (
    <TouchableOpacity 
      key={asset.id} 
      style={styles.assetRow}
      onPress={() => handleAssetPress(asset.id)}
    >
      <View style={styles.assetLeft}>
        <TouchableOpacity 
          style={styles.watchButton}
          onPress={() => toggleWatchlist(asset.id)}
        >
          <Star 
            size={16} 
            color={asset.isWatched ? Colors.primary.orange : Colors.text.light}
            fill={asset.isWatched ? Colors.primary.orange : 'transparent'}
          />
        </TouchableOpacity>
        <Image source={{ uri: asset.logo }} style={styles.assetLogo} />
        <View style={styles.assetInfo}>
          <Text style={styles.assetName}>{asset.name}</Text>
          <Text style={styles.assetSymbol}>{asset.symbol} • {asset.sport}</Text>
        </View>
      </View>
      
      <View style={styles.assetRight}>
        <View style={styles.priceContainer}>
          <Text style={styles.assetPrice}>£{asset.currentPrice.toFixed(2)}</Text>
          <View style={[
            styles.changeContainer,
            { backgroundColor: asset.changePercent >= 0 ? '#00C851' : '#FF4444' }
          ]}>
            {asset.changePercent >= 0 ? (
              <TrendingUp size={12} color="white" />
            ) : (
              <TrendingDown size={12} color="white" />
            )}
            <Text style={styles.changeText}>
              {asset.changePercent >= 0 ? '+' : ''}{asset.changePercent.toFixed(2)}%
            </Text>
          </View>
        </View>
        
        <View style={styles.tradeButtons}>
          <TouchableOpacity style={styles.sellButton}>
            <Text style={styles.sellButtonText}>SELL</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buyButton}>
            <Text style={styles.buyButtonText}>BUY</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <View style={styles.headerTop}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerTitle}>Trade</Text>
            <Text style={styles.headerSubtitle}>Sports Assets Exchange</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.headerButton}>
              <Bell size={20} color={Colors.text.white} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <BarChart3 size={20} color={Colors.text.white} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Portfolio Summary */}
      <View style={styles.portfolioSummary}>
        <View style={styles.portfolioItem}>
          <Text style={styles.portfolioLabel}>Portfolio Value</Text>
          <Text style={styles.portfolioValue}>£24,750.00</Text>
          <View style={styles.portfolioChange}>
            <TrendingUp size={14} color="#00C851" />
            <Text style={styles.portfolioChangeText}>+2.4% (£580)</Text>
          </View>
        </View>
        <View style={styles.portfolioItem}>
          <Text style={styles.portfolioLabel}>Available Cash</Text>
          <Text style={styles.portfolioValue}>£5,250.00</Text>
        </View>
      </View>
      
      {/* Search */}
      <View style={styles.searchContainer}>
        <Search size={18} color={Colors.text.light} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search sports assets..."
          placeholderTextColor={Colors.text.light}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      
      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'watchlist' && styles.activeTab]}
          onPress={() => setActiveTab('watchlist')}
        >
          <Eye size={16} color={activeTab === 'watchlist' ? Colors.primary.orange : Colors.text.light} />
          <Text style={[
            styles.tabText, 
            activeTab === 'watchlist' && styles.activeTabText
          ]}>
            Watchlist
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'discover' && styles.activeTab]}
          onPress={() => setActiveTab('discover')}
        >
          <Activity size={16} color={activeTab === 'discover' ? Colors.primary.orange : Colors.text.light} />
          <Text style={[
            styles.tabText, 
            activeTab === 'discover' && styles.activeTabText
          ]}>
            Discover
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'portfolio' && styles.activeTab]}
          onPress={() => setActiveTab('portfolio')}
        >
          <BarChart3 size={16} color={activeTab === 'portfolio' ? Colors.primary.orange : Colors.text.light} />
          <Text style={[
            styles.tabText, 
            activeTab === 'portfolio' && styles.activeTabText
          ]}>
            Portfolio
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* Market Data Header */}
      <View style={styles.marketHeader}>
        <Text style={styles.marketHeaderText}>
          {activeTab === 'watchlist' ? 'Your Watchlist' : 
           activeTab === 'discover' ? 'All Sports Assets' : 'Your Holdings'}
        </Text>
        <Text style={styles.marketSubtext}>
          {displayAssets.length} asset{displayAssets.length !== 1 ? 's' : ''}
        </Text>
      </View>
      
      {/* Assets List */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {displayAssets.length === 0 ? (
          <View style={styles.emptyState}>
            <Eye size={48} color={Colors.text.light} />
            <Text style={styles.emptyStateTitle}>
              {activeTab === 'watchlist' ? 'No assets in watchlist' : 'No assets found'}
            </Text>
            <Text style={styles.emptyStateText}>
              {activeTab === 'watchlist' 
                ? 'Tap the star icon to add assets to your watchlist'
                : 'Try adjusting your search criteria'
              }
            </Text>
          </View>
        ) : (
          displayAssets.map(renderAssetRow)
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0E1A',
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: '#0A0E1A',
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    padding: 8,
    marginLeft: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text.white,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.text.light,
    opacity: 0.8,
  },
  portfolioSummary: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#1A1F2E',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
  },
  portfolioItem: {
    flex: 1,
  },
  portfolioLabel: {
    fontSize: 12,
    color: Colors.text.light,
    marginBottom: 4,
  },
  portfolioValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.white,
    marginBottom: 4,
  },
  portfolioChange: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  portfolioChangeText: {
    fontSize: 12,
    color: '#00C851',
    marginLeft: 4,
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1F2E',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    height: 48,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    color: Colors.text.white,
    fontSize: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  activeTab: {
    backgroundColor: 'rgba(255, 138, 0, 0.1)',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text.light,
    marginLeft: 6,
  },
  activeTabText: {
    color: Colors.primary.orange,
  },
  marketHeader: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  marketHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.white,
    marginBottom: 2,
  },
  marketSubtext: {
    fontSize: 12,
    color: Colors.text.light,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  assetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  assetLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  watchButton: {
    padding: 8,
    marginRight: 12,
  },
  assetLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  assetInfo: {
    flex: 1,
  },
  assetName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.white,
    marginBottom: 2,
  },
  assetSymbol: {
    fontSize: 12,
    color: Colors.text.light,
  },
  assetRight: {
    alignItems: 'flex-end',
  },
  priceContainer: {
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  assetPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.white,
    marginBottom: 4,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  changeText: {
    fontSize: 11,
    fontWeight: '600',
    color: 'white',
    marginLeft: 2,
  },
  tradeButtons: {
    flexDirection: 'row',
  },
  sellButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: '#FF4444',
    marginRight: 8,
  },
  sellButtonText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: 'white',
  },
  buyButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: '#00C851',
  },
  buyButtonText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: 'white',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.white,
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateText: {
    fontSize: 14,
    color: Colors.text.light,
    textAlign: 'center',
    lineHeight: 20,
  },
});