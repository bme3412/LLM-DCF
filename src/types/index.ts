export interface Component {
  name: string;
  revenue: number;
  growthRate: number;
  description?: string;
}

export interface Segment {
  id: string;
  name: string;
  fy2025Revenue: number;
  fy2024Revenue: number;
  growthRate: number;
  operatingMargin: number;
  percentOfTotal: number;
  components: Component[];
  growthDrivers: string[];
  challenges: string[];
  color?: string;
}

export interface YearProjection {
  year: number;
  segmentRevenue: Record<string, number>;
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

export interface ScenarioMetric {
  label: string;
  value: string;
}

export interface ScenarioCase {
  fairValue: number;
  metrics: ScenarioMetric[];
  narrative?: string;
}

export interface Scenarios {
  bull: ScenarioCase;
  base: ScenarioCase;
  bear: ScenarioCase;
}

export interface MarketData {
  currentPrice: number;
  marketCap: number;
  sharesOutstanding: number;
  dateUpdated: string;
}

export interface Recommendation {
  rating: 'BUY' | 'HOLD' | 'SELL' | 'OUTPERFORM';
  targetPrice: number;
  upside: number;
  suggestedEntry: [number, number];
  catalysts: {
    positive: string[];
    negative: string[];
  };
}

export interface TranscriptMetric {
  label: string;
  value: string;
}

export interface TranscriptTimeSeriesPoint {
  period: string;
  value: string;
}

export interface TranscriptInsight {
  segmentId: string;
  component: string;
  summary: string;
  metrics: TranscriptMetric[];
  timeSeries?: TranscriptTimeSeriesPoint[];
  source?: string;
}

export interface CompanyTheme {
  iconLetter: string;
  primaryColor: string;
  accentColor: string;
  segmentColors?: Record<string, string>;
}

export interface CompanyModel {
  symbol: string;
  name: string;
  description?: string;
  segments: Segment[];
  baseCaseDCF: DCFModel;
  marketData: MarketData;
  recommendation: Recommendation;
  transcriptInsights: TranscriptInsight[];
  theme: CompanyTheme;
  scenarios?: Scenarios;
}
