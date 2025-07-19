import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { CreditCard, Building2, Plus, Edit3, Trash2 } from 'lucide-react-native';

import Colors from '@/constants/colors';

interface PaymentMethod {
  id: string;
  type: 'card' | 'bank';
  name: string;
  details: string;
  isDefault: boolean;
}

export default function PaymentMethodsScreen() {
  const [paymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'card',
      name: 'Visa Debit',
      details: '**** **** **** 4532',
      isDefault: true,
    },
    {
      id: '2',
      type: 'card',
      name: 'Mastercard Credit',
      details: '**** **** **** 8901',
      isDefault: false,
    },
    {
      id: '3',
      type: 'bank',
      name: 'Barclays Current Account',
      details: '**** **** **** 2847',
      isDefault: false,
    },
  ]);

  const handleEditPaymentMethod = (id: string) => {
    Alert.alert('Edit Payment Method', 'This feature will be available soon.');
  };

  const handleDeletePaymentMethod = (id: string) => {
    Alert.alert(
      'Delete Payment Method',
      'Are you sure you want to delete this payment method?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive' },
      ]
    );
  };

  const handleAddPaymentMethod = () => {
    Alert.alert('Add Payment Method', 'This feature will be available soon.');
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Payment Methods',
          headerStyle: { backgroundColor: Colors.primary.blue },
          headerTintColor: Colors.text.white,
          headerTitleStyle: { fontWeight: 'bold' },
        }} 
      />
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.sectionTitle}>Saved Payment Methods</Text>
        
        {paymentMethods.map((method) => (
          <View key={method.id} style={styles.paymentMethodCard}>
            <View style={styles.methodHeader}>
              <View style={styles.methodInfo}>
                <View style={styles.iconContainer}>
                  {method.type === 'card' ? (
                    <CreditCard size={24} color={Colors.primary.blue} />
                  ) : (
                    <Building2 size={24} color={Colors.primary.blue} />
                  )}
                </View>
                <View style={styles.methodDetails}>
                  <Text style={styles.methodName}>{method.name}</Text>
                  <Text style={styles.methodNumber}>{method.details}</Text>
                  {method.isDefault && (
                    <Text style={styles.defaultLabel}>Default</Text>
                  )}
                </View>
              </View>
              
              <View style={styles.methodActions}>
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => handleEditPaymentMethod(method.id)}
                >
                  <Edit3 size={18} color={Colors.text.light} />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => handleDeletePaymentMethod(method.id)}
                >
                  <Trash2 size={18} color="#FF3B30" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
        
        <TouchableOpacity style={styles.addButton} onPress={handleAddPaymentMethod}>
          <Plus size={24} color={Colors.text.white} />
          <Text style={styles.addButtonText}>Add New Payment Method</Text>
        </TouchableOpacity>
        
        <View style={styles.securityInfo}>
          <Text style={styles.securityTitle}>Security Information</Text>
          <Text style={styles.securityText}>
            Your payment information is encrypted and securely stored. We never store your full card details.
          </Text>
          <Text style={styles.securityText}>
            All transactions are processed through our secure payment partners and are protected by industry-standard security measures.
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
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.white,
    marginBottom: 16,
  },
  paymentMethodCard: {
    backgroundColor: Colors.text.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  methodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  methodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  methodDetails: {
    flex: 1,
  },
  methodName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.dark,
    marginBottom: 4,
  },
  methodNumber: {
    fontSize: 14,
    color: Colors.text.light,
    marginBottom: 4,
  },
  defaultLabel: {
    fontSize: 12,
    color: Colors.accent.green,
    fontWeight: '600',
  },
  methodActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: Colors.primary.blue,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: Colors.text.white,
    borderStyle: 'dashed',
  },
  addButtonText: {
    color: Colors.text.white,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  securityInfo: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    padding: 16,
  },
  securityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.dark,
    marginBottom: 8,
  },
  securityText: {
    fontSize: 14,
    color: Colors.text.light,
    lineHeight: 20,
    marginBottom: 8,
  },
});