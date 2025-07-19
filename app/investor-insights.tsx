import React from 'react';
import { StyleSheet, View, ScrollView, Text, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import { Users, BarChart3, Globe, Briefcase } from 'lucide-react-native';
import Colors from '@/constants/colors';
import BackButton from '@/components/BackButton';

const { width } = Dimensions.get('window');

export default function InvestorInsightsScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          headerShown: true,
          headerTitle: 'Investor Insights',
          headerStyle: { backgroundColor: Colors.primary.blue },
          headerTintColor: Colors.text.white,
          headerTitleStyle: { fontWeight: 'bold' },
          headerLeft: () => <BackButton />,
        }} 
      />
      <StatusBar style="light" />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerSection}>
          <BarChart3 size={24} color={Colors.primary.orange} />
          <Text style={styles.headerTitle}>🏆 Anonymised Investor Demographics 🏆</Text>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Users size={32} color={Colors.accent.blue} />
            <Text style={styles.statValue}>12,847</Text>
            <Text style={styles.statLabel}>Total Investors</Text>
          </View>
          <View style={styles.statCard}>
            <Globe size={32} color={Colors.accent.green} />
            <Text style={styles.statValue}>47</Text>
            <Text style={styles.statLabel}>Countries</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Age Distribution</Text>
          <View style={styles.chartContainer}>
            <View style={styles.ageBar}>
              <Text style={styles.ageLabel}>18-24</Text>
              <View style={[styles.barFill, { width: '15%', backgroundColor: Colors.accent.purple }]} />
              <Text style={styles.agePercent}>15%</Text>
            </View>
            <View style={styles.ageBar}>
              <Text style={styles.ageLabel}>25-34</Text>
              <View style={[styles.barFill, { width: '35%', backgroundColor: Colors.accent.blue }]} />
              <Text style={styles.agePercent}>35%</Text>
            </View>
            <View style={styles.ageBar}>
              <Text style={styles.ageLabel}>35-44</Text>
              <View style={[styles.barFill, { width: '28%', backgroundColor: Colors.accent.green }]} />
              <Text style={styles.agePercent}>28%</Text>
            </View>
            <View style={styles.ageBar}>
              <Text style={styles.ageLabel}>45-54</Text>
              <View style={[styles.barFill, { width: '15%', backgroundColor: Colors.accent.orange }]} />
              <Text style={styles.agePercent}>15%</Text>
            </View>
            <View style={styles.ageBar}>
              <Text style={styles.ageLabel}>55+</Text>
              <View style={[styles.barFill, { width: '7%', backgroundColor: Colors.accent.red }]} />
              <Text style={styles.agePercent}>7%</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Investment Amounts by Age Group</Text>
          <View style={styles.investmentGrid}>
            <View style={styles.investmentCard}>
              <Text style={styles.investmentAge}>25-34</Text>
              <Text style={styles.investmentAmount}>£15,000 - £45,000</Text>
              <Text style={styles.investmentNote}>Highest volume group</Text>
            </View>
            <View style={styles.investmentCard}>
              <Text style={styles.investmentAge}>35-44</Text>
              <Text style={styles.investmentAmount}>£25,000 - £75,000</Text>
              <Text style={styles.investmentNote}>Highest average investment</Text>
            </View>
            <View style={styles.investmentCard}>
              <Text style={styles.investmentAge}>45-54</Text>
              <Text style={styles.investmentAmount}>£35,000 - £100,000</Text>
              <Text style={styles.investmentNote}>Premium investors</Text>
            </View>
            <View style={styles.investmentCard}>
              <Text style={styles.investmentAge}>18-24</Text>
              <Text style={styles.investmentAmount}>£5,000 - £20,000</Text>
              <Text style={styles.investmentNote}>Growing segment</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Investor Backgrounds</Text>
          <View style={styles.backgroundGrid}>
            <View style={styles.backgroundItem}>
              <Briefcase size={20} color={Colors.accent.blue} />
              <Text style={styles.backgroundLabel}>Finance Professional</Text>
              <Text style={styles.backgroundPercent}>28%</Text>
            </View>
            <View style={styles.backgroundItem}>
              <Briefcase size={20} color={Colors.accent.green} />
              <Text style={styles.backgroundLabel}>Technology</Text>
              <Text style={styles.backgroundPercent}>22%</Text>
            </View>
            <View style={styles.backgroundItem}>
              <Briefcase size={20} color={Colors.accent.orange} />
              <Text style={styles.backgroundLabel}>Legal</Text>
              <Text style={styles.backgroundPercent}>18%</Text>
            </View>
            <View style={styles.backgroundItem}>
              <Briefcase size={20} color={Colors.accent.purple} />
              <Text style={styles.backgroundLabel}>Healthcare</Text>
              <Text style={styles.backgroundPercent}>15%</Text>
            </View>
            <View style={styles.backgroundItem}>
              <Briefcase size={20} color={Colors.accent.red} />
              <Text style={styles.backgroundLabel}>Engineering</Text>
              <Text style={styles.backgroundPercent}>12%</Text>
            </View>
            <View style={styles.backgroundItem}>
              <Briefcase size={20} color={Colors.text.light} />
              <Text style={styles.backgroundLabel}>Other</Text>
              <Text style={styles.backgroundPercent}>5%</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Geographic Distribution</Text>
          <View style={styles.locationGrid}>
            <View style={styles.locationItem}>
              <Text style={styles.locationFlag}>🇬🇧</Text>
              <Text style={styles.locationName}>United Kingdom</Text>
              <Text style={styles.locationPercent}>42%</Text>
            </View>
            <View style={styles.locationItem}>
              <Text style={styles.locationFlag}>🇺🇸</Text>
              <Text style={styles.locationName}>United States</Text>
              <Text style={styles.locationPercent}>28%</Text>
            </View>
            <View style={styles.locationItem}>
              <Text style={styles.locationFlag}>🇨🇦</Text>
              <Text style={styles.locationName}>Canada</Text>
              <Text style={styles.locationPercent}>8%</Text>
            </View>
            <View style={styles.locationItem}>
              <Text style={styles.locationFlag}>🇦🇺</Text>
              <Text style={styles.locationName}>Australia</Text>
              <Text style={styles.locationPercent}>7%</Text>
            </View>
            <View style={styles.locationItem}>
              <Text style={styles.locationFlag}>🇩🇪</Text>
              <Text style={styles.locationName}>Germany</Text>
              <Text style={styles.locationPercent}>6%</Text>
            </View>
            <View style={styles.locationItem}>
              <Text style={styles.locationFlag}>🌍</Text>
              <Text style={styles.locationName}>Other</Text>
              <Text style={styles.locationPercent}>9%</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Investment Patterns</Text>
          <View style={styles.patternCard}>
            <Text style={styles.patternTitle}>Most Popular Assets</Text>
            <Text style={styles.patternText}>1. Liverpool FC (34% of investors)</Text>
            <Text style={styles.patternText}>2. McLaren Racing (28% of investors)</Text>
            <Text style={styles.patternText}>3. Ryder Cup (22% of investors)</Text>
          </View>
          <View style={styles.patternCard}>
            <Text style={styles.patternTitle}>Average Portfolio Size</Text>
            <Text style={styles.patternText}>2.3 assets per investor</Text>
            <Text style={styles.patternText}>£32,500 average investment</Text>
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
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginLeft: 12,
    flex: 1,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  statCard: {
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    padding: 20,
    width: '48%',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginTop: 12,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.text.light,
    textAlign: 'center',
  },
  section: {
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
  chartContainer: {
    marginTop: 8,
  },
  ageBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ageLabel: {
    fontSize: 14,
    color: Colors.text.dark,
    width: 50,
    fontWeight: '600',
  },
  barFill: {
    height: 20,
    borderRadius: 10,
    marginHorizontal: 12,
    flex: 1,
  },
  agePercent: {
    fontSize: 14,
    color: Colors.text.dark,
    fontWeight: '600',
    width: 40,
    textAlign: 'right',
  },
  investmentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  investmentCard: {
    width: '48%',
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  investmentAge: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 8,
  },
  investmentAmount: {
    fontSize: 14,
    color: Colors.primary.orange,
    fontWeight: '600',
    marginBottom: 4,
  },
  investmentNote: {
    fontSize: 12,
    color: Colors.text.light,
  },
  backgroundGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  backgroundItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  backgroundLabel: {
    fontSize: 14,
    color: Colors.text.dark,
    marginLeft: 8,
    flex: 1,
  },
  backgroundPercent: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text.dark,
  },
  locationGrid: {
    marginTop: 8,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  locationFlag: {
    fontSize: 24,
    marginRight: 12,
  },
  locationName: {
    fontSize: 16,
    color: Colors.text.dark,
    flex: 1,
  },
  locationPercent: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.dark,
  },
  patternCard: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  patternTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 8,
  },
  patternText: {
    fontSize: 14,
    color: Colors.text.light,
    marginBottom: 4,
  },
});