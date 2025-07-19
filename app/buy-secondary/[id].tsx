import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { ShoppingCart } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { marketListings } from '@/constants/market';

export default function BuySecondaryScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  const listing = marketListings.find(l => l.id === id);
  
  if (!listing) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Listing not found</Text>
      </View>
    );
  }

  const getUnitLabel = () => {
    if (listing.assetId === 'rydercup') return listing.quantity === 1 ? 'debenture' : 'debentures';
    return listing.quantity === 1 ? 'share' : 'shares';
  };

  const subtotal = listing.totalPrice;
  const processingFee = subtotal * 0.025; // 2.5% processing fee for secondary market
  const totalPrice = subtotal + processingFee;
  const priceIncrease = ((listing.pricePerUnit - listing.originalPrice) / listing.originalPrice) * 100;

  const handlePurchase = () => {
    const unitLabel = getUnitLabel();
    
    router.push({
      pathname: '/purchase-success',
      params: {
        amount: subtotal.toLocaleString(),
        entity: listing.assetId,
        quantity: listing.quantity.toString(),
        type: listing.assetId === 'rydercup' ? 'debentures' : 'shares',
        unitLabel: unitLabel
      }
    });
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          headerShown: true,
          headerTitle: `Buy ${listing.assetName}`,
          headerStyle: { backgroundColor: Colors.primary.blue },
          headerTintColor: Colors.text.white,
          headerTitleStyle: { fontWeight: 'bold' },
        }} 
      />
      <StatusBar style="light" />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.assetInfo}>
          <Text style={styles.assetName}>{listing.assetName}</Text>
          <Text style={styles.assetType}>Secondary Market Purchase</Text>
          <Text style={styles.sellerInfo}>Seller: {listing.seller}</Text>
        </View>

        <View style={styles.orderSection}>
          <Text style={styles.sectionTitle}>Order Details</Text>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Quantity:</Text>
            <Text style={styles.detailValue}>
              {listing.quantity} {getUnitLabel()}
            </Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Price per unit:</Text>
            <Text style={styles.detailValue}>£{listing.pricePerUnit.toLocaleString()}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Difference from primary:</Text>
            <Text style={[styles.detailValue, { color: Colors.accent.green }]}>
              +{priceIncrease.toFixed(1)}%
            </Text>
          </View>
        </View>

        <View style={styles.summarySection}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal:</Text>
            <Text style={styles.summaryValue}>£{subtotal.toLocaleString()}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Processing Fee (2.5%):</Text>
            <Text style={styles.summaryValue}>£{processingFee.toLocaleString()}</Text>
          </View>
          
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalValue}>£{totalPrice.toLocaleString()}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.purchaseButton} onPress={handlePurchase}>
          <ShoppingCart size={20} color={Colors.text.white} />
          <Text style={styles.purchaseButtonText}>Complete Purchase</Text>
        </TouchableOpacity>
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
  assetInfo: {
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
    alignItems: 'center',
  },
  assetName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 8,
  },
  assetType: {
    fontSize: 16,
    color: Colors.text.light,
    marginBottom: 8,
  },
  sellerInfo: {
    fontSize: 14,
    color: Colors.primary.orange,
    fontWeight: '600',
  },
  orderSection: {
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 16,
    color: Colors.text.light,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.dark,
  },
  summarySection: {
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 16,
    color: Colors.text.light,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.dark,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 12,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.dark,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary.orange,
  },
  purchaseButton: {
    backgroundColor: Colors.primary.orange,
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  purchaseButtonText: {
    color: Colors.text.white,
    fontSize: 18,
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