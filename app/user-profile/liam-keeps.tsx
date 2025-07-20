import React from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Stack, useRouter } from 'expo-router';
import { MessageCircle, MapPin, Calendar, TrendingUp, Star, Award } from 'lucide-react-native';
import Colors from '@/constants/colors';
import BackButton from '@/components/BackButton';

export default function LiamKeepsProfileScreen() {
  const router = useRouter();

  const handleMessagePress = () => {
    router.push('/messages');
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          headerShown: true,
          headerTitle: 'Profile',
          headerStyle: { backgroundColor: Colors.primary.blue },
          headerTintColor: Colors.text.white,
          headerTitleStyle: { fontWeight: 'bold' },
          headerLeft: () => <BackButton />,
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
              <Text style={styles.investmentAmount}>£100,000</Text>
              <Text style={styles.investmentTier}>Gold Tier</Text>
            </View>
            <View style={styles.investmentCard}>
              <Text style={styles.investmentAsset}>McLaren Racing</Text>
              <Text style={styles.investmentAmount}>£75,000</Text>
              <Text style={styles.investmentTier}>Silver Tier</Text>
            </View>
            <View style={styles.investmentCard}>
              <Text style={styles.investmentAsset}>British Cycling</Text>
              <Text style={styles.investmentAmount}>£10,000</Text>
              <Text style={styles.investmentTier}>Gold Tier</Text>
            </View>
            <View style={styles.investmentCard}>
              <Text style={styles.investmentAsset}>Ryder Cup</Text>
              <Text style={styles.investmentAmount}>£25,000</Text>
              <Text style={styles.investmentTier}>Bronze Tier</Text>
            </View>
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
              <Text style={styles.teamEmoji}>🏎️</Text>
              <Text style={styles.teamName}>McLaren F1</Text>
            </View>
            <View style={styles.teamItem}>
              <Text style={styles.teamEmoji}>🏉</Text>
              <Text style={styles.teamName}>England Rugby</Text>
            </View>
            <View style={styles.teamItem}>
              <Text style={styles.teamEmoji}>🏏</Text>
              <Text style={styles.teamName}>England Cricket</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Investment Interests</Text>
          <View style={styles.interestsContainer}>
            <View style={styles.interestTag}>
              <Text style={styles.interestText}>Football</Text>
            </View>
            <View style={styles.interestTag}>
              <Text style={styles.interestText}>Formula 1</Text>
            </View>
            <View style={styles.interestTag}>
              <Text style={styles.interestText}>Rugby</Text>
            </View>
            <View style={styles.interestTag}>
              <Text style={styles.interestText}>Cycling</Text>
            </View>
            <View style={styles.interestTag}>
              <Text style={styles.interestText}>Golf</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Sharing Partners</Text>
          <View style={styles.partnersGrid}>
            <View style={styles.partnerItem}>
              <Image 
                source={{ uri: 'https://1000logos.net/wp-content/uploads/2017/02/Heineken-Logo.png' }} 
                style={styles.partnerIcon}
              />
              <Text style={styles.partnerName}>Heineken</Text>
              <Text style={styles.partnerStatus}>✓ Opted In</Text>
            </View>
            <View style={styles.partnerItem}>
              <Image 
                source={{ uri: 'https://1000logos.net/wp-content/uploads/2016/11/google-logo.png' }} 
                style={styles.partnerIcon}
              />
              <Text style={styles.partnerName}>Google</Text>
              <Text style={styles.partnerStatus}>✓ Opted In</Text>
            </View>
            <View style={styles.partnerItem}>
              <Image 
                source={{ uri: 'https://1000logos.net/wp-content/uploads/2017/02/Rolex-Logo.png' }} 
                style={styles.partnerIcon}
              />
              <Text style={styles.partnerName}>Rolex</Text>
              <Text style={styles.partnerStatus}>✓ Opted In</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.messageButton} onPress={handleMessagePress}>
          <MessageCircle size={20} color={Colors.text.white} />
          <Text style={styles.messageButtonText}>Send Message</Text>
        </TouchableOpacity>
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
  section: {
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 16,
  },
  aboutText: {
    fontSize: 16,
    color: Colors.text.light,
    lineHeight: 24,
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
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  interestTag: {
    backgroundColor: Colors.primary.orange,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  interestText: {
    fontSize: 12,
    color: Colors.text.white,
    fontWeight: '600',
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
  },
  messageButton: {
    backgroundColor: Colors.primary.orange,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  messageButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.white,
    marginLeft: 8,
  },
  partnerIcon: {
    width: 50,
    height: 25,
    resizeMode: 'contain',
    marginBottom: 8,
  },
});