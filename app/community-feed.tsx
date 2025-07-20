import React, { useRef, useState } from 'react';
import { StyleSheet, View, ScrollView, Text, Image, TouchableOpacity, Animated, Dimensions, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Stack, useRouter } from 'expo-router';
import { Heart, MessageCircle, Share, MoreHorizontal, Edit, Mail, Bookmark, Search, Bell, Home, User, Zap, TrendingUp, File, Play, Pause, Volume2, VolumeX, Menu } from 'lucide-react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Colors from '@/constants/colors';

const { width: screenWidth } = Dimensions.get('window');

interface Post {
  id: string;
  username: string;
  handle: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  type: 'text' | 'video';
  videoUrl?: string;
  videoThumbnail?: string;
}

const communityPosts: Post[] = [
  {
    id: '1',
    username: 'James Mitchell',
    handle: '@jamesmitch_nyc',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    content: 'Just invested in Liverpool FC through Keeps! The exclusive benefits and potential 4-8% returns make this feel like being a real part of the club. Never thought I\'d actually own shares in my favourite team!',
    timestamp: '2h',
    likes: 24,
    comments: 3,
    shares: 1,
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
    shares: 15,
    type: 'video',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    videoThumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
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
    shares: 4,
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
    shares: 28,
    type: 'video',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    videoThumbnail: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop',
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
    shares: 3,
    type: 'text',
  },
  {
    id: '6',
    username: 'Lisa Wang',
    handle: '@lisawang_finance',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face',
    content: 'Exclusive interview with Cardiff City manager! Investor perks are amazing 🔵',
    timestamp: '12h',
    likes: 73,
    comments: 19,
    shares: 12,
    type: 'video',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    videoThumbnail: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop',
  },
  {
    id: '7',
    username: 'Alex Johnson',
    handle: '@alexj_investor',
    avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100&h=100&fit=crop&crop=face',
    content: 'The exclusive experiences you get through Keeps are unreal. Meeting players, behind-the-scenes access, VIP treatment - it\'s like being part of the inner circle of your favourite teams!',
    timestamp: '14h',
    likes: 19,
    comments: 4,
    shares: 2,
    type: 'text',
  },
  {
    id: '8',
    username: 'Sophie Martin',
    handle: '@sophiem_sports',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
    content: 'Ryder Cup course walkthrough with the pros! This is why I invested 🏌️‍♂️',
    timestamp: '16h',
    likes: 94,
    comments: 21,
    shares: 16,
    type: 'video',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    videoThumbnail: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=400&h=300&fit=crop',
  },
  {
    id: '9',
    username: 'Ryan O\'Connor',
    handle: '@ryanoconnor_f1',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face',
    content: 'Just had an incredible experience meeting the McLaren team through my Keeps investment! The access you get is absolutely unreal - these are experiences money usually can\'t buy.',
    timestamp: '18h',
    likes: 67,
    comments: 15,
    shares: 12,
    type: 'text',
  },
  {
    id: '10',
    username: 'Maria Gonzalez',
    handle: '@mariag_liverpool',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face',
    content: 'Match day atmosphere at Anfield! YNWA! ⚽🔴',
    timestamp: '20h',
    likes: 203,
    comments: 45,
    shares: 38,
    type: 'video',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    videoThumbnail: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=400&h=300&fit=crop',
  },
  {
    id: '11',
    username: 'Sarah Martinez',
    handle: '@sarahm_sports',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    content: 'Just secured my Cardiff City shares! 🔵 The potential 12% returns plus being part of the Bluebirds future is incredible. This is how modern sports investment should work!',
    timestamp: '22h',
    likes: 38,
    comments: 9,
    shares: 5,
    type: 'text',
  },
];

const VideoPlayer = ({ post }: { post: Post }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  if (Platform.OS === 'web') {
    return (
      <View style={styles.videoContainer}>
        <Image source={{ uri: post.videoThumbnail }} style={styles.videoThumbnail} />
        <View style={styles.videoOverlay}>
          <TouchableOpacity style={styles.playButton}>
            <Play size={32} color={Colors.text.white} fill={Colors.text.white} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.videoContainer}>
      <Image source={{ uri: post.videoThumbnail }} style={styles.videoThumbnail} />
      <View style={styles.videoOverlay}>
        <TouchableOpacity style={styles.playButton}>
          <Play size={32} color={Colors.text.white} fill={Colors.text.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function CommunityFeedScreen() {
  const router = useRouter();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const sidebarTranslateX = useRef(new Animated.Value(-250)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  const handleCommentPress = (commentId: string) => {
    router.push(`/comment-thread/${commentId}`);
  };

  const handleUserPress = (username: string) => {
    const userId = username.toLowerCase().replace(/\s+/g, '-').replace(/'/g, '');
    router.push(`/user-profile/${userId}`);
  };

  const handleHomePress = () => {
    router.push('/');
  };

  const handleMessagesPress = () => {
    router.push('/messages');
  };

  const handleSavedPress = () => {
    router.push('/saved-content');
  };

  const handleSearchPress = () => {
    router.push('/search');
  };

  const handleNotificationsPress = () => {
    router.push('/notifications');
  };

  const handleNewPostPress = () => {
    router.push('/new-post');
  };

  const handleProfilePress = () => {
    router.push('/user-profile/liam-canning');
  };

  const showSidebar = () => {
    setSidebarVisible(true);
    Animated.parallel([
      Animated.timing(sidebarTranslateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 0.5,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const hideSidebar = () => {
    Animated.parallel([
      Animated.timing(sidebarTranslateX, {
        toValue: -250,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setSidebarVisible(false);
    });
  };

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: sidebarTranslateX } }],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = (event: any) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      const { translationX, velocityX } = event.nativeEvent;
      
      if (translationX > 100 || velocityX > 500) {
        showSidebar();
      } else {
        hideSidebar();
      }
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          headerShown: true,
          headerTitle: "Community Feed",
          headerStyle: { backgroundColor: Colors.primary.blue },
          headerTintColor: Colors.text.white,
          headerTitleStyle: { fontWeight: 'bold' },
          headerLeft: () => (
            <TouchableOpacity onPress={showSidebar} style={styles.menuButton}>
              <Menu size={24} color={Colors.text.white} />
            </TouchableOpacity>
          ),
        }} 
      />
      <StatusBar style="light" />
      
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
      >
        <Animated.View style={styles.container}>
          <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
            {/* Trending Banner */}
            <View style={styles.trendingBanner}>
              <View style={styles.trendingHeader}>
                <Text style={styles.trendingTitle}>Trending Now</Text>
                <TrendingUp size={16} color={Colors.accent.green} />
              </View>
              <Text style={styles.trendingText}>Liverpool FC hits 75% funding! Join 10,250+ investors</Text>
            </View>

            {communityPosts.map((post, index) => (
              <View key={post.id} style={[styles.postCard, index % 4 === 0 && styles.featuredCard]}>
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
                  <VideoPlayer post={post} />
                )}
                
                <View style={styles.postActions}>
                  <TouchableOpacity style={[styles.actionButtonPost, styles.likeButton]}>
                    <Heart size={18} color={Colors.accent.red} fill={post.likes > 50 ? Colors.accent.red : 'transparent'} />
                    <Text style={[styles.actionText, styles.likeText]}>{post.likes}</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[styles.actionButtonPost, styles.commentButton]}
                    onPress={() => handleCommentPress(post.id)}
                  >
                    <MessageCircle size={18} color={Colors.primary.blue} />
                    <Text style={[styles.actionText, styles.commentText]}>{post.comments}</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={[styles.actionButtonPost, styles.shareButton]}>
                    <Share size={18} color={Colors.accent.green} />
                    <Text style={[styles.actionText, styles.shareText]}>{post.shares}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            
            <View style={styles.socialSection}>
              <View style={styles.socialIcons}>
                <TouchableOpacity style={styles.socialIcon}>
                  <Image 
                    source={{ uri: 'https://r2-pub.rork.com/attachments/27w1m5ej2hs46sg5lrbo8' }} 
                    style={styles.socialIconImage}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialIcon}>
                  <Image 
                    source={{ uri: 'https://r2-pub.rork.com/attachments/6h2k4y9ibeiyw4a6rgy04' }} 
                    style={styles.socialIconImage}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialIcon}>
                  <Image 
                    source={{ uri: 'https://r2-pub.rork.com/attachments/8jpu7n8wuld7fgvotnbld' }} 
                    style={styles.socialIconImage}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialIcon}>
                  <Image 
                    source={{ uri: 'https://r2-pub.rork.com/attachments/1b1itipm9ni7gcuc9ee3d' }} 
                    style={styles.socialIconImage}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialIcon}>
                  <Image 
                    source={{ uri: 'https://r2-pub.rork.com/attachments/dwyoemuwqs2vb7frha3bu' }} 
                    style={styles.socialIconImage}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.contactEmail}>info@keeps.sport</Text>
            </View>
          </ScrollView>
        </Animated.View>
      </PanGestureHandler>

      {/* Sidebar */}
      {sidebarVisible && (
        <>
          <Animated.View 
            style={[styles.overlay, { opacity: overlayOpacity }]}
          >
            <TouchableOpacity 
              style={styles.overlayTouchable}
              onPress={hideSidebar}
            />
          </Animated.View>
          
          <Animated.View 
            style={[
              styles.sidebar,
              { transform: [{ translateX: sidebarTranslateX }] }
            ]}
          >
            <View style={styles.sidebarHeader}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face' }}
                style={styles.sidebarAvatar}
              />
              <View style={styles.sidebarUserInfo}>
                <Text style={styles.sidebarUsername}>Liam Canning</Text>
                <Text style={styles.sidebarHandle}>@liamcanning</Text>
              </View>
            </View>
            
            <View style={styles.sidebarMenu}>
              <TouchableOpacity style={styles.sidebarMenuItem} onPress={handleHomePress}>
                <Home size={24} color={Colors.primary.blue} />
                <Text style={[styles.sidebarMenuText, { color: Colors.primary.blue }]}>Home</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.sidebarMenuItem} onPress={handleMessagesPress}>
                <Mail size={24} color={Colors.accent.green} />
                <Text style={[styles.sidebarMenuText, { color: Colors.accent.green }]}>Chat</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.sidebarMenuItem} onPress={handleSavedPress}>
                <Bookmark size={24} color={Colors.primary.orange} />
                <Text style={[styles.sidebarMenuText, { color: Colors.primary.orange }]}>Saved</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.sidebarMenuItem} onPress={handleSearchPress}>
                <Search size={24} color={Colors.accent.purple} />
                <Text style={[styles.sidebarMenuText, { color: Colors.accent.purple }]}>Search</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.sidebarMenuItem} onPress={handleNotificationsPress}>
                <Bell size={24} color={Colors.accent.red} />
                <Text style={[styles.sidebarMenuText, { color: Colors.accent.red }]}>Alerts</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.sidebarMenuItem} onPress={handleNewPostPress}>
                <Zap size={24} color={Colors.accent.yellow} />
                <Text style={[styles.sidebarMenuText, { color: Colors.accent.yellow }]}>Post</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.sidebarMenuItem} onPress={handleProfilePress}>
                <User size={24} color={Colors.accent.blue} />
                <Text style={[styles.sidebarMenuText, { color: Colors.accent.blue }]}>Profile</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  menuButton: {
    padding: 8,
    marginLeft: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  trendingBanner: {
    backgroundColor: Colors.primary.orange,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
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
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.white,
    marginLeft: 8,
    marginRight: 8,
  },
  trendingText: {
    fontSize: 14,
    color: Colors.text.white,
    fontWeight: '600',
  },
  postCard: {
    backgroundColor: Colors.background.card,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  featuredCard: {
    borderWidth: 2,
    borderColor: Colors.accent.orange,
    backgroundColor: '#FFF8F0',
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
    width: 60,
    height: 60,
    borderRadius: 30,
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
  actionButtonPost: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 20,
    backgroundColor: Colors.background.secondary,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  likeButton: {
    backgroundColor: '#FFE8E8',
  },
  likeText: {
    color: Colors.accent.red,
  },
  commentButton: {
    backgroundColor: '#E8F4FF',
  },
  commentText: {
    color: Colors.primary.blue,
  },
  shareButton: {
    backgroundColor: '#E8FFE8',
  },
  shareText: {
    color: Colors.accent.green,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'black',
    zIndex: 1000,
  },
  overlayTouchable: {
    flex: 1,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 250,
    backgroundColor: Colors.background.card,
    zIndex: 1001,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  sidebarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.primary.blue,
  },
  sidebarAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  sidebarUserInfo: {
    flex: 1,
  },
  sidebarUsername: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.white,
  },
  sidebarHandle: {
    fontSize: 14,
    color: Colors.text.white,
    opacity: 0.8,
  },
  sidebarMenu: {
    paddingTop: 20,
  },
  sidebarMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  sidebarMenuText: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 16,
  },
  socialSection: {
    backgroundColor: Colors.background.card,
    margin: 16,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
  },
  socialIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: Colors.background.secondary,
  },
  socialIconImage: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  contactEmail: {
    fontSize: 14,
    color: Colors.text.light,
    fontWeight: '500',
  },
});