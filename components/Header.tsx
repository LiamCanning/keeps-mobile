import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Modal } from 'react-native';
import { MessageCircle, ChevronDown, User, Info, Mail, HelpCircle, TrendingUp, Building, Newspaper, HeadphonesIcon } from 'lucide-react-native';
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
    <View style={[styles.container, { paddingTop: insets.top + 20 }]}>
      <TouchableOpacity style={styles.logoContainer} onPress={handleLogoPress}>
        <Image 
          source={{ uri: 'https://r2-pub.rork.com/attachments/deijf9ahr9tnz07gsupjf' }} 
          style={styles.logo}
        />
        <ChevronDown size={16} color={Colors.primary.blue} style={styles.chevron} />
      </TouchableOpacity>
      
      <View style={styles.welcomeContainer}>
        <Text style={styles.greeting}>Hello {username}</Text>
        <Text style={styles.welcome}>Welcome Back!</Text>
      </View>
      
      <TouchableOpacity style={styles.messageButton} onPress={handleCommunityPress}>
        <MessageCircle color={Colors.primary.blue} size={24} />
      </TouchableOpacity>
      
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
              onPress={() => handleMenuItemPress('/my-account')}
            >
              <User size={20} color={Colors.text.dark} />
              <Text style={styles.dropdownText}>My Account</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.dropdownItem} 
              onPress={() => handleMenuItemPress('/contact-us')}
            >
              <Mail size={20} color={Colors.text.dark} />
              <Text style={styles.dropdownText}>Contact Us</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.dropdownItem} 
              onPress={() => handleMenuItemPress('/faqs')}
            >
              <HelpCircle size={20} color={Colors.text.dark} />
              <Text style={styles.dropdownText}>FAQs</Text>
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
              onPress={() => handleMenuItemPress('/investor-insights')}
            >
              <User size={20} color={Colors.text.dark} />
              <Text style={styles.dropdownText}>Investor Insights</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.dropdownItem} 
              onPress={() => handleMenuItemPress('/newsroom')}
            >
              <Newspaper size={20} color={Colors.text.dark} />
              <Text style={styles.dropdownText}>Newsroom</Text>
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
              onPress={() => handleMenuItemPress('/for-organisations')}
            >
              <Building size={20} color={Colors.text.dark} />
              <Text style={styles.dropdownText}>For Organisations</Text>
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
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.text.white,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 12,
  },
  logo: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    marginRight: 4,
  },
  welcomeContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: 14,
    color: Colors.text.white,
    opacity: 0.8,
  },
  welcome: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text.white,
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