import React, { useState } from 'react';
import { ArrowLeft, BarChart3, Users, TrendingUp, Target, Shield, AlertTriangle, DollarSign, Zap, ExternalLink, Building2 } from 'lucide-react';
import { AnalysisResult, ProductInput, Competitor, SwotPoint } from '../types';

interface AnalysisDisplayProps {
  analysisResults: AnalysisResult[];
  productInput: ProductInput | null;
  competitors: Competitor[];
  onBackToChat: () => void;
}

export default function AnalysisDisplay({ analysisResults, productInput, competitors, onBackToChat }: AnalysisDisplayProps) {
  const [activeResultIndex, setActiveResultIndex] = useState(analysisResults.length - 1);

  if (analysisResults.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Analysis Yet</h3>
          <p className="text-gray-600 mb-6">
            Start chatting with the AI assistant to generate competitor analysis
          </p>
          <button
            onClick={onBackToChat}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Chat</span>
          </button>
        </div>
      </div>
    );
  }

  const currentResult = analysisResults[activeResultIndex];

  const renderSwotAnalysis = (data: any) => {
    const getImpactColor = (impact: string) => {
      switch (impact) {
        case 'high': return 'bg-red-100 text-red-800 border-red-200';
        case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'low': return 'bg-green-100 text-green-800 border-green-200';
        default: return 'bg-gray-100 text-gray-800 border-gray-200';
      }
    };

    const SwotSection = ({ title, items, icon: Icon, bgColor, textColor }: {
      title: string;
      items: SwotPoint[];
      icon: React.ComponentType<any>;
      bgColor: string;
      textColor: string;
    }) => (
      <div className={`${bgColor} rounded-xl p-6 border-2 border-opacity-20`}>
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
            <Icon className={`w-5 h-5 ${textColor}`} />
          </div>
          <div>
            <h4 className={`font-bold text-lg ${textColor}`}>{title}</h4>
            <p className="text-sm opacity-75">{items.length} items identified</p>
          </div>
        </div>
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={index} className="bg-white bg-opacity-80 rounded-lg p-4 shadow-sm border border-white border-opacity-50">
              <div className="flex items-start justify-between mb-2">
                <h5 className="font-semibold text-gray-900 text-sm">{item.point}</h5>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getImpactColor(item.impact)}`}>
                  {item.impact} impact
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">{item.evidence}</p>
            </div>
          ))}
        </div>
      </div>
    );

    return (
      <div className="space-y-6">
        {data.analysis.map((analysis: any, index: number) => {
          const competitor = data.competitors.find((c: Competitor) => c.id === analysis.competitorId);
          return (
            <div key={analysis.competitorId} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{competitor?.name} SWOT Analysis</h3>
                    <p className="text-sm text-gray-600 mt-1">Complete strategic assessment</p>
                  </div>
                  <a
                    href={competitor?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    <span>Visit Site</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
              <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SwotSection
                  title="Strengths"
                  items={analysis.strengths}
                  icon={Shield}
                  bgColor="bg-green-50"
                  textColor="text-green-700"
                />
                <SwotSection
                  title="Weaknesses"
                  items={analysis.weaknesses}
                  icon={AlertTriangle}
                  bgColor="bg-red-50"
                  textColor="text-red-700"
                />
                <SwotSection
                  title="Opportunities"
                  items={analysis.opportunities}
                  icon={TrendingUp}
                  bgColor="bg-blue-50"
                  textColor="text-blue-700"
                />
                <SwotSection
                  title="Threats"
                  items={analysis.threats}
                  icon={Target}
                  bgColor="bg-orange-50"
                  textColor="text-orange-700"
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderFeatureComparison = (data: any) => {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">Feature Comparison Matrix</h3>
          <p className="text-sm text-gray-600 mt-1">
            Comprehensive feature analysis across {data.competitors.length} competitors
          </p>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Feature</th>
                  {data.competitors.map((competitor: Competitor) => (
                    <th key={competitor.id} className="text-center py-3 px-4 font-semibold text-gray-900 min-w-[120px]">
                      {competitor.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.features.map((feature: any, index: number) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-medium text-gray-900">{feature.name}</div>
                        <div className="text-sm text-gray-500">{feature.description}</div>
                      </div>
                    </td>
                    {data.competitors.map((competitor: Competitor) => (
                      <td key={competitor.id} className="py-4 px-4 text-center">
                        {data.comparison[competitor.id]?.[feature.name] ? (
                          <div className="inline-flex items-center justify-center w-8 h-8 bg-green-100 text-green-600 rounded-full">
                            ✓
                          </div>
                        ) : (
                          <div className="inline-flex items-center justify-center w-8 h-8 bg-red-100 text-red-600 rounded-full">
                            ✗
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderPricingAnalysis = (data: any) => {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 px-6 py-4 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900">Pricing Strategy Analysis</h3>
            <p className="text-sm text-gray-600 mt-1">
              Detailed pricing breakdown and strategic insights
            </p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {data.pricingStrategies.map((strategy: any) => {
                const competitor = data.competitors.find((c: Competitor) => c.id === strategy.competitorId);
                return (
                  <div key={strategy.competitorId} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold text-gray-900">{competitor?.name}</h4>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        {strategy.strategy}
                      </span>
                    </div>
                    <div className="space-y-3">
                      {strategy.tiers.map((tier: any, tierIndex: number) => (
                        <div key={tierIndex} className="border border-gray-100 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-900">{tier.name}</span>
                            <span className="font-bold text-green-600">{tier.price}</span>
                          </div>
                          <ul className="text-xs text-gray-600 space-y-1">
                            {tier.features.map((feature: string, featureIndex: number) => (
                              <li key={featureIndex}>• {feature}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderOpportunities = (data: any) => {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">Market Opportunities</h3>
          <p className="text-sm text-gray-600 mt-1">
            Strategic opportunities identified through competitive analysis
          </p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {data.opportunities.map((opportunity: any, index: number) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{opportunity.title}</h4>
                      <p className="text-sm text-gray-500">Market Size: {opportunity.marketSize}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    opportunity.difficulty === 'High' ? 'bg-red-100 text-red-800' :
                    opportunity.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {opportunity.difficulty}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4">{opportunity.description}</p>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <div>
                      <span className="text-gray-500">Timeline:</span>
                      <span className="font-medium text-gray-900 ml-1">{opportunity.timeframe}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {opportunity.competitors.map((comp: string, compIndex: number) => (
                      <span key={compIndex} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderOverview = (data: any) => {
    return (
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center space-x-2 mb-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-600">Competitors</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{data.summary.totalCompetitors}</div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-gray-600">Market Leader</span>
            </div>
            <div className="text-lg font-bold text-gray-900">{data.summary.marketLeader}</div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center space-x-2 mb-2">
              <DollarSign className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium text-gray-600">Avg. Pricing</span>
            </div>
            <div className="text-lg font-bold text-gray-900">{data.summary.avgPricing}/mo</div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center space-x-2 mb-2">
              <Zap className="w-5 h-5 text-orange-600" />
              <span className="text-sm font-medium text-gray-600">Key Trends</span>
            </div>
            <div className="text-sm font-medium text-gray-900">{data.summary.keyTrends.length} identified</div>
          </div>
        </div>

        {/* Competitor Profiles */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900">Competitor Profiles</h3>
            <p className="text-sm text-gray-600 mt-1">
              Detailed information about each tracked competitor
            </p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {data.competitors.map((competitor: Competitor) => (
                <div key={competitor.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{competitor.name}</h4>
                        <a
                          href={competitor.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 text-sm"
                        >
                          {competitor.url}
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">{competitor.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Founded:</span>
                      <span className="font-medium text-gray-900 ml-1">{competitor.keyInfo.founded}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Employees:</span>
                      <span className="font-medium text-gray-900 ml-1">{competitor.keyInfo.employees}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-gray-500">Pricing:</span>
                      <span className="font-medium text-green-600 ml-1">
                        {competitor.pricing.startingPrice} {competitor.pricing.currency} ({competitor.pricing.model})
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Trends */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Market Trends</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.summary.keyTrends.map((trend: string, index: number) => (
              <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="font-medium text-gray-900">{trend}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Analysis Results</h1>
                <p className="text-sm text-gray-600">
                  {productInput?.productName || 'Competitor Analysis'} • {competitors.length} competitors
                </p>
              </div>
            </div>
          </div>
          
          {/* Analysis Navigation */}
          {analysisResults.length > 1 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Analysis:</span>
              <select
                value={activeResultIndex}
                onChange={(e) => setActiveResultIndex(parseInt(e.target.value))}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              >
                {analysisResults.map((result, index) => (
                  <option key={result.id} value={index}>
                    {result.title}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentResult.title}</h2>
            <p className="text-gray-600">
              Generated {currentResult.timestamp.toLocaleString()} • 
              Analysis type: {currentResult.type.charAt(0).toUpperCase() + currentResult.type.slice(1)}
            </p>
          </div>

          {currentResult.type === 'swot' && renderSwotAnalysis(currentResult.data)}
          {currentResult.type === 'features' && renderFeatureComparison(currentResult.data)}
          {currentResult.type === 'pricing' && renderPricingAnalysis(currentResult.data)}
          {currentResult.type === 'opportunities' && renderOpportunities(currentResult.data)}
          {currentResult.type === 'overview' && renderOverview(currentResult.data)}
        </div>
      </div>
    </div>
  );
}