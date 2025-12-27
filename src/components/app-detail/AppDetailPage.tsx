"use client";

import React, { useEffect } from "react";
import { Share2, ExternalLink, Bookmark, Check, X } from "lucide-react";
import { toast } from "sonner";
import Footer from "../sections/Footer";
import { Button } from "../ui/button";
import { useBookmarks } from "@/hooks/use-bookmarks";
import { useAuth } from "@/hooks/use-auth";
import { motion, useMotionValue, useTransform, PanInfo, useDragControls } from "motion/react";
import { WebsiteCard } from "../sections/WebsiteGrid";
import { AppDetail } from "@/lib/apps";
import { useIsMobile } from "@/hooks/use-mobile";

interface AppDetailPageProps {
  app: AppDetail;
  onBack: () => void;
  onNavigateToApp?: (appId: string) => void;
  onSubscribeClick?: () => void;
  onSubmitClick?: () => void;
  onLoginClick?: () => void;
  onProfileClick?: () => void;
  onHomeClick?: () => void;
  isInline?: boolean;
}

export default function AppDetailPage({ 
  app, 
  onBack, 
  onNavigateToApp, 
  onSubscribeClick, 
  onSubmitClick, 
  onLoginClick,
  isInline = false,
}: AppDetailPageProps) {
  const isMobile = useIsMobile();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { user } = useAuth();
  const bookmarked = isBookmarked(app.id);
  const dragControls = useDragControls();
  
  const y = useMotionValue(isMobile && !isInline ? 1000 : 0);
  const bgOpacity = useTransform(y, [0, 300], [0.4, 0]);

  const handleBookmark = async () => {
    if (!user) {
      onLoginClick?.();
      return;
    }
    const { error } = await toggleBookmark(app.id);
    if (error) {
      toast.error("Failed to update bookmark");
    } else {
      toast.success(bookmarked ? "Removed from bookmarks" : "Added to bookmarks");
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: app.title,
          text: app.description,
          url: window.location.href,
        });
      } catch {
        // User cancelled or error
      }
    } else {
      // Fallback to copying link
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    }
  };

  useEffect(() => {
    if (!isInline) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [isInline]);

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!isMobile || isInline) return;
    const shouldClose = info.velocity.y > 500 || (info.velocity.y >= 0 && info.offset.y > 150);
    if (shouldClose) {
      onBack();
    } else {
      y.set(0);
    }
  };

  const content = (
    <motion.div
      className={`relative w-full ${isInline ? 'max-w-4xl mx-auto' : isMobile ? 'max-w-4xl bg-background rounded-t-[32px] border-t border-border shadow-[0_-12px_40px_rgba(0,0,0,0.25)] ring-1 ring-white/5' : 'max-w-3xl bg-background rounded-2xl border border-border shadow-2xl'} overflow-hidden flex flex-col ${isInline ? 'shadow-none border-none' : ''}`}
      initial={isInline ? { opacity: 0, y: 20 } : isMobile ? { y: "100%" } : { opacity: 0, scale: 0.95 }}
      animate={isInline ? { opacity: 1, y: 0 } : isMobile ? { y: 0 } : { opacity: 1, scale: 1 }}
      exit={isInline ? { opacity: 0, y: 20 } : isMobile ? { y: "100%" } : { opacity: 0, scale: 0.95 }}
      transition={{
        type: "spring",
        damping: 30,
        stiffness: 300,
        mass: 0.8
      }}
        style={isMobile && !isInline ? { 
          y,
          height: '88vh',
        } : !isInline ? {
          maxHeight: '90vh'
        } : undefined}
        drag={isMobile && !isInline ? "y" : false}
        dragListener={false}
        dragControls={dragControls}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.1 }}
        onDragEnd={handleDragEnd}
      >
      {/* Top Decorative Effects */}
      {!isInline && <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-white/10 via-white/5 to-transparent blur-xl z-50 pointer-events-none opacity-40" />}
      
      {/* Sticky Header Bar */}
      <div className={`sticky top-0 z-30 bg-background transition-shadow duration-200 ${isInline ? 'hidden md:block' : ''} shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)]`}>
        <div className="flex items-center justify-between px-4 md:px-6 h-14 md:h-16">
          <button
            onClick={onBack}
            className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full hover:bg-surface transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 md:w-6 md:h-6 text-primary" />
          </button>
          
            {/* Drag Handle - Mobile Only */}
            {isMobile && !isInline && (
              <div 
                onPointerDown={(e) => dragControls.start(e)}
                className="flex-grow flex justify-center cursor-grab active:cursor-grabbing py-4"
              >
                <div className="w-12 h-1.5 bg-primary/10 rounded-full" />
              </div>
            )}

            {(!isMobile || isInline) && (
              <div className="flex-grow flex justify-center px-4">
                <span className="text-sm font-medium text-secondary truncate max-w-[200px]">
                  {app.title}
                </span>
              </div>
            )}

          <button
            onClick={handleShare}
            className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full hover:bg-surface transition-colors"
            aria-label="Share"
          >
            <Share2 className="w-4 h-4 md:w-5 md:h-5 text-primary" />
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className={`flex-grow ${isInline ? '' : 'overflow-y-auto overflow-x-hidden custom-scrollbar'}`}>
        <div className={`mx-auto px-4 md:px-8 py-6 md:py-8 space-y-6 md:space-y-8 ${isMobile && !isInline ? 'max-w-3xl' : 'w-full max-w-4xl'}`}>
          {/* Preview Image */}
          <div className="relative w-full aspect-[16/10] bg-surface rounded-sm overflow-hidden border border-border/40">
            <img
              src={app.previewImage}
              alt={app.title}
              className="w-full h-full object-cover object-top"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = app.faviconUrl;
                e.currentTarget.className = "w-full h-full object-contain p-16";
              }}
            />
          </div>

            {/* Title & Description */}
            <div>
              <h1 className="text-4xl text-primary mb-2 tracking-tight">
                {app.title}
              </h1>
              <p className="text-secondary text-lg">
                {app.shortDescription || app.description}
              </p>
            </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <Button
                  asChild
                  variant="primary"
                  className="w-full h-12 text-base font-bold shadow-lg shadow-text-primary/10 hover:-translate-y-0.5 !bg-white !text-black border-none"
                >
                  <a
                    href={app.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <span className="">Visit Website</span>
                    <ExternalLink className="w-5 h-5 " />
                  </a>
                </Button>

              <Button
                onClick={handleBookmark}
                variant="secondary"
                className={`w-full h-12 text-base font-bold ${
                  bookmarked 
                    ? "border-[#ff4500] bg-[#ff4500]/5 text-[#ff4500] hover:bg-[#ff4500]/10 hover:border-[#ff4500]" 
                    : "border-border hover:bg-surface text-primary hover:border"
                }`}
              >
                <motion.div
                  animate={bookmarked ? { scale: [1, 1.4, 1] } : { scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Bookmark className={`w-5 h-5 ${bookmarked ? "fill-current" : ""}`} />
                </motion.div>
                <span>{bookmarked ? "Bookmarked" : "Bookmark App"}</span>
              </Button>
            </div>

          {/* App Information Section */}
          <section className="border-t border-border pt-8">
            <h3 className="text-2xl text-primary mb-6">
              App Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-secondary text-base">Category</span>
                <span className="text-primary text-base font-medium">{app.category}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-secondary text-base">Platforms</span>
                <span className="text-primary text-base text-right font-medium">{app.platforms.join(", ")}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-secondary text-base">Pricing</span>
                <span className="text-primary text-base font-medium">{app.pricing}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-secondary text-base">Last Updated</span>
                <span className="text-primary text-base font-medium">{app.lastUpdated}</span>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section className="border-t border-border pt-8">
            <h2 className="text-2xl text-primary mb-4">
              About {app.title}
            </h2>
            <p className="text-secondary text-lg leading-relaxed mb-4">
              {app.about}
            </p>
            <p className="text-text-tertiary text-base leading-relaxed">
              This is a demo description for {app.title}. It represents the kind of content you would find on the detail page. Ideally this would come from a database or CMS.
            </p>
          </section>

          {/* Key Features */}
          {app.features && app.features.length > 0 && (
            <section className="border-t border-border pt-8">
              <h2 className="text-2xl text-primary mb-6">
                Key Features
              </h2>
              <ul className="space-y-4">
                {app.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-success/10 flex items-center justify-center mt-0.5">
                      <Check className="w-4 h-4 text-success" />
                    </div>
                    <span className="text-secondary text-lg">{feature}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

            {/* Related Apps */}
            {app.relatedApps && app.relatedApps.length > 0 && (
              <section className="border-t border-border pt-8 pb-12">
                <h2 className="text-2xl text-primary mb-6">
                  Related Apps
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {app.relatedApps.map((relatedApp) => (
                      <WebsiteCard 
                        key={relatedApp.id} 
                        item={relatedApp} 
                        onClick={onNavigateToApp}
                        onLoginClick={onLoginClick}
                      />
                    ))}
                </div>
              </section>
            )}
        </div>
        <Footer 
          onSubscribeClick={onSubscribeClick}
          onSubmitClick={onSubmitClick}
        />
      </div>
    </motion.div>
  );

  if (isInline) {
    return content;
  }

  return (
    <div className={`fixed inset-0 z-50 flex flex-col ${isMobile ? 'justify-end' : 'justify-center items-center p-6 md:p-12'}`}>
        {/* Backdrop */}
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={isMobile ? { opacity: bgOpacity } : undefined}
          onClick={onBack}
        />
        {content}
      </div>
  );
}
