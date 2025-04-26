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
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? "bg-white bg-opacity-80 dark:bg-slate-900 dark:bg-opacity-80 backdrop-blur-md shadow-sm py-4" : "py-6"
    }`}>
      <div className="container mx-auto px-4 md:px-8">
        <nav className="flex items-center justify-between">
          <Logo size={32} />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              {[
                { name: "Pricing", href: "/#pricing" },
                { name: "FAQ", href: "/#faq" },
                { name: "Privacy", href: "/privacy" },
                { name: "Terms", href: "/terms" }
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 text-sm font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-3">
              <Link href="/auth/signin">
                <Button variant="outline" className="border-blue-600 text-blue-600">
                  Log In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button className="bg-blue-600 text-zinc-100">Get Started</Button>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
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
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-gray-800">
          <div className="container mx-auto px-4 py-4 divide-y divide-gray-100 dark:divide-gray-800">
            <div className="py-3 space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "Pricing", href: "/#pricing" },
                { name: "FAQ", href: "/#faq" },
                { name: "Privacy", href: "/privacy" },
                { name: "Terms", href: "/terms" }
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            <div className="py-3 space-y-3">
              <Link href="/auth/signin">
                <Button variant="outline" className="w-full border-blue-600 text-blue-600">
                  Log In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button className="w-full bg-blue-600">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
