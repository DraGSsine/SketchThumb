"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Ditto } from "../../../public/icons/SvgIcons";
import Image from "next/image";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Content Creator",
      content: "This sketch to thumbnail tool transformed my rough ideas into eye-catching thumbnails that significantly increased my click-through rate. My channel's growth has accelerated since I started using it!",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      initials: "SJ",
      delay: "0.2s"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "YouTube Influencer",
      content: "As someone with zero design skills, I was amazed by how quickly the AI understood my sketches and created thumbnails that look professionally designed. My videos now get 40% more views on average!",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      initials: "MC",
      delay: "0.4s"
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Blog Publisher",
      content: "The thumbnails created from my sketches have revolutionized my blog's social media presence. I'm getting higher engagement and shares across all platforms with minimal effort on my part.",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop",
      initials: "ER",
      delay: "0.6s"
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);


  return (
    <section id="testimonials" className="py-16 md:py-20 bg-gradient-to-b from-white to-blue-50 dark:from-slate-900 dark:to-slate-800 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-200 dark:bg-blue-900/20 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-1/4 -left-24 w-80 h-80 bg-indigo-200 dark:bg-indigo-900/20 rounded-full opacity-20 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-5 text-slate-900 dark:text-white tracking-tight">
            What Our <span className="text-blue-600 dark:text-blue-400 relative inline-block">
              Users
              <span className="absolute bottom-1 left-0 w-full h-2 bg-blue-200 dark:bg-blue-800/50 -z-10 rounded-full transform translate-y-1/2"></span>
            </span> Say
          </h2>
          <p className="text-base md:text-lg max-w-2xl mx-auto text-slate-700 dark:text-slate-300">
            Hear from content creators who have transformed their thumbnails and boosted their engagement.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Mobile view - single testimonial */}
          <div className="md:hidden">
            <Card className="rounded-2xl shadow-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300">
              <div className="p-8">
                <div className="mb-6">
                  <Ditto className="w-10 h-10 text-blue-500 opacity-80" />
                </div>
                <p className="text-slate-700 dark:text-slate-300 text-lg italic mb-6 leading-relaxed">
                &quot;{testimonials[activeIndex].content}&quot;
                </p>
                <div className="flex items-center">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-blue-200 dark:border-blue-800">
                    <Image
                      src={testimonials[activeIndex].avatar}
                      alt={testimonials[activeIndex].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900 dark:text-white">
                      {testimonials[activeIndex].name}
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400 text-sm">
                      {testimonials[activeIndex].role}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? "bg-blue-600 w-8"
                      : "bg-slate-300 dark:bg-slate-600"
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>

          {/* Desktop view - all testimonials in a grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card
                key={testimonial.id}
                className="rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 shadow-lg shadow-slate-200/50 dark:shadow-black/20 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] opacity-0 animate-fade-in"
                style={{ animationDelay: testimonial.delay, animationFillMode: "forwards" }}
              >
                <div className="p-8">
                  <div className="mb-6">
                    <Ditto className="w-8 h-8 text-blue-500 opacity-80" />
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 text-base mb-6 leading-relaxed">
                  &quot;{testimonial.content}&quot;
                  </p>
                  <div className="flex items-center">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-blue-200 dark:border-blue-800">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">
                        {testimonial.name}
                      </h3>
                      <p className="text-blue-600 dark:text-blue-400 text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
