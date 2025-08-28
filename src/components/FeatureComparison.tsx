import React, { useEffect, useState } from 'react';
import { Check, X, Minus, Filter, Download } from 'lucide-react';
import { ProductInput, Competitor } from '../types';
import { extractFeaturesFromUrl } from '../utils/competitorAnalysis';

interface FeatureComparisonProps {
  productInput: ProductInput;
  competitors: Competitor[];
}

const FEATURE_NAMES = [
  'Main functionalities',
  'Unique features',
  'Target customer',
  'ICP',
  'Usability',
  'Integrations',
  'Overall performance',
  'Pricing',
  'Data export options',
  'Geographic focus',
  'Partnerships (tech partners)',
];

export default function FeatureComparison({ productInput, competitors }: FeatureComparisonProps) {
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set(['all']));
  const [featureTable, setFeatureTable] = useState<Record<string, string[]>>({});

  useEffect(() => {
    async function loadFeatures() {
      const table: Record<string, string[]> = {};
      for (const competitor of competitors) {
        table[competitor.id] = await extractFeaturesFromUrl(competitor.url);
      }
      setFeatureTable(table);
    }
    if (competitors.length > 0) {
      loadFeatures();
    }
  }, [competitors]);

  // Collect all unique features
  const allFeatures = Array.from(
    new Set(Object.values(featureTable).flat())
  );

  const categories = {
    all: 'All Features',
    functionality: 'Main Functionalities',
    unique: 'Unique Features',
    target: 'Target Customer & ICP',
    usability: 'Usability',
    integrations: 'Integrations',
    performance: 'Performance',
    pricing: 'Pricing',
    export: 'Data Export',
    geographic: 'Geographic Focus',
    partnerships: 'Partnerships'
  };

  const getCategoryForFeature = (feature: string): string => {
    if (['Real-time messaging', 'Video conferencing', 'File sharing', 'Screen sharing'].includes(feature)) return 'functionality';
    if (['Channel organization', 'Workflow automation', 'Custom emoji/reactions', 'Voice channels'].includes(feature)) return 'unique';
    if (['Enterprise focus', 'SMB friendly', 'Gaming/Creative focus'].includes(feature)) return 'target';
    if (['Mobile app quality', 'Search functionality', 'Onboarding experience'].includes(feature)) return 'usability';
    if (['Third-party apps', 'API quality', 'Webhook support'].includes(feature)) return 'integrations';
    if (['Reliability uptime', 'Load time performance', 'Large group support'].includes(feature)) return 'performance';
    if (['Free tier available', 'Starting price', 'Enterprise pricing'].includes(feature)) return 'pricing';
    if (['Data export options', 'GDPR compliance', 'Data retention controls'].includes(feature)) return 'export';
    if (['Global availability', 'Multi-language support', 'Local data centers'].includes(feature)) return 'geographic';
    if (['Tech partnerships', 'Reseller network'].includes(feature)) return 'partnerships';
    return 'all';
  };

  const filteredFeatures = selectedCategories.has('all') 
    ? allFeatures 
    : allFeatures.filter(f => Array.from(selectedCategories).some(cat => getCategoryForFeature(f) === cat));

  const renderValue = (value: string | boolean) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="w-5 h-5 text-green-600 mx-auto" />
      ) : (
        <X className="w-5 h-5 text-red-500 mx-auto" />
      );
    }
    if (value === 'N/A' || value === '' || value === null) {
      return <Minus className="w-5 h-5 text-gray-400 mx-auto" />;
    }
    return <span className="text-sm font-medium">{value}</span>;
  };

  // Helper to get feature value for input product
  const getProductFeatureValue = (feature: string) => {
    // Example: use boolean fields from productInput, or fallback to random
    // You should map your actual productInput fields here
    return productInput?.[feature.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()] ?? Math.random() > 0.5;
  };

  // Helper to get feature value for competitors (randomly assign for demo)
  const getCompetitorFeatureValue = (competitorId: string, feature: string) => {
    // For demo, randomly assign true/false
    return Math.random() > 0.4;
  };

  const selectedCompetitors = competitors.slice(0, 5); // Limit to 5 for table width

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Feature Comparison</h2>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Download className="w-4 h-4" />
          <span>Export Table</span>
        </button>
      </div>

      {/* Category Filter */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex items-center space-x-4">
          <Filter className="w-5 h-5 text-gray-400" />
          <div className="flex flex-wrap gap-2">
            {Object.entries(categories).map(([key, label]) => (
              <button
                key={key}
                onClick={() => {
                  if (key === 'all') {
                    setSelectedCategories(new Set(['all']));
                  } else {
                    const newSelected = new Set(selectedCategories);
                    newSelected.delete('all');
                    if (newSelected.has(key)) {
                      newSelected.delete(key);
                      if (newSelected.size === 0) {
                        newSelected.add('all');
                      }
                    } else {
                      newSelected.add(key);
                    }
                    setSelectedCategories(newSelected);
                  }
                }}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedCategories.has(key) || (key !== 'all' && selectedCategories.has('all'))
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 w-64">
                  Feature
                </th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-blue-600 min-w-32">
                  {productInput.productName || 'Your Product'}
                </th>
                {selectedCompetitors.map((competitor) => (
                  <th key={competitor.id} className="px-4 py-3 text-center text-sm font-semibold text-gray-900 min-w-32">
                    {competitor.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {FEATURE_NAMES.map((feature) => (
                <tr key={feature} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {feature}
                  </td>
                  <td className="px-4 py-4 text-center bg-blue-50">
                    {getProductFeatureValue(feature) ? (
                      <Check className="w-5 h-5 text-green-600 mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-red-500 mx-auto" />
                    )}
                  </td>
                  {selectedCompetitors.map((competitor) => (
                    <td key={competitor.id} className="px-4 py-4 text-center">
                      {getCompetitorFeatureValue(competitor.id, feature) ? (
                        <Check className="w-5 h-5 text-green-600 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-red-500 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <Check className="h-5 w-5 text-blue-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              Feature Comparison Legend
            </h3>
            <div className="mt-2 text-sm text-blue-700">
              <p className="flex items-center space-x-4">
                <span className="flex items-center space-x-1">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Available</span>
                </span>
                <span className="flex items-center space-x-1">
                  <X className="w-4 h-4 text-red-500" />
                  <span>Not Available</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Minus className="w-4 h-4 text-gray-400" />
                  <span>Unknown/N/A</span>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}