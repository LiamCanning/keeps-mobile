import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ArrowLeft, TrendingUp, DollarSign } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { userAssets, completedAssets } from '@/constants/assets';

export default function ListAssetScreen() {
  const router = useRouter();
  const [selectedAsset, setSelectedAsset] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const [pricePerShare, setPricePerShare] = useState<string>('');
  const [totalValue, setTotalValue] = useState<number>(0);

  const allAssets = [...userAssets, ...completedAssets];

  const handleAssetSelect = (assetId: string) => {
    setSelectedAsset(assetId);
    calculateTotal();
  };

  const calculateTotal = () => {
    const qty = parseInt(quantity) || 0;
    const price = parseFloat(pricePerShare) || 0;
    setTotalValue(qty * price);
  };

  const handleQuantityChange = (value: string) => {
    setQuantity(value);
    const qty = parseInt(value) || 0;
    const price = parseFloat(pricePerShare) || 0;
    setTotalValue(qty * price);
  };

  const handlePriceChange = (value: string) => {
    setPricePerShare(value);
    const qty = parseInt(quantity) || 0;
    const price = parseFloat(value) || 0;
    setTotalValue(qty * price);
  };

  const handleListAsset = () => {
    if (!selectedAsset || !quantity || !pricePerShare) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    Alert.alert(
      'Confirm Listing',
      `List ${quantity} shares of ${allAssets.find(a => a.id === selectedAsset)?.name} at £${pricePerShare} per share?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'List Asset', 
          onPress: () => {
            router.push('/list-success');
          }
        }
      ]
    );
  };

  const selectedAssetData = allAssets.find(a => a.id === selectedAsset);

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'List Asset',
          headerStyle: { backgroundColor: Colors.primary.blue },
          headerTintColor: Colors.text.white,
          headerTitleStyle: { fontWeight: 'bold' },
        }} 
      />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Asset to List</Text>
          <Text style={styles.sectionSubtitle}>Choose which asset you want to sell</Text>
          
          {allAssets.map((asset) => (
            <TouchableOpacity
              key={asset.id}
              style={[
                styles.assetOption,
                selectedAsset === asset.id && styles.assetOptionSelected
              ]}
              onPress={() => handleAssetSelect(asset.id)}
            >
              <Text style={[
                styles.assetOptionText,
                selectedAsset === asset.id && styles.assetOptionTextSelected
              ]}>
                {asset.name}
              </Text>
              {selectedAsset === asset.id && (
                <View style={styles.selectedIndicator} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {selectedAsset && (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Quantity</Text>
              <Text style={styles.sectionSubtitle}>How many shares do you want to sell?</Text>
              
              <TextInput
                style={styles.input}
                value={quantity}
                onChangeText={handleQuantityChange}
                placeholder="Enter quantity"
                keyboardType="numeric"
                placeholderTextColor={Colors.text.light}
              />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Price Per Share</Text>
              <Text style={styles.sectionSubtitle}>Set your asking price per share</Text>
              
              <View style={styles.priceInputContainer}>
                <Text style={styles.currencySymbol}>£</Text>
                <TextInput
                  style={styles.priceInput}
                  value={pricePerShare}
                  onChangeText={handlePriceChange}
                  placeholder="0.00"
                  keyboardType="decimal-pad"
                  placeholderTextColor={Colors.text.light}
                />
              </View>
            </View>

            <View style={styles.summarySection}>
              <Text style={styles.summaryTitle}>Listing Summary</Text>
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Asset:</Text>
                <Text style={styles.summaryValue}>{selectedAssetData?.name}</Text>
              </View>
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Quantity:</Text>
                <Text style={styles.summaryValue}>{quantity || '0'} shares</Text>
              </View>
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Price per share:</Text>
                <Text style={styles.summaryValue}>£{pricePerShare || '0.00'}</Text>
              </View>
              
              <View style={[styles.summaryRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total Value:</Text>
                <Text style={styles.totalValue}>£{totalValue.toLocaleString()}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.listButton} onPress={handleListAsset}>
              <TrendingUp size={20} color={Colors.text.white} />
              <Text style={styles.listButtonText}>List Asset for Sale</Text>
            </TouchableOpacity>
          </>
        )}
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
  section: {
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: Colors.text.light,
    marginBottom: 16,
  },
  assetOption: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.border,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  assetOptionSelected: {
    borderColor: Colors.primary.orange,
    backgroundColor: 'rgba(245, 166, 35, 0.1)',
  },
  assetOptionText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.dark,
  },
  assetOptionTextSelected: {
    color: Colors.primary.orange,
  },
  selectedIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.primary.orange,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: Colors.text.dark,
    backgroundColor: Colors.background.light,
  },
  priceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    backgroundColor: Colors.background.light,
  },
  currencySymbol: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.dark,
    paddingLeft: 16,
  },
  priceInput: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    color: Colors.text.dark,
  },
  summarySection: {
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: Colors.primary.orange,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: Colors.text.light,
  },
  summaryValue: {
    fontSize: 14,
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
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.dark,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary.orange,
  },
  listButton: {
    backgroundColor: Colors.accent.green,
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.accent.green,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  listButtonText: {
    color: Colors.text.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});