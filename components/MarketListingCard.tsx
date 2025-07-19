import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { ShoppingCart } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { MarketListing } from '@/constants/market';

interface MarketListingCardProps {
  listing: MarketListing;
  onPress?: () => void;
}

export default function MarketListingCard({ listing, onPress }: MarketListingCardProps) {
  const priceIncrease = ((listing.pricePerUnit - listing.originalPrice) / listing.originalPrice) * 100;
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image source={{ uri: listing.logo }} style={styles.logo} />
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.assetName}>{listing.assetName}</Text>
          <Text style={styles.seller}>Seller: {listing.seller}</Text>
        </View>
      </View>
      
      <View style={styles.details}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Quantity:</Text>
          <Text style={styles.detailValue}>{listing.quantity}</Text>
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
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Subtotal:</Text>
          <Text style={styles.detailValue}>£{listing.totalPrice.toLocaleString()}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Processing Fee (2.5%):</Text>
          <Text style={styles.detailValue}>£{(listing.totalPrice * 0.025).toLocaleString()}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Total price:</Text>
          <Text style={styles.detailValueTotal}>£{(listing.totalPrice * 1.025).toLocaleString()}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Expires:</Text>
          <Text style={styles.detailValue}>{listing.expiryDate}</Text>
        </View>
      </View>
      
      <TouchableOpacity style={styles.buyButton} onPress={onPress}>
        <ShoppingCart size={16} color={Colors.text.white} />
        <Text style={styles.buyButtonText}>Buy Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoContainer: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  headerInfo: {
    flex: 1,
  },
  assetName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.dark,
  },
  seller: {
    fontSize: 14,
    color: Colors.text.light,
  },
  details: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
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
  detailValueTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary.blue,
  },
  buyButton: {
    backgroundColor: Colors.primary.orange,
    borderRadius: 8,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyButtonText: {
    color: Colors.text.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});