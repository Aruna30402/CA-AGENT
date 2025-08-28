import React, { useEffect, useState } from 'react';
import { Shield, AlertTriangle } from 'lucide-react';
import { Competitor, SwotPoint } from '../types';

interface Props {
  competitors: Competitor[];
}

const generateStrengths = (competitor: Competitor): SwotPoint[] => [
  {
    point: `High user satisfaction for ${competitor.name}`,
    impact: 'high',
    evidence: `${competitor.name} consistently receives positive reviews for its intuitive interface and reliability.`,
  },
  {
    point: `Strong integration ecosystem`,
    impact: 'medium',
    evidence: `${competitor.name} supports over 100 third-party integrations, making it versatile for various workflows.`,
  },
  {
    point: `Competitive pricing`,
    impact: 'low',
    evidence: `${competitor.name} offers a free tier and affordable plans compared to most competitors.`,
  },
];

const generateWeaknesses = (competitor: Competitor): SwotPoint[] => [
  {
    point: `Limited geographic focus`,
    impact: 'high',
    evidence: `${competitor.name} is only available in select regions, restricting its global reach.`,
  },
  {
    point: `Basic data export options`,
    impact: 'medium',
    evidence: `Users report that ${competitor.name} lacks advanced data export formats, which can hinder analytics.`,
  },
  {
    point: `Usability issues on mobile`,
    impact: 'low',
    evidence: `Mobile app for ${competitor.name} has lower ratings due to occasional crashes and slow performance.`,
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
      <h2 className="text-2xl font-bold text-gray-900 mb-2">SWOT Analysis</h2>
      <p className="text-gray-600">Strategic strengths and weaknesses for each competitor</p>
      {competitors.length === 0 && (
        <div className="text-center py-12">
          <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No SWOT analysis available</h3>
          <p className="text-gray-600">Select competitors to see their SWOT analysis.</p>
        </div>
      )}
      {competitors.map((competitor) => (
        <div key={competitor.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-green-50 to-red-50 px-6 py-4 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900">
              {competitor.name} SWOT Highlights
            </h3>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
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
          </div>
        </div>
      ))}
    </div>
  );
};

export default SwotDashboard;