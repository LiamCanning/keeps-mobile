import React from 'react';
import { StyleSheet, View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Stack, useRouter } from 'expo-router';
import { Heart, MessageCircle, Share, MoreHorizontal, Edit, Mail, Bookmark, Search, Bell, Home } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface Comment {
  id: string;
  username: string;
  handle: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
}

const communityComments: Comment[] = [
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
  },
  {
    id: '2',
    username: 'Sarah Chen',
    handle: '@sarahc_investor',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    content: 'The McLaren Racing ISA opportunity is incredible! Getting 10% of sponsorship revenues feels like being part of the team. This democratisation of sports investment is exactly what fans have been waiting for.',
    timestamp: '4h',
    likes: 18,
    comments: 7,
    shares: 2,
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
  },
  {
    id: '4',
    username: 'Emma Thompson',
    handle: '@emmathompson_uk',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    content: 'Keeps has completely changed how I think about supporting my favorite teams. The exclusive access and real returns make you feel like you\'re truly part of the club\'s journey, not just a spectator.',
    timestamp: '8h',
    likes: 42,
    comments: 12,
    shares: 6,
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
  },
  {
    id: '6',
    username: 'Lisa Wang',
    handle: '@lisawang_finance',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face',
    content: 'The regenerative finance model is brilliant - your investment actually helps grow the sport while giving you amazing returns. It feels good knowing you\'re contributing to something bigger than just profit.',
    timestamp: '12h',
    likes: 35,
    comments: 9,
    shares: 7,
  },
  {
    id: '7',
    username: 'Alex Johnson',
    handle: '@alexj_investor',
    avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100&h=100&fit=crop&crop=face',
    content: 'The exclusive experiences you get through Keeps are unreal. Meeting players, behind-the-scenes access, VIP treatment - it\'s like being part of the inner circle of your favorite teams!',
    timestamp: '14h',
    likes: 19,
    comments: 4,
    shares: 2,
  },
  {
    id: '8',
    username: 'Sophie Martin',
    handle: '@sophiem_sports',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
    content: 'The tiered benefits system is genius! Even at Bronze level, you get exclusive content and experiences that make you feel like a VIP. The returns are just the cherry on top!',
    timestamp: '16h',
    likes: 28,
    comments: 6,
    shares: 1,
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
  },
  {
    id: '10',
    username: 'Maria Gonzalez',
    handle: '@mariag_liverpool',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face',
    content: 'Being a Liverpool investor through Keeps has been incredible! The exclusive stadium access and knowing you\'re actually part of the club\'s future makes every match even more exciting. YNWA!',
    timestamp: '20h',
    likes: 45,
    comments: 11,
    shares: 8,
  },
];

export default function CommunityFeedScreen() {
  const router = useRouter();

  const handleCommentPress = (commentId: string) => {
    router.push(`/comment-thread/${commentId}`);
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
        }} 
      />
      <StatusBar style="light" />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Action Banner */}
        <View style={styles.actionBanner}>
          <TouchableOpacity style={styles.actionButton}>
            <Home size={20} color={Colors.primary.blue} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Mail size={20} color={Colors.primary.blue} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Bookmark size={20} color={Colors.primary.blue} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Search size={20} color={Colors.primary.blue} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Bell size={20} color={Colors.primary.blue} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Edit size={20} color={Colors.primary.blue} />
          </TouchableOpacity>
        </View>

        {communityComments.map((comment) => (
          <View key={comment.id} style={styles.commentCard}>
            <View style={styles.commentHeader}>
              <Image source={{ uri: comment.avatar }} style={styles.avatar} />
              <View style={styles.userInfo}>
                <Text style={styles.username}>{comment.username}</Text>
                <Text style={styles.handle}>{comment.handle}</Text>
              </View>
              <View style={styles.timestampContainer}>
                <Text style={styles.timestamp}>{comment.timestamp}</Text>
                <TouchableOpacity style={styles.moreButton}>
                  <MoreHorizontal size={16} color={Colors.text.light} />
                </TouchableOpacity>
              </View>
            </View>
            
            <Text style={styles.commentContent}>{comment.content}</Text>
            
            <View style={styles.commentActions}>
              <TouchableOpacity style={styles.actionButtonComment}>
                <Heart size={18} color={Colors.text.light} />
                <Text style={styles.actionText}>{comment.likes}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.actionButtonComment}
                onPress={() => handleCommentPress(comment.id)}
              >
                <MessageCircle size={18} color={Colors.text.light} />
                <Text style={styles.actionText}>{comment.comments}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionButtonComment}>
                <Share size={18} color={Colors.text.light} />
                <Text style={styles.actionText}>{comment.shares}</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  actionBanner: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.background.card,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: Colors.background.secondary,
  },
  commentCard: {
    backgroundColor: Colors.background.card,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  commentHeader: {
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
  commentContent: {
    fontSize: 16,
    color: Colors.text.dark,
    lineHeight: 22,
    marginBottom: 16,
  },
  commentActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 12,
  },
  actionButtonComment: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  actionText: {
    fontSize: 14,
    color: Colors.text.light,
    marginLeft: 6,
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