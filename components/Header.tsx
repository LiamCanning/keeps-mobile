import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Modal, Dimensions, Platform } from 'react-native';
import { ChevronDown, User, Info, Mail, HelpCircle, TrendingUp, Building, Newspaper, HeadphonesIcon } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';

interface HeaderProps {
  username: string;
}

export default function Header({ username }: HeaderProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const { width } = Dimensions.get('window');
  const isDesktop = Platform.OS === 'web' && width > 768;
  
  const handleCommunityPress = () => {
    router.push('/community-feed');
  };
  
  const handleLogoPress = () => {
    setShowDropdown(!showDropdown);
  };
  
  const handleMenuItemPress = (route: string) => {
    setShowDropdown(false);
    router.push(route);
  };
  
  return (
    <View style={[styles.container, { paddingTop: insets.top + 20 }, isDesktop && styles.desktopContainer]}>
      <TouchableOpacity style={[styles.logoContainer, isDesktop && styles.desktopLogoContainer]} onPress={handleLogoPress}>
        <Image 
          source={{ uri: 'https://r2-pub.rork.com/attachments/deijf9ahr9tnz07gsupjf' }} 
          style={[styles.logo, isDesktop && styles.desktopLogo]}
        />
        <ChevronDown size={16} color={Colors.primary.blue} style={styles.chevron} />
      </TouchableOpacity>
      
      <View style={styles.welcomeContainer}>
        <Text style={[styles.greeting, isDesktop && styles.desktopGreeting]}>Hello {username}</Text>
        <Text style={[styles.welcome, isDesktop && styles.desktopWelcome]}>Welcome Back!</Text>
      </View>
      

      
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
          <View style={[styles.dropdown, isDesktop && styles.desktopDropdown]}>
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
            
            <TouchableOpacity 
              style={styles.dropdownItem} 
              onPress={() => handleMenuItemPress('/my-account')}
            >
              <User size={20} color={Colors.text.dark} />
              <Text style={styles.dropdownText}>My Account</Text>
            </TouchableOpacity>
            

          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  desktopContainer: {
    paddingHorizontal: 32,
    paddingBottom: 24,
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.text.white,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 12,
  },
  desktopLogoContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 16,
  },
  logo: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    marginRight: 4,
  },
  desktopLogo: {
    width: 40,
    height: 40,
    marginRight: 6,
  },
  welcomeContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: 14,
    color: Colors.text.white,
    opacity: 0.8,
  },
  desktopGreeting: {
    fontSize: 16,
  },
  welcome: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text.white,
  },
  desktopWelcome: {
    fontSize: 28,
  },
  messageButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.text.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chevron: {
    opacity: 0.7,
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
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  desktopDropdown: {
    minWidth: 250,
    padding: 12,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  dropdownText: {
    fontSize: 16,
    color: Colors.text.dark,
    marginLeft: 12,
    fontWeight: '500',
  },
});