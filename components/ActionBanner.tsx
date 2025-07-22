import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '@/constants/colors';

interface ActionBannerProps {
  activeTab: 'live' | 'coming-soon' | 'completed';
  onTabChange: (tab: 'live' | 'coming-soon' | 'completed') => void;
}

export default function ActionBanner({ activeTab, onTabChange }: ActionBannerProps) {
  const router = useRouter();
  const { width } = Dimensions.get('window');
  const isDesktop = Platform.OS === 'web' && width > 768;

  const handleTabPress = (tab: 'live' | 'coming-soon' | 'completed') => {
    onTabChange(tab);
    
    // Navigate to dedicated pages
    switch (tab) {
      case 'live':
        router.push('/live-deals');
        break;
      case 'coming-soon':
        router.push('/coming-soon');
        break;
      case 'completed':
        router.push('/completed-deals');
        break;
    }
  };

  return (
    <View style={[styles.container, isDesktop && styles.desktopContainer]}>
      <TouchableOpacity 
        style={[styles.tab, activeTab === 'live' && styles.activeTab, isDesktop && styles.desktopTab]}
        onPress={() => handleTabPress('live')}
      >
        <Text style={[styles.tabText, activeTab === 'live' && styles.activeTabText, isDesktop && styles.desktopTabText]}>
          Live Deals
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.tab, activeTab === 'coming-soon' && styles.activeTab, isDesktop && styles.desktopTab]}
        onPress={() => handleTabPress('coming-soon')}
      >
        <Text style={[styles.tabText, activeTab === 'coming-soon' && styles.activeTabText, isDesktop && styles.desktopTabText]}>
          Coming Soon
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.tab, activeTab === 'completed' && styles.activeTab, isDesktop && styles.desktopTab]}
        onPress={() => handleTabPress('completed')}
      >
        <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText, isDesktop && styles.desktopTabText]}>
          Completed Deals
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.background.card,
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 16,
    padding: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  desktopContainer: {
    marginHorizontal: 0,
    marginVertical: 24,
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
    padding: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2,
  },
  desktopTab: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginHorizontal: 4,
  },
  activeTab: {
    backgroundColor: Colors.primary.blue,
    shadowColor: Colors.primary.blue,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  tabText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text.light,
    textAlign: 'center',
  },
  desktopTabText: {
    fontSize: 16,
  },
  activeTabText: {
    color: Colors.text.white,
    fontWeight: '700',
  },
});