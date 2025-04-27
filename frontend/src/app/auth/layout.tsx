import React, { ReactNode } from "react";
import { Metadata } from "next";
import Logo from "@/components/landing/logo";

export const metadata: Metadata = {
  title: {
    default: "Authentication",
    template: "%s | Authentication",
  },
  description: "Sign in or create an account to access your dashboard.",
};

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      {/* Left Panel */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800">
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:64px_64px]" />

        {/* Decorative Gradients */}
        <div className="absolute -left-40 -top-40 h-[800px] w-[800px] rounded-full bg-gradient-to-tr from-blue-400/30 to-fuchsia-400/30 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-[600px] w-[600px] rounded-full bg-gradient-to-bl from-cyan-400/30 to-blue-400/30 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-blue-600/10 to-blue-600/10 blur-2xl" />

        {/* Content Container with better organization */}
        <div className="relative flex flex-col h-full">
          {/* Top Section with Logo */}
          <div className="mt-10 ml-10 bg-white p-2 rounded-xl w-44">
            <Logo size={100} textClass="" />
          </div>

          {/* Center Section with Text */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="px-12 max-w-lg">
              <h1 className="text-6xl font-extrabold text-white leading-tight">
                Welcome to <span className="text-cyan-200">Scrive</span>
              </h1>
              <p className="text-xl text-blue-100 mt-6">
                Transform your sketches into stunning thumbnails with the power of AI.
              </p>
              <div className="mt-8">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 text-blue-50 backdrop-blur-sm">
                  <span className="mr-2">✨</span>
                  <span>Quick. Simple. Powerful.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section with Features */}
          <div className="w-full mb-16 px-12">
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 transform transition-all duration-300 hover:-translate-y-1 hover:bg-white/15">
                <div className="text-cyan-200 text-lg font-semibold mb-2">Sketch</div>
                <p className="text-blue-50 text-sm">Draw your ideas directly in the browser or upload your sketches</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 transform transition-all duration-300 hover:-translate-y-1 hover:bg-white/15">
                <div className="text-cyan-200 text-lg font-semibold mb-2">Transform</div>
                <p className="text-blue-50 text-sm">Our AI engine turns rough sketches into professional thumbnails</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 transform transition-all duration-300 hover:-translate-y-1 hover:bg-white/15">
                <div className="text-cyan-200 text-lg font-semibold mb-2">Share</div>
                <p className="text-blue-50 text-sm">Download and use your thumbnails on any platform</p>
              </div>
            </div>
            
            <div className="flex justify-center mt-10">
              <div className="text-white/80 text-center max-w-md">
                <p className="text-sm mb-2">Simplify your workflow and create stunning thumbnails effortlessly</p>
                <div className="flex space-x-2 justify-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-cyan-300"></span>
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-300"></span>
                  <span className="inline-block w-2 h-2 rounded-full bg-purple-300"></span>
                </div>
              </div>
            </div>
          </div>

          {/* Floating elements */}
          <div className="absolute top-1/4 right-20 w-40 h-40 rounded-full bg-blue-200/60 blur-3xl auth-float"></div>
          <div className="absolute bottom-1/4 left-20 w-48 h-48 rounded-full bg-purple-200/60 blur-3xl auth-float-delayed"></div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="flex-1 flex items-center justify-center">{children}</div>
    </div>
  );
};

export default AuthLayout;
