import React, { useState } from 'react';
import { Lightbulb, TrendingUp, Clock, Zap, Target, ChevronRight, Star } from 'lucide-react';
import { ProductInput, Competitor, Enhancement } from '../types';

interface EnhancementSuggestionsProps {
  productInput: ProductInput;
  competitors: Competitor[];
}

export default function EnhancementSuggestions({ productInput, competitors }: EnhancementSuggestionsProps) {
  const [selectedPriority, setSelectedPriority] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'features' | 'performance' | 'pricing' | 'market'>('all');

  // Mock enhancement suggestions
  const enhancements: Enhancement[] = [
    {
      id: 'video-upgrade',
      title: 'Enhanced Video Conferencing Capabilities',
      description: 'Upgrade video conferencing to support up to 1,000 participants with advanced features like breakout rooms, whiteboarding, and AI-powered meeting transcription.',
      priority: 'high',
      effort: 'high',
      impact: 'high',
      basedOn: ['Microsoft Teams', 'Zoom'],
      category: 'features'
    },
    {
      id: 'automation-workflows',
      title: 'Advanced Workflow Automation',
      description: 'Implement sophisticated workflow automation similar to Slack\'s advanced capabilities, enabling custom triggers, actions, and integrations with external services.',
      priority: 'high',
      effort: 'medium',
      impact: 'high',
      basedOn: ['Slack', 'Microsoft Teams'],
      category: 'features'
    },
    {
      id: 'ai-integration',
      title: 'AI-Powered Smart Features',
      description: 'Integrate AI capabilities for smart message summarization, automated meeting notes, intelligent task suggestions, and predictive text completion.',
      priority: 'high',
      effort: 'high',
      impact: 'high',
      basedOn: ['Microsoft Teams', 'Google Meet'],
      category: 'features'
    },
    {
      id: 'mobile-optimization',
      title: 'Mobile App Experience Enhancement',
      description: 'Redesign mobile app to match the excellent user experience of Slack and Discord, with improved navigation, offline capabilities, and push notification management.',
      priority: 'medium',
      effort: 'medium',
      impact: 'medium',
      basedOn: ['Slack', 'Discord'],
      category: 'performance'
    },
    {
      id: 'integration-marketplace',
      title: 'Expanded Integration Marketplace',
      description: 'Build a comprehensive app marketplace with 1,000+ integrations to compete with Slack\'s extensive ecosystem. Focus on popular productivity and business tools.',
      priority: 'medium',
      effort: 'high',
      impact: 'high',
      basedOn: ['Slack'],
      category: 'features'
    },
    {
      id: 'competitive-pricing',
      title: 'Competitive Pricing Strategy',
      description: 'Adjust pricing model to be more competitive with Microsoft Teams\' $4/month starting price while maintaining profitability through volume and enterprise features.',
      priority: 'high',
      effort: 'low',
      impact: 'medium',
      basedOn: ['Microsoft Teams', 'Google Meet'],
      category: 'pricing'
    },
    {
      id: 'enterprise-security',
      title: 'Enhanced Enterprise Security Features',
      description: 'Implement advanced security features like single sign-on (SSO), multi-factor authentication (MFA), and compliance certifications to compete in enterprise market.',
      priority: 'medium',
      effort: 'medium',
      impact: 'high',
      basedOn: ['Microsoft Teams', 'Webex'],
      category: 'features'
    },
    {
      id: 'performance-optimization',
      title: 'Large Organization Performance',
      description: 'Optimize platform performance for large organizations (10,000+ users) to address scalability issues similar to those faced by Slack.',
      priority: 'medium',
      effort: 'high',
      impact: 'medium',
      basedOn: ['Microsoft Teams'],
      category: 'performance'
    },
    {
      id: 'global-expansion',
      title: 'International Market Expansion',
      description: 'Expand to global markets with localized versions, multi-language support (50+ languages), and regional data centers to compete with established players.',
      priority: 'medium',
      effort: 'high',
      impact: 'high',
      basedOn: ['Microsoft Teams', 'Google Meet'],
      category: 'market'
    },
    {
      id: 'voice-channels',
      title: 'Persistent Voice Channels',
      description: 'Add persistent voice channels similar to Discord\'s approach, allowing team members to join and leave voice conversations seamlessly throughout the day.',
      priority: 'low',
      effort: 'medium',
      impact: 'medium',
      basedOn: ['Discord'],
      category: 'features'
    },
    {
      id: 'search-enhancement',
      title: 'Advanced Search and Discovery',
      description: 'Upgrade search functionality to match Slack\'s excellent search capabilities with better filtering, indexing, and AI-powered content discovery.',
      priority: 'medium',
      effort: 'medium',
      impact: 'medium',
      basedOn: ['Slack'],
      category: 'features'
    },
    {
      id: 'smb-focus',
      title: 'Small Business Feature Package',
      description: 'Create a specialized feature set and pricing tier specifically for small and medium businesses to capture market share from larger competitors.',
      priority: 'low',
      effort: 'low',
      impact: 'medium',
      basedOn: ['Discord', 'Google Meet'],
      category: 'market'
    }
  ];

  const priorityColors = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800'
  };

  const effortColors = {
    high: 'bg-red-50 text-red-700',
    medium: 'bg-yellow-50 text-yellow-700',
    low: 'bg-green-50 text-green-700'
  };

  const impactColors = {
    high: 'bg-purple-100 text-purple-800',
    medium: 'bg-blue-100 text-blue-800',
    low: 'bg-gray-100 text-gray-800'
  };

  const categories = {
    all: 'All Categories',
    features: 'Feature Enhancements',
    performance: 'Performance & UX',
    pricing: 'Pricing Strategy',
    market: 'Market Expansion'
  };

  const priorities = {
    all: 'All Priorities',
    high: 'High Priority',
    medium: 'Medium Priority',
    low: 'Low Priority'
  };

  const filteredEnhancements = enhancements.filter(enhancement => {
    const priorityMatch = selectedPriority === 'all' || enhancement.priority === selectedPriority;
    const categoryMatch = selectedCategory === 'all' || enhancement.category === selectedCategory;
    return priorityMatch && categoryMatch;
  });

  const getImpactScore = (enhancement: Enhancement) => {
    const impactScore = enhancement.impact === 'high' ? 3 : enhancement.impact === 'medium' ? 2 : 1;
    const effortScore = enhancement.effort === 'low' ? 3 : enhancement.effort === 'medium' ? 2 : 1;
    const priorityScore = enhancement.priority === 'high' ? 3 : enhancement.priority === 'medium' ? 2 : 1;
    return (impactScore * 2 + effortScore + priorityScore) / 4;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Enhancement Suggestions</h2>
          <p className="text-gray-600 mt-1">Actionable improvements based on competitor analysis</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">{filteredEnhancements.length}</div>
          <div className="text-sm text-gray-500">Suggestions</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            >
              {Object.entries(priorities).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            >
              {Object.entries(categories).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Enhancement Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredEnhancements
          .sort((a, b) => getImpactScore(b) - getImpactScore(a))
          .map((enhancement, index) => (
          <div key={enhancement.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{enhancement.title}</h3>
                  {index < 3 && (
                    <div className="flex items-center space-x-1 mt-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="text-xs text-yellow-600 font-medium">Top Recommendation</span>
                    </div>
                  )}
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>

            <p className="text-gray-600 mb-4">{enhancement.description}</p>

            {/* Metrics */}
            <div className="flex items-center space-x-3 mb-4">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[enhancement.priority]}`}>
                {enhancement.priority} priority
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${effortColors[enhancement.effort]}`}>
                {enhancement.effort} effort
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${impactColors[enhancement.impact]}`}>
                {enhancement.impact} impact
              </span>
            </div>

            {/* Based On */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-500">Based on analysis of:</span>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {enhancement.basedOn.map((competitor) => (
                  <span key={competitor} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                    {competitor}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Enhancement Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {enhancements.filter(e => e.priority === 'high').length}
            </div>
            <div className="text-sm text-gray-600">High Priority</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {enhancements.filter(e => e.impact === 'high').length}
            </div>
            <div className="text-sm text-gray-600">High Impact</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {enhancements.filter(e => e.effort === 'low').length}
            </div>
            <div className="text-sm text-gray-600">Quick Wins</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {enhancements.filter(e => e.category === 'features').length}
            </div>
            <div className="text-sm text-gray-600">Feature Ideas</div>
          </div>
        </div>
      </div>

      {filteredEnhancements.length === 0 && (
        <div className="text-center py-12">
          <Lightbulb className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No suggestions match your filters</h3>
          <p className="text-gray-600">Try adjusting your priority or category filters.</p>
        </div>
      )}
    </div>
  );
}