import { useNavigate, useOutletContext, useSearchParams } from "react-router-dom";
import { Container } from "../ui/container";
import HeroHeader from "../sections/HeroHeader";
import WebsiteGrid from "../sections/WebsiteGrid";
import { App as AppType, getAppDetail, AppDetail } from "../../lib/apps";
import { MOCK_APPS } from "../../lib/mock-data";
import { OutletContextType } from "../../types";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "@/components/ui/drawer";
import DesktopAppDetail from "../app-detail/DesktopAppDetail";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react";

interface HomePageProps {
  apps: AppType[];
  loading: boolean;
}

const HomePage = ({ apps, loading }: HomePageProps) => {
  const navigate = useNavigate();
  const { onLoginClick, onSubscribeClick } = useOutletContext<OutletContextType>();
  const isMobile = useIsMobile();
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const [selectedApp, setSelectedApp] = useState<AppDetail | null>(null);

  // Handle app selection
  const handleAppClick = (appId: string) => {
    if (isMobile) {
      setSelectedAppId(appId);
    } else {
      navigate(`/apps/${appId}`);
    }
  };

  // Fetch app detail when selected (for drawer)
  useEffect(() => {
    if (selectedAppId && isMobile) {
      getAppDetail(selectedAppId).then(app => {
        if (!app) {
          const mockApp = MOCK_APPS.find(a => a.id === selectedAppId);
          setSelectedApp(mockApp ? { ...mockApp, relatedApps: [] } : null);
        } else {
          setSelectedApp(app);
        }
      });
    } else {
      setSelectedApp(null);
    }
  }, [selectedAppId, isMobile]);

  return (
    <main>
      <Container className="py-md md:py-xl">
        <HeroHeader onSubscribeClick={onSubscribeClick} />
        {loading && <div className="text-center">Loading...</div>}
        {apps.length > 0 && (
          <WebsiteGrid items={apps} onItemClick={handleAppClick} onLoginClick={onLoginClick} />
        )}

        <Drawer open={!!selectedAppId && isMobile} onOpenChange={(open) => !open && setSelectedAppId(null)}>
          <DrawerContent className="h-[90vh] bg-page border-t border-border-1">
            <div className="overflow-y-auto h-full rounded-t-[10px]">
              {selectedApp ? (
                <div className="relative">
                  <DrawerClose className="absolute right-4 top-4 z-50 p-2 bg-black/50 rounded-full text-white">
                    <X className="w-4 h-4" />
                  </DrawerClose>
                  <DesktopAppDetail
                    app={selectedApp}
                    onBack={() => setSelectedAppId(null)}
                    onNavigateToApp={handleAppClick}
                    onLoginClick={onLoginClick}
                    isDrawer
                  />
                </div>
              ) : (
                <div className="p-8 text-center">Loading...</div>
              )}
            </div>
          </DrawerContent>
        </Drawer>
      </Container>
    </main>
  );
};

export default HomePage;
