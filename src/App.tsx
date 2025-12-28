import { useState, useEffect } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useModal } from "./hooks/useModal.tsx";
import HeaderNavigation from "./components/sections/HeaderNavigation";
import HeroHeader from "./components/sections/HeroHeader";
import WebsiteGrid from "./components/sections/WebsiteGrid";
import AppDetailPage from "./components/app-detail/AppDetailPage";
import DesktopAppDetail from "./components/app-detail/DesktopAppDetail";
import Footer from "./components/sections/Footer";
import { SubscribeModal } from "./components/modals/SubscribeModal";
import { SubmitAppModal } from "./components/modals/SubmitAppModal";
import { AuthModal } from "./components/modals/AuthModal";
import { Toaster } from "./components/ui/sonner";
import { Container } from "./components/ui/container";
import { getApps, getAppDetail, App as AppType, AppDetail } from "./lib/apps";
import { AuthProvider } from "./hooks/use-auth";
import { AnimatePresence } from "motion/react";
import { useIsMobile } from "./hooks/use-mobile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Sonner } from "@/components/ui/sonner";
import { HoverReceiver } from "@/visual-edits/VisualEditsMessenger";
import { BrowserRouter } from "react-router-dom";

import ProfileView from "./components/sections/ProfileView";

const MOCK_APPS: AppType[] = [
  {
    id: "1",
    title: "Linear",
    description: "The best tool for software development. Build better products.",
    shortDescription: "The best tool for software development.",
    category: "Productivity",
    platforms: ["macOS", "Web", "iOS"],
    pricing: "Free",
    developer: "Linear Orbit, Inc.",
    lastUpdated: "2024-03-20",
    websiteUrl: "https://linear.app",
    faviconUrl: "https://linear.app/favicon.ico",
    previewImage: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=800&auto=format&fit=crop&q=60",
    about: "Linear is a better way to build products.",
    features: ["Issue tracking", "Cycles", "Roadmaps"],
    relatedAppIds: [],
    createdAt: new Date().toISOString(),
    href: "/apps/1"
  },
  {
    id: "2",
    title: "Figma",
    description: "The collaborative interface design tool.",
    shortDescription: "The collaborative interface design tool.",
    category: "Design",
    platforms: ["macOS", "Windows", "Web"],
    pricing: "Free",
    developer: "Figma, Inc.",
    lastUpdated: "2024-03-15",
    websiteUrl: "https://figma.com",
    faviconUrl: "https://figma.com/favicon.ico",
    previewImage: "https://images.unsplash.com/photo-1541462608141-ad4371eecc47?w=800&auto=format&fit=crop&q=60",
    about: "Figma helps teams create, test, and ship better designs from start to finish.",
    features: ["Collaboration", "Prototyping", "Design Systems"],
    relatedAppIds: [],
    createdAt: new Date().toISOString(),
    href: "/apps/2"
  },
  {
    id: "3",
    title: "Raycast",
    description: "A supercharged tool to replace your Spotlight.",
    shortDescription: "A supercharged tool to replace your Spotlight.",
    category: "Utilities",
    platforms: ["macOS"],
    pricing: "Free",
    developer: "Raycast Technologies",
    lastUpdated: "2024-03-10",
    websiteUrl: "https://raycast.com",
    faviconUrl: "https://raycast.com/favicon.ico",
    previewImage: "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?w=800&auto=format&fit=crop&q=60",
    about: "Raycast is a blazingly fast, totally extendable launcher.",
    features: ["Extensions", "Snippets", "Calculator"],
    relatedAppIds: [],
    createdAt: new Date().toISOString(),
    href: "/apps/3"
  }
];

const App = () => {
  const subscribeModal = useModal();
  const submitModal = useModal();
  const authModal = useModal();
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const [selectedApp, setSelectedApp] = useState<AppDetail | null>(null);
  const [apps, setApps] = useState<AppType[]>([]);
  const [currentView, setCurrentView] = useState<'home' | 'profile' | 'app-detail'>('home');
  const isMobile = useIsMobile();

  useEffect(() => {
    getApps().then(fetchedApps => {
      console.log('Fetched apps count:', fetchedApps.length);
      if (fetchedApps.length === 0) {
        console.log('No apps found in database, using mock data.');
        setApps(MOCK_APPS);
      } else {
        setApps(fetchedApps);
      }
    });
  }, []);

  useEffect(() => {
    if (selectedAppId) {
      getAppDetail(selectedAppId).then(app => {
        if (!app) {
          // If not found in DB, check mock data
          const mockApp = MOCK_APPS.find(a => a.id === selectedAppId);
          if (mockApp) {
            setSelectedApp({ ...mockApp, relatedApps: [] });
          } else {
            setSelectedApp(null);
          }
        } else {
          setSelectedApp(app);
        }
      });
    } else {
      setSelectedApp(null);
    }
  }, [selectedAppId]);

  const handleAppClick = (appId: string) => {
    setSelectedAppId(appId);
    if (!isMobile) {
      setCurrentView('app-detail');
    }
  };

  const handleBackToList = () => {
    setSelectedAppId(null);
    if (currentView === 'app-detail') {
      setCurrentView('home');
    }
  };

  const handleLoginClick = () => {
    setAuthMode("signin");
    authModal.open();
  };

  return (
    <AuthProvider>
      <div className="relative min-h-screen bg-page text-text transition-colors duration-200 flex flex-col">
        <HeaderNavigation 
          onSubscribeClick={subscribeModal.open}
          onSubmitClick={submitModal.open}
          onLoginClick={handleLoginClick}
          onProfileClick={() => setCurrentView('profile')}
          onHomeClick={() => {
            setCurrentView('home');
            setSelectedAppId(null);
          }}
        />

        <div className="flex-grow">
          {currentView === 'profile' ? (
              <div className="pt-[72px]">
                <Container className="py-md md:py-xl">
                  <ProfileView apps={apps} onAppClick={handleAppClick} />
                </Container>
              </div>
          ) : currentView === 'app-detail' && selectedApp ? (
              <div className="pt-[72px]">
                 <DesktopAppDetail 
                   key={selectedApp.id}
                   app={selectedApp} 
                   onBack={handleBackToList}
                   onNavigateToApp={handleAppClick}
                   onLoginClick={authModal.open}
                 />
              </div>
          ) : (
              <div className="pt-[72px]">
                <main>
                  <Container className="py-md md:py-xl">
                    <HeroHeader onSubscribeClick={subscribeModal.open} />
                    <WebsiteGrid items={apps} onItemClick={handleAppClick} onLoginClick={handleLoginClick} />
                  </Container>
                </main>
              </div>
          )}
        </div>

        <Footer 
          onSubscribeClick={subscribeModal.open}
          onSubmitClick={submitModal.open}
        />

        {/* App Detail Overlay (Mobile Only) */}
        <AnimatePresence>
          {isMobile && selectedApp && currentView === 'home' && (
            <AppDetailPage 
              key={selectedApp.id}
              app={selectedApp} 
              onBack={handleBackToList}
              onNavigateToApp={handleAppClick}
              onSubscribeClick={subscribeModal.open}
              onSubmitClick={submitModal.open}
              onLoginClick={handleLoginClick}
              onProfileClick={() => setCurrentView('profile')}
              onHomeClick={handleBackToList}
              isInline={false}
            />
          )}
        </AnimatePresence>

        {/* Modals */}
        <SubscribeModal isOpen={subscribeModal.isOpen} onClose={subscribeModal.close} />
        <SubmitAppModal isOpen={submitModal.isOpen} onClose={submitModal.close} />
        <AuthModal 
          isOpen={authModal.isOpen} 
          onClose={authModal.close} 
          initialMode={authMode}
        />
        
        <Toaster position="bottom-center" />
      </div>
    </AuthProvider>
  );
};

export default App;