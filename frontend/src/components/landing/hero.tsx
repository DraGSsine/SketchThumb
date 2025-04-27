"use client"
import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="relative py-20 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-400 blur-3xl" />
        <div className="absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-purple-400 blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left column: Content */}
          <div className="flex flex-col space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 rounded-full text-sm font-medium">
                AI-Powered Thumbnail Creation
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
                Transform Your <br />
                <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Sketches{" "}</span>Into
                <br />
                Thumbnails
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-lg">
                Our AI-powered platform instantly converts your rough sketches
                into professional, eye-catching thumbnails that drive engagement
                and clicks.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
                <Link
                href="/auth/signup"
                className="flex items-center justify-center gap-2 bg-blue-500 border-none text-white px-4 py-2 text-lg rounded-xl shadow-lg hover:shadow-blue-200 dark:hover:shadow-blue-900/20 font-semibold transition-all duration-200"
                >
                Get Started
                <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                href="#testimonials"
                className="flex items-center justify-center gap-2 border-2 border-blue-400 text-blue-600 hover:bg-blue-50 dark:border-blue-600 dark:text-blue-300 dark:hover:bg-blue-900/20 px-4 py-2 text-lg rounded-xl font-semibold transition-all duration-200"
                >
                See User Reviews
                </Link>
            </motion.div>
          </div>

          {/* Right column: YouTube Video */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="relative"
          >
            <div className="w-full max-w-2xl mx-auto shadow-2xl rounded-2xl overflow-hidden">
              <div className="relative w-full aspect-[16/9] bg-gradient-to-br from-gray-900 to-gray-800 p-1 md:p-3">
                <div className="w-full h-full rounded-xl overflow-hidden">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/uHU5Dou93DA" 
                    title="Scrive Demo" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full"
                  ></iframe>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
