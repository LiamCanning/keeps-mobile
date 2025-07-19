import React from 'react';
import { StyleSheet, View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { ArrowLeft, Building2, User, Trophy } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { userAssets } from '@/constants/assets';

interface Investor {
  id: string;
  name: string;
  avatar: string;
  amount: string;
  type: 'sponsor' | 'individual';
  logo?: string;
}

const getInvestorsForAsset = (assetId: string): Investor[] => {
  const sponsorInvestors: Record<string, Investor[]> = {
    liverpool: [
      {
        id: 'nike',
        name: 'Nike',
        avatar: 'https://logos-world.net/wp-content/uploads/2020/04/Nike-Logo.png',
        amount: '£5,000,000',
        type: 'sponsor',
        logo: 'https://logos-world.net/wp-content/uploads/2020/04/Nike-Logo.png'
      },
      {
        id: 'axa',
        name: 'AXA',
        avatar: 'https://r2-pub.rork.com/attachments/988sxlkz33bwn210j729g',
        amount: '£1,500,000',
        type: 'sponsor',
        logo: 'https://r2-pub.rork.com/attachments/988sxlkz33bwn210j729g'
      }
    ],
    mclaren: [
      {
        id: 'google',
        name: 'Google',
        avatar: 'https://r2-pub.rork.com/attachments/5g5t0ocsyi9wforgzzit2',
        amount: '£3,200,000',
        type: 'sponsor',
        logo: 'https://r2-pub.rork.com/attachments/5g5t0ocsyi9wforgzzit2'
      }
    ],
    rydercup: [
      {
        id: 'rolex',
        name: 'Rolex',
        avatar: 'https://r2-pub.rork.com/attachments/q0pekftwahwra9h5c1shd',
        amount: '£2,800,000',
        type: 'sponsor',
        logo: 'https://r2-pub.rork.com/attachments/q0pekftwahwra9h5c1shd'
      }
    ]
  };

  const individualInvestorsData: Record<string, Investor[]> = {
    liverpool: [
      {
        id: 'james_wilson',
        name: 'James Wilson',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        amount: '£3,000,000',
        type: 'individual'
      },
      {
        id: 'sarah_martinez',
        name: 'Sarah Martinez',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        amount: '£2,750,000',
        type: 'individual'
      },
      {
        id: 'david_thompson',
        name: 'David Thompson',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        amount: '£2,500,000',
        type: 'individual'
      },
      {
        id: 'emma_johnson',
        name: 'Emma Johnson',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        amount: '£2,200,000',
        type: 'individual'
      },
      {
        id: 'michael_brown',
        name: 'Michael Brown',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        amount: '£1,950,000',
        type: 'individual'
      },
      {
        id: 'lisa_davis',
        name: 'Lisa Davis',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
        amount: '£1,800,000',
        type: 'individual'
      },
      {
        id: 'robert_garcia',
        name: 'Robert Garcia',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
        amount: '£1,650,000',
        type: 'individual'
      },
      {
        id: 'jennifer_lee',
        name: 'Jennifer Lee',
        avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
        amount: '£1,500,000',
        type: 'individual'
      },
      {
        id: 'alex_rodriguez',
        name: 'Alex Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face',
        amount: '£1,350,000',
        type: 'individual'
      },
      {
        id: 'maria_gonzalez',
        name: 'Maria Gonzalez',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
        amount: '£1,200,000',
        type: 'individual'
      }
    ],
    mclaren: [
      {
        id: 'thomas_anderson',
        name: 'Thomas Anderson',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
        amount: '£2,800,000',
        type: 'individual'
      },
      {
        id: 'olivia_parker',
        name: 'Olivia Parker',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face',
        amount: '£2,400,000',
        type: 'individual'
      },
      {
        id: 'william_clark',
        name: 'William Clark',
        avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150&h=150&fit=crop&crop=face',
        amount: '£2,100,000',
        type: 'individual'
      },
      {
        id: 'sophia_white',
        name: 'Sophia White',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
        amount: '£1,900,000',
        type: 'individual'
      },
      {
        id: 'benjamin_taylor',
        name: 'Benjamin Taylor',
        avatar: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=150&h=150&fit=crop&crop=face',
        amount: '£1,750,000',
        type: 'individual'
      },
      {
        id: 'charlotte_moore',
        name: 'Charlotte Moore',
        avatar: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=150&h=150&fit=crop&crop=face',
        amount: '£1,600,000',
        type: 'individual'
      },
      {
        id: 'henry_jackson',
        name: 'Henry Jackson',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&h=150&fit=crop&crop=face',
        amount: '£1,450,000',
        type: 'individual'
      },
      {
        id: 'amelia_harris',
        name: 'Amelia Harris',
        avatar: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=150&h=150&fit=crop&crop=face',
        amount: '£1,300,000',
        type: 'individual'
      },
      {
        id: 'lucas_martin',
        name: 'Lucas Martin',
        avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=150&h=150&fit=crop&crop=face',
        amount: '£1,150,000',
        type: 'individual'
      },
      {
        id: 'isabella_thompson',
        name: 'Isabella Thompson',
        avatar: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=150&h=150&fit=crop&crop=face',
        amount: '£1,000,000',
        type: 'individual'
      }
    ],
    rydercup: [
      {
        id: 'alexander_king',
        name: 'Alexander King',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        amount: '£2,600,000',
        type: 'individual'
      },
      {
        id: 'victoria_scott',
        name: 'Victoria Scott',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face',
        amount: '£2,300,000',
        type: 'individual'
      },
      {
        id: 'daniel_wright',
        name: 'Daniel Wright',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        amount: '£2,000,000',
        type: 'individual'
      },
      {
        id: 'grace_adams',
        name: 'Grace Adams',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
        amount: '£1,800,000',
        type: 'individual'
      },
      {
        id: 'matthew_baker',
        name: 'Matthew Baker',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        amount: '£1,650,000',
        type: 'individual'
      },
      {
        id: 'chloe_green',
        name: 'Chloe Green',
        avatar: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=150&h=150&fit=crop&crop=face',
        amount: '£1,500,000',
        type: 'individual'
      },
      {
        id: 'joshua_hill',
        name: 'Joshua Hill',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
        amount: '£1,350,000',
        type: 'individual'
      },
      {
        id: 'lily_carter',
        name: 'Lily Carter',
        avatar: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=150&h=150&fit=crop&crop=face',
        amount: '£1,200,000',
        type: 'individual'
      },
      {
        id: 'ethan_mitchell',
        name: 'Ethan Mitchell',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face',
        amount: '£1,050,000',
        type: 'individual'
      },
      {
        id: 'zoe_roberts',
        name: 'Zoe Roberts',
        avatar: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=150&h=150&fit=crop&crop=face',
        amount: '£900,000',
        type: 'individual'
      }
    ]
  };

  const individualInvestors = individualInvestorsData[assetId] || individualInvestorsData.liverpool;

  return [
    ...(sponsorInvestors[assetId] || []),
    ...individualInvestors
  ];
};

export default function InvestorsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  const asset = userAssets.find(a => a.id === id);
  const investors = getInvestorsForAsset(id as string);
  
  const sponsorInvestors = investors.filter(inv => inv.type === 'sponsor');
  const individualInvestors = investors.filter(inv => inv.type === 'individual');
  
  if (!asset) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Asset not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          headerShown: true,
          headerTitle: `Who's Invested in ${asset.name}?`,
          headerStyle: { backgroundColor: Colors.primary.blue },
          headerTintColor: Colors.text.white,
          headerTitleStyle: { fontWeight: 'bold', fontSize: 16 },
        }} 
      />
      <StatusBar style="light" />
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Asset Header */}
        <View style={styles.assetHeader}>
          <Image source={{ uri: asset.logo }} style={styles.assetLogo} />
          <Text style={styles.assetName}>{asset.name}</Text>
          <Text style={styles.totalInvestors}>
            {asset.investorCount?.toLocaleString()} total investors
          </Text>
        </View>

        {/* Sponsor Investors Section */}
        {sponsorInvestors.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Building2 size={24} color={Colors.primary.orange} />
              <Text style={styles.sectionTitle}>Sponsor Investors</Text>
            </View>
            
            {sponsorInvestors.map((investor, index) => (
              <View key={investor.id} style={styles.investorCard}>
                <View style={styles.rankBadge}>
                  <Text style={styles.rankText}>{index + 1}</Text>
                </View>
                <Image source={{ uri: investor.avatar }} style={styles.sponsorLogo} />
                <View style={styles.investorInfo}>
                  <Text style={styles.investorName}>{investor.name}</Text>
                  <Text style={styles.investorType}>Corporate Sponsor</Text>
                </View>
                <View style={styles.investorAmount}>
                  <Text style={styles.amountText}>{investor.amount}</Text>
                  <View style={styles.sponsorBadge}>
                    <Text style={styles.sponsorBadgeText}>SPONSOR</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Individual Investors Leaderboard */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Trophy size={24} color={Colors.accent.green} />
            <Text style={styles.sectionTitle}>Top 10 Investor Leaderboard 🏆</Text>
          </View>
          
          {individualInvestors.map((investor, index) => (
            <View key={investor.id} style={styles.investorCard}>
              <View style={[
                styles.rankBadge, 
                index < 3 ? styles.topThreeRank : null,
                index === 0 ? styles.goldRank : 
                index === 1 ? styles.silverRank : 
                index === 2 ? styles.bronzeRank : null
              ]}>
                <Text style={[
                  styles.rankText,
                  index < 3 ? styles.topThreeRankText : null
                ]}>
                  {index + 1}
                </Text>
              </View>
              <Image source={{ uri: investor.avatar }} style={styles.investorAvatar} />
              <View style={styles.investorInfo}>
                <Text style={styles.investorName}>{investor.name}</Text>
                <Text style={styles.investorType}>Individual Investor</Text>
              </View>
              <View style={styles.investorAmount}>
                <Text style={styles.amountText}>{investor.amount}</Text>
                {index < 3 && (
                  <View style={[
                    styles.topInvestorBadge,
                    index === 0 ? styles.goldBadge :
                    index === 1 ? styles.silverBadge :
                    styles.bronzeBadge
                  ]}>
                    <Text style={styles.topInvestorBadgeText}>
                      {index === 0 ? '🥇 TOP' : index === 1 ? '🥈 2ND' : '🥉 3RD'}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          ))}
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
    paddingBottom: 24,
  },
  assetHeader: {
    backgroundColor: Colors.background.card,
    margin: 16,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  assetLogo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 12,
  },
  assetName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 8,
  },
  totalInvestors: {
    fontSize: 16,
    color: Colors.text.light,
    fontWeight: '500',
  },
  section: {
    backgroundColor: Colors.background.card,
    margin: 16,
    marginTop: 8,
    borderRadius: 16,
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginLeft: 12,
  },
  investorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    marginBottom: 12,
  },
  rankBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.text.light,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  topThreeRank: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  goldRank: {
    backgroundColor: '#FFD700',
  },
  silverRank: {
    backgroundColor: '#C0C0C0',
  },
  bronzeRank: {
    backgroundColor: '#CD7F32',
  },
  rankText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text.white,
  },
  topThreeRankText: {
    color: Colors.text.dark,
  },
  sponsorLogo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 12,
    backgroundColor: Colors.text.white,
    borderRadius: 8,
    padding: 4,
  },
  investorAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  investorInfo: {
    flex: 1,
  },
  investorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text.dark,
    marginBottom: 4,
  },
  investorType: {
    fontSize: 14,
    color: Colors.text.light,
  },
  investorAmount: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.accent.green,
    marginBottom: 4,
  },
  sponsorBadge: {
    backgroundColor: Colors.primary.orange,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  sponsorBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: Colors.text.white,
  },
  topInvestorBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  goldBadge: {
    backgroundColor: '#FFD700',
  },
  silverBadge: {
    backgroundColor: '#C0C0C0',
  },
  bronzeBadge: {
    backgroundColor: '#CD7F32',
  },
  topInvestorBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: Colors.text.dark,
  },
  errorText: {
    color: Colors.text.white,
    fontSize: 18,
    textAlign: 'center',
    marginTop: 100,
  },
});