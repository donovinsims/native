"use client";

import React from "react";
import {
  Sparkles,
  Building2,
  BrainCircuit,
  Bitcoin,
  Palette,
  Cuboid,
  Code,
  ShoppingCart,
  Landmark,
  HardDrive,
  Megaphone,
  UserSquare,
  ListChecks,
  Users,
  ArrowUpRight,
} from "lucide-react";

import { Button } from "../ui/button";

interface Category {
  href: string;
  icon: React.ElementType;
  text: string;
}

const categories: Category[] = [
  { href: "/", icon: Sparkles, text: "All" },
  { href: "/category/agency", icon: Building2, text: "Agency" },
  { href: "/category/ai", icon: BrainCircuit, text: "AI" },
  { href: "/category/crypto", icon: Bitcoin, text: "Crypto" },
  { href: "/category/design", icon: Palette, text: "Design" },
  { href: "/category/design-tools", icon: Cuboid, text: "Design Tools" },
  { href: "/category/developer-tools", icon: Code, text: "Developer Tools" },
  { href: "/category/e-commerce", icon: ShoppingCart, text: "E-Commerce" },
  { href: "/category/fintech", icon: Landmark, text: "Fintech" },
  { href: "/category/hardware", icon: HardDrive, text: "Hardware" },
  { href: "/category/marketing", icon: Megaphone, text: "Marketing" },
  { href: "/category/portfolios", icon: UserSquare, text: "Portfolios" },
  { href: "/category/productivity", icon: ListChecks, text: "Productivity" },
  { href: "/category/social", icon: Users, text: "Social" },
];

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg role="img" viewBox="0 0 16.5 16" {...props}>
    <path
      fill="currentColor"
      d="M9.98137 6.13626L15.6599 0H14.2333L9.36611 5.34005L5.4226 0H0.340088L6.28919 9.0694L0.340088 16H1.76674L6.90382 10.3693L11.085 16H16.1675L9.98137 6.13626ZM7.56456 9.49755L6.81551 8.4727L2.24769 1.45543H4.72145L8.20394 6.2234L8.95299 7.24825L13.759 14.6548H11.2852L7.56456 9.49755Z"
    />
  </svg>
);

interface SidebarNavigationProps {
  onSubmitClick?: () => void;
}

export default function SidebarNavigation({ onSubmitClick }: SidebarNavigationProps) {
  return (
    <aside className="w-full border-r border-border flex-col justify-between bg-background p-4 max-w-[250px] h-[calc(100vh-67px)] hidden sm:flex fixed top-[67px]">
      <div className="overflow-y-auto">
        {categories.map((category, index) => (
          <a href={category.href} key={category.text}>
            <div className="w-full flex gap-3 items-center px-3 py-2 rounded-lg cursor-pointer text-primary group transition-colors relative z-0 hover:bg-surface">
              <div
                className={`flex items-center justify-center w-[14px] h-[14px] group-hover:text-primary transition z-10 ${
                  index === 0 ? "text-primary" : "text-secondary"
                }`}
              >
                <category.icon className="w-full h-full" />
              </div>
              <span className="text-primary text-sm select-none z-10">
                {category.text}
              </span>
              {index === 0 && (
                <div className="bg-surface-raised rounded-lg w-full h-full absolute top-0 left-0 z-0"></div>
              )}
            </div>
          </a>
        ))}
      </div>
      <div className="w-full pt-2 flex items-center flex-col gap-3 bg-background">
        <div className="w-full flex items-center gap-2">
          <a
            href="https://tally.so/r/wLP5VG"
            target="_blank"
            rel="noopener noreferrer"
            className="h-[40px] w-full py-[10px] px-[18px] bg-surface-raised rounded-lg hover:bg-surface cursor-pointer flex items-center justify-between transition-colors text-secondary hover:text-primary"
          >
            <span className="text-sm">Sponsor us</span>
            <ArrowUpRight className="w-[14px] h-[14px] text-secondary" />
          </a>
          <a
            href="https://x.com/seesawsite"
            target="_blank"
            rel="noopener noreferrer"
            className="h-[40px] py-[10px] px-[18px] bg-surface-raised rounded-lg hover:bg-surface cursor-pointer flex items-center justify-between transition-colors text-secondary hover:text-primary"
          >
            <XIcon className="w-[14px] h-[14px]" />
          </a>
        </div>
        <Button
          onClick={onSubmitClick}
          variant="secondary"
          className="w-full rounded-pill"
        >
          Submit
        </Button>
        <span className="text-caption text-secondary leading-5">
          © 2025 SEESAW Studios
        </span>
      </div>
    </aside>
  );
}
