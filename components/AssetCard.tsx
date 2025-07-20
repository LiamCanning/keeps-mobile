import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Clock, TrendingUp, Users } from 'lucide-react-native';
import { Asset } from '@/constants/assets';
import Colors from '@/constants/colors';

interface AssetCardProps {
  asset: Asset;
  onPress?: () => void;
  onInvestorsPress?: () => void;
}

export default function AssetCard({ asset, onPress, onInvestorsPress }: AssetCardProps) {
  const backgroundColor = asset.backgroundColor || Colors.background.card;
  const textColor = backgroundColor === Colors.background.card ? Colors.text.dark : 
    (asset.id === 'exeter-chiefs' ? Colors.text.dark : Colors.text.white);
  const isComingSoon = asset.type === 'coming_soon';
  const isCompleted = asset.status === 'SOLD OUT';
  
  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor }]} 
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.content}>
        <View style={styles.leftSection}>
          <Image source={{ uri: asset.logo }} style={styles.logo} />
          <View style={styles.textContainer}>
            <View style={styles.titleRow}>
              <Text style={[styles.name, { color: textColor }]}>
                {asset.name}
              </Text>
              {!isComingSoon && (
                <View style={[styles.liveNowBadge, isCompleted && styles.soldOutBadge]}>
                  <View style={[styles.liveIndicatorSmall, isCompleted && styles.soldOutIndicator]} />
                  <Text style={[styles.liveNowText, isCompleted && styles.soldOutText]}>
                    {isCompleted ? 'SOLD OUT' : 'LIVE NOW'}
                  </Text>
                </View>
              )}

            </View>
            
            {isComingSoon ? (
              <>
                <Text style={[styles.description, { color: textColor }]}>
                  {asset.description}
                </Text>
                <Text style={[styles.comingSoonInfo, { color: textColor }]}>
                  Total Raise: {asset.totalRaiseAmount}
                </Text>
                <Text style={[styles.comingSoonInfo, { color: textColor }]}>
                  {asset.expectedReturn}
                </Text>
                <View style={styles.comingSoonIndicator}>
                  <Clock size={16} color={Colors.text.white} />
                  <Text style={styles.comingSoonText}>{asset.comingSoonTimer}</Text>
                </View>
              </>
            ) : (
              <>
                <Text style={[styles.raiseAmount, { color: textColor }]}>
                  {asset.raiseAmount}
                </Text>
                
                {/* Asset tagline */}
                <Text style={[styles.tagline, { color: textColor }, asset.id === 'ohio' && styles.taglineItalic]}>
                  {asset.id === 'liverpool' ? "Expand Anfield's Stadium Capacity" :
                   asset.id === 'mclaren' ? "Fuel McLaren's Next Victory" :
                   asset.id === 'rydercup' ? 'Improve Digital Access For All Fans' :
                   asset.id === 'ohio' ? 'Fund Their World Class Stadium' :
                   asset.id === 'cardiff' ? "Back the Bluebirds' Future" :
                   asset.id === 'hexagon' ? 'Own 75% Of The Team' :
                   'Exclusive Investment Opportunity'}
                </Text>
                

                {/* Funding Progress Bar */}
                {asset.raisedAmount && asset.goalAmount && (
                  <View style={styles.progressSection}>
                    <View style={styles.progressBar}>
                      <View 
                        style={[
                          styles.progressFill, 
                          { width: `${asset.progress}%`, backgroundColor: Colors.accent.green }
                        ]} 
                      />
                    </View>
                    <Text style={[styles.progressText, { color: textColor }]}>
                      {isCompleted ? `${asset.raisedAmount} - ${asset.remaining}` : `${asset.raisedAmount} raised of ${asset.goalAmount} goal`}
                    </Text>
                  </View>
                )}
                
                {/* Investor Metrics */}
                <View style={styles.metricsContainer}>
                  <View style={styles.metric}>
                    <Users size={14} color={textColor} />
                    <Text style={[styles.metricText, { color: textColor }]}>
                      {asset.investorCount?.toLocaleString()} investors joined
                    </Text>
                  </View>
                  <View style={styles.metric}>
                    <TrendingUp size={14} color={Colors.accent.green} />
                    <Text style={[styles.metricText, { color: textColor }]}>
                      +{asset.growthPercentage}% asset value growth
                    </Text>
                  </View>
                </View>
              </>
            )}
          </View>
        </View>
      </View>
      
      {!isComingSoon && asset.id === 'liverpool' && (
        <View style={styles.trendingBadge}>
          <Text style={styles.trendingText}>Trending</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    marginBottom: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    position: 'relative',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  leftSection: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'flex-start',
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    marginRight: 8,
  },
  trendingBadge: {
    backgroundColor: Colors.accent.green,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    position: 'absolute',
    top: 110,
    left: 20,
  },
  trendingText: {
    color: Colors.text.white,
    fontSize: 12,
    fontWeight: '600',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  liveIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CD964',
    marginRight: 8,
  },
  status: {
    fontSize: 14,
    fontWeight: '600',
  },
  raiseAmount: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  minimumEntry: {
    fontSize: 14,
    marginBottom: 6,
  },
  benefits: {
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.9,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    marginTop: 4,
    lineHeight: 22,
    marginBottom: 8,
  },
  comingSoonInfo: {
    fontSize: 14,
    marginBottom: 4,
    opacity: 0.9,
  },
  comingSoonIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  comingSoonText: {
    color: Colors.text.white,
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  progressSection: {
    marginBottom: 12,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    marginBottom: 6,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    opacity: 0.8,
  },
  metricsContainer: {
    gap: 4,
  },
  metric: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  metricText: {
    fontSize: 12,
    marginLeft: 6,
    opacity: 0.9,
  },
  liveNowBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(76, 217, 100, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  liveIndicatorSmall: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4CD964',
    marginRight: 4,
  },
  liveNowText: {
    color: '#4CD964',
    fontSize: 10,
    fontWeight: '700',
  },
  soldOutBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  soldOutIndicator: {
    backgroundColor: '#DC2626',
  },
  soldOutText: {
    color: '#DC2626',
    fontWeight: '800',
  },
  tagline: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    opacity: 0.9,
  },
  taglineItalic: {
    fontStyle: 'italic',
  },
  whoInvestedButton: {
    marginBottom: 12,
  },
  whoInvestedText: {
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.9,
    textDecorationLine: 'underline',
  },
});