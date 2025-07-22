import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Award, Star, Crown, Gem, Trophy } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { Benefit } from '@/constants/benefits';

interface BenefitCardProps {
  benefit: Benefit;
  highlightUserTier?: boolean;
}

export default function BenefitCard({ benefit, highlightUserTier = false }: BenefitCardProps) {
  const getBadgeColor = () => {
    switch (benefit.level) {
      case 'bronze':
        return '#CD7F32';
      case 'silver':
        return '#C0C0C0';
      case 'gold':
        return '#FFD700';
      case 'platinum':
        return '#E5E4E2';
      case 'diamond':
        return '#B9F2FF';
      default:
        return '#6B7280';
    }
  };

  const getBadgeIcon = () => {
    const iconColor = benefit.level === 'gold' || benefit.level === 'platinum' || benefit.level === 'diamond' ? '#000000' : '#FFFFFF';
    switch (benefit.level) {
      case 'bronze':
        return <Award size={16} color={iconColor} />;
      case 'silver':
        return <Star size={16} color={iconColor} />;
      case 'gold':
        return <Crown size={16} color={iconColor} />;
      case 'platinum':
        return <Trophy size={16} color={iconColor} />;
      case 'diamond':
        return <Gem size={16} color={iconColor} />;
      default:
        return <Award size={16} color={iconColor} />;
    }
  };

  return (
    <View style={[styles.container, highlightUserTier && styles.highlightedContainer]}>
      <View style={[styles.badge, { backgroundColor: getBadgeColor() }]}>
        {getBadgeIcon()}
        <Text style={[styles.badgeText, { color: benefit.level === 'gold' || benefit.level === 'platinum' || benefit.level === 'diamond' ? '#000000' : '#FFFFFF' }]}>
          {benefit.level.charAt(0).toUpperCase() + benefit.level.slice(1)}
        </Text>
      </View>
      
      <Text style={[styles.title, { color: Colors.primary.orange }]}>{benefit.title}</Text>
      <Text style={styles.description}>{benefit.description}</Text>
      
      {benefit.includesPrevious && (
        <View style={styles.inclusiveNote}>
          <Text style={styles.inclusiveText}>
            ✓ Includes all benefits from previous tiers
          </Text>
        </View>
      )}
      
      {benefit.tier && (
        <Text style={styles.tierInfo}>{benefit.tier}</Text>
      )}
      
      <View style={styles.requiredContainer}>
        <Text style={styles.requiredLabel}>Investment Required:</Text>
        <Text style={styles.requiredValue}>{benefit.investmentRequired}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: Colors.text.light,
    marginBottom: 8,
    lineHeight: 20,
  },
  inclusiveNote: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  inclusiveText: {
    fontSize: 12,
    color: Colors.accent.green,
    fontWeight: '600',
  },
  tierInfo: {
    fontSize: 12,
    color: Colors.primary.blue,
    fontWeight: '600',
    marginBottom: 8,
  },
  requiredContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  requiredLabel: {
    fontSize: 14,
    color: Colors.text.light,
    marginRight: 4,
  },
  requiredValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary.blue,
  },
  highlightedContainer: {
    borderWidth: 3,
    borderColor: Colors.primary.orange,
    backgroundColor: '#FFF8E1',
    shadowColor: Colors.primary.orange,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});