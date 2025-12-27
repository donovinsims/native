"use client";

import React, { useState } from "react";
import { X, Menu, Paintbrush, Code, ListChecks, Shield, Zap, MessageSquare, Wrench, Sparkles, ArrowUpRight, Mail } from "lucide-react";
import { ThemeToggle } from "../theme-toggle";
import { Button } from "../ui/button";

interface MobileNavTriggerProps {
  onClick: () => void;
}

export function MobileNavTrigger({ onClick }: MobileNavTriggerProps) {
  return (
    <button
      onClick={onClick}
      className="lg:hidden flex items-center justify-center w-10 h-10 rounded-md hover:bg-surface transition-colors"
      aria-label="Open menu"
    >
      <Menu className="w-6 h-6 text-primary" />
    </button>
  );
}

interface Category {
  icon: React.ElementType;
  label: string;
  href: string;
}

const categories: Category[] = [
  { icon: Sparkles, label: "All", href: "/" },
  { icon: Paintbrush, label: "Design", href: "/category/design" },
  { icon: Code, label: "Development", href: "/category/development" },
  { icon: ListChecks, label: "Productivity", href: "/category/productivity" },
  { icon: Shield, label: "Security", href: "/category/security" },
  { icon: Zap, label: "Automation", href: "/category/automation" },
  { icon: MessageSquare, label: "Communication", href: "/category/communication" },
  { icon: Wrench, label: "Utilities", href: "/category/utilities" },
];

interface MobileNavOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribeClick?: () => void;
  onSubmitClick?: () => void;
  onLoginClick?: () => void;
}

export function MobileNavOverlay({
  isOpen,
  onClose,
  onSubscribeClick,
  onSubmitClick,
  onLoginClick,
}: MobileNavOverlayProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const MagicIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      role="img"
      viewBox="0 0 10.67 10.67"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Magic Icon</title>
      <path d="M5.33333 0L6.41334 4.28L10.6667 5.33333L6.41334 6.38667L5.33333 10.6667L4.25333 6.38667L0 5.33333L4.25333 4.28L5.33333 0Z" />
    </svg>
  );

  if (!isOpen) return null;

  const handleSubscribe = () => {
    onClose();
    onSubscribeClick?.();
  };

  const handleSubmit = () => {
    onClose();
    onSubmitClick?.();
  };

  const handleLogin = () => {
    onClose();
    onLoginClick?.();
  };

  const handleCategoryClick = (label: string) => {
    setActiveCategory(label);
    // In a real app, this would navigate to the category
    setTimeout(() => onClose(), 200);
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div className="absolute top-0 right-0 w-full max-w-lg h-full bg-background shadow-2xl overflow-y-auto border-l border-border">
        {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-background transition-colors">
            <div className="flex w-max items-center gap-xs rounded-pill border border-border bg-background px-md py-sm text-h1 leading-none transition-all duration-200 ease-in-out">
              <span>see</span>
              <MagicIcon className="w-[10.67px]" />
              <span>saw</span>
            </div>
            <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={onClose}
              className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-surface transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6 text-primary" />
            </button>
          </div>
        </div>

        {/* Auth & Subscribe Buttons */}
          <div className="px-4 pt-8 pb-8 space-y-4">
            <Button 
              variant="secondary"
              onClick={handleLogin}
              className="w-full h-12 text-base font-bold"
            >
              Sign In
            </Button>
            <Button
              variant="primary"
              onClick={handleSubscribe}
              className="w-full h-12 text-base font-bold bg-[#ff4500] hover:bg-[#ff4500]/90 border-none"
            >
              Subscribe
            </Button>
          </div>

        {/* Categories */}
        <div className="px-4 pb-8">
          <nav className="space-y-2">
            {categories.map((category) => (
              <button
                key={category.label}
                onClick={() => handleCategoryClick(category.label)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-pill transition-colors ${
                  activeCategory === category.label
                    ? "bg-primary text-background"
                    : "text-secondary hover:bg-surface"
                }`}
              >
                <category.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{category.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Footer Section */}
        <div className="px-4 pb-6 space-y-3 border-t border-border pt-6">
          {/* Sponsor Us */}
          <a
            href="https://tally.so/r/wLP5VG"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-4 py-3 rounded-pill bg-surface hover:bg-surface-raised transition-colors border border-border"
          >
            <span className="text-sm font-medium text-secondary">Sponsor us</span>
            <ArrowUpRight className="w-4 h-4 text-secondary" />
          </a>

          {/* Submit Button */}
          <Button
            variant="secondary"
            onClick={handleSubmit}
            className="w-full h-12 text-base font-bold"
          >
            Submit
          </Button>

          {/* Email */}
          <div className="flex items-center justify-between px-4 py-3 rounded-pill bg-surface border border-border">
            <span className="text-sm font-medium text-secondary">hi@seesaw.website</span>
            <Mail className="w-4 h-4 text-secondary" />
          </div>

          {/* Copyright */}
          <p className="text-center text-xs text-text-tertiary pt-2">
            © 2025 SEESAW Studios
          </p>
        </div>
      </div>
    </div>
  );
}
