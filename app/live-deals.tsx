import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, Image, TouchableOpacity, Modal } from 'react-native';
import { Stack } from 'expo-router';
import { useRouter } from 'expo-router';
import { ChevronDown, Info, TrendingUp, Building, HeadphonesIcon, Home, Gift, Newspaper, PieChart, User } from 'lucide-react-native';

import SearchBar from '@/components/SearchBar';
import AssetCard from '@/components/AssetCard';

import Colors from '@/constants/colors';
import { userAssets } from '@/constants/assets';

export default function LiveDealsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  const handleAssetPress = (assetId: string) => {
    router.push(`/asset/${assetId}`);
  };

  const handleSearchAssetSelect = (assetId: string) => {
    router.push(`/asset/${assetId}`);
  };

  const handleLogoPress = () => {
    setShowDropdown(!showDropdown);
  };
  
  const handleMenuItemPress = (route: string) => {
    setShowDropdown(false);
    router.push(route);
  };

  const handleTabPress = (route: string) => {
    router.push(route);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Live Deals',
          headerStyle: { backgroundColor: Colors.primary.blue },
          headerTintColor: Colors.text.white,
          headerTitleStyle: { fontWeight: 'bold' },
          headerLeft: () => (
            <TouchableOpacity style={styles.logoContainer} onPress={handleLogoPress}>
              <Image 
                source={{ uri: 'https://r2-pub.rork.com/attachments/deijf9ahr9tnz07gsupjf' }} 
                style={styles.headerLogo}
              />
              <ChevronDown size={16} color={Colors.primary.blue} style={styles.chevron} />
            </TouchableOpacity>
          ),
        }} 
      />
      
      <View style={styles.searchContainer}>
        <SearchBar 
          value={searchQuery} 
          onChangeText={setSearchQuery}
          onAssetSelect={handleSearchAssetSelect}
        />
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.titleContainer}>
          <Image 
            source={{ uri: 'https://r2-pub.rork.com/generated-images/8ed8a159-de50-4daf-99eb-e1c0ae8c7865.png' }}
            style={styles.tickIcon}
          />
          <Text style={styles.title}>All Live Deals</Text>
        </View>
        
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
      
      {/* Dropdown Modal */}
      <Modal
        visible={showDropdown}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowDropdown(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          onPress={() => setShowDropdown(false)}
        >
          <View style={styles.dropdown}>
            <TouchableOpacity 
              style={styles.dropdownItem} 
              onPress={() => handleMenuItemPress('/about')}
            >
              <Info size={20} color={Colors.text.dark} />
              <Text style={styles.dropdownText}>About</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.dropdownItem} 
              onPress={() => handleMenuItemPress('/market-trends')}
            >
              <TrendingUp size={20} color={Colors.text.dark} />
              <Text style={styles.dropdownText}>Market Trends</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.dropdownItem} 
              onPress={() => handleMenuItemPress('/for-organisations')}
            >
              <Building size={20} color={Colors.text.dark} />
              <Text style={styles.dropdownText}>For Organisations</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.dropdownItem} 
              onPress={() => handleMenuItemPress('/support-hub')}
            >
              <HeadphonesIcon size={20} color={Colors.text.dark} />
              <Text style={styles.dropdownText}>Support Hub</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.blue,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.text.white,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 16,
  },
  headerLogo: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 4,
  },
  chevron: {
    opacity: 0.7,
  },
  searchContainer: {
    paddingTop: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
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
    color: Colors.text.white,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    paddingTop: 100,
    paddingHorizontal: 16,
  },
  dropdown: {
    backgroundColor: Colors.background.card,
    borderRadius: 12,
    padding: 12,
    minWidth: 220,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  dropdownText: {
    fontSize: 17,
    color: Colors.text.dark,
    marginLeft: 14,
    fontWeight: '500',
  },
});