import React from 'react';
import { ExternalLink, Building2, DollarSign, Users, Calendar, MapPin, TrendingUp, Banknote } from 'lucide-react';
import { Competitor } from '../types';

interface CompetitorProfilesProps {
  competitors: Competitor[];
}

export default function CompetitorProfiles({ competitors }: CompetitorProfilesProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Competitor Profiles</h2>
        <p className="text-gray-600">{competitors.length} competitors tracked</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {competitors.map((competitor) => (
          <div key={competitor.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    <Building2 className="w-6 h-6 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{competitor.name}</h3>
                    <a
                      href={competitor.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      <span>{competitor.url}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
                {competitor.marketShare && (
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{competitor.marketShare}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">Market Share</div>
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-gray-600 mb-6">{competitor.description}</p>

              {/* Pricing Section */}
              <div className="bg-green-50 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-2 mb-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <h4 className="font-semibold text-gray-900">Pricing</h4>
                </div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold text-green-600">
                    {competitor.pricing.startingPrice}
                  </span>
                  <span className="text-sm text-gray-600">
                    {competitor.pricing.currency} - {competitor.pricing.model}
                  </span>
                </div>
              </div>

              {/* Key Information */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>Key Information</span>
                </h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-500">Founded</div>
                      <div className="font-medium text-gray-900">{competitor.keyInfo.founded}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-500">Employees</div>
                      <div className="font-medium text-gray-900">{competitor.keyInfo.employees}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Banknote className="w-4 h-4 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-500">Funding</div>
                      <div className="font-medium text-gray-900">{competitor.keyInfo.funding}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-500">HQ</div>
                      <div className="font-medium text-gray-900">{competitor.keyInfo.headquarters}</div>
                    </div>
                  </div>
                </div>
              </div>

              {competitor.isCustom && (
                <div className="mt-6 flex items-center space-x-2">
                  <div className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                    Custom Added
                  </div>
                  <span className="text-xs text-gray-500">
                    Some information may be limited for custom competitors
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {competitors.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No competitors selected</h3>
          <p className="text-gray-600">Go back to select competitors for analysis.</p>
        </div>
      )}
    </div>
  );
}