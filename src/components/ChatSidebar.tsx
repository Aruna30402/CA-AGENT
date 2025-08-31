import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, Bot, User, Lightbulb, BarChart3, Users, TrendingUp, X, Shield, Target, AlertTriangle, Zap, ChevronRight } from 'lucide-react';
import { ProductInput, Competitor, ChatMessage } from '../types';

interface ChatSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  productInput: ProductInput;
  competitors: Competitor[];
}

interface ChatMessageWithSuggestions extends ChatMessage {
  suggestions?: string[];
}

export default function ChatSidebar({ isOpen, onClose, productInput, competitors }: ChatSidebarProps) {
  const [messages, setMessages] = useState<ChatMessageWithSuggestions[]>([
    {
      id: '1',
      type: 'assistant',
      content: `Hello! I'm your AI assistant for competitor analysis. I can help you understand insights about ${productInput.productName || 'your product'} and your ${competitors.length} tracked competitors. Ask me anything about their strengths, weaknesses, opportunities, threats, pricing, features, or market positioning!`,
      timestamp: new Date(),
      suggestions: [
        "What are my competitors' main weaknesses?",
        "What pricing strategy should I consider?",
        "Which market opportunities should I pursue first?",
        "How can I differentiate from existing competitors?"
      ]
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

  const generateResponse = (userMessage: string): { content: string; suggestions: string[] } => {
    const message = userMessage.toLowerCase();
    const competitorNames = competitors.map(c => c.name).join(', ');
    
    // SWOT Analysis questions
    if (message.includes('strength') || message.includes('strong')) {
      return {
        content: `## 🛡️ **COMPETITOR STRENGTHS ANALYSIS**

**KEY FINDINGS:**

🏆 **Brand Recognition & Market Presence**
• ${competitors[0]?.name || 'Leading competitors'} have established dominant market positions
• High user retention rates (85%+ for top players)
• Strong word-of-mouth and organic growth

🔗 **Integration Ecosystem**
• Slack leads with 2,000+ app integrations
• Microsoft Teams leverages Office 365 ecosystem
• Deep API capabilities enable custom workflows

⚡ **Performance & Reliability**
• 99.9% uptime across major platforms
• Consistent service quality during peak usage
• Robust infrastructure handling millions of users

🎯 **Customer Support Excellence**
• Multi-channel support (chat, email, phone)
• Comprehensive documentation and training
• Active community forums and user groups

**STRATEGIC IMPACT:** These strengths create high switching costs and customer loyalty, making market entry challenging but not impossible.
`,
        suggestions: [
          "How can I compete against these strong brand positions?",
          "What weaknesses do these competitors have that I can exploit?",
          "Which competitor strength is most vulnerable to disruption?",
          "What's the cost to build similar integration ecosystems?"
        ]
      };
    }
    
    if (message.includes('weakness') || message.includes('weak')) {
      return {
        content: `## ⚠️ **COMPETITOR WEAKNESSES ANALYSIS**

**CRITICAL VULNERABILITIES IDENTIFIED:**

🎨 **Limited Customization Options**
• Most platforms offer rigid interface designs
• Power users frustrated by lack of personalization
• Enterprise clients need more branding control
• **Opportunity:** Build highly customizable UI/UX

💰 **Complex Pricing Structures**
• Confusing tier systems (Slack has 4+ pricing levels)
• Hidden costs and unexpected charges
• Small businesses struggle to choose right plan
• **Opportunity:** Transparent, simple pricing model

📱 **Mobile Experience Gaps**
• Desktop-first design philosophy
• Mobile apps often lag behind web versions
• Poor offline functionality across platforms
• **Opportunity:** Mobile-first approach

🔌 **Integration Complexity**
• Setup requires technical expertise
• Limited no-code integration options
• Poor user experience for non-technical users
• **Opportunity:** One-click integrations

**STRATEGIC ADVANTAGE:** These weaknesses represent clear differentiation opportunities where you can outperform established players.
`,
        suggestions: [
          "Which weakness should I prioritize attacking first?",
          "How can I turn these weaknesses into my competitive advantages?",
          "What specific features could exploit these gaps?",
          "How much would it cost to build better mobile experience?"
        ]
      };
    }
    
    if (message.includes('opportunit') || message.includes('growth')) {
      return {
        content: `## 🚀 **MARKET OPPORTUNITIES ANALYSIS**

**HIGH-IMPACT GROWTH OPPORTUNITIES:**

🤖 **AI Integration Revolution**
• Market demand for AI-powered features growing 300% annually
• Opportunities: Smart summarization, automated workflows, predictive analytics
• Current gap: Most competitors have basic AI, not deep integration
• **Market size:** $15B+ AI collaboration market by 2026

🌍 **Emerging Markets Expansion**
• 40% growth in collaboration tool adoption in developing regions
• Less saturated markets in Asia, Africa, Latin America
• Local competitors often lack enterprise features
• **Revenue potential:** $5B+ untapped market

🏢 **Small Business Underserved Segment**
• 67% of SMBs find current solutions too complex/expensive
• Need: Simple setup, affordable pricing, essential features only
• Current solutions over-engineered for small teams
• **Market size:** 30M+ small businesses globally

🏥 **Industry-Specific Solutions**
• Healthcare: HIPAA compliance + specialized workflows
• Education: Student collaboration + grading integration
• Finance: SOX compliance + secure document sharing
• **Combined market:** $8B+ vertical opportunities

**STRATEGIC RECOMMENDATION:** Focus on 1-2 opportunities initially for maximum impact and resource efficiency.
`,
        suggestions: [
          "Which opportunity has the fastest path to revenue?",
          "What's the competitive landscape in emerging markets?",
          "How do I validate demand for industry-specific features?",
          "What's the minimum investment needed for AI integration?"
        ]
      };
    }
    
    if (message.includes('threat') || message.includes('risk')) {
      return {
        content: `## 🚨 **MARKET THREATS ANALYSIS**

**CRITICAL THREATS TO MONITOR:**

🏢 **Tech Giant Dominance**
• Microsoft Teams bundled with Office 365 (300M+ users)
• Google Workspace integration advantage
• Apple's enterprise push with business tools
• **Risk level:** EXTREME - Deep pockets, existing user bases

📉 **Economic Pressure Impact**
• 23% of businesses reducing software spending in 2024
• Longer sales cycles for new tools
• Increased price sensitivity across all segments
• **Risk level:** HIGH - Direct revenue impact

⚖️ **Regulatory Compliance Burden**
• GDPR, CCPA, and emerging privacy laws
• Increased compliance costs (avg $2M+ annually)
• Data localization requirements
• **Risk level:** MEDIUM - Manageable with planning

🆓 **Open Source Competition**
• Mattermost, Rocket.Chat gaining enterprise features
• Zero licensing costs attractive during budget cuts
• Community-driven development accelerating
• **Risk level:** MEDIUM - Quality gap closing

📊 **Market Saturation Reality**
• 200+ collaboration tools in market
• Customer acquisition costs rising 40% annually
• Differentiation becoming increasingly difficult
• **Risk level:** HIGH - Harder to stand out

**MITIGATION STRATEGY:** Focus on unique value propositions and underserved niches to avoid direct competition with giants.
`,
        suggestions: [
          "How can I compete against Microsoft's bundling strategy?",
          "What's the best way to differentiate in a saturated market?",
          "How do I prepare for economic downturns affecting my market?",
          "What's my risk level compared to these threats?"
        ]
      };
    }
    
    // Competitor-specific questions
    if (message.includes('competitor') || message.includes('compare')) {
      return {
        content: `## 🏆 **COMPETITIVE LANDSCAPE OVERVIEW**

**YOUR TRACKED COMPETITORS:** ${competitors.length} companies

**MARKET POSITIONING BREAKDOWN:**

💼 **Enterprise Leaders**
• **Microsoft Teams:** Office 365 integration, enterprise security
• **Cisco Webex:** Enterprise-grade video, compliance focus
• **Slack:** Premium UX, extensive app ecosystem

👥 **Team-Focused Players**
• **Discord:** Community building, voice-first approach
• **Google Meet:** Simple video, Google Workspace integration
• **Mattermost:** Open-source, developer-friendly

**COMPETITIVE ADVANTAGES BY PLAYER:**

🎯 **Slack**
• Best-in-class user experience design
• 2,000+ integrations marketplace
• Strong developer community

🏢 **Microsoft Teams**
• Bundled with Office 365 (huge advantage)
• Enterprise security and compliance
• Aggressive pricing strategy

🎮 **Discord**
• Persistent voice channels innovation
• Gaming/creative community dominance
• Freemium model success

📹 **Zoom**
• Superior video quality and reliability
• Simple, intuitive interface
• Strong brand recognition

**KEY INSIGHT:** Each competitor owns a specific niche - your opportunity lies in finding an underserved segment or creating a better hybrid solution.
`,
        suggestions: [
          "Which competitor should I be most worried about?",
          "What's the biggest gap in the current market?",
          "How do these competitors acquire new customers?",
          "What's each competitor's main weakness I can exploit?"
        ]
      };
    }
    
    // Pricing questions
    if (message.includes('price') || message.includes('pricing') || message.includes('cost')) {
      const pricingInfo = competitors.map(c => `${c.name}: ${c.pricing.startingPrice} ${c.pricing.currency} (${c.pricing.model})`).join(', ');
      return {
        content: `## 💰 **COMPETITIVE PRICING ANALYSIS**

**CURRENT PRICING LANDSCAPE:**

${competitors.map(c => `• **${c.name}:** ${c.pricing.startingPrice} ${c.pricing.currency} (${c.pricing.model})`).join('\n')}

**PRICING STRATEGY BREAKDOWN:**

🥇 **Premium Positioning (Slack)**
• $7.25/month starting price
• Justification: Superior UX + extensive integrations
• Target: Companies prioritizing user experience
• Success factor: Brand strength allows premium pricing

💪 **Aggressive Pricing (Microsoft Teams)**
• $4.00/month starting price
• Strategy: Bundle with Office 365 for competitive advantage
• Target: Cost-conscious enterprises
• Success factor: Ecosystem lock-in reduces price sensitivity

🆓 **Freemium Models (Discord, Mattermost)**
• Free tier with premium upgrades
• Strategy: High user acquisition, convert to paid
• Target: Price-sensitive users and communities
• Success factor: Network effects drive upgrades

**PRICING RECOMMENDATIONS FOR YOUR PRODUCT:**

🎯 **Sweet Spot:** $5-8/month for SMB market
• Undercuts Slack's premium pricing
• Offers more value than Teams' basic tier
• Positions above free alternatives

📊 **Pricing Psychology:**
• $6.99 feels significantly cheaper than $7.25
• Annual discounts (20%+) encourage longer commitments
• Clear feature differentiation between tiers
`,
        suggestions: [
          "What pricing model works best for my target market?",
          "How do I justify premium pricing against free alternatives?",
          "Should I offer a freemium model or paid-only?",
          "What's the optimal price point for my market segment?"
        ]
      };
    }
    
    // Feature questions
    if (message.includes('feature') || message.includes('functionality')) {
      return {
        content: `## ⚡ **FEATURE LANDSCAPE ANALYSIS**

**UNIVERSAL CORE FEATURES** (Table Stakes):
✅ Real-time messaging and chat
✅ Video conferencing capabilities
✅ File sharing and storage
✅ Basic integrations with popular tools
✅ User management and permissions

**COMPETITIVE DIFFERENTIATORS:**

🤖 **Slack's Unique Features**
• Workflow Builder (visual automation)
• Advanced search with filters
• Custom emoji and reactions
• Thread organization system

🏢 **Microsoft Teams' Advantages**
• Deep Office 365 integration
• SharePoint document collaboration
• Advanced meeting features (breakout rooms)
• Enterprise-grade security controls

🎮 **Discord's Innovations**
• Persistent voice channels (always-on)
• Server-based community structure
• Screen sharing with low latency
• Gaming-optimized voice quality

📹 **Zoom's Specialization**
• Superior video quality and compression
• Webinar and large meeting capabilities
• Virtual backgrounds and filters
• Recording and transcription features

**🎯 IDENTIFIED FEATURE GAPS** (Your Opportunities):

📱 **Mobile-First Experience**
• Current gap: All competitors designed desktop-first
• Opportunity: Native mobile experience with gesture controls

⚡ **Simplified Onboarding**
• Current gap: Complex setup processes (15+ minutes)
• Opportunity: One-click setup under 2 minutes

🏥 **Industry-Specific Features**
• Current gap: Generic solutions for all industries
• Opportunity: Healthcare, education, finance specializations

🧠 **Intuitive AI Integration**
• Current gap: AI feels like add-on feature
• Opportunity: AI-native design from ground up
`,
        suggestions: [
          "Which feature gap has the biggest market opportunity?",
          "How do I prioritize feature development against competitors?",
          "What features do users want that competitors don't offer?",
          "What's the minimum viable feature set to compete?"
        ]
      };
    }
    
    // Market questions
    if (message.includes('market') || message.includes('segment')) {
      const segment = productInput.marketSegment === 'b2b' ? 'B2B' : productInput.marketSegment === 'b2c' ? 'B2C' : 'your target';
      return {
        content: `## 📊 **${segment.toUpperCase()} MARKET ANALYSIS**

**MARKET FUNDAMENTALS:**
• **Total Market Size:** $47.2B globally (2024)
• **Growth Rate:** 12.3% CAGR through 2028
• **Projected Size:** $74.8B by 2028

**${segment.toUpperCase()} MARKET SPECIFICS:**

${segment === 'B2B' ? `
🏢 **B2B Market Dynamics**
• **Market Share:** $38.1B (81% of total market)
• **Key Drivers:** Remote work, digital transformation
• **Buyer Behavior:** Committee decisions, longer sales cycles
• **Price Sensitivity:** Medium (ROI-focused)

**B2B SEGMENTS BY SIZE:**
• Enterprise (1000+ employees): 45% of revenue
• Mid-market (100-999 employees): 35% of revenue  
• Small business (10-99 employees): 20% of revenue

**B2B COMPETITIVE INTENSITY:**
• High in enterprise (Microsoft, Slack dominate)
• Medium in mid-market (more fragmented)
• Low in small business (underserved)
` : segment === 'B2C' ? `
👥 **B2C Market Dynamics**
• **Market Share:** $9.1B (19% of total market)
• **Key Drivers:** Social connectivity, gaming, communities
• **Buyer Behavior:** Individual decisions, quick adoption
• **Price Sensitivity:** High (freemium models popular)

**B2C SEGMENTS:**
• Gaming communities: 40% of B2C market
• Social groups: 35% of B2C market
• Educational: 25% of B2C market

**B2C COMPETITIVE INTENSITY:**
• High in gaming (Discord dominates)
• Medium in social (fragmented)
• Low in education (emerging)
` : `
🎯 **MARKET SEGMENTATION GUIDANCE**
• **B2B Focus:** Higher revenue per user, longer retention
• **B2C Focus:** Faster growth, network effects
• **Hybrid Approach:** Freemium B2C → Premium B2B conversion
`}

**KEY MARKET TRENDS:**
• 📈 Remote work normalization (permanent shift)
• 🤖 AI integration becoming standard expectation
• 🔒 Security and compliance increasingly critical
• 📱 Mobile-first usage patterns emerging

**YOUR STRATEGIC POSITIONING:**
${segment} market offers significant opportunities in underserved niches, particularly industry-specific solutions and simplified user experiences.
`,
        suggestions: [
          `What's the best market entry strategy for ${segment}?`,
          "Which market segment has the least competition?",
          "How do I validate market demand before building?",
          "What's the customer acquisition cost in this market?"
        ]
      };
    }
    
    // Strategy questions
    if (message.includes('strategy') || message.includes('recommend') || message.includes('suggest')) {
      return {
        content: `## 🎯 **STRATEGIC RECOMMENDATIONS**

**TOP 5 STRATEGIC PRIORITIES** (Ranked by Impact × Feasibility):

**1. 📱 MOBILE-FIRST DESIGN STRATEGY**
• **Why:** All competitors are desktop-first, mobile is afterthought
• **Impact:** High - 60% of users prefer mobile for quick tasks
• **Feasibility:** High - No technical barriers
• **Timeline:** 3-6 months
• **Investment:** Medium

**2. 💰 SIMPLIFIED PRICING MODEL**
• **Why:** Competitors have confusing tier structures
• **Impact:** High - 40% of SMBs abandon due to pricing complexity
• **Feasibility:** High - Business model decision
• **Timeline:** Immediate
• **Investment:** Low

**3. 🏥 INDUSTRY SPECIALIZATION**
• **Why:** Generic solutions don't meet specific industry needs
• **Impact:** Medium-High - Premium pricing possible
• **Feasibility:** Medium - Requires domain expertise
• **Timeline:** 6-12 months
• **Investment:** High

**4. 🤖 AI-NATIVE APPROACH**
• **Why:** Competitors bolt AI onto existing platforms
• **Impact:** High - AI becoming table stakes
• **Feasibility:** Medium - Technical complexity
• **Timeline:** 9-18 months
• **Investment:** Very High

**5. ⚡ SUPERIOR ONBOARDING**
• **Why:** Competitors take 15+ minutes to get value
• **Impact:** Medium - Reduces churn, improves adoption
• **Feasibility:** High - UX/UI optimization
• **Timeline:** 2-4 months
• **Investment:** Medium

**RECOMMENDED EXECUTION ORDER:**
1. Start with pricing simplification (quick win)
2. Build mobile-first experience (competitive advantage)
3. Perfect onboarding flow (retention boost)
4. Choose industry specialization (market focus)
5. Integrate AI capabilities (future-proofing)
`,
        suggestions: [
          "How do I validate which strategy will work best?",
          "What's the minimum viable product for mobile-first approach?",
          "Which industry should I specialize in first?",
          "What's the timeline and budget for each strategy?"
        ]
      };
    }
    
    // Performance questions
    if (message.includes('performance') || message.includes('speed') || message.includes('reliability')) {
      return {
        content: `## ⚡ **PERFORMANCE BENCHMARKS ANALYSIS**

**UPTIME & RELIABILITY STANDARDS:**
• **Industry Standard:** 99.9% uptime (8.76 hours downtime/year)
• **Leaders:** Zoom (99.99%), Microsoft Teams (99.95%)
• **Laggards:** Smaller players often struggle with 99.5%

**DETAILED PERFORMANCE BREAKDOWN:**

🔍 **Slack Performance Profile**
• **Strengths:** Lightning-fast search (sub-second results)
• **Weaknesses:** Slows significantly with 10,000+ users
• **Memory usage:** High (500MB+ for large workspaces)
• **Load times:** 2-3 seconds average

🏢 **Microsoft Teams Performance**
• **Strengths:** Excellent Office integration speed
• **Weaknesses:** Resource-heavy (1GB+ RAM usage)
• **Video quality:** Good but inconsistent
• **Load times:** 4-5 seconds average

🎮 **Discord Performance Excellence**
• **Strengths:** Handles 100,000+ concurrent voice users
• **Low latency:** 20-40ms for voice
• **Efficient:** Lightweight client design
• **Weakness:** Text search slower than Slack

📹 **Zoom Performance Leadership**
• **Video quality:** Industry-leading compression
• **Bandwidth efficiency:** 50% better than competitors
• **Reliability:** Rarely drops calls
• **Weakness:** Limited text chat features

**🎯 PERFORMANCE OPPORTUNITIES:**

**1. Consistent Cross-Feature Performance**
• Gap: Most excel in one area, struggle in others
• Opportunity: Balanced excellence across all features

**2. Large Organization Optimization**
• Gap: Performance degrades with scale
• Opportunity: Architecture designed for 100,000+ users

**3. Mobile Performance Parity**
• Gap: Mobile apps 2-3x slower than desktop
• Opportunity: Mobile-native performance optimization

**TECHNICAL RECOMMENDATIONS:**
• Use modern web technologies (WebRTC, WebAssembly)
• Implement edge computing for global performance
• Design for horizontal scaling from day one
`,
        suggestions: [
          "What's the most important performance metric to optimize first?",
          "How do I ensure my platform scales better than competitors?",
          "What causes performance issues in large organizations?",
          "What's the technical architecture needed for 99.99% uptime?"
        ]
      };
    }
    
    // Security questions
    if (message.includes('security') || message.includes('privacy') || message.includes('compliance')) {
      return {
        content: `## 🔒 **SECURITY & COMPLIANCE LANDSCAPE**

**ENTERPRISE SECURITY REQUIREMENTS:**

📋 **Mandatory Compliance Standards**
• **SOC 2 Type II:** Required for enterprise sales
• **GDPR:** Essential for European market access
• **HIPAA:** Critical for healthcare sector
• **ISO 27001:** Preferred by large enterprises

**COMPETITOR SECURITY STANDINGS:**

🏆 **Security Leaders**
• **Microsoft Teams:** Full enterprise compliance suite
• **Cisco Webex:** Government-grade security features
• **Zoom:** Post-2020 security overhaul, now excellent

🔍 **Security Feature Comparison**
• **End-to-end encryption:** Zoom ✅, Teams ✅, Slack ❌ (enterprise only)
• **Advanced admin controls:** Teams ✅, Webex ✅, Discord ❌
• **Audit logging:** All enterprise players ✅
• **Single Sign-On (SSO):** Standard across enterprise tools

**🚨 IDENTIFIED SECURITY GAPS:**

**1. User-Friendly Security**
• **Problem:** Complex admin panels confuse non-technical users
• **Impact:** 67% of SMBs struggle with security setup
• **Opportunity:** Consumer-grade usability for enterprise security

**2. Transparent Privacy Practices**
• **Problem:** Unclear data usage policies
• **Impact:** Growing user concern about data privacy
• **Opportunity:** Clear, simple privacy communication

**3. Automated Compliance**
• **Problem:** Manual compliance management
• **Impact:** High operational overhead for IT teams
• **Opportunity:** One-click compliance setup

**SECURITY STRATEGY RECOMMENDATIONS:**

🎯 **"Security by Default" Approach**
• Enable all security features automatically
• No complex configuration required
• Clear visual indicators of security status

📊 **Compliance Automation**
• Automated audit trail generation
• One-click compliance reports
• Real-time compliance monitoring

🔐 **Zero-Trust Architecture**
• Assume no implicit trust
• Verify every user and device
• Continuous security monitoring
`,
        suggestions: [
          "What security features are most important for my target market?",
          "How do I achieve enterprise security without complexity?",
          "What compliance certifications should I prioritize first?",
          "What's the cost of achieving SOC 2 compliance?"
        ]
      };
    }
    
    // User experience questions
    if (message.includes('user') || message.includes('experience') || message.includes('usability')) {
      return {
        content: `## 🎨 **USER EXPERIENCE ANALYSIS**

**UX LEADERSHIP RANKINGS:**

🥇 **Slack - UX Gold Standard**
• **Strengths:** Intuitive interface, excellent information hierarchy
• **User satisfaction:** 4.4/5 stars average
• **Onboarding time:** 8-12 minutes average
• **Learning curve:** Gentle, progressive feature discovery

🥈 **Discord - Community UX Excellence**
• **Strengths:** Gaming-optimized interface, voice-first design
• **Innovation:** Persistent voice channels, server structure
• **User satisfaction:** 4.2/5 stars average
• **Weakness:** Can overwhelm business users

🥉 **Zoom - Simplicity Focus**
• **Strengths:** One-click meeting join, minimal interface
• **User satisfaction:** 4.1/5 stars average
• **Accessibility:** Excellent for non-technical users
• **Limitation:** Limited collaboration features

⚠️ **Microsoft Teams - Complexity Struggles**
• **Weaknesses:** Overwhelming interface, feature bloat
• **User complaints:** "Too many buttons," "Hard to find features"
• **Onboarding time:** 15-20 minutes average
• **Learning curve:** Steep, requires training

**🚨 COMMON UX PROBLEMS ACROSS COMPETITORS:**

**1. Interface Overwhelm**
• Too many features visible simultaneously
• Poor information hierarchy
• Cluttered navigation menus

**2. Mobile Experience Failures**
• Desktop interfaces poorly adapted for mobile
• Touch targets too small
• Inconsistent mobile vs desktop features

**3. Complex Onboarding Processes**
• Average setup time: 15+ minutes
• Multiple steps with unclear progress
• Feature discovery happens by accident

**4. Notification Fatigue**
• Poor notification management
• No intelligent filtering
• Users disable notifications entirely

**🎯 YOUR UX COMPETITIVE ADVANTAGES:**

**1. Radical Simplicity**
• Hide advanced features until needed
• Progressive disclosure of complexity
• One primary action per screen

**2. Mobile-First Design**
• Touch-optimized interface
• Gesture-based navigation
• Feature parity across devices

**3. Sub-5-Minute Onboarding**
• Value delivered in first 2 minutes
• Smart defaults eliminate configuration
• Interactive tutorials, not documentation

**4. Intelligent Notifications**
• AI-powered notification prioritization
• Context-aware delivery timing
• User-controlled notification intelligence
`,
        suggestions: [
          "What specific UX improvements would have the biggest impact?",
          "How do I design for both power users and beginners?",
          "What UX metrics should I track against competitors?",
          "How do I test my UX against competitor interfaces?"
        ]
      };
    }
    
    // Integration questions
    if (message.includes('integration') || message.includes('api') || message.includes('connect')) {
      return {
        content: `## 🔗 **INTEGRATION ECOSYSTEM ANALYSIS**

**INTEGRATION MARKETPLACE LEADERS:**

🏆 **Slack - Integration King**
• **Total integrations:** 2,000+ apps
• **Strategy:** Open API, developer-friendly
• **Revenue share:** 30% from app marketplace
• **Top categories:** Productivity, CRM, Development

🏢 **Microsoft Teams - Ecosystem Leverage**
• **Total integrations:** 1,000+ apps
• **Strategy:** Office 365 ecosystem dominance
• **Advantage:** Native Microsoft app integration
• **Weakness:** Third-party integration complexity

📊 **Other Players**
• **Google Meet:** 500+ integrations (Google Workspace focus)
• **Discord:** 300+ bots and integrations (gaming focus)
• **Zoom:** 200+ integrations (video-centric)
• **Mattermost:** 100+ integrations (open-source)

**🎯 CRITICAL INTEGRATION CATEGORIES:**

**Tier 1 - Essential (Must Have)**
• **CRM:** Salesforce, HubSpot, Pipedrive
• **Project Management:** Asana, Trello, Monday.com
• **Development:** GitHub, GitLab, Jira
• **File Storage:** Google Drive, Dropbox, OneDrive

**Tier 2 - Important (Should Have)**
• **Calendar:** Google Calendar, Outlook, Calendly
• **Design:** Figma, Adobe Creative Suite
• **Analytics:** Google Analytics, Mixpanel
• **Support:** Zendesk, Intercom, Freshdesk

**Tier 3 - Nice to Have**
• **Social Media:** Twitter, LinkedIn
• **E-commerce:** Shopify, WooCommerce
• **Marketing:** Mailchimp, Constant Contact

**🚀 INTEGRATION STRATEGY RECOMMENDATIONS:**

**Quality Over Quantity Approach**
• Focus on top 50 integrations with flawless execution
• Better than 2,000 mediocre integrations
• Deep, native-feeling integrations vs basic webhooks

**No-Code Integration Builder**
• Visual workflow builder (like Zapier)
• Pre-built templates for common use cases
• User-friendly integration setup

**API-First Architecture**
• Comprehensive REST and GraphQL APIs
• Webhook support for real-time updates
• Developer-friendly documentation

**Partnership Strategy**
• Direct partnerships with top 20 tools
• Co-marketing opportunities
• Shared customer success initiatives
`,
        suggestions: [
          "Which integrations should I build first for maximum impact?",
          "How do I create better integrations than Slack?",
          "What's the best way to attract third-party developers?",
          "How do I build a developer ecosystem around my product?"
        ]
      };
    }
    
    // Default comprehensive response
    return {
      content: `## 🎯 **COMPETITIVE INTELLIGENCE ASSISTANT**

Welcome! I'm your strategic analysis expert, ready to provide detailed insights about your competitive landscape.

**📊 AVAILABLE ANALYSIS AREAS:**
    
🛡️ **SWOT Analysis**
• Comprehensive strengths, weaknesses, opportunities, and threats
• Evidence-based insights for each competitor
• Strategic implications and recommendations

💰 **Pricing Intelligence**
• Competitive pricing breakdown and analysis
• Market positioning strategies
• Pricing optimization recommendations

⚡ **Feature Gap Analysis**
• Detailed feature comparison matrix
• Unmet market needs identification
• Product development priorities

📊 **Market Positioning**
• Competitor positioning strategies
• Market segment analysis
• Differentiation opportunities

🎯 **Strategic Recommendations**
• Actionable business strategy insights
• Go-to-market recommendations
• Competitive advantage development

🚀 **Performance Benchmarks**
• Technical performance comparisons
• User experience analysis
• Optimization opportunities

🔒 **Security & Compliance**
• Security feature comparisons
• Compliance requirement analysis
• Risk assessment and mitigation

**CURRENT ANALYSIS SCOPE:**
• **Your Product:** ${productInput?.productName || 'Your Product'}
• **Market Segment:** ${productInput?.marketSegment?.replace('_', ' ').toUpperCase() || 'Not specified'}
• **Tracked Competitors:** ${competitors.length} companies
• **Analysis Depth:** Comprehensive strategic intelligence
    
**🎯 SUGGESTED STARTING POINTS:**
• "What are [competitor name]'s main weaknesses?"
• "What pricing strategy should I consider?"
• "Which market opportunities should I pursue first?"
• "How can I differentiate from existing competitors?"`,
      suggestions: [
        "What are the biggest opportunities in this market?",
        "Which competitor should I be most concerned about?",
        "What features do users want that competitors don't offer?",
        "How should I price my product competitively?"
      ]
    };
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessageWithSuggestions = {
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
      const response = generateResponse(inputMessage);
      const assistantMessage: ChatMessageWithSuggestions = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response.content,
        timestamp: new Date(),
        suggestions: response.suggestions
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

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
    // Auto-send the suggestion
    setTimeout(() => handleSendMessage(), 100);
  };

  const quickQuestions = [
    { icon: Shield, text: "Competitor strengths", query: "What are the main strengths of my competitors?" },
    { icon: AlertTriangle, text: "Market threats", query: "What threats should I be aware of in this market?" },
    { icon: TrendingUp, text: "Growth opportunities", query: "What opportunities exist for growth and differentiation?" },
    { icon: Target, text: "Strategic recommendations", query: "What strategic recommendations do you have?" },
    { icon: BarChart3, text: "Pricing strategy", query: "How should I position my pricing against competitors?" },
    { icon: Zap, text: "Feature gaps", query: "What feature gaps exist that I could exploit?" }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-white border-l border-gray-200 shadow-lg z-50 flex flex-col">
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
                <div className="text-xs leading-relaxed whitespace-pre-wrap prose prose-xs max-w-none">
                  {message.content.split('\n').map((line, index) => {
                    // Handle markdown-style formatting
                    if (line.startsWith('## ')) {
                      return <div key={index} className="font-bold text-sm mt-2 mb-1">{line.replace('## ', '')}</div>;
                    }
                    if (line.startsWith('**') && line.endsWith('**')) {
                      return <div key={index} className="font-semibold mt-1">{line.replace(/\*\*/g, '')}</div>;
                    }
                    if (line.startsWith('• ')) {
                      return <div key={index} className="ml-2">{line}</div>;
                    }
                    if (line.startsWith('---')) {
                      return <hr key={index} className="my-2 border-gray-300" />;
                    }
                    if (line.trim() === '') {
                      return <div key={index} className="h-1"></div>;
                    }
                    return <div key={index}>{line}</div>;
                  })}
                </div>
                <p className={`text-xs mt-1 opacity-70`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
            
            {/* Follow-up Suggestions */}
            {message.type === 'assistant' && message.suggestions && (
              <div className="mt-3 space-y-1">
                {message.suggestions.map((suggestion, suggestionIndex) => (
                  <button
                    key={suggestionIndex}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="flex items-center space-x-2 w-full p-2 text-left text-xs text-blue-600 hover:bg-blue-50 rounded-md transition-colors border border-blue-200 hover:border-blue-300"
                  >
                    <ChevronRight className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{suggestion}</span>
                  </button>
                ))}
              </div>
            )}
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
                  onClick={() => handleSuggestionClick(question.query)}
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