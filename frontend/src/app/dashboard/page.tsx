"use client";

import React, { useState, useEffect } from "react";
import Drawing from "../../components/dashboard/Drawing";
import Sidebar from "../../components/dashboard/sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, ChevronLeft, ChevronRight } from "../../../public/icons/SvgIcons";

export default function DashboardPage() {
  // Right sidebar state
  const [showRightSidebar, setShowRightSidebar] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 768;
    }
    return true;
  });
  
  // Track if component is mounted (client-side)
  const [isMounted, setIsMounted] = useState(false);
  
  // Store viewport information
  const [viewport, setViewport] = useState({
    isMobile: false,
    isTablet: false,
  });

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
      if (e.key === 'Escape' && viewport.isMobile) {
        setShowRightSidebar(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMounted, viewport.isMobile]);

  // Helper function for sidebar overlay click
  const handleOverlayClick = () => {
    if (isMounted && viewport.isMobile) {
      setShowRightSidebar(false);
    }
  };

  return (
    <div className="h-[100dvh] h-[calc(var(--vh,1vh)*100)] w-screen overflow-hidden bg-blue-50">
      {/* Main content area - Use dynamic height calculation. Adjusted mt-16 due to NavBar h-16 */}
      <div className="h-[calc(100dvh-64px)] h-[calc(calc(var(--vh,1vh)*100)-64px)] w-full mx-auto relative p-4 mt-16">
        {/* Overlay for mobile when sidebar is open */}
        <AnimatePresence>
          {showRightSidebar && viewport.isMobile && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed top-16 bottom-0 left-0 right-0 bg-black/30 backdrop-blur-sm z-20 md:hidden"
              onClick={handleOverlayClick}
            />
          )}
        </AnimatePresence>

        <div className="flex h-full">
          {/* Main drawing canvas area */}
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

          {/* Right Sidebar Component */}
          <Sidebar 
            showSidebar={showRightSidebar} 
            isMobile={viewport.isMobile}
            isTablet={viewport.isTablet}
            isMounted={isMounted}
          />
        </div>
      </div>
    </div>
  );
}
