import React from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Stack, useRouter } from 'expo-router';
import { User, Settings, Bell, Shield, CreditCard, FileText } from 'lucide-react-native';
import Colors from '@/constants/colors';

export default function MyAccountScreen() {
  const router = useRouter();

  const handleSettingsPress = () => {
    router.push('/settings');
  };

  const handlePaymentMethodsPress = () => {
    router.push('/payment-methods');
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          headerShown: true,
          headerTitle: 'My Account',
          headerStyle: { backgroundColor: Colors.primary.blue },
          headerTintColor: Colors.text.white,
          headerTitleStyle: { fontWeight: 'bold' },
        }} 
      />
      <StatusBar style="light" />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileSection}>
          <View style={styles.profileIcon}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=200&h=200&fit=crop&crop=center' }}
              style={styles.profileImage}
            />
          </View>
          <Text style={styles.profileName}>Liam 🇬🇧</Text>
          <Text style={styles.profileEmail}>liam@keeps.sport</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Overview</Text>
          
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Total Invested:</Text>
            <Text style={styles.statValue}>£250,000</Text>
          </View>
          
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Active Investments:</Text>
            <Text style={styles.statValue}>4</Text>
          </View>
          
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Portfolio Performance:</Text>
            <Text style={[styles.statValue, { color: Colors.accent.green }]}>+18.6%</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          
          <TouchableOpacity style={styles.menuItem} onPress={handleSettingsPress}>
            <Settings size={24} color={Colors.text.light} />
            <Text style={styles.menuText}>Settings</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Bell size={24} color={Colors.text.light} />
            <Text style={styles.menuText}>Notifications</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Shield size={24} color={Colors.text.light} />
            <Text style={styles.menuText}>Security</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem} onPress={handlePaymentMethodsPress}>
            <CreditCard size={24} color={Colors.text.light} />
            <Text style={styles.menuText}>Payment Methods</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <FileText size={24} color={Colors.text.light} />
            <Text style={styles.menuText}>Documents</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Investment Summary</Text>
          <Text style={styles.text}>
            You are currently invested in Liverpool FC, McLaren F1, Ryder Cup, and British Cycling. 
            Your portfolio has shown consistent growth with strong performance across all assets.
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
  profileSection: {
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    padding: 24,
    marginTop: 16,
    alignItems: 'center',
  },
  profileIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    overflow: 'hidden',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: Colors.text.light,
  },
  section: {
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 16,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statLabel: {
    fontSize: 16,
    color: Colors.text.light,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.dark,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  menuText: {
    fontSize: 16,
    color: Colors.text.dark,
    marginLeft: 16,
    fontWeight: '500',
  },
  text: {
    fontSize: 16,
    color: Colors.text.dark,
    lineHeight: 24,
  },
});