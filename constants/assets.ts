export type AssetType = 'equity' | 'debenture' | 'income' | 'coming_soon';

export interface Asset {
  id: string;
  name: string;
  type: AssetType;
  logo: string;
  shares?: number;
  collectorLevel?: string;
  performance?: number;
  pricePerShare?: number | string;
  totalRaise?: string;
  progress?: number;
  remaining?: number | string;
  description?: string;
  backgroundColor?: string;
  // New fields for redesigned cards
  status?: string;
  raiseAmount?: string;
  minimumEntry?: string;
  comingSoonTimer?: string;
  // New fields for detailed asset pages
  valuation?: string;
  equityPercentage?: string;
  investorReturn?: string;
  remainingAmount?: string;
  // Coming soon investment terms
  totalRaiseAmount?: string;
  expectedReturn?: string;
  // New fields for funding progress
  raisedAmount?: string;
  goalAmount?: string;
  investorCount?: number;
  growthPercentage?: number;
  dividendPotential?: string;
  timelineInfo?: string;
}

export const userAssets: Asset[] = [
  {
    id: 'liverpool',
    name: 'Liverpool FC',
    type: 'equity',
    logo: 'https://r2-pub.rork.com/attachments/4y28f2dzw4kzvdoid8e8b',
    status: 'LIVE NOW',
    raiseAmount: '£40,000,000 Equity Raise',
    minimumEntry: '£500',
    pricePerShare: 500,
    backgroundColor: '#FFFFFF',
    shares: 50,
    performance: 15.5,
    // Detailed page info
    valuation: '£4,000,000,000',
    equityPercentage: '1%',
    progress: 75,
    remainingAmount: '£10,000,000',
    // Funding progress info
    raisedAmount: '£30,000,000',
    goalAmount: '£40,000,000',
    investorCount: 10250,
    growthPercentage: 24.5,
    dividendPotential: '4-8%',
    timelineInfo: '⏰ 5 days',
  },
  {
    id: 'mclaren',
    name: 'McLaren Racing',
    type: 'income',
    logo: 'https://logos-world.net/wp-content/uploads/2021/03/McLaren-Logo.png',
    status: 'LIVE NOW',
    raiseAmount: '£50,000,000 ISA',
    minimumEntry: '£1,000',
    pricePerShare: 1000,
    totalRaise: '£50,000,000 for 10% of sponsorship revenues',
    backgroundColor: '#FF8700',
    shares: 200,
    performance: 22.3,
    // Detailed page info
    investorReturn: '10% of future sponsorship revenues over 5 year income sharing agreement',
    progress: 70,
    remainingAmount: '£15,000,000',
    // Funding progress info
    raisedAmount: '£35,000,000',
    goalAmount: '£50,000,000',
    investorCount: 8750,
    growthPercentage: 18.2,
    dividendPotential: '6-12%',
    timelineInfo: '⏰ 2 weeks',
  },
  {
    id: 'rydercup',
    name: 'Ryder Cup',
    type: 'debenture',
    logo: 'https://r2-pub.rork.com/attachments/t18y87ryxfb9d44snw5co',
    status: 'LIVE NOW',
    raiseAmount: '£42,500,000 Debenture Programme',
    minimumEntry: '£5,000',
    pricePerShare: 5000,
    progress: 90,
    remaining: '260 debentures',
    backgroundColor: '#1f4e79',
    shares: 1,
    performance: 18.7,
    // Detailed page info
    investorReturn: '5% annual interest on 40% of principal repaid over 6 year debenture programme',
    // Funding progress info
    raisedAmount: '£38,250,000',
    goalAmount: '£42,500,000',
    investorCount: 2340,
    growthPercentage: 15.8,
    dividendPotential: '5% + Principal',
    timelineInfo: '⏰ 48 hours',
  },
];

export const comingSoonAssets: Asset[] = [
  {
    id: 'ohio',
    name: 'Ohio State',
    type: 'coming_soon',
    logo: 'https://r2-pub.rork.com/attachments/s8drp4vaj43jtz224meuc',
    description: 'Fund Their World Class Stadium',
    comingSoonTimer: '1 day',
    backgroundColor: '#CC0000',
    totalRaiseAmount: '£80,000,000',
    expectedReturn: 'Potential 8% annual dividends from stadium revenues',
    minimumEntry: '£2,500',
    timelineInfo: '⏰ 1 day',
  },
  {
    id: 'cardiff',
    name: 'Cardiff City',
    type: 'coming_soon',
    logo: 'https://r2-pub.rork.com/attachments/8so1xr6ysxbn884qmbsko',
    description: "Back the Bluebirds' Future",
    comingSoonTimer: '2 weeks',
    backgroundColor: '#003D82',
    totalRaiseAmount: '£4,000,000',
    expectedReturn: 'Potential 12% annual dividends from club profits',
    minimumEntry: '£1,000',
    timelineInfo: '⏰ 2 weeks',
  },
  {
    id: 'hexagon',
    name: 'Hexagon Fan Team',
    type: 'coming_soon',
    logo: 'https://r2-pub.rork.com/attachments/irt9tqsh4mneg7hnm4aoo',
    description: 'Own 75% of the team',
    comingSoonTimer: '3 weeks',
    backgroundColor: '#7C3AED',
    totalRaiseAmount: '£1,250,000',
    expectedReturn: 'Potential 15% annual returns from tournament winnings',
    minimumEntry: '£500',
    timelineInfo: '⏰ 3 weeks',
  },
];

export const completedAssets: Asset[] = [
  {
    id: 'exeter-chiefs',
    name: 'Exeter Chiefs',
    type: 'equity',
    logo: 'https://r2-pub.rork.com/attachments/vgynqzajb5sdgj062fehn',
    status: 'SOLD OUT',
    raiseAmount: '£5,000,000',
    minimumEntry: '£500',
    pricePerShare: 500,
    backgroundColor: '#F59E0B',
    valuation: '£50,000,000',
    equityPercentage: '10%',
    progress: 100,
    remaining: 'Completed',
    raisedAmount: '£5,000,000',
    goalAmount: '£5,000,000',
    investorCount: 2850,
    growthPercentage: 28.5,
    dividendPotential: '5% + 6% dividends',
    description: 'Sold out in 72 hours',
    timelineInfo: 'Completed',
  },
  {
    id: 'british-cycling',
    name: 'British Cycling',
    type: 'debenture',
    logo: 'https://r2-pub.rork.com/attachments/k8vc0htdz7zjsyloqf0il',
    status: 'SOLD OUT',
    raiseAmount: '£10,000,000',
    minimumEntry: '£1,000',
    pricePerShare: 1000,
    backgroundColor: '#FFFFFF',
    investorReturn: '6% interest on 40% of capital invested, repaid after 5 years. 5 year debenture programme.',
    progress: 100,
    remaining: 'Completed',
    raisedAmount: '£10,000,000',
    goalAmount: '£10,000,000',
    investorCount: 4200,
    growthPercentage: 22.8,
    dividendPotential: '6% + Principal',
    description: 'Sold out in 1 week',
    timelineInfo: 'Completed',
  },
  {
    id: 'ultimate-frisbee',
    name: 'Ultimate Frisbee Association',
    type: 'equity',
    logo: 'https://r2-pub.rork.com/attachments/cvee64u70ztlq0267gjhb',
    status: 'SOLD OUT',
    raiseAmount: '£8,000,000',
    minimumEntry: '£250',
    pricePerShare: 250,
    backgroundColor: '#DC2626',
    valuation: '£18,000,000',
    equityPercentage: '44.4%',
    progress: 100,
    remaining: 'Completed',
    raisedAmount: '£8,000,000',
    goalAmount: '£8,000,000',
    investorCount: 6800,
    growthPercentage: 35.2,
    dividendPotential: '5% + 8% dividends',
    description: 'Sold out in 2 weeks',
    timelineInfo: 'Completed',
  },
];