import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Stack, useRouter } from 'expo-router';
import { User, Settings, Bell, Shield, CreditCard, FileText, Check, TrendingUp, Award, Star, MapPin, Calendar } from 'lucide-react-native';
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
        <View style={styles.profileHeader}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=200&h=200&fit=crop&crop=center' }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Liam Canning</Text>
            <Text style={styles.profileHandle}>@liam_canning</Text>
            <View style={styles.locationContainer}>
              <MapPin size={16} color={Colors.text.light} />
              <Text style={styles.locationText}>🇬🇧 London, United Kingdom</Text>
            </View>
            <View style={styles.joinedContainer}>
              <Calendar size={16} color={Colors.text.light} />
              <Text style={styles.joinedText}>Joined March 2023</Text>
            </View>
          </View>
        </View>

        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <TrendingUp size={20} color={Colors.accent.green} />
            <Text style={styles.statValue}>£250,000</Text>
            <Text style={styles.statLabel}>Total Invested</Text>
          </View>
          <View style={styles.statCard}>
            <Award size={20} color={Colors.accent.blue} />
            <Text style={styles.statValue}>4</Text>
            <Text style={styles.statLabel}>Active Assets</Text>
          </View>
          <View style={styles.statCard}>
            <Star size={20} color={Colors.accent.orange} />
            <Text style={styles.statValue}>+18.6%</Text>
            <Text style={styles.statLabel}>Portfolio Growth</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.aboutText}>
            Passionate sports investor and Liverpool FC supporter. Love backing innovative sports ventures and connecting with fellow investors. Always looking for the next big opportunity in sports finance.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Investment Portfolio</Text>
          <View style={styles.investmentGrid}>
            <View style={styles.investmentCard}>
              <Text style={styles.investmentAsset}>Liverpool FC</Text>
              <Text style={styles.investmentAmount}>£25,000</Text>
              <Text style={styles.investmentTier}>Gold Tier</Text>
              <Text style={styles.investmentReturn}>4-8% annually</Text>
            </View>
            <View style={styles.investmentCard}>
              <Text style={styles.investmentAsset}>McLaren Racing</Text>
              <Text style={styles.investmentAmount}>£200,000</Text>
              <Text style={styles.investmentTier}>Diamond Tier</Text>
              <Text style={styles.investmentReturn}>6-12% annually</Text>
            </View>
            <View style={styles.investmentCard}>
              <Text style={styles.investmentAsset}>Ryder Cup</Text>
              <Text style={styles.investmentAmount}>£15,000</Text>
              <Text style={styles.investmentTier}>Silver Tier</Text>
              <Text style={styles.investmentReturn}>5% + Principal</Text>
            </View>
            <View style={styles.investmentCard}>
              <Text style={styles.investmentAsset}>British Cycling</Text>
              <Text style={styles.investmentAmount}>£10,000</Text>
              <Text style={styles.investmentTier}>Gold Tier</Text>
              <Text style={styles.investmentReturn}>6% + Principal</Text>
            </View>
          </View>
          
          <View style={styles.aiAnalysisContainer}>
            <Text style={styles.aiAnalysisTitle}>AI Portfolio Analysis</Text>
            <Text style={styles.aiAnalysisText}>
              Your portfolio shows strong diversification across different sports sectors. McLaren Racing (80% of holdings) represents a significant concentration risk, but its strong performance (+12.3% YTD) justifies the allocation. Consider adding exposure to emerging sports markets for additional growth potential. Your current projected annual return is 7.8%, outperforming the sports investment index by 2.1%.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Favourite Sports Teams</Text>
          <View style={styles.teamsContainer}>
            <View style={styles.teamItem}>
              <Text style={styles.teamEmoji}>⚽</Text>
              <Text style={styles.teamName}>Liverpool FC</Text>
            </View>
            <View style={styles.teamItem}>
              <Text style={styles.teamEmoji}>⚽</Text>
              <Text style={styles.teamName}>Ryder Cup</Text>
            </View>
            <View style={styles.teamItem}>
              <Text style={styles.teamEmoji}>🚴</Text>
              <Text style={styles.teamName}>British Cycling</Text>
            </View>
            <View style={styles.teamItem}>
              <Text style={styles.teamEmoji}>🏏</Text>
              <Text style={styles.teamName}>England Cricket</Text>
            </View>
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
                source={{ uri: 'https://r2-pub.rork.com/attachments/j25xdtg1yoju10t0vncri' }} 
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
                source={{ uri: 'https://r2-pub.rork.com/attachments/1ze85s45xe6wvcfmplhg0' }} 
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
  profileHeader: {
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 4,
  },
  profileHandle: {
    fontSize: 16,
    color: Colors.text.light,
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  locationText: {
    fontSize: 14,
    color: Colors.text.light,
    marginLeft: 4,
  },
  joinedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  joinedText: {
    fontSize: 14,
    color: Colors.text.light,
    marginLeft: 4,
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  statCard: {
    backgroundColor: Colors.background.card,
    borderRadius: 12,
    padding: 16,
    width: '31%',
    alignItems: 'center',
  },
  aboutText: {
    fontSize: 16,
    color: Colors.text.light,
    lineHeight: 24,
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
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.text.light,
    textAlign: 'center',
  },
  investmentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  investmentCard: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    padding: 16,
    width: '48%',
    marginBottom: 12,
  },
  investmentAsset: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 4,
  },
  investmentAmount: {
    fontSize: 14,
    color: Colors.primary.orange,
    fontWeight: '600',
    marginBottom: 4,
  },
  investmentTier: {
    fontSize: 12,
    color: Colors.text.light,
    marginBottom: 4,
  },
  investmentReturn: {
    fontSize: 11,
    color: Colors.accent.green,
    fontWeight: '600',
  },
  teamsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  teamItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    padding: 12,
    width: '48%',
    marginBottom: 8,
  },
  teamEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  teamName: {
    fontSize: 14,
    color: Colors.text.dark,
    fontWeight: '600',
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
    marginLeft: -2,
  },
  emiratesIcon: {
    marginLeft: -14,
  },
  bmwIcon: {
    marginLeft: -8,
  },
});