import React from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Eye, TrendingUp, ShoppingCart } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { userAssets } from '@/constants/assets';

interface PortfolioAsset {
  id: string;
  name: string;
  logo: string;
  investment: number;
  sharesOwned: number;
  pricePerShare: number;
  purchaseDate: string;
  purchasePrice: number;
  liveMarketPrice: number;
  potentialReturn: number;
  tier: string;
  dividendPotential: string;
}

const portfolioAssets: PortfolioAsset[] = [
  {
    id: 'liverpool',
    name: 'Liverpool FC',
    logo: 'https://r2-pub.rork.com/attachments/4y28f2dzw4kzvdoid8e8b',
    investment: 25000,
    sharesOwned: 50,
    pricePerShare: 500,
    purchaseDate: '15/07/2025',
    purchasePrice: 500,
    liveMarketPrice: 575,
    potentialReturn: 15.0,
    tier: 'Gold',
    dividendPotential: '4-8% annually',
  },
  {
    id: 'mclaren',
    name: 'McLaren Racing',
    logo: 'https://r2-pub.rork.com/attachments/40293v65wbvdp8siu5o10',
    investment: 200000,
    sharesOwned: 200,
    pricePerShare: 1000,
    purchaseDate: '10/07/2025',
    purchasePrice: 1000,
    liveMarketPrice: 1220,
    potentialReturn: 22.0,
    tier: 'Diamond',
    dividendPotential: '6-12% annually',
  },
  {
    id: 'rydercup',
    name: 'Ryder Cup',
    logo: 'https://r2-pub.rork.com/attachments/t18y87ryxfb9d44snw5co',
    investment: 15000,
    sharesOwned: 3,
    pricePerShare: 5000,
    purchaseDate: '05/07/2025',
    purchasePrice: 5000,
    liveMarketPrice: 5935,
    potentialReturn: 18.7,
    tier: 'Silver',
    dividendPotential: '5% + Principal',
  },
];

export default function PortfolioScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  
  // Calculate portfolio values correctly
  const totalInvested = portfolioAssets.reduce((sum, asset) => sum + asset.investment, 0);
  const totalCurrentValue = portfolioAssets.reduce((sum, asset) => {
    return sum + (asset.sharesOwned * asset.liveMarketPrice);
  }, 0);
  const totalGrowth = totalCurrentValue - totalInvested;
  const totalGrowthPercentage = (totalGrowth / totalInvested) * 100;
  
  const totalAssets = portfolioAssets.length;
  const avgYield = portfolioAssets.reduce((sum, asset) => sum + asset.potentialReturn, 0) / totalAssets;

  const handleViewBenefits = (assetId: string) => {
    router.push(`/benefits/${assetId}`);
  };

  const handleTradeShares = (assetId: string) => {
    router.push(`/sell/${assetId}`);
  };

  const handleAssetDetails = (assetId: string) => {
    router.push(`/asset/${assetId}`);
  };

  const getTradeButtonText = (assetId: string) => {
    switch (assetId) {
      case 'liverpool':
        return 'Trade Shares';
      case 'mclaren':
        return 'Trade ISA';
      case 'rydercup':
        return 'Trade Debentures';
      default:
        return 'Trade Shares';
    }
  };

  const getUnitText = (assetId: string, quantity: number) => {
    if (assetId === 'rydercup') {
      return quantity === 1 ? 'debenture' : 'debentures';
    }
    return quantity === 1 ? 'share' : 'shares';
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <Text style={styles.headerTitle}>Liam's Portfolio</Text>
        <Text style={styles.headerSubtitle}>Track your sports investments</Text>
      </View>
      
      {/* Total Portfolio Value Card */}
      <View style={styles.totalValueCard}>
        <Text style={styles.totalValueLabel}>Total Portfolio Value</Text>
        <Text style={styles.totalValueAmount}>£{totalCurrentValue.toLocaleString()}</Text>
        <View style={styles.totalValueGrowth}>
          <TrendingUp size={16} color={Colors.accent.green} />
          <Text style={styles.totalValueGrowthText}>
            +£{totalGrowth.toLocaleString()} ({totalGrowthPercentage.toFixed(1)}%)
          </Text>
        </View>
        
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>£{totalInvested.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Invested</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{totalAssets}</Text>
            <Text style={styles.statLabel}>Teams</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{avgYield.toFixed(1)}%</Text>
            <Text style={styles.statLabel}>Avg Yield</Text>
          </View>
        </View>
      </View>
      
      <Text style={styles.sectionTitle}>Your Investments</Text>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {portfolioAssets.map((asset) => (
          <View key={asset.id} style={styles.assetCard}>
            <View style={styles.assetHeader}>
              <Image source={{ uri: asset.logo }} style={styles.assetLogo} />
              <View style={styles.assetInfo}>
                <Text style={styles.assetName}>{asset.name}</Text>
                <Text style={styles.assetValue}>£{asset.investment.toLocaleString()}</Text>
              </View>
            </View>
            
            <View style={styles.assetDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Your Investment:</Text>
                <Text style={styles.detailValue}>£{asset.investment.toLocaleString()}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>
                  {asset.id === 'rydercup' ? 'Debentures' : 'Shares'} Owned:
                </Text>
                <Text style={styles.detailValue}>
                  {asset.sharesOwned.toLocaleString()} (£{asset.pricePerShare} per {getUnitText(asset.id, 1)})
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Purchase Date:</Text>
                <Text style={styles.detailValue}>{asset.purchaseDate}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Purchase Price:</Text>
                <Text style={styles.detailValue}>
                  £{asset.purchasePrice.toFixed(2)} per {getUnitText(asset.id, 1)}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Live Secondary Market Price:</Text>
                <Text style={styles.detailValue}>
                  £{asset.liveMarketPrice.toFixed(2)} per {getUnitText(asset.id, 1)}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Potential Return:</Text>
                <Text style={[styles.detailValue, { color: Colors.accent.green }]}>
                  +{asset.potentialReturn.toFixed(1)}% (if sold today)
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Tier:</Text>
                <Text style={styles.detailValue}>{asset.tier}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Dividend Potential:</Text>
                <Text style={styles.detailValue}>{asset.dividendPotential}</Text>
              </View>
            </View>
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.actionButton} 
                onPress={() => handleViewBenefits(asset.id)}
              >
                <Eye size={16} color={Colors.text.white} />
                <Text style={styles.buttonText}>View Benefits</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.actionButton} 
                onPress={() => handleTradeShares(asset.id)}
              >
                <TrendingUp size={16} color={Colors.text.white} />
                <Text style={styles.buttonText}>{getTradeButtonText(asset.id)}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.actionButton} 
                onPress={() => handleAssetDetails(asset.id)}
              >
                <ShoppingCart size={16} color={Colors.text.white} />
                <Text style={styles.buttonText}>Asset Details</Text>
              </TouchableOpacity>
            </View>
          </View>
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
  totalValueCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(245, 166, 35, 0.2)',
  },
  totalValueLabel: {
    fontSize: 16,
    color: Colors.text.dark,
    marginBottom: 8,
  },
  totalValueAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 8,
  },
  totalValueGrowth: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  totalValueGrowthText: {
    fontSize: 16,
    color: Colors.accent.green,
    marginLeft: 6,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.text.light,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.white,
    marginTop: 24,
    marginBottom: 16,
    paddingHorizontal: 16,
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
    padding: 20,
    marginBottom: 16,
    width: '100%',
    minHeight: 500,
  },
  assetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 4,
  },
  assetValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primary.orange,
  },
  assetDetails: {
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: Colors.text.light,
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text.dark,
    flex: 1,
    textAlign: 'right',
  },
  buttonContainer: {
    gap: 10,
  },
  actionButton: {
    backgroundColor: Colors.primary.orange,
    borderRadius: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.text.white,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});