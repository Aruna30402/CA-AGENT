import React, { useState } from 'react';
import { Search, MessageCircle, Bot, BarChart3 } from 'lucide-react';
import ChatInterface from './components/ChatInterface';
import AnalysisDisplay from './components/AnalysisDisplay';
import { ProductInput, Competitor, AnalysisResult } from './types';

function App() {
  const [currentView, setCurrentView] = useState<'welcome' | 'chat' | 'analysis'>('welcome');
  const [productInput, setProductInput] = useState<ProductInput | null>(null);
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([]);
  const [isChatExpanded, setIsChatExpanded] = useState(false);

  const handleStartChat = () => {
    setCurrentView('chat');
  };

  const handleAnalysisGenerated = (result: AnalysisResult) => {
    setAnalysisResults(prev => [...prev, result]);
    if (currentView === 'chat') {
      setCurrentView('analysis');
    }
  };

  const handleProductUpdate = (input: ProductInput) => {
    setProductInput(input);
  };

  const handleCompetitorsUpdate = (newCompetitors: Competitor[]) => {
    setCompetitors(newCompetitors);
  };

  // Welcome Screen
  if (currentView === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-3xl mb-8 shadow-lg">
                <Bot className="w-10 h-10" />
              </div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                AI Competitor Analysis
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Chat with our AI assistant to discover, analyze, and monitor your competitors. 
                Get instant insights through natural conversation.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <MessageCircle className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Natural Conversation</h3>
                  <p className="text-sm text-gray-600">
                    Simply describe your product and ask questions about competitors
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <Search className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Instant Discovery</h3>
                  <p className="text-sm text-gray-600">
                    AI automatically finds and analyzes relevant competitors
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <BarChart3 className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Live Analysis</h3>
                  <p className="text-sm text-gray-600">
                    Real-time SWOT analysis, feature comparison, and insights
                  </p>
                </div>
              </div>

              <button
                onClick={handleStartChat}
                className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
              >
                <MessageCircle className="w-6 h-6" />
                <span>Start Analysis Chat</span>
              </button>
            </div>

            {/* Example Queries */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Try These Example Queries
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Analyze competitors for my project management tool",
                  "Compare Slack vs Microsoft Teams vs Discord",
                  "What are the weaknesses of Zoom and Google Meet?",
                  "Find opportunities in the CRM market",
                  "Perform SWOT analysis on Salesforce and HubSpot",
                  "What pricing strategies do video conferencing tools use?"
                ].map((query, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer"
                    onClick={handleStartChat}
                  >
                    <p className="text-gray-700 font-medium">"{query}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Chat View (Full Screen)
  if (currentView === 'chat') {
    return (
      <div className="min-h-screen bg-gray-50">
        <ChatInterface
          onAnalysisGenerated={handleAnalysisGenerated}
          onProductUpdate={handleProductUpdate}
          onCompetitorsUpdate={handleCompetitorsUpdate}
          onViewAnalysis={() => setCurrentView('analysis')}
          productInput={productInput}
          competitors={competitors}
        />
      </div>
    );
  }

  // Analysis View (Split Screen)
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Analysis Display - Left Pane */}
      <div className={`transition-all duration-300 ${
        isChatExpanded ? 'w-1/2' : 'w-2/3'
      } border-r border-gray-200`}>
        <AnalysisDisplay
          analysisResults={analysisResults}
          productInput={productInput}
          competitors={competitors}
          onBackToChat={() => setCurrentView('chat')}
        />
      </div>

      {/* Chat Interface - Right Pane */}
      <div className={`transition-all duration-300 ${
        isChatExpanded ? 'w-1/2' : 'w-1/3'
      } bg-white`}>
        <ChatInterface
          onAnalysisGenerated={handleAnalysisGenerated}
          onProductUpdate={handleProductUpdate}
          onCompetitorsUpdate={handleCompetitorsUpdate}
          onViewAnalysis={() => setCurrentView('analysis')}
          productInput={productInput}
          competitors={competitors}
          isCompact={!isChatExpanded}
          onToggleExpand={() => setIsChatExpanded(!isChatExpanded)}
        />
      </div>
    </div>
  );
}

export default App;