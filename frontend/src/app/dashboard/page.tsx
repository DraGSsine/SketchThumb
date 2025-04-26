"use client";

import React, { useState, useEffect } from "react";
import Drawing from "../../components/dashboard/Drawing";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { 
  Image as ImageIcon,
  RotateReverse,
  Sparkles, 
  ChevronLeft, 
  ChevronRight 
} from "../../../public/icons/SvgIcons";
import { useUserInfo } from "@/lib/queries";

// Constants for localStorage keys
const SETTINGS_STORAGE_KEY = "logo-generator-settings";
const DRAWING_STORAGE_KEY = "logo-generator-canvas";

type LogoSettings = {
  styles?: {
    type?: string;
    style?: string;
  };
  colors?: {
    color?: string;
  };
  controls?: {
    creativity?: number;
    detail?: number;
  };
  [key: string]: Record<string, unknown> | undefined
};

export default function DashboardPage() {
  // Right sidebar state
  const [showRightSidebar, setShowRightSidebar] = useState(() => {
    // Check if we're in the browser and not in SSR
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 768; // Show by default only on non-mobile
    }
    return true; // Default for SSR
  });
  
  // Track if component is mounted (client-side)
  const [isMounted, setIsMounted] = useState(false);
  
  // Store viewport information
  const [viewport, setViewport] = useState({
    isMobile: false, // < 768px
    isTablet: false, // 768px - 1279px
  });

  // Thumbnail generation state
  const {refetch} = useUserInfo();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [promptText, setPromptText] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState<string | null>(null);

  // Set isMounted to true after component mounts and set dynamic viewport height
  useEffect(() => {
    setIsMounted(true);
    
    // Initialize viewport size and set dynamic vh variable
    const updateViewport = () => {
      setViewport({
        isMobile: window.innerWidth < 768,
        isTablet: window.innerWidth >= 768 && window.innerWidth < 1280,
      });
      
      // Set custom viewport height property
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    updateViewport();
    window.addEventListener('resize', updateViewport);
    window.addEventListener('orientationchange', updateViewport);
    
    return () => {
      window.removeEventListener('resize', updateViewport);
      window.removeEventListener('orientationchange', updateViewport);
    };
  }, []);

  // Close sidebar on ESC key (for accessibility)
  useEffect(() => {
    if (!isMounted) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // On mobile (will be hidden via CSS if not mobile)
        if (viewport.isMobile) {
          setShowRightSidebar(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMounted, viewport.isMobile]);

  // Helper function for sidebar overlay click
  const handleOverlayClick = () => {
    if (!isMounted) return;
    
    if (viewport.isMobile) {
      setShowRightSidebar(false);
    }
  };

  // Calculate sidebar width based on viewport
  const getRightSidebarWidth = () => {
    if (!isMounted) return "340px"; // Default for initial render
    if (viewport.isMobile) return "90%";
    if (viewport.isTablet) return "300px";
    return "340px";
  };

  // TanStack Query mutation with real API call
  const logoMutation = useMutation({
    mutationFn: async (generationData: {
      prompt: string;
      settings: LogoSettings | null;
      sketch: string | null;
      timestamp: string
    }) => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await api.post(`${apiUrl}/ai/generate`, generationData);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Thumbnail generation response:", data);

      // Handle different possible response formats
      if (Array.isArray(data) && data.length > 0) {
        // Response is directly an array of base64 images
        const processedImages = data.map((imageData: string) => {
          if (imageData.startsWith('data:image/')) {
            return imageData;
          }
          return `data:image/png;base64,${imageData}`;
        });
        setImages(processedImages);
        setHasGenerated(true);
      } else if (data.images && Array.isArray(data.images)) {
        // Response has an images property that is an array
        const processedImages = data.images.map((imageData: string) => {
          if (imageData.startsWith('data:image/')) {
            return imageData;
          }
          return `data:image/png;base64,${imageData}`;
        });
        setImages(processedImages);
        setHasGenerated(true);
      } else {
        console.error("Unexpected data format received:", data);
      }
      refetch();
    },
    onError: (error) => {
      console.error("Error generating thumbnail:", error);
      setIsGenerating(false);
    },
    onSettled: () => {
      setIsGenerating(false);
    },
  });

  // Handle prompt change
  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPromptText(e.target.value);
  };

  // Function to collect all data and send it to the API
  const handleGenerate = async () => {
    setIsGenerating(true);

    try {
      // Get settings from localStorage
      const settingsJson = localStorage.getItem(SETTINGS_STORAGE_KEY);
      const settings: LogoSettings | null = settingsJson
        ? JSON.parse(settingsJson)
        : null;

      // Get drawing canvas data from localStorage
      const sketchPng = localStorage.getItem(DRAWING_STORAGE_KEY);

      // Collect all data
      const generationData = {
        prompt: promptText,
        settings: settings,
        sketch: sketchPng,
        timestamp: new Date().toISOString(),
      };

      // Use TanStack Query mutation to send the data
      logoMutation.mutate(generationData);
    } catch (error) {
      console.error("Error preparing generation data:", error);
      setIsGenerating(false);
    }
  };

  // Handle image click
  const handleImageClick = (image: string) => {
    setModalImageSrc(image);
    setSelectedImage(images.indexOf(image));
  };

  return (
    <div className="h-[100dvh] h-[calc(var(--vh,1vh)*100)] w-screen overflow-hidden bg-blue-50">
      {/* Top navigation bar */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 shadow-sm z-40">
        <div className="flex items-center">
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg font-semibold text-gray-800 flex items-center"
          >
            <Sparkles className="w-5 h-5 mr-2 text-blue-600" />
            Thumbnail Creator
          </motion.h1>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Mobile-only sidebar toggle */}
          <div className="md:hidden flex items-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowRightSidebar(true)}
              className="flex items-center gap-1"
            >
              <Sparkles className="h-4 w-4" />
              <span className="text-xs">Generate</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main content area - Use dynamic height calculation */}
      <div className="h-[calc(100dvh-56px)] h-[calc(calc(var(--vh,1vh)*100)-56px)] w-full mx-auto relative p-4 mt-14">
        {/* Overlay for mobile when sidebar is open */}
        <AnimatePresence>
          {showRightSidebar && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed top-14 bottom-0 left-0 right-0 bg-black/30 backdrop-blur-sm z-20 md:hidden"
              onClick={handleOverlayClick}
            />
          )}
        </AnimatePresence>

        <div className="flex h-full">
          {/* Main drawing canvas area - now takes more space */}
          <main className="flex-1 h-full overflow-hidden bg-white rounded-2xl shadow-sm border border-blue-100">
            <Drawing />
          </main>

          {/* Toggle for right sidebar - visible on desktop and tablet */}
          <div className="hidden md:block">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowRightSidebar(!showRightSidebar)}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-50 bg-white shadow-md rounded-l-lg border border-r-0 border-gray-200 h-16 w-8"
            >
              {showRightSidebar ? 
                <ChevronRight className="h-6 w-6 text-blue-600" /> : 
                <ChevronLeft className="h-6 w-6 text-blue-600" />
              }
            </Button>
          </div>

          {/* Right Sidebar - Generator panel */}
          <AnimatePresence>
            {showRightSidebar && (
              <motion.div
                initial={{ 
                  x: "100%",
                  opacity: 0,
                  width: "90%", // Mobile default width
                }}
                animate={{ 
                  x: 0,
                  opacity: 1,
                  width: getRightSidebarWidth()
                }}
                exit={{ 
                  x: "100%", 
                  opacity: 0 
                }}
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                className="fixed md:relative right-0 top-[56px] md:top-0 z-30 h-[calc(100dvh-56px)] h-[calc(calc(var(--vh,1vh)*100)-56px)] md:h-full bg-white rounded-2xl overflow-hidden border border-blue-100 shadow-lg md:shadow-none"
              >
                <div className="w-full h-full bg-white rounded-2xl flex flex-col overflow-hidden">
                  {/* Preview Section - Showing generated thumbnails */}
                  <div className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-5 flex-1 overflow-y-auto">
                    <div className="mb-3 md:mb-4 flex items-center">
                      <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-0.5 md:px-2.5 md:py-1 rounded">
                        Preview
                      </span>
                    </div>

                    {/* Loading state with blob animation */}
                    {isGenerating && (
                      <div className="aspect-square mb-3 sm:mb-4">
                        <div className="relative aspect-square bg-blue-50 rounded-lg overflow-hidden">
                          <Skeleton variant="blob" className="w-full h-full" />
                        </div>
                      </div>
                    )}

                    {/* Result - Single large thumbnail */}
                    {!isGenerating && hasGenerated && images.length > 0 && (
                      <div className="mb-3 sm:mb-4">
                        <div className="group aspect-square bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-blue-200 transition-all">
                          <div className="relative w-full h-full">
                            <Image
                              width={400}
                              height={400}
                              src={images[selectedImage]}
                              alt={`Thumbnail`}
                              className="w-full h-full object-contain p-2"
                            />
                          </div>
                        </div>
                        
                        {/* Small thumbnails below if there are multiple */}
                        {images.length > 1 && (
                          <div className="grid grid-cols-4 gap-2 mt-3">
                            {images.map((image, index) => (
                              <div
                                key={index}
                                className={cn(
                                  "aspect-square bg-white rounded-md overflow-hidden border cursor-pointer",
                                  selectedImage === index
                                    ? "ring-2 ring-blue-600 border-blue-600"
                                    : "border-gray-200 hover:border-blue-300"
                                )}
                                onClick={() => handleImageClick(image)}
                              >
                                <Image
                                  width={100}
                                  height={100}
                                  src={image}
                                  alt={`Thumbnail ${index + 1}`}
                                  className="w-full h-full object-contain p-1"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Empty state */}
                    {!isGenerating && !hasGenerated && (
                      <div className="aspect-square mb-3 sm:mb-4">
                        <div className="aspect-square bg-blue-50 rounded-lg flex flex-col items-center justify-center p-6 border border-dashed border-blue-200">
                          <ImageIcon className="w-12 h-12 md:w-16 md:h-16 text-blue-200 mb-4" />
                          <span className="text-sm sm:text-base text-blue-400 text-center">
                            Your thumbnail will appear here after generation
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Prompt Section */}
                  <div className="p-3 sm:p-4 md:p-6 border-t border-blue-100 bg-gray-50">
                    <div className="mb-3 md:mb-4 flex items-center">
                      <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-0.5 md:px-2.5 md:py-1 rounded">
                        Create
                      </span>
                    </div>

                    <div className="space-y-3 md:space-y-4">
                      <div className="relative">
                        <Textarea
                          value={promptText}
                          onChange={handlePromptChange}
                          placeholder="Describe the thumbnail you want to generate..."
                          className="min-h-[80px] md:min-h-[100px] text-sm md:text-base resize-none rounded-lg border-gray-200 bg-white focus:border-blue-400 focus:ring-blue-100 text-gray-800"
                        />
                        <div className="absolute bottom-2 md:bottom-3 right-2 md:right-3 text-[10px] md:text-xs text-gray-400 flex items-center">
                          <Sparkles className="w-2.5 h-2.5 md:w-3 md:h-3 mr-1" />
                          Be descriptive for best results
                        </div>
                      </div>

                      <Button
                        className={cn(
                          "w-full font-medium py-1.5 md:py-2 rounded-lg transition-all flex items-center justify-center gap-1 md:gap-2 text-sm md:text-base",
                          isGenerating || !promptText.trim()
                            ? "bg-blue-400 hover:bg-blue-400 text-white/80 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700 text-white"
                        )}
                        onClick={handleGenerate}
                        disabled={isGenerating || !promptText.trim()}
                      >
                        {isGenerating ? (
                          <>
                            <RotateReverse className="w-4 h-4 md:w-5 md:h-5 animate-spin" /> Generating...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4 md:w-5 md:h-5" /> Generate Thumbnail
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// Skeleton component for loading states
const Skeleton = ({
  variant,
  className,
}: {
  variant: "blob";
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
        variant === "blob" && "aspect-square rounded-lg bg-blue-100",
        className
      )}
    />
  );
};
