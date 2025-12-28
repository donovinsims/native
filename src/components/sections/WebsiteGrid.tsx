"use client";

import React from "react";
import { motion } from "motion/react";
import { Bookmark, ExternalLink } from "lucide-react";
import { useBookmarks } from "@/hooks/use-bookmarks";
import { useAuth } from "@/hooks/use-auth";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";

interface Website {
  id: string;
  title: string;
  description: string;
  href: string;
  faviconUrl: string;
  previewImage: string;
  category?: string;
}

interface WebsiteGridProps {
  items: Website[];
  onItemClick?: (id: string) => void;
  onLoginClick?: () => void;
}

export default function WebsiteGrid({ items, onItemClick, onLoginClick }: WebsiteGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-7 md:gap-9 mt-6">
      {items.map((item) => (
        <WebsiteCard key={item.id} item={item} onClick={onItemClick} onLoginClick={onLoginClick} />
      ))}
    </div>
  );
}

export function WebsiteCard({ item, onClick, onLoginClick }: { item: Website; onClick?: (id: string) => void; onLoginClick?: () => void }) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const bookmarked = isBookmarked(item.id);

    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();
      onClick?.(item.id);
    };

  const handleBookmark = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      onLoginClick?.();
      return;
    }
    const { error } = await toggleBookmark(item.id);
    if (error) {
      toast.error("Failed to update bookmark");
    } else {
      toast.success(bookmarked ? "Removed from bookmarks" : "Added to bookmarks");
    }
  };

  const handleExternalLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(item.href, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-col gap-3 group">
      {/* Card Preview */}
        <motion.button
          onClick={handleClick}
          className="relative w-full block overflow-hidden transition-all duration-500 bg-ui-1 border border-border-1 rounded-xl hover:border-border-2"
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <div className="relative w-full aspect-[16/10]">
              {/* Thumbnail Preview */}
              <div className="absolute inset-0 bg-ui-2 overflow-hidden">
                <img 
                  src={item.previewImage} 
                  alt={item.title} 
                  className="w-full h-full object-cover object-top transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
            </div>
        </div>
      </motion.button>

      {/* Actions - Name, Category, Bookmark, and External Link */}
      <div className="flex items-center justify-between px-1">
        {/* Name & Category */}
        <button 
          onClick={handleClick}
          className="flex items-center gap-1.5 text-left flex-1 min-w-0"
        >
          <span className="text-body font-semibold text-text truncate">
            {item.title}
          </span>
          {item.category && (
            <>
              <span className="text-grey font-medium">·</span>
              <span className="text-grey text-body font-medium truncate">
                {item.category}
              </span>
            </>
          )}
        </button>

            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                onClick={handleBookmark}
                className="p-0.5 transition-colors text-grey hover:text-text bg-transparent focus:ring-0"
                aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
              >
                <motion.div
                  animate={bookmarked ? { scale: [1, 1.35, 1] } : { scale: 1 }}
                  transition={{ duration: 0.3, times: [0, 0.5, 1], ease: "easeInOut" }}
                >
                  <Bookmark 
                    className={`w-4 h-4 ${bookmarked ? "fill-[#ff4500] text-[#ff4500]" : ""}`}
                  />
                </motion.div>
              </button>

              <motion.button
                onClick={handleExternalLink}
                className="p-1.5 rounded-xl hover:bg-ui-3 transition-colors text-grey hover:text-text"
                whileTap={{ scale: 0.9 }}
                aria-label="Open in new tab"
              >
              <ExternalLink className="w-4 h-4" />
            </motion.button>
          </div>
      </div>
    </div>
  );
}
