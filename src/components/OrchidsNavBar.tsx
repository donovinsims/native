import React, { useEffect, useState } from 'react';

// ============================================================================
// INLINE STYLES & DESIGN TOKENS
// ============================================================================
const ORCHIDS_STYLES = `
  .orchids-nav-container {
    /* Reset any inherited styles */
    all: initial;
    display: block;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  .orchids-nav-container * {
    box-sizing: border-box;
  }

  /* Light Theme Variables */
  .orchids-nav-container[data-orchids-theme="light"] {
    --on-bg: #FFFFFF;
    --on-surface: #FCFCFC;
    --on-surface-raised: #F7F7F7;
    --on-border: #E8E8E8;
    --on-text-primary: #000000;
    --on-text-secondary: #757575;
  }

  /* Dark Theme Variables */
  .orchids-nav-container[data-orchids-theme="dark"] {
    --on-bg: #141414;
    --on-surface: #1c1c1c;
    --on-surface-raised: #242424;
    --on-border: #212121;
    --on-text-primary: #FFFFFF;
    --on-text-secondary: #919191;
  }

  /* Navigation Styles */
  .orchids-nav {
    width: 100%;
    position: sticky;
    top: 0;
    z-index: 9999;
    background-color: var(--on-bg);
    border-bottom: 1px solid var(--on-border);
    transition: background-color 0.3s ease, border-color 0.3s ease;
  }

  .orchids-nav-inner {
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 20px;
    height: 72px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }

  .orchids-nav-left {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .orchids-nav-logo {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--on-text-primary);
    text-decoration: none;
    transition: opacity 0.2s;
  }

  .orchids-nav-logo:hover {
    opacity: 0.8;
  }

  .orchids-nav-links {
    display: none;
    align-items: center;
    gap: 4px;
  }

  @media (min-width: 768px) {
    .orchids-nav-links {
      display: flex;
    }
  }

  .orchids-nav-item {
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    font-size: 14.1px;
    line-height: 19px;
    letter-spacing: -0.282px;
    border-radius: 2px;
    padding: 0 11px;
    height: 36px;
    transition: all 0.2s;
    border: 1px solid transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    text-decoration: none;
    white-space: nowrap;
  }

  .orchids-nav-item-active {
    background-color: var(--on-surface-raised);
    color: var(--on-text-primary);
    border-color: var(--on-border);
  }

  .orchids-nav-item-inactive {
    background-color: transparent;
    color: var(--on-text-secondary);
  }

  .orchids-nav-item-inactive:hover {
    color: var(--on-text-primary);
  }

  .orchids-nav-right {
    display: flex;
    align-items: center;
    gap: 11px;
  }

  .orchids-search-container {
    display: none;
    align-items: center;
    width: 144px;
    height: 40px;
    background-color: var(--on-surface-raised);
    border-radius: 2px;
    padding: 0 16px;
    border: 1px solid transparent;
    transition: all 0.2s;
  }

  .orchids-search-container:hover {
    border-color: var(--on-border);
  }

  @media (min-width: 640px) {
    .orchids-search-container {
      display: flex;
    }
  }

  .orchids-search-input {
    width: 100%;
    background: transparent;
    border: none;
    outline: none;
    font-size: 15px;
    color: var(--on-text-primary);
    font-family: 'Inter', sans-serif;
    font-weight: 400;
  }

  .orchids-search-input::placeholder {
    color: var(--on-text-secondary);
  }

  .orchids-search-icon {
    width: 20px;
    height: 20px;
    color: var(--on-text-secondary);
    flex-shrink: 0;
    margin-left: 4px;
  }

  .orchids-divider {
    display: none;
    height: 20px;
    width: 1px;
    background-color: var(--on-border);
    margin: 0 7px;
  }

  @media (min-width: 640px) {
    .orchids-divider {
      display: block;
    }
  }

  .orchids-theme-toggle {
    width: 36px;
    height: 36px;
    border-radius: 2px;
    border: 1px solid var(--on-border);
    background: transparent;
    color: var(--on-text-secondary);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    cursor: pointer;
    padding: 0;
  }

  .orchids-theme-toggle:hover {
    background-color: var(--on-surface-raised);
    color: var(--on-text-primary);
  }

  .orchids-theme-toggle:active {
    transform: scale(0.95);
  }

  .orchids-btn {
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 13px;
    line-height: 16px;
    padding: 0 16px;
    border-radius: 2px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    cursor: pointer;
    text-decoration: none;
    white-space: nowrap;
  }

  .orchids-btn-secondary {
    border: 1px solid var(--on-border);
    background: transparent;
    color: var(--on-text-primary);
  }

  .orchids-btn-secondary:hover {
    background-color: var(--on-surface-raised);
  }

  .orchids-btn-primary {
    background-color: var(--on-text-primary);
    color: var(--on-bg);
    border: none;
  }

  .orchids-btn-primary:hover {
    opacity: 0.9;
  }
`;

// ============================================================================
// ICONS
// ============================================================================
const SunIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2m-8.93-9.07 1.41 1.41m12.73 0 1.41 1.41M2 12h2m16 0h2m-16.07 4.93-1.41 1.41m14.14 0-1.41 1.41" />
  </svg>
);

const MoonIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);

const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 256 256"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M232.49,215.51,185,168a92.12,92.12,0,1,0-17,17l47.53,47.54a12,12,0,0,0,17-17ZM44,112a68,68,0,1,1,68,68A68.07,68.07,0,0,1,44,112Z" />
  </svg>
);

// ============================================================================
// TYPES
// ============================================================================
type Theme = 'light' | 'dark';

interface NavItem {
  label: string;
  href: string;
}

interface OrchidsNavBarProps {
  logoComponent?: React.ReactNode;
  navItems?: NavItem[];
  defaultActiveItem?: string;
  onThemeChange?: (theme: Theme) => void;
  onNavItemClick?: (label: string) => void;
  onSignInClick?: () => void;
  onCreateAccountClick?: () => void;
  onLogoClick?: () => void;
  searchPlaceholder?: string;
  signInHref?: string;
  createAccountHref?: string;
  className?: string;
  storageKey?: string;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export const OrchidsNavBar: React.FC<OrchidsNavBarProps> = ({
  logoComponent,
  navItems = [
    { label: 'Software', href: '#software' },
    { label: 'Guides', href: '#guides' },
    { label: 'Catalog', href: '#catalog' },
    { label: 'Learn', href: '#learn' },
    { label: 'Creators', href: '#creators' },
  ],
  defaultActiveItem = 'Guides',
  onThemeChange,
  onNavItemClick,
  onSignInClick,
  onCreateAccountClick,
  onLogoClick,
  searchPlaceholder = 'Search',
  signInHref = '#signin',
  createAccountHref = '#create-account',
  className = '',
  storageKey = 'orchids:theme',
}) => {
  // Theme management
  const getInitialTheme = (): Theme => {
    if (typeof window === 'undefined') return 'light';

    const stored = localStorage.getItem(storageKey) as Theme | null;
    if (stored === 'light' || stored === 'dark') return stored;

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [activeTab, setActiveTab] = useState<string>(defaultActiveItem);
  const [mounted, setMounted] = useState(false);

  // Inject styles once
  useEffect(() => {
    if (typeof document !== 'undefined' && !document.getElementById('orchids-nav-styles')) {
      const styleEl = document.createElement('style');
      styleEl.id = 'orchids-nav-styles';
      styleEl.textContent = ORCHIDS_STYLES;
      document.head.appendChild(styleEl);
    }
    setMounted(true);
  }, []);

  // Persist theme
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(storageKey, theme);
      onThemeChange?.(theme);
    }
  }, [theme, mounted, storageKey, onThemeChange]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleNavClick = (label: string, e: React.MouseEvent) => {
    e.preventDefault();
    setActiveTab(label);
    onNavItemClick?.(label);
  };

  if (!mounted) {
    return <div className={className} style={{ height: '72px' }} />;
  }

  return (
    <div className={`orchids-nav-container ${className}`} data-orchids-theme={theme}>
      <nav className="orchids-nav">
        <div className="orchids-nav-inner">

          {/* Left Section */}
          <div className="orchids-nav-left">
            {/* Logo */}
            <a href="#" className="orchids-nav-logo" aria-label="Home" onClick={(e) => { e.preventDefault(); onLogoClick?.(); }}>
              {logoComponent || <div style={{ width: '48px', height: '24px', background: 'transparent' }} />}
            </a>

            {/* Navigation Links */}
            <div className="orchids-nav-links">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(item.label, e)}
                  className={`orchids-nav-item ${
                    activeTab === item.label ? 'orchids-nav-item-active' : 'orchids-nav-item-inactive'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right Section */}
          <div className="orchids-nav-right">

            {/* Search Bar */}
            <div className="orchids-search-container">
              <input
                type="text"
                placeholder={searchPlaceholder}
                aria-label="Search"
                className="orchids-search-input"
              />
              <SearchIcon className="orchids-search-icon" />
            </div>

            {/* Divider */}
            <div className="orchids-divider" />

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="orchids-theme-toggle"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>

            {/* Sign In Button */}
            <a href={signInHref} className="orchids-btn orchids-btn-secondary" onClick={(e) => { e.preventDefault(); onSignInClick?.(); }}>
              Sign in
            </a>

            {/* Create Account Button */}
            <a href={createAccountHref} className="orchids-btn orchids-btn-primary" onClick={(e) => { e.preventDefault(); onCreateAccountClick?.(); }}>
              Create Account
            </a>
          </div>

        </div>
      </nav>
    </div>
  );
};

export default OrchidsNavBar;