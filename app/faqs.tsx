import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import { ChevronDown, ChevronUp } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    id: 1,
    question: 'Are these real assets?',
    answer: 'Yes, all assets on Keeps represent real ownership stakes in legitimate sports entities. We partner directly with teams, stadiums, and sporting organisations to offer genuine investment opportunities.'
  },
  {
    id: 2,
    question: 'Is Keeps regulated?',
    answer: 'Yes, Keeps is fully regulated by both the Financial Conduct Authority (FCA) and the Securities and Exchange Commission (SEC), ensuring the highest standards of investor protection and regulatory compliance.'
  },
  {
    id: 3,
    question: 'What is the minimum investment amount?',
    answer: 'Minimum investment amounts vary by asset, typically ranging from £500 to £5,000. Each investment opportunity clearly displays its minimum entry requirement.'
  },
  {
    id: 4,
    question: 'How do I receive returns on my investments?',
    answer: 'Returns vary by investment type: equity investments provide dividends and capital appreciation, debentures offer fixed interest payments, and income sharing agreements provide revenue-based returns.'
  },
  {
    id: 5,
    question: 'Can I sell my investments?',
    answer: 'Yes, Keeps operates a secondary marketplace where you can list your investments for sale to other users. Liquidity varies by asset and market conditions.'
  },
  {
    id: 6,
    question: 'What exclusive benefits do I receive?',
    answer: 'Benefits vary by investment tier and asset, including priority ticket access, exclusive events, merchandise discounts, behind-the-scenes experiences, and VIP hospitality packages.'
  },
  {
    id: 7,
    question: 'How are asset valuations determined?',
    answer: 'Valuations are conducted by independent financial experts using industry-standard methodologies, including comparable transactions, discounted cash flow analysis, and market multiples.'
  },
  {
    id: 8,
    question: 'What fees does Keeps charge?',
    answer: 'We charge a 10% processing fee on primary investments and 2.5% on secondary market transactions. All fees are clearly disclosed before you complete any transaction.'
  },
  {
    id: 9,
    question: 'How do I track my investment performance?',
    answer: 'Your portfolio dashboard provides real-time updates on investment values, performance metrics, dividend payments, and exclusive benefit eligibility.'
  },
  {
    id: 10,
    question: 'Is my personal information secure?',
    answer: 'Yes, we use bank-level encryption and security measures to protect your personal and financial information. We are fully compliant with GDPR and other data protection regulations.'
  }
];

export default function FAQsScreen() {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const toggleExpanded = (id: number) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          headerShown: true,
          headerTitle: 'FAQs',
          headerStyle: { backgroundColor: Colors.primary.blue },
          headerTintColor: Colors.text.white,
          headerTitleStyle: { fontWeight: 'bold' },
        }} 
      />
      <StatusBar style="light" />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerSection}>
          <Text style={styles.title}>Frequently Asked Questions</Text>
          <Text style={styles.description}>
            Find answers to common questions about investing with Keeps
          </Text>
        </View>

        {faqs.map((faq) => (
          <View key={faq.id} style={styles.faqItem}>
            <TouchableOpacity 
              style={styles.questionContainer}
              onPress={() => toggleExpanded(faq.id)}
            >
              <Text style={styles.question}>{faq.question}</Text>
              {expandedItems.includes(faq.id) ? (
                <ChevronUp size={24} color={Colors.primary.orange} />
              ) : (
                <ChevronDown size={24} color={Colors.text.light} />
              )}
            </TouchableOpacity>
            
            {expandedItems.includes(faq.id) && (
              <View style={styles.answerContainer}>
                <Text style={styles.answer}>{faq.answer}</Text>
              </View>
            )}
          </View>
        ))}

        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>Still have questions?</Text>
          <Text style={styles.contactText}>
            Contact our support team at info@keeps.sport or visit our Contact Us page for personalized assistance.
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
  headerSection: {
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primary.orange,
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: Colors.text.dark,
    textAlign: 'center',
    lineHeight: 24,
  },
  faqItem: {
    backgroundColor: Colors.background.card,
    borderRadius: 12,
    marginTop: 12,
    overflow: 'hidden',
  },
  questionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  question: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.dark,
    flex: 1,
    marginRight: 12,
  },
  answerContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  answer: {
    fontSize: 16,
    color: Colors.text.dark,
    lineHeight: 24,
    marginTop: 12,
  },
  contactSection: {
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    padding: 20,
    marginTop: 24,
    alignItems: 'center',
  },
  contactTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 12,
  },
  contactText: {
    fontSize: 16,
    color: Colors.text.dark,
    textAlign: 'center',
    lineHeight: 24,
  },
});