import React from 'react';
import { StyleSheet, View, ScrollView, Text, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import { TrendingUp, Users, Gift } from 'lucide-react-native';
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
            <Text style={styles.logoText}>K</Text>
            <Text style={styles.title}>eeps</Text>
          </View>
          <Text style={styles.heroText}>
            Democratising sports investment for passionate fans worldwide
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>What Keeps Offers</Text>
          <Text style={styles.text}>
            A platform for investing in sports assets like Liverpool FC, Cardiff City, and McLaren Racing, 
            with secondary markets, investor benefits, and data insights. Turn your passion into profit.
          </Text>
        </View>

        <View style={styles.visualsContainer}>
          <View style={styles.visualCard}>
            <TrendingUp size={40} color={Colors.primary.orange} />
            <Text style={styles.visualTitle}>Sample Investment</Text>
            <Text style={styles.visualText}>Liverpool FC Equity - 4-8% Returns</Text>
          </View>
          
          <View style={styles.visualCard}>
            <Users size={40} color={Colors.accent.blue} />
            <Text style={styles.visualTitle}>Secondary Market</Text>
            <Text style={styles.visualText}>Trade your investments with other fans</Text>
          </View>
          
          <View style={styles.visualCard}>
            <Gift size={40} color={Colors.accent.green} />
            <Text style={styles.visualTitle}>Investor Benefits</Text>
            <Text style={styles.visualText}>Exclusive merchandise & VIP access</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Our Mission</Text>
          <Text style={styles.text}>
            To create a world where passionate fans can directly invest in and benefit from the success 
            of the sports they love, whilst providing teams and athletes with innovative funding solutions.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Why Choose Keeps?</Text>
          <Text style={styles.text}>
            We combine the passion of sports fandom with the potential of smart investing. Our platform 
            offers transparency, security, and exclusive access to opportunities that were previously 
            only available to institutional investors.
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: Colors.primary.orange,
    backgroundColor: Colors.primary.blue,
    width: 50,
    height: 50,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 25,
    overflow: 'hidden',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginLeft: 8,
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
});