import React from "react";
import { ArrowRight, Star } from "../../../public/icons/SvgIcons";
import Link from "next/link";
import Image from "next/image";

const Hero: React.FC = () => {
  const userImages = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop"
  ];

  return (
    <section className="relative min-h-screen py-24 sm:py-16 md:py-20 px-4 sm:px-8 md:px-12 overflow-hidden flex items-center">
      {/* Ambient Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {[
          { top: "top-0 left-1/4", bg: "bg-blue-200/30", size: "w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px]", delay: "" },
          { top: "bottom-0 right-0", bg: "bg-purple-200/30", size: "w-[250px] sm:w-[300px] md:w-[400px] h-[250px] sm:h-[300px] md:h-[400px]", delay: "animation-delay-1000" },
          { top: "top-1/3 right-1/4", bg: "bg-pink-100/20", size: "w-[200px] sm:w-[250px] md:w-[300px] h-[200px] sm:h-[250px] md:h-[300px]", delay: "animation-delay-2000" }
        ].map((item, index) => (
          <div
            key={index}
            className={`absolute ${item.top} ${item.bg} ${item.size} rounded-full 
              blur-[80px] opacity-60 animate-pulse ${item.delay}`}
          />
        ))}
      </div>

      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-10 gap-8 sm:gap-10 items-center">
          {/* Left Column - Text Content (60% width) */}
          <div className="md:col-span-6 space-y-8 transition-all duration-1000 ease-out">
            {/* Badge */}
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 font-medium text-sm border border-blue-100">
              <span className="mr-2 h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
              Just Sketch, We'll Do The Rest
            </span>
            
            {/* Main headline */}
            <div>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                  Turn Sketches Into <br />
                  Stunning{" "}
                  <span className="bg-gradient-to-r from-blue-800 via-blue-500 to-blue-500 bg-clip-text text-transparent">
                    Thumbnails
                  </span>
                </h1>
              
              <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
                Transform your rough sketches into eye-catching thumbnails that viewers 
                can't resist clicking. No design skills needed — just draw and let our AI do the magic.
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/auth/signup"
                className="px-8 py-4 text-base font-medium rounded-full bg-blue-600 hover:bg-blue-700
                  shadow-lg shadow-blue-600/20 transition-all duration-300
                  text-white hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-600/30 group"
              >
                Transform Your Sketch Now
                <ArrowRight 
                  className="ml-2 h-5 w-5 inline-block transition-transform group-hover:translate-x-1" 
                  iconPrimary="#fff" 
                  iconSecondary="#fff" 
                />
              </Link>

              <Link
                href="#testimonials"
                className="px-8 py-4 font-medium text-base rounded-full border-2 border-gray-200
                  hover:bg-gray-50 transition-colors duration-300 flex items-center"
              >
                See Success Stories
              </Link>
            </div>

            {/* Social proof */}
            <div className="pt-8 flex items-center gap-6 border-t border-gray-100">
              <div className="flex -space-x-3">
                {userImages.map((imageUrl, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-white overflow-hidden 
                      hover:transform hover:scale-110 transition-all duration-300 z-10"
                    style={{ zIndex: 10 - i }}
                  >
                    <Image
                      width={40}
                      height={40}
                      src={imageUrl}
                      alt={`User ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center mb-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400" />
                  ))}
                  <span className="ml-2 text-sm font-medium">4.9/5</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Trusted by content creators
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Video Showcase (40% width) */}
          <div className="md:col-span-4 transition-all duration-1000 ease-out">
            <ThumbnailShowcase />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

interface ThumbnailProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export const Thumbnail: React.FC<ThumbnailProps> = ({ src, alt, className = "", width = 150, height = 150 }) => {
  return (
    <div className={`rounded-xl overflow-hidden ${className}`}>
      <Image src={src} alt={alt} width={width} height={height} className="object-cover w-full h-full" />
    </div>
  );
};

const ThumbnailShowcase: React.FC = () => {
  return (
    <div className="relative z-10">
      {/* Simple video container with subtle enhancements */}
      <div className="rounded-2xl overflow-hidden shadow-xl">
        <div className="relative w-full pt-[56.25%]">
          <iframe 
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/your-video-id" 
            title="Transform your sketches into stunning thumbnails"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen>
          </iframe>
        </div>
      </div>
      
      {/* Simple process description */}
      <div className="mt-8 text-center">
        <h3 className="text-xl font-medium mb-4">How it works</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Draw a simple sketch, upload it to our platform, and watch as our AI transforms 
          it into a professional thumbnail in seconds. No design skills needed.
        </p>
      </div>
    </div>
  );
};
