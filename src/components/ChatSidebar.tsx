import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, Bot, User, Lightbulb, BarChart3, Users, TrendingUp, X } from 'lucide-react';
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
      content: `Hello! I'm your AI assistant for competitor analysis. I can help you understand insights about ${productInput.productName || 'your product'} and your ${competitors.length} tracked competitors. What would you like to know?`,
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
    
    // Competitor-specific questions
    if (message.includes('competitor') || message.includes('compare')) {
      const competitorNames = competitors.map(c => c.name).join(', ');
      return `Based on your analysis, you're tracking ${competitors.length} main competitors: ${competitorNames}. Each has different strengths - for example, some focus on enterprise features while others target smaller teams. Would you like me to dive deeper into any specific competitor or comparison?`;
    }
    
    // Pricing questions
    if (message.includes('price') || message.includes('pricing') || message.includes('cost')) {
      const pricingInfo = competitors.map(c => `${c.name}: ${c.pricing.startingPrice} ${c.pricing.currency} (${c.pricing.model})`).join(', ');
      return `Here's the pricing breakdown for your competitors: ${pricingInfo}. This shows a range of pricing strategies from freemium to premium subscription models. Consider how your pricing compares and what value proposition you can offer.`;
    }
    
    // Feature questions
    if (message.includes('feature') || message.includes('functionality')) {
      return `Your competitors offer various features like real-time messaging, video conferencing, file sharing, and integrations. Key differentiators include workflow automation, AI-powered features, and mobile experience quality. Would you like me to analyze specific features or suggest improvements for your product?`;
    }
    
    // Market questions
    if (message.includes('market') || message.includes('opportunity')) {
      return `The ${productInput.marketSegment === 'b2b' ? 'B2B' : productInput.marketSegment === 'b2c' ? 'B2C' : ''} communication and collaboration market is highly competitive. Key opportunities include better mobile experiences, AI integration, improved security features, and specialized solutions for specific industries. Your competitors show varying approaches to these areas.`;
    }
    
    // Strengths/weaknesses
    if (message.includes('strength') || message.includes('weakness') || message.includes('swot')) {
      return `From the SWOT analysis, common competitor strengths include established user bases, strong integrations, and reliable performance. Common weaknesses are limited customization, high pricing for small teams, and mobile app issues. This presents opportunities for you to differentiate with better user experience and competitive pricing.`;
    }
    
    // Suggestions/recommendations
    if (message.includes('suggest') || message.includes('recommend') || message.includes('improve')) {
      return `Based on the competitive analysis, I recommend focusing on: 1) Enhanced mobile experience - many competitors struggle here, 2) AI-powered features for productivity, 3) Competitive pricing for small businesses, 4) Better onboarding and user experience, 5) Specialized features for your target market. Which area interests you most?`;
    }
    
    // Default response
    return `I can help you with insights about your competitors, pricing strategies, feature comparisons, market opportunities, and enhancement suggestions. Try asking me about specific competitors, pricing analysis, or what improvements you should consider for your product.`;
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
    { icon: Users, text: "Main competitors", query: "Who are my main competitors and what are their key strengths?" },
    { icon: TrendingUp, text: "Pricing analysis", query: "How does competitor pricing compare and what should I consider?" },
    { icon: Lightbulb, text: "Improvements", query: "What improvements should I make based on competitor analysis?" },
    { icon: BarChart3, text: "Opportunities", query: "What market opportunities can I identify from this analysis?" }
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
            <h3 className="font-semibold text-gray-900">AI Assistant</h3>
            <p className="text-xs text-gray-500">Ask about your analysis</p>
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
                <p className="text-xs leading-relaxed">{message.content}</p>
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
            placeholder="Ask about competitors..."
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