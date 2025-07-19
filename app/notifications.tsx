import React from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Stack, useRouter } from 'expo-router';
import { Bell, Heart, MessageCircle, TrendingUp, Users, Gift } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'investment' | 'follow' | 'reward' | 'system';
  title: string;
  message: string;
  timestamp: string;
  avatar?: string;
  read: boolean;
}

const notifications: Notification[] = [
  {
    id: '1',
    type: 'investment',
    title: 'Investment Update',
    message: 'Your Liverpool FC investment has increased by 2.3% this week!',
    timestamp: '5m ago',
    read: false,
  },
  {
    id: '2',
    type: 'like',
    title: 'Sarah Chen liked your post',
    message: 'Your post about McLaren Racing got a new like',
    timestamp: '12m ago',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    read: false,
  },
  {
    id: '3',
    type: 'comment',
    title: 'New comment on your post',
    message: 'James Mitchell commented: "Great insights on the Ryder Cup investment!"',
    timestamp: '1h ago',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    read: true,
  },
  {
    id: '4',
    type: 'follow',
    title: 'New follower',
    message: 'Emma Thompson started following you',
    timestamp: '2h ago',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    read: true,
  },
  {
    id: '5',
    type: 'reward',
    title: 'Exclusive Benefit Unlocked!',
    message: 'You\'ve unlocked Silver tier benefits for Liverpool FC',
    timestamp: '4h ago',
    read: false,
  },
  {
    id: '6',
    type: 'investment',
    title: 'New Investment Opportunity',
    message: 'A new deal is now live: Manchester United Equity Raise',
    timestamp: '6h ago',
    read: true,
  },
  {
    id: '7',
    type: 'system',
    title: 'Portfolio Summary',
    message: 'Your weekly portfolio performance report is ready',
    timestamp: '1d ago',
    read: true,
  },
  {
    id: '8',
    type: 'like',
    title: 'Multiple likes on your post',
    message: '5 people liked your post about sports investment trends',
    timestamp: '1d ago',
    read: true,
  },
];

export default function NotificationsScreen() {
  const router = useRouter();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart size={20} color={Colors.accent.red} />;
      case 'comment':
        return <MessageCircle size={20} color={Colors.primary.blue} />;
      case 'investment':
        return <TrendingUp size={20} color={Colors.accent.green} />;
      case 'follow':
        return <Users size={20} color={Colors.primary.orange} />;
      case 'reward':
        return <Gift size={20} color={Colors.accent.purple} />;
      default:
        return <Bell size={20} color={Colors.text.light} />;
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          headerShown: true,
          headerTitle: 'Notifications',
          headerStyle: { backgroundColor: Colors.primary.blue },
          headerTintColor: Colors.text.white,
          headerTitleStyle: { fontWeight: 'bold' },
        }} 
      />
      <StatusBar style="light" />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Stay Updated</Text>
          <Text style={styles.headerSubtitle}>
            Get notified about your investments, community activity, and exclusive opportunities
          </Text>
        </View>

        {notifications.map((notification) => (
          <TouchableOpacity key={notification.id} style={[
            styles.notificationCard,
            !notification.read && styles.unreadCard
          ]}>
            <View style={styles.notificationHeader}>
              <View style={styles.iconContainer}>
                {getNotificationIcon(notification.type)}
              </View>
              {notification.avatar && (
                <Image source={{ uri: notification.avatar }} style={styles.avatar} />
              )}
              <View style={styles.notificationContent}>
                <Text style={[
                  styles.notificationTitle,
                  !notification.read && styles.unreadTitle
                ]}>
                  {notification.title}
                </Text>
                <Text style={styles.notificationMessage}>
                  {notification.message}
                </Text>
                <Text style={styles.timestamp}>{notification.timestamp}</Text>
              </View>
              {!notification.read && <View style={styles.unreadDot} />}
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            You're all caught up! 🎉
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  header: {
    backgroundColor: Colors.background.card,
    margin: 16,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.text.light,
    textAlign: 'center',
    lineHeight: 22,
  },
  notificationCard: {
    backgroundColor: Colors.background.card,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
  },
  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary.orange,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.dark,
    marginBottom: 4,
  },
  unreadTitle: {
    fontWeight: 'bold',
  },
  notificationMessage: {
    fontSize: 14,
    color: Colors.text.light,
    lineHeight: 20,
    marginBottom: 8,
  },
  timestamp: {
    fontSize: 12,
    color: Colors.text.light,
    fontWeight: '500',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary.orange,
    marginLeft: 8,
    marginTop: 4,
  },
  footer: {
    backgroundColor: Colors.background.card,
    margin: 16,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: Colors.text.light,
    fontWeight: '500',
  },
});