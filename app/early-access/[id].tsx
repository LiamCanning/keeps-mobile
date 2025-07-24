import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { Mail, Bell, CheckCircle } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { comingSoonAssets } from '@/constants/assets';
import BackButton from '@/components/BackButton';

export default function EarlyAccessScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const asset = comingSoonAssets.find(a => a.id === id);
  
  if (!asset) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Asset not found</Text>
      </View>
    );
  }

  const handleSubmit = () => {
    if (!email || !email.includes('@')) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    
    setIsSubmitted(true);
    
    setTimeout(() => {
      Alert.alert(
        'Success!', 
        `You've been added to the early access list for ${asset.name}. We'll notify you when the investment opens!`,
        [
          {
            text: 'OK',
            onPress: () => router.back()
          }
        ]
      );
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <View style={styles.container}>
        <Stack.Screen 
          options={{ 
            headerShown: true,
            headerTitle: "Early Access",
            headerStyle: { backgroundColor: Colors.primary.blue },
            headerTintColor: Colors.text.white,
            headerTitleStyle: { fontWeight: 'bold' },
          }} 
        />
        <StatusBar style="light" />
        
        <View style={styles.successContainer}>
          <CheckCircle size={80} color={Colors.accent.green} />
          <Text style={styles.successTitle}>You're In!</Text>
          <Text style={styles.successMessage}>
            We've added you to the early access list for {asset.name}. 
            You'll be the first to know when the investment opens.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          headerShown: true,
          headerTitle: "Early Access",
          headerStyle: { backgroundColor: Colors.primary.blue },
          headerTintColor: Colors.text.white,
          headerTitleStyle: { fontWeight: 'bold' },
          headerLeft: () => <BackButton />,
        }} 
      />
      <StatusBar style="light" />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerSection}>
          <Bell size={60} color={Colors.primary.orange} />
          <Text style={styles.headerTitle}>Get Early Access</Text>
          <Text style={styles.headerSubtitle}>
            Be the first to invest in {asset.name} when it launches
          </Text>
        </View>

        <View style={styles.assetInfo}>
          <Text style={styles.assetName}>{asset.name}</Text>
          <Text style={styles.assetDescription}>{asset.description}</Text>
          
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Total Raise:</Text>
              <Text style={styles.detailValue}>{asset.totalRaiseAmount}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Expected Return:</Text>
              <Text style={styles.detailValue}>{asset.expectedReturn}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Minimum Entry:</Text>
              <Text style={styles.detailValue}>{asset.minimumEntry}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Launches in:</Text>
              <Text style={styles.detailValue}>{asset.comingSoonTimer}</Text>
            </View>
          </View>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.formTitle}>Sign Up for Early Access</Text>
          <Text style={styles.formDescription}>
            Enter your email address and we'll notify you the moment this investment opportunity goes live.
          </Text>
          
          <View style={styles.inputContainer}>
            <Mail size={20} color={Colors.text.light} style={styles.inputIcon} />
            <TextInput
              style={styles.emailInput}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email address"
              placeholderTextColor={Colors.text.light}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Join Early Access List</Text>
          </TouchableOpacity>
          
          <Text style={styles.disclaimer}>
            By signing up, you'll receive notifications about this investment opportunity. 
            You can unsubscribe at any time.
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
    alignItems: 'center',
    paddingVertical: 32,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text.white,
    marginTop: 16,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.text.white,
    opacity: 0.8,
    textAlign: 'center',
    lineHeight: 22,
  },
  assetInfo: {
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  assetName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 8,
  },
  assetDescription: {
    fontSize: 16,
    color: Colors.text.light,
    marginBottom: 16,
    lineHeight: 22,
  },
  detailsContainer: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 16,
    color: Colors.text.light,
    flex: 1,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.dark,
    flex: 1,
    textAlign: 'right',
  },
  formSection: {
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    padding: 20,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 8,
  },
  formDescription: {
    fontSize: 16,
    color: Colors.text.light,
    marginBottom: 24,
    lineHeight: 22,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 24,
    backgroundColor: Colors.background.secondary,
  },
  inputIcon: {
    marginRight: 12,
  },
  emailInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: Colors.text.dark,
  },
  submitButton: {
    backgroundColor: Colors.primary.orange,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  submitButtonText: {
    color: Colors.text.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  disclaimer: {
    fontSize: 14,
    color: Colors.text.light,
    textAlign: 'center',
    lineHeight: 20,
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  successTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.text.white,
    marginTop: 24,
    marginBottom: 16,
  },
  successMessage: {
    fontSize: 18,
    color: Colors.text.white,
    textAlign: 'center',
    lineHeight: 26,
    opacity: 0.9,
  },
  errorText: {
    color: Colors.text.white,
    fontSize: 18,
    textAlign: 'center',
    marginTop: 100,
  },
});