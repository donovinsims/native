"use client";

import React from "react";
import { Share2, ExternalLink, Bookmark, Check, ArrowLeft, Globe, Monitor, CreditCard, User, Clock } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useBookmarks } from "@/hooks/use-bookmarks";
import { useAuth } from "@/hooks/use-auth";
import { motion } from "motion/react";
import { WebsiteCard } from "../sections/WebsiteGrid";
import { AppDetail } from "@/lib/apps";
import { Container } from "../ui/container";

interface DesktopAppDetailProps {
  app: AppDetail;
  onBack: () => void;
  onNavigateToApp?: (appId: string) => void;
  onLoginClick?: () => void;
}

export default function DesktopAppDetail({ 
  app, 
  onBack, 
  onNavigateToApp, 
  onLoginClick 
}: DesktopAppDetailProps) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { user } = useAuth();
  const bookmarked = isBookmarked(app.id);

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
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background transition-colors duration-300"
    >
      <div className="bg-background sticky top-[67px] z-10 py-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
        <Container>
          <button
            onClick={onBack}
            className="group flex items-center gap-2 text-secondary hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm font-semibold tracking-wide uppercase">Back to Directory</span>
          </button>
        </Container>
      </div>

      <Container className="py-12 pb-32">
        <div className="grid grid-cols-12 gap-16">
          {/* Main Content Column */}
          <div className="col-span-8 space-y-16">
            {/* App Hero Section */}
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div>
                  <h1 className="text-5xl font-bold text-primary tracking-tight mb-2">
                    {app.title}
                  </h1>
                  <p className="text-2xl text-secondary font-medium">
                    {app.category}
                  </p>
                </div>
              </div>

                  <div className="relative aspect-[16/10] bg-surface rounded-sm overflow-hidden border border-border/40 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_0_0_1px_rgba(255,255,255,0.05)]">
                  <img
                    src={app.previewImage}
                    alt={app.title}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = app.faviconUrl;
                      e.currentTarget.className = "w-full h-full object-contain p-24";
                    }}
                  />
                </div>
            </div>

            {/* About Section */}
            <section className="max-w-3xl">
              <h2 className="text-3xl font-bold text-primary mb-8 tracking-tight">
                About the App
              </h2>
              <div className="space-y-6">
                <p className="text-secondary leading-relaxed text-2xl font-light">
                  {app.about}
                </p>
                <p className="text-text-tertiary leading-relaxed text-lg">
                  Experience {app.title}'s innovative approach to {app.category.toLowerCase()}. 
                  Designed for modern workflows and built with attention to detail, 
                  it offers a seamless experience that sets it apart from the competition.
                </p>
              </div>
            </section>

            {/* Features Section */}
            {app.features && app.features.length > 0 && (
              <section className="bg-surface/30 rounded-[40px] p-12 border border-border/50">
                <h2 className="text-2xl font-bold text-primary mb-10 tracking-tight flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-success" />
                  Key Features & Capabilities
                </h2>
                <div className="grid grid-cols-2 gap-x-16 gap-y-8">
                  {app.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-4 group">
                      <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-background border border-border flex items-center justify-center mt-0.5 group-hover:border-success/50 transition-colors">
                        <Check className="w-4 h-4 text-success" />
                      </div>
                      <span className="text-secondary text-lg leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar Column */}
          <div className="col-span-4">
            <div className="sticky top-[160px] space-y-8">
              {/* Primary Actions Card */}
              <div className="bg-background border border-border rounded-[32px] p-6 shadow-xl shadow-black/[0.02]">
                  <div className="flex items-center justify-between mb-8">
                    <span className="px-3 py-1 rounded-full bg-success/10 text-success text-xs font-bold uppercase tracking-wider">
                      Official Website
                    </span>
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={handleShare}
                      className="rounded-xl border border-border transition-all hover:scale-105 active:scale-95"
                      title="Share app"
                    >
                      <Share2 className="w-5 h-5 text-secondary" />
                    </Button>
                  </div>

                      <div className="space-y-3">
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
                      <Bookmark className={`w-5 h-5 ${bookmarked ? "fill-current" : ""}`} />
                      <span>{bookmarked ? "Bookmarked" : "Bookmark App"}</span>
                    </Button>
                  </div>

                <p className="text-text-tertiary text-sm text-center mt-4 px-4">
                  By visiting this website you agree to their terms of service and privacy policy.
                </p>
              </div>

              {/* Information Card */}
              <div className="bg-surface/40 border border-border rounded-[32px] p-6">
                <h3 className="text-sm font-bold text-text-tertiary uppercase tracking-[0.2em] mb-8">
                  App Intelligence
                </h3>
                <div className="space-y-8">
                  <InfoItem icon={Globe} label="Website" value={new URL(app.websiteUrl).hostname} href={app.websiteUrl} />
                  <InfoItem icon={Monitor} label="Platforms" value={app.platforms.join(", ")} />
                  <InfoItem icon={CreditCard} label="Pricing Model" value={app.pricing} />
                  <InfoItem icon={User} label="Developer" value={app.developer} />
                  <InfoItem icon={Clock} label="Last Inspected" value={app.lastUpdated} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Apps Section */}
        {app.relatedApps && app.relatedApps.length > 0 && (
          <section className="mt-32 pt-20 border-t border-border">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-4xl font-bold text-primary tracking-tight mb-4">
                  Discover Similar Apps
                </h2>
                <p className="text-secondary text-xl font-light">
                  Hand-picked alternatives that match your taste for quality design.
                </p>
              </div>
              <button 
                onClick={onBack}
                className="text-primary font-bold hover:underline underline-offset-8"
              >
                View all apps
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-10">
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
      </Container>
    </motion.div>
  );
}

function InfoItem({ icon: Icon, label, value, href }: { icon: any, label: string, value: string, href?: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon className="w-5 h-5 text-secondary" />
      </div>
      <div className="space-y-1 overflow-hidden">
        <p className="text-[10px] text-text-tertiary font-bold uppercase tracking-wider">{label}</p>
        {href ? (
          <a href={href} target="_blank" className="text-base font-semibold text-primary hover:text-success transition-colors truncate block">
            {value}
          </a>
        ) : (
          <p className="text-base font-semibold text-primary truncate">{value}</p>
        )}
      </div>
    </div>
  );
}
