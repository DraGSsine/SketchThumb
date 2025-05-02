import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Bolt, BadgeCheck } from "../../../public/icons/SvgIcons";

const WhyUs = () => {
  const features = [
    {
      title: "Quick & Easy",
      description: "Transform your sketches into eye-catching thumbnails in seconds with our intuitive interface. No design skills needed.",
      icon: <Bolt className="w-7 h-7 text-blue-600" iconPrimary="#2563eb" />
    },
    {
      title: "Boost Click-Through Rate",
      description: "Create thumbnails that capture attention and increase your content's visibility and engagement across platforms.",
      icon: <Sparkles className="w-7 h-7 text-blue-600" iconPrimary="#2563eb" />
    },
    {
      title: "Professional Quality",
      description: "Our AI technology ensures every thumbnail looks professional and polished, giving your content a competitive edge.",
      icon: <BadgeCheck className="w-7 h-7 text-blue-600" iconPrimary="#2563eb" />
    }
  ];

  return (
    <section id="why-us" className="py-16 md:py-20 bg-gradient-to-b from-blue-50 to-white dark:from-slate-800 dark:to-slate-900 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-24 w-64 h-64 bg-blue-200 dark:bg-blue-900/20 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-1/3 -right-24 w-80 h-80 bg-indigo-200 dark:bg-indigo-900/20 rounded-full opacity-20 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-1 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border border-slate-200 dark:border-slate-700 shadow-lg shadow-slate-200/50 dark:shadow-black/20 bg-white dark:bg-slate-800/50 overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div className="w-14 h-14 rounded-xl mr-5 flex items-center justify-center bg-blue-50 dark:bg-blue-900/30 transform transition-transform duration-500 hover:rotate-12">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{feature.title}</h3>
                        <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6 text-slate-900 dark:text-white tracking-tight">
              Why Choose Our <span className="text-blue-600 dark:text-blue-400 relative inline-block">
                Thumbnail
                <span className="absolute bottom-1 left-0 w-full h-2 bg-blue-200 dark:bg-blue-800/50 -z-10 rounded-full transform translate-y-1/2"></span>
              </span> Service?
            </h2>
            <p className="text-base md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-8">
              Elevate your content with our AI-powered thumbnail generator. Whether you&apos;re a YouTuber, blogger, or social media creator, our tool transforms your simple sketches into professional thumbnails that drive engagement.
            </p>
            <div className="flex flex-col space-y-5">
              <div className="flex items-center">
                <span className="bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800/50 text-blue-700 dark:text-blue-300 rounded-full w-8 h-8 flex items-center justify-center mr-4 shadow-sm font-medium">1</span>
                <p className="text-slate-700 dark:text-slate-300 text-base">Upload a simple sketch of your thumbnail idea</p>
              </div>
              <div className="flex items-center">
                <span className="bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800/50 text-blue-700 dark:text-blue-300 rounded-full w-8 h-8 flex items-center justify-center mr-4 shadow-sm font-medium">2</span>
                <p className="text-slate-700 dark:text-slate-300 text-base">Our AI transforms it into a polished, attention-grabbing thumbnail</p>
              </div>
              <div className="flex items-center">
                <span className="bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800/50 text-blue-700 dark:text-blue-300 rounded-full w-8 h-8 flex items-center justify-center mr-4 shadow-sm font-medium">3</span>
                <p className="text-slate-700 dark:text-slate-300 text-base">Download and use your professional thumbnail for higher engagement</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
