import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Lightbulb, BarChart3, Users, TrendingUp, Maximize2, Minimize2, ArrowLeft, Sparkles, MessageCircle } from 'lucide-react';
import { ProductInput, Competitor, ChatMessage, AnalysisResult } from '../types';

interface ChatInterfaceProps {
  onAnalysisGenerated: (result: AnalysisResult) => void;
  onProductUpdate: (input: ProductInput) => void;
  onCompetitorsUpdate: (competitors: Competitor[]) => void;
  onViewAnalysis: () => void;
  productInput: ProductInput | null;
  competitors: Competitor[];
  isCompact?: boolean;
  onToggleExpand?: () => void;
}

export default function ChatInterface({
  onAnalysisGenerated,
  onProductUpdate,
  onCompetitorsUpdate,
  onViewAnalysis,
  productInput,
  competitors,
  isCompact = false,
  onToggleExpand
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: `👋 Hello! I'm your AI competitor analysis assistant. 

I can help you:
• Discover and analyze competitors
• Perform SWOT analysis
• Compare features and pricing
• Identify market opportunities
• Generate strategic insights

**To get started, try asking:**
• "Analyze competitors for my [product type]"
• "Compare [Company A] vs [Company B]"
• "What are the weaknesses of [competitor]?"
• "Find opportunities in the [industry] market"

What would you like to analyze today?`,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const parseCompetitorAnalysisRequest = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    // Extract product information
    const productMatch = message.match(/(?:for my|analyze|of my)\s+([^,\n]+?)(?:\s+(?:vs|against|compared to)|$)/i);
    const productName = productMatch ? productMatch[1].trim() : null;
    
    // Extract competitors mentioned
    const competitorPatterns = [
      /(?:compare|vs|versus|against)\s+([^,\n]+?)(?:\s+(?:vs|and|,)|$)/gi,
      /(?:analyze|competitors?)\s+([^,\n]+?)(?:\s+(?:vs|and|,)|$)/gi,
      /(?:between|of)\s+([^,\n]+?)(?:\s+(?:and|vs|,)|$)/gi
    ];
    
    const mentionedCompetitors: string[] = [];
    competitorPatterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(message)) !== null) {
        const competitor = match[1].trim();
        if (competitor && !mentionedCompetitors.includes(competitor)) {
          mentionedCompetitors.push(competitor);
        }
      }
    });

    return { productName, mentionedCompetitors };
  };

  const generateMockCompetitors = (names: string[]): Competitor[] => {
    return names.map((name, index) => ({
      id: `competitor-${index}`,
      name: name.charAt(0).toUpperCase() + name.slice(1),
      url: `https://${name.toLowerCase().replace(/\s+/g, '')}.com`,
      description: `${name} is a leading solution in the market with comprehensive features and strong market presence.`,
      pricing: {
        model: 'Subscription',
        startingPrice: `$${Math.floor(Math.random() * 20) + 5}`,
        currency: 'USD'
      },
      keyInfo: {
        founded: (2010 + Math.floor(Math.random() * 14)).toString(),
        employees: `${Math.floor(Math.random() * 10000) + 100}+`,
        headquarters: ['San Francisco, CA', 'New York, NY', 'Seattle, WA', 'Austin, TX'][Math.floor(Math.random() * 4)]
      }
    }));
  };

  const generateAnalysisResponse = (userMessage: string, parsedData: any): { content: string; analysisResult?: AnalysisResult } => {
    const { productName, mentionedCompetitors } = parsedData;
    const message = userMessage.toLowerCase();

    // Generate mock competitors if mentioned
    let newCompetitors: Competitor[] = [];
    if (mentionedCompetitors.length > 0) {
      newCompetitors = generateMockCompetitors(mentionedCompetitors);
      onCompetitorsUpdate(newCompetitors);
    }

    // Update product info if detected
    if (productName && !productInput) {
      const newProductInput: ProductInput = {
        productName,
        marketSegment: 'not_sure'
      };
      onProductUpdate(newProductInput);
    }

    // SWOT Analysis
    if (message.includes('swot') || message.includes('strength') || message.includes('weakness') || message.includes('threat') || message.includes('opportunit')) {
      const analysisResult: AnalysisResult = {
        id: Date.now().toString(),
        type: 'swot',
        title: `SWOT Analysis: ${mentionedCompetitors.join(' vs ') || 'Competitors'}`,
        data: {
          competitors: newCompetitors.length > 0 ? newCompetitors : competitors,
          analysis: newCompetitors.map(comp => ({
            competitorId: comp.id,
            strengths: [
              { point: 'Strong brand recognition and market presence', impact: 'high', evidence: `${comp.name} has established a dominant position with high user retention rates and strong word-of-mouth marketing.` },
              { point: 'Comprehensive feature set and integrations', impact: 'high', evidence: `${comp.name} offers extensive third-party integrations and a robust feature ecosystem.` },
              { point: 'Reliable platform performance and uptime', impact: 'medium', evidence: `${comp.name} maintains excellent uptime and consistent performance across all features.` }
            ],
            weaknesses: [
              { point: 'Complex pricing structure', impact: 'high', evidence: `${comp.name}'s pricing model can be confusing for small businesses with multiple tiers and hidden costs.` },
              { point: 'Limited customization options', impact: 'medium', evidence: `Users report that ${comp.name} lacks advanced customization features for specific business needs.` },
              { point: 'Mobile app performance issues', impact: 'medium', evidence: `${comp.name}'s mobile experience lags behind desktop functionality.` }
            ],
            opportunities: [
              { point: 'AI integration potential', impact: 'high', evidence: `${comp.name} could leverage AI for smart automation and predictive analytics.` },
              { point: 'Emerging market expansion', impact: 'high', evidence: `Growing demand in developing markets presents expansion opportunities.` },
              { point: 'Small business market penetration', impact: 'medium', evidence: `Simplified offerings could capture more SMB customers.` }
            ],
            threats: [
              { point: 'Increasing competition from tech giants', impact: 'high', evidence: `Major tech companies are investing heavily in this space.` },
              { point: 'Economic downturn affecting spending', impact: 'high', evidence: `Economic uncertainty could reduce enterprise software spending.` },
              { point: 'Open-source alternatives gaining traction', impact: 'medium', evidence: `Free alternatives are becoming more sophisticated.` }
            ]
          }))
        },
        timestamp: new Date()
      };

      return {
        content: `## 🎯 SWOT Analysis Complete!

I've analyzed **${mentionedCompetitors.join(', ')}** and generated a comprehensive SWOT analysis.

**Key Findings:**
• **Strengths:** Strong brand recognition, comprehensive features
• **Weaknesses:** Complex pricing, limited customization  
• **Opportunities:** AI integration, emerging markets
• **Threats:** Tech giant competition, economic pressure

The detailed analysis is now displayed in the left pane with interactive charts and insights. You can explore each competitor's strengths, weaknesses, opportunities, and threats in detail.

**What would you like to explore next?**
• Feature comparison between these competitors
• Pricing strategy analysis
• Market opportunity assessment
• Strategic recommendations`,
        analysisResult
      };
    }

    // Feature Comparison
    if (message.includes('feature') || message.includes('compare') || message.includes('comparison')) {
      const analysisResult: AnalysisResult = {
        id: Date.now().toString(),
        type: 'features',
        title: `Feature Comparison: ${mentionedCompetitors.join(' vs ') || 'Competitors'}`,
        data: {
          competitors: newCompetitors.length > 0 ? newCompetitors : competitors,
          features: [
            { name: 'Real-time Messaging', description: 'Instant messaging and chat capabilities' },
            { name: 'Video Conferencing', description: 'Built-in video calling and meetings' },
            { name: 'File Sharing', description: 'Document and file sharing capabilities' },
            { name: 'Third-party Integrations', description: 'Connections with external tools and services' },
            { name: 'Mobile Apps', description: 'Native mobile applications' },
            { name: 'Screen Sharing', description: 'Share screen during calls and meetings' },
            { name: 'Custom Workflows', description: 'Automated workflow and process management' },
            { name: 'Advanced Security', description: 'Enterprise-grade security features' },
            { name: 'API Access', description: 'Developer API for custom integrations' },
            { name: 'Analytics Dashboard', description: 'Usage analytics and reporting tools' }
          ],
          comparison: (newCompetitors.length > 0 ? newCompetitors : competitors).reduce((acc, comp) => {
            acc[comp.id] = {
              'Real-time Messaging': true,
              'Video Conferencing': Math.random() > 0.2,
              'File Sharing': true,
              'Third-party Integrations': Math.random() > 0.3,
              'Mobile Apps': Math.random() > 0.1,
              'Screen Sharing': Math.random() > 0.2,
              'Custom Workflows': Math.random() > 0.4,
              'Advanced Security': Math.random() > 0.3,
              'API Access': Math.random() > 0.4,
              'Analytics Dashboard': Math.random() > 0.5
            };
            return acc;
          }, {} as Record<string, Record<string, boolean>>)
        },
        timestamp: new Date()
      };

      return {
        content: `## ⚡ Feature Comparison Analysis

I've created a comprehensive feature comparison for **${mentionedCompetitors.join(', ')}**.

**Analysis Summary:**
• **Core Features:** All competitors have messaging and file sharing
• **Video Capabilities:** ${Math.floor(Math.random() * 30 + 70)}% of competitors offer video conferencing
• **Integration Ecosystem:** Varies significantly between platforms
• **Mobile Experience:** Mixed quality across competitors

**Key Insights:**
🎯 **Feature Gaps Identified:** Several opportunities for differentiation
📱 **Mobile Optimization:** Room for improvement across the board
🔌 **Integration Depth:** Quality varies more than quantity

The detailed feature matrix is now displayed in the left pane. You can see exactly which features each competitor offers and identify gaps in the market.

**Next Steps:**
• Analyze pricing strategies for these features
• Identify the most important missing features
• Explore user satisfaction with current offerings`,
        analysisResult
      };
    }

    // Pricing Analysis
    if (message.includes('price') || message.includes('pricing') || message.includes('cost')) {
      const analysisResult: AnalysisResult = {
        id: Date.now().toString(),
        type: 'pricing',
        title: `Pricing Analysis: ${mentionedCompetitors.join(' vs ') || 'Market'}`,
        data: {
          competitors: newCompetitors.length > 0 ? newCompetitors : competitors,
          pricingStrategies: (newCompetitors.length > 0 ? newCompetitors : competitors).map(comp => ({
            competitorId: comp.id,
            strategy: ['Premium', 'Competitive', 'Freemium', 'Enterprise'][Math.floor(Math.random() * 4)],
            tiers: [
              { name: 'Basic', price: comp.pricing.startingPrice, features: ['Core messaging', 'File sharing', 'Basic integrations'] },
              { name: 'Pro', price: `$${parseInt(comp.pricing.startingPrice.replace('$', '')) * 2}`, features: ['Advanced features', 'Video conferencing', 'Analytics'] },
              { name: 'Enterprise', price: 'Custom', features: ['All features', 'Advanced security', 'Priority support'] }
            ]
          }))
        },
        timestamp: new Date()
      };

      return {
        content: `## 💰 Pricing Strategy Analysis

I've analyzed the pricing strategies for **${mentionedCompetitors.join(', ')}**.

**Pricing Landscape Overview:**
• **Price Range:** $${Math.min(...(newCompetitors.length > 0 ? newCompetitors : competitors).map(c => parseInt(c.pricing.startingPrice.replace(/[^0-9]/g, '')) || 0))} - $${Math.max(...(newCompetitors.length > 0 ? newCompetitors : competitors).map(c => parseInt(c.pricing.startingPrice.replace(/[^0-9]/g, '')) || 0))} per user/month
• **Common Model:** Tiered subscription pricing
• **Market Position:** Mix of premium and competitive pricing

**Strategic Insights:**
🎯 **Sweet Spot:** Most successful competitors price between $5-15/month
💡 **Differentiation:** Value-based pricing beats feature-based pricing
📊 **Conversion:** Freemium models show higher user acquisition

The detailed pricing breakdown with tier comparisons is now shown in the left pane.

**Pricing Strategy Recommendations:**
• Position competitively in the $6-12 range
• Offer clear value differentiation between tiers
• Consider freemium model for user acquisition`,
        analysisResult
      };
    }

    // Market Opportunities
    if (message.includes('opportunit') || message.includes('gap') || message.includes('market')) {
      const analysisResult: AnalysisResult = {
        id: Date.now().toString(),
        type: 'opportunities',
        title: `Market Opportunities Analysis`,
        data: {
          opportunities: [
            {
              title: 'AI-Native Collaboration Platform',
              description: 'Build collaboration tools with AI at the core, not as an add-on feature',
              marketSize: '$15B+',
              timeframe: '12-18 months',
              difficulty: 'High',
              competitors: ['Microsoft Teams', 'Slack']
            },
            {
              title: 'Mobile-First Business Communication',
              description: 'Design for mobile-first usage patterns with desktop as secondary',
              marketSize: '$8B+',
              timeframe: '6-12 months',
              difficulty: 'Medium',
              competitors: ['Discord', 'WhatsApp Business']
            },
            {
              title: 'Industry-Specific Solutions',
              description: 'Vertical solutions for healthcare, education, or finance with compliance built-in',
              marketSize: '$12B+',
              timeframe: '9-15 months',
              difficulty: 'Medium',
              competitors: ['Slack', 'Microsoft Teams']
            },
            {
              title: 'Small Business Simplified Platform',
              description: 'Ultra-simple collaboration tool designed specifically for teams under 50 people',
              marketSize: '$5B+',
              timeframe: '3-6 months',
              difficulty: 'Low',
              competitors: ['Google Meet', 'Discord']
            }
          ]
        },
        timestamp: new Date()
      };

      return {
        content: `## 🚀 Market Opportunities Identified!

I've identified **4 major opportunities** in the collaboration market based on competitor analysis.

**Top Opportunities:**
🤖 **AI-Native Platform** - $15B+ market, high impact
📱 **Mobile-First Design** - $8B+ market, medium difficulty  
🏥 **Industry Specialization** - $12B+ market, compliance focus
👥 **SMB Simplified Solution** - $5B+ market, quick to market

**Strategic Insights:**
• Current players are vulnerable to mobile-first disruption
• AI integration is still superficial across the market
• Small businesses are underserved by current solutions
• Industry-specific needs create premium pricing opportunities

The detailed opportunity analysis with market sizing and competitive positioning is displayed in the left pane.

**Which opportunity interests you most?** I can dive deeper into:
• Technical requirements and development timeline
• Go-to-market strategy for each opportunity
• Competitive positioning and differentiation
• Investment and resource requirements`,
        analysisResult
      };
    }

    // General competitor discovery
    if (message.includes('competitor') || message.includes('analyze')) {
      // If specific competitors mentioned, use those; otherwise generate relevant ones
      let competitorsToAnalyze = newCompetitors;
      
      if (mentionedCompetitors.length === 0) {
        // Generate relevant competitors based on product type
        const defaultCompetitors = ['Slack', 'Microsoft Teams', 'Discord', 'Zoom', 'Google Meet'];
        competitorsToAnalyze = generateMockCompetitors(defaultCompetitors);
        onCompetitorsUpdate(competitorsToAnalyze);
      }

      const analysisResult: AnalysisResult = {
        id: Date.now().toString(),
        type: 'overview',
        title: `Competitor Analysis: ${productName || 'Market Overview'}`,
        data: {
          competitors: competitorsToAnalyze,
          summary: {
            totalCompetitors: competitorsToAnalyze.length,
            marketLeader: competitorsToAnalyze[0]?.name || 'Unknown',
            avgPricing: `$${Math.floor(competitorsToAnalyze.reduce((sum, c) => sum + (parseInt(c.pricing.startingPrice.replace(/[^0-9]/g, '')) || 0), 0) / competitorsToAnalyze.length)}`,
            keyTrends: ['AI Integration', 'Mobile-First Design', 'Simplified Pricing', 'Industry Specialization']
          }
        },
        timestamp: new Date()
      };

      return {
        content: `## 🔍 Competitor Analysis Complete!

I've discovered and analyzed **${competitorsToAnalyze.length} key competitors** ${productName ? `for ${productName}` : 'in this market'}.

**Market Overview:**
• **Total Competitors Analyzed:** ${competitorsToAnalyze.length}
• **Market Leader:** ${competitorsToAnalyze[0]?.name}
• **Average Starting Price:** $${Math.floor(competitorsToAnalyze.reduce((sum, c) => sum + (parseInt(c.pricing.startingPrice.replace(/[^0-9]/g, '')) || 0), 0) / competitorsToAnalyze.length)}/month
• **Market Maturity:** Established with room for innovation

**Competitors Analyzed:**
${competitorsToAnalyze.map(c => `• **${c.name}** - ${c.pricing.startingPrice}/month (${c.pricing.model})`).join('\n')}

**Key Market Trends:**
🤖 AI integration becoming standard
📱 Mobile-first design gaining importance  
💰 Simplified pricing models preferred
🏥 Industry-specific solutions emerging

The complete competitor profiles and analysis are now displayed in the left pane. 

**What would you like to explore next?**
• SWOT analysis for specific competitors
• Feature comparison matrix
• Pricing strategy deep-dive
• Market opportunity assessment`,
        analysisResult
      };
    }

    // Default response for unclear requests
    return {
      content: `I'd be happy to help with competitor analysis! To provide the most relevant insights, could you be more specific about what you'd like to analyze?

**Here are some examples of what I can help with:**

🔍 **Competitor Discovery:**
• "Find competitors for my CRM software"
• "Who are the main players in video conferencing?"

📊 **Specific Analysis:**
• "Compare Slack vs Microsoft Teams vs Discord"
• "Perform SWOT analysis on Salesforce and HubSpot"
• "What are Zoom's main weaknesses?"

🎯 **Strategic Insights:**
• "Find opportunities in the project management market"
• "What pricing strategies do competitors use?"
• "How can I differentiate from existing players?"

**Current Context:**
${productInput ? `• Product: ${productInput.productName}` : '• No product specified yet'}
${competitors.length > 0 ? `• Tracking: ${competitors.length} competitors` : '• No competitors tracked yet'}

What specific analysis would you like me to perform?`
    };
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Parse the message and generate response
    setTimeout(() => {
      const parsedData = parseCompetitorAnalysisRequest(inputMessage);
      const response = generateAnalysisResponse(inputMessage, parsedData);
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response.content,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);

      // Generate analysis result if applicable
      if (response.analysisResult) {
        onAnalysisGenerated(response.analysisResult);
      }
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    { icon: Users, text: "Find competitors for my product", query: "Find competitors for my product" },
    { icon: BarChart3, text: "Compare Slack vs Teams vs Discord", query: "Compare Slack vs Microsoft Teams vs Discord" },
    { icon: TrendingUp, text: "What opportunities exist in this market?", query: "What opportunities exist in the collaboration market?" },
    { icon: Lightbulb, text: "Perform SWOT analysis on top players", query: "Perform SWOT analysis on Slack and Microsoft Teams" }
  ];

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-center space-x-3">
          {!isCompact && (
            <button
              onClick={() => window.location.reload()}
              className="p-2 rounded-lg hover:bg-white/50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-gray-600" />
            </button>
          )}
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-sm">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">AI Competitor Analyst</h3>
            <p className="text-xs text-gray-600">
              {competitors.length > 0 ? `Tracking ${competitors.length} competitors` : 'Ready to analyze'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {analysisResults.length > 0 && (
            <button
              onClick={onViewAnalysis}
              className="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
            >
              {analysisResults.length} Analysis
            </button>
          )}
          {onToggleExpand && (
            <button
              onClick={onToggleExpand}
              className="p-2 rounded-lg hover:bg-white/50 transition-colors"
            >
              {isCompact ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-start space-x-3 max-w-[85%] ${
                message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === 'user' 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'bg-gradient-to-r from-blue-100 to-purple-100 text-gray-700'
                }`}>
                  {message.type === 'user' ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </div>
                <div className={`rounded-xl px-4 py-3 shadow-sm ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-50 text-gray-900 border border-gray-200'
                }`}>
                  <div className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.content.split('\n').map((line, index) => {
                      // Handle markdown-style formatting
                      if (line.startsWith('## ')) {
                        return <div key={index} className="font-bold text-base mt-3 mb-2 first:mt-0 flex items-center space-x-2">
                          <Sparkles className="w-4 h-4" />
                          <span>{line.replace('## ', '')}</span>
                        </div>;
                      }
                      if (line.startsWith('**') && line.endsWith('**')) {
                        return <div key={index} className="font-semibold mt-2 mb-1">{line.replace(/\*\*/g, '')}</div>;
                      }
                      if (line.startsWith('• ')) {
                        return <div key={index} className="ml-2 mb-1">{line}</div>;
                      }
                      if (line.trim() === '') {
                        return <div key={index} className="h-2"></div>;
                      }
                      return <div key={index} className="mb-1">{line}</div>;
                    })}
                  </div>
                  <p className="text-xs mt-2 opacity-70">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-gray-700" />
                </div>
                <div className="bg-gray-100 rounded-xl px-4 py-3 border border-gray-200">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-xs text-gray-500">Analyzing...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions - Only show when no analysis has been done */}
      {messages.length <= 1 && (
        <div className="border-t border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50 p-4">
          <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center space-x-2">
            <Lightbulb className="w-4 h-4 text-blue-600" />
            <span>Quick Start Questions:</span>
          </p>
          <div className="grid grid-cols-1 gap-2">
            {quickQuestions.map((question, index) => {
              const Icon = question.icon;
              return (
                <button
                  key={index}
                  onClick={() => setInputMessage(question.query)}
                  className="flex items-center space-x-3 w-full p-3 text-left text-sm text-gray-700 bg-white hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors border border-gray-200 hover:border-blue-300 group"
                >
                  <Icon className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">{question.text}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white p-4">
        <div className="flex space-x-3">
          <div className="flex-1 relative">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me to analyze competitors, compare features, find opportunities..."
              rows={1}
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none text-sm placeholder-gray-500"
              style={{ minHeight: '48px', maxHeight: '120px' }}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Try: "Compare Slack vs Teams" or "Find opportunities in CRM market"
        </p>
      </div>
    </div>
  );
}