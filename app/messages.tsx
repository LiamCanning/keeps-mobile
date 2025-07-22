import React from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Stack, useRouter } from 'expo-router';
import { Search, Edit, MoreHorizontal } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface Message {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  flag: string;
  country: string;
}

const messages: Message[] = [
  {
    id: '1',
    name: 'James Wilson',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    lastMessage: 'Great insights on the Liverpool investment!',
    timestamp: '2m',
    unread: true,
    flag: '🇺🇸',
    country: 'USA'
  },
  {
    id: '2',
    name: 'Rachel Thompson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    lastMessage: 'Are you considering the McLaren opportunity?',
    timestamp: '1h',
    unread: true,
    flag: '🇪🇸',
    country: 'Spain'
  },
  {
    id: '3',
    name: 'David Thompson',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    lastMessage: 'Thanks for the Ryder Cup tip!',
    timestamp: '3h',
    unread: false,
    flag: '🇬🇧',
    country: 'UK'
  },
  {
    id: '4',
    name: 'Emma Johnson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    lastMessage: 'The exclusive benefits are amazing',
    timestamp: '1d',
    unread: false,
    flag: '🇨🇦',
    country: 'Canada'
  },
  {
    id: '5',
    name: 'Michael Brown',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    lastMessage: 'Looking forward to the stadium tour',
    timestamp: '2d',
    unread: false,
    flag: '🇦🇺',
    country: 'Australia'
  },
];

export default function MessagesScreen() {
  const router = useRouter();

  const handleMessagePress = (messageId: string) => {
    // Navigate to individual message thread
    console.log('Open message:', messageId);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          headerShown: true,
          headerTitle: "Messages",
          headerStyle: { backgroundColor: Colors.primary.blue },
          headerTintColor: Colors.text.white,
          headerTitleStyle: { fontWeight: 'bold' },
          headerRight: () => (
            <TouchableOpacity style={styles.headerButton}>
              <Edit size={20} color={Colors.text.white} />
            </TouchableOpacity>
          ),
        }} 
      />
      <StatusBar style="light" />
      
      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Search size={20} color={Colors.text.light} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search messages..."
            placeholderTextColor={Colors.text.light}
          />
        </View>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {messages.map((message) => (
          <TouchableOpacity 
            key={message.id} 
            style={styles.messageCard}
            onPress={() => handleMessagePress(message.id)}
          >
            <View style={styles.avatarContainer}>
              <Image source={{ uri: message.avatar }} style={styles.avatar} />
              {message.unread && <View style={styles.unreadIndicator} />}
            </View>
            
            <View style={styles.messageContent}>
              <View style={styles.messageHeader}>
                <Text style={styles.messageName}>
                  {message.name} {message.flag} {message.country}
                </Text>
                <Text style={styles.messageTime}>{message.timestamp}</Text>
              </View>
              <Text style={[
                styles.messageText,
                message.unread && styles.unreadMessageText
              ]}>
                {message.lastMessage}
              </Text>
            </View>
            
            <TouchableOpacity style={styles.moreButton}>
              <MoreHorizontal size={16} color={Colors.text.light} />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
        
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateTitle}>Connect with Fellow Investors</Text>
          <Text style={styles.emptyStateText}>
            Start conversations with other sports investors and share insights about your favourite teams and opportunities.
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
  headerButton: {
    marginRight: 16,
    padding: 4,
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
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: Colors.text.dark,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  messageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.card,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  unreadIndicator: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary.orange,
    borderWidth: 2,
    borderColor: Colors.background.card,
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  messageName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.dark,
  },
  messageTime: {
    fontSize: 12,
    color: Colors.text.light,
  },
  messageText: {
    fontSize: 14,
    color: Colors.text.light,
  },
  unreadMessageText: {
    color: Colors.text.dark,
    fontWeight: '500',
  },
  moreButton: {
    padding: 8,
  },
  emptyState: {
    padding: 24,
    alignItems: 'center',
    marginTop: 40,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.white,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateText: {
    fontSize: 14,
    color: Colors.text.white,
    textAlign: 'center',
    lineHeight: 20,
  },
});