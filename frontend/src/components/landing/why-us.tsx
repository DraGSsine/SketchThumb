import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Bolt, BadgeCheck } from "../../../public/icons/SvgIcons";

const WhyUs = () => {
  const features = [
    {
      title: "Quick & Easy",
      description: "Transform your sketches into eye-catching thumbnails in seconds with our intuitive interface. No design skills needed.",
      icon: <Bolt className="w-6 h-6 text-blue-600" iconPrimary="#2563eb" />
    },
    {
      title: "Boost Click-Through Rate",
      description: "Create thumbnails that capture attention and increase your content's visibility and engagement across platforms.",
      icon: <Sparkles className="w-6 h-6 text-blue-600" iconPrimary="#2563eb" />
    },
    {
      title: "Professional Quality",
      description: "Our AI technology ensures every thumbnail looks professional and polished, giving your content a competitive edge.",
      icon: <BadgeCheck className="w-6 h-6 text-blue-600" iconPrimary="#FFF" />
    }
  ];

  return (
    <section id="why-us" className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-1 gap-5">
              {features.map((feature, index) => (
                <Card key={index} className="glass-effect rounded-2xl transition-all duration-300 hover:shadow-glass-lg overflow-hidden">
                  <CardContent className="p-5">
                    <div className="flex items-start">
                      <div className="mr-4 mt-1">{feature.icon}</div>
                      <div>
                        <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground text-sm md:text-base">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-5">
              Why Choose Our <span className="text-blue-600">Sketch to Thumbnail</span> Service?
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
              Elevate your content with our AI-powered thumbnail generator. Whether you're a YouTuber, blogger, or social media creator, our tool transforms your simple sketches into professional thumbnails that drive engagement.
            </p>
            <div className="flex flex-col space-y-3">
              <div className="flex items-start">
                <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">1</span>
                <p className="text-muted-foreground">Upload a simple sketch of your thumbnail idea</p>
              </div>
              <div className="flex items-start">
                <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">2</span>
                <p className="text-muted-foreground">Our AI transforms it into a polished, attention-grabbing thumbnail</p>
              </div>
              <div className="flex items-start">
                <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">3</span>
                <p className="text-muted-foreground">Download and use your professional thumbnail for higher engagement</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
