import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./components/pages/HomePage";
import ProfilePage from "./components/pages/ProfilePage";
import AppDetailPageWrapper from "./components/pages/AppDetailPageWrapper";
import { getApps, App as AppType } from "./lib/apps";
import { MOCK_APPS } from "./lib/mock-data";
import { AuthProvider } from "./hooks/use-auth";

const App = () => {
  const [apps, setApps] = useState<AppType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getApps().then(fetchedApps => {
      if (fetchedApps.length === 0) {
        setApps(MOCK_APPS);
      } else {
        setApps(fetchedApps);
      }
      setLoading(false);
    });
  }, []);

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage apps={apps} loading={loading} />} />
            <Route path="/profile" element={<ProfilePage apps={apps} loading={loading} />} />
            <Route path="/apps/:appId" element={<AppDetailPageWrapper />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;