import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, Image, TouchableOpacity, Linking, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, Stack } from 'expo-router';
import { ExternalLink, Calendar, User, MessageCircle, Send, Heart } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { newsArticles } from '@/constants/news';
import BackButton from '@/components/BackButton';

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
}

const articleComments: { [key: string]: Comment[] } = {
  '1': [
    {
      id: '1',
      author: 'James Mitchell 🇺🇸',
      content: 'Fantastic opportunity! Liverpool\'s investment programme through Keeps has exceeded all my expectations. The transparency and returns are incredible.',
      timestamp: '2h ago',
      likes: 24,
    },
    {
      id: '2',
      author: 'Sarah Chen 🇨🇦',
      content: 'I\'ve been following Liverpool\'s performance closely. The numbers look very promising and the fan engagement aspect is brilliant!',
      timestamp: '4h ago',
      likes: 18,
    },
    {
      id: '3',
      author: 'David Park 🇰🇷',
      content: 'This is the future of sports investment! Love being part of Liverpool\'s journey.',
      timestamp: '6h ago',
      likes: 15,
    },
  ],
  '2': [
    {
      id: '4',
      author: 'Michael Rodriguez 🇪🇸',
      content: 'McLaren\'s partnership strategy is brilliant. This could be a game changer for F1 investment!',
      timestamp: '1h ago',
      likes: 32,
    },
    {
      id: '5',
      author: 'Lisa Wang 🇸🇬',
      content: 'Amazing returns so far! The income-sharing model is perfect for F1 fans.',
      timestamp: '3h ago',
      likes: 21,
    },
  ],
  '3': [
    {
      id: '6',
      author: 'Emma Thompson 🇬🇧',
      content: 'The Ryder Cup debenture programme is exceptional! Great access and solid returns.',
      timestamp: '3h ago',
      likes: 19,
    },
    {
      id: '7',
      author: 'Alex Chen 🇦🇺',
      content: 'Best sports investment I\'ve made. The tournament experience was unforgettable!',
      timestamp: '5h ago',
      likes: 14,
    },
  ],
  '6': [
    {
      id: '8',
      author: 'Vincent Tan 🇲🇾',
      content: 'Keeps is revolutionising sports investment! The growth has been phenomenal.',
      timestamp: '1h ago',
      likes: 28,
    },
    {
      id: '9',
      author: 'Rachel Green 🇺🇸',
      content: 'Love the platform! Finally, fans can truly invest in what they\'re passionate about.',
      timestamp: '4h ago',
      likes: 16,
    },
  ],
};

export default function ArticleDetailScreen() {
  const { id } = useLocalSearchParams();
  const article = newsArticles.find(a => a.id === id);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(articleComments[id as string] || []);
  
  const handlePostComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        author: 'Liam 🇬🇧',
        content: newComment.trim(),
        timestamp: 'now',
        likes: 0,
      };
      setComments([comment, ...comments]);
      setNewComment('');
    }
  };
  
  if (!article) {
    return (
      <View style={styles.container}>
        <Stack.Screen 
          options={{ 
            headerShown: true,
            headerTitle: 'Article Not Found',
            headerStyle: { backgroundColor: Colors.primary.blue },
            headerTintColor: Colors.text.white,
            headerTitleStyle: { fontWeight: 'bold' },
            headerLeft: () => <BackButton />,
          }} 
        />
        <Text style={styles.errorText}>Article not found</Text>
      </View>
    );
  }

  const handleOpenLink = () => {
    if (article.url !== '#') {
      Linking.openURL(article.url);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          headerShown: true,
          headerTitle: "Article",
          headerStyle: { backgroundColor: Colors.primary.blue },
          headerTintColor: Colors.text.white,
          headerTitleStyle: { fontWeight: 'bold' },
          headerLeft: () => <BackButton />,
        }} 
      />
      <StatusBar style="light" />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Image source={{ uri: article.imageUrl }} style={styles.heroImage} />
        
        <View style={styles.contentContainer}>
          <Text style={[styles.title, { color: Colors.primary.orange }]}>{article.title}</Text>
          
          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <User size={16} color={Colors.text.light} />
              <Text style={styles.metaText}>{article.source}</Text>
            </View>
            
            <View style={styles.metaItem}>
              <Calendar size={16} color={Colors.text.light} />
              <Text style={styles.metaText}>{article.date}</Text>
            </View>
          </View>
          
          <Text style={styles.summary}>{article.summary}</Text>
          
          <View style={styles.fullArticleContainer}>
            <Text style={[styles.fullArticleTitle, { color: Colors.primary.orange }]}>Full Article Content</Text>
            {article.content ? (
              article.content.map((paragraph, index) => (
                <Text key={index} style={styles.fullArticleText}>
                  {paragraph}
                  {index < article.content!.length - 1 && '\n\n'}
                </Text>
              ))
            ) : (
              <Text style={styles.fullArticleText}>
                This is where the full article content would appear. In a real application, this would contain the complete article text with proper formatting, additional images, and detailed analysis of the sports finance topic.
                
                {'\n\n'}The sports investment landscape is rapidly evolving, with new opportunities emerging for fans to directly participate in the financial success of their favorite teams and athletes. This democratisation of sports finance is creating unprecedented opportunities for both individual investors and sports organisations.
                
                {'\n\n'}Key trends in the market include the rise of fan tokens, equity crowdfunding for sports teams, and innovative revenue-sharing models that allow supporters to benefit from commercial success. These developments are reshaping how sports organisations raise capital and engage with their communities.
                
                {'\n\n'}Regulatory frameworks are also adapting to accommodate these new investment vehicles, with various jurisdictions developing specific guidelines for sports-related financial products. This regulatory clarity is essential for the continued growth and legitimacy of the sports finance sector.
              </Text>
            )}
          </View>
          
          {article.url !== '#' && (
            <TouchableOpacity style={styles.linkButton} onPress={handleOpenLink}>
              <ExternalLink size={20} color={Colors.text.white} />
              <Text style={styles.linkButtonText}>Read Original Article</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Comments Section */}
        <View style={styles.commentsSection}>
          <TouchableOpacity 
            style={styles.commentsHeader}
            onPress={() => setShowComments(!showComments)}
          >
            <MessageCircle size={20} color={Colors.primary.orange} />
            <Text style={styles.commentsTitle}>
              Comments ({comments.length})
            </Text>
          </TouchableOpacity>

          {showComments && (
            <View style={styles.commentsContainer}>
              {/* Comment Input */}
              <View style={styles.commentInput}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Write a comment..."
                  placeholderTextColor={Colors.text.light}
                  value={newComment}
                  onChangeText={setNewComment}
                  multiline
                />
                <TouchableOpacity 
                  style={styles.postButton}
                  onPress={handlePostComment}
                >
                  <Send size={16} color={Colors.text.white} />
                </TouchableOpacity>
              </View>

              {/* Comments List */}
              {comments.map((comment) => (
                <View key={comment.id} style={styles.commentCard}>
                  <View style={styles.commentHeader}>
                    <Text style={styles.commentAuthor}>{comment.author}</Text>
                    <Text style={styles.commentTimestamp}>{comment.timestamp}</Text>
                  </View>
                  <Text style={styles.commentContent}>{comment.content}</Text>
                  <TouchableOpacity style={styles.commentLike}>
                    <Heart size={16} color={Colors.text.light} />
                    <Text style={styles.commentLikes}>{comment.likes}</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
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
  heroImage: {
    width: '100%',
    height: 240,
    resizeMode: 'cover',
  },
  contentContainer: {
    backgroundColor: Colors.background.card,
    margin: 16,
    borderRadius: 16,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    lineHeight: 32,
  },
  metaContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  metaText: {
    fontSize: 14,
    color: Colors.text.light,
    marginLeft: 6,
  },
  summary: {
    fontSize: 16,
    color: Colors.text.light,
    lineHeight: 24,
    marginBottom: 24,
  },
  fullArticleContainer: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 20,
    marginBottom: 24,
  },
  fullArticleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  fullArticleText: {
    fontSize: 16,
    color: Colors.text.dark,
    lineHeight: 24,
  },
  linkButton: {
    backgroundColor: Colors.primary.orange,
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkButtonText: {
    color: Colors.text.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  errorText: {
    color: Colors.text.white,
    fontSize: 18,
    textAlign: 'center',
    marginTop: 100,
  },
  commentsSection: {
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 24,
  },
  commentsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginLeft: 8,
  },
  commentsContainer: {
    marginTop: 8,
  },
  commentInput: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.text.dark,
    maxHeight: 100,
  },
  postButton: {
    backgroundColor: Colors.primary.orange,
    borderRadius: 20,
    padding: 8,
    marginLeft: 8,
  },
  commentCard: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  commentAuthor: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text.dark,
  },
  commentTimestamp: {
    fontSize: 12,
    color: Colors.text.light,
  },
  commentContent: {
    fontSize: 14,
    color: Colors.text.dark,
    lineHeight: 20,
    marginBottom: 8,
  },
  commentLike: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentLikes: {
    fontSize: 12,
    color: Colors.text.light,
    marginLeft: 4,
  },
});