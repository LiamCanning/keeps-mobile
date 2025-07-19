import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Stack, useRouter } from 'expo-router';
import { Camera, Image as ImageIcon, Smile, Send } from 'lucide-react-native';
import Colors from '@/constants/colors';

export default function NewPostScreen() {
  const [postContent, setPostContent] = useState('');
  const router = useRouter();

  const handlePost = () => {
    // Handle post submission
    router.back();
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          headerShown: true,
          headerTitle: "Create New Post",
          headerStyle: { backgroundColor: Colors.primary.blue },
          headerTintColor: Colors.text.white,
          headerTitleStyle: { fontWeight: 'bold' },
          headerRight: () => (
            <TouchableOpacity onPress={handlePost} style={styles.postButton}>
              <Text style={styles.postButtonText}>Post</Text>
            </TouchableOpacity>
          ),
        }} 
      />
      <StatusBar style="light" />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileSection}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=200&h=200&fit=crop&crop=center' }} 
            style={styles.profileImage} 
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Liam 🇬🇧 UK</Text>
            <Text style={styles.profileHandle}>@liam_keeps</Text>
          </View>
        </View>

        <View style={styles.inputSection}>
          <TextInput
            style={styles.textInput}
            placeholder="What's happening in your sports investments?"
            placeholderTextColor={Colors.text.light}
            multiline
            value={postContent}
            onChangeText={setPostContent}
            maxLength={280}
          />
          
          <View style={styles.characterCount}>
            <Text style={styles.characterCountText}>{postContent.length}/280</Text>
          </View>
        </View>

        <View style={styles.mediaSection}>
          <TouchableOpacity style={styles.mediaButton}>
            <Camera size={24} color={Colors.primary.blue} />
            <Text style={styles.mediaButtonText}>Camera</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.mediaButton}>
            <ImageIcon size={24} color={Colors.primary.blue} />
            <Text style={styles.mediaButtonText}>Gallery</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.mediaButton}>
            <Smile size={24} color={Colors.primary.blue} />
            <Text style={styles.mediaButtonText}>Emoji</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.suggestionsSection}>
          <Text style={styles.suggestionsTitle}>Trending Topics</Text>
          <View style={styles.trendingTags}>
            <TouchableOpacity style={styles.trendingTag}>
              <Text style={styles.trendingTagText}>#LiverpoolFC</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.trendingTag}>
              <Text style={styles.trendingTagText}>#McLarenRacing</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.trendingTag}>
              <Text style={styles.trendingTagText}>#RyderCup</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.trendingTag}>
              <Text style={styles.trendingTagText}>#SportsInvesting</Text>
            </TouchableOpacity>
          </View>
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
    padding: 16,
  },
  postButton: {
    backgroundColor: Colors.primary.orange,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 16,
  },
  postButtonText: {
    color: Colors.text.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.dark,
  },
  profileHandle: {
    fontSize: 14,
    color: Colors.text.light,
  },
  inputSection: {
    backgroundColor: Colors.background.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  textInput: {
    fontSize: 18,
    color: Colors.text.dark,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  characterCount: {
    alignItems: 'flex-end',
    marginTop: 8,
  },
  characterCountText: {
    fontSize: 12,
    color: Colors.text.light,
  },
  mediaSection: {
    flexDirection: 'row',
    backgroundColor: Colors.background.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    justifyContent: 'space-around',
  },
  mediaButton: {
    alignItems: 'center',
    padding: 8,
  },
  mediaButtonText: {
    fontSize: 12,
    color: Colors.text.dark,
    marginTop: 4,
  },
  suggestionsSection: {
    backgroundColor: Colors.background.card,
    borderRadius: 12,
    padding: 16,
  },
  suggestionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 12,
  },
  trendingTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  trendingTag: {
    backgroundColor: Colors.primary.blue,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  trendingTagText: {
    color: Colors.text.white,
    fontSize: 12,
    fontWeight: '500',
  },
});