import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, Bot, User, Lightbulb, BarChart3, Users, TrendingUp, X, Shield, Target, AlertTriangle, Zap } from 'lucide-react';
import { ProductInput, Competitor, ChatMessage } from '../types';

interface ChatSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  productInput: ProductInput;
  competitors: Competitor[];
}

export default function ChatSidebar({ isOpen, onClose, productInput, competitors }: ChatSidebarProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: `Hello! I'm your AI assistant for competitor analysis. I can help you understand insights about ${productInput.productName || 'your product'} and your ${competitors.length} tracked competitors. Ask me anything about their strengths, weaknesses, opportunities, threats, pricing, features, or market positioning!`,
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

  const generateResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    const competitorNames = competitors.map(c => c.name).join(', ');
    
    // SWOT Analysis questions
    if (message.includes('strength') || message.includes('strong')) {
      return `Based on the analysis, key competitor strengths include: **Brand Recognition** - ${competitors[0]?.name || 'Leading competitors'} have established strong market presence. **Integration Ecosystem** - Most competitors offer extensive third-party integrations. **Performance Reliability** - They maintain high uptime and consistent service quality. **Customer Support** - Well-developed support infrastructure with multiple channels. These strengths help them maintain competitive advantages in the market.`;
    }
    
    if (message.includes('weakness') || message.includes('weak')) {
      return `Common competitor weaknesses I've identified: **Limited Customization** - Many competitors restrict customization options, frustrating power users. **Complex Pricing** - Confusing pricing tiers make it hard for small businesses to choose plans. **Mobile Performance** - Several competitors struggle with mobile app quality and performance. **Offline Functionality** - Most require constant internet connectivity. These weaknesses present opportunities for your product to differentiate.`;
    }
    
    if (message.includes('opportunit') || message.includes('growth')) {
      return `Major market opportunities include: **AI Integration** - Huge potential for AI-powered features like smart summarization and automated workflows. **Emerging Markets** - Growing demand in developing regions with less competition. **Small Business Focus** - Underserved SMB market needs simpler, more affordable solutions. **Industry Specialization** - Vertical solutions for healthcare, education, and finance sectors. **Remote Work Trends** - Continued growth in remote collaboration needs.`;
    }
    
    if (message.includes('threat') || message.includes('risk')) {
      return `Key market threats to watch: **Tech Giant Competition** - Microsoft, Google, and Apple are heavily investing in collaboration tools. **Economic Pressure** - Businesses may reduce software spending during economic uncertainty. **Regulatory Changes** - Stricter data privacy laws increase compliance costs. **Open Source Alternatives** - Free solutions like Mattermost are becoming more sophisticated. **Market Saturation** - The collaboration space is becoming increasingly crowded.`;
    }
    
    // Competitor-specific questions
    if (message.includes('competitor') || message.includes('compare')) {
      return `You're tracking ${competitors.length} main competitors: ${competitorNames}. Each has different positioning - some focus on enterprise features while others target smaller teams. **Slack** excels in user experience and integrations. **Microsoft Teams** leverages Office 365 integration. **Discord** dominates gaming/creative communities. **Zoom** leads in video conferencing quality. Would you like me to dive deeper into any specific competitor?`;
    }
    
    // Pricing questions
    if (message.includes('price') || message.includes('pricing') || message.includes('cost')) {
      const pricingInfo = competitors.map(c => `${c.name}: ${c.pricing.startingPrice} ${c.pricing.currency} (${c.pricing.model})`).join(', ');
      return `Here's the competitive pricing landscape: ${pricingInfo}. **Key insights**: Microsoft Teams offers the most aggressive pricing at $4/month. Slack commands premium pricing due to brand strength. Discord and Mattermost use freemium models effectively. **Recommendation**: Consider positioning between $5-8/month for SMBs with clear value differentiation.`;
    }
    
    // Feature questions
    if (message.includes('feature') || message.includes('functionality')) {
      return `**Core features** across competitors include real-time messaging, video conferencing, file sharing, and integrations. **Differentiators** include: Slack's workflow automation, Teams' Office integration, Discord's voice channels, Zoom's video quality. **Gaps I've identified**: Better mobile experience, simpler onboarding, industry-specific features, and more intuitive AI assistance. Focus on these gaps for competitive advantage.`;
    }
    
    // Market questions
    if (message.includes('market') || message.includes('segment')) {
      const segment = productInput.marketSegment === 'b2b' ? 'B2B' : productInput.marketSegment === 'b2c' ? 'B2C' : 'your target';
      return `The ${segment} collaboration market is highly competitive but growing. **Market size**: $47B+ globally with 12% annual growth. **Key trends**: Remote work normalization, AI integration demand, security focus, mobile-first usage. **Your positioning**: ${segment} market offers opportunities in underserved niches like industry-specific solutions or simplified user experiences.`;
    }
    
    // Strategy questions
    if (message.includes('strategy') || message.includes('recommend') || message.includes('suggest')) {
      return `**Strategic recommendations** based on competitive analysis: 1) **Focus on mobile-first design** - most competitors struggle here. 2) **Simplify pricing** - avoid complex tier structures. 3) **Industry specialization** - target specific verticals like healthcare or education. 4) **AI-first approach** - integrate AI more deeply than competitors. 5) **Superior onboarding** - reduce time-to-value vs competitors. Which area interests you most?`;
    }
    
    // Performance questions
    if (message.includes('performance') || message.includes('speed') || message.includes('reliability')) {
      return `**Performance benchmarks**: Most competitors maintain 99.9% uptime, but user experience varies. **Slack** has excellent search performance but can slow with large teams. **Teams** integrates well but can be resource-heavy. **Discord** handles large voice groups well. **Zoom** leads in video quality. **Opportunity**: Focus on consistent performance across all features, especially for large organizations.`;
    }
    
    // Security questions
    if (message.includes('security') || message.includes('privacy') || message.includes('compliance')) {
      return `**Security landscape**: Enterprise competitors prioritize SOC 2, GDPR, HIPAA compliance. **Leaders**: Microsoft Teams and Webex excel in enterprise security. **Gaps**: Many struggle with user-friendly security (complex admin panels). **Opportunity**: Combine enterprise-grade security with consumer-grade usability. Focus on transparent privacy practices and simplified compliance management.`;
    }
    
    // User experience questions
    if (message.includes('user') || message.includes('experience') || message.includes('usability')) {
      return `**UX analysis**: **Slack** sets the gold standard for intuitive design. **Discord** excels in community features. **Teams** struggles with complexity. **Common issues**: Overwhelming interfaces, poor mobile experiences, complex onboarding. **Your advantage**: Focus on simplicity, faster onboarding (under 5 minutes), and mobile-first design. Users want powerful features without complexity.`;
    }
    
    // Integration questions
    if (message.includes('integration') || message.includes('api') || message.includes('connect')) {
      return `**Integration ecosystem**: **Slack** leads with 2,000+ apps. **Teams** leverages Microsoft ecosystem. **Others** have 100-500 integrations. **Key categories**: CRM (Salesforce, HubSpot), Project Management (Asana, Trello), Development (GitHub, Jira). **Strategy**: Focus on quality over quantity - ensure top 50 integrations work flawlessly rather than having thousands of mediocre ones.`;
    }
    
    // Default comprehensive response
    return `I can help you with detailed insights about your competitive landscape. **Available analysis**: 
    
    🛡️ **SWOT Analysis** - Strengths, weaknesses, opportunities, and threats for each competitor
    💰 **Pricing Strategy** - Competitive pricing analysis and recommendations  
    ⚡ **Feature Gaps** - Opportunities where competitors fall short
    📊 **Market Positioning** - How competitors position themselves and where you can differentiate
    🎯 **Strategic Recommendations** - Actionable insights for your product strategy
    
    Try asking about specific areas like "What are Slack's main weaknesses?" or "What pricing strategy should I consider?" I'm here to help you make informed strategic decisions!`;
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

    // Simulate AI response delay
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: generateResponse(inputMessage),
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    { icon: Shield, text: "Competitor strengths", query: "What are the main strengths of my competitors?" },
    { icon: AlertTriangle, text: "Market threats", query: "What threats should I be aware of in this market?" },
    { icon: TrendingUp, text: "Growth opportunities", query: "What opportunities exist for growth and differentiation?" },
    { icon: Target, text: "Strategic recommendations", query: "What strategic recommendations do you have based on this analysis?" },
    { icon: BarChart3, text: "Pricing strategy", query: "How should I position my pricing against competitors?" },
    { icon: Zap, text: "Feature gaps", query: "What feature gaps exist that I could exploit?" }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-white border-l border-gray-200 shadow-lg z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <Bot className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Strategy Assistant</h3>
            <p className="text-xs text-gray-500">Competitive intelligence expert</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start space-x-2 max-w-[85%] ${
              message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.type === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {message.type === 'user' ? (
                  <User className="w-3 h-3" />
                ) : (
                  <Bot className="w-3 h-3" />
                )}
              </div>
              <div className={`rounded-lg px-3 py-2 ${
                message.type === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}>
                <div className="text-xs leading-relaxed whitespace-pre-wrap">{message.content}</div>
                <p className={`text-xs mt-1 opacity-70`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2">
              <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                <Bot className="w-3 h-3 text-gray-600" />
              </div>
              <div className="bg-gray-100 rounded-lg px-3 py-2">
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      {messages.length <= 1 && (
        <div className="p-3 border-t border-gray-200 bg-gray-50">
          <p className="text-xs font-medium text-gray-700 mb-2">Quick questions:</p>
          <div className="space-y-1">
            {quickQuestions.map((question, index) => {
              const Icon = question.icon;
              return (
                <button
                  key={index}
                  onClick={() => setInputMessage(question.query)}
                  className="flex items-center space-x-2 w-full p-2 text-left text-xs text-gray-600 hover:bg-white hover:text-gray-900 rounded-md transition-colors"
                >
                  <Icon className="w-3 h-3" />
                  <span>{question.text}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-3 border-t border-gray-200">
        <div className="flex space-x-2">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about competitors, SWOT, pricing..."
            rows={1}
            className="flex-1 px-2 py-1 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-600 focus:border-transparent resize-none text-xs"
            style={{ minHeight: '32px', maxHeight: '80px' }}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            <Send className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}