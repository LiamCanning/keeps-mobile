import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Home, Play, MessageCircle } from 'lucide-react-native';
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

const reels: Reel[] = [
  {
    id: '1',
    title: 'Liverpool FC investor shares their experience - LIVE',
    thumbnail: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=600&fit=crop',
    duration: '2:15',
    views: 12500,
    likes: 847,
    comments: 23,
  },
  {
    id: '2',
    title: 'McLaren Racing behind the scenes access - LIVE',
    thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=600&fit=crop',
    duration: '1:45',
    views: 8900,
    likes: 623,
    comments: 18,
  },
  {
    id: '3',
    title: 'Cardiff City fan excited for upcoming launch - COMING SOON',
    thumbnail: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=600&fit=crop',
    duration: '3:20',
    views: 6700,
    likes: 445,
    comments: 12,
  },
  {
    id: '4',
    title: 'Ryder Cup exclusive tournament access - LIVE',
    thumbnail: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=400&h=600&fit=crop',
    duration: '2:45',
    views: 9200,
    likes: 712,
    comments: 31,
  },
  {
    id: '5',
    title: 'British Cycling debenture returns explained - COMPLETED',
    thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=600&fit=crop',
    duration: '1:55',
    views: 5400,
    likes: 398,
    comments: 15,
  },
  {
    id: '6',
    title: 'Ohio State stadium funding excitement - COMING SOON',
    thumbnail: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=400&h=600&fit=crop',
    duration: '2:30',
    views: 7800,
    likes: 542,
    comments: 19,
  },
  {
    id: '7',
    title: 'Hexagon Fan Team esports investment - COMING SOON',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=600&fit=crop',
    duration: '1:40',
    views: 4200,
    likes: 298,
    comments: 8,
  },
  {
    id: '8',
    title: 'Exeter Chiefs rugby investment success story - COMPLETED',
    thumbnail: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=600&fit=crop',
    duration: '2:10',
    views: 6300,
    likes: 478,
    comments: 21,
  },
  {
    id: '9',
    title: 'Ultimate Frisbee Association growth potential - COMPLETED',
    thumbnail: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=600&fit=crop',
    duration: '1:35',
    views: 3800,
    likes: 267,
    comments: 14,
  },
];

export default function ContentScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<'written' | 'reels'>('written');
  
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
                  <Text style={styles.reelStat}>❤️ {item.likes}</Text>
                  <TouchableOpacity onPress={() => handleCommentsPress(item.id)}>
                    <Text style={styles.reelStat}>💬 {item.comments}</Text>
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
});