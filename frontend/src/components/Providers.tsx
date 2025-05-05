"use client";
import React from "react";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./ui/toaster";
import { PostHogProvider } from "./ph-provider";
import SuspendedPostHogPageView from "./ph-page-view";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <Toaster />
      <PostHogProvider>
        <SuspendedPostHogPageView />
        {children}
      </PostHogProvider>
    </QueryClientProvider>
  );
};

export default Providers;
