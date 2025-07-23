import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, TextInput, Alert, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { ShoppingCart, CreditCard, DollarSign, Building2 } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { userAssets, comingSoonAssets } from '@/constants/assets';

export default function BuyScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [quantity, setQuantity] = useState('1');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank'>('card');
  
  const asset = [...userAssets, ...comingSoonAssets].find(a => a.id === id);
  
  if (!asset) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Asset not found</Text>
      </View>
    );
  }

  const getUnitPrice = () => {
    if (asset.id === 'rydercup') return 5000;
    return typeof asset.pricePerShare === 'number' ? asset.pricePerShare : 1000;
  };

  const getQuantityLabel = () => {
    if (asset.id === 'rydercup') return 'debenture';
    return 'share';
  };

  const getQuantityLabelPlural = () => {
    if (asset.id === 'rydercup') return 'debentures';
    return 'shares';
  };

  const unitPrice = getUnitPrice();
  const quantityNum = parseInt(quantity || '0');
  const subtotal = quantityNum * unitPrice;
  const processingFee = subtotal * 0.1; // 10% processing fee
  const totalPrice = subtotal + processingFee;

  const getTier = (amount: number, assetId: string) => {
    if (assetId === 'liverpool') {
      if (amount >= 50000) return 'Diamond';
      if (amount >= 25000) return 'Gold';
      if (amount >= 10000) return 'Silver';
      return 'Bronze';
    } else if (assetId === 'mclaren') {
      if (amount >= 100000) return 'Diamond';
      if (amount >= 50000) return 'Gold';
      if (amount >= 20000) return 'Silver';
      return 'Bronze';
    } else if (assetId === 'rydercup') {
      if (amount >= 50000) return 'Diamond';
      if (amount >= 25000) return 'Gold';
      if (amount >= 15000) return 'Silver';
      return 'Bronze';
    } else if (assetId === 'british-cycling') {
      if (amount >= 25000) return 'Diamond';
      if (amount >= 15000) return 'Gold';
      if (amount >= 5000) return 'Silver';
      return 'Bronze';
    } else if (assetId === 'exeter-chiefs') {
      if (amount >= 20000) return 'Diamond';
      if (amount >= 10000) return 'Gold';
      if (amount >= 5000) return 'Silver';
      return 'Bronze';
    } else if (assetId === 'ultimate-frisbee') {
      if (amount >= 10000) return 'Diamond';
      if (amount >= 5000) return 'Gold';
      if (amount >= 2500) return 'Silver';
      return 'Bronze';
    } else if (assetId === 'ohio') {
      if (amount >= 50000) return 'Diamond';
      if (amount >= 25000) return 'Gold';
      if (amount >= 10000) return 'Silver';
      return 'Bronze';
    } else if (assetId === 'cardiff') {
      if (amount >= 20000) return 'Diamond';
      if (amount >= 10000) return 'Gold';
      if (amount >= 5000) return 'Silver';
      return 'Bronze';
    } else if (assetId === 'hexagon') {
      if (amount >= 15000) return 'Diamond';
      if (amount >= 7500) return 'Gold';
      if (amount >= 3000) return 'Silver';
      return 'Bronze';
    }
    return 'Bronze';
  };

  const currentTier = getTier(subtotal, asset.id);

  const handlePurchase = () => {
    const assetType = asset.type === 'debenture' ? 'debentures' : 'shares';
    const unitLabel = quantityNum === 1 ? getQuantityLabel() : getQuantityLabelPlural();
    
    router.push({
      pathname: '/purchase-success',
      params: {
        amount: subtotal.toLocaleString(), // Only the investment amount, not including processing fee
        entity: asset.id,
        quantity: quantity,
        type: assetType,
        unitLabel: unitLabel
      }
    });
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          headerShown: true,
          headerTitle: `Buy ${asset.name}`,
          headerStyle: { backgroundColor: Colors.primary.blue },
          headerTintColor: Colors.text.white,
          headerTitleStyle: { fontWeight: 'bold' },
        }} 
      />
      <StatusBar style="light" />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.assetInfo}>
          <View style={styles.assetHeader}>
            <Image source={{ uri: asset.logo }} style={styles.assetLogo} resizeMode="contain" />
            <View style={styles.assetDetails}>
              <Text style={styles.assetName}>{asset.name}</Text>
              <Text style={styles.assetType}>
                {asset.type === 'equity' ? 'Equity Investment' : 
                 asset.type === 'debenture' ? 'Debenture Programme' : 
                 'Income Sharing Agreement'}
              </Text>
            </View>
          </View>
          <View style={styles.priceSection}>
            <Text style={styles.unitPrice}>
              £{unitPrice.toLocaleString()} per {asset.type === 'debenture' ? 'debenture' : 'share'}
            </Text>
          </View>
        </View>

        <View style={styles.quantitySection}>
          <Text style={styles.sectionTitle}>
            Quantity ({quantityNum === 1 ? getQuantityLabel() : getQuantityLabelPlural()})
          </Text>
          <TextInput
            style={styles.quantityInput}
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
            placeholder={`Enter number of ${getQuantityLabelPlural()}`}
          />
        </View>

        <View style={styles.paymentSection}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          
          <TouchableOpacity
            style={[styles.paymentOption, paymentMethod === 'card' && styles.paymentOptionActive]}
            onPress={() => setPaymentMethod('card')}
          >
            <CreditCard size={24} color={paymentMethod === 'card' ? Colors.primary.orange : Colors.text.light} />
            <Text style={[styles.paymentText, paymentMethod === 'card' && styles.paymentTextActive]}>
              Credit/Debit Card
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.paymentOption, paymentMethod === 'bank' && styles.paymentOptionActive]}
            onPress={() => setPaymentMethod('bank')}
          >
            <Building2 size={24} color={paymentMethod === 'bank' ? Colors.primary.orange : Colors.text.light} />
            <Text style={[styles.paymentText, paymentMethod === 'bank' && styles.paymentTextActive]}>
              Bank Transfer
            </Text>
          </TouchableOpacity>
          
          <Text style={styles.paymentNote}>
            Card and bank methods are saved in your account for quick payments.
          </Text>
        </View>

        <View style={styles.summarySection}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <Text style={styles.sellerInfo}>Seller: Primary Market</Text>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Quantity:</Text>
            <Text style={styles.summaryValue}>
              {quantity} {quantityNum === 1 ? getQuantityLabel() : getQuantityLabelPlural()}
            </Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Unit Price:</Text>
            <Text style={styles.summaryValue}>£{unitPrice.toLocaleString()}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal:</Text>
            <Text style={styles.summaryValue}>£{subtotal.toLocaleString()}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Processing Fee (10%):</Text>
            <Text style={styles.summaryValue}>£{processingFee.toLocaleString()}</Text>
          </View>
          
          <View style={styles.tierRow}>
            <Text style={styles.tierLabel}>Investment Tier</Text>
            <Text style={[styles.tierValue, { color: currentTier === 'Diamond' ? '#9333EA' : currentTier === 'Gold' ? '#F59E0B' : currentTier === 'Silver' ? '#6B7280' : '#CD7F32' }]}>
              {currentTier} Tier
            </Text>
          </View>

          {asset.type === 'equity' && (
            <View style={styles.equityPercentageRow}>
              <Text style={styles.equityPercentageLabel}>Investment Round Percentage</Text>
              <Text style={styles.equityPercentageValue}>
                £{subtotal.toLocaleString()} = {((subtotal / (asset.id === 'liverpool' ? 40000000 : asset.id === 'exeter-chiefs' ? 5000000 : asset.id === 'ultimate-frisbee' ? 8000000 : 1000000)) * 100).toFixed(3)}% of the investment round
              </Text>
            </View>
          )}
          
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
  },
  assetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  assetLogo: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  assetDetails: {
    flex: 1,
  },
  assetName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 4,
  },
  assetType: {
    fontSize: 16,
    color: Colors.text.light,
  },
  priceSection: {
    paddingLeft: 76,
  },
  unitPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary.orange,
  },
  sellerInfo: {
    fontSize: 16,
    color: Colors.primary.orange,
    fontWeight: '600',
    marginBottom: 16,
  },
  quantitySection: {
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
  quantityInput: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: Colors.background.secondary,
  },
  paymentSection: {
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 12,
  },
  paymentOptionActive: {
    borderColor: Colors.primary.orange,
    backgroundColor: 'rgba(255, 92, 53, 0.1)',
  },
  paymentText: {
    fontSize: 16,
    color: Colors.text.light,
    marginLeft: 12,
  },
  paymentTextActive: {
    color: Colors.text.dark,
    fontWeight: '600',
  },
  poundSign: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.light,
    width: 24,
    textAlign: 'center',
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
  equityPercentageRow: {
    backgroundColor: 'rgba(245, 166, 35, 0.1)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.primary.orange,
  },
  equityPercentageLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.primary.orange,
    marginBottom: 4,
  },
  equityPercentageValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.dark,
    lineHeight: 20,
  },
  tierRow: {
    backgroundColor: 'rgba(147, 51, 234, 0.1)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#9333EA',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tierLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#9333EA',
  },
  tierValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  purchaseButton: {
    backgroundColor: Colors.accent.green,
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
  paymentNote: {
    fontSize: 12,
    color: Colors.text.light,
    textAlign: 'center',
    marginTop: 12,
    fontStyle: 'italic',
  },
});