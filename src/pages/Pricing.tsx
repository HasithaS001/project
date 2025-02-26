import React, { useState } from 'react';
import { Check, X, ChevronDown, ChevronUp } from 'lucide-react';
import Footer from '../components/Footer';

const PricingPage = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const features = {
    free: [
      '5 AI Writing Generations per Day',
      'Basic Grammar & Spell Checker',
      'Basic Paraphraser (Limited)',
      'AI Summarizer (Limited)',
      'Tone Detector (Basic)',
      'Plagiarism Checker',
      'AI Humanizer',
    ],
    pro: [
      'Unlimited AI Writing',
      'Advanced Grammar & Spell Checker',
      'Paraphraser (5+ Writing Styles)',
      'AI Summarizer (Full-Length)',
      'Tone Detector & Converter (All Tones)',
      'AI Humanizer (Bypass AI Detection)',
      'Plagiarism Checker (10 Scans/Month)',
      'SEO & Readability Score Checker',
      'AI Translator (20+ Languages)',
    ],
  };

  const detailedFeatures = [
    {
      category: 'AI Writing',
      features: [
        { name: 'Daily AI Generations', free: '5 per day', pro: 'Unlimited' },
        { name: 'Writing Templates', free: 'Basic Templates', pro: 'All Premium Templates' },
        { name: 'Maximum Output Length', free: '300 words', pro: '3000 words' },
        { name: 'Writing Styles', free: '2 styles', pro: '10+ styles' },
      ]
    },
    {
      category: 'Grammar & Style',
      features: [
        { name: 'Grammar Checking', free: 'Basic', pro: 'Advanced' },
        { name: 'Style Suggestions', free: 'Limited', pro: 'Comprehensive' },
        { name: 'Tone Detection', free: '3 tones', pro: '20+ tones' },
        { name: 'Writing Statistics', free: 'Basic', pro: 'Advanced Analytics' },
      ]
    },
    {
      category: 'Advanced Features',
      features: [
        { name: 'Plagiarism Detection', free: '100 words/scan', pro: '3000 words/scan' },
        { name: 'AI Detection Bypass', free: 'Basic', pro: 'Advanced' },
        { name: 'Language Translation', free: '2 languages', pro: '20+ languages' },
        { name: 'SEO Optimization', free: 'Basic', pro: 'Advanced' },
      ]
    },
  ];

  const faqs = [
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Google Pay for your convenience.'
    },
    {
      question: 'Can I upgrade or downgrade my plan at any time?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will take effect immediately, and we\'ll prorate any payments.'
    },
    {
      question: 'Is there a free trial for the Pro plan?',
      answer: 'Yes, we offer a 7-day free trial of our Pro plan. You can experience all premium features without any commitment.'
    },
    {
      question: 'What happens when I reach my daily limit on the Free plan?',
      answer: 'When you reach your daily limit, you\'ll need to wait until the next day for your limit to reset, or you can upgrade to the Pro plan for unlimited access.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'Yes, we offer a 30-day money-back guarantee if you\'re not satisfied with our Pro plan.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col">
      <div className="flex-grow container mx-auto px-4 py-20">
        {/* Pricing Cards Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#0064bf] to-[#9234ea] bg-clip-text text-transparent">
            Choose Your Plan
          </h1>
          <p className="text-gray-600 text-lg">
            Select the perfect plan for your writing needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-20">
          {/* Free Plan */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">🚀 Free Plan</h2>
              <div className="text-4xl font-bold mb-4">$0<span className="text-lg text-gray-500">/mo</span></div>
              <button className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-[#0064bf] to-[#9234ea] text-white font-semibold hover:opacity-90 transition-opacity">
                Get Started
              </button>
            </div>
            <div className="space-y-4">
              {features.free.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <Check className="h-5 w-5 text-[#0064bf] mr-3" />
                  <span className="text-gray-600">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pro Plan */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-[#9234ea] hover:shadow-xl transition-shadow relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-gradient-to-r from-[#0064bf] to-[#9234ea] text-white px-3 py-1 rounded-full text-sm font-medium">
              Popular
            </div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">⭐ Pro Plan</h2>
              <div className="text-4xl font-bold mb-4">$19<span className="text-lg text-gray-500">/mo</span></div>
              <button className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-[#0064bf] to-[#9234ea] text-white font-semibold hover:opacity-90 transition-opacity">
                Upgrade Now
              </button>
            </div>
            <div className="space-y-4">
              {features.pro.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <Check className="h-5 w-5 text-[#9234ea] mr-3" />
                  <span className="text-gray-600">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Feature Comparison */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Detailed Feature Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="py-4 px-6 text-left">Feature</th>
                  <th className="py-4 px-6 text-center">Free Plan</th>
                  <th className="py-4 px-6 text-center">Pro Plan</th>
                </tr>
              </thead>
              <tbody>
                {detailedFeatures.map((category, categoryIndex) => (
                  <React.Fragment key={categoryIndex}>
                    <tr className="bg-gray-50">
                      <td colSpan={3} className="py-3 px-6 font-semibold text-[#0064bf]">
                        {category.category}
                      </td>
                    </tr>
                    {category.features.map((feature, featureIndex) => (
                      <tr key={featureIndex} className="border-b border-gray-100">
                        <td className="py-4 px-6">{feature.name}</td>
                        <td className="py-4 px-6 text-center">{feature.free}</td>
                        <td className="py-4 px-6 text-center text-[#9234ea] font-medium">{feature.pro}</td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center"
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                >
                  <span className="font-medium">{faq.question}</span>
                  {openFaqIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                {openFaqIndex === index && (
                  <div className="px-6 pb-4 text-gray-600">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PricingPage;
