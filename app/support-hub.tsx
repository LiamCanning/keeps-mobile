import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Stack, useRouter } from 'expo-router';
import { HelpCircle, MessageCircle, Mail, Phone, ChevronDown, ChevronRight } from 'lucide-react-native';
import Colors from '@/constants/colors';
import BackButton from '@/components/BackButton';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'investment' | 'account' | 'technical' | 'general';
}

const faqs: FAQ[] = [
  {
    id: '1',
    question: 'How do I start investing in sports assets?',
    answer: 'To start investing, create an account, complete the verification process, and browse available assets. You can invest with as little as £100 in most opportunities.',
    category: 'investment',
  },
  {
    id: '2',
    question: 'What are the minimum investment amounts?',
    answer: 'Minimum investments vary by asset: £100 for equity deals, £500 for debentures, and £250 for income share agreements.',
    category: 'investment',
  },
  {
    id: '3',
    question: 'How do I access my investor benefits?',
    answer: 'Benefits are automatically activated after investment. Check your Benefits page for available perks and redemption instructions.',
    category: 'account',
  },
  {
    id: '4',
    question: 'Can I sell my investments on the secondary market?',
    answer: 'Yes, you can list your investments for sale on our secondary market. There is a 2.5% placement fee for successful sales.',
    category: 'investment',
  },
  {
    id: '5',
    question: 'How do I update my payment methods?',
    answer: 'Go to Account Settings > Payment Methods to add, remove, or update your saved payment options.',
    category: 'account',
  },
  {
    id: '6',
    question: 'Why is the app running slowly?',
    answer: 'Try closing and reopening the app, checking your internet connection, or updating to the latest version.',
    category: 'technical',
  },
];

export default function SupportHubScreen() {
  const router = useRouter();
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const filteredFAQs = selectedCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  const handleFAQPress = (faqId: string) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  const handleLiveChatPress = () => {
    // Simulate live chat
    console.log('Opening live chat...');
  };

  const handleSubmitForm = () => {
    console.log('Submitting contact form:', contactForm);
    // Reset form
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          headerShown: true,
          headerTitle: 'Support Hub',
          headerStyle: { backgroundColor: Colors.primary.blue },
          headerTintColor: Colors.text.white,
          headerTitleStyle: { fontWeight: 'bold' },
          headerLeft: () => <BackButton />,
        }} 
      />
      <StatusBar style="light" />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerSection}>
          <HelpCircle size={24} color={Colors.primary.orange} />
          <Text style={styles.headerTitle}>How can we help you?</Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionCard} onPress={handleLiveChatPress}>
              <MessageCircle size={32} color={Colors.accent.green} />
              <Text style={styles.actionTitle}>Live Chat</Text>
              <Text style={styles.actionSubtitle}>Get instant help</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard} onPress={() => router.push('/contact-us')}>
              <Mail size={32} color={Colors.accent.blue} />
              <Text style={styles.actionTitle}>Email Support</Text>
              <Text style={styles.actionSubtitle}>Send us a message</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <Phone size={32} color={Colors.accent.orange} />
              <Text style={styles.actionTitle}>Call Us</Text>
              <Text style={styles.actionSubtitle}>+44 20 7946 0958</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard} onPress={() => router.push('/faqs')}>
              <HelpCircle size={32} color={Colors.accent.purple} />
              <Text style={styles.actionTitle}>Full FAQs</Text>
              <Text style={styles.actionSubtitle}>Browse all questions</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Popular FAQs */}
        <View style={styles.faqSection}>
          <Text style={styles.sectionTitle}>Popular FAQs</Text>
          
          <View style={styles.categoryFilter}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {['all', 'investment', 'account', 'technical', 'general'].map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryButton,
                    selectedCategory === category && styles.categoryButtonActive
                  ]}
                  onPress={() => setSelectedCategory(category)}
                >
                  <Text style={[
                    styles.categoryButtonText,
                    selectedCategory === category && styles.categoryButtonTextActive
                  ]}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {filteredFAQs.map((faq) => (
            <TouchableOpacity
              key={faq.id}
              style={styles.faqCard}
              onPress={() => handleFAQPress(faq.id)}
            >
              <View style={styles.faqHeader}>
                <Text style={styles.faqQuestion}>{faq.question}</Text>
                {expandedFAQ === faq.id ? (
                  <ChevronDown size={20} color={Colors.text.light} />
                ) : (
                  <ChevronRight size={20} color={Colors.text.light} />
                )}
              </View>
              {expandedFAQ === faq.id && (
                <Text style={styles.faqAnswer}>{faq.answer}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Contact Form */}
        <View style={styles.contactSection}>
          <Text style={styles.sectionTitle}>Send us a Message</Text>
          
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Your Name"
              placeholderTextColor={Colors.text.light}
              value={contactForm.name}
              onChangeText={(text) => setContactForm({...contactForm, name: text})}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              placeholderTextColor={Colors.text.light}
              value={contactForm.email}
              onChangeText={(text) => setContactForm({...contactForm, email: text})}
              keyboardType="email-address"
            />
            
            <TextInput
              style={styles.input}
              placeholder="Subject"
              placeholderTextColor={Colors.text.light}
              value={contactForm.subject}
              onChangeText={(text) => setContactForm({...contactForm, subject: text})}
            />
            
            <TextInput
              style={[styles.input, styles.messageInput]}
              placeholder="Your Message"
              placeholderTextColor={Colors.text.light}
              value={contactForm.message}
              onChangeText={(text) => setContactForm({...contactForm, message: text})}
              multiline
              numberOfLines={4}
            />
            
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmitForm}>
              <Text style={styles.submitButtonText}>Send Message</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Support Hours */}
        <View style={styles.hoursSection}>
          <Text style={styles.sectionTitle}>Support Hours</Text>
          <View style={styles.hoursCard}>
            <Text style={styles.hoursText}>Monday - Friday: 9:00 AM - 6:00 PM GMT</Text>
            <Text style={styles.hoursText}>Saturday: 10:00 AM - 4:00 PM GMT</Text>
            <Text style={styles.hoursText}>Sunday: Closed</Text>
            <Text style={styles.hoursNote}>
              Live chat and email support available 24/7
            </Text>
          </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginLeft: 12,
  },
  quickActionsSection: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.white,
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    padding: 20,
    width: '48%',
    alignItems: 'center',
    marginBottom: 16,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginTop: 12,
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 12,
    color: Colors.text.light,
    textAlign: 'center',
  },
  faqSection: {
    marginTop: 24,
  },
  categoryFilter: {
    marginBottom: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  categoryButtonActive: {
    backgroundColor: Colors.primary.orange,
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text.white,
  },
  categoryButtonTextActive: {
    color: Colors.text.white,
  },
  faqCard: {
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.dark,
    flex: 1,
    marginRight: 12,
  },
  faqAnswer: {
    fontSize: 14,
    color: Colors.text.light,
    lineHeight: 20,
    marginTop: 12,
  },
  contactSection: {
    marginTop: 24,
  },
  formContainer: {
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    padding: 20,
  },
  input: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: Colors.text.dark,
    marginBottom: 16,
  },
  messageInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: Colors.primary.orange,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    color: Colors.text.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  hoursSection: {
    marginTop: 24,
  },
  hoursCard: {
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    padding: 20,
  },
  hoursText: {
    fontSize: 16,
    color: Colors.text.dark,
    marginBottom: 8,
  },
  hoursNote: {
    fontSize: 14,
    color: Colors.text.light,
    marginTop: 12,
    fontStyle: 'italic',
  },
});