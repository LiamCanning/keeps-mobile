import React from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { ArrowLeft, TrendingUp, Users, Calendar, ShoppingCart, Clock, Gift, TrendingUp as TrendingUpIcon, Eye } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { userAssets, comingSoonAssets, completedAssets } from '@/constants/assets';

const getAssetTagline = (assetId: string): string => {
  const taglines: { [key: string]: string } = {
    'liverpool': 'Fund Anfield stadium capacity to 75,000',
    'cardiff': 'Back the Bluebirds\' future',
    'mclaren': 'Fuel McLaren\'s Next Championship Title',
    'ohio': 'Fund their new stadium',
    'hexagon': 'Own 75% of the team',
    'rydercup': 'Elite Golf Excellence',
    'british-cycling': 'Pedal to Success',
    'exeter-chiefs': 'Invest in Sports Excellence',
    'ultimate-frisbee': 'Catch the Ultimate Opportunity',
  };
  return taglines[assetId] || 'Invest in Sports Excellence';
};

export default function AssetDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  const asset = [...userAssets, ...comingSoonAssets, ...completedAssets].find(a => a.id === id);
  
  if (!asset) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Asset not found</Text>
      </View>
    );
  }

  const handleBuyPress = () => {
    router.push(`/buy/${asset.id}`);
  };

  const handleSellPress = () => {
    router.push(`/sell/${asset.id}`);
  };

  const handleBenefitsPress = () => {
    router.push(`/benefits/${asset.id}`);
  };

  const handleEarlyAccessPress = () => {
    router.push(`/early-access/${asset.id}`);
  };

  const handleInvestorsPress = () => {
    router.push(`/investors/${asset.id}`);
  };

  const handleSecondaryMarketPress = () => {
    router.push(`/(tabs)/market?filter=${asset.id}`);
  };

  const getProgressColor = (progress: number) => {
    return Colors.accent.green;
  };

  const isComingSoon = asset.type === 'coming_soon';
  const isCompleted = completedAssets.some(a => a.id === asset.id);
  const isOwned = userAssets.some(a => a.id === asset.id);

  const backgroundColor = asset.backgroundColor || Colors.background.card;
  
  // Determine text color based on background brightness
  const getTextColor = (bgColor: string) => {
    const darkBackgrounds = ['#FF8700', '#1f4e79', '#CC0000', '#003D82', '#7C3AED', '#1E40AF', '#DC2626', '#F59E0B'];
    const lightBackgrounds = ['#FFFFFF'];
    
    if (darkBackgrounds.includes(bgColor)) return Colors.text.white;
    if (lightBackgrounds.includes(bgColor)) return Colors.text.dark;
    return Colors.text.dark;
  };
  
  const textColor = getTextColor(backgroundColor);
  
  const getTaglineColor = (assetId: string, baseTextColor: string) => {
    if (assetId === 'mclaren') return Colors.text.white;
    if (assetId === 'ohio' || assetId === 'cardiff' || assetId === 'hexagon' || assetId === 'british-cycling' || assetId === 'ultimate-frisbee') {
      return Colors.text.white;
    }
    if (assetId === 'exeter-chiefs') return '#FFD700';
    return baseTextColor === Colors.text.white ? '#FFB366' : Colors.primary.orange;
  };
  
  const getLogoStyle = (assetId: string) => {
    if (assetId === 'mclaren') {
      return { width: 160, height: 80 };
    }
    if (assetId === 'hexagon' || assetId === 'rydercup') {
      return { width: 150, height: 150 };
    }
    if (assetId === 'british-cycling') {
      return { width: 160, height: 120, marginTop: 10 };
    }
    if (assetId === 'ultimate-frisbee') {
      return { marginTop: 5 };
    }
    return {};
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          headerShown: true,
          headerTitle: asset.name,
          headerStyle: { backgroundColor: Colors.primary.blue },
          headerTintColor: Colors.text.white,
          headerTitleStyle: { fontWeight: 'bold' },
        }} 
      />
      <StatusBar style="light" />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={[styles.heroSection, { backgroundColor }]}>
          <View style={styles.heroContent}>
            <Image source={{ uri: asset.logo }} style={[styles.heroLogo, getLogoStyle(asset.id)]} />
            <Text style={[styles.heroTitle, { color: asset.id === 'liverpool' ? '#C8102E' : asset.id === 'exeter-chiefs' ? Colors.text.white : textColor }]}>
              {asset.name}
            </Text>
            <Text style={[styles.assetTagline, asset.id === 'ohio' && styles.assetTaglineItalic, { color: getTaglineColor(asset.id, textColor) }]}>{getAssetTagline(asset.id)}</Text>
            <Text style={[styles.heroType, { color: asset.id === 'exeter-chiefs' ? Colors.text.white : asset.id === 'mclaren' ? Colors.text.white : textColor === Colors.text.white ? 'rgba(255, 255, 255, 0.8)' : Colors.text.light }]}>
              {asset.type === 'equity' ? 'Equity Investment' : 
               asset.type === 'debenture' ? 'Debenture Programme' : 
               asset.type === 'income' ? 'Income Sharing Agreement' : 'Coming Soon'}
            </Text>
            
            {isComingSoon && asset.comingSoonTimer && (
              <View style={styles.comingSoonBadge}>
                <Clock size={16} color={Colors.text.white} />
                <Text style={styles.comingSoonBadgeText}>Launches in {asset.comingSoonTimer}</Text>
              </View>
            )}
          </View>
          
          {!isComingSoon && !isCompleted && (
            <View style={styles.liveNowBadgeHero}>
              <View style={styles.liveIndicatorHero} />
              <Text style={styles.liveNowTextHero}>LIVE NOW</Text>
            </View>
          )}
          
          {isCompleted && (
            <View style={[styles.completedBadgeHero, asset.id === 'exeter-chiefs' && styles.completedBadgeSmaller]}>
              <Text style={styles.completedTextHero}>FUNDING COMPLETE</Text>
            </View>
          )}
        </View>

        {!isComingSoon && (
          <>
            <View style={styles.statsSection}>
              <View style={styles.statCard}>
                <TouchableOpacity onPress={handleInvestorsPress} style={styles.investorsButton}>
                  <Eye size={24} color={Colors.primary.orange} />
                  <Text style={styles.statValue}>Who's Invested?</Text>
                </TouchableOpacity>
              </View>
              
              {asset.timelineInfo && (
                <View style={styles.statCard}>
                  <Text style={styles.timerEmoji}>⏰</Text>
                  <Text style={styles.statValue}>{asset.timelineInfo.replace('⏰ ', '')}</Text>
                  <Text style={styles.statLabel}></Text>
                </View>
              )}
              
              <View style={styles.statCard}>
                <Text style={styles.statValue}>{asset.minimumEntry}</Text>
                <Text style={styles.statLabel}>Minimum Entry</Text>
              </View>
            </View>
            
            {/* Funding Progress Bar */}
            {asset.raisedAmount && asset.goalAmount && (
              <View style={styles.fundingSection}>
                <View style={styles.fundingBar}>
                  <View 
                    style={[
                      styles.fundingFill, 
                      { width: `${asset.progress}%`, backgroundColor: Colors.accent.green }
                    ]} 
                  />
                </View>
                <Text style={styles.fundingText}>
                  {asset.raisedAmount} raised of {asset.goalAmount} goal
                </Text>
                <View style={styles.investorMetrics}>
                  <View style={styles.investorMetric}>
                    <Users size={16} color={Colors.text.light} />
                    <Text style={styles.investorMetricText}>
                      {asset.investorCount?.toLocaleString()} investors joined
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </>
        )}

        <View style={styles.detailsSection}>
          <Text style={[styles.sectionTitle, { color: Colors.primary.orange }]}>Investment Details</Text>
          
          {isComingSoon ? (
            <>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Total Raise:</Text>
                <Text style={styles.detailValue}>{asset.totalRaiseAmount}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Expected Return:</Text>
                <Text style={styles.detailValue}>{asset.expectedReturn}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Minimum Entry:</Text>
                <Text style={styles.detailValue}>{asset.minimumEntry}</Text>
              </View>
            </>
          ) : (
            <>
              {asset.type === 'equity' && (
                <>
                  {!isCompleted && (
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Equity Percentage:</Text>
                      <Text style={styles.detailValue}>{asset.equityPercentage}</Text>
                    </View>
                  )}
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Valuation:</Text>
                    <Text style={styles.detailValue}>{asset.valuation}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Timeline:</Text>
                    <Text style={styles.detailValue}>{asset.timelineInfo || 'TBD'}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Dividends:</Text>
                    <Text style={styles.detailValue}>Annual dividends based on profits</Text>
                  </View>
                </>
              )}
              
              {asset.type === 'income' && (
                <>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Investor Return:</Text>
                    <Text style={styles.detailValue}>{asset.investorReturn}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Timeline:</Text>
                    <Text style={styles.detailValue}>{asset.timelineInfo || 'TBD'}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Revenue Share:</Text>
                    <Text style={styles.detailValue}>10% of future revenues</Text>
                  </View>
                </>
              )}
              
              {asset.type === 'debenture' && (
                <>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Timeline:</Text>
                    <Text style={styles.detailValue}>{asset.timelineInfo || 'TBD'}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Investor Return:</Text>
                    <Text style={styles.detailValue}>{asset.investorReturn}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Interest Rate:</Text>
                    <Text style={styles.detailValue}>{asset.id === 'rydercup' ? '5% interest + 40% capital return' : asset.id === 'british-cycling' ? '6% interest + 40% capital return' : '5% interest + 40% capital return'}</Text>
                  </View>
                </>
              )}
            </>
          )}
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Exclusive Benefits:</Text>
            <Text style={[styles.detailValue, { color: Colors.accent.green }]}>✅ Included</Text>
          </View>
          
          {asset.description && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Description:</Text>
              <Text style={styles.detailValue}>{asset.description}</Text>
            </View>
          )}
        </View>

        <View style={styles.actionsSection}>
          <TouchableOpacity style={styles.benefitsButton} onPress={handleBenefitsPress}>
            <Gift size={20} color={Colors.text.white} />
            <Text style={styles.benefitsButtonText}>Exclusive Benefits</Text>
          </TouchableOpacity>
          
          {isComingSoon ? (
            <TouchableOpacity style={styles.earlyAccessButton} onPress={handleEarlyAccessPress}>
              <Clock size={20} color={Colors.text.white} />
              <Text style={styles.earlyAccessButtonText}>Sign Up For Early Access</Text>
            </TouchableOpacity>
          ) : isCompleted ? (
            <TouchableOpacity style={styles.secondaryMarketButton} onPress={handleSecondaryMarketPress}>
              <TrendingUpIcon size={20} color={Colors.text.white} />
              <Text style={styles.secondaryMarketButtonText}>View Secondary Market</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.buyButton} onPress={handleBuyPress}>
                <ShoppingCart size={20} color={Colors.text.white} />
                <Text style={styles.buyButtonText}>Invest Now</Text>
              </TouchableOpacity>
              
              {isOwned && (
                <TouchableOpacity style={styles.sellButton} onPress={handleSellPress}>
                  <TrendingUpIcon size={20} color={Colors.text.white} />
                  <Text style={styles.sellButtonText}>Sell Now</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
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
    paddingBottom: 24,
  },
  heroSection: {
    padding: 24,
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
  },
  heroContent: {
    alignItems: 'center',
    width: '100%',
  },
  heroLogo: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  assetTagline: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  assetTaglineItalic: {
    fontStyle: 'italic',
  },
  heroType: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  comingSoonBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: 12,
  },
  comingSoonBadgeText: {
    color: Colors.text.white,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  statsSection: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 24,
    gap: 8,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.background.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  liveIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CD964',
    marginBottom: 8,
  },
  progressIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginTop: 8,
    textAlign: 'center',
  },
  statLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.light,
    marginTop: 4,
    textAlign: 'center',
  },
  detailsSection: {
    backgroundColor: Colors.background.card,
    margin: 16,
    borderRadius: 16,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  detailLabel: {
    fontSize: 16,
    color: Colors.text.light,
    flex: 1,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.dark,
    flex: 2,
    textAlign: 'right',
  },
  actionsSection: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  benefitsButton: {
    backgroundColor: '#6366F1',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  benefitsButtonText: {
    color: Colors.text.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  earlyAccessButton: {
    backgroundColor: Colors.primary.orange,
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  earlyAccessButtonText: {
    color: Colors.text.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  buyButton: {
    flex: 1,
    backgroundColor: Colors.accent.green,
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyButtonText: {
    color: Colors.text.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  sellButton: {
    flex: 1,
    backgroundColor: '#EF4444',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sellButtonText: {
    color: Colors.text.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  fundingSection: {
    backgroundColor: Colors.background.card,
    margin: 16,
    borderRadius: 16,
    padding: 20,
  },
  fundingBar: {
    height: 8,
    backgroundColor: '#E5E5E5',
    borderRadius: 4,
    marginBottom: 12,
  },
  fundingFill: {
    height: '100%',
    borderRadius: 4,
  },
  fundingText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.dark,
    marginBottom: 12,
  },
  investorMetrics: {
    gap: 8,
  },
  investorMetric: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  investorMetricText: {
    fontSize: 14,
    color: Colors.text.light,
    marginLeft: 8,
  },
  investorsButton: {
    alignItems: 'center',
    width: '100%',
  },
  errorText: {
    color: Colors.text.white,
    fontSize: 18,
    textAlign: 'center',
    marginTop: 100,
  },
  liveNowBadgeHero: {
    position: 'absolute',
    top: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(76, 217, 100, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  liveIndicatorHero: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CD964',
    marginRight: 6,
  },
  liveNowTextHero: {
    color: Colors.text.white,
    fontSize: 12,
    fontWeight: '700',
  },
  completedBadgeHero: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(34, 197, 94, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  completedTextHero: {
    color: Colors.text.white,
    fontSize: 12,
    fontWeight: '700',
  },
  completedBadgeSmaller: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  timerEmoji: {
    fontSize: 20,
    marginBottom: 8,
  },
  secondaryMarketButton: {
    backgroundColor: Colors.primary.orange,
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryMarketButtonText: {
    color: Colors.text.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});