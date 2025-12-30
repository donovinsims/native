import { useState, useEffect } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import DesktopAppDetail from "../app-detail/DesktopAppDetail";
import { getAppDetail, AppDetail } from "../../lib/apps";
import { MOCK_APPS } from "../../lib/mock-data";
import { OutletContextType } from "../../types";

const AppDetailPageWrapper = () => {
  const { appId } = useParams();
  const navigate = useNavigate();
  const { onLoginClick } = useOutletContext<OutletContextType>();
  const [selectedApp, setSelectedApp] = useState<AppDetail | null>(null);

  useEffect(() => {
    if (appId) {
      getAppDetail(appId).then(app => {
        if (!app) {
          const mockApp = MOCK_APPS.find(a => a.id === appId);
          setSelectedApp(mockApp ? { ...mockApp, relatedApps: [] } : undefined);
        } else {
          setSelectedApp(app);
        }
      });
    }
  }, [appId]);

  if (selectedApp === null) {
    return <div>Loading...</div>;
  }

  if (selectedApp === undefined) {
    return <div>App not found</div>;
  }

  return (
    <DesktopAppDetail
      key={selectedApp.id}
      app={selectedApp}
      onBack={() => navigate(-1)}
      onNavigateToApp={(id) => navigate(`/apps/${id}`)}
      onLoginClick={onLoginClick}
    />
  );
};

export default AppDetailPageWrapper;
