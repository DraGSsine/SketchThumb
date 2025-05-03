"use client";

import React, { useState, useEffect } from "react";
import Logo from "./logo";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Burger, X } from "../../../public/icons/SvgIcons";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-white/95 backdrop-blur-sm shadow-md dark:bg-slate-900/95 py-4" 
        : "bg-transparent py-6"
    }`}>
      <div className="container mx-auto px-6">
        <nav className="flex items-center justify-between">
          <Logo size={32} />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-5">
              {[
                { name: "Blog", href: "/blog" },
                { name: "Pricing", href: "/#pricing" },
                { name: "FAQ", href: "/#faq" },
                { name: "Privacy", href: "/privacy" },
                { name: "Terms", href: "/terms" }
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-3 ml-4">
              <Link href="/auth/signin">
                <Button variant="outline" className="rounded-xl border-blue-600 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-500 dark:hover:bg-slate-800">
                  Log In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 hover:shadow-lg transition-all duration-300">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Burger className="w-6 h-6" />
            )}
          </button>
        </nav>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm dark:bg-slate-900/95 border-t border-slate-200 dark:border-slate-800 shadow-lg">
          <div className="container mx-auto px-6 py-5">
            <div className="space-y-4 mb-6">
              {[
                { name: "Blog", href: "/blog" },
                { name: "Pricing", href: "/#pricing" },
                { name: "FAQ", href: "/#faq" },
                { name: "Privacy", href: "/privacy" },
                { name: "Terms", href: "/terms" }
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            <div className="space-y-3">
              <Link href="/auth/signin" className="block w-full">
                <Button variant="outline" className="w-full rounded-xl border-blue-600 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-500 dark:hover:bg-slate-800">
                  Log In
                </Button>
              </Link>
              <Link href="/auth/signup" className="block w-full">
                <Button className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 hover:shadow-lg transition-all duration-300">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
