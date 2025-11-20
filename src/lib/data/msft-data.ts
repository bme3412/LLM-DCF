import { Segment, YearProjection, DCFModel, MarketData, Scenarios, Recommendation } from '@/types';

export const segments: Segment[] = [
  {
    name: 'Productivity',
    fy2025Revenue: 120.8,
    fy2024Revenue: 107.0,
    growthRate: 0.13,
    operatingMargin: 0.55,
    percentOfTotal: 42.9,
    components: [
      { name: 'Office Commercial', revenue: 60, growthRate: 0.13 },
      { name: 'Office Consumer', revenue: 8, growthRate: 0.05 },
      { name: 'LinkedIn', revenue: 20, growthRate: 0.10 },
      { name: 'Dynamics 365', revenue: 33, growthRate: 0.16 }
    ],
    growthDrivers: [
      'Copilot AI Integration ($30/user/month)',
      'E5 Suite Upselling',
      'Dynamics Digital Transformation',
      'LinkedIn B2B Growth'
    ],
    challenges: [
      'Competition from Google Workspace',
      'Copilot ROI questions',
      'LinkedIn growth deceleration'
    ]
  },
  {
    name: 'Intelligent Cloud',
    fy2025Revenue: 106.3,
    fy2024Revenue: 87.9,
    growthRate: 0.21,
    operatingMargin: 0.40,
    percentOfTotal: 37.7,
    components: [
      { name: 'Azure & Cloud Services', revenue: 75, growthRate: 0.33 },
      { name: 'Server Products', revenue: 20, growthRate: -0.03 },
      { name: 'GitHub', revenue: 3, growthRate: 0.25 },
      { name: 'Nuance', revenue: 3, growthRate: 0.12 },
      { name: 'Enterprise Services', revenue: 5, growthRate: 0.02 }
    ],
    growthDrivers: [
      'Azure AI Infrastructure (12-16 pts growth)',
      'OpenAI Exclusive Partnership',
      'Azure OpenAI Service (60% Fortune 500)',
      'Microsoft Fabric & Data Platform'
    ],
    challenges: [
      'Capex Intensity ($80B+ annually)',
      'Margin Pressure (69% gross margin)',
      'AWS Competition',
      'GPU Supply Constraints'
    ]
  },
  {
    name: 'Personal Computing',
    fy2025Revenue: 54.6,
    fy2024Revenue: 51.0,
    growthRate: 0.07,
    operatingMargin: 0.35,
    percentOfTotal: 19.4,
    components: [
      { name: 'Windows OEM', revenue: 14, growthRate: 0.00 },
      { name: 'Windows Commercial', revenue: 10, growthRate: 0.06 },
      { name: 'Search & News Ads', revenue: 13, growthRate: 0.18 },
      { name: 'Gaming', revenue: 21, growthRate: 0.05 },
      { name: 'Devices', revenue: 6, growthRate: -0.05 }
    ],
    growthDrivers: [
      'Bing AI with ChatGPT',
      'Gaming Platform Strategy',
      'Activision Integration',
      'Windows 11 AI Features'
    ],
    challenges: [
      'PC Market Maturity',
      'Xbox Hardware Losses',
      'Google Search Dominance',
      'ABK Antitrust Risk'
    ]
  }
];

export const projections: YearProjection[] = [
  { year: 2026, productivity: 137, intelligentCloud: 132, personalComputing: 59, totalRevenue: 328, fcfMargin: 0.255, fcf: 83.6, discountFactor: 0.918, presentValue: 76.7 },
  { year: 2027, productivity: 154, intelligentCloud: 163, personalComputing: 64, totalRevenue: 381, fcfMargin: 0.255, fcf: 97.2, discountFactor: 0.843, presentValue: 81.9 },
  { year: 2028, productivity: 171, intelligentCloud: 199, personalComputing: 68, totalRevenue: 438, fcfMargin: 0.260, fcf: 113.9, discountFactor: 0.774, presentValue: 88.2 },
  { year: 2029, productivity: 188, intelligentCloud: 238, personalComputing: 72, totalRevenue: 498, fcfMargin: 0.265, fcf: 132.0, discountFactor: 0.711, presentValue: 93.9 },
  { year: 2030, productivity: 204, intelligentCloud: 279, personalComputing: 75, totalRevenue: 558, fcfMargin: 0.270, fcf: 150.7, discountFactor: 0.653, presentValue: 98.4 },
  { year: 2031, productivity: 219, intelligentCloud: 321, personalComputing: 78, totalRevenue: 618, fcfMargin: 0.270, fcf: 166.9, discountFactor: 0.599, presentValue: 100.0 },
  { year: 2032, productivity: 234, intelligentCloud: 369, personalComputing: 81, totalRevenue: 684, fcfMargin: 0.270, fcf: 184.7, discountFactor: 0.550, presentValue: 101.6 },
  { year: 2033, productivity: 249, intelligentCloud: 421, personalComputing: 84, totalRevenue: 754, fcfMargin: 0.270, fcf: 203.6, discountFactor: 0.505, presentValue: 102.8 },
  { year: 2034, productivity: 265, intelligentCloud: 477, personalComputing: 87, totalRevenue: 829, fcfMargin: 0.270, fcf: 223.8, discountFactor: 0.464, presentValue: 103.8 },
  { year: 2035, productivity: 281, intelligentCloud: 536, personalComputing: 90, totalRevenue: 907, fcfMargin: 0.270, fcf: 244.9, discountFactor: 0.426, presentValue: 104.3 }
];

export const baseCaseDCF: DCFModel = {
  projections: projections,
  wacc: 0.089,
  terminalGrowth: 0.035,
  terminalValue: 4694,
  pvTerminalValue: 2000,
  enterpriseValue: 2952,
  cash: 80,
  debt: 75,
  equityValue: 2957,
  sharesOutstanding: 7.43,
  fairValuePerShare: 398
};

export const marketData: MarketData = {
  currentPrice: 494,
  marketCap: 3670,
  sharesOutstanding: 7.43,
  dateUpdated: '2025-11-19'
};

export const scenarios: Scenarios = {
  bull: {
    azureAIGrowth: 0.60,
    copilotPenetration: 0.60,
    cloudMarginPeak: 0.75,
    terminalGrowth: 0.04,
    fairValue: 520
  },
  base: {
    azureAIGrowth: 0.40,
    copilotPenetration: 0.40,
    cloudMarginPeak: 0.72,
    terminalGrowth: 0.035,
    fairValue: 398
  },
  bear: {
    azureAIGrowth: 0.25,
    copilotPenetration: 0.20,
    cloudMarginPeak: 0.65,
    terminalGrowth: 0.03,
    fairValue: 300
  }
};

export const recommendation: Recommendation = {
  rating: 'HOLD',
  targetPrice: 398,
  upside: -0.19,
  suggestedEntry: [420, 450],
  catalysts: {
    positive: [
      'Azure AI capacity additions exceed expectations',
      'Copilot adoption accelerates (>40% penetration)',
      'Cloud margins recover to 72%+ faster than expected',
      'Bing AI gains meaningful search share (>5%)',
      'Gaming synergies exceed $1B annually'
    ],
    negative: [
      'AI monetization disappoints / ROI unclear',
      'AWS/Google gain cloud market share',
      'Regulatory action on Activision or AI',
      'Capex cycle extends, margins compressed longer',
      'Enterprise IT spending slowdown / recession'
    ]
  }
};

export const colors = {
  // Segments
  productivity: '#0078D4', // Microsoft Blue
  intelligentCloud: '#10B981', // Green
  personalComputing: '#8B5CF6', // Purple
  
  // Ratings
  buy: '#10B981',
  hold: '#F59E0B',
  sell: '#EF4444',
  
  // Valuation indicators
  overvalued: '#EF4444',
  fairValue: '#F59E0B',
  undervalued: '#10B981',
  
  // Chart colors
  revenue: '#3B82F6',
  fcf: '#10B981',
  margin: '#8B5CF6'
};

