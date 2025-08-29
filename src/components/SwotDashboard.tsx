import React, { useEffect, useState } from 'react';
import { Shield, AlertTriangle, TrendingUp, Target } from 'lucide-react';
import { Competitor, SwotPoint } from '../types';

interface Props {
  competitors: Competitor[];
}

const generateStrengths = (competitor: Competitor): SwotPoint[] => [
  {
    point: `Strong brand recognition and user loyalty`,
    impact: 'high',
    evidence: `${competitor.name} has built a strong brand presence with high user retention rates and positive word-of-mouth marketing.`,
  },
  {
    point: `Comprehensive integration ecosystem`,
    impact: 'high',
    evidence: `${competitor.name} supports extensive third-party integrations, making it versatile for various business workflows and use cases.`,
  },
  {
    point: `Reliable platform performance`,
    impact: 'medium',
    evidence: `${competitor.name} maintains high uptime and consistent performance, which is critical for business communication tools.`,
  },
  {
    point: `Strong customer support infrastructure`,
    impact: 'medium',
    evidence: `${competitor.name} offers multiple support channels including live chat, documentation, and community forums.`,
  },
];

const generateWeaknesses = (competitor: Competitor): SwotPoint[] => [
  {
    point: `Limited customization options`,
    impact: 'high',
    evidence: `Users report that ${competitor.name} lacks advanced customization features, limiting its adaptability to specific business needs.`,
  },
  {
    point: `Complex pricing structure`,
    impact: 'medium',
    evidence: `${competitor.name}'s pricing model can be confusing for small businesses, with multiple tiers and add-on costs.`,
  },
  {
    point: `Mobile app performance issues`,
    impact: 'medium',
    evidence: `Mobile app for ${competitor.name} has received criticism for occasional crashes and slower performance compared to desktop.`,
  },
  {
    point: `Limited offline functionality`,
    impact: 'low',
    evidence: `${competitor.name} requires constant internet connection, which can be limiting in areas with poor connectivity.`,
  },
];

const generateOpportunities = (competitor: Competitor): SwotPoint[] => [
  {
    point: `AI integration potential`,
    impact: 'high',
    evidence: `${competitor.name} could leverage AI for smart message summarization, automated workflows, and predictive analytics to stay competitive.`,
  },
  {
    point: `Emerging market expansion`,
    impact: 'high',
    evidence: `Growing demand for collaboration tools in developing markets presents expansion opportunities for ${competitor.name}.`,
  },
  {
    point: `Small business market penetration`,
    impact: 'medium',
    evidence: `${competitor.name} could capture more small business customers by offering simplified pricing and features tailored to smaller teams.`,
  },
  {
    point: `Industry-specific solutions`,
    impact: 'medium',
    evidence: `${competitor.name} could develop specialized versions for healthcare, education, or finance sectors with compliance features.`,
  },
];

const generateThreats = (competitor: Competitor): SwotPoint[] => [
  {
    point: `Increasing competition from tech giants`,
    impact: 'high',
    evidence: `Major tech companies are investing heavily in collaboration tools, potentially threatening ${competitor.name}'s market position.`,
  },
  {
    point: `Economic downturn affecting enterprise spending`,
    impact: 'high',
    evidence: `Economic uncertainty could lead businesses to reduce software spending, impacting ${competitor.name}'s revenue growth.`,
  },
  {
    point: `Data privacy and security regulations`,
    impact: 'medium',
    evidence: `Stricter data protection laws could increase compliance costs and operational complexity for ${competitor.name}.`,
  },
  {
    point: `Open-source alternatives gaining traction`,
    impact: 'medium',
    evidence: `Free and open-source collaboration tools are becoming more sophisticated, potentially reducing demand for ${competitor.name}.`,
  },
];

const getImpactColor = (impact: string) => {
  switch (impact) {
    case 'high': return 'bg-red-100 text-red-800';
    case 'medium': return 'bg-yellow-100 text-yellow-800';
    case 'low': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const SwotSection = ({
  title,
  items,
  icon: Icon,
  color,
}: {
  title: string;
  items: SwotPoint[];
  icon: React.ComponentType<any>;
  color: string;
}) => (
  <div className={`${color} rounded-lg p-4`}>
    <div className="flex items-center space-x-2 mb-3">
      <Icon className="w-5 h-5" />
      <h4 className="font-semibold">{title}</h4>
      <span className="text-sm opacity-75">({items.length})</span>
    </div>
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className="bg-white bg-opacity-80 rounded-md p-3 shadow">
          <div className="flex items-start justify-between mb-2">
            <p className="font-medium text-sm">{item.point}</p>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(item.impact)}`}>
              {item.impact}
            </span>
          </div>
          <p className="text-xs opacity-80">{item.evidence}</p>
        </div>
      ))}
    </div>
  </div>
);

const SwotDashboard: React.FC<Props> = ({ competitors }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">SWOT Analysis</h2>
          <p className="text-gray-600 mt-1">Complete strategic analysis for each competitor</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">{competitors.length}</div>
          <div className="text-sm text-gray-500">Competitors</div>
        </div>
      </div>

      {competitors.length === 0 && (
        <div className="text-center py-12">
          <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No SWOT analysis available</h3>
          <p className="text-gray-600">Select competitors to see their SWOT analysis.</p>
        </div>
      )}

      {competitors.map((competitor) => (
        <div key={competitor.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900">
              {competitor.name} - Complete SWOT Analysis
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Strategic assessment across all four dimensions
            </p>
          </div>
          <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SwotSection
              title="Strengths"
              items={generateStrengths(competitor)}
              icon={Shield}
              color="bg-green-50 text-green-800"
            />
            <SwotSection
              title="Weaknesses"
              items={generateWeaknesses(competitor)}
              icon={AlertTriangle}
              color="bg-red-50 text-red-800"
            />
            <SwotSection
              title="Opportunities"
              items={generateOpportunities(competitor)}
              icon={TrendingUp}
              color="bg-blue-50 text-blue-800"
            />
            <SwotSection
              title="Threats"
              items={generateThreats(competitor)}
              icon={Target}
              color="bg-orange-50 text-orange-800"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SwotDashboard;