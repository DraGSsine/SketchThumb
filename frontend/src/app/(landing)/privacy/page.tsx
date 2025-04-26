import React from "react";
import Image from "next/image";

const PrivacyPage = () => {
  const privacyItems = [
    {
      icon: "🔒",
      title: "Data Security",
      description: "Your sketches and account information are secure with industry-standard encryption."
    },
    {
      icon: "📧",
      title: "Limited Information",
      description: "We only collect what's needed: your email and securely encrypted password."
    },
    {
      icon: "💳",
      title: "Secure Payments",
      description: "All payments are processed securely through Stripe with no card details stored on our servers."
    },
    {
      icon: "🔐",
      title: "Your Privacy Matters",
      description: "We don't sell your data. Your sketches and generated thumbnails belong to you."
    }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-32">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-2 bg-blue-600 rounded-full mb-6">
            <span className="text-3xl">🔒</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
            Privacy Policy
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            We keep it simple. Your privacy is important to us, and we're committed to protecting it.
          </p>
        </div>

        {/* Policy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {privacyItems.map((item, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-blue-100"
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <h2 className="text-xl font-semibold text-blue-700 mb-2">{item.title}</h2>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-xl p-8 shadow-lg border border-blue-100 text-center">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Questions?</h2>
          <p className="text-gray-600 mb-4">
            We're here to help with any concerns about your privacy.
          </p>
          <a 
            href="mailto:ouchen606@gmail.com" 
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
