import React, { useState } from 'react';
import { Search, Link, FileText, Building2, Users, HelpCircle, Globe } from 'lucide-react';
import { ProductInput } from '../types';

interface InputFormProps {
  onSubmit: (input: ProductInput) => void;
}

export default function InputForm({ onSubmit }: InputFormProps) {
  const [formData, setFormData] = useState<ProductInput>({
    productName: '',
    productUrl: '',
    productDescription: '',
    marketSegment: 'not_sure',
  });

  const [activeInput, setActiveInput] = useState<'name' | 'url' | 'description'>('name');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.productName && !formData.productUrl && !formData.productDescription) {
      return;
    }
    onSubmit(formData);
  };

  const inputOptions = [
    {
      id: 'name',
      icon: Search,
      title: 'Product Name',
      description: 'Enter your product name for analysis',
      placeholder: 'e.g., Slack, Salesforce, Shopify',
    },
    {
      id: 'url',
      icon: Link,
      title: 'Product URL',
      description: 'Provide your product website URL',
      placeholder: 'https://yourproduct.com',
    },
    {
      id: 'description',
      icon: FileText,
      title: 'Product Description',
      description: 'Describe your product and its main features',
      placeholder: 'A cloud-based CRM platform that helps businesses manage customer relationships...',
    },
  ];

  const marketSegments = [
    {
      value: 'b2b',
      icon: Building2,
      title: 'B2B (Business to Business)',
      description: 'Your product serves other businesses',
    },
    {
      value: 'b2c',
      icon: Users,
      title: 'B2C (Business to Consumer)',
      description: 'Your product serves individual consumers',
    },
    {
      value: 'not_sure',
      icon: HelpCircle,
      title: 'Not Sure',
      description: 'Let us help determine your market segment',
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Tell us about your product
          </h2>
          <p className="text-gray-600">
            Provide product information to discover and analyze your competitors
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Product Information */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.productName}
                    onChange={(e) => setFormData(prev => ({ ...prev, productName: e.target.value }))}
                    placeholder="e.g., Slack, Salesforce, Shopify"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product URL
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="url"
                    value={formData.productUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, productUrl: e.target.value }))}
                    placeholder="https://yourproduct.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Description
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <textarea
                  value={formData.productDescription}
                  onChange={(e) => setFormData(prev => ({ ...prev, productDescription: e.target.value }))}
                  placeholder="Describe your product and its main features..."
                  rows={4}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
                />
              </div>
            </div>
          </div>

          {/* Market Segment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Market Segment
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {marketSegments.map((segment) => {
                const Icon = segment.icon;
                return (
                  <label
                    key={segment.value}
                    className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      formData.marketSegment === segment.value
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="marketSegment"
                      value={segment.value}
                      checked={formData.marketSegment === segment.value}
                      onChange={(e) => setFormData(prev => ({ ...prev, marketSegment: e.target.value as any }))}
                      className="sr-only"
                    />
                    <Icon className={`w-6 h-6 mb-2 ${
                      formData.marketSegment === segment.value ? 'text-blue-600' : 'text-gray-400'
                    }`} />
                    <h3 className="font-medium text-gray-900">{segment.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{segment.description}</p>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!formData.productName && !formData.productUrl && !formData.productDescription}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Find Competitors
          </button>
        </form>
      </div>
    </div>
  );
}