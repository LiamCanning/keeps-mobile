import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Stack, useRouter } from 'expo-router';
import { Search, Filter, TrendingUp, Users, Hash, Clock } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface SearchResult {
  id: string;
  type: 'user' | 'post' | 'investment' | 'hashtag';
  title: string;
  subtitle: string;
  avatar?: string;
  timestamp?: string;
  flag?: string;
  country?: string;
}

const trendingSearches = [
  'Liverpool FC investment',
  'McLaren Racing',
  'Ryder Cup benefits',
  'Sports investment tips',
  'Exclusive access',
];

const recentSearches = [
  'Sarah Chen',
  'Investment strategies',
  'Stadium tours',
  'Diamond tier benefits',
];

const searchResults: SearchResult[] = [
  {
    id: '1',
    type: 'user',
    title: 'Sarah Chen',
    subtitle: '@sarahc_investor • 2.4k followers',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    flag: '🇺🇸',
    country: 'USA'
  },
  {
    id: '2',
    type: 'post',
    title: 'McLaren Racing Investment Insights',
    subtitle: 'James Mitchell • 45 likes • 12 comments',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    timestamp: '2h ago',
    flag: '🇬🇧',
    country: 'UK'
  },
  {
    id: '3',
    type: 'investment',
    title: 'Liverpool FC Equity Opportunity',
    subtitle: '4-8% projected returns • £50M valuation',
    avatar: 'https://r2-pub.rork.com/attachments/liverpool-logo.png',
  },
  {
    id: '4',
    type: 'hashtag',
    title: '#SportsInvestment',
    subtitle: '1.2k posts • Trending in Sports',
  },
  {
    id: '5',
    type: 'user',
    title: 'Emma Thompson',
    subtitle: '@emmathompson_uk • 1.8k followers',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    flag: '🇬🇧',
    country: 'UK'
  },
];

export default function SearchScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setShowResults(query.length > 0);
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'user':
        return <Users size={20} color={Colors.primary.blue} />;
      case 'post':
        return <TrendingUp size={20} color={Colors.accent.green} />;
      case 'investment':
        return <TrendingUp size={20} color={Colors.primary.orange} />;
      case 'hashtag':
        return <Hash size={20} color={Colors.accent.purple} />;
      default:
        return <Search size={20} color={Colors.text.light} />;
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          headerShown: true,
          headerTitle: 'Search',
          headerStyle: { backgroundColor: Colors.primary.blue },
          headerTintColor: Colors.text.white,
          headerTitleStyle: { fontWeight: 'bold' },
        }} 
      />
      <StatusBar style="light" />
      
      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Search size={20} color={Colors.text.light} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search users, posts, investments..."
            placeholderTextColor={Colors.text.light}
            value={searchQuery}
            onChangeText={handleSearch}
          />
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color={Colors.primary.blue} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {!showResults ? (
          <>
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <TrendingUp size={20} color={Colors.primary.orange} />
                <Text style={styles.sectionTitle}>Trending Searches</Text>
              </View>
              {trendingSearches.map((search, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.trendingItem}
                  onPress={() => handleSearch(search)}
                >
                  <Text style={styles.trendingText}>{search}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Clock size={20} color={Colors.text.light} />
                <Text style={styles.sectionTitle}>Recent Searches</Text>
              </View>
              {recentSearches.map((search, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.recentItem}
                  onPress={() => handleSearch(search)}
                >
                  <Text style={styles.recentText}>{search}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        ) : (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Search Results</Text>
            {searchResults.map((result) => (
              <TouchableOpacity key={result.id} style={styles.resultCard}>
                <View style={styles.resultIcon}>
                  {result.avatar ? (
                    <Image source={{ uri: result.avatar }} style={styles.resultAvatar} />
                  ) : (
                    getResultIcon(result.type)
                  )}
                </View>
                
                <View style={styles.resultContent}>
                  <Text style={styles.resultTitle}>
                    {result.title} {result.flag && result.country ? `${result.flag} ${result.country}` : ''}
                  </Text>
                  <Text style={styles.resultSubtitle}>{result.subtitle}</Text>
                  {result.timestamp && (
                    <Text style={styles.resultTimestamp}>{result.timestamp}</Text>
                  )}
                </View>
                
                <View style={styles.resultType}>
                  <Text style={styles.resultTypeText}>
                    {result.type.toUpperCase()}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Discover new investment opportunities and connect with fellow sports enthusiasts
          </Text>
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
  searchSection: {
    backgroundColor: Colors.background.card,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: Colors.text.dark,
  },
  filterButton: {
    marginLeft: 12,
    padding: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  section: {
    backgroundColor: Colors.background.card,
    margin: 16,
    borderRadius: 16,
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginLeft: 8,
  },
  trendingItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  trendingText: {
    fontSize: 16,
    color: Colors.primary.blue,
    fontWeight: '500',
  },
  recentItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  recentText: {
    fontSize: 16,
    color: Colors.text.light,
  },
  resultCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  resultIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  resultAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  resultContent: {
    flex: 1,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.dark,
    marginBottom: 4,
  },
  resultSubtitle: {
    fontSize: 14,
    color: Colors.text.light,
    marginBottom: 2,
  },
  resultTimestamp: {
    fontSize: 12,
    color: Colors.text.light,
  },
  resultType: {
    backgroundColor: Colors.background.secondary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  resultTypeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: Colors.text.light,
  },
  footer: {
    backgroundColor: Colors.background.card,
    margin: 16,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: Colors.text.light,
    textAlign: 'center',
    lineHeight: 20,
  },
});