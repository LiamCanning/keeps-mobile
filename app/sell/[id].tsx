import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { TrendingDown, Clock } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { userAssets } from '@/constants/assets';

export default function SellScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [quantity, setQuantity] = useState('1');
  const [listingType, setListingType] = useState<'market' | 'instant'>('market');
  const [customPrice, setCustomPrice] = useState('');
  
  const asset = userAssets.find(a => a.id === id);
  
  if (!asset) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Asset not found</Text>
      </View>
    );
  }

  const unitPrice = typeof asset.pricePerShare === 'number' ? asset.pricePerShare : 1000;
  
  // Premium pricing based on performance
  const premiumMultiplier = 1 + (asset.performance || 0) / 100;
  const marketPrice = Math.round(unitPrice * premiumMultiplier * 1.05); // 5% additional premium
  const instantPrice = Math.round(unitPrice * premiumMultiplier * 0.98); // 2% discount for instant
  
  const selectedPrice = listingType === 'market' 
    ? (customPrice ? parseFloat(customPrice) : marketPrice)
    : instantPrice;
  
  const quantityNum = parseInt(quantity || '0');
  const subtotal = quantityNum * selectedPrice;
  const platformFee = subtotal * 0.025; // 2.5% platform fee for selling
  const totalReceived = subtotal - platformFee;
  const maxQuantity = asset.shares || 0;

  // Calculate potential return
  const originalInvestment = quantityNum * unitPrice;
  const potentialReturn = ((totalReceived - originalInvestment) / originalInvestment) * 100;

  const getUnitText = (assetId: string) => {
    if (assetId === 'rydercup') return 'debenture';
    return 'share';
  };

  const getUnitTextPlural = (assetId: string) => {
    if (assetId === 'rydercup') return 'debentures';
    return 'shares';
  };

  const handleSell = () => {
    const action = 'list for sale';
    const unitText = quantityNum === 1 ? getUnitText(asset.id) : getUnitTextPlural(asset.id);
    
    router.push({
      pathname: '/sell-success',
      params: {
        amount: totalReceived.toLocaleString(),
        entity: asset.name,
        quantity: quantity,
        unitText: unitText
      }
    });
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          headerShown: true,
          headerTitle: `Sell ${asset.name}`,
          headerStyle: { backgroundColor: Colors.primary.blue },
          headerTintColor: Colors.text.white,
          headerTitleStyle: { fontWeight: 'bold' },
        }} 
      />
      <StatusBar style="light" />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.assetInfo}>
          <Text style={styles.assetName}>{asset.name}</Text>
          <Text style={styles.assetType}>
            You own {maxQuantity} {maxQuantity === 1 ? getUnitText(asset.id) : getUnitTextPlural(asset.id)}
          </Text>
          <Text style={styles.currentValue}>
            Original price: £{unitPrice.toLocaleString()} per unit
          </Text>
          <Text style={styles.performance}>
            Current performance: +{asset.performance?.toFixed(1)}%
          </Text>
        </View>

        <View style={styles.quantitySection}>
          <Text style={styles.sectionTitle}>Quantity to Sell</Text>
          <TextInput
            style={styles.quantityInput}
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
            placeholder={`Max: ${maxQuantity}`}
          />
          <Text style={styles.maxText}>Maximum: {maxQuantity}</Text>
        </View>

        <View style={styles.listingSection}>
          <Text style={styles.sectionTitle}>Selling Option</Text>
          
          <TouchableOpacity
            style={[styles.listingOption, listingType === 'market' && styles.listingOptionActive]}
            onPress={() => setListingType('market')}
          >
            <Clock size={24} color={listingType === 'market' ? Colors.primary.orange : Colors.text.light} />
            <View style={styles.listingInfo}>
              <Text style={[styles.listingTitle, listingType === 'market' && styles.listingTitleActive]}>
                List on Marketplace
              </Text>
              <Text style={styles.listingDescription}>
                Set your own price, may take time to sell
              </Text>
              <Text style={styles.listingPrice}>
                Suggested: £{marketPrice.toLocaleString()}
              </Text>
            </View>
          </TouchableOpacity>
          
          {listingType === 'market' && (
            <TextInput
              style={styles.priceInput}
              value={customPrice}
              onChangeText={setCustomPrice}
              keyboardType="numeric"
              placeholder={`Custom price (suggested: ${marketPrice})`}
            />
          )}
          
          <TouchableOpacity
            style={[styles.listingOption, listingType === 'instant' && styles.listingOptionActive]}
            onPress={() => setListingType('instant')}
          >
            <TrendingDown size={24} color={listingType === 'instant' ? Colors.primary.orange : Colors.text.light} />
            <View style={styles.listingInfo}>
              <Text style={[styles.listingTitle, listingType === 'instant' && styles.listingTitleActive]}>
                Instant Sale
              </Text>
              <Text style={styles.listingDescription}>
                Sell immediately at market rate
              </Text>
              <Text style={styles.listingPrice}>
                Price: £{instantPrice.toLocaleString()}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.summarySection}>
          <Text style={styles.sectionTitle}>Sale Summary</Text>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Quantity:</Text>
            <Text style={styles.summaryValue}>
              {quantity} {quantityNum === 1 ? getUnitText(asset.id) : getUnitTextPlural(asset.id)}
            </Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Price per unit:</Text>
            <Text style={styles.summaryValue}>£{selectedPrice.toLocaleString()}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal:</Text>
            <Text style={styles.summaryValue}>£{subtotal.toLocaleString()}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Platform Fee (2.5%):</Text>
            <Text style={styles.summaryValue}>-£{platformFee.toLocaleString()}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Potential Return:</Text>
            <Text style={[styles.summaryValue, { color: potentialReturn > 0 ? Colors.accent.green : '#FF3B30' }]}>
              {potentialReturn > 0 ? '+' : ''}{potentialReturn.toFixed(1)}%
            </Text>
          </View>
          
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>You'll Receive:</Text>
            <Text style={styles.totalValue}>£{totalReceived.toLocaleString()}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.sellButton} onPress={handleSell}>
          <Text style={styles.sellButtonText}>
            List for Sale
          </Text>
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
  currentValue: {
    fontSize: 16,
    color: Colors.text.dark,
    marginBottom: 4,
  },
  performance: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.accent.green,
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
    marginBottom: 8,
  },
  maxText: {
    fontSize: 14,
    color: Colors.text.light,
  },
  listingSection: {
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
  },
  listingOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 12,
  },
  listingOptionActive: {
    borderColor: Colors.primary.orange,
    backgroundColor: 'rgba(255, 92, 53, 0.1)',
  },
  listingInfo: {
    flex: 1,
    marginLeft: 12,
  },
  listingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.light,
    marginBottom: 4,
  },
  listingTitleActive: {
    color: Colors.text.dark,
  },
  listingDescription: {
    fontSize: 14,
    color: Colors.text.light,
    marginBottom: 4,
  },
  listingPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary.orange,
  },
  priceInput: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: Colors.background.secondary,
    marginBottom: 12,
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
    color: Colors.accent.green,
  },
  sellButton: {
    backgroundColor: Colors.accent.green,
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  sellButtonText: {
    color: Colors.text.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: Colors.text.white,
    fontSize: 18,
    textAlign: 'center',
    marginTop: 100,
  },
});