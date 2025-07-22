import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Stack, useRouter } from 'expo-router';
import { Bookmark, Heart, MessageCircle, MoreHorizontal, Filter, Reply, Repeat2, TrendingUp, MessageSquare, Search, Bell, Plus, User } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface SavedPost {
  id: string;
  username: string;
  handle: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  category: 'investment' | 'benefits' | 'news' | 'community';
  flag: string;
  country: string;
  reposts?: number;
  type?: 'text' | 'video';
  videoThumbnail?: string;
}

const savedPosts: SavedPost[] = [
  {
    id: '1',
    username: 'Alessandro Rossi',
    handle: '@alex_rossi_milan',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    content: 'Just secured my position in Exeter Chiefs! The rugby heritage and exclusive matchday experiences make this investment feel incredibly authentic.',
    timestamp: '1h',
    likes: 34,
    comments: 8,
    shares: 3,
    category: 'investment',
    flag: '🇮🇹',
    country: 'Italy'
  },

  {
    id: '3',
    username: 'Lars Andersen',
    handle: '@lars_nordic_invest',
    avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100&h=100&fit=crop&crop=face',
    content: 'Ultimate Frisbee World Championships through Keeps is brilliant! Supporting emerging sports while getting exclusive tournament access - this is how modern investing should work.',
    timestamp: '3h',
    likes: 19,
    comments: 6,
    shares: 2,
    category: 'investment',
    flag: '🇳🇴',
    country: 'Norway'
  },
  {
    id: '4',
    username: 'Fatima Al-Zahra',
    handle: '@fatima_dubai_sports',
    avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face',
    content: 'McLaren Racing ISA is a game-changer! 10% of sponsorship revenues plus F1 paddock access - feels like owning a piece of motorsport history.',
    timestamp: '4h',
    likes: 45,
    comments: 15,
    shares: 8,
    category: 'investment',
    flag: '🇦🇪',
    country: 'UAE'
  },
  {
    id: '5',
    username: 'João Silva',
    handle: '@joao_rio_investor',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    content: 'Liverpool FC investment through Keeps exceeded all expectations! The Anfield experiences and potential returns make you feel like true Red family.',
    timestamp: '5h',
    likes: 52,
    comments: 18,
    shares: 11,
    category: 'investment',
    flag: '🇧🇷',
    country: 'Brazil',
    reposts: 11,
    type: 'text'
  },
  {
    id: '6',
    username: 'Sophie Dubois',
    handle: '@sophie_paris_golf',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    content: 'Ryder Cup debentures are incredible! VIP hospitality, player meet-and-greets, and exclusive course access - this is premium sports investing at its finest.',
    timestamp: '6h',
    likes: 38,
    comments: 9,
    shares: 4,
    category: 'benefits',
    flag: '🇫🇷',
    country: 'France'
  },
  {
    id: '7',
    username: 'Hiroshi Tanaka',
    handle: '@hiroshi_tokyo_sports',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop&crop=face',
    content: 'Hexagon Cup benefits are outstanding! Behind-the-scenes access and exclusive merchandise make this investment feel incredibly special.',
    timestamp: '7h',
    likes: 26,
    comments: 7,
    shares: 3,
    category: 'benefits',
    flag: '🇯🇵',
    country: 'Japan'
  },
  {
    id: '8',
    username: 'Emma Johansson',
    handle: '@emma_stockholm_cycle',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
    content: 'British Cycling benefits package is phenomenal! Training camp access, Olympic venue tours, and meet-and-greets with champions - pure cycling paradise.',
    timestamp: '8h',
    likes: 31,
    comments: 11,
    shares: 6,
    category: 'benefits',
    flag: '🇸🇪',
    country: 'Sweden'
  },
  {
    id: '9',
    username: 'Carlos Mendoza',
    handle: '@carlos_madrid_rugby',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face',
    content: 'Exeter Chiefs benefits are unmatched! Sandy Park hospitality, training ground visits, and player interactions make you feel like part of the squad.',
    timestamp: '9h',
    likes: 29,
    comments: 8,
    shares: 2,
    category: 'benefits',
    flag: '🇪🇸',
    country: 'Spain'
  },
  {
    id: '10',
    username: 'Aisha Okonkwo',
    handle: '@aisha_lagos_sports',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop&crop=face',
    content: 'Liverpool FC benefits are legendary! Anfield tours, training ground access, and exclusive merchandise - being a Red has never felt this special.',
    timestamp: '10h',
    likes: 47,
    comments: 14,
    shares: 9,
    category: 'benefits',
    flag: '🇳🇬',
    country: 'Nigeria'
  },
  {
    id: '11',
    username: 'Viktor Petrov',
    handle: '@viktor_moscow_f1',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face',
    content: 'McLaren Racing benefits are extraordinary! Paddock access, factory tours, and driver meet-and-greets - this is F1 investing at the highest level.',
    timestamp: '11h',
    likes: 41,
    comments: 13,
    shares: 7,
    category: 'benefits',
    flag: '🇷🇺',
    country: 'Russia'
  },
  {
    id: '12',
    username: 'Isabella Martinez',
    handle: '@bella_buenos_aires',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face',
    content: 'BREAKING: Liverpool FC announces record-breaking sponsorship deal worth £200M over 5 years. This could significantly boost investor returns across all Keeps portfolios.',
    timestamp: '1h',
    likes: 89,
    comments: 23,
    shares: 34,
    category: 'news',
    flag: '🇦🇷',
    country: 'Argentina'
  },
  {
    id: '13',
    username: 'Chen Wei',
    handle: '@chen_beijing_news',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    content: 'McLaren Racing secures major tech partnership with leading AI company. Expected to increase sponsorship revenues by 15% - great news for ISA holders!',
    timestamp: '3h',
    likes: 67,
    comments: 19,
    shares: 28,
    category: 'news',
    flag: '🇨🇳',
    country: 'China'
  },
  {
    id: '14',
    username: 'Amara Thompson',
    handle: '@amara_cape_town',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    content: 'British Cycling announces new Olympic training facility. This infrastructure investment should enhance the value proposition for all cycling investors.',
    timestamp: '5h',
    likes: 54,
    comments: 16,
    shares: 21,
    category: 'news',
    flag: '🇿🇦',
    country: 'South Africa'
  },
  {
    id: '15',
    username: 'Dmitri Volkov',
    handle: '@dmitri_st_petersburg',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    content: 'Exeter Chiefs reaches Premiership final! Strong on-field performance typically correlates with increased commercial value and investor returns.',
    timestamp: '7h',
    likes: 43,
    comments: 12,
    shares: 18,
    category: 'news',
    flag: '🇷🇺',
    country: 'Russia'
  },
  {
    id: '16',
    username: 'Leila Hassan',
    handle: '@leila_cairo_sports',
    avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face',
    content: 'Ryder Cup 2025 ticket sales break records! Debenture holders are seeing unprecedented demand - this bodes well for future valuations.',
    timestamp: '9h',
    likes: 38,
    comments: 10,
    shares: 15,
    category: 'news',
    flag: '🇪🇬',
    country: 'Egypt'
  },
  {
    id: '17',
    username: 'Kai Nakamura',
    handle: '@kai_osaka_ultimate',
    avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100&h=100&fit=crop&crop=face',
    content: 'Ultimate Frisbee World Championships announces expansion to 32 teams! Growing global participation should drive increased commercial interest.',
    timestamp: '12h',
    likes: 29,
    comments: 8,
    shares: 12,
    category: 'news',
    flag: '🇯🇵',
    country: 'Japan'
  },
  {
    id: '18',
    username: 'Olivia Clarke',
    handle: '@olivia_sydney_sports',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
    content: 'The Keeps community is incredible! Connecting with fellow sports investors from around the world has opened up so many new perspectives on the industry.',
    timestamp: '2h',
    likes: 56,
    comments: 22,
    shares: 14,
    category: 'community',
    flag: '🇦🇺',
    country: 'Australia'
  },
  {
    id: '19',
    username: 'Mateo Rodriguez',
    handle: '@mateo_mexico_city',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face',
    content: 'Love how Keeps brings together passionate sports fans and smart investors. The community discussions about market trends are incredibly insightful.',
    timestamp: '4h',
    likes: 41,
    comments: 17,
    shares: 9,
    category: 'community',
    flag: '🇲🇽',
    country: 'Mexico'
  },
  {
    id: '20',
    username: 'Zara Ahmed',
    handle: '@zara_karachi_invest',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop&crop=face',
    content: 'Keeps has revolutionized how I think about sports investment. The transparency and community support make complex decisions feel much more manageable.',
    timestamp: '6h',
    likes: 33,
    comments: 13,
    shares: 7,
    category: 'community',
    flag: '🇵🇰',
    country: 'Pakistan'
  },
  {
    id: '21',
    username: 'Finn O\'Sullivan',
    handle: '@finn_dublin_sports',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    content: 'The global reach of Keeps is amazing! Learning about sports investment opportunities from investors in different continents has been eye-opening.',
    timestamp: '8h',
    likes: 37,
    comments: 15,
    shares: 11,
    category: 'community',
    flag: '🇮🇪',
    country: 'Ireland'
  },
  {
    id: '22',
    username: 'Nadia Popovic',
    handle: '@nadia_belgrade_fan',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    content: 'Keeps community events are fantastic! Met so many like-minded sports investors at the London meetup. The networking opportunities are invaluable.',
    timestamp: '10h',
    likes: 44,
    comments: 19,
    shares: 13,
    category: 'community',
    flag: '🇷🇸',
    country: 'Serbia'
  },
  {
    id: '23',
    username: 'Kwame Asante',
    handle: '@kwame_accra_sports',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    content: 'The diversity of sports on Keeps is incredible! From traditional football to emerging sports like Ultimate Frisbee - there\'s something for every sports fan.',
    timestamp: '12h',
    likes: 39,
    comments: 16,
    shares: 8,
    category: 'community',
    flag: '🇬🇭',
    country: 'Ghana'
  },
  {
    id: '24',
    username: 'Ingrid Larsson',
    handle: '@ingrid_oslo_invest',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
    content: 'Keeps has made sports investing accessible to everyone. The educational resources and community support help newcomers navigate this exciting market.',
    timestamp: '14h',
    likes: 48,
    comments: 21,
    shares: 16,
    category: 'community',
    flag: '🇳🇴',
    country: 'Norway'
  },
];

export default function SavedContentScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const router = useRouter();

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'investment', label: 'Investments' },
    { id: 'benefits', label: 'Benefits' },
    { id: 'news', label: 'News' },
    { id: 'community', label: 'Community' },
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? savedPosts 
    : savedPosts.filter(post => post.category === selectedCategory);

  const handleTrendingPress = () => {
    router.push('/asset/liverpool');
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          headerShown: false,
        }} 
      />
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Saved Content</Text>
        <Text style={styles.headerSubtitle}>Your saved posts and insights</Text>
      </View>

      <View style={styles.categorySection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                selectedCategory === category.id && styles.activeCategoryButton
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Text style={[
                styles.categoryButtonText,
                selectedCategory === category.id && styles.activeCategoryButtonText
              ]}>
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Trending Banner - Changed to purple */}
        <TouchableOpacity style={styles.trendingBanner} onPress={handleTrendingPress}>
          <View style={styles.trendingHeader}>
            <TrendingUp size={20} color={Colors.text.white} />
            <Text style={styles.trendingTitle}>Trending Now</Text>
          </View>
          <Text style={styles.trendingText}>Liverpool FC hits 75% funding! Join 10,250+ investors</Text>
        </TouchableOpacity>

        {/* Social Media Icons */}
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialIcon} onPress={() => router.push('/messages')}>
            <MessageSquare size={20} color={Colors.text.white} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialIcon} onPress={() => router.push('/saved-content')}>
            <Bookmark size={20} color={Colors.text.white} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialIcon} onPress={() => router.push('/search')}>
            <Search size={20} color={Colors.text.white} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialIcon} onPress={() => router.push('/notifications')}>
            <Bell size={20} color={Colors.text.white} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialIcon} onPress={() => router.push('/new-post')}>
            <Plus size={20} color={Colors.text.white} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialIcon} onPress={() => router.push('/my-account')}>
            <User size={20} color={Colors.text.white} />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Saved Posts</Text>
        {filteredPosts.map((post, index) => (
          <View key={post.id} style={[styles.postCard, index % 3 === 0 && styles.featuredPost]}>
            <View style={styles.postHeader}>
              <Image source={{ uri: post.avatar }} style={styles.avatar} />
              <View style={styles.userInfo}>
                <Text style={styles.username}>
                  {post.username} {post.flag} {post.country}
                </Text>
                <Text style={styles.handle}>{post.handle}</Text>
              </View>
              <View style={styles.timestampContainer}>
                <Text style={styles.timestamp}>{post.timestamp}</Text>
                <TouchableOpacity style={styles.moreButton}>
                  <MoreHorizontal size={16} color={Colors.text.light} />
                </TouchableOpacity>
              </View>
            </View>
            
            <Text style={styles.postContent}>{post.content}</Text>
            

            
            <View style={styles.postActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Heart size={16} color={Colors.accent.red} fill={post.likes > 50 ? Colors.accent.red : 'transparent'} />
                <Text style={[styles.actionText, { color: Colors.accent.red }]}>{post.likes}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionButton}>
                <MessageCircle size={16} color={Colors.primary.blue} />
                <Text style={[styles.actionText, { color: Colors.primary.blue }]}>{post.comments}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionButton}>
                <Repeat2 size={16} color={Colors.accent.purple} />
                <Text style={[styles.actionText, { color: Colors.accent.purple }]}>{post.reposts || post.shares}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionButton}>
                <Reply size={16} color={Colors.accent.green} />
                <Text style={[styles.actionText, { color: Colors.accent.green }]}>Reply</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
        
        {filteredPosts.length === 0 && (
          <View style={styles.emptyState}>
            <Bookmark size={48} color={Colors.text.light} />
            <Text style={styles.emptyStateTitle}>No Saved Content</Text>
            <Text style={styles.emptyStateText}>
              Start saving posts that interest you to build your personal collection of sports investment insights.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.blue,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.white,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.text.white,
    opacity: 0.8,
  },
  categorySection: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 12,
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  categoryScroll: {
    paddingHorizontal: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginRight: 8,
  },
  activeCategoryButton: {
    backgroundColor: Colors.primary.orange,
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text.white,
    opacity: 0.7,
  },
  activeCategoryButtonText: {
    opacity: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  trendingBanner: {
    backgroundColor: '#4ECDC4',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  trendingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  trendingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.white,
    marginLeft: 8,
  },
  trendingText: {
    fontSize: 16,
    color: Colors.text.white,
    fontWeight: '600',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    gap: 16,
  },
  socialIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.white,
    marginBottom: 16,
    marginTop: 8,
  },
  postCard: {
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featuredPost: {
    borderWidth: 2,
    borderColor: Colors.accent.gold,
    backgroundColor: '#FFFBF0',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.dark,
  },
  handle: {
    fontSize: 14,
    color: Colors.text.light,
  },
  timestampContainer: {
    alignItems: 'flex-end',
  },
  timestamp: {
    fontSize: 12,
    color: Colors.text.light,
    marginBottom: 4,
  },
  moreButton: {
    padding: 4,
  },
  postContent: {
    fontSize: 16,
    color: Colors.text.dark,
    lineHeight: 22,
    marginBottom: 16,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  postImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 16,
    backgroundColor: Colors.background.light,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
    marginTop: 60,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.white,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: Colors.text.white,
    opacity: 0.8,
    textAlign: 'center',
    lineHeight: 20,
  },
});