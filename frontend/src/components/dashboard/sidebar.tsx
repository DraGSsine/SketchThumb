"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { 
  Image as ImageIcon,
  RotateReverse,
  Sparkles,
  Download,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize
} from "../../../public/icons/SvgIcons";
import { useUserInfo } from "@/lib/queries";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Constants for localStorage keys
const TARGET_PLATFORM_STORAGE_KEY = "thumbnail-generator-target-platform";
const DRAWING_STORAGE_KEY = "logo-generator-canvas";

type SidebarProps = {
  showSidebar: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isMounted: boolean;
};

const PLATFORM_OPTIONS = [
  { label: "YouTube", value: "youtube" },
  { label: "Twitch", value: "twitch" },
  { label: "Instagram", value: "instagram" },
  { label: "TikTok", value: "tiktok" },
  { label: "LinkedIn", value: "linkedin" },
  { label: "Twitter/X", value: "twitter" }
];

const Sidebar = ({ showSidebar, isMobile, isTablet, isMounted }: SidebarProps) => {
  const { refetch } = useUserInfo();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [promptText, setPromptText] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [currentPreviewImage, setCurrentPreviewImage] = useState<string | null>(null);

  const [targetPlatform, setTargetPlatform] = useState<string>("youtube");

  useEffect(() => {
    const savedPlatform = localStorage.getItem(TARGET_PLATFORM_STORAGE_KEY);
    if (savedPlatform) {
      const isValidPlatform = PLATFORM_OPTIONS.some(p => p.value === savedPlatform);
      if (isValidPlatform) {
        setTargetPlatform(savedPlatform);
      } else {
        setTargetPlatform("youtube");
        localStorage.setItem(TARGET_PLATFORM_STORAGE_KEY, "youtube");
      }
    } else {
      localStorage.setItem(TARGET_PLATFORM_STORAGE_KEY, "youtube");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(TARGET_PLATFORM_STORAGE_KEY, targetPlatform);
  }, [targetPlatform]);

  const getRightSidebarWidth = () => {
    if (!isMounted) return "30%";
    if (isMobile) return "90%";
    return "30%";
  };

  const handlePlatformChange = (value: string) => {
    setTargetPlatform(value);
  };

  const logoMutation = useMutation({
    mutationFn: async (generationData: {
      prompt: string;
      targetPlatform: string;
      sketch: string | null;
      timestamp: string
    }) => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const payload = {
        prompt: generationData.prompt,
        targetPlatform: generationData.targetPlatform,
        sketch: generationData.sketch,
        timestamp: generationData.timestamp,
      };
      const response = await api.post(`${apiUrl}/ai/generate`, payload);
      return response.data;
    },
    onSuccess: (data) => {
      if (Array.isArray(data) && data.length > 0) {
        const processedImages = data.map((imageData: string) => {
          if (imageData.startsWith('data:image/')) {
            return imageData;
          }
          return `data:image/png;base64,${imageData}`;
        });
        setImages(processedImages);
        setHasGenerated(true);
      } else if (data.images && Array.isArray(data.images)) {
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

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPromptText(e.target.value);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);

    try {
      const sketchPng = localStorage.getItem(DRAWING_STORAGE_KEY);

      const generationData = {
        prompt: promptText,
        targetPlatform: targetPlatform,
        sketch: sketchPng,
        timestamp: new Date().toISOString(),
      };

      logoMutation.mutate(generationData);
    } catch (error) {
      console.error("Error preparing generation data:", error);
      setIsGenerating(false);
    }
  };

  const handleImageClick = (image: string, index: number) => {
    setSelectedImage(index);
    setCurrentPreviewImage(image);
    setPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setPreviewOpen(false);
  };

  const handleDownload = () => {
    if (!currentPreviewImage) return;
    
    const link = document.createElement("a");
    link.href = currentPreviewImage;
    link.download = `thumbnail-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePreviousImage = () => {
    const newIndex = selectedImage > 0 ? selectedImage - 1 : images.length - 1;
    setSelectedImage(newIndex);
    setCurrentPreviewImage(images[newIndex]);
  };

  const handleNextImage = () => {
    const newIndex = selectedImage < images.length - 1 ? selectedImage + 1 : 0;
    setSelectedImage(newIndex);
    setCurrentPreviewImage(images[newIndex]);
  };

  return (
    <>
      <AnimatePresence>
        {showSidebar && (
          <motion.div
            initial={{ 
              x: "100%",
              opacity: 0,
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
            className="fixed md:relative right-0 top-[56px] md:top-0 z-30 h-[calc(100dvh-56px)] h-[calc(calc(var(--vh,1vh)*100)-56px)] md:h-full bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-lg md:shadow-none"
          >
            <div className="w-full h-full bg-white rounded-2xl flex flex-col overflow-hidden">

              <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Preview</h3>
                  {isGenerating && (
                    <div className="aspect-video mb-3">
                      <div className="relative w-full h-full bg-gray-100 rounded-lg overflow-hidden">
                        <Skeleton variant="blob" className="w-full h-full" />
                      </div>
                    </div>
                  )}

                  {!isGenerating && hasGenerated && images.length > 0 && (
                    <div className="mb-3">
                      <div 
                        className="group aspect-video bg-gray-50 rounded-lg overflow-hidden border border-gray-200 hover:border-blue-300 transition-all relative cursor-pointer"
                        onClick={() => handleImageClick(images[selectedImage], selectedImage)}
                      >
                        <div className="relative w-full h-full">
                          <Image
                            layout="fill"
                            objectFit="contain"
                            src={images[selectedImage]}
                            alt={`Generated Thumbnail ${selectedImage + 1}`}
                            className="p-1"
                          />
                          <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                            <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                              <Maximize className="w-5 h-5 text-gray-700" />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {images.length > 1 && (
                        <div className="grid grid-cols-4 gap-2 mt-3">
                          {images.map((image, index) => (
                            <div
                              key={index}
                              className={cn(
                                "aspect-video bg-white rounded-md overflow-hidden border cursor-pointer transition-all relative group",
                                selectedImage === index
                                  ? "ring-2 ring-blue-500 border-blue-500"
                                  : "border-gray-200 hover:border-gray-300"
                              )}
                              onClick={() => handleImageClick(image, index)}
                            >
                              <div className="relative w-full h-full">
                                <Image
                                  layout="fill"
                                  objectFit="contain"
                                  src={image}
                                  alt={`Thumbnail variant ${index + 1}`}
                                  className="p-0.5"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                  <div className="bg-white/80 rounded-full p-1 shadow-sm">
                                    <Maximize className="w-3 h-3 text-gray-700" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {!isGenerating && !hasGenerated && (
                    <div className="aspect-video mb-3">
                      <div className="w-full h-full bg-gray-50 rounded-lg flex flex-col items-center justify-center p-6 border border-dashed border-gray-200">
                        <ImageIcon className="w-10 h-10 md:w-12 md:h-12 text-gray-300 mb-3" />
                        <span className="text-sm text-gray-500 text-center">
                          Generated thumbnail will appear here
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 md:px-6 md:py-4 border-t border-gray-200 bg-gray-50 flex-shrink-0">
                <div className="space-y-4 mb-4">
                  <div>
                    <Label htmlFor="targetPlatform" className="text-xs font-medium text-gray-600 mb-1.5 block">Target Platform</Label>
                    <Select
                      value={targetPlatform}
                      onValueChange={handlePlatformChange}
                    >
                      <SelectTrigger id="targetPlatform" className="w-full text-sm bg-white border-gray-200">
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        {PLATFORM_OPTIONS.map(platform => (
                          <SelectItem key={platform.value} value={platform.value} className="text-sm">
                            {platform.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="prompt" className="text-xs font-medium text-gray-600 mb-1.5 block">Prompt</Label>
                    <div className="relative">
                      <Textarea
                        id="prompt"
                        value={promptText}
                        onChange={handlePromptChange}
                        placeholder="Describe the thumbnail you want... e.g., 'A cute cat astronaut floating in space'"
                        className="min-h-[100px] text-sm resize-none rounded-lg border-gray-200 bg-white focus:border-blue-400 focus:ring-blue-100 text-gray-800 pr-10 shadow-sm"
                      />
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full py-6 font-semibold text-zinc-50 rounded-lg transition-all flex items-center justify-center gap-2 text-sm shadow-sm bg-blue-500 "
                  variant="default"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <RotateReverse iconPrimary='#fff' iconSecondary='#fff' className="w-4 h-4 animate-spin" /> Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles iconPrimary='#fff' iconSecondary='#fff' className="w-4 h-4" /> Generate Thumbnail
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Thumbnail Preview Modal */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw] xl:max-w-[60vw] p-0 rounded-lg overflow-hidden bg-white shadow-2xl">
          <div className="flex flex-col h-full max-h-[90vh]">
            <DialogHeader className="p-4 border-b border-gray-200 flex flex-row items-center justify-between">
              <DialogTitle className="text-lg font-medium text-gray-800">Thumbnail Preview</DialogTitle>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  onClick={handleClosePreview}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
            </DialogHeader>
            <div className="relative flex-1 bg-gray-50 flex items-center justify-center p-6 overflow-auto">
              {images.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/80 backdrop-blur-sm border-gray-300 hover:bg-gray-100 text-gray-600 shadow-md"
                    onClick={handlePreviousImage}
                  >
                    <ChevronLeft className="h-5 w-5" />
                    <span className="sr-only">Previous image</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/80 backdrop-blur-sm border-gray-300 hover:bg-gray-100 text-gray-600 shadow-md"
                    onClick={handleNextImage}
                  >
                    <ChevronRight className="h-5 w-5" />
                    <span className="sr-only">Next image</span>
                  </Button>
                </>
              )}
              <div className="relative w-full h-full flex items-center justify-center">
                {currentPreviewImage && (
                  <Image
                    src={currentPreviewImage}
                    alt="Preview"
                    className="object-contain max-w-full max-h-full rounded-md shadow-sm"
                    width={1920}
                    height={1080}
                    priority
                  />
                )}
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 bg-white flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {`Image ${selectedImage + 1} of ${images.length}`}
              </span>
              <Button 
                onClick={handleDownload}
                className="bg-blue-600 hover:bg-blue-700 text-white gap-2 px-4 py-2 rounded-md text-sm font-medium shadow-sm"
                disabled={!currentPreviewImage}
              >
                <Download iconPrimary='#fff' iconSecondary='#fff'/>
                Download
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

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
        "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-300/20 before:to-transparent",
        variant === "blob" && "bg-gray-200",
        className
      )}
    />
  );
};

export default Sidebar;