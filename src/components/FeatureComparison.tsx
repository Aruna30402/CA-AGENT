import React, { useEffect, useState } from 'react';
import { Check, X, Minus, Filter, Download } from 'lucide-react';
import { ProductInput, Competitor } from '../types';
import { extractFeaturesFromUrl } from '../utils/competitorAnalysis';

interface FeatureComparisonProps {
  productInput: ProductInput;
  competitors: Competitor[];
}

const FEATURE_CATEGORIES = {
  'Core Communication': [
    'Real-time messaging',
    'Video conferencing (max participants)',
    'Voice calls & channels',
    'Screen sharing',
    'File sharing & storage',
    'Message threading',
    'Direct messaging',
    'Group messaging',
  ],
  'Collaboration Features': [
    'Channel organization',
    'Workspace management',
    'Message reactions & emoji',
    'Message editing & deletion',
    'Message search functionality',
    'Mentions & notifications',
    'Status indicators',
    'Presence awareness',
  ],
  'Advanced Features': [
    'Workflow automation',
    'Custom bots & apps',
    'API access',
    'Webhook support',
    'Custom integrations',
    'Advanced admin controls',
    'Analytics & reporting',
    'Message scheduling',
  ],
  'Enterprise & Security': [
    'Single Sign-On (SSO)',
    'Two-factor authentication',
    'Enterprise key management',
    'Compliance certifications',
    'Data loss prevention',
    'Audit logs',
    'Guest access controls',
    'Data retention policies',
  ],
  'Platform & Performance': [
    'Mobile app quality',
    'Desktop app availability',
    'Web app performance',
    'Offline functionality',
    'Multi-device sync',
    'Load time performance',
    'Uptime reliability',
    'Large team support (1000+ users)',
  ],
  'Integrations & Ecosystem': [
    'Third-party app marketplace',
    'CRM integrations',
    'Project management tools',
    'Calendar integrations',
    'Email integrations',
    'Development tools (GitHub, Jira)',
    'Google Workspace integration',
    'Microsoft 365 integration',
  ],
  'Pricing & Business': [
    'Free tier available',
    'Transparent pricing',
    'Per-user pricing model',
    'Enterprise pricing flexibility',
    'Annual discount options',
    'Non-profit pricing',
    'Educational discounts',
    'Usage-based billing',
  ]
};

const ALL_FEATURES = Object.values(FEATURE_CATEGORIES).flat();

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
    'Core Communication': 'Core Communication',
    'Collaboration Features': 'Collaboration Features',
    'Advanced Features': 'Advanced Features',
    'Enterprise & Security': 'Enterprise & Security',
    'Platform & Performance': 'Platform & Performance',
    'Integrations & Ecosystem': 'Integrations & Ecosystem',
    'Pricing & Business': 'Pricing & Business'
  };

  const getCategoryForFeature = (feature: string): string => {
    for (const [category, features] of Object.entries(FEATURE_CATEGORIES)) {
      if (features.includes(feature)) {
        return category;
      }
    }
    return 'all';
  };

  const filteredFeatures = selectedCategories.has('all') 
    ? ALL_FEATURES 
    : ALL_FEATURES.filter(f => Array.from(selectedCategories).some(cat => getCategoryForFeature(f) === cat));

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
    // Simulate realistic feature availability for user's product
    const featureMap: Record<string, boolean> = {
      'Real-time messaging': true,
      'Video conferencing (max participants)': true,
      'Voice calls & channels': true,
      'Screen sharing': true,
      'File sharing & storage': true,
      'Message threading': true,
      'Direct messaging': true,
      'Group messaging': true,
      'Channel organization': true,
      'Workspace management': true,
      'Message reactions & emoji': true,
      'Message editing & deletion': true,
      'Message search functionality': false,
      'Mentions & notifications': true,
      'Status indicators': true,
      'Presence awareness': true,
      'Workflow automation': false,
      'Custom bots & apps': false,
      'API access': true,
      'Webhook support': false,
      'Custom integrations': false,
      'Advanced admin controls': false,
      'Analytics & reporting': false,
      'Message scheduling': false,
      'Single Sign-On (SSO)': false,
      'Two-factor authentication': true,
      'Enterprise key management': false,
      'Compliance certifications': false,
      'Data loss prevention': false,
      'Audit logs': false,
      'Guest access controls': true,
      'Data retention policies': false,
      'Mobile app quality': true,
      'Desktop app availability': true,
      'Web app performance': true,
      'Offline functionality': false,
      'Multi-device sync': true,
      'Load time performance': true,
      'Uptime reliability': true,
      'Large team support (1000+ users)': false,
      'Third-party app marketplace': false,
      'CRM integrations': false,
      'Project management tools': true,
      'Calendar integrations': true,
      'Email integrations': true,
      'Development tools (GitHub, Jira)': false,
      'Google Workspace integration': true,
      'Microsoft 365 integration': false,
      'Free tier available': true,
      'Transparent pricing': true,
      'Per-user pricing model': true,
      'Enterprise pricing flexibility': false,
      'Annual discount options': true,
      'Non-profit pricing': false,
      'Educational discounts': false,
      'Usage-based billing': false,
    };
    return featureMap[feature] ?? false;
  };

  // Helper to get feature value for competitors (randomly assign for demo)
  const getCompetitorFeatureValue = (competitorId: string, feature: string) => {
    // Simulate realistic competitor feature sets
    const competitorFeatures: Record<string, Record<string, boolean>> = {
      'slack': {
        'Real-time messaging': true,
        'Video conferencing (max participants)': true,
        'Voice calls & channels': true,
        'Screen sharing': true,
        'File sharing & storage': true,
        'Message threading': true,
        'Direct messaging': true,
        'Group messaging': true,
        'Channel organization': true,
        'Workspace management': true,
        'Message reactions & emoji': true,
        'Message editing & deletion': true,
        'Message search functionality': true,
        'Mentions & notifications': true,
        'Status indicators': true,
        'Presence awareness': true,
        'Workflow automation': true,
        'Custom bots & apps': true,
        'API access': true,
        'Webhook support': true,
        'Custom integrations': true,
        'Advanced admin controls': true,
        'Analytics & reporting': true,
        'Message scheduling': true,
        'Single Sign-On (SSO)': true,
        'Two-factor authentication': true,
        'Enterprise key management': true,
        'Compliance certifications': true,
        'Data loss prevention': true,
        'Audit logs': true,
        'Guest access controls': true,
        'Data retention policies': true,
        'Mobile app quality': true,
        'Desktop app availability': true,
        'Web app performance': true,
        'Offline functionality': false,
        'Multi-device sync': true,
        'Load time performance': true,
        'Uptime reliability': true,
        'Large team support (1000+ users)': true,
        'Third-party app marketplace': true,
        'CRM integrations': true,
        'Project management tools': true,
        'Calendar integrations': true,
        'Email integrations': true,
        'Development tools (GitHub, Jira)': true,
        'Google Workspace integration': true,
        'Microsoft 365 integration': false,
        'Free tier available': true,
        'Transparent pricing': true,
        'Per-user pricing model': true,
        'Enterprise pricing flexibility': true,
        'Annual discount options': true,
        'Non-profit pricing': true,
        'Educational discounts': true,
        'Usage-based billing': false,
      },
      'microsoft-teams': {
        'Real-time messaging': true,
        'Video conferencing (max participants)': true,
        'Voice calls & channels': true,
        'Screen sharing': true,
        'File sharing & storage': true,
        'Message threading': true,
        'Direct messaging': true,
        'Group messaging': true,
        'Channel organization': true,
        'Workspace management': true,
        'Message reactions & emoji': true,
        'Message editing & deletion': true,
        'Message search functionality': true,
        'Mentions & notifications': true,
        'Status indicators': true,
        'Presence awareness': true,
        'Workflow automation': true,
        'Custom bots & apps': true,
        'API access': true,
        'Webhook support': true,
        'Custom integrations': true,
        'Advanced admin controls': true,
        'Analytics & reporting': true,
        'Message scheduling': false,
        'Single Sign-On (SSO)': true,
        'Two-factor authentication': true,
        'Enterprise key management': true,
        'Compliance certifications': true,
        'Data loss prevention': true,
        'Audit logs': true,
        'Guest access controls': true,
        'Data retention policies': true,
        'Mobile app quality': true,
        'Desktop app availability': true,
        'Web app performance': true,
        'Offline functionality': true,
        'Multi-device sync': true,
        'Load time performance': false,
        'Uptime reliability': true,
        'Large team support (1000+ users)': true,
        'Third-party app marketplace': false,
        'CRM integrations': true,
        'Project management tools': true,
        'Calendar integrations': true,
        'Email integrations': true,
        'Development tools (GitHub, Jira)': true,
        'Google Workspace integration': false,
        'Microsoft 365 integration': true,
        'Free tier available': true,
        'Transparent pricing': true,
        'Per-user pricing model': true,
        'Enterprise pricing flexibility': true,
        'Annual discount options': true,
        'Non-profit pricing': true,
        'Educational discounts': true,
        'Usage-based billing': false,
      }
    };
    
    // Default feature set for other competitors
    const defaultFeatures: Record<string, boolean> = {
      'Real-time messaging': true,
      'Video conferencing (max participants)': Math.random() > 0.2,
      'Voice calls & channels': Math.random() > 0.3,
      'Screen sharing': Math.random() > 0.2,
      'File sharing & storage': Math.random() > 0.1,
      'Message threading': Math.random() > 0.4,
      'Direct messaging': true,
      'Group messaging': true,
      'Channel organization': Math.random() > 0.3,
      'Workspace management': Math.random() > 0.4,
      'Message reactions & emoji': Math.random() > 0.3,
      'Message editing & deletion': Math.random() > 0.2,
      'Message search functionality': Math.random() > 0.4,
      'Mentions & notifications': Math.random() > 0.2,
      'Status indicators': Math.random() > 0.3,
      'Presence awareness': Math.random() > 0.3,
      'Workflow automation': Math.random() > 0.6,
      'Custom bots & apps': Math.random() > 0.5,
      'API access': Math.random() > 0.3,
      'Webhook support': Math.random() > 0.4,
      'Custom integrations': Math.random() > 0.4,
      'Advanced admin controls': Math.random() > 0.5,
      'Analytics & reporting': Math.random() > 0.6,
      'Message scheduling': Math.random() > 0.7,
      'Single Sign-On (SSO)': Math.random() > 0.4,
      'Two-factor authentication': Math.random() > 0.3,
      'Enterprise key management': Math.random() > 0.6,
      'Compliance certifications': Math.random() > 0.5,
      'Data loss prevention': Math.random() > 0.6,
      'Audit logs': Math.random() > 0.5,
      'Guest access controls': Math.random() > 0.4,
      'Data retention policies': Math.random() > 0.5,
      'Mobile app quality': Math.random() > 0.3,
      'Desktop app availability': Math.random() > 0.2,
      'Web app performance': Math.random() > 0.3,
      'Offline functionality': Math.random() > 0.7,
      'Multi-device sync': Math.random() > 0.3,
      'Load time performance': Math.random() > 0.4,
      'Uptime reliability': Math.random() > 0.2,
      'Large team support (1000+ users)': Math.random() > 0.4,
      'Third-party app marketplace': Math.random() > 0.6,
      'CRM integrations': Math.random() > 0.4,
      'Project management tools': Math.random() > 0.3,
      'Calendar integrations': Math.random() > 0.3,
      'Email integrations': Math.random() > 0.4,
      'Development tools (GitHub, Jira)': Math.random() > 0.4,
      'Google Workspace integration': Math.random() > 0.5,
      'Microsoft 365 integration': Math.random() > 0.6,
      'Free tier available': Math.random() > 0.4,
      'Transparent pricing': Math.random() > 0.3,
      'Per-user pricing model': Math.random() > 0.2,
      'Enterprise pricing flexibility': Math.random() > 0.5,
      'Annual discount options': Math.random() > 0.3,
      'Non-profit pricing': Math.random() > 0.6,
      'Educational discounts': Math.random() > 0.5,
      'Usage-based billing': Math.random() > 0.7,
    };
    
    return competitorFeatures[competitorId]?.[feature] ?? defaultFeatures[feature] ?? false;
  };

  const getFilteredFeatures = () => {
    if (selectedCategories.has('all')) {
      return FEATURE_CATEGORIES;
    }
    
    const filtered: Record<string, string[]> = {};
    for (const category of selectedCategories) {
      if (FEATURE_CATEGORIES[category]) {
        filtered[category] = FEATURE_CATEGORIES[category];
      }
    }
    return filtered;
  };

  const filteredFeatureCategories = getFilteredFeatures();
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
          <table className="w-full min-w-[1000px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 w-80">
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
              {Object.entries(filteredFeatureCategories).map(([category, features]) => (
                <React.Fragment key={category}>
                  <tr className="bg-gray-100">
                    <td colSpan={selectedCompetitors.length + 2} className="px-6 py-3 text-sm font-bold text-gray-900 uppercase tracking-wide">
                      {category}
                    </td>
                  </tr>
                  {features.map((feature) => (
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
                </React.Fragment>
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