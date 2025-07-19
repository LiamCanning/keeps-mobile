import React from 'react';
import { StyleSheet, View, ScrollView, Text, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import { TrendingUp, Users, Gift, Target, Shield, Zap } from 'lucide-react-native';
import Colors from '@/constants/colors';
import BackButton from '@/components/BackButton';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          headerShown: true,
          headerTitle: 'About Keeps',
          headerStyle: { backgroundColor: Colors.primary.blue },
          headerTintColor: Colors.text.white,
          headerTitleStyle: { fontWeight: 'bold' },
          headerLeft: () => <BackButton />,
        }} 
      />
      <StatusBar style="light" />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.heroSection}>
          <View style={styles.logoContainer}>
            <Image 
              source={{ uri: 'https://r2-pub.rork.com/attachments/94wbcnfwavzhobdmcgdzb' }}
              style={styles.logoImage}
            />
          </View>
          <Text style={styles.heroText}>
            Democratising sports investment for passionate fans worldwide
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Who We Are</Text>
          <Text style={styles.text}>
            Keeps is the world's first platform that democratises sports investment, giving passionate fans 
            direct access to invest in their favourite teams and athletes. We bridge the gap between fandom 
            and financial opportunity.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>What We Offer</Text>
          <Text style={styles.text}>
            • Primary market investments in elite sports assets like Liverpool FC, McLaren Racing, and Ryder Cup
            • Secondary market trading for liquidity and portfolio management
            • Exclusive investor benefits including VIP access, merchandise discounts, and behind-the-scenes experiences
            • Transparent returns ranging from 4-12% annually depending on the asset
          </Text>
        </View>

        <View style={styles.visualsContainer}>
          <View style={styles.visualCard}>
            <Target size={40} color={Colors.primary.orange} />
            <Text style={styles.visualTitle}>Primary Market</Text>
            <Text style={styles.visualText}>Direct investment in sports assets with exclusive access</Text>
          </View>
          
          <View style={styles.visualCard}>
            <Users size={40} color={Colors.accent.blue} />
            <Text style={styles.visualTitle}>Secondary Market</Text>
            <Text style={styles.visualText}>Trade your investments with other passionate fans</Text>
          </View>
          
          <View style={styles.visualCard}>
            <Gift size={40} color={Colors.accent.green} />
            <Text style={styles.visualTitle}>Exclusive Benefits</Text>
            <Text style={styles.visualText}>VIP experiences and merchandise discounts</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Why We Do It</Text>
          <Text style={styles.text}>
            Sports have the power to unite people across cultures and backgrounds. We believe that passionate 
            fans should have the opportunity to financially benefit from the success of the teams and athletes 
            they support, whilst helping to fund the future of sport.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Our Values</Text>
          <View style={styles.valuesList}>
            <View style={styles.valueItem}>
              <Shield size={24} color={Colors.accent.green} />
              <Text style={styles.valueText}>Transparency in all investments and returns</Text>
            </View>
            <View style={styles.valueItem}>
              <Zap size={24} color={Colors.primary.orange} />
              <Text style={styles.valueText}>Innovation in sports finance and fan engagement</Text>
            </View>
            <View style={styles.valueItem}>
              <Users size={24} color={Colors.accent.blue} />
              <Text style={styles.valueText}>Community-driven investment opportunities</Text>
            </View>
          </View>
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
  heroSection: {
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    padding: 24,
    marginTop: 16,
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  heroText: {
    fontSize: 18,
    color: Colors.text.light,
    textAlign: 'center',
    lineHeight: 24,
  },
  section: {
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    color: Colors.text.dark,
    lineHeight: 24,
  },
  visualsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  visualCard: {
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    padding: 20,
    width: '48%',
    alignItems: 'center',
    marginBottom: 16,
  },
  visualTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginTop: 12,
    marginBottom: 8,
    textAlign: 'center',
  },
  visualText: {
    fontSize: 14,
    color: Colors.text.light,
    textAlign: 'center',
    lineHeight: 18,
  },
  valuesList: {
    marginTop: 12,
  },
  valueItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  valueText: {
    fontSize: 16,
    color: Colors.text.dark,
    marginLeft: 12,
    flex: 1,
    lineHeight: 22,
  },
});