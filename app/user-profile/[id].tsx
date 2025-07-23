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

const getDataSharingPartners = (userId: string) => {
  const partnerOptions = [
    { name: 'Nike', logo: 'https://logos-world.net/wp-content/uploads/2020/11/Nike-Logo.png' },
    { name: 'Adidas', logo: 'https://logos-world.net/wp-content/uploads/2020/09/Adidas-Logo.png' },
    { name: 'Heineken', logo: 'https://logos-world.net/wp-content/uploads/2020/09/Heineken-Logo.png' },
    { name: 'Google', logo: 'https://logos-world.net/wp-content/uploads/2020/09/Google-Logo.png' },
    { name: 'Rolex', logo: 'https://logos-world.net/wp-content/uploads/2020/11/Rolex-Logo.png' },
    { name: 'AXA', logo: 'https://logos-world.net/wp-content/uploads/2020/12/AXA-Logo.png' },
    { name: 'Mastercard', logo: 'https://logos-world.net/wp-content/uploads/2020/11/Mastercard-Logo.png' },
    { name: 'Coca-Cola', logo: 'https://logos-world.net/wp-content/uploads/2020/09/Coca-Cola-Logo.png' },
    { name: 'Samsung', logo: 'https://logos-world.net/wp-content/uploads/2020/09/Samsung-Logo.png' },
    { name: 'BMW', logo: 'https://logos-world.net/wp-content/uploads/2020/11/BMW-Logo.png' },
  ];

  const partnerMappings: { [key: string]: string[] } = {
    'james-mitchell': ['Nike', 'Mastercard'],
    'sarah-chen': ['Google', 'Samsung', 'BMW'],
    'michael-rodriguez': ['Rolex', 'Heineken'],
    'emma-thompson': ['Adidas', 'AXA', 'Google', 'Nike'],
    'david-park': ['Samsung', 'Nike', 'Mastercard'],
    'lisa-wang': ['Google', 'BMW'],
    'alex-johnson': ['Coca-Cola', 'Adidas', 'Heineken'],
    'sophie-martin': ['Rolex', 'AXA', 'Mastercard', 'Heineken'],
    'ryan-oconnor': ['BMW', 'Rolex', 'Samsung'],
    'maria-gonzalez': ['Nike', 'Coca-Cola', 'Adidas', 'Google'],
    'alessandro-rossi': ['Nike', 'AXA'],
    'lars-andersen': ['Samsung', 'Google'],
    'fatima-al-zahra': ['BMW', 'Rolex', 'Mastercard'],
    'joao-silva': ['Nike', 'Coca-Cola', 'Adidas'],
    'sophie-dubois': ['Rolex', 'AXA', 'Heineken'],
    'hiroshi-tanaka': ['Samsung', 'Google', 'Nike'],
    'emma-johansson': ['Adidas', 'AXA'],
    'carlos-mendoza': ['Nike', 'Heineken'],
    'aisha-okonkwo': ['Nike', 'Coca-Cola'],
    'viktor-petrov': ['BMW', 'Rolex', 'Samsung', 'Mastercard'],
    'isabella-martinez': ['Google', 'Nike', 'AXA'],
    'chen-wei': ['Samsung', 'Google', 'BMW'],
    'amara-thompson': ['Adidas', 'AXA', 'Nike'],
    'dmitri-volkov': ['BMW', 'Rolex'],
    'leila-hassan': ['Rolex', 'AXA', 'Heineken'],
    'kai-nakamura': ['Samsung', 'Google'],
    'olivia-clarke': ['Nike', 'Google', 'Adidas'],
    'mateo-rodriguez': ['Coca-Cola', 'Nike'],
    'zara-ahmed': ['Google', 'AXA'],
    'finn-osullivan': ['Heineken', 'Nike'],
    'nadia-popovic': ['Nike', 'Coca-Cola', 'Adidas'],
    'kwame-asante': ['Nike', 'Google'],
    'ingrid-larsson': ['Samsung', 'AXA', 'Google'],
    'tom-wilson': ['Nike', 'Coca-Cola'],
    'katie-brown': ['Google', 'Nike'],
    'mark-stevens': ['BMW', 'Rolex', 'Samsung'],
    'anna-rodriguez': ['Adidas', 'AXA'],
    'david-kim': ['Samsung', 'Google', 'Nike'],
    'emma-wilson': ['BMW', 'Rolex'],
    'james-parker': ['Nike', 'Mastercard', 'Google'],
    'lisa-thompson': ['Coca-Cola', 'Nike', 'Adidas'],
    'james-wilson': ['Nike', 'Mastercard', 'Google'],
    'rachel-thompson': ['BMW', 'Rolex', 'Samsung'],
    'david-thompson': ['Rolex', 'AXA', 'Heineken'],
    'emma-johnson': ['Google', 'Nike', 'AXA'],
    'michael-brown': ['Nike', 'Coca-Cola'],
    'alex-rodriguez': ['Coca-Cola', 'Nike', 'Adidas'],
  };

  const userPartners = partnerMappings[userId] || ['Nike', 'AXA'];
  return partnerOptions.filter(partner => userPartners.includes(partner.name));
};

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
    assetsOwned: ['Ryder Cup', 'Exeter Chiefs'],
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
    assetsOwned: ['Liverpool FC', 'British Cycling', 'Exeter Chiefs'],
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
    assetsOwned: ['Exeter Chiefs', 'Ultimate Frisbee Association'],
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
    assetsOwned: ['Liverpool FC', 'Exeter Chiefs'],
    achievements: ['Liverpool Legend', 'Passionate Investor', 'Fan Favorite'],
    followers: 1432,
    following: 876,
    posts: 189,
  },
  'alessandro-rossi': {
    id: 'alessandro-rossi',
    username: 'Alessandro Rossi',
    handle: '@alex_rossi_milan',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    country: 'Italy',
    flag: '🇮🇹',
    city: 'Milan',
    bio: 'Rugby enthusiast and sports investment strategist. Passionate about Exeter Chiefs and authentic sporting experiences.',
    joinDate: 'March 2024',
    totalInvestments: 34000,
    favoriteTeams: ['Exeter Chiefs', 'AC Milan', 'Italy Rugby'],
    assetsOwned: ['Exeter Chiefs'],
    achievements: ['Rugby Expert', 'Strategic Investor', 'Community Member'],
    followers: 892,
    following: 567,
    posts: 134,
  },
  'lars-andersen': {
    id: 'lars-andersen',
    username: 'Lars Andersen',
    handle: '@lars_nordic_invest',
    avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100&h=100&fit=crop&crop=face',
    country: 'Norway',
    flag: '🇳🇴',
    city: 'Oslo',
    bio: 'Nordic sports investor with focus on emerging sports. Ultimate Frisbee World Championships supporter.',
    joinDate: 'February 2024',
    totalInvestments: 19000,
    favoriteTeams: ['Ultimate Frisbee Association', 'Norway National Team'],
    assetsOwned: ['Ultimate Frisbee Association'],
    achievements: ['Emerging Sports Pioneer', 'Nordic Investor', 'Innovation Leader'],
    followers: 634,
    following: 423,
    posts: 87,
  },
  'fatima-al-zahra': {
    id: 'fatima-al-zahra',
    username: 'Fatima Al-Zahra',
    handle: '@fatima_dubai_sports',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop&crop=face',
    country: 'UAE',
    flag: '🇦🇪',
    city: 'Dubai',
    bio: 'Motorsport enthusiast and F1 investor. McLaren Racing ISA holder with passion for paddock access.',
    joinDate: 'January 2024',
    totalInvestments: 67000,
    favoriteTeams: ['McLaren Racing', 'UAE National Team'],
    assetsOwned: ['McLaren Racing'],
    achievements: ['F1 Insider', 'High Value Investor', 'Motorsport Expert'],
    followers: 1456,
    following: 234,
    posts: 156,
  },
  'joao-silva': {
    id: 'joao-silva',
    username: 'João Silva',
    handle: '@joao_rio_investor',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    country: 'Brazil',
    flag: '🇧🇷',
    city: 'Rio de Janeiro',
    bio: 'Liverpool FC superfan from Brazil. Anfield experiences and Red family member through Keeps investment.',
    joinDate: 'April 2024',
    totalInvestments: 52000,
    favoriteTeams: ['Liverpool FC', 'Flamengo', 'Brazil National Team'],
    assetsOwned: ['Liverpool FC'],
    achievements: ['Liverpool Legend', 'International Fan', 'Community Champion'],
    followers: 1789,
    following: 678,
    posts: 203,
  },
  'sophie-dubois': {
    id: 'sophie-dubois',
    username: 'Sophie Dubois',
    handle: '@sophie_paris_golf',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    country: 'France',
    flag: '🇫🇷',
    city: 'Paris',
    bio: 'Golf enthusiast and Ryder Cup debenture holder. VIP hospitality and exclusive course access investor.',
    joinDate: 'March 2024',
    totalInvestments: 38000,
    favoriteTeams: ['Ryder Cup Team Europe', 'Paris Saint-Germain'],
    assetsOwned: ['Ryder Cup'],
    achievements: ['Golf Pro', 'VIP Access', 'Premium Investor'],
    followers: 987,
    following: 543,
    posts: 124,
  },
  'hiroshi-tanaka': {
    id: 'hiroshi-tanaka',
    username: 'Hiroshi Tanaka',
    handle: '@hiroshi_tokyo_sports',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop&crop=face',
    country: 'Japan',
    flag: '🇯🇵',
    city: 'Tokyo',
    bio: 'Sports technology investor with focus on innovative sporting experiences. Hexagon Cup benefits holder.',
    joinDate: 'May 2024',
    totalInvestments: 26000,
    favoriteTeams: ['Japan National Team', 'Tokyo FC'],
    assetsOwned: ['Hexagon Cup'],
    achievements: ['Tech Innovator', 'Early Adopter', 'Sports Pioneer'],
    followers: 743,
    following: 892,
    posts: 98,
  },
  'emma-johansson': {
    id: 'emma-johansson',
    username: 'Emma Johansson',
    handle: '@emma_stockholm_cycle',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
    country: 'Sweden',
    flag: '🇸🇪',
    city: 'Stockholm',
    bio: 'Cycling enthusiast and British Cycling investor. Training camp access and Olympic venue tours participant.',
    joinDate: 'February 2024',
    totalInvestments: 31000,
    favoriteTeams: ['British Cycling', 'Sweden National Team'],
    assetsOwned: ['British Cycling'],
    achievements: ['Cycling Champion', 'Olympic Access', 'Training Expert'],
    followers: 1234,
    following: 456,
    posts: 167,
  },
  'carlos-mendoza': {
    id: 'carlos-mendoza',
    username: 'Carlos Mendoza',
    handle: '@carlos_madrid_rugby',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face',
    country: 'Spain',
    flag: '🇪🇸',
    city: 'Madrid',
    bio: 'Rugby fanatic and Exeter Chiefs investor. Sandy Park hospitality and training ground access member.',
    joinDate: 'March 2024',
    totalInvestments: 29000,
    favoriteTeams: ['Exeter Chiefs', 'Real Madrid', 'Spain Rugby'],
    assetsOwned: ['Exeter Chiefs'],
    achievements: ['Rugby Expert', 'VIP Member', 'Squad Insider'],
    followers: 876,
    following: 654,
    posts: 145,
  },
  'aisha-okonkwo': {
    id: 'aisha-okonkwo',
    username: 'Aisha Okonkwo',
    handle: '@aisha_lagos_sports',
    avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face',
    country: 'Nigeria',
    flag: '🇳🇬',
    city: 'Lagos',
    bio: 'Liverpool FC superfan from Nigeria. Anfield tours and training ground access through Keeps investment.',
    joinDate: 'April 2024',
    totalInvestments: 47000,
    favoriteTeams: ['Liverpool FC', 'Nigeria National Team', 'Lagos FC'],
    assetsOwned: ['Liverpool FC'],
    achievements: ['Liverpool Legend', 'African Champion', 'Red Family'],
    followers: 1567,
    following: 789,
    posts: 234,
  },
  'viktor-petrov': {
    id: 'viktor-petrov',
    username: 'Viktor Petrov',
    handle: '@viktor_moscow_f1',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face',
    country: 'Russia',
    flag: '🇷🇺',
    city: 'Moscow',
    bio: 'Formula 1 enthusiast and McLaren Racing investor. Paddock access and factory tours participant.',
    joinDate: 'January 2024',
    totalInvestments: 85000,
    favoriteTeams: ['McLaren Racing', 'Russia National Team'],
    assetsOwned: ['McLaren Racing'],
    achievements: ['F1 Expert', 'High Roller', 'Paddock Insider'],
    followers: 2134,
    following: 345,
    posts: 189,
  },
  'isabella-martinez': {
    id: 'isabella-martinez',
    username: 'Isabella Martinez',
    handle: '@bella_buenos_aires',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face',
    country: 'Argentina',
    flag: '🇦🇷',
    city: 'Buenos Aires',
    bio: 'Sports journalist and investment analyst. Breaking news and market insights specialist.',
    joinDate: 'February 2024',
    totalInvestments: 43000,
    favoriteTeams: ['Argentina National Team', 'Boca Juniors'],
    assetsOwned: ['Liverpool FC'],
    achievements: ['Sports Journalist', 'Market Analyst', 'News Breaker'],
    followers: 2456,
    following: 567,
    posts: 345,
  },
  'chen-wei': {
    id: 'chen-wei',
    username: 'Chen Wei',
    handle: '@chen_beijing_news',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    country: 'China',
    flag: '🇨🇳',
    city: 'Beijing',
    bio: 'Tech and sports investment analyst. McLaren Racing partnership and AI technology specialist.',
    joinDate: 'March 2024',
    totalInvestments: 67000,
    favoriteTeams: ['McLaren Racing', 'China National Team'],
    assetsOwned: ['McLaren Racing'],
    achievements: ['Tech Expert', 'Partnership Analyst', 'Innovation Leader'],
    followers: 1876,
    following: 432,
    posts: 267,
  },
  'amara-thompson': {
    id: 'amara-thompson',
    username: 'Amara Thompson',
    handle: '@amara_cape_town',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    country: 'South Africa',
    flag: '🇿🇦',
    city: 'Cape Town',
    bio: 'Cycling infrastructure and Olympic facility investment specialist. British Cycling supporter.',
    joinDate: 'April 2024',
    totalInvestments: 54000,
    favoriteTeams: ['British Cycling', 'South Africa National Team'],
    assetsOwned: ['British Cycling'],
    achievements: ['Infrastructure Expert', 'Olympic Specialist', 'Facility Investor'],
    followers: 1345,
    following: 678,
    posts: 198,
  },
  'dmitri-volkov': {
    id: 'dmitri-volkov',
    username: 'Dmitri Volkov',
    handle: '@dmitri_st_petersburg',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face',
    country: 'Russia',
    flag: '🇷🇺',
    city: 'St. Petersburg',
    bio: 'Rugby performance analyst and Exeter Chiefs investor. Premiership final and commercial value specialist.',
    joinDate: 'March 2024',
    totalInvestments: 43000,
    favoriteTeams: ['Exeter Chiefs', 'Russia Rugby'],
    assetsOwned: ['Exeter Chiefs'],
    achievements: ['Performance Analyst', 'Rugby Expert', 'Commercial Specialist'],
    followers: 987,
    following: 543,
    posts: 156,
  },
  'leila-hassan': {
    id: 'leila-hassan',
    username: 'Leila Hassan',
    handle: '@leila_cairo_sports',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face',
    country: 'Egypt',
    flag: '🇪🇬',
    city: 'Cairo',
    bio: 'Golf tournament specialist and Ryder Cup debenture holder. Record ticket sales and valuation expert.',
    joinDate: 'February 2024',
    totalInvestments: 38000,
    favoriteTeams: ['Ryder Cup Team Europe', 'Egypt National Team'],
    assetsOwned: ['Ryder Cup'],
    achievements: ['Golf Expert', 'Tournament Specialist', 'Valuation Analyst'],
    followers: 1234,
    following: 456,
    posts: 178,
  },
  'kai-nakamura': {
    id: 'kai-nakamura',
    username: 'Kai Nakamura',
    handle: '@kai_osaka_ultimate',
    avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100&h=100&fit=crop&crop=face',
    country: 'Japan',
    flag: '🇯🇵',
    city: 'Osaka',
    bio: 'Ultimate Frisbee World Championships investor and global participation growth analyst.',
    joinDate: 'May 2024',
    totalInvestments: 29000,
    favoriteTeams: ['Ultimate Frisbee Association', 'Japan National Team'],
    assetsOwned: ['Ultimate Frisbee Association'],
    achievements: ['Ultimate Expert', 'Growth Analyst', 'Global Specialist'],
    followers: 876,
    following: 654,
    posts: 134,
  },
  'olivia-clarke': {
    id: 'olivia-clarke',
    username: 'Olivia Clarke',
    handle: '@olivia_sydney_sports',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
    country: 'Australia',
    flag: '🇦🇺',
    city: 'Sydney',
    bio: 'Global sports investment community builder. Connecting investors worldwide through shared passion.',
    joinDate: 'March 2024',
    totalInvestments: 56000,
    favoriteTeams: ['Sydney FC', 'Australia National Team'],
    assetsOwned: ['Liverpool FC', 'Exeter Chiefs'],
    achievements: ['Community Builder', 'Global Connector', 'Investment Specialist'],
    followers: 2345,
    following: 789,
    posts: 267,
  },
  'mateo-rodriguez': {
    id: 'mateo-rodriguez',
    username: 'Mateo Rodriguez',
    handle: '@mateo_mexico_city',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face',
    country: 'Mexico',
    flag: '🇲🇽',
    city: 'Mexico City',
    bio: 'Sports market trends analyst and passionate fan investor. Community discussion leader.',
    joinDate: 'April 2024',
    totalInvestments: 41000,
    favoriteTeams: ['Club América', 'Mexico National Team'],
    assetsOwned: ['Liverpool FC'],
    achievements: ['Market Analyst', 'Trend Specialist', 'Discussion Leader'],
    followers: 1456,
    following: 678,
    posts: 189,
  },
  'zara-ahmed': {
    id: 'zara-ahmed',
    username: 'Zara Ahmed',
    handle: '@zara_karachi_invest',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop&crop=face',
    country: 'Pakistan',
    flag: '🇵🇰',
    city: 'Karachi',
    bio: 'Sports investment transparency advocate and community support specialist.',
    joinDate: 'March 2024',
    totalInvestments: 33000,
    favoriteTeams: ['Pakistan National Team', 'Karachi Kings'],
    assetsOwned: ['British Cycling'],
    achievements: ['Transparency Advocate', 'Community Support', 'Investment Guide'],
    followers: 1123,
    following: 567,
    posts: 145,
  },
  'finn-osullivan': {
    id: 'finn-osullivan',
    username: 'Finn O\'Sullivan',
    handle: '@finn_dublin_sports',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    country: 'Ireland',
    flag: '🇮🇪',
    city: 'Dublin',
    bio: 'Global sports investment opportunity researcher. Continental investment perspective specialist.',
    joinDate: 'February 2024',
    totalInvestments: 37000,
    favoriteTeams: ['Ireland Rugby', 'Celtic FC'],
    assetsOwned: ['Exeter Chiefs'],
    achievements: ['Global Researcher', 'Opportunity Finder', 'Continental Expert'],
    followers: 987,
    following: 432,
    posts: 167,
  },
  'nadia-popovic': {
    id: 'nadia-popovic',
    username: 'Nadia Popovic',
    handle: '@nadia_belgrade_fan',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    country: 'Serbia',
    flag: '🇷🇸',
    city: 'Belgrade',
    bio: 'Sports investment community events organizer. London meetup and networking specialist.',
    joinDate: 'March 2024',
    totalInvestments: 44000,
    favoriteTeams: ['Red Star Belgrade', 'Serbia National Team'],
    assetsOwned: ['Liverpool FC'],
    achievements: ['Event Organizer', 'Network Builder', 'Community Leader'],
    followers: 1678,
    following: 543,
    posts: 234,
  },
  'kwame-asante': {
    id: 'kwame-asante',
    username: 'Kwame Asante',
    handle: '@kwame_accra_sports',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    country: 'Ghana',
    flag: '🇬🇭',
    city: 'Accra',
    bio: 'Diverse sports portfolio investor. Traditional football to emerging sports specialist.',
    joinDate: 'April 2024',
    totalInvestments: 39000,
    favoriteTeams: ['Ghana National Team', 'Hearts of Oak'],
    assetsOwned: ['Liverpool FC', 'Ultimate Frisbee Association'],
    achievements: ['Portfolio Diversifier', 'Sports Explorer', 'Fan Advocate'],
    followers: 1345,
    following: 678,
    posts: 198,
  },
  'ingrid-larsson': {
    id: 'ingrid-larsson',
    username: 'Ingrid Larsson',
    handle: '@ingrid_oslo_invest',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
    country: 'Norway',
    flag: '🇳🇴',
    city: 'Oslo',
    bio: 'Sports investment accessibility advocate. Educational resources and newcomer support specialist.',
    joinDate: 'February 2024',
    totalInvestments: 48000,
    favoriteTeams: ['Norway National Team', 'Rosenborg'],
    assetsOwned: ['British Cycling', 'Ultimate Frisbee Association'],
    achievements: ['Accessibility Advocate', 'Education Leader', 'Newcomer Guide'],
    followers: 1789,
    following: 456,
    posts: 267,
  },
  'tom-wilson': {
    id: 'tom-wilson',
    username: 'Tom Wilson',
    handle: '@tomwilson_lfc',
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=100&h=100&fit=crop&crop=face',
    country: 'United Kingdom',
    flag: '🇬🇧',
    city: 'Liverpool',
    bio: 'Liverpool FC superfan and stadium tour enthusiast. Passionate about Anfield experiences.',
    joinDate: 'March 2024',
    totalInvestments: 28000,
    favoriteTeams: ['Liverpool FC', 'England National Team'],
    assetsOwned: ['Liverpool FC'],
    achievements: ['Liverpool Legend', 'Stadium Expert', 'Fan Champion'],
    followers: 1234,
    following: 567,
    posts: 189,
  },
  'katie-brown': {
    id: 'katie-brown',
    username: 'Katie Brown',
    handle: '@katieb_investor',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face',
    country: 'United States',
    flag: '🇺🇸',
    city: 'Boston',
    bio: 'Sports investment newcomer looking to get involved in team ownership opportunities.',
    joinDate: 'May 2024',
    totalInvestments: 15000,
    favoriteTeams: ['Boston Celtics', 'New England Patriots'],
    assetsOwned: ['Liverpool FC'],
    achievements: ['New Investor', 'Learning Enthusiast', 'Community Member'],
    followers: 456,
    following: 789,
    posts: 67,
  },
  'mark-stevens': {
    id: 'mark-stevens',
    username: 'Mark Stevens',
    handle: '@markstevens_f1',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
    country: 'United Kingdom',
    flag: '🇬🇧',
    city: 'London',
    bio: 'Formula 1 enthusiast and McLaren Racing investor. Sponsorship revenue sharing advocate.',
    joinDate: 'February 2024',
    totalInvestments: 45000,
    favoriteTeams: ['McLaren Racing', 'Mercedes F1'],
    assetsOwned: ['McLaren Racing'],
    achievements: ['F1 Expert', 'Revenue Specialist', 'Racing Fan'],
    followers: 1567,
    following: 432,
    posts: 234,
  },
  'anna-rodriguez': {
    id: 'anna-rodriguez',
    username: 'Anna Rodriguez',
    handle: '@annarodriguez_racing',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    country: 'Spain',
    flag: '🇪🇸',
    city: 'Barcelona',
    bio: 'Racing transparency advocate and McLaren investor. Passionate about clear investment processes.',
    joinDate: 'March 2024',
    totalInvestments: 32000,
    favoriteTeams: ['McLaren Racing', 'FC Barcelona'],
    assetsOwned: ['McLaren Racing'],
    achievements: ['Transparency Advocate', 'Racing Expert', 'Process Specialist'],
    followers: 987,
    following: 654,
    posts: 156,
  },
  'david-kim': {
    id: 'david-kim',
    username: 'David Kim',
    handle: '@davidkim_racing',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    country: 'South Korea',
    flag: '🇰🇷',
    city: 'Seoul',
    bio: 'Sports investment accessibility advocate. Believes in democratizing team ownership.',
    joinDate: 'April 2024',
    totalInvestments: 29000,
    favoriteTeams: ['McLaren Racing', 'South Korea National Team'],
    assetsOwned: ['McLaren Racing'],
    achievements: ['Accessibility Champion', 'Democracy Advocate', 'Investment Guide'],
    followers: 1123,
    following: 567,
    posts: 178,
  },
  'emma-wilson': {
    id: 'emma-wilson',
    username: 'Emma Wilson',
    handle: '@emmawilson_f1',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
    country: 'Australia',
    flag: '🇦🇺',
    city: 'Melbourne',
    bio: 'F1 fan engagement specialist and exclusive access enthusiast. Future of fandom advocate.',
    joinDate: 'January 2024',
    totalInvestments: 38000,
    favoriteTeams: ['McLaren Racing', 'Australia National Team'],
    assetsOwned: ['McLaren Racing'],
    achievements: ['Fan Engagement Expert', 'Access Specialist', 'Future Advocate'],
    followers: 1456,
    following: 678,
    posts: 203,
  },
  'james-parker': {
    id: 'james-parker',
    username: 'James Parker',
    handle: '@jamesparker_investor',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    country: 'Canada',
    flag: '🇨🇦',
    city: 'Vancouver',
    bio: 'Sports investment democratization advocate. Regular fan turned team owner.',
    joinDate: 'February 2024',
    totalInvestments: 41000,
    favoriteTeams: ['Vancouver Canucks', 'Toronto FC'],
    assetsOwned: ['McLaren Racing', 'Liverpool FC'],
    achievements: ['Democracy Champion', 'Fan Advocate', 'Investment Pioneer'],
    followers: 1234,
    following: 456,
    posts: 189,
  },
  'lisa-thompson': {
    id: 'lisa-thompson',
    username: 'Lisa Thompson',
    handle: '@lisathompson_sports',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face',
    country: 'United States',
    flag: '🇺🇸',
    city: 'Chicago',
    bio: 'Sports success participation advocate. Believes fans should benefit from team achievements.',
    joinDate: 'March 2024',
    totalInvestments: 35000,
    favoriteTeams: ['Chicago Bulls', 'Chicago Bears'],
    assetsOwned: ['Liverpool FC', 'McLaren Racing'],
    achievements: ['Success Advocate', 'Team Supporter', 'Achievement Specialist'],
    followers: 1567,
    following: 789,
    posts: 234,
  },
  'james-wilson': {
    id: 'james-wilson',
    username: 'James Wilson',
    handle: '@jameswilson_investor',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    country: 'United States',
    flag: '🇺🇸',
    city: 'New York',
    bio: 'Liverpool investment insights specialist. Great at analyzing team investment opportunities.',
    joinDate: 'February 2024',
    totalInvestments: 42000,
    favoriteTeams: ['Liverpool FC', 'New York Yankees'],
    assetsOwned: ['Liverpool FC'],
    achievements: ['Investment Analyst', 'Insight Specialist', 'Team Expert'],
    followers: 1345,
    following: 567,
    posts: 198,
  },
  'rachel-thompson': {
    id: 'rachel-thompson',
    username: 'Rachel Thompson',
    handle: '@rachelthompson_racing',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    country: 'Spain',
    flag: '🇪🇸',
    city: 'Madrid',
    bio: 'McLaren Racing opportunity analyst. Passionate about F1 investment strategies.',
    joinDate: 'March 2024',
    totalInvestments: 38000,
    favoriteTeams: ['McLaren Racing', 'Real Madrid'],
    assetsOwned: ['McLaren Racing'],
    achievements: ['F1 Analyst', 'Racing Expert', 'Strategy Specialist'],
    followers: 1234,
    following: 678,
    posts: 167,
  },
  'david-thompson': {
    id: 'david-thompson',
    username: 'David Thompson',
    handle: '@davidthompson_sports',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    country: 'United Kingdom',
    flag: '🇬🇧',
    city: 'London',
    bio: 'Ryder Cup investment specialist. Golf tournament debenture expert.',
    joinDate: 'February 2024',
    totalInvestments: 35000,
    favoriteTeams: ['Ryder Cup Team Europe', 'England Golf'],
    assetsOwned: ['Ryder Cup'],
    achievements: ['Golf Expert', 'Tournament Specialist', 'Debenture Pro'],
    followers: 987,
    following: 543,
    posts: 145,
  },
  'emma-johnson': {
    id: 'emma-johnson',
    username: 'Emma Johnson',
    handle: '@emmajohnson_benefits',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop&crop=face',
    country: 'Canada',
    flag: '🇨🇦',
    city: 'Toronto',
    bio: 'Exclusive benefits enthusiast. Passionate about VIP sports experiences.',
    joinDate: 'April 2024',
    totalInvestments: 31000,
    favoriteTeams: ['Toronto Raptors', 'Toronto FC'],
    assetsOwned: ['Liverpool FC', 'McLaren Racing'],
    achievements: ['Benefits Expert', 'VIP Specialist', 'Experience Collector'],
    followers: 1456,
    following: 789,
    posts: 189,
  },
  'michael-brown': {
    id: 'michael-brown',
    username: 'Michael Brown',
    handle: '@michaelbrown_stadium',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    country: 'Australia',
    flag: '🇦🇺',
    city: 'Sydney',
    bio: 'Stadium tour enthusiast and sports facility expert. Looking forward to exclusive access.',
    joinDate: 'March 2024',
    totalInvestments: 28000,
    favoriteTeams: ['Sydney FC', 'Australia National Team'],
    assetsOwned: ['Liverpool FC'],
    achievements: ['Stadium Expert', 'Tour Specialist', 'Facility Enthusiast'],
    followers: 876,
    following: 432,
    posts: 134,
  },
  'alex-rodriguez': {
    id: 'alex-rodriguez',
    username: 'Alex Rodriguez',
    handle: '@alexrodriguez_fan',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face',
    country: 'Mexico',
    flag: '🇲🇽',
    city: 'Mexico City',
    bio: 'Sports investment follower and community member. Active in following other investors.',
    joinDate: 'April 2024',
    totalInvestments: 25000,
    favoriteTeams: ['Club América', 'Mexico National Team'],
    assetsOwned: ['Liverpool FC'],
    achievements: ['Community Member', 'Active Follower', 'Investment Enthusiast'],
    followers: 678,
    following: 1234,
    posts: 89,
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

        {/* Favourite Teams */}
        <View style={styles.teamsContainer}>
          <View style={styles.sectionHeader}>
            <Heart size={20} color={Colors.accent.red} />
            <Text style={styles.sectionTitle}>Favourite Teams</Text>
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

        {/* Data Sharing Partners */}
        <View style={styles.partnersContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Data Sharing Partners</Text>
          </View>
          <View style={styles.partnersGrid}>
            {getDataSharingPartners(profile.id).map((partner, index) => (
              <View key={index} style={styles.partnerItem}>
                <Image 
                  source={{ uri: partner.logo }} 
                  style={styles.partnerLogo}
                />
                <Text style={styles.partnerName}>{partner.name}</Text>
                <Text style={styles.partnerStatus}>✓ Opted In</Text>
              </View>
            ))}
          </View>
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
});