import React from 'react';
import { StyleSheet, Text, View, Dimensions, Platform } from 'react-native';
import { CheckCircle, Clock } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface SectionTitleProps {
  title: string;
}

export default function SectionTitle({ title }: SectionTitleProps) {
  const isLiveDeals = title === 'Live Deals';
  const isComingSoon = title === 'Coming Soon';
  const { width } = Dimensions.get('window');
  const isDesktop = Platform.OS === 'web' && width > 768;
  
  return (
    <View style={[styles.container, isDesktop && styles.desktopContainer]}>
      <View style={styles.titleRow}>
        {isLiveDeals && <CheckCircle size={20} color={Colors.accent.green} style={styles.icon} />}
        {isComingSoon && <Clock size={20} color={Colors.primary.orange} style={styles.icon} />}
        <Text style={[styles.title, isDesktop && styles.desktopTitle]}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginBottom: 12,
    marginTop: 24,
  },
  desktopContainer: {
    paddingHorizontal: 0,
    marginBottom: 20,
    marginTop: 32,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.white,
  },
  desktopTitle: {
    fontSize: 24,
  },
});