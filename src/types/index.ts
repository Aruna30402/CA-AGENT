export interface ProductInput {
  productName?: string;
  productUrl?: string;
  productDescription?: string;
  marketSegment: 'b2b' | 'b2c' | 'not_sure';
}

export interface Competitor {
  id: string;
  name: string;
  url: string;
  logo?: string;
  description: string;
  pricing: {
    model: string;
    startingPrice: string;
    currency: string;
  };
  keyInfo: {
    founded: string;
    employees: string;
    funding: string;
    headquarters: string;
  };
  marketShare?: string;
  isCustom?: boolean;
}

export interface SwotAnalysis {
  competitorId: string;
  strengths: SwotPoint[];
  weaknesses: SwotPoint[];
  opportunities: SwotPoint[];
  threats: SwotPoint[];
}

export interface SwotPoint {
  point: string;
  evidence: string;
  impact: 'high' | 'medium' | 'low';
}

export interface FeatureComparison {
  feature: string;
  yourProduct: string | boolean;
  competitors: Record<string, string | boolean>;
}

export interface Enhancement {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  effort: 'low' | 'medium' | 'high';
  impact: 'high' | 'medium' | 'low';
  basedOn: string[];
  category: string;
}

export interface NotificationRule {
  id: string;
  type: 'pricing' | 'features' | 'releases' | 'funding' | 'partnerships';
  enabled: boolean;
  competitors: string[];
}

export interface WeeklyDigest {
  week: string;
  updates: CompetitorUpdate[];
}

export interface CompetitorUpdate {
  competitorId: string;
  type: 'pricing' | 'feature' | 'release' | 'funding' | 'partnership';
  title: string;
  description: string;
  date: string;
  url?: string;
}