import React, { useState } from 'react';
import { Bell, Mail, Clock, TrendingUp, DollarSign, Zap, Building2, Heart, AlertCircle } from 'lucide-react';
import { Competitor, NotificationRule, WeeklyDigest, CompetitorUpdate } from '../types';

interface NotificationSettingsProps {
  competitors: Competitor[];
}

export default function NotificationSettings({ competitors }: NotificationSettingsProps) {
  const [monitoringEnabled, setMonitoringEnabled] = useState(true);

  const [emailSettings, setEmailSettings] = useState({
    weeklyDigest: true,
    instantAlerts: false,
    monthlyReport: true,
    email: 'user@example.com'
  });

  // Mock weekly digest data
  const weeklyDigest: WeeklyDigest = {
    week: 'Jan 15-21, 2024',
    updates: [
      {
        competitorId: 'slack',
        type: 'feature',
        title: 'Slack introduces AI-powered message summarization',
        description: 'New AI feature automatically summarizes long message threads and highlights key decisions made in channels.',
        date: '2024-01-18',
        url: 'https://slack.com/blog/ai-features'
      },
      {
        competitorId: 'microsoft-teams',
        type: 'pricing',
        title: 'Microsoft Teams reduces pricing for small businesses',
        description: 'New starter plan at $3/month for businesses under 50 employees, down from previous $4/month.',
        date: '2024-01-16',
      },
      {
        competitorId: 'zoom',
        type: 'release',
        title: 'Zoom releases major security update',
        description: 'Enhanced end-to-end encryption and new admin controls for enterprise customers.',
        date: '2024-01-19',
      },
      {
        competitorId: 'discord',
        type: 'partnership',
        title: 'Discord partners with Spotify for music integration',
        description: 'New integration allows users to share and listen to music together in voice channels.',
        date: '2024-01-17',
      }
    ]
  };

  const notificationTypes = {
    pricing: { icon: DollarSign, label: 'Pricing Changes', color: 'text-green-600', bg: 'bg-green-50' },
    features: { icon: Zap, label: 'New Features', color: 'text-blue-600', bg: 'bg-blue-50' },
    releases: { icon: TrendingUp, label: 'Product Releases', color: 'text-purple-600', bg: 'bg-purple-50' },
    funding: { icon: Building2, label: 'Funding & Acquisitions', color: 'text-orange-600', bg: 'bg-orange-50' },
    partnerships: { icon: Heart, label: 'Partnerships', color: 'text-pink-600', bg: 'bg-pink-50' }
  };

  const updateTypes = {
    pricing: { icon: DollarSign, color: 'text-green-600' },
    feature: { icon: Zap, color: 'text-blue-600' },
    release: { icon: TrendingUp, color: 'text-purple-600' },
    funding: { icon: Building2, color: 'text-orange-600' },
    partnership: { icon: Heart, color: 'text-pink-600' }
  };

  const toggleRule = (ruleId: string) => {
    setNotificationRules(rules => 
      rules.map(rule => 
        rule.id === ruleId 
          ? { ...rule, enabled: !rule.enabled }
          : rule
      )
    );
  };

  const updateRuleCompetitors = (ruleId: string, competitorId: string, enabled: boolean) => {
    setNotificationRules(rules =>
      rules.map(rule => {
        if (rule.id === ruleId) {
          const competitors = enabled
            ? [...rule.competitors, competitorId]
            : rule.competitors.filter(id => id !== competitorId);
          return { ...rule, competitors };
        }
        return rule;
      })
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Monitoring & Notifications</h2>
        <p className="text-gray-600 mt-1">Stay informed about your competitors' latest moves</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monitoring Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Bell className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Competitor Monitoring</h3>
          </div>

          <div className="space-y-6">
            {/* Master Toggle */}
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Automatic Monitoring</h4>
                <p className="text-sm text-gray-600">
                  Monitor all {competitors.length} competitors for any updates
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={monitoringEnabled}
                  onChange={(e) => setMonitoringEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Monitored Competitors */}
            {monitoringEnabled && (
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Monitored Competitors</h4>
                <div className="grid grid-cols-1 gap-3">
                  {competitors.map((competitor) => (
                    <div key={competitor.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Building2 className="w-4 h-4 text-gray-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{competitor.name}</div>
                          <div className="text-sm text-gray-500">All updates monitored</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-green-600 font-medium">Active</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Monitoring Types */}
            {monitoringEnabled && (
              <div>
                <h4 className="font-medium text-gray-900 mb-3">What We Monitor</h4>
                <div className="grid grid-cols-1 gap-2">
                  {Object.entries(notificationTypes).map(([key, config]) => {
                    const Icon = config.icon;
                    return (
                      <div key={key} className="flex items-center space-x-3 p-2">
                        <div className={`w-6 h-6 ${config.bg} rounded-md flex items-center justify-center`}>
                          <Icon className={`w-3 h-3 ${config.color}`} />
                        </div>
                        <span className="text-sm text-gray-700">{config.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Email Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Mail className="w-6 h-6 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Email Settings</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={emailSettings.email}
                onChange={(e) => setEmailSettings(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>

            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailSettings.weeklyDigest}
                  onChange={(e) => setEmailSettings(prev => ({ ...prev, weeklyDigest: e.target.checked }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <div className="font-medium text-gray-900">Weekly Digest</div>
                  <div className="text-sm text-gray-500">Summary of all competitor updates</div>
                </div>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailSettings.instantAlerts}
                  onChange={(e) => setEmailSettings(prev => ({ ...prev, instantAlerts: e.target.checked }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <div className="font-medium text-gray-900">Instant Alerts</div>
                  <div className="text-sm text-gray-500">Real-time notifications for critical updates</div>
                </div>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailSettings.monthlyReport}
                  onChange={(e) => setEmailSettings(prev => ({ ...prev, monthlyReport: e.target.checked }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <div className="font-medium text-gray-900">Monthly Report</div>
                  <div className="text-sm text-gray-500">Comprehensive analysis and trends</div>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Updates Preview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Clock className="w-6 h-6 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">Recent Updates</h3>
          </div>
          <span className="text-sm text-gray-500">Week of {weeklyDigest.week}</span>
        </div>

        <div className="space-y-4">
          {weeklyDigest.updates.map((update, index) => {
            const competitor = competitors.find(c => c.id === update.competitorId);
            const typeConfig = updateTypes[update.type];
            const Icon = typeConfig.icon;

            return (
              <div key={index} className="flex items-start space-x-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className={`w-4 h-4 ${typeConfig.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-gray-900">{competitor?.name}</h4>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-500">{update.date}</span>
                  </div>
                  <h5 className="font-medium text-gray-800 mb-1">{update.title}</h5>
                  <p className="text-sm text-gray-600">{update.description}</p>
                  {update.url && (
                    <a
                      href={update.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium mt-1 inline-block"
                    >
                      Read more →
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-blue-400 flex-shrink-0" />
            <div className="ml-3">
              <h4 className="text-sm font-medium text-blue-800">
                Stay Ahead of the Competition
              </h4>
              <p className="mt-1 text-sm text-blue-700">
                Enable notifications to never miss important updates from your competitors. Configure your preferences above to receive personalized alerts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}