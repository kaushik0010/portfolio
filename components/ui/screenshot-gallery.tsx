"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface GalleryItem {
  image: string;
  alt: string;
  caption: string;
}

interface ScreenshotGalleryProps {
  gallery: GalleryItem[];
}

export function ScreenshotGallery({ gallery }: ScreenshotGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);

  const activeItem = gallery[activeIndex];

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  }, [gallery.length]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  }, [gallery.length]);

  // Keyboard navigation listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") setLightboxOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, handlePrev, handleNext]);

  return (
    <div className="flex flex-col space-y-6 w-full">
      {/* 1. Main Active Screenshot Showcase */}
      <div className="relative group w-full">
        {/* Mockup browser window container */}
        <div className="relative glass-panel rounded-2xl overflow-hidden p-2 border border-white/5 w-full shadow-2xl bg-bg-secondary/20">
          {/* Top Mockup Header */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-white/5 mb-2 bg-bg-primary/30">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-white/10" />
              <div className="w-2 h-2 rounded-full bg-white/10" />
              <div className="w-2 h-2 rounded-full bg-white/10" />
              <span className="font-mono text-[9px] text-text-muted ml-2">
                active_workspace_preview.png
              </span>
            </div>
            
            {/* Maximize Button to open Lightbox */}
            <button
              onClick={() => setLightboxOpen(true)}
              className="p-1 rounded bg-white/0 hover:bg-white/5 text-text-muted hover:text-text-primary transition-colors cursor-pointer"
              aria-label="Maximize screenshot"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Active Image Render */}
          <div
            onClick={() => setLightboxOpen(true)}
            className="relative aspect-[16/10] rounded-lg overflow-hidden border border-white/5 bg-bg-tertiary cursor-zoom-in group/img"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <Image
                  src={activeItem.image}
                  alt={activeItem.alt}
                  fill
                  className="object-cover object-top"
                  sizes="100vw"
                />
              </motion.div>
            </AnimatePresence>

            {/* Hover overlay hint */}
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
              <div className="px-4 py-2 rounded-lg bg-black/60 backdrop-blur-md border border-white/5 text-xs font-mono text-text-primary flex items-center gap-1.5 shadow-lg">
                <Maximize2 className="w-3.5 h-3.5" />
                Click to expand
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Active Caption & Thumbnail Navigation Strip */}
      <div className="flex flex-col space-y-4">
        {/* Caption */}
        <p className="text-xs sm:text-sm text-text-muted text-center max-w-2xl mx-auto leading-relaxed">
          <strong className="font-semibold text-text-secondary">{activeItem.alt}:</strong>{" "}
          {activeItem.caption}
        </p>

        {/* Thumbnail Selector Strip */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto py-2 px-4 max-w-full">
          {gallery.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={item.image}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "relative aspect-[16/10] w-16 sm:w-20 rounded-lg overflow-hidden border transition-all duration-300 cursor-pointer flex-shrink-0",
                  isActive
                    ? "border-accent ring-2 ring-accent/20"
                    : "border-white/5 opacity-55 hover:opacity-100 hover:border-white/10"
                )}
                aria-label={`Show screenshot ${index + 1}`}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover object-top"
                  sizes="80px"
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Fullscreen Lightbox / Modal Viewer Portal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-8"
          >
            {/* Header Controls */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-text-secondary z-10">
              <span className="font-mono text-xs text-text-muted">
                {activeIndex + 1} / {gallery.length} &mdash; {activeItem.alt}
              </span>
              <button
                onClick={() => setLightboxOpen(false)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-text-primary transition-colors cursor-pointer border border-white/5"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Left Cycle Button */}
            <button
              onClick={handlePrev}
              className="absolute left-4 p-3 rounded-full bg-white/5 hover:bg-white/10 text-text-primary transition-all border border-white/5 z-10 hidden sm:flex cursor-pointer"
              aria-label="Previous screenshot"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Main Lightbox Image Viewport */}
            <div className="relative w-full max-w-5xl aspect-[16/10] max-h-[80vh] rounded-xl border border-white/5 overflow-hidden shadow-2xl bg-bg-secondary">
              <Image
                src={activeItem.image}
                alt={activeItem.alt}
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 1200px"
                priority
              />
            </div>

            {/* Right Cycle Button */}
            <button
              onClick={handleNext}
              className="absolute right-4 p-3 rounded-full bg-white/5 hover:bg-white/10 text-text-primary transition-all border border-white/5 z-10 hidden sm:flex cursor-pointer"
              aria-label="Next screenshot"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Mobile swipe indicator / Navigation controls */}
            <div className="absolute bottom-4 flex gap-4 sm:hidden z-10">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-lg bg-white/5 text-text-primary border border-white/5 cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-lg bg-white/5 text-text-primary border border-white/5 cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
export default ScreenshotGallery;
