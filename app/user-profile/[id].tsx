import React from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { MessageCircle, MapPin, Heart, Trophy, TrendingUp } from 'lucide-react-native';
import Colors from '@/constants/colors';
import BackButton from '@/components/BackButton';

interface UserProfile {
  id: string;
  username: string;
  handle: string;
  avatar: string;
  country: string;
  flag: string;
  city: string;
  bio: string;
  joinDate: string;
  totalInvestments: number;
  favoriteTeams: string[];
  assetsOwned: string[];
  achievements: string[];
  followers: number;
  following: number;
  posts: number;
}

const userProfiles: { [key: string]: UserProfile } = {
  'james-mitchell': {
    id: 'james-mitchell',
    username: 'James Mitchell',
    handle: '@jamesmitch_nyc',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    country: 'United States',
    flag: '🇺🇸',
    city: 'New York City',
    bio: 'Sports finance enthusiast and Liverpool FC superfan. Love investing in the teams I support!',
    joinDate: 'March 2024',
    totalInvestments: 45000,
    favoriteTeams: ['Liverpool FC', 'New York Yankees', 'Brooklyn Nets'],
    assetsOwned: ['Liverpool FC', 'McLaren Racing'],
    achievements: ['Early Investor', 'Top 10% Returns', 'Community Champion'],
    followers: 1247,
    following: 892,
    posts: 156,
  },
  'sarah-chen': {
    id: 'sarah-chen',
    username: 'Sarah Chen',
    handle: '@sarahc_investor',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    country: 'Canada',
    flag: '🇨🇦',
    city: 'Toronto',
    bio: 'Formula 1 fanatic and tech investor. Combining my passion for racing with smart investments.',
    joinDate: 'January 2024',
    totalInvestments: 78000,
    favoriteTeams: ['McLaren Racing', 'Toronto Raptors', 'Toronto FC'],
    assetsOwned: ['McLaren Racing', 'British Cycling'],
    achievements: ['Diamond Tier', 'F1 Expert', 'High Roller'],
    followers: 2156,
    following: 543,
    posts: 89,
  },
  'michael-rodriguez': {
    id: 'michael-rodriguez',
    username: 'Michael Rodriguez',
    handle: '@mikerod_golf',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    country: 'Spain',
    flag: '🇪🇸',
    city: 'Madrid',
    bio: 'Golf enthusiast and sports investment strategist. Always looking for the next big opportunity.',
    joinDate: 'February 2024',
    totalInvestments: 32000,
    favoriteTeams: ['Real Madrid', 'Ryder Cup Team Europe'],
    assetsOwned: ['Ryder Cup', 'Exeter Rugby'],
    achievements: ['Golf Pro', 'Strategic Investor', 'Community Leader'],
    followers: 987,
    following: 1234,
    posts: 203,
  },
  'emma-thompson': {
    id: 'emma-thompson',
    username: 'Emma Thompson',
    handle: '@emmathompson_uk',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    country: 'United Kingdom',
    flag: '🇬🇧',
    city: 'London',
    bio: 'Sports marketing professional turned investor. Passionate about the business side of sports.',
    joinDate: 'April 2024',
    totalInvestments: 56000,
    favoriteTeams: ['Chelsea FC', 'England Rugby', 'Team GB'],
    assetsOwned: ['Liverpool FC', 'British Cycling', 'Exeter Rugby'],
    achievements: ['Marketing Expert', 'Multi-Sport Investor', 'Trend Setter'],
    followers: 1876,
    following: 654,
    posts: 127,
  },
  'david-park': {
    id: 'david-park',
    username: 'David Park',
    handle: '@davidpark_sports',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    country: 'South Korea',
    flag: '🇰🇷',
    city: 'Seoul',
    bio: 'Sports analyst and investment researcher. Bringing data-driven insights to sports finance.',
    joinDate: 'May 2024',
    totalInvestments: 41000,
    favoriteTeams: ['Tottenham Hotspur', 'LA Lakers', 'Team Korea'],
    assetsOwned: ['Liverpool FC', 'McLaren Racing'],
    achievements: ['Data Analyst', 'Research Expert', 'Rising Star'],
    followers: 743,
    following: 892,
    posts: 94,
  },
  'lisa-wang': {
    id: 'lisa-wang',
    username: 'Lisa Wang',
    handle: '@lisawang_finance',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face',
    country: 'Singapore',
    flag: '🇸🇬',
    city: 'Singapore',
    bio: 'Finance professional with a passion for sustainable sports investments and regenerative finance.',
    joinDate: 'March 2024',
    totalInvestments: 67000,
    favoriteTeams: ['Manchester City', 'Singapore Lions', 'Team Singapore'],
    assetsOwned: ['McLaren Racing', 'Ultimate Frisbee Association'],
    achievements: ['Sustainability Champion', 'Finance Expert', 'Green Investor'],
    followers: 1543,
    following: 432,
    posts: 78,
  },
  'alex-johnson': {
    id: 'alex-johnson',
    username: 'Alex Johnson',
    handle: '@alexj_investor',
    avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100&h=100&fit=crop&crop=face',
    country: 'Australia',
    flag: '🇦🇺',
    city: 'Sydney',
    bio: 'Adventure sports lover and investment enthusiast. Always seeking unique investment opportunities.',
    joinDate: 'June 2024',
    totalInvestments: 29000,
    favoriteTeams: ['Sydney FC', 'Australian Cricket Team', 'Wallabies'],
    assetsOwned: ['Exeter Rugby', 'Ultimate Frisbee Association'],
    achievements: ['Adventure Seeker', 'Unique Investor', 'Community Builder'],
    followers: 654,
    following: 789,
    posts: 112,
  },
  'sophie-martin': {
    id: 'sophie-martin',
    username: 'Sophie Martin',
    handle: '@sophiem_sports',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
    country: 'France',
    flag: '🇫🇷',
    city: 'Paris',
    bio: 'Sports journalist and investment blogger. Covering the intersection of sports and finance.',
    joinDate: 'February 2024',
    totalInvestments: 38000,
    favoriteTeams: ['Paris Saint-Germain', 'French National Team', 'Racing 92'],
    assetsOwned: ['Liverpool FC', 'British Cycling'],
    achievements: ['Sports Journalist', 'Content Creator', 'Influencer'],
    followers: 2341,
    following: 567,
    posts: 234,
  },
  'ryan-oconnor': {
    id: 'ryan-oconnor',
    username: 'Ryan O\'Connor',
    handle: '@ryanoconnor_f1',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face',
    country: 'Ireland',
    flag: '🇮🇪',
    city: 'Dublin',
    bio: 'Formula 1 superfan and motorsport investor. Living the dream through smart investments.',
    joinDate: 'January 2024',
    totalInvestments: 85000,
    favoriteTeams: ['McLaren Racing', 'Ireland Rugby', 'Celtic FC'],
    assetsOwned: ['McLaren Racing', 'Ryder Cup'],
    achievements: ['F1 Superfan', 'High Value Investor', 'Motorsport Expert'],
    followers: 1789,
    following: 234,
    posts: 167,
  },
  'maria-gonzalez': {
    id: 'maria-gonzalez',
    username: 'Maria Gonzalez',
    handle: '@mariag_liverpool',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face',
    country: 'Mexico',
    flag: '🇲🇽',
    city: 'Mexico City',
    bio: 'Liverpool FC die-hard fan and sports investment advocate. YNWA! Bringing passion to investing.',
    joinDate: 'April 2024',
    totalInvestments: 52000,
    favoriteTeams: ['Liverpool FC', 'Club América', 'Mexico National Team'],
    assetsOwned: ['Liverpool FC', 'Exeter Rugby'],
    achievements: ['Liverpool Legend', 'Passionate Investor', 'Fan Favorite'],
    followers: 1432,
    following: 876,
    posts: 189,
  },
};

export default function UserProfileScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  
  const profile = userProfiles[id as string];
  
  if (!profile) {
    return (
      <View style={styles.container}>
        <Stack.Screen 
          options={{ 
            title: 'User Not Found',
            headerStyle: { backgroundColor: Colors.primary.blue },
            headerTintColor: Colors.text.white,
            headerTitleStyle: { fontWeight: 'bold' },
            headerLeft: () => <BackButton />,
          }} 
        />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>User profile not found</Text>
        </View>
      </View>
    );
  }

  const handleSendMessage = () => {
    router.push('/messages');
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: profile.username,
          headerStyle: { backgroundColor: Colors.primary.blue },
          headerTintColor: Colors.text.white,
          headerTitleStyle: { fontWeight: 'bold' },
          headerLeft: () => <BackButton />,
        }} 
      />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Image source={{ uri: profile.avatar }} style={styles.avatar} />
          <View style={styles.profileInfo}>
            <Text style={styles.username}>{profile.username}</Text>
            <Text style={styles.handle}>{profile.handle}</Text>
            <View style={styles.locationContainer}>
              <MapPin size={16} color={Colors.text.light} />
              <Text style={styles.location}>
                {profile.flag} {profile.city}, {profile.country}
              </Text>
            </View>
          </View>
        </View>

        {/* Bio */}
        <View style={styles.bioContainer}>
          <Text style={styles.bio}>{profile.bio}</Text>
          <Text style={styles.joinDate}>Joined {profile.joinDate}</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profile.followers.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profile.following.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profile.posts}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
        </View>

        {/* Investment Info */}
        <View style={styles.investmentContainer}>
          <View style={styles.sectionHeader}>
            <TrendingUp size={20} color={Colors.primary.orange} />
            <Text style={styles.sectionTitle}>Investment Portfolio</Text>
          </View>
          <Text style={styles.investmentValue}>
            Total Invested: £{profile.totalInvestments.toLocaleString()}
          </Text>
          <View style={styles.assetsContainer}>
            <Text style={styles.assetsTitle}>Assets Owned:</Text>
            {profile.assetsOwned.map((asset, index) => (
              <Text key={index} style={styles.assetItem}>• {asset}</Text>
            ))}
          </View>
        </View>

        {/* Favorite Teams */}
        <View style={styles.teamsContainer}>
          <View style={styles.sectionHeader}>
            <Heart size={20} color={Colors.accent.red} />
            <Text style={styles.sectionTitle}>Favorite Teams</Text>
          </View>
          {profile.favoriteTeams.map((team, index) => (
            <Text key={index} style={styles.teamItem}>• {team}</Text>
          ))}
        </View>

        {/* Achievements */}
        <View style={styles.achievementsContainer}>
          <View style={styles.sectionHeader}>
            <Trophy size={20} color={Colors.accent.gold} />
            <Text style={styles.sectionTitle}>Achievements</Text>
          </View>
          {profile.achievements.map((achievement, index) => (
            <View key={index} style={styles.achievementItem}>
              <Trophy size={16} color={Colors.accent.gold} />
              <Text style={styles.achievementText}>{achievement}</Text>
            </View>
          ))}
        </View>

        {/* Send Message Button */}
        <TouchableOpacity style={styles.messageButton} onPress={handleSendMessage}>
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: Colors.text.white,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 4,
  },
  handle: {
    fontSize: 16,
    color: Colors.text.light,
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 14,
    color: Colors.text.light,
    marginLeft: 6,
  },
  bioContainer: {
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  bio: {
    fontSize: 16,
    color: Colors.text.dark,
    lineHeight: 22,
    marginBottom: 12,
  },
  joinDate: {
    fontSize: 14,
    color: Colors.text.light,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.text.light,
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
    color: Colors.text.light,
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
    color: Colors.text.light,
    marginBottom: 4,
  },
  achievementsContainer: {
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
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
  messageButton: {
    backgroundColor: Colors.primary.orange,
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary.orange,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  messageButtonText: {
    color: Colors.text.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});