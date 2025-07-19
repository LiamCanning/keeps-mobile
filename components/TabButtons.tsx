import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '@/constants/colors';

interface TabButtonsProps {
  activeTab: 'live' | 'coming';
  onTabChange: (tab: 'live' | 'coming') => void;
}

export default function TabButtons({ activeTab, onTabChange }: TabButtonsProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          activeTab === 'live' ? styles.activeButton : null,
        ]}
        onPress={() => onTabChange('live')}
      >
        <Text
          style={[
            styles.buttonText,
            activeTab === 'live' ? styles.activeButtonText : null,
          ]}
        >
          Live Deals
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[
          styles.button,
          activeTab === 'coming' ? styles.activeButton : null,
        ]}
        onPress={() => onTabChange('coming')}
      >
        <Text
          style={[
            styles.buttonText,
            activeTab === 'coming' ? styles.activeButtonText : null,
          ]}
        >
          Coming Soon
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  button: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    backgroundColor: 'transparent',
  },
  activeButton: {
    backgroundColor: Colors.primary.orange,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.white,
  },
  activeButtonText: {
    color: Colors.text.white,
  },
});