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
  },
  {
    id: 'mclaren',
    name: 'McLaren Racing',
    type: 'income',
    logo: 'https://r2-pub.rork.com/attachments/40293v65wbvdp8siu5o10',
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
    progress: 60,
    remainingAmount: '£20,000,000',
    // Funding progress info
    raisedAmount: '£30,000,000',
    goalAmount: '£50,000,000',
    investorCount: 8750,
    growthPercentage: 18.2,
    dividendPotential: '6-12%',
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
    investorCount: 7650,
    growthPercentage: 15.8,
    dividendPotential: '5% + Principal',
  },
];

export const comingSoonAssets: Asset[] = [
  {
    id: 'ohio',
    name: 'Ohio State',
    type: 'coming_soon',
    logo: 'https://r2-pub.rork.com/attachments/s8drp4vaj43jtz224meuc',
    description: 'Help fund their new stadium',
    comingSoonTimer: '1 day',
    backgroundColor: '#BB0000',
    totalRaiseAmount: '£80,000,000',
    expectedReturn: 'Potential 8% annual dividends from stadium revenues',
    minimumEntry: '£2,500',
  },
  {
    id: 'cardiff',
    name: 'Cardiff City',
    type: 'coming_soon',
    logo: 'https://r2-pub.rork.com/attachments/8so1xr6ysxbn884qmbsko',
    description: 'Equity investment for 10%',
    comingSoonTimer: '2 weeks',
    backgroundColor: '#0070B5',
    totalRaiseAmount: '£4,000,000',
    expectedReturn: 'Potential 12% annual dividends from club profits',
    minimumEntry: '£1,000',
  },
  {
    id: 'hexagon',
    name: 'Hexagon Fan Team',
    type: 'coming_soon',
    logo: 'https://r2-pub.rork.com/attachments/irt9tqsh4mneg7hnm4aoo',
    description: 'Own 75% of the Fan Team',
    comingSoonTimer: '3 weeks',
    backgroundColor: '#6B46C1',
    totalRaiseAmount: '£1,250,000',
    expectedReturn: 'Potential 15% annual returns from tournament winnings',
    minimumEntry: '£500',
  },
];