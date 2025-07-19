import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { CheckCircle, ArrowRight } from 'lucide-react-native';
import Colors from '@/constants/colors';

export default function PurchaseSuccessScreen() {
  const { amount, entity, quantity, type, unitLabel } = useLocalSearchParams();
  const router = useRouter();

  const handleBackToPortfolio = () => {
    router.push('/(tabs)/portfolio');
  };

  const handleViewAsset = () => {
    router.push(`/asset/${entity}`);
  };

  const getEntityName = () => {
    switch(entity) {
      case 'liverpool': return 'Liverpool FC';
      case 'mclaren': return 'McLaren Racing';
      case 'rydercup': return 'Ryder Cup';
      default: return entity;
    }
  };

  const quantityNum = parseInt(quantity as string || '1');
  const displayUnit = unitLabel || (quantityNum === 1 ? 'share' : 'shares');

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          headerShown: true,
          headerTitle: "Purchase Complete",
          headerStyle: { backgroundColor: Colors.primary.blue },
          headerTintColor: Colors.text.white,
          headerTitleStyle: { fontWeight: 'bold' },
        }} 
      />
      <StatusBar style="light" />
      
      <View style={styles.content}>
        <View style={styles.successSection}>
          <CheckCircle size={80} color={Colors.accent.green} />
          <Text style={styles.successTitle}>Congratulations! 🎉</Text>
          <Text style={styles.successMessage}>
            You've just invested £{amount} in {getEntityName()} for {quantity} {displayUnit}!
          </Text>
        </View>

        <View style={styles.detailsSection}>
          <Text style={styles.detailsTitle}>What happens next?</Text>
          <View style={styles.stepContainer}>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <Text style={styles.stepText}>Your investment is processed and confirmed</Text>
            </View>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <Text style={styles.stepText}>You'll receive exclusive benefits based on your tier</Text>
            </View>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <Text style={styles.stepText}>Start earning dividends and returns on your investment</Text>
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleBackToPortfolio}>
            <Text style={styles.primaryButtonText}>View Portfolio</Text>
            <ArrowRight size={20} color={Colors.text.white} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.secondaryButton} onPress={handleViewAsset}>
            <Text style={styles.secondaryButtonText}>View Asset Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.blue,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  successSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text.white,
    marginTop: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 18,
    color: Colors.text.white,
    textAlign: 'center',
    lineHeight: 26,
    opacity: 0.9,
  },
  detailsSection: {
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    padding: 24,
    marginBottom: 32,
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 20,
  },
  stepContainer: {
    gap: 16,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary.orange,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  stepNumberText: {
    color: Colors.text.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  stepText: {
    flex: 1,
    fontSize: 16,
    color: Colors.text.dark,
    lineHeight: 22,
  },
  buttonContainer: {
    gap: 12,
  },
  primaryButton: {
    backgroundColor: Colors.primary.orange,
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: Colors.text.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.text.white,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: Colors.text.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});