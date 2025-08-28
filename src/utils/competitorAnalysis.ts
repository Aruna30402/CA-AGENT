import { Competitor, SwotAnalysis, SwotPoint } from '../types';

// Mock: Fetch SWOT analysis for a competitor (replace with real API/scraping)
export async function fetchSwotAnalysis(competitor: Competitor): Promise<SwotAnalysis> {
  // Example mock data
  const mockPoint = (type: string): SwotPoint => ({
    point: `${type} for ${competitor.name}`,
    impact: 'medium',
    evidence: `Evidence for ${type} of ${competitor.name}`,
  });

  return {
    strengths: [mockPoint('Strength')],
    weaknesses: [mockPoint('Weakness')],
    opportunities: [mockPoint('Opportunity')],
    threats: [mockPoint('Threat')],
  };
}

// Mock: Extract features from competitor URL (replace with real scraping/API)
export async function extractFeaturesFromUrl(url: string): Promise<string[]> {
  // Example mock features
  return [
    `Feature 1 from ${url}`,
    `Feature 2 from ${url}`,
  ];
}