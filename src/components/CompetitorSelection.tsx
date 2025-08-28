import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, Plus, ExternalLink, Building2, DollarSign, Users, Calendar } from 'lucide-react';
import { ProductInput, Competitor } from '../types';

interface CompetitorSelectionProps {
  productInput: ProductInput;
  onSelection: (competitors: Competitor[]) => void;
  onBack: () => void;
}

export default function CompetitorSelection({ productInput, onSelection, onBack }: CompetitorSelectionProps) {
  const [discoveredCompetitors, setDiscoveredCompetitors] = useState<Competitor[]>([]);
  const [selectedCompetitors, setSelectedCompetitors] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customCompetitor, setCustomCompetitor] = useState({ name: '', url: '' });

  // Mock competitor discovery
  useEffect(() => {
    const timer = setTimeout(() => {
      const mockCompetitors: Competitor[] = [
        {
          id: 'slack',
          name: 'Slack',
          url: 'https://slack.com',
          description: 'Business communication platform with channels, messaging, and integrations',
          pricing: { model: 'Subscription', startingPrice: '$7.25', currency: 'USD' },
          keyInfo: {
            founded: '2013',
            employees: '2,500+',
            headquarters: 'San Francisco, CA'
          },
        },
        {
          id: 'microsoft-teams',
          name: 'Microsoft Teams',
          url: 'https://teams.microsoft.com',
          description: 'Integrated workplace communication and collaboration platform',
          pricing: { model: 'Subscription', startingPrice: '$4.00', currency: 'USD' },
          keyInfo: {
            founded: '2017',
            employees: '220,000+',
            headquarters: 'Redmond, WA'
          },
        },
        {
          id: 'discord',
          name: 'Discord',
          url: 'https://discord.com',
          description: 'Voice, video and text communication service for communities',
          pricing: { model: 'Freemium', startingPrice: 'Free', currency: 'USD' },
          keyInfo: {
            founded: '2015',
            employees: '600+',
            headquarters: 'San Francisco, CA'
          },
        },
        {
          id: 'zoom',
          name: 'Zoom',
          url: 'https://zoom.us',
          description: 'Video conferencing and communication platform',
          pricing: { model: 'Subscription', startingPrice: '$14.99', currency: 'USD' },
          keyInfo: {
            founded: '2011',
            employees: '6,787',
            headquarters: 'San Jose, CA'
          },
        },
        {
          id: 'webex',
          name: 'Cisco Webex',
          url: 'https://webex.com',
          description: 'Enterprise video conferencing and collaboration suite',
          pricing: { model: 'Subscription', startingPrice: '$13.50', currency: 'USD' },
          keyInfo: {
            founded: '1995',
            employees: '79,500+',
            headquarters: 'San Jose, CA'
          },
        },
        {
          id: 'google-meet',
          name: 'Google Meet',
          url: 'https://meet.google.com',
          description: 'Video conferencing service integrated with Google Workspace',
          pricing: { model: 'Subscription', startingPrice: '$6.00', currency: 'USD' },
          keyInfo: {
            founded: '2017',
            employees: '156,500+',
            headquarters: 'Mountain View, CA'
          },
        },
        {
          id: 'mattermost',
          name: 'Mattermost',
          url: 'https://mattermost.com',
          description: 'Open-source collaboration platform for secure team communication',
          pricing: { model: 'Open Source/Enterprise', startingPrice: 'Free', currency: 'USD' },
          keyInfo: {
            founded: '2016',
            employees: '400+',
            headquarters: 'Palo Alto, CA'
          },
        }
      ];
      setDiscoveredCompetitors(mockCompetitors);
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const toggleCompetitor = (competitorId: string) => {
    const newSelected = new Set(selectedCompetitors);
    if (newSelected.has(competitorId)) {
      newSelected.delete(competitorId);
    } else if (newSelected.size < 7) {
      newSelected.add(competitorId);
    }
    setSelectedCompetitors(newSelected);
  };

  const addCustomCompetitor = () => {
    if (!customCompetitor.name || !customCompetitor.url) return;

    setIsLoading(true);
    
    // Simulate URL scraping
    setTimeout(() => {
      const scrapedData = {
        description: `${customCompetitor.name} is a competitive solution in the ${productInput.marketSegment} market space.`,
        pricing: { 
          model: 'Subscription', 
          startingPrice: 'Contact Sales', 
          currency: 'USD' 
        },
        keyInfo: {
          founded: new Date().getFullYear() - Math.floor(Math.random() * 10).toString(),
          employees: `${Math.floor(Math.random() * 1000) + 100}+`,
          headquarters: 'Unknown'
        }
      };

    const newCompetitor: Competitor = {
      id: `custom-${Date.now()}`,
      name: customCompetitor.name,
      url: customCompetitor.url,
      description: scrapedData.description,
      pricing: scrapedData.pricing,
      keyInfo: scrapedData.keyInfo,
      isCustom: true
    };

    setDiscoveredCompetitors(prev => [...prev, newCompetitor]);
    setSelectedCompetitors(prev => new Set([...prev, newCompetitor.id]));
    setCustomCompetitor({ name: '', url: '' });
    setShowCustomForm(false);
      setIsLoading(false);
    }, 2000);
  };

  const handleContinue = () => {
    const selected = discoveredCompetitors.filter(c => selectedCompetitors.has(c.id));
    onSelection(selected);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Select Competitors</h1>
            <p className="text-gray-600">
              Choose up to 7 competitors to analyze for {productInput.productName || 'your product'}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">
            {selectedCompetitors.size} of 7 selected
          </p>
          <button
            onClick={handleContinue}
            disabled={selectedCompetitors.size === 0}
            className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Continue Analysis
          </button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Discovering Competitors</h3>
          <p className="text-gray-600">Analyzing your product and finding relevant competitors...</p>
        </div>
      )}

      {/* Competitor Grid */}
      {!isLoading && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {discoveredCompetitors.map((competitor) => (
              <div
                key={competitor.id}
                className={`bg-white rounded-xl shadow-sm border-2 transition-all cursor-pointer ${
                  selectedCompetitors.has(competitor.id)
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => toggleCompetitor(competitor.id)}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{competitor.name}</h3>
                      </div>
                    </div>
                    <a
                      href={competitor.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">{competitor.description}</p>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {competitor.pricing.startingPrice} {competitor.pricing.currency} ({competitor.pricing.model})
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{competitor.keyInfo.employees} employees</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Founded {competitor.keyInfo.founded}</span>
                    </div>
                  </div>

                  {competitor.isCustom && (
                    <div className="mt-4 px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full w-fit">
                      Custom Added
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Add Custom Competitor Card */}
            <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 hover:border-gray-400 transition-all">
              {!showCustomForm ? (
                <button
                  onClick={() => setShowCustomForm(true)}
                  className="w-full h-full p-6 text-center"
                >
                  <Plus className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                  <h3 className="font-medium text-gray-700 mb-2">Add Custom Competitor</h3>
                  <p className="text-sm text-gray-500">Add a competitor not in our database</p>
                </button>
              ) : (
                <div className="p-6">
                  <h3 className="font-medium text-gray-900 mb-4">Add Custom Competitor</h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Competitor name"
                      value={customCompetitor.name}
                      onChange={(e) => setCustomCompetitor(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
                    />
                    <input
                      type="url"
                      placeholder="Website URL"
                      value={customCompetitor.url}
                      onChange={(e) => setCustomCompetitor(prev => ({ ...prev, url: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={addCustomCompetitor}
                        disabled={!customCompetitor.name || !customCompetitor.url}
                        className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                      >
                        Add
                      </button>
                      <button
                        onClick={() => setShowCustomForm(false)}
                        className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}