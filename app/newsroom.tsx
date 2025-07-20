import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Stack, useRouter } from 'expo-router';
import { Newspaper, Filter, Play } from 'lucide-react-native';
import Colors from '@/constants/colors';
import BackButton from '@/components/BackButton';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: 'live' | 'completed' | 'coming-soon';
  type: 'article' | 'reel';
  image: string;
  date: string;
  readTime?: string;
  duration?: string;
}

const newsItems: NewsItem[] = [
  {
    id: '1',
    title: 'Liverpool FC Secures Champions League Qualification',
    summary: 'Strong performance drives investor confidence and share price growth',
    category: 'live',
    type: 'article',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=200&fit=crop',
    date: '2024-12-19',
    readTime: '3 min read',
  },
  {
    id: '2',
    title: 'McLaren Racing Partnership Announcement',
    summary: 'New sponsorship deal boosts revenue projections for 2025',
    category: 'live',
    type: 'reel',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop',
    date: '2024-12-18',
    duration: '2:15',
  },
  {
    id: '3',
    title: 'Cardiff City Championship Push Update',
    summary: 'Strong season performance attracts new investor interest',
    category: 'live',
    type: 'article',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=200&fit=crop',
    date: '2024-12-17',
    readTime: '4 min read',
  },
  {
    id: '4',
    title: 'British Cycling Debenture Programme Success',
    summary: 'Completed funding round delivers strong returns to investors',
    category: 'completed',
    type: 'article',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop',
    date: '2024-12-15',
    readTime: '5 min read',
  },
  {
    id: '5',
    title: 'Exeter Chiefs Investment Highlights',
    summary: 'Investor testimonials from successful rugby investment',
    category: 'completed',
    type: 'reel',
    image: 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=400&h=200&fit=crop',
    date: '2024-12-14',
    duration: '3:45',
  },
  {
    id: '6',
    title: 'Ohio State Stadium Funding Launch',
    summary: 'New investment opportunity opens for college sports fans',
    category: 'coming-soon',
    type: 'article',
    image: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=400&h=200&fit=crop',
    date: '2024-12-20',
    readTime: '6 min read',
  },
  {
    id: '7',
    title: 'Hexagon Cup Team Ownership Preview',
    summary: 'Exclusive look at upcoming 75% team ownership opportunity',
    category: 'coming-soon',
    type: 'reel',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=200&fit=crop',
    date: '2024-12-22',
    duration: '4:20',
  },
];

export default function NewsroomScreen() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'live' | 'completed' | 'coming-soon'>('all');

  const filteredNews = selectedFilter === 'all' 
    ? newsItems 
    : newsItems.filter(item => item.category === selectedFilter);

  const handleNewsPress = (item: NewsItem) => {
    if (item.type === 'article') {
      router.push(`/article/${item.id}`);
    } else {
      // Handle reel playback
      console.log('Play reel:', item.id);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'live': return Colors.accent.green;
      case 'completed': return Colors.accent.blue;
      case 'coming-soon': return Colors.accent.orange;
      default: return Colors.text.light;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'live': return 'Live';
      case 'completed': return 'Completed';
      case 'coming-soon': return 'Coming Soon';
      default: return '';
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          headerShown: true,
          headerTitle: 'Newsroom',
          headerStyle: { backgroundColor: Colors.primary.blue },
          headerTintColor: Colors.text.white,
          headerTitleStyle: { fontWeight: 'bold' },
          headerLeft: () => <BackButton />,
        }} 
      />
      <StatusBar style="light" />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerSection}>
          <Newspaper size={24} color={Colors.primary.orange} />
          <Text style={styles.headerTitle}>All News & Content</Text>
        </View>

        <View style={styles.filterSection}>
          <Filter size={16} color={Colors.text.white} />
          <Text style={styles.filterLabel}>Filter by Status:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
            {['all', 'live', 'completed', 'coming-soon'].map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterButton,
                  selectedFilter === filter && styles.filterButtonActive
                ]}
                onPress={() => setSelectedFilter(filter as any)}
              >
                <Text style={[
                  styles.filterButtonText,
                  selectedFilter === filter && styles.filterButtonTextActive
                ]}>
                  {filter === 'all' ? 'All' : 
                   filter === 'coming-soon' ? 'Coming Soon' : 
                   filter.charAt(0).toUpperCase() + filter.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.newsGrid}>
          {filteredNews.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.newsCard}
              onPress={() => handleNewsPress(item)}
            >
              <View style={styles.imageContainer}>
                <Image source={{ uri: item.image }} style={styles.newsImage} />
                {item.type === 'reel' && (
                  <View style={styles.playOverlay}>
                    <Play size={24} color={Colors.text.white} />
                  </View>
                )}
                <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(item.category) }]}>
                  <Text style={styles.categoryText}>{getCategoryLabel(item.category)}</Text>
                </View>
              </View>
              
              <View style={styles.newsContent}>
                <Text style={styles.newsTitle}>{item.title}</Text>
                <Text style={styles.newsSummary}>{item.summary}</Text>
                
                <View style={styles.newsFooter}>
                  <Text style={styles.newsDate}>{new Date(item.date).toLocaleDateString('en-GB')}</Text>
                  <Text style={styles.newsMetadata}>
                    {item.type === 'article' ? item.readTime : item.duration}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.statsSection}>
          <Text style={styles.statsTitle}>Content Statistics</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{newsItems.filter(n => n.type === 'article').length}</Text>
              <Text style={styles.statLabel}>Articles</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{newsItems.filter(n => n.type === 'reel').length}</Text>
              <Text style={styles.statLabel}>Reels</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{newsItems.filter(n => n.category === 'live').length}</Text>
              <Text style={styles.statLabel}>Live Assets</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{newsItems.filter(n => n.category === 'completed').length}</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
          </View>
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
  headerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginLeft: 12,
  },
  filterSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text.white,
    marginLeft: 8,
    marginRight: 12,
  },
  filterScroll: {
    flex: 1,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  filterButtonActive: {
    backgroundColor: Colors.primary.orange,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text.white,
  },
  filterButtonTextActive: {
    color: Colors.text.white,
  },
  newsGrid: {
    marginTop: 16,
  },
  newsCard: {
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
  },
  newsImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  playOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -12 }, { translateY: -12 }],
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 20,
    padding: 8,
  },
  categoryBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.text.white,
  },
  newsContent: {
    padding: 20,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 8,
  },
  newsSummary: {
    fontSize: 14,
    color: Colors.text.light,
    lineHeight: 20,
    marginBottom: 12,
  },
  newsFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  newsDate: {
    fontSize: 12,
    color: Colors.text.light,
  },
  newsMetadata: {
    fontSize: 12,
    color: Colors.primary.orange,
    fontWeight: '600',
  },
  statsSection: {
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 16,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary.orange,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.text.light,
  },
});