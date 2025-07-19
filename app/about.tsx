import React from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import Colors from '@/constants/colors';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          headerShown: true,
          headerTitle: 'About Keeps',
          headerStyle: { backgroundColor: Colors.primary.blue },
          headerTintColor: Colors.text.white,
          headerTitleStyle: { fontWeight: 'bold' },
        }} 
      />
      <StatusBar style="light" />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={styles.title}>About Keeps</Text>
          <Text style={styles.description}>
            Keeps is a revolutionary sports investment platform that democratizes access to sports assets. 
            We enable fans and investors to own a piece of their favorite teams, stadiums, and sporting events.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Mission</Text>
          <Text style={styles.text}>
            To bridge the gap between sports passion and investment opportunities, creating a community 
            where fans can financially participate in the success of their favorite sports entities.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What We Offer</Text>
          <Text style={styles.text}>
            • Equity investments in premier sports teams{'\n'}
            • Debenture programmes for exclusive stadium access{'\n'}
            • Income sharing agreements with sports organisations{'\n'}
            • Exclusive benefits and experiences for investors{'\n'}
            • Secondary market trading opportunities
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Regulation & Security</Text>
          <Text style={styles.text}>
            Keeps is fully regulated by the Financial Conduct Authority (FCA) and Securities and Exchange Commission (SEC), 
            ensuring the highest standards of investor protection and market integrity.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Values</Text>
          <Text style={styles.text}>
            • Transparency in all transactions{'\n'}
            • Community-driven investment decisions{'\n'}
            • Innovation in sports finance{'\n'}
            • Accessibility for all investor levels{'\n'}
            • Passion for sports excellence
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
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  section: {
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primary.orange,
    marginBottom: 16,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: Colors.text.dark,
    lineHeight: 24,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: Colors.text.dark,
    lineHeight: 24,
  },
});