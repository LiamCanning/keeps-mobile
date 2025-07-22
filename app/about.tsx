import React from 'react';
import { StyleSheet, View, ScrollView, Text, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import { TrendingUp, Users, Gift, Target, Shield, Zap, BarChart3 } from 'lucide-react-native';
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
              source={{ uri: 'https://r2-pub.rork.com/attachments/lyp9shhwsvzuzg7chf3vq' }}
              style={styles.logoImage}
            />
          </View>
          <Text style={styles.heroSubtitle}>Sports Investment Platform</Text>
          <Text style={styles.heroText}>
            Democratising sports investment by enabling access to passionate fans worldwide
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Journey</Text>
          
          <View style={styles.journeyStep}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Who We Are</Text>
              <Text style={styles.stepText}>
                Keeps is the world's first platform that democratises sports investment, giving passionate fans 
                direct access to invest in their favourite teams and athletes. We bridge the gap between fandom 
                and financial opportunity.
              </Text>
            </View>
          </View>
          
          <View style={styles.journeyStep}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>What We Offer</Text>
              <Text style={styles.stepText}>
                Primary market investments in elite sports assets like Liverpool FC, McLaren Racing, and Ryder Cup. 
                Secondary market trading for liquidity and portfolio management. Exclusive investor benefits including 
                VIP access, merchandise discounts, and behind-the-scenes experiences with transparent returns ranging 
                from 4-12% annually.
              </Text>
            </View>
          </View>

          <View style={styles.journeyStep}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Why We Do It</Text>
              <Text style={styles.stepText}>
                Sports have the power to unite people across cultures and backgrounds. We believe that passionate 
                fans should have the opportunity to financially benefit from the success of the teams and athletes 
                they support, whilst helping to fund the future of sport.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How It Works</Text>
          <View style={styles.visualsContainer}>
            <View style={styles.visualCard}>
              <Target size={40} color={Colors.primary.orange} />
              <Text style={styles.visualTitle}>Primary Market</Text>
              <Text style={styles.visualText}>Direct investment in sports assets with exclusive access and benefits</Text>
            </View>
            
            <View style={styles.visualCard}>
              <Users size={40} color={Colors.accent.blue} />
              <Text style={styles.visualTitle}>Secondary Market</Text>
              <Text style={styles.visualText}>Trade your investments with other passionate fans for liquidity</Text>
            </View>
            
            <View style={styles.visualCard}>
              <Gift size={40} color={Colors.accent.green} />
              <Text style={styles.visualTitle}>Exclusive Benefits</Text>
              <Text style={styles.visualText}>VIP experiences, merchandise discounts, and behind-the-scenes access</Text>
            </View>
            
            <View style={styles.visualCard}>
              <BarChart3 size={40} color={Colors.primary.blue} />
              <Text style={styles.visualTitle}>Portfolio Tracking</Text>
              <Text style={styles.visualText}>Monitor your investments with real-time performance analytics and insights</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Values</Text>
          <View style={styles.valuesList}>
            <View style={styles.valueItem}>
              <Shield size={24} color={Colors.accent.green} />
              <View style={styles.valueContent}>
                <Text style={styles.valueTitle}>Transparency</Text>
                <Text style={styles.valueText}>Complete transparency in all investments, returns, and asset performance</Text>
              </View>
            </View>
            <View style={styles.valueItem}>
              <Zap size={24} color={Colors.primary.orange} />
              <View style={styles.valueContent}>
                <Text style={styles.valueTitle}>Innovation</Text>
                <Text style={styles.valueText}>Pioneering new approaches to sports finance and fan engagement</Text>
              </View>
            </View>
            <View style={styles.valueItem}>
              <Users size={24} color={Colors.accent.blue} />
              <View style={styles.valueContent}>
                <Text style={styles.valueTitle}>Community</Text>
                <Text style={styles.valueText}>Building a community of passionate sports investors and fans</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Investment Opportunities</Text>
          <Text style={styles.text}>
            From Premier League football clubs to Formula 1 racing teams, from golf's most prestigious tournaments 
            to emerging sports leagues - Keeps provides access to a diverse portfolio of sports investment opportunities 
            that were previously only available to institutional investors.
          </Text>
          <Text style={styles.text}>
            Our platform offers equity stakes, debenture programmes, and income-sharing agreements across multiple 
            sports and entertainment properties, allowing you to build a diversified sports investment portfolio.
          </Text>
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
    paddingBottom: 32,
  },
  heroSection: {
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    padding: 24,
    marginTop: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  logoImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  heroSubtitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primary.orange,
    marginBottom: 16,
    textAlign: 'center',
  },
  heroText: {
    fontSize: 16,
    color: Colors.text.dark,
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '500',
    paddingHorizontal: 8,
  },
  section: {
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 20,
    textAlign: 'center',
  },
  journeyStep: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary.orange,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    marginTop: 4,
  },
  stepNumberText: {
    color: Colors.text.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 8,
  },
  stepText: {
    fontSize: 16,
    color: Colors.text.dark,
    lineHeight: 24,
  },
  text: {
    fontSize: 16,
    color: Colors.text.dark,
    lineHeight: 24,
    marginBottom: 16,
  },
  visualsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  visualCard: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    padding: 20,
    width: '48%',
    alignItems: 'center',
    marginBottom: 16,
    minHeight: 160,
    justifyContent: 'space-between',
  },
  visualTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  visualText: {
    fontSize: 14,
    color: Colors.text.light,
    textAlign: 'center',
    lineHeight: 20,
    flex: 1,
  },
  valuesList: {
    marginTop: 8,
  },
  valueItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  valueContent: {
    flex: 1,
    marginLeft: 12,
  },
  valueTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 4,
  },
  valueText: {
    fontSize: 14,
    color: Colors.text.light,
    lineHeight: 20,
  },
});