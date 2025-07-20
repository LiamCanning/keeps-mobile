import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Award, Star, Crown, Gem, Trophy } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { Benefit } from '@/constants/benefits';

interface BenefitCardProps {
  benefit: Benefit;
}

export default function BenefitCard({ benefit }: BenefitCardProps) {
  const getBadgeColor = () => {
    switch (benefit.level) {
      case 'bronze':
        return '#8B4513';
      case 'silver':
        return '#708090';
      case 'gold':
        return '#B8860B';
      case 'platinum':
        return '#4A4A4A';
      case 'diamond':
        return '#4169E1';
      default:
        return '#6B7280';
    }
  };

  const getBadgeIcon = () => {
    switch (benefit.level) {
      case 'bronze':
        return <Award size={16} color="#FFFFFF" />;
      case 'silver':
        return <Star size={16} color="#FFFFFF" />;
      case 'gold':
        return <Crown size={16} color="#FFFFFF" />;
      case 'platinum':
        return <Trophy size={16} color="#FFFFFF" />;
      case 'diamond':
        return <Gem size={16} color="#FFFFFF" />;
      default:
        return <Award size={16} color="#FFFFFF" />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.badge, { backgroundColor: getBadgeColor() }]}>
        {getBadgeIcon()}
        <Text style={styles.badgeText}>
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
    color: Colors.text.white,
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
});