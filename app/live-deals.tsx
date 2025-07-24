import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { useRouter } from 'expo-router';
import { Home, Gift, Newspaper, PieChart, User, TrendingUp } from 'lucide-react-native';

import SearchBar from '@/components/SearchBar';
import AssetCard from '@/components/AssetCard';
import BackButton from '@/components/BackButton';

import Colors from '@/constants/colors';
import { userAssets } from '@/constants/assets';

export default function LiveDealsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleAssetPress = (assetId: string) => {
    router.push(`/asset/${assetId}`);
  };

  const handleSearchAssetSelect = (assetId: string) => {
    router.push(`/asset/${assetId}`);
  };

  const handleTabPress = (route: string) => {
    router.push(route);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: '',
          headerStyle: { backgroundColor: Colors.primary.blue },
          headerTintColor: Colors.text.white,
          headerTitleStyle: { fontWeight: 'bold' },
          headerLeft: () => <BackButton />,
          headerTitle: () => (
            <View style={styles.headerTitleContainer}>
              <Image 
                source={{ uri: 'https://r2-pub.rork.com/generated-images/8ed8a159-de50-4daf-99eb-e1c0ae8c7865.png' }}
                style={styles.headerTickIcon}
              />
              <Text style={styles.headerTitleText}>Live Deals</Text>
            </View>
          ),
          headerTitleAlign: 'center',
        }} 
      />
      
      <View style={styles.searchContainer}>
        <SearchBar 
          value={searchQuery} 
          onChangeText={setSearchQuery}
          onAssetSelect={handleSearchAssetSelect}
        />
      </View>
      
      {/* Add spacing after search bar */}
      <View style={styles.spacingAfterSearch} />
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {userAssets.map((asset) => (
          <AssetCard 
            key={asset.id} 
            asset={asset} 
            onPress={() => handleAssetPress(asset.id)}
          />
        ))}
      </ScrollView>
      
      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => handleTabPress('/(tabs)')}>  
          <Home color={Colors.primary.orange} size={22} />
          <Text style={[styles.navText, styles.activeNavText]}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem} onPress={() => handleTabPress('/(tabs)/benefits')}>
          <Gift color="#CCCCCC" size={22} />
          <Text style={styles.navText}>Benefits</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem} onPress={() => handleTabPress('/(tabs)/content')}>
          <Newspaper color="#CCCCCC" size={22} />
          <Text style={styles.navText}>Content</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem} onPress={() => handleTabPress('/(tabs)/portfolio')}>
          <PieChart color="#CCCCCC" size={22} />
          <Text style={styles.navText}>Portfolio</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem} onPress={() => handleTabPress('/(tabs)/market')}>
          <TrendingUp color="#CCCCCC" size={22} />
          <Text style={styles.navText}>Trade</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem} onPress={() => handleTabPress('/(tabs)/my-account')}>
          <User color="#CCCCCC" size={22} />
          <Text style={styles.navText}>Account</Text>
        </TouchableOpacity>
      </View>
      

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.blue,
  },

  searchContainer: {
    paddingTop: 16,
  },
  spacingAfterSearch: {
    height: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 8,
  },
  tickIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  bottomNav: {
    flexDirection: 'row',
    backgroundColor: Colors.primary.blue,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    borderTopWidth: 1,
    paddingBottom: 8,
    paddingTop: 8,
    paddingHorizontal: 4,
    height: 78,
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  navText: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
    textAlign: 'center',
    color: '#CCCCCC',
  },
  activeNavText: {
    color: Colors.primary.orange,
  },

  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTickIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  headerTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.white,
  },
});