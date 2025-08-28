import React, { useState } from 'react';
import { Search, Users, BarChart3, Lightbulb, Bell, FileText, Plus, ExternalLink, TrendingUp, Shield, AlertTriangle, Target, MessageCircle } from 'lucide-react';
import InputForm from './components/InputForm';
import CompetitorSelection from './components/CompetitorSelection';
import CompetitorProfiles from './components/CompetitorProfiles';
import SwotDashboard from './components/SwotDashboard';
import FeatureComparison from './components/FeatureComparison';
import EnhancementSuggestions from './components/EnhancementSuggestions';
import NotificationSettings from './components/NotificationSettings';
import ExportShare from './components/ExportShare';
import ChatSidebar from './components/ChatSidebar';
import { ProductInput, Competitor, SwotAnalysis } from './types';

function App() {
  const [currentStep, setCurrentStep] = useState<'input' | 'selection' | 'analysis'>('input');
  const [productInput, setProductInput] = useState<ProductInput | null>(null);
  const [selectedCompetitors, setSelectedCompetitors] = useState<Competitor[]>([]);
  const [activeTab, setActiveTab] = useState<'profiles' | 'swot' | 'comparison' | 'suggestions' | 'notifications' | 'export'>('profiles');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleProductSubmit = (input: ProductInput) => {
    setProductInput(input);
    setCurrentStep('selection');
  };

  const handleCompetitorSelection = (competitors: Competitor[]) => {
    setSelectedCompetitors(competitors);
    setCurrentStep('analysis');
  };

  const navigationItems = [
    { id: 'profiles', label: 'Competitor Profiles', icon: Users },
    { id: 'swot', label: 'SWOT Analysis', icon: BarChart3 },
    { id: 'comparison', label: 'Feature Comparison', icon: Target },
    { id: 'suggestions', label: 'Enhancement Ideas', icon: Lightbulb },
    { id: 'notifications', label: 'Monitoring', icon: Bell },
    { id: 'export', label: 'Export & Share', icon: FileText },
  ];

  if (currentStep === 'input') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-2xl mb-6">
                <Search className="w-8 h-8" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Competitor Analysis Platform
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover, analyze, and stay ahead of your competition with intelligent insights and automated monitoring
              </p>
            </div>
            <InputForm onSubmit={handleProductSubmit} />
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'selection') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-6 py-8">
          <CompetitorSelection
            productInput={productInput!}
            onSelection={handleCompetitorSelection}
            onBack={() => setCurrentStep('input')}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-lg">
                <Search className="w-4 h-4" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  {productInput?.productName || 'Product'} Analysis
                </h1>
                <p className="text-sm text-gray-500">
                  {selectedCompetitors.length} competitors tracked
                </p>
              </div>
            </div>
            <button
              onClick={() => setCurrentStep('input')}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              New Analysis
            </button>
            <button
              onClick={() => setIsChatOpen(!isChatOpen)}
              className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                isChatOpen 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              <span>AI Assistant</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6">
          <div className="flex space-x-8 overflow-x-auto">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`flex items-center space-x-2 px-3 py-4 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === item.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className={`container mx-auto px-6 py-8 transition-all duration-300 ${
        isChatOpen ? 'mr-80' : ''
      }`}>
        {activeTab === 'profiles' && (
          <CompetitorProfiles competitors={selectedCompetitors} />
        )}
        {activeTab === 'swot' && (
          <SwotDashboard competitors={selectedCompetitors} />
        )}
        {activeTab === 'comparison' && (
          <FeatureComparison 
            productInput={productInput!} 
            competitors={selectedCompetitors} 
          />
        )}
        {activeTab === 'suggestions' && (
          <EnhancementSuggestions 
            productInput={productInput!}
            competitors={selectedCompetitors} 
          />
        )}
        {activeTab === 'notifications' && (
          <NotificationSettings competitors={selectedCompetitors} />
        )}
        {activeTab === 'export' && (
          <ExportShare 
            productInput={productInput!}
            competitors={selectedCompetitors} 
          />
        )}
      </main>

      {/* Chat Sidebar */}
      <ChatSidebar 
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        productInput={productInput!}
        competitors={selectedCompetitors}
      />
    </div>
  );
}

export default App;