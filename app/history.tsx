import React from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import { TrendingUp, TrendingDown, Calendar, DollarSign } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface Transaction {
  id: string;
  type: 'buy' | 'sell';
  asset: string;
  quantity: number;
  price: number;
  date: string;
  status: 'completed' | 'pending';
}

const transactions: Transaction[] = [
  {
    id: '1',
    type: 'buy',
    asset: 'Liverpool FC',
    quantity: 50,
    price: 500,
    date: '2025-07-15',
    status: 'completed',
  },
  {
    id: '2',
    type: 'buy',
    asset: 'McLaren Racing',
    quantity: 200,
    price: 1000,
    date: '2025-07-10',
    status: 'completed',
  },
  {
    id: '3',
    type: 'sell',
    asset: 'Liverpool FC',
    quantity: 1,
    price: 520,
    date: '2025-07-08',
    status: 'completed',
  },
  {
    id: '4',
    type: 'buy',
    asset: 'Ryder Cup',
    quantity: 1,
    price: 15000,
    date: '2025-07-05',
    status: 'completed',
  },
  {
    id: '5',
    type: 'buy',
    asset: 'McLaren Racing',
    quantity: 273,
    price: 1000,
    date: '2025-06-28',
    status: 'completed',
  },
];

export default function HistoryScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          headerShown: true,
          headerTitle: "Transaction History",
          headerStyle: { backgroundColor: Colors.primary.blue },
          headerTintColor: Colors.text.white,
          headerTitleStyle: { fontWeight: 'bold' },
        }} 
      />
      <StatusBar style="light" />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.summarySection}>
          <Text style={styles.summaryTitle}>Summary</Text>
          <View style={styles.summaryStats}>
            <View style={styles.summaryCard}>
              <TrendingUp size={20} color={Colors.accent.green} />
              <Text style={styles.summaryValue}>5</Text>
              <Text style={styles.summaryLabel}>Purchases</Text>
            </View>
            <View style={styles.summaryCard}>
              <TrendingDown size={20} color={Colors.primary.orange} />
              <Text style={styles.summaryValue}>1</Text>
              <Text style={styles.summaryLabel}>Sales</Text>
            </View>
            <View style={styles.summaryCard}>
              <DollarSign size={20} color={Colors.primary.blue} />
              <Text style={styles.summaryValue}>£288K</Text>
              <Text style={styles.summaryLabel}>Total Volume</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        
        {transactions.map((transaction) => (
          <View key={transaction.id} style={styles.transactionCard}>
            <View style={styles.transactionHeader}>
              <View style={styles.transactionIcon}>
                {transaction.type === 'buy' ? (
                  <TrendingUp size={20} color={Colors.accent.green} />
                ) : (
                  <TrendingDown size={20} color={Colors.primary.orange} />
                )}
              </View>
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionType}>
                  {transaction.type === 'buy' ? 'Purchase' : 'Sale'}
                </Text>
                <Text style={styles.transactionAsset}>{transaction.asset}</Text>
              </View>
              <View style={styles.transactionAmount}>
                <Text style={[
                  styles.transactionValue,
                  { color: transaction.type === 'buy' ? Colors.primary.orange : Colors.accent.green }
                ]}>
                  {transaction.type === 'buy' ? '-' : '+'}£{(transaction.quantity * transaction.price).toLocaleString()}
                </Text>
                <Text style={styles.transactionStatus}>
                  {transaction.status}
                </Text>
              </View>
            </View>
            
            <View style={styles.transactionDetails}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Quantity:</Text>
                <Text style={styles.detailValue}>{transaction.quantity}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Price per unit:</Text>
                <Text style={styles.detailValue}>£{transaction.price.toLocaleString()}</Text>
              </View>
              <View style={styles.detailItem}>
                <Calendar size={14} color={Colors.text.light} />
                <Text style={styles.detailValue}>{transaction.date}</Text>
              </View>
            </View>
          </View>
        ))}
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
  summarySection: {
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
    marginBottom: 24,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 16,
  },
  summaryStats: {
    flexDirection: 'row',
  },
  summaryCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginTop: 8,
  },
  summaryLabel: {
    fontSize: 12,
    color: Colors.text.light,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.white,
    marginBottom: 16,
  },
  transactionCard: {
    backgroundColor: Colors.background.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  transactionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionType: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.dark,
  },
  transactionAsset: {
    fontSize: 14,
    color: Colors.text.light,
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  transactionValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionStatus: {
    fontSize: 12,
    color: Colors.text.light,
    textTransform: 'capitalize',
  },
  transactionDetails: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 12,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailLabel: {
    fontSize: 14,
    color: Colors.text.light,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text.dark,
  },
});