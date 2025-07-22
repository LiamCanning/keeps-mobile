import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Stack, useRouter } from 'expo-router';
import { Bookmark, Heart, MessageCircle, Share, MoreHorizontal, Filter } from 'lucide-react-native';
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
}

const savedPosts: SavedPost[] = [
  {
    id: '1',
    username: 'James Wilson',
    handle: '@jamesmitch_nyc',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    content: 'Just invested in Liverpool FC through Keeps! The exclusive benefits and potential 4-8% returns make this feel like being a real part of the club.',
    timestamp: '2h',
    likes: 24,
    comments: 3,
    shares: 1,
    category: 'investment',
    flag: '🇺🇸',
    country: 'USA'
  },
  {
    id: '2',
    username: 'Sarah Chen',
    handle: '@sarahc_investor',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    content: 'The McLaren Racing ISA opportunity is incredible! Getting 10% of sponsorship revenues feels like being part of the team.',
    timestamp: '4h',
    likes: 18,
    comments: 7,
    shares: 2,
    category: 'investment',
    flag: '🇪🇸',
    country: 'Spain'
  },
  {
    id: '3',
    username: 'Michael Rodriguez',
    handle: '@mikerod_golf',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    content: 'Secured my Ryder Cup debentures through Keeps! The exclusive tournament access and meet-and-greets with players make this so much more than just an investment.',
    timestamp: '6h',
    likes: 31,
    comments: 5,
    shares: 4,
    category: 'benefits',
    flag: '🇬🇧',
    country: 'UK'
  },
  {
    id: '4',
    username: 'Marcus Johnson',
    handle: '@marcusj_sports',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    content: 'Keeps has completely changed how I think about supporting my favorite teams. The exclusive access and real returns make you feel like you\'re truly part of the club\'s journey.',
    timestamp: '8h',
    likes: 42,
    comments: 12,
    shares: 6,
    category: 'community',
    flag: '🇨🇦',
    country: 'Canada'
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

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          headerShown: true,
          headerTitle: "Saved Content",
          headerStyle: { backgroundColor: Colors.primary.blue },
          headerTintColor: Colors.text.white,
          headerTitleStyle: { fontWeight: 'bold' },
          headerRight: () => (
            <TouchableOpacity style={styles.headerButton}>
              <Filter size={20} color={Colors.text.white} />
            </TouchableOpacity>
          ),
        }} 
      />
      <StatusBar style="light" />
      
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
        {filteredPosts.map((post) => (
          <View key={post.id} style={styles.postCard}>
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
                <Heart size={18} color={Colors.text.light} />
                <Text style={styles.actionText}>{post.likes}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionButton}>
                <MessageCircle size={18} color={Colors.text.light} />
                <Text style={styles.actionText}>{post.comments}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionButton}>
                <Share size={18} color={Colors.text.light} />
                <Text style={styles.actionText}>{post.shares}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionButton}>
                <Bookmark size={18} color={Colors.primary.orange} fill={Colors.primary.orange} />
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
  headerButton: {
    marginRight: 16,
    padding: 4,
  },
  categorySection: {
    backgroundColor: Colors.background.card,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  categoryScroll: {
    paddingHorizontal: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.background.secondary,
    marginRight: 8,
  },
  activeCategoryButton: {
    backgroundColor: Colors.primary.blue,
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text.dark,
  },
  activeCategoryButtonText: {
    color: Colors.text.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  postCard: {
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
  },
  actionText: {
    fontSize: 14,
    color: Colors.text.light,
    marginLeft: 6,
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
    marginTop: 60,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: Colors.text.light,
    textAlign: 'center',
    lineHeight: 20,
  },
});