"use client"
import React, { useState } from 'react';
import { CircleCheck, Fire, Bolt, Gem } from '../../../public/icons/SvgIcons';
import { api } from '@/lib/axios';
import { useUserInfo } from '@/lib/queries';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

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
    icon: React.ReactNode;
  };
  onSelect: (plan: string) => void;
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
    <div key={pack.name} className="flex opacity-0 animate-fade-in" style={{ animationDelay: pack.delay, animationFillMode: "forwards" }}>
      <Card className={`relative flex flex-col w-full rounded-2xl transition-all duration-300 hover:scale-[1.03] hover:shadow-xl ${
        pack.popular 
          ? 'bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-lg shadow-blue-500/30 border-2 border-blue-400' 
          : 'bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 shadow-lg shadow-slate-200/50 dark:shadow-black/20'
      }`}>
        {pack.popular && (
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-blue-600 text-xs px-4 py-1.5 rounded-full font-bold shadow-sm border border-blue-200">
            Most Popular
          </div>
        )}
        <CardHeader className="pt-8">
          <div className={`w-14 h-14 mb-4 rounded-xl flex items-center justify-center transform transition-transform duration-500 hover:rotate-12 ${
            pack.popular ? "bg-white/20" : "bg-blue-50 dark:bg-blue-900/30"
          }`}>
            {pack.icon}
          </div>
          <CardTitle className={`text-xl md:text-2xl font-bold ${pack.popular ? 'text-white' : 'text-slate-900 dark:text-slate-100'}`}>{pack.name}</CardTitle>
          <div className="mt-3 flex items-baseline">
            <span className={`text-3xl md:text-4xl font-extrabold tracking-tight ${pack.popular ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`}>{pack.price}</span>
          </div>
          <p className={`mt-1 text-sm font-semibold ${pack.popular ? 'text-blue-100' : 'text-blue-600 dark:text-blue-400'}`}>
            {pack.credits} Credits
          </p>
        </CardHeader>
        <CardContent className="flex-grow">
          <ul className="space-y-3.5">
            {pack.features.map((feature, featureIndex) => (
              <li key={featureIndex} className="flex items-start gap-3">
                <CircleCheck className={`h-5 w-5 flex-shrink-0 mt-0.5 ${pack.popular ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`} iconSecondary={pack.popular ? "#3b82f6" : "#fff"} iconPrimary={pack.popular ? "#fff" : "#3b82f6"} />
                <span className={`text-sm md:text-base ${pack.popular ? 'text-blue-50' : 'text-slate-700 dark:text-slate-300'}`}>{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={() => {onSelect(pack.name)}}
            disabled={isLoading}
            className={`w-full py-3.5 rounded-xl text-base font-medium transition-all duration-300 ${
              pack.buttonVariant === 'primary'
                ? pack.popular 
                  ? "bg-white text-blue-600 hover:bg-blue-50 shadow-md hover:shadow-xl"
                  : "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-xl shadow-blue-500/30 dark:bg-blue-500 dark:hover:bg-blue-600"
                : pack.popular
                  ? "bg-white/20 text-white hover:bg-white/30 border border-white/50 backdrop-blur-sm hover:shadow-lg"
                  : "bg-white text-blue-600 border border-slate-300 hover:bg-slate-50 shadow-md hover:shadow-lg dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600 dark:hover:bg-slate-600"
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
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

const SubscriptionDialog = () => {
  const [selectedPack, setSelectedPack] = useState<string>("Standard");
  const [isPending, setIsPending] = useState(false);
  const {data , isLoading} = useUserInfo()
  
  if (data?.plan !== "none" || isLoading)
    return null;

  const handlePackSelection = async (pack: string) => {
    setSelectedPack(pack);
    setIsPending(true);
    
    try {
      // Keep the exact same request logic
      const response = await api.post("/payments/create-checkout-session", {
        plan: pack,
        subscriptionType: pack === "Pro" ? "yearly" : "monthly"
      });
      window.location.href = response.data.url;
    } catch (error) {
      console.error(error);
      // Add your toast notification here
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
      delay: "0.2s",
      icon: <Fire className="w-7 h-7" iconPrimary="#2563eb" />
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
      delay: "0.4s",
      icon: <Bolt className="w-7 h-7" iconPrimary="#ffffff" />
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
      delay: "0.6s",
      icon: <Gem className="w-7 h-7" iconPrimary="#2563eb" />
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 max-w-6xl w-full mx-auto max-h-[90vh] overflow-y-auto relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-200 dark:bg-blue-900/20 rounded-full opacity-50 blur-3xl"></div>
          <div className="absolute top-1/2 -right-24 w-64 h-64 bg-indigo-200 dark:bg-indigo-900/20 rounded-full opacity-40 blur-3xl"></div>
          <div className="absolute -bottom-32 left-1/3 w-72 h-72 bg-cyan-200 dark:bg-cyan-900/20 rounded-full opacity-30 blur-3xl"></div>
        </div>
        
        <div className="relative z-10">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
              Simple, <span className="text-blue-600 dark:text-blue-400 relative">
                Transparent
                <span className="absolute bottom-1 left-0 w-full h-2 bg-blue-200 dark:bg-blue-800/50 -z-10 rounded-full transform translate-y-1/2"></span>
              </span> Pricing
            </h2>
            <p className="text-base md:text-lg max-w-2xl mx-auto text-slate-700 dark:text-slate-300">
              Choose a credit pack that fits your needs. Pay once, use credits anytime.
            </p>
            <div className="inline-block bg-blue-100 dark:bg-blue-900/30 px-5 py-2.5 rounded-full text-blue-700 dark:text-blue-300 font-medium text-sm md:text-base border border-blue-200 dark:border-blue-800/50 shadow-sm">
              1 Credit = 1 Thumbnail Generation
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 max-w-6xl mx-auto">
            {packs.map((pack, index) => (
              <PricingCard
                key={index}
                pack={pack}
                onSelect={handlePackSelection}
                isLoading={isPending}
                selectedPack={selectedPack}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionDialog;