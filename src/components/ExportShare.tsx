import React, { useState } from 'react';
import { Download, Mail, FileText, Share2, Printer, Calendar, CheckCircle } from 'lucide-react';
import { ProductInput, Competitor } from '../types';

interface ExportShareProps {
  productInput: ProductInput;
  competitors: Competitor[];
}

export default function ExportShare({ productInput, competitors }: ExportShareProps) {
  const [exportFormat, setExportFormat] = useState<'pdf' | 'docx' | 'pptx'>('pdf');
  const [emailRecipients, setEmailRecipients] = useState('');
  const [includeSwot, setIncludeSwot] = useState(true);
  const [includeComparison, setIncludeComparison] = useState(true);
  const [includeSuggestions, setIncludeSuggestions] = useState(true);
  const [includeProfiles, setIncludeProfiles] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [isEmailSending, setIsEmailSending] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const exportOptions = [
    { value: 'pdf', label: 'PDF Report', icon: FileText, description: 'Comprehensive PDF document' },
    { value: 'docx', label: 'Word Document', icon: FileText, description: 'Editable Word document' },
    { value: 'pptx', label: 'PowerPoint', icon: Printer, description: 'Presentation slides' }
  ];

  const handleExport = async () => {
    setIsExporting(true);
    setExportComplete(false);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsExporting(false);
    setExportComplete(true);
  };

  const handleEmailShare = async () => {
    if (!emailRecipients.trim()) return;
    
    setIsEmailSending(true);
    setEmailSent(false);
    
    // Simulate email sending
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsEmailSending(false);
    setEmailSent(true);
  };

  const getSectionCount = () => {
    let count = 0;
    if (includeProfiles) count++;
    if (includeSwot) count++;
    if (includeComparison) count++;
    if (includeSuggestions) count++;
    return count;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Export & Share Reports</h2>
        <p className="text-gray-600 mt-1">Generate and share comprehensive competitor analysis reports</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Export Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Download className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Export Report</h3>
          </div>

          {/* Format Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Export Format
            </label>
            <div className="space-y-2">
              {exportOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <label
                    key={option.value}
                    className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                      exportFormat === option.value
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="exportFormat"
                      value={option.value}
                      checked={exportFormat === option.value}
                      onChange={(e) => setExportFormat(e.target.value as any)}
                      className="sr-only"
                    />
                    <Icon className={`w-5 h-5 ${
                      exportFormat === option.value ? 'text-blue-600' : 'text-gray-400'
                    }`} />
                    <div>
                      <div className="font-medium text-gray-900">{option.label}</div>
                      <div className="text-sm text-gray-500">{option.description}</div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Content Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Include Sections
            </label>
            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeProfiles}
                  onChange={(e) => setIncludeProfiles(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">Competitor Profiles</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeSwot}
                  onChange={(e) => setIncludeSwot(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">SWOT Analysis</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeComparison}
                  onChange={(e) => setIncludeComparison(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">Feature Comparison</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeSuggestions}
                  onChange={(e) => setIncludeSuggestions(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">Enhancement Suggestions</span>
              </label>
            </div>
          </div>

          {/* Export Button */}
          <button
            onClick={handleExport}
            disabled={isExporting || getSectionCount() === 0}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {isExporting ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                <span>Generating Report...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Export {exportFormat.toUpperCase()}</span>
              </>
            )}
          </button>

          {exportComplete && (
            <div className="mt-4 flex items-center space-x-2 text-green-600">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Report exported successfully!</span>
            </div>
          )}
        </div>

        {/* Email Sharing */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Mail className="w-6 h-6 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Email Share</h3>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recipients (comma-separated)
            </label>
            <textarea
              value={emailRecipients}
              onChange={(e) => setEmailRecipients(e.target.value)}
              placeholder="john@company.com, sarah@company.com"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent resize-none"
            />
          </div>

          <button
            onClick={handleEmailShare}
            disabled={!emailRecipients.trim() || isEmailSending}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {isEmailSending ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                <span>Sending Email...</span>
              </>
            ) : (
              <>
                <Mail className="w-4 h-4" />
                <span>Send Report</span>
              </>
            )}
          </button>

          {emailSent && (
            <div className="mt-4 flex items-center space-x-2 text-green-600">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Email sent successfully!</span>
            </div>
          )}
        </div>
      </div>

      {/* Report Preview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <FileText className="w-6 h-6 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900">Report Preview</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Report Stats */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Report Contents</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Product</span>
                <span className="font-medium text-gray-900">
                  {productInput.productName || 'Your Product'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Competitors</span>
                <span className="font-medium text-gray-900">{competitors.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Sections</span>
                <span className="font-medium text-gray-900">{getSectionCount()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Market Segment</span>
                <span className="font-medium text-gray-900 capitalize">
                  {productInput.marketSegment.replace('_', ' ')}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Quick Actions</h4>
            <div className="space-y-2">
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-700">Schedule Regular Reports</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Share2 className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-700">Share via Link</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Printer className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-700">Print Preview</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Report will include:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {includeProfiles && <li>• Detailed competitor profiles with key metrics and contact information</li>}
            {includeSwot && <li>• Comprehensive SWOT analysis for each tracked competitor</li>}
            {includeComparison && <li>• Feature-by-feature comparison matrix with visual indicators</li>}
            {includeSuggestions && <li>• Actionable enhancement suggestions based on competitive analysis</li>}
          </ul>
        </div>
      </div>
    </div>
  );
}