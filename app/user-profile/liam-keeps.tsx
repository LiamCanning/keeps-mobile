import React from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Stack, useRouter } from 'expo-router';
import { MessageCircle, MapPin, Calendar, TrendingUp, Heart, Trophy } from 'lucide-react-native';
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
          headerTitle: 'Liam Keeps',
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
            <Text style={styles.profileName}>Liam Keeps</Text>
            <Text style={styles.profileHandle}>@liam_keeps</Text>
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

        {/* Investment Info */}
        <View style={styles.investmentContainer}>
          <View style={styles.sectionHeader}>
            <TrendingUp size={20} color={Colors.primary.orange} />
            <Text style={styles.sectionTitle}>Investment Portfolio</Text>
          </View>
          <Text style={styles.investmentValue}>
            Total Invested: £250,000
          </Text>
          <View style={styles.assetsContainer}>
            <Text style={styles.assetsTitle}>Assets Owned:</Text>
            <Text style={styles.assetItem}>• Liverpool FC</Text>
            <Text style={styles.assetItem}>• McLaren Racing</Text>
            <Text style={styles.assetItem}>• British Cycling</Text>
            <Text style={styles.assetItem}>• Ryder Cup</Text>
          </View>
        </View>

        {/* Favourite Teams */}
        <View style={styles.teamsContainer}>
          <View style={styles.sectionHeader}>
            <Heart size={20} color={Colors.accent.red} />
            <Text style={styles.sectionTitle}>Favourite Teams</Text>
          </View>
          <Text style={styles.teamItem}>• Liverpool FC</Text>
          <Text style={styles.teamItem}>• McLaren F1</Text>
          <Text style={styles.teamItem}>• England Rugby</Text>
          <Text style={styles.teamItem}>• England Cricket</Text>
        </View>

        {/* Achievements */}
        <View style={styles.achievementsContainer}>
          <View style={styles.sectionHeader}>
            <Trophy size={20} color={Colors.accent.gold} />
            <Text style={styles.sectionTitle}>Achievements</Text>
          </View>
          <View style={styles.achievementItem}>
            <Trophy size={16} color={Colors.accent.gold} />
            <Text style={styles.achievementText}>Early Investor</Text>
          </View>
          <View style={styles.achievementItem}>
            <Trophy size={16} color={Colors.accent.gold} />
            <Text style={styles.achievementText}>Top 10% Returns</Text>
          </View>
          <View style={styles.achievementItem}>
            <Trophy size={16} color={Colors.accent.gold} />
            <Text style={styles.achievementText}>Community Champion</Text>
          </View>
          <View style={styles.achievementItem}>
            <Trophy size={16} color={Colors.accent.gold} />
            <Text style={styles.achievementText}>Gold Tier Investor</Text>
          </View>
        </View>

        {/* Data Sharing Partners */}
        <View style={styles.partnersContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Data Sharing Partners</Text>
          </View>
          <View style={styles.partnersGrid}>
            <View style={styles.partnerItem}>
              <Image 
                source={{ uri: 'https://r2-pub.rork.com/attachments/lwg9vgr5tkbyjp3fd3q5w' }} 
                style={styles.partnerLogo}
              />
              <Text style={styles.partnerName}>Mastercard</Text>
              <Text style={styles.partnerStatus}>✓ Opted In</Text>
            </View>
            <View style={styles.partnerItem}>
              <Image 
                source={{ uri: 'https://r2-pub.rork.com/attachments/4a2qfbukp621sf3wt9dr3' }} 
                style={styles.partnerLogo}
              />
              <Text style={styles.partnerName}>Samsung</Text>
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
    padding: 16,
  },
  profileHeader: {
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
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
    marginLeft: 6,
  },
  joinedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  joinedText: {
    fontSize: 14,
    color: Colors.text.light,
    marginLeft: 6,
  },
  investmentContainer: {
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginLeft: 8,
  },
  investmentValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary.orange,
    marginBottom: 12,
  },
  assetsContainer: {
    marginTop: 8,
  },
  assetsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text.dark,
    marginBottom: 8,
  },
  assetItem: {
    fontSize: 14,
    color: Colors.text.dark,
    marginBottom: 4,
  },
  teamsContainer: {
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  teamItem: {
    fontSize: 14,
    color: Colors.text.dark,
    marginBottom: 4,
  },
  achievementsContainer: {
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  achievementText: {
    fontSize: 14,
    color: Colors.text.dark,
    marginLeft: 8,
    fontWeight: '600',
  },
  partnersContainer: {
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  partnersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  partnerItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 16,
    padding: 12,
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
  },
  partnerLogo: {
    width: 60,
    height: 30,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  partnerName: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.text.dark,
    textAlign: 'center',
    marginBottom: 4,
  },
  partnerStatus: {
    fontSize: 10,
    color: Colors.text.light,
    textAlign: 'center',
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
});