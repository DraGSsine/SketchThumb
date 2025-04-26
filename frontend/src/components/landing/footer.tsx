"use client";

import React from "react";
import Logo from "./logo";
import Link from "next/link";
import { Linkedin, Twitter } from "../../../public/icons/SvgIcons";

const Footer = () => {
  return (
    <footer className="bg-blue-50 dark:bg-blue-950/20">
      <div className="border-t border-gray-300 dark:border-gray-700">
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand Column */}
            <div>
              <Logo size={32} />
              <p className="text-gray-700 dark:text-gray-300 text-sm mt-4">
                Transform your sketches into eye-catching thumbnails with SketchThumb.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">Quick Links</h3>
              <div className="mt-4 space-y-2">
                {[
                  ["Home", "/"],
                  ["Pricing", "/#pricing"],
                  ["FAQ", "/#faq"],
                ].map(([name, href]) => (
                  <Link
                    key={name}
                    href={href}
                    className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">Legal</h3>
              <div className="mt-4 space-y-2">
                {[
                  ["Terms of Service", "/terms"],
                  ["Privacy Policy", "/privacy"],
                ].map(([name, href]) => (
                  <Link
                    key={name}
                    href={href}
                    className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {name}
                  </Link>
                ))}
              </div>
              
              {/* Social */}
              <div className="mt-6">
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">Connect</h3>
                <div className="flex items-center space-x-4 mt-2">
                  <Link
                    target="_blank"
                    href="https://www.linkedin.com/in/yassineouchen/"
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                    aria-label="Visit Yassine Ouchen's LinkedIn profile"
                  >
                    <Linkedin className="w-5 h-5" />
                  </Link>
                  <Link
                    target="_blank"
                    href="https://twitter.com/yassin_ouchn"
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                    aria-label="Visit Yassine Ouchen's Twitter profile"
                  >
                    <Twitter className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-gray-300 dark:border-gray-700">
            <div className="text-gray-600 dark:text-gray-400 text-sm text-center">
              © {new Date().getFullYear()} SketchThumb. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
