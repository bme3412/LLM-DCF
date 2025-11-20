export interface Segment {
  name: 'Productivity' | 'Intelligent Cloud' | 'Personal Computing';
  fy2025Revenue: number;
  fy2024Revenue: number;
  growthRate: number;
  operatingMargin: number;
  percentOfTotal: number;
  components: Component[];
  growthDrivers: string[];
  challenges: string[];
}

export interface Component {
  name: string;
  revenue: number;
  growthRate: number;
  description?: string; // Made optional as it wasn't in the data sample but was in the interface definition
}

export interface YearProjection {
  year: number;
  productivity: number;
  intelligentCloud: number;
  personalComputing: number;
  totalRevenue: number;
  fcfMargin: number;
  fcf: number;
  discountFactor: number;
  presentValue: number;
}

export interface DCFModel {
  projections: YearProjection[];
  wacc: number;
  terminalGrowth: number;
  terminalValue: number;
  pvTerminalValue: number;
  enterpriseValue: number;
  cash: number;
  debt: number;
  equityValue: number;
  sharesOutstanding: number;
  fairValuePerShare: number;
}

export interface ScenarioAssumptions {
  azureAIGrowth: number;
  copilotPenetration: number;
  cloudMarginPeak: number;
  terminalGrowth: number;
  fairValue: number;
}

export interface Scenarios {
  bull: ScenarioAssumptions;
  base: ScenarioAssumptions;
  bear: ScenarioAssumptions;
}

export interface MarketData {
  currentPrice: number;
  marketCap: number;
  sharesOutstanding: number;
  dateUpdated: string;
}

export interface Recommendation {
  rating: 'BUY' | 'HOLD' | 'SELL';
  targetPrice: number;
  upside: number;
  suggestedEntry: [number, number]; // range
  catalysts: {
    positive: string[];
    negative: string[];
  };
}

