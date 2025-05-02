"use client"
import React, { useState } from 'react';
import { Check, Bolt, Gem, Fire } from '../../../public/icons/SvgIcons';
import { api } from '@/lib/axios';
import { useUserInfo } from '@/lib/queries';

interface PricingCardProps {
  pack: {
    name: string;
    price: string;
    credits: number;
    features: string[];
    buttonText: string;
    buttonVariant: string;
    popular?: boolean;
    delay: string;
  };
  onSelect: (packName: string, credits: number, price: number) => void;
  isLoading: boolean;
  selectedPack: string;
}

const PricingCard: React.FC<PricingCardProps> = ({
  pack,
  onSelect,
  isLoading,
  selectedPack,
}) => {
  const isSelected = selectedPack === pack.name;

  return (
    <div 
      className="opacity-0 animate-fade-in flex h-full"
      style={{ animationDelay: pack.delay, animationFillMode: "forwards" }}
    >
      <div className={`relative flex flex-col w-full rounded-2xl transition-all duration-300 hover:scale-[1.03] hover:shadow-xl ${
        pack.popular 
          ? 'bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-lg shadow-blue-500/30 border-2 border-blue-400' 
          : 'bg-white border border-slate-200 shadow-lg shadow-slate-200/50'
      }`}>
        {pack.popular && (
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-blue-600 text-xs px-4 py-1.5 rounded-full font-bold shadow-sm border border-blue-200">
              Most Popular
          </div>
        )}
        
        <div className="p-6 md:p-8 flex flex-col h-full">
          <div>
            <div className={`w-14 h-14 rounded-xl mb-4 flex items-center justify-center transform transition-transform duration-500 hover:rotate-12 ${
              pack.popular ? "bg-white/20 text-white" : "bg-blue-50 text-blue-600"
            }`}>
              {pack.name === "Basic" ? <Fire className="w-7 h-7" iconSecondary={pack.popular ? '#fff' : '#2563eb'} iconPrimary={pack.popular ? '#fff' : '#2563eb'}/> :
               pack.name === "Standard" ? <Bolt className="w-7 h-7" iconPrimary={pack.popular ? '#fff' : '#2563eb'} /> :
               <Gem className="w-7 h-7" iconPrimary={pack.popular ? '#fff' : '#2563eb'} />} 
            </div>

            <h3 className={`text-xl md:text-2xl font-bold mb-2 ${
              pack.popular ? "text-white" : "text-slate-900"
            }`}>
              {pack.name}
            </h3>
            
            <div className="mt-2 flex items-baseline">
              <span className={`text-3xl md:text-4xl font-extrabold tracking-tight ${
                pack.popular ? "text-white" : "text-blue-600"
              }`}>
                {pack.price}
              </span>
            </div>
             <p className={`mt-1 text-sm font-semibold ${pack.popular ? "text-blue-100" : "text-blue-600"}`}>
                {pack.credits} Credits
             </p>
          </div>

          <div className="flex-grow mt-8">
            <ul className="space-y-3.5">
              {pack.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-start gap-3">
                  <div className={`mt-0.5 flex-shrink-0 ${
                    pack.popular ? "text-white" : "text-blue-600"
                  }`}>
                    <Check className="h-5 w-5" iconPrimary={pack.popular ? "#fff" : "#2563eb"} />
                  </div>
                  <span className={`text-sm md:text-base leading-relaxed ${
                    pack.popular ? "text-blue-50" : "text-slate-700"
                  }`}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <button
              onClick={() => {
                const priceValue = parseFloat(pack.price.replace('$', '')); 
                onSelect(pack.name, pack.credits, priceValue);
              }}
              disabled={isLoading}
              className={`w-full py-3.5 rounded-xl text-base font-medium transition-all duration-300 ${
                pack.buttonVariant === 'primary'
                  ? pack.popular 
                    ? "bg-white text-blue-600 hover:bg-blue-50 shadow-md hover:shadow-xl"
                    : "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-xl shadow-blue-500/30"
                  : pack.popular
                    ? "bg-white/20 text-white hover:bg-white/30 border border-white/50 backdrop-blur-sm hover:shadow-lg"
                    : "bg-white text-blue-600 border border-slate-300 hover:bg-slate-50 shadow-md hover:shadow-lg"
              } ${isLoading ? "opacity-75 cursor-not-allowed" : ""} flex items-center justify-center`}
            >
              {isLoading && isSelected ? (
                <svg
                  className="animate-spin -ml-1 mr-2 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              ) : null}
              {isLoading && isSelected ? "Processing..." : pack.buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SubscriptionDialog = () => {
  const [selectedPack, setSelectedPack] = useState<string>("Standard");
  const [isPending, setIsPending] = useState(false);
  const {data , isLoading} = useUserInfo()
  
  if (!isLoading && (data?.credits ?? 0) > 0) {
    return null;
  }
  if (isLoading) {
    return null;
  }

  const handlePackPurchase = async (packName: string, credits: number, price: number) => {
    setSelectedPack(packName);
    setIsPending(true);
    
    try {
      const response = await api.post("/payments/create-checkout-session", { 
        itemType: 'credits',
        packName: packName,
        credits: credits,
        amount: price
      });
      window.location.href = response.data.url;
    } catch (error) {
      console.error("Checkout session creation failed:", error);
      setIsPending(false);
    }
  };

  const packs = [
    {
      name: "Basic",
      price: "$9.99",
      credits: 20,
      features: [
        "20 thumbnail generations",
        "High-quality output",
        "High resolution downloads",
        "PNG & JPG downloads",
        "24/7 support",
      ],
      buttonText: "Get 20 Credits",
      buttonVariant: "outline",
      delay: "0.2s"
    },
    {
      name: "Standard",
      price: "$19.99",
      credits: 50,
      features: [
        "50 thumbnail generations",
        "Slightly lower cost per thumbnail",
        "High-quality output",
        "High resolution downloads",
        "PNG & JPG downloads",
        "Priority support",
      ],
      buttonText: "Get 50 Credits",
      buttonVariant: "primary",
      popular: true,
      delay: "0.4s"
    },
    {
      name: "Premium",
      price: "$34.99",
      credits: 100,
      features: [
        "100 thumbnail generations",
        "Best cost per thumbnail",
        "High-quality output",
        "High resolution downloads",
        "PNG & JPG downloads",
        "Priority support",
      ],
      buttonText: "Get 100 Credits",
      buttonVariant: "outline",
      delay: "0.6s"
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-white via-slate-50 to-white rounded-2xl p-6 md:p-8 max-w-6xl w-full mx-auto max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none rounded-2xl">
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-200 rounded-full opacity-30 blur-3xl"></div>
          <div className="absolute bottom-1/3 -right-24 w-64 h-64 bg-indigo-200 rounded-full opacity-20 blur-3xl"></div>
        </div>

        <div className="text-center space-y-4 mb-12 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">
            Purchase <span className="text-blue-600 relative inline-block">
              Credits
              <span className="absolute bottom-1 left-0 w-full h-2 bg-blue-200 -z-10 rounded-full transform translate-y-1/2"></span>
            </span> to Continue
          </h2>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto mb-3">
            Looks like you&apos;re out of credits. Choose a pack below to keep creating amazing thumbnails!
          </p>
          <div className="inline-block bg-blue-100 px-5 py-2.5 rounded-full text-blue-700 font-medium text-sm md:text-base border border-blue-200 shadow-sm">
            1 Credit = 1 Thumbnail Generation
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10">
          {packs.map((pack, index) => (
            <PricingCard
              key={index}
              pack={pack}
              onSelect={handlePackPurchase}
              isLoading={isPending}
              selectedPack={selectedPack}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionDialog;