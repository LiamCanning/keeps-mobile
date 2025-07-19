import React from 'react';
import { StyleSheet, View, ScrollView, Text, Image, TouchableOpacity, Linking } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, Stack } from 'expo-router';
import { ExternalLink, Calendar, User } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { newsArticles } from '@/constants/news';

export default function ArticleDetailScreen() {
  const { id } = useLocalSearchParams();
  
  const article = newsArticles.find(a => a.id === id);
  
  if (!article) {
    return (
      <View style={styles.container}>
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
                
                {'\n\n'}The sports investment landscape is rapidly evolving, with new opportunities emerging for fans to directly participate in the financial success of their favorite teams and athletes. This democratization of sports finance is creating unprecedented opportunities for both individual investors and sports organizations.
                
                {'\n\n'}Key trends in the market include the rise of fan tokens, equity crowdfunding for sports teams, and innovative revenue-sharing models that allow supporters to benefit from commercial success. These developments are reshaping how sports organizations raise capital and engage with their communities.
                
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
});