import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Stack, useRouter } from 'expo-router';
import { BarChart3, Users, Clock, MapPin, Briefcase, ShoppingBag, TrendingUp } from 'lucide-react-native';
import Colors from '@/constants/colors';
import BackButton from '@/components/BackButton';

const { width } = Dimensions.get('window');

export default function ForOrganisationsScreen() {
  const router = useRouter();
  const [selectedMetric, setSelectedMetric] = useState('overview');

  const handleShopNowPress = () => {
    console.log('Navigate to merchandise shop');
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          headerShown: true,
          headerTitle: 'For Organisations',
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
          <Text style={styles.headerTitle}>Liverpool FC Data Dashboard</Text>
        </View>

        {/* Key Metrics Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Metrics Overview</Text>
          <View style={styles.metricsGrid}>
            <View style={styles.metricCard}>
              <Users size={24} color={Colors.accent.blue} />
              <Text style={styles.metricValue}>10,250</Text>
              <Text style={styles.metricLabel}>Total Investors</Text>
            </View>
            <View style={styles.metricCard}>
              <TrendingUp size={24} color={Colors.accent.green} />
              <Text style={styles.metricValue}>£30M</Text>
              <Text style={styles.metricLabel}>Total Raised</Text>
            </View>
            <View style={styles.metricCard}>
              <Clock size={24} color={Colors.accent.orange} />
              <Text style={styles.metricValue}>8.4 min</Text>
              <Text style={styles.metricLabel}>Avg. Time on Page</Text>
            </View>
            <View style={styles.metricCard}>
              <MapPin size={24} color={Colors.accent.purple} />
              <Text style={styles.metricValue}>34</Text>
              <Text style={styles.metricLabel}>Countries</Text>
            </View>
          </View>
        </View>

        {/* Age Distribution */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Investor Age Distribution</Text>
          <View style={styles.chartContainer}>
            <View style={styles.ageBar}>
              <Text style={styles.ageLabel}>18-24</Text>
              <View style={[styles.barFill, { width: '18%', backgroundColor: Colors.accent.purple }]} />
              <Text style={styles.agePercent}>18%</Text>
            </View>
            <View style={styles.ageBar}>
              <Text style={styles.ageLabel}>25-34</Text>
              <View style={[styles.barFill, { width: '42%', backgroundColor: Colors.accent.blue }]} />
              <Text style={styles.agePercent}>42%</Text>
            </View>
            <View style={styles.ageBar}>
              <Text style={styles.ageLabel}>35-44</Text>
              <View style={[styles.barFill, { width: '25%', backgroundColor: Colors.accent.green }]} />
              <Text style={styles.agePercent}>25%</Text>
            </View>
            <View style={styles.ageBar}>
              <Text style={styles.ageLabel}>45-54</Text>
              <View style={[styles.barFill, { width: '12%', backgroundColor: Colors.accent.orange }]} />
              <Text style={styles.agePercent}>12%</Text>
            </View>
            <View style={styles.ageBar}>
              <Text style={styles.ageLabel}>55+</Text>
              <View style={[styles.barFill, { width: '3%', backgroundColor: Colors.accent.red }]} />
              <Text style={styles.agePercent}>3%</Text>
            </View>
          </View>
        </View>

        {/* Investment by Age Group */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Investment Amounts by Age Group</Text>
          <View style={styles.investmentGrid}>
            <View style={styles.investmentCard}>
              <Text style={styles.investmentAge}>25-34</Text>
              <Text style={styles.investmentAmount}>£15,000 - £45,000</Text>
              <Text style={styles.investmentCount}>1,196 investors</Text>
            </View>
            <View style={styles.investmentCard}>
              <Text style={styles.investmentAge}>35-44</Text>
              <Text style={styles.investmentAmount}>£25,000 - £75,000</Text>
              <Text style={styles.investmentCount}>712 investors</Text>
            </View>
            <View style={styles.investmentCard}>
              <Text style={styles.investmentAge}>18-24</Text>
              <Text style={styles.investmentAmount}>£5,000 - £25,000</Text>
              <Text style={styles.investmentCount}>512 investors</Text>
            </View>
            <View style={styles.investmentCard}>
              <Text style={styles.investmentAge}>45-54</Text>
              <Text style={styles.investmentAmount}>£35,000 - £100,000</Text>
              <Text style={styles.investmentCount}>341 investors</Text>
            </View>
          </View>
        </View>

        {/* Investor Backgrounds */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Investor Professional Backgrounds</Text>
          <View style={styles.backgroundGrid}>
            <View style={styles.backgroundItem}>
              <Briefcase size={20} color={Colors.accent.blue} />
              <Text style={styles.backgroundLabel}>Finance</Text>
              <Text style={styles.backgroundPercent}>32%</Text>
            </View>
            <View style={styles.backgroundItem}>
              <Briefcase size={20} color={Colors.accent.green} />
              <Text style={styles.backgroundLabel}>Technology</Text>
              <Text style={styles.backgroundPercent}>24%</Text>
            </View>
            <View style={styles.backgroundItem}>
              <Briefcase size={20} color={Colors.accent.orange} />
              <Text style={styles.backgroundLabel}>Legal</Text>
              <Text style={styles.backgroundPercent}>18%</Text>
            </View>
            <View style={styles.backgroundItem}>
              <Briefcase size={20} color={Colors.accent.purple} />
              <Text style={styles.backgroundLabel}>Healthcare</Text>
              <Text style={styles.backgroundPercent}>14%</Text>
            </View>
            <View style={styles.backgroundItem}>
              <Briefcase size={20} color={Colors.accent.red} />
              <Text style={styles.backgroundLabel}>Engineering</Text>
              <Text style={styles.backgroundPercent}>8%</Text>
            </View>
            <View style={styles.backgroundItem}>
              <Briefcase size={20} color={Colors.text.light} />
              <Text style={styles.backgroundLabel}>Other</Text>
              <Text style={styles.backgroundPercent}>4%</Text>
            </View>
          </View>
        </View>

        {/* Geographic Distribution */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Investor Locations</Text>
          <View style={styles.locationGrid}>
            <View style={styles.locationItem}>
              <Text style={styles.locationFlag}>🇬🇧</Text>
              <Text style={styles.locationName}>United Kingdom</Text>
              <Text style={styles.locationPercent}>48%</Text>
            </View>
            <View style={styles.locationItem}>
              <Text style={styles.locationFlag}>🇺🇸</Text>
              <Text style={styles.locationName}>United States</Text>
              <Text style={styles.locationPercent}>22%</Text>
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
              <Text style={styles.locationFlag}>🇮🇪</Text>
              <Text style={styles.locationName}>Ireland</Text>
              <Text style={styles.locationPercent}>6%</Text>
            </View>
            <View style={styles.locationItem}>
              <Text style={styles.locationFlag}>🌍</Text>
              <Text style={styles.locationName}>Other</Text>
              <Text style={styles.locationPercent}>9%</Text>
            </View>
          </View>
        </View>

        {/* Marketing Products Section */}
        <View style={styles.marketingSection}>
          <Text style={styles.sectionTitle}>Liverpool FC Kit Collection</Text>
          <Text style={styles.marketingSubtitle}>Market directly to 10,250 Liverpool FC investors through Keeps</Text>
          
          <View style={styles.kitGrid}>
            <View style={styles.kitCard}>
              <Image 
                source={{ uri: 'https://r2-pub.rork.com/attachments/ttvgy1sxmvk0kpc7vdzwv' }}
                style={styles.kitImage}
              />
              <Text style={styles.kitTitle}>Home Kit</Text>
              <Text style={styles.kitDescription}>Classic red with modern design elements</Text>
              <Text style={styles.kitPrice}>£89.99</Text>
              <TouchableOpacity style={styles.shopButton} onPress={handleShopNowPress}>
                <ShoppingBag size={16} color={Colors.text.white} />
                <Text style={styles.shopButtonText}>Shop Now</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.kitCard}>
              <Image 
                source={{ uri: 'https://r2-pub.rork.com/attachments/i1l5k3wnsugb6acthtjyo' }}
                style={styles.kitImage}
              />
              <Text style={styles.kitTitle}>Away Kit</Text>
              <Text style={styles.kitDescription}>Elegant white with gold accents</Text>
              <Text style={styles.kitPrice}>£89.99</Text>
              <TouchableOpacity style={styles.shopButton} onPress={handleShopNowPress}>
                <ShoppingBag size={16} color={Colors.text.white} />
                <Text style={styles.shopButtonText}>Shop Now</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.marketingInsight}>
            <Text style={styles.marketingInsightTitle}>Direct Marketing Opportunity</Text>
            <Text style={styles.marketingInsightText}>
              Reach 10,250 verified Liverpool FC investors directly through the Keeps platform. 
              Our investors have demonstrated financial commitment and passion for the club, 
              making them ideal customers for exclusive merchandise and experiences.
            </Text>
          </View>
        </View>

        {/* Data Insights Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Zero & First Party Data Insights</Text>
          <View style={styles.dataInsightGrid}>
            <View style={styles.dataInsightCard}>
              <Text style={styles.dataInsightTitle}>Zero-Party Data</Text>
              <Text style={styles.dataInsightText}>
                • Investment preferences and amounts
                • Declared interests and motivations
                • Voluntary demographic information
                • Engagement preferences
              </Text>
            </View>
            <View style={styles.dataInsightCard}>
              <Text style={styles.dataInsightTitle}>First-Party Data</Text>
              <Text style={styles.dataInsightText}>
                • Platform behaviour and engagement
                • Content consumption patterns
                • Transaction history and frequency
                • Communication preferences
              </Text>
            </View>
          </View>
        </View>

        {/* Key Insights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Insights</Text>
          <View style={styles.insightCard}>
            <Text style={styles.insightTitle}>🎯 Target Demographic</Text>
            <Text style={styles.insightText}>
              Your core investor base is 25-44 year old professionals in finance and technology, 
              primarily from the UK and US, with strong engagement and high investment amounts.
            </Text>
          </View>
          <View style={styles.insightCard}>
            <Text style={styles.insightTitle}>📈 Growth Opportunity</Text>
            <Text style={styles.insightText}>
              High engagement time (8.4 minutes) indicates strong interest. Consider targeting 
              similar demographics in untapped markets like Germany and France.
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
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginLeft: 12,
    flex: 1,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricCard: {
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    padding: 16,
    width: '48%',
    alignItems: 'center',
    marginBottom: 16,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginTop: 8,
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 12,
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
  investmentCount: {
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
  marketingSection: {
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
  },
  marketingSubtitle: {
    fontSize: 14,
    color: Colors.text.light,
    marginBottom: 16,
  },
  kitGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  kitCard: {
    width: '48%',
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  kitImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginBottom: 12,
  },
  kitTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 4,
    textAlign: 'center',
  },
  kitDescription: {
    fontSize: 12,
    color: Colors.text.light,
    textAlign: 'center',
    marginBottom: 8,
  },
  kitPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary.orange,
    marginBottom: 12,
  },
  shopButton: {
    backgroundColor: Colors.primary.orange,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  shopButtonText: {
    color: Colors.text.white,
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  insightCard: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
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
  marketingInsight: {
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  marketingInsightTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 8,
  },
  marketingInsightText: {
    fontSize: 14,
    color: Colors.text.light,
    lineHeight: 20,
  },
  dataInsightGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dataInsightCard: {
    width: '48%',
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    padding: 16,
  },
  dataInsightTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 12,
  },
  dataInsightText: {
    fontSize: 14,
    color: Colors.text.light,
    lineHeight: 20,
  },
});