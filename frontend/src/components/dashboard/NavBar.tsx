'use client';
import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { api } from '@/lib/axios';
import { CreditCard, Bug, ArrowLeftToBracket, Burger } from '../../../public/icons/SvgIcons';
import Logo from '../landing/logo';
import { useUserInfo } from '@/lib/queries';
import { cn } from "@/lib/utils";

const NavBar = () => {
  const { data, isLoading } = useUserInfo();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const monthlyCredits = data?.monthlyThumbnailLimit ?? 0;
  const creditsUsed = data?.creditsUsed ?? 0;
  const remainingCredits = monthlyCredits - creditsUsed;

  const handleSignout = async () => {
    try {
      await api.post('/auth/signout');
      window.location.href = '/auth/signin';
    } catch (error) {
      console.error('Failed to sign out', error);
    }
  };

  const handleReportBug = () => {
    try {
      console.log('Bug report button clicked');
      const subject = encodeURIComponent('Bug Report');
      const body = encodeURIComponent('Please describe the bug you encountered:\n\n');
      const mailtoLink = `mailto:ouchen606@gmail.com?subject=${subject}&body=${body}`;
      console.log('Opening mailto link:', mailtoLink);
      
      // Try opening in current window
      window.location.href = mailtoLink;
      
      // Alternative approach - try opening in a new window as backup
      setTimeout(() => {
        window.open(mailtoLink, '_blank');
      }, 300);
    } catch (error) {
      console.error('Error opening mail client:', error);
      alert('Could not open email client. Please send an email manually to ouchen606@gmail.com');
    }
  };

  return (
    <nav className="bg-white border-b border-slate-100 fixed w-full top-0 z-50 shadow-sm">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <Logo size={40} textClass=" text-lg lg:text-2xl" />

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <Burger className="block h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Desktop Menu Items */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {/* Credits Display */}
            {!isLoading && data && (
              <div className="flex items-center space-x-3 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                <CreditCard className="w-4 h-4 text-slate-600 " />
                <div>
                  <div className="flex items-center space-x-1">
                    <span className="text-sm h-6 flex items-center justify-center font-medium text-slate-600">
                      {remainingCredits}
                    </span>
                    <span className="text-sm h-6 text-slate-500 flex gap-1">
                      credits <p className='hidden md:flex'>remaining</p>
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 h-1 rounded-full mt-1">
                    <div 
                      className="bg-slate-600 h-1 rounded-full transition-all duration-500 ease-out"
                      style={{ 
                        width: `${(creditsUsed / monthlyCredits) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <Avatar className="h-9 w-9 ring-2 ring-white transition duration-200 hover:ring-slate-200">
                  {data?.avatar && (
                    <AvatarImage 
                      src={data.avatar} 
                      alt={data.displayName || 'User'} 
                      className="object-cover"
                    />
                  )}
                  <AvatarFallback className="bg-slate-200 text-slate-600 text-sm">
                    {data?.displayName ? data.displayName.substring(0, 2).toUpperCase() : 'U'}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem 
                  onClick={handleReportBug}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <Bug className="w-4 h-4" />
                  <span>Report Bug</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={handleSignout}
                  className="flex items-center space-x-2 cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                >
                  <ArrowLeftToBracket className="w-4 h-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div className={cn("md:hidden", { "block": isMobileMenuOpen, "hidden": !isMobileMenuOpen })} id="mobile-menu">
        <div className="pt-2 pb-3 space-y-1 px-2 sm:px-3 border-t border-slate-200">
          {/* Mobile Credits Display */}
          {!isLoading && data && (
            <div className="flex items-center space-x-3 bg-slate-50 px-3 py-2 rounded-md border border-slate-100 mb-2">
              <CreditCard className="w-4 h-4 text-slate-600" />
              <div>
                <div className="flex items-center space-x-1">
                  <span className="text-sm font-medium text-slate-600">
                    {remainingCredits}
                  </span>
                  <span className="text-sm text-slate-500">credits remaining</span>
                </div>
                <div className="w-full bg-slate-200 h-1 rounded-full mt-1">
                  <div 
                    className="bg-slate-600 h-1 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${(creditsUsed / monthlyCredits) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          )}
          {/* Mobile Menu Items */}
          <button
            onClick={handleReportBug}
            className="w-full flex items-center space-x-2 cursor-pointer px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          >
            <Bug className="w-4 h-4" />
            <span>Report Bug</span>
          </button>
          <button
            onClick={handleSignout}
            className="w-full flex items-center space-x-2 cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 px-3 py-2 rounded-md text-base font-medium hover:bg-red-50"
          >
            <ArrowLeftToBracket className="w-4 h-4" />
            <span>Sign out</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;