"use client"
import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="relative pt-24 pb-16 md:pt-32 md:pb-20 bg-gradient-to-b from-white to-blue-50 dark:from-slate-900 dark:to-slate-800 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-200 dark:bg-blue-900/20 opacity-50 blur-3xl" />
        <div className="absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-indigo-200 dark:bg-indigo-900/20 opacity-40 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 w-80 h-80 rounded-full bg-cyan-200 dark:bg-cyan-900/20 opacity-30 blur-3xl" />
      </div>
      
      <div className="container mx-auto px-6 py-16 md:py-24 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left column: Content */}
          <div className="flex flex-col space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-block px-5 py-2.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium border border-blue-200 dark:border-blue-800/50 shadow-sm">
                AI-Powered Thumbnail Creation
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white">
                Transform Your <br />
                <span className="text-blue-600 dark:text-blue-400 relative inline-block">
                  Sketches
                  <span className="absolute bottom-3 left-0 w-full h-3 bg-blue-200 dark:bg-blue-800/50 -z-10 rounded-full transform translate-y-1/2 opacity-70"></span>
                </span> Into
                <br />
                Thumbnails
              </h1>
              <p className="text-lg text-slate-700 dark:text-slate-300 max-w-lg">
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
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 border-none text-white px-6 py-3.5 text-base rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl font-medium transition-all duration-300"
                >
                Get Started
                <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                href="#testimonials"
                className="flex items-center justify-center gap-2 bg-white text-blue-600 border border-slate-300 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700 px-6 py-3.5 text-base rounded-xl shadow-md hover:shadow-lg font-medium transition-all duration-300"
                >
                See User Reviews
                </Link>
            </motion.div>
          </div>

          {/* Right column: Video */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="relative"
          >
            <div className="w-full max-w-2xl mx-auto shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-blue-200/50 dark:hover:shadow-blue-900/20">
              <div className="relative w-full aspect-[16/9] bg-gradient-to-br from-slate-900 to-slate-800 p-3">
                <div className="w-full h-full rounded-xl overflow-hidden">
                  <video
                    autoPlay
                    width="100%" 
                    height="100%" 
                    controls 
                    src="https://res.cloudinary.com/decb9vsza/video/upload/v1745953124/yjz4mrydwg1n5peh390u.mp4" 
                    title="Scrive Demo" 
                    className="absolute top-0 left-0 w-full h-full"
                  >
                    Your browser does not support the video tag.
                  </video>
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
