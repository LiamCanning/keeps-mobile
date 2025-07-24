import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { Clock, TrendingUp, Users } from 'lucide-react-native';
import { Asset } from '@/constants/assets';
import Colors from '@/constants/colors';

interface AssetCardProps {
  asset: Asset;
  onPress?: () => void;
  onInvestorsPress?: () => void;
  showBackgroundImage?: boolean;
  onInvestPress?: () => void;
}

export default function AssetCard({ asset, onPress, onInvestorsPress, showBackgroundImage = false, onInvestPress }: AssetCardProps) {
  const backgroundColor = asset.backgroundColor || Colors.background.card;
  const textColor = backgroundColor === Colors.background.card ? Colors.text.dark : 
    (asset.id === 'exeter-chiefs' ? Colors.text.dark : '#FFFFFF');
  const isComingSoon = asset.type === 'coming_soon';
  const isCompleted = asset.status === 'SOLD OUT';
  
  // Background images for carousel cards
  const getBackgroundImage = () => {
    if (!showBackgroundImage) return null;
    
    switch (asset.id) {
      case 'liverpool':
        return 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&h=600&fit=crop';
      case 'mclaren':
        return 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600&fit=crop';
      case 'rydercup':
        return 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&h=600&fit=crop';
      case 'ohio':
        return 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=800&h=600&fit=crop';
      case 'cardiff':
        return 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=600&fit=crop';
      case 'hexagon':
        return 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop';
      default:
        return null;
    }
  };
  
  const backgroundImageUri = getBackgroundImage();
  
  if (showBackgroundImage && backgroundImageUri) {
    return (
      <TouchableOpacity 
        style={styles.carouselContainer} 
        onPress={onPress}
        activeOpacity={0.9}
      >
        {/* Image Section */}
        <View style={styles.imageSection}>
          <ImageBackground 
            source={{ uri: backgroundImageUri }}
            style={styles.carouselBackgroundImage}
            imageStyle={styles.carouselBackgroundImageStyle}
          >
            <View style={styles.imageOverlay} />
            {asset.id === 'liverpool' && (
              <View style={styles.carouselTrendingBadge}>
                <Text style={styles.trendingText}>Trending</Text>
              </View>
            )}
          </ImageBackground>
        </View>
        
        {/* Text Section */}
        <View style={styles.textSection}>
          <View style={styles.carouselContent}>
            <View style={styles.carouselLeftSection}>
              <Image source={{ uri: asset.logo }} style={styles.carouselLogo} />
              <View style={styles.carouselTextContainer}>
                <View style={styles.titleRow}>
                  <Text style={[styles.carouselName]}>
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
                
                <Text style={styles.carouselRaiseAmount}>
                  {isComingSoon ? asset.totalRaiseAmount : 
                   asset.id === 'rydercup' ? '£42,500,000 Bond' : asset.raiseAmount}
                </Text>
                
                <Text style={styles.carouselTagline}>
                  {asset.id === 'liverpool' ? "Expand Anfield's Stadium Capacity" :
                   asset.id === 'mclaren' ? "Fuel McLaren's Next Victory" :
                   asset.id === 'rydercup' ? 'Improve Digital Access for Fans' :
                   asset.id === 'ohio' ? 'Fund Their World Class Stadium' :
                   asset.id === 'cardiff' ? "Back the Bluebirds' Future" :
                   asset.id === 'hexagon' ? 'Own 75% Of The Team' :
                   'Exclusive Investment Opportunity'}
                </Text>

                {isComingSoon ? (
                  <>
                    <Text style={styles.carouselComingSoonInfo}>
                      Total Raise: {asset.totalRaiseAmount}
                    </Text>
                    <Text style={styles.carouselComingSoonInfo}>
                      {asset.expectedReturn}
                    </Text>
                    <View style={styles.carouselComingSoonIndicator}>
                      <Clock size={16} color={Colors.text.white} />
                      <Text style={styles.carouselComingSoonText}>{asset.comingSoonTimer}</Text>
                    </View>
                  </>
                ) : (
                  asset.raisedAmount && asset.goalAmount && (
                    <View style={styles.carouselProgressSection}>
                      <View style={styles.carouselProgressBar}>
                        <View 
                          style={[
                            styles.progressFill, 
                            { width: `${asset.progress}%`, backgroundColor: Colors.accent.green }
                          ]} 
                        />
                      </View>
                      <Text style={styles.carouselProgressText}>
                        {isCompleted ? `${asset.raisedAmount} - ${asset.remaining}` : `${asset.raisedAmount} raised of ${asset.goalAmount} goal`}
                      </Text>
                    </View>
                  )
                )}
                
                {/* Invest Now Button */}
                {onInvestPress && (
                  <TouchableOpacity 
                    style={styles.investButton} 
                    onPress={onInvestPress}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.investButtonText}>
                      {isComingSoon ? 'Get Early Access' : 'Invest Now'}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  
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
                  {asset.id === 'rydercup' ? '£42,500,000 Bond' : asset.raiseAmount}
                </Text>
                
                {/* Asset tagline */}
                <Text style={[styles.tagline, { color: textColor }, asset.id === 'ohio' && styles.taglineItalic]}>
                  {asset.id === 'liverpool' ? "Expand Anfield's Stadium Capacity" :
                   asset.id === 'mclaren' ? "Fuel McLaren's Next Victory" :
                   asset.id === 'rydercup' ? 'Improve Digital Access for Fans' :
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
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    position: 'relative',
    overflow: 'hidden',
  },
  carouselContainer: {
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
    backgroundColor: Colors.background.card,
    height: 380,
  },
  imageSection: {
    height: 200,
    position: 'relative',
  },
  carouselBackgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  carouselBackgroundImageStyle: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  textSection: {
    backgroundColor: Colors.background.card,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    flex: 1,
  },
  carouselContent: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    justifyContent: 'center',
  },
  carouselLeftSection: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'flex-start',
  },
  carouselLogo: {
    width: 50,
    height: 60,
    resizeMode: 'contain',
    marginRight: 12,
  },
  carouselTextContainer: {
    flex: 1,
  },
  carouselName: {
    fontSize: 22,
    fontWeight: '700',
    marginRight: 8,
    flex: 1,
    flexShrink: 1,
    color: Colors.text.dark,
  },
  carouselRaiseAmount: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
    color: Colors.text.dark,
  },
  carouselTagline: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
    color: Colors.text.dark,
    opacity: 0.8,
  },
  carouselProgressSection: {
    marginBottom: 8,
  },
  carouselProgressBar: {
    height: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 3,
    marginBottom: 6,
  },
  carouselProgressText: {
    fontSize: 14,
    color: Colors.text.dark,
    opacity: 0.8,
  },
  carouselTrendingBadge: {
    backgroundColor: Colors.accent.green,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    position: 'absolute',
    top: 12,
    left: 12,
  },
  backgroundImage: {
    flex: 1,
    minHeight: 200,
    margin: -20,
    justifyContent: 'flex-end',
  },
  backgroundImageStyle: {
    borderRadius: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 16,
  },
  contentWithBackground: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  logoWithBackground: {
    width: 60,
    height: 75,
    resizeMode: 'contain',
    marginRight: 16,
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
    height: 100,
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
    flexWrap: 'nowrap',
  },
  name: {
    fontSize: 26,
    fontWeight: '700',
    marginRight: 8,
    flex: 1,
    flexShrink: 1,
  },
  trendingBadge: {
    backgroundColor: Colors.accent.green,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    position: 'absolute',
    top: 140,
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
    fontSize: 20,
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
    opacity: 1.0,
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
    fontSize: 16,
    opacity: 1.0,
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
    opacity: 1.0,
  },
  liveNowBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(76, 217, 100, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    flexShrink: 0,
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
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    opacity: 1.0,
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
  carouselComingSoonInfo: {
    fontSize: 14,
    marginBottom: 4,
    color: Colors.text.dark,
    opacity: 0.8,
  },
  carouselComingSoonIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  carouselComingSoonText: {
    color: Colors.text.white,
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  investButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  investButtonText: {
    color: Colors.text.white,
    fontSize: 16,
    fontWeight: '600',
  },
});