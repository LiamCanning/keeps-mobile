import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { MessageCircle } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';

interface HeaderProps {
  username: string;
}

export default function Header({ username }: HeaderProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  
  const handleCommunityPress = () => {
    router.push('/community-feed');
  };
  
  return (
    <View style={[styles.container, { paddingTop: insets.top + 20 }]}>
      <View style={styles.logoContainer}>
        <Image 
          source={{ uri: 'https://r2-pub.rork.com/attachments/deijf9ahr9tnz07gsupjf' }} 
          style={styles.logo}
        />
      </View>
      
      <View style={styles.welcomeContainer}>
        <Text style={styles.greeting}>Hello {username}</Text>
        <Text style={styles.welcome}>Welcome Back!</Text>
      </View>
      
      <TouchableOpacity style={styles.messageButton} onPress={handleCommunityPress}>
        <MessageCircle color={Colors.primary.blue} size={24} />
      </TouchableOpacity>
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
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: Colors.text.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    padding: 4,
  },
  logo: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
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
});