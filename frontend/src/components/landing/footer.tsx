"use client";

import React from "react";
import Logo from "./logo";
import Link from "next/link";
import { Linkedin, Twitter } from "../../../public/icons/SvgIcons";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-white to-blue-50 dark:from-slate-900 dark:to-slate-800 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -left-24 w-56 h-56 bg-blue-200 dark:bg-blue-900/20 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-24 w-64 h-64 bg-indigo-200 dark:bg-indigo-900/20 rounded-full opacity-20 blur-3xl"></div>
      </div>
      
      <div className="border-t border-slate-200 dark:border-slate-700 relative z-10">
        <div className="container mx-auto px-6 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Brand Column */}
            <div>
              <Logo size={32} />
              <p className="text-slate-700 dark:text-slate-300 text-sm mt-4 max-w-md">
                Transform your sketches into eye-catching thumbnails with SketchThumb. AI-powered thumbnail generation for content creators.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-200 mb-5">Quick Links</h3>
              <div className="mt-4 space-y-3">
                {[
                  ["Home", "/"],
                  ["Pricing", "/#pricing"],
                  ["FAQ", "/#faq"],
                ].map(([name, href]) => (
                  <Link
                    key={name}
                    href={href}
                    className="block text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-200 mb-5">Legal</h3>
              <div className="mt-4 space-y-3">
                {[
                  ["Terms of Service", "/terms"],
                  ["Privacy Policy", "/privacy"],
                ].map(([name, href]) => (
                  <Link
                    key={name}
                    href={href}
                    className="block text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {name}
                  </Link>
                ))}
              </div>
              
              {/* Social */}
              <div className="mt-8">
                <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-200 mb-3">Connect</h3>
                <div className="flex items-center space-x-4 mt-2">
                  <Link
                    target="_blank"
                    href="https://www.linkedin.com/in/yassineouchen/"
                    className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    aria-label="Visit Yassine Ouchen's LinkedIn profile"
                  >
                    <Linkedin className="w-5 h-5" />
                  </Link>
                  <Link
                    target="_blank"
                    href="https://twitter.com/yassin_ouchn"
                    className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    aria-label="Visit Yassine Ouchen's Twitter profile"
                  >
                    <Twitter className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-700">
            <div className="text-slate-600 dark:text-slate-400 text-sm text-center">
              © {new Date().getFullYear()} SketchThumb. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
