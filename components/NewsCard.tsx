import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Colors from '@/constants/colors';
import { NewsArticle } from '@/constants/news';

interface NewsCardProps {
  article: NewsArticle;
  onPress?: () => void;
}

export default function NewsCard({ article, onPress }: NewsCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <Image source={{ uri: article.imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{article.title}</Text>
        <Text style={styles.summary} numberOfLines={2}>{article.summary}</Text>
        <View style={styles.footer}>
          <Text style={styles.source}>{article.source}</Text>
          <Text style={styles.date}>{article.date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background.card,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 8,
  },
  summary: {
    fontSize: 14,
    color: Colors.text.light,
    marginBottom: 12,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  source: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primary.blue,
  },
  date: {
    fontSize: 12,
    color: Colors.text.light,
  },
});