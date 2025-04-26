import React from "react";
import Link from "next/link";

const TermsPage = () => {
  const termsCards = [
    {
      icon: "🎨",
      title: "Service",
      description: "SketchThumb transforms your sketches into professional thumbnails using advanced AI technology."
    },
    {
      icon: "💰",
      title: "Payment",
      description: "We process payments securely through Stripe with transparent pricing based on your subscription plan."
    },
    {
      icon: "♻️",
      title: "Refunds",
      description: "We offer a 24-hour money-back guarantee if you're not satisfied with our service."
    },
    {
      icon: "🔐",
      title: "User Data",
      description: "You retain all rights to your sketches and the resulting thumbnails. We may use anonymized data to improve our AI."
    },
    {
      icon: "📋",
      title: "User Responsibility",
      description: "Users must ensure they have the right to submit sketches and maintain account security."
    },
    {
      icon: "🔄",
      title: "Service Changes",
      description: "We may modify our service at any time, with notice provided for significant changes."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-32">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-2 bg-blue-600 rounded-full mb-6">
            <span className="text-3xl">📝</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
            Terms of Service
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Simple, transparent terms for using SketchThumb
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {termsCards.map((card, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-blue-100 flex flex-col"
            >
              <div className="text-3xl mb-3">{card.icon}</div>
              <h2 className="text-xl font-semibold text-blue-700 mb-2">{card.title}</h2>
              <p className="text-gray-600 flex-grow">{card.description}</p>
            </div>
          ))}
        </div>

        {/* Footer Section */}
        <div className="bg-white rounded-xl p-8 shadow-lg border border-blue-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-semibold text-blue-700 mb-2">Questions?</h2>
              <p className="text-gray-600">
                Contact us at <a href="mailto:ouchen606@gmail.com" className="text-blue-600 hover:underline">ouchen606@gmail.com</a>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/privacy" 
                className="px-6 py-3 bg-transparent border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition-colors text-center"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/" 
                className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors text-center"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>

        {/* Last Updated */}
        <div className="mt-8 text-center text-sm text-gray-500">
          Last updated: April 2025
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
