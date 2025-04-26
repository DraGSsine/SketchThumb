"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Pencil, Image as ImageIcon } from "../../../public/icons/SvgIcons";

const Hero = () => {
  return (
    <section className="pt-32 pb-16 md:py-28 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Turn Your Sketches Into <span className="text-blue-600">Stunning Thumbnails</span>
            </h1>
            <p className="text-lg mb-8 text-gray-700 dark:text-gray-300">
              Transform your rough sketches into professional thumbnails in seconds. Boost your content&apos;s visibility with eye-catching thumbnails that drive more clicks.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth/signup">
                <Button className="bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                  <span>Get Started</span>
                  <ArrowRight className="ml-2 h-4 w-4" iconPrimary="#fff" iconSecondary="#fff"/>
                </Button>
              </Link>
              <Link href="/#how-it-works">
                <Button variant="outline" className="border-blue-600 text-blue-600">
                  How It Works
                </Button>
              </Link>
            </div>
            
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-blue-600">10x</p>
                <p className="text-sm text-gray-600">Faster Creation</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-blue-600">40%</p>
                <p className="text-sm text-gray-600">More Clicks</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-blue-600">100+</p>
                <p className="text-sm text-gray-600">Style Options</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200 shadow-lg">
                <div className="flex justify-between items-center mb-6">
                  <div className="text-2xl font-bold text-blue-600">Scrive</div>
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                    <div className="flex items-center mb-3">
                      <Pencil className="h-5 w-5 mr-2 text-blue-500" />
                      <span className="font-medium text-gray-800">1. Sketch</span>
                    </div>
                    <div className="h-16 bg-blue-50 rounded-lg border-2 border-dashed border-blue-200 flex items-center justify-center">
                      <span className="text-blue-400 text-sm">Your sketch here</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-center my-2">
                    <div className="bg-blue-600 rounded-full p-1">
                      <ArrowRight className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                    <div className="flex items-center mb-3">
                      <Sparkles className="h-5 w-5 mr-2 text-blue-500" />
                      <span className="font-medium text-gray-800">2. AI Magic</span>
                    </div>
                    <div className="h-4 w-3/4 bg-blue-200 rounded-full mb-2"></div>
                    <div className="h-4 w-1/2 bg-blue-200 rounded-full"></div>
                  </div>
                  
                  <div className="flex justify-center my-2">
                    <div className="bg-blue-600 rounded-full p-1">
                      <ArrowRight className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                    <div className="flex items-center mb-3">
                      <ImageIcon className="h-5 w-5 mr-2 text-blue-500" />
                      <span className="font-medium text-gray-800">3. Professional Thumbnail</span>
                    </div>
                    <div className="h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-medium">✨ Stunning Result</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs rounded-full">Ready in seconds</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
