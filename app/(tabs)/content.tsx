import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Home, Play, MessageCircle, Heart, MoreHorizontal, TrendingUp, Reply, Repeat2, MessageSquare, Bookmark, Search, Bell, Plus, User } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { newsArticles } from '@/constants/news';
import NewsCard from '@/components/NewsCard';

interface Reel {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: number;
  likes: number;
  comments: number;
}

interface CommunityPost {
  id: string;
  username: string;
  handle: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  reposts: number;
  type: 'text' | 'video';
  videoUrl?: string;
  videoThumbnail?: string;
}

const communityPosts: CommunityPost[] = [
  {
    id: '1',
    username: 'James Mitchell',
    handle: '@jamesmitch_nyc',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    content: 'Just invested in Liverpool FC through Keeps! The exclusive benefits and potential 4-8% returns make this feel like being a real part of the club. Never thought I\'d actually own shares in my favourite team!',
    timestamp: '2h',
    likes: 24,
    comments: 3,
    reposts: 1,
    type: 'text',
  },
  {
    id: '2',
    username: 'Sarah Chen',
    handle: '@sarahc_investor',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    content: 'Behind the scenes at McLaren Racing! Check out this exclusive footage from our investor day 🏎️',
    timestamp: '4h',
    likes: 89,
    comments: 23,
    reposts: 15,
    type: 'video',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    videoThumbnail: 'https://r2-pub.rork.com/attachments/hg1snt7via7ectrsgpa73',
  },
  {
    id: '3',
    username: 'Michael Rodriguez',
    handle: '@mikerod_golf',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    content: 'Secured my Ryder Cup debentures through Keeps! The exclusive tournament access and meet-and-greets with players make this so much more than just an investment. The returns are just a bonus!',
    timestamp: '6h',
    likes: 31,
    comments: 5,
    reposts: 4,
    type: 'text',
  },
  {
    id: '4',
    username: 'Emma Thompson',
    handle: '@emmathompson_uk',
    avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face',
    content: 'Training session highlights from Liverpool FC! As an investor, getting this exclusive access is incredible ⚽',
    timestamp: '8h',
    likes: 156,
    comments: 34,
    reposts: 28,
    type: 'video',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    videoThumbnail: 'https://r2-pub.rork.com/attachments/sporzaro1639q9bewkp6i',
  },
  {
    id: '5',
    username: 'David Park',
    handle: '@davidpark_sports',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    content: 'What I love about Keeps is how it gives regular fans access to investment opportunities that were previously only available to the ultra-wealthy. The benefits and returns are just incredible!',
    timestamp: '10h',
    likes: 27,
    comments: 8,
    reposts: 3,
    type: 'text',
  },
  {
    id: '6',
    username: 'Lisa Wang',
    handle: '@lisawang_finance',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face',
    content: 'Exclusive interview with Cardiff City manager! Investor perks are amazing 🔵',
    timestamp: '12h',
    likes: 73,
    comments: 19,
    reposts: 12,
    type: 'video',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    videoThumbnail: 'https://r2-pub.rork.com/attachments/5tt0ft9ii8dhmrfeob5a3',
  },
];

const reels: Reel[] = [
  {
    id: '1',
    title: 'Liverpool FC Investors Share Their Experience - LIVE',
    thumbnail: 'https://r2-pub.rork.com/attachments/rrq221caqlhrod57pqi5z',
    duration: '2:15',
    views: 12500,
    likes: 847,
    comments: 23,
  },
  {
    id: '2',
    title: 'McLaren Racing Behind The Scenes Access - LIVE',
    thumbnail: 'https://r2-pub.rork.com/attachments/f7flebgx9g6vzobkwttvc',
    duration: '1:45',
    views: 8900,
    likes: 623,
    comments: 18,
  },
  {
    id: '3',
    title: 'Cardiff City Fan Excited For Upcoming Launch - COMING SOON',
    thumbnail: 'https://r2-pub.rork.com/attachments/2ld73kfmw7rqu3efztuw0',
    duration: '3:20',
    views: 6700,
    likes: 445,
    comments: 12,
  },
  {
    id: '4',
    title: 'British Cycling Debenture Returns Explained - COMPLETED',
    thumbnail: 'https://r2-pub.rork.com/attachments/ae57nptg5ffnj4az6ka5i',
    duration: '1:55',
    views: 5400,
    likes: 398,
    comments: 15,
  },
  {
    id: '5',
    title: 'Ohio State Stadium Funding Excitement - COMING SOON',
    thumbnail: 'https://r2-pub.rork.com/attachments/g7i2b49q4fbrlijr8ex59',
    duration: '2:30',
    views: 7800,
    likes: 542,
    comments: 19,
  },
  {
    id: '6',
    title: 'Hexagon Fan Team Announcing 75% Ownership Opportunity - COMING SOON',
    thumbnail: 'https://r2-pub.rork.com/attachments/sxuovop9htusk4lp0lcfm',
    duration: '1:40',
    views: 4200,
    likes: 298,
    comments: 8,
  },
  {
    id: '7',
    title: 'Ultimate Frisbee Association Growth Potential - COMPLETED',
    thumbnail: 'https://r2-pub.rork.com/attachments/6pgrnssavfwji8pvi4dkt',
    duration: '1:35',
    views: 3800,
    likes: 267,
    comments: 14,
  },
  {
    id: '8',
    title: 'Exeter Chiefs Rugby Investment Success Story - COMPLETED',
    thumbnail: 'https://r2-pub.rork.com/attachments/pynfghqon7kw84kpncvmt',
    duration: '2:10',
    views: 6300,
    likes: 478,
    comments: 21,
  },
];

export default function ContentScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<'written' | 'reels' | 'community'>('written');
  const [showReplyModal, setShowReplyModal] = useState<string | null>(null);
  
  const handleHomePress = () => {
    router.push('/(tabs)');
  };

  const handleNewsPress = (newsId: string) => {
    router.push(`/article/${newsId}`);
  };

  const handleReelPress = (reelId: string) => {
    console.log('Playing reel:', reelId);
  };

  const handleCommentsPress = (reelId: string) => {
    router.push(`/comment-thread/${reelId}`);
  };

  const handleTrendingPress = () => {
    router.push('/asset/liverpool');
  };

  const handleReplyPress = (postId: string) => {
    setShowReplyModal(postId);
  };

  const handleUserPress = (username: string) => {
    const userId = username.toLowerCase().replace(/\s+/g, '-').replace(/'/g, '');
    router.push(`/user-profile/${userId}`);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.homeButton} onPress={handleHomePress}>
            <Home size={20} color={Colors.text.white} />
          </TouchableOpacity>
          <View style={styles.headerTitles}>
            <Text style={styles.headerTitle}>Content</Text>
            <Text style={styles.headerSubtitle}>News, insights and investor stories</Text>
          </View>
        </View>
      </View>

      <View style={styles.tabSelector}>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'written' && styles.tabButtonActive]}
          onPress={() => setSelectedTab('written')}
        >
          <Text style={[styles.tabButtonText, selectedTab === 'written' && styles.tabButtonTextActive]}>
            News
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'community' && styles.tabButtonActive]}
          onPress={() => setSelectedTab('community')}
        >
          <Text style={[styles.tabButtonText, selectedTab === 'community' && styles.tabButtonTextActive]}>
            Community
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'reels' && styles.tabButtonActive]}
          onPress={() => setSelectedTab('reels')}
        >
          <Text style={[styles.tabButtonText, selectedTab === 'reels' && styles.tabButtonTextActive]}>
            Reels
          </Text>
        </TouchableOpacity>
      </View>

      {selectedTab === 'written' ? (
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.sectionTitle}>Latest News</Text>
          {newsArticles.map((article) => (
            <NewsCard 
              key={article.id} 
              article={article} 
              onPress={() => handleNewsPress(article.id)}
            />
          ))}
        </ScrollView>
      ) : selectedTab === 'community' ? (
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Trending Banner */}
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
            <TouchableOpacity style={styles.socialIcon} onPress={() => router.push('/user-profile/liam-canning')}>
              <User size={20} color={Colors.text.white} />
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Community Feed</Text>
          {communityPosts.map((post, index) => (
            <View key={post.id} style={[styles.postCard, index % 3 === 0 && styles.featuredPost]}>
              <View style={styles.postHeader}>
                <TouchableOpacity onPress={() => handleUserPress(post.username)}>
                  <Image source={{ uri: post.avatar }} style={styles.avatar} />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.userInfo}
                  onPress={() => handleUserPress(post.username)}
                >
                  <Text style={styles.username}>{post.username}</Text>
                  <Text style={styles.handle}>{post.handle}</Text>
                </TouchableOpacity>
                <View style={styles.timestampContainer}>
                  <Text style={styles.timestamp}>{post.timestamp}</Text>
                  <TouchableOpacity style={styles.moreButton}>
                    <MoreHorizontal size={16} color={Colors.text.light} />
                  </TouchableOpacity>
                </View>
              </View>
              
              <Text style={styles.postContent}>{post.content}</Text>
              
              {post.type === 'video' && (
                <View style={styles.videoContainer}>
                  <Image source={{ uri: post.videoThumbnail }} style={styles.videoThumbnail} />
                  <View style={styles.videoOverlay}>
                    <TouchableOpacity style={styles.playButton}>
                      <Play size={24} color={Colors.text.white} fill={Colors.text.white} />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              
              <View style={styles.postActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Heart size={16} color={Colors.accent.red} fill={post.likes > 50 ? Colors.accent.red : 'transparent'} />
                  <Text style={[styles.actionText, { color: Colors.accent.red }]}>{post.likes}</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => handleCommentsPress(post.id)}
                >
                  <MessageCircle size={16} color={Colors.primary.blue} />
                  <Text style={[styles.actionText, { color: Colors.primary.blue }]}>{post.comments}</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.actionButton}>
                  <Repeat2 size={16} color={Colors.accent.purple} />
                  <Text style={[styles.actionText, { color: Colors.accent.purple }]}>{post.reposts}</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => handleReplyPress(post.id)}
                >
                  <Reply size={16} color={Colors.accent.green} />
                  <Text style={[styles.actionText, { color: Colors.accent.green }]}>Reply</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <FlatList
          data={reels}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.reelsContent}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.reelCard} onPress={() => handleReelPress(item.id)}>
              <View style={styles.reelImageContainer}>
                <Image source={{ uri: item.thumbnail }} style={styles.reelImage} />
                <View style={styles.playOverlay}>
                  <Play size={32} color={Colors.text.white} />
                </View>
                <View style={styles.durationBadge}>
                  <Text style={styles.durationText}>{item.duration}</Text>
                </View>
              </View>
              <View style={styles.reelInfo}>
                <Text style={styles.reelTitle}>{item.title}</Text>
                <View style={styles.reelStats}>
                  <Text style={styles.reelStat}>{item.views.toLocaleString()} views</Text>
                  <Text style={styles.reelStat}>{item.likes.toLocaleString()} likes</Text>
                  <TouchableOpacity onPress={() => handleCommentsPress(item.id)}>
                    <Text style={styles.reelStat}>{item.comments} comments</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
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
    paddingBottom: 8,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  homeButton: {
    padding: 8,
    marginRight: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerTitles: {
    flex: 1,
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
  tabSelector: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    margin: 16,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabButtonActive: {
    backgroundColor: Colors.primary.orange,
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.white,
    opacity: 0.7,
  },
  tabButtonTextActive: {
    opacity: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.white,
    marginBottom: 16,
    marginTop: 8,
  },
  reelsContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  reelCard: {
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  reelImageContainer: {
    position: 'relative',
    height: 300,
  },
  reelImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  playOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -16 }, { translateY: -16 }],
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 25,
    padding: 8,
  },
  durationBadge: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  durationText: {
    color: Colors.text.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  reelInfo: {
    padding: 16,
  },
  reelTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 8,
  },
  reelStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reelStat: {
    fontSize: 14,
    color: Colors.text.light,
    fontWeight: '500',
  },
  trendingBanner: {
    backgroundColor: Colors.accent.purple,
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
  videoContainer: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    position: 'relative',
  },
  videoThumbnail: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  videoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  playButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
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
});