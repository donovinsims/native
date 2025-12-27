import React from "react";

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

interface HeaderNavigationProps {
  onHomeClick?: () => void;
}

const HeaderNavigation = ({ onHomeClick }: HeaderNavigationProps) => {
  return (
    <nav className="fixed top-0 z-20 h-[72px] w-full bg-background border-b border-border transition-colors">
      <div className="mx-auto max-w-[1440px] h-full flex items-center px-4 md:px-6">
        {/* Logo */}
        <button
          className="flex w-max cursor-pointer items-center gap-[6px] rounded-pill border border-border bg-background px-md py-sm text-h1 leading-none transition-all duration-200 ease-in-out hover:-rotate-3 hover:border hover:bg-surface"
          onClick={onHomeClick}
        >
          <span>see</span>
          <MagicIcon className="w-[10.67px]" />
          <span>saw</span>
        </button>
      </div>
    </nav>
  );
};

export default HeaderNavigation;
