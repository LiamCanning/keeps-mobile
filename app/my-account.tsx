import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Stack, useRouter } from 'expo-router';
import { User, Settings, Bell, Shield, CreditCard, FileText, Check } from 'lucide-react-native';
import Colors from '@/constants/colors';

export default function MyAccountScreen() {
  const router = useRouter();
  const [partnerOptIns, setPartnerOptIns] = useState({
    rolex: true,
    nike: true,
    axa: true,
    heineken: true,
    emirates: false,
    bmw: false
  });

  const handleSettingsPress = () => {
    router.push('/settings');
  };

  const handlePaymentMethodsPress = () => {
    router.push('/payment-methods');
  };

  const togglePartnerOptIn = (partner: keyof typeof partnerOptIns) => {
    setPartnerOptIns(prev => ({
      ...prev,
      [partner]: !prev[partner]
    }));
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          headerShown: true,
          headerTitle: 'My Account',
          headerStyle: { backgroundColor: Colors.primary.blue },
          headerTintColor: Colors.text.white,
          headerTitleStyle: { fontWeight: 'bold' },
        }} 
      />
      <StatusBar style="light" />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileSection}>
          <View style={styles.profileIcon}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=200&h=200&fit=crop&crop=center' }}
              style={styles.profileImage}
            />
          </View>
          <Text style={styles.profileName}>Liam 🇬🇧</Text>
          <Text style={styles.profileEmail}>liam@keeps.sport</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Overview</Text>
          
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Total Invested:</Text>
            <Text style={styles.statValue}>£250,000</Text>
          </View>
          
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Active Investments:</Text>
            <Text style={styles.statValue}>4</Text>
          </View>
          
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Portfolio Performance:</Text>
            <Text style={[styles.statValue, { color: Colors.accent.green }]}>+18.6%</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Investment Summary</Text>
          <Text style={styles.text}>
            You are currently invested in Liverpool FC, McLaren F1, Ryder Cup, and British Cycling. 
            Your portfolio has shown consistent growth with strong performance across all assets.
          </Text>
          
          <View style={styles.aiAnalysisContainer}>
            <Text style={styles.aiAnalysisTitle}>AI Portfolio Analysis</Text>
            <Text style={styles.aiAnalysisText}>
              Based on your current investments in Football, Formula 1, Golf, and Cycling, your portfolio shows a strong preference for premium sporting assets with global appeal. Your diversification across different sports reduces risk while maintaining exposure to high-growth potential markets.
              
              {'\n\n'}Recommendation: Consider adding Tennis or Basketball assets to further diversify your portfolio. These sports offer strong commercial partnerships and year-round engagement, which could complement your existing seasonal investments and provide additional revenue streams during off-peak periods for your current holdings.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Sharing Partners</Text>
          <Text style={styles.partnerExplanation}>
            You have full control over your data sharing preferences. By opting in, you'll gain access to exclusive brand-specific discounts, premium activations, and unique experiences through the Keeps platform.
          </Text>
          <View style={styles.partnersGrid}>
            <TouchableOpacity 
              style={styles.partnerItem}
              onPress={() => togglePartnerOptIn('rolex')}
            >
              <Image 
                source={{ uri: 'https://r2-pub.rork.com/attachments/epn2r7ahj354ixvxt63p8' }} 
                style={[styles.partnerIcon, styles.rolexIcon]}
              />
              <Text style={styles.partnerName}>Rolex</Text>
              <View style={styles.checkboxContainer}>
                <View style={[styles.checkbox, partnerOptIns.rolex && styles.checkboxChecked]}>
                  {partnerOptIns.rolex && <Check size={16} color={Colors.text.white} />}
                </View>
                <Text style={styles.partnerStatus}>
                  {partnerOptIns.rolex ? 'Opted In' : 'Opted Out'}
                </Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.partnerItem}
              onPress={() => togglePartnerOptIn('nike')}
            >
              <Image 
                source={{ uri: 'https://logos-world.net/wp-content/uploads/2020/04/Nike-Logo.png' }} 
                style={[styles.partnerIcon, styles.nikeIcon]}
              />
              <Text style={styles.partnerName}>Nike</Text>
              <View style={styles.checkboxContainer}>
                <View style={[styles.checkbox, partnerOptIns.nike && styles.checkboxChecked]}>
                  {partnerOptIns.nike && <Check size={16} color={Colors.text.white} />}
                </View>
                <Text style={styles.partnerStatus}>
                  {partnerOptIns.nike ? 'Opted In' : 'Opted Out'}
                </Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.partnerItem}
              onPress={() => togglePartnerOptIn('axa')}
            >
              <Image 
                source={{ uri: 'https://r2-pub.rork.com/attachments/bibvpbijbq6tjodjzh7ug' }} 
                style={[styles.partnerIcon, styles.axaIcon]}
              />
              <Text style={styles.partnerName}>AXA</Text>
              <View style={styles.checkboxContainer}>
                <View style={[styles.checkbox, partnerOptIns.axa && styles.checkboxChecked]}>
                  {partnerOptIns.axa && <Check size={16} color={Colors.text.white} />}
                </View>
                <Text style={styles.partnerStatus}>
                  {partnerOptIns.axa ? 'Opted In' : 'Opted Out'}
                </Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.partnerItem}
              onPress={() => togglePartnerOptIn('heineken')}
            >
              <Image 
                source={{ uri: 'https://r2-pub.rork.com/attachments/ucqykkdm33mytlbooecib' }} 
                style={[styles.partnerIcon, styles.heinekenIcon]}
              />
              <Text style={styles.partnerName}>Heineken</Text>
              <View style={styles.checkboxContainer}>
                <View style={[styles.checkbox, partnerOptIns.heineken && styles.checkboxChecked]}>
                  {partnerOptIns.heineken && <Check size={16} color={Colors.text.white} />}
                </View>
                <Text style={styles.partnerStatus}>
                  {partnerOptIns.heineken ? 'Opted In' : 'Opted Out'}
                </Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.partnerItem}
              onPress={() => togglePartnerOptIn('emirates')}
            >
              <Image 
                source={{ uri: 'https://r2-pub.rork.com/attachments/nt7frvvt7k9uxifx1uayb' }} 
                style={[styles.partnerIcon, styles.emiratesIcon]}
              />
              <Text style={styles.partnerName}>Emirates</Text>
              <View style={styles.checkboxContainer}>
                <View style={[styles.checkbox, partnerOptIns.emirates && styles.checkboxChecked]}>
                  {partnerOptIns.emirates && <Check size={16} color={Colors.text.white} />}
                </View>
                <Text style={styles.partnerStatus}>
                  {partnerOptIns.emirates ? 'Opted In' : 'Opted Out'}
                </Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.partnerItem}
              onPress={() => togglePartnerOptIn('bmw')}
            >
              <Image 
                source={{ uri: 'https://logos-world.net/wp-content/uploads/2020/04/BMW-Logo.png' }} 
                style={[styles.partnerIcon, styles.bmwIcon]}
              />
              <Text style={styles.partnerName}>BMW</Text>
              <View style={styles.checkboxContainer}>
                <View style={[styles.checkbox, partnerOptIns.bmw && styles.checkboxChecked]}>
                  {partnerOptIns.bmw && <Check size={16} color={Colors.text.white} />}
                </View>
                <Text style={styles.partnerStatus}>
                  {partnerOptIns.bmw ? 'Opted In' : 'Opted Out'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          
          <TouchableOpacity style={styles.menuItem} onPress={handleSettingsPress}>
            <Settings size={24} color={Colors.text.light} />
            <Text style={styles.menuText}>Settings</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Bell size={24} color={Colors.text.light} />
            <Text style={styles.menuText}>Notifications</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Shield size={24} color={Colors.text.light} />
            <Text style={styles.menuText}>Security</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem} onPress={handlePaymentMethodsPress}>
            <CreditCard size={24} color={Colors.text.light} />
            <Text style={styles.menuText}>Payment Methods</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <FileText size={24} color={Colors.text.light} />
            <Text style={styles.menuText}>Documents</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.blue,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  profileSection: {
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    padding: 24,
    marginTop: 16,
    alignItems: 'center',
  },
  profileIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    overflow: 'hidden',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: Colors.text.light,
  },
  section: {
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 16,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statLabel: {
    fontSize: 16,
    color: Colors.text.light,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.dark,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  menuText: {
    fontSize: 16,
    color: Colors.text.dark,
    marginLeft: 16,
    fontWeight: '500',
  },
  text: {
    fontSize: 16,
    color: Colors.text.dark,
    lineHeight: 24,
  },
  partnersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  partnerItem: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    padding: 16,
    width: '48%',
    marginBottom: 12,
  },
  partnerIcon: {
    width: 50,
    height: 25,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  partnerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 4,
  },
  partnerStatus: {
    fontSize: 12,
    color: Colors.text.light,
    marginLeft: 8,
  },
  aiAnalysisContainer: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    borderLeftWidth: 4,
    borderLeftColor: Colors.accent.green,
  },
  aiAnalysisTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 8,
  },
  aiAnalysisText: {
    fontSize: 14,
    color: Colors.text.dark,
    lineHeight: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background.card,
  },
  checkboxChecked: {
    backgroundColor: Colors.accent.green,
    borderColor: Colors.accent.green,
  },
  partnerExplanation: {
    fontSize: 14,
    color: Colors.text.light,
    lineHeight: 20,
    marginBottom: 16,
  },
  rolexIcon: {
    marginLeft: -2,
  },
  nikeIcon: {
    marginLeft: -1,
  },
  axaIcon: {
    marginLeft: -12,
  },
  heinekenIcon: {
    marginLeft: -4,
  },
  emiratesIcon: {
    marginLeft: -16,
  },
  bmwIcon: {
    marginLeft: -6,
  },
});