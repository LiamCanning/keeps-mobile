import React from 'react';
import { StyleSheet, View, ScrollView, Text, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react-native';
import Colors from '@/constants/colors';
import BackButton from '@/components/BackButton';

const { width } = Dimensions.get('window');

interface TrendData {
  asset: string;
  currentPrice: number;
  change: number;
  changePercent: number;
  volume: number;
  trend: 'up' | 'down';
}

const marketTrends: TrendData[] = [
  {
    asset: 'Liverpool FC',
    currentPrice: 125.50,
    change: 8.25,
    changePercent: 7.02,
    volume: 1250000,
    trend: 'up',
  },
  {
    asset: 'McLaren Racing',
    currentPrice: 89.75,
    change: -2.15,
    changePercent: -2.34,
    volume: 890000,
    trend: 'down',
  },
  {
    asset: 'Cardiff City',
    currentPrice: 45.20,
    change: 3.80,
    changePercent: 9.18,
    volume: 320000,
    trend: 'up',
  },
  {
    asset: 'Ryder Cup',
    currentPrice: 156.30,
    change: 12.45,
    changePercent: 8.65,
    volume: 780000,
    trend: 'up',
  },
  {
    asset: 'British Cycling',
    currentPrice: 67.90,
    change: -1.25,
    changePercent: -1.81,
    volume: 450000,
    trend: 'down',
  },
];

export default function MarketTrendsScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          headerShown: true,
          headerTitle: 'Market Trends',
          headerStyle: { backgroundColor: Colors.primary.blue },
          headerTintColor: Colors.text.white,
          headerTitleStyle: { fontWeight: 'bold' },
          headerLeft: () => <BackButton />,
        }} 
      />
      <StatusBar style="light" />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerSection}>
          <Activity size={24} color={Colors.primary.orange} />
          <Text style={styles.headerTitle}>Real-Time Market Data</Text>
        </View>

        <View style={styles.summarySection}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total Market Cap</Text>
            <Text style={styles.summaryValue}>£2.4B</Text>
            <Text style={[styles.summaryChange, { color: Colors.accent.green }]}>+5.2%</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>24h Volume</Text>
            <Text style={styles.summaryValue}>£45M</Text>
            <Text style={[styles.summaryChange, { color: Colors.accent.green }]}>+12.8%</Text>
          </View>
        </View>

        <View style={styles.trendsSection}>
          <Text style={styles.sectionTitle}>🏆 Asset Performance 🏆</Text>
          {marketTrends.map((trend, index) => (
            <View key={index} style={styles.trendCard}>
              <View style={styles.trendHeader}>
                <Text style={styles.assetName}>{trend.asset}</Text>
                {trend.trend === 'up' ? (
                  <TrendingUp size={20} color={Colors.accent.green} />
                ) : (
                  <TrendingDown size={20} color={Colors.accent.red} />
                )}
              </View>
              
              <View style={styles.trendData}>
                <View style={styles.priceContainer}>
                  <Text style={styles.currentPrice}>£{trend.currentPrice.toFixed(2)}</Text>
                  <Text style={[
                    styles.priceChange,
                    { color: trend.trend === 'up' ? Colors.accent.green : Colors.accent.red }
                  ]}>
                    {trend.change > 0 ? '+' : ''}£{trend.change.toFixed(2)} ({trend.changePercent.toFixed(2)}%)
                  </Text>
                </View>
                
                <View style={styles.volumeContainer}>
                  <Text style={styles.volumeLabel}>Volume</Text>
                  <Text style={styles.volumeValue}>£{(trend.volume / 1000000).toFixed(1)}M</Text>
                </View>
              </View>
              
              <View style={styles.chartPlaceholder}>
                <Text style={styles.chartText}>Price Chart (24h)</Text>
                <View style={[
                  styles.chartLine,
                  { backgroundColor: trend.trend === 'up' ? Colors.accent.green : Colors.accent.red }
                ]} />
              </View>
            </View>
          ))}
        </View>

        <View style={styles.insightsSection}>
          <Text style={styles.sectionTitle}>Market Insights</Text>
          <View style={styles.insightCard}>
            <Text style={styles.insightTitle}>🔥 Trending Now</Text>
            <Text style={styles.insightText}>
              Liverpool FC shares are experiencing high demand following their recent Champions League qualification.
            </Text>
          </View>
          <View style={styles.insightCard}>
            <Text style={styles.insightTitle}>📈 Growth Opportunity</Text>
            <Text style={styles.insightText}>
              Cardiff City showing strong momentum with 9.18% growth as they prepare for Championship promotion push.
            </Text>
          </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginLeft: 12,
  },
  summarySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  summaryCard: {
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    padding: 20,
    width: '48%',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: Colors.text.light,
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 4,
  },
  summaryChange: {
    fontSize: 14,
    fontWeight: '600',
  },
  trendsSection: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.white,
    marginBottom: 16,
  },
  trendCard: {
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  trendHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  assetName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.dark,
  },
  trendData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  priceContainer: {
    flex: 1,
  },
  currentPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 4,
  },
  priceChange: {
    fontSize: 14,
    fontWeight: '600',
  },
  volumeContainer: {
    alignItems: 'flex-end',
  },
  volumeLabel: {
    fontSize: 12,
    color: Colors.text.light,
    marginBottom: 4,
  },
  volumeValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.dark,
  },
  chartPlaceholder: {
    height: 60,
    backgroundColor: Colors.background.secondary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  chartText: {
    fontSize: 12,
    color: Colors.text.light,
    marginBottom: 8,
  },
  chartLine: {
    height: 3,
    width: '80%',
    borderRadius: 2,
  },
  insightsSection: {
    marginTop: 24,
  },
  insightCard: {
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 8,
  },
  insightText: {
    fontSize: 14,
    color: Colors.text.light,
    lineHeight: 20,
  },
});