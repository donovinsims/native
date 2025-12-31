import { Outlet, useNavigate } from "react-router-dom";
import { OrchidsNavBar } from "./sections/OrchidsNavBar";
import Footer from "./sections/Footer";
import { OutletContextType } from "../types";
import { SubscribeModal } from "./modals/SubscribeModal";
import { SubmitAppModal } from "./modals/SubmitAppModal";
import { AuthModal } from "./modals/AuthModal";
import { useModal } from "../hooks/useModal";
import { useState } from "react";
import { Toaster } from "./ui/sonner";

import { useTheme } from "next-themes";

const Layout = () => {
  const { setTheme } = useTheme();
  const subscribeModal = useModal();
  const submitModal = useModal();
  const authModal = useModal();
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const navigate = useNavigate();

  const handleLoginClick = () => {
    setAuthMode("signin");
    authModal.open();
  };

  const handleSignUpClick = () => {
    setAuthMode("signup");
    authModal.open();
  };

  return (
    <div className="relative min-h-screen bg-background text-primary transition-colors duration-200 flex flex-col">
      <OrchidsNavBar
        navItems={[{ label: 'Home', href: '/' }, { label: 'Profile', href: '/profile' }]}
        onSignInClick={handleLoginClick}
        onCreateAccountClick={handleSignUpClick}
        onThemeChange={(theme) => setTheme(theme)}
      />
      <div className="flex-grow pt-[72px]">
        <Outlet context={{ onLoginClick: handleLoginClick, onSubscribeClick: subscribeModal.open, onSubmitClick: submitModal.open }} />
      </div>
      <Footer
        onSubscribeClick={subscribeModal.open}
        onSubmitClick={submitModal.open}
      />
      <SubscribeModal isOpen={subscribeModal.isOpen} onClose={subscribeModal.close} />
      <SubmitAppModal isOpen={submitModal.isOpen} onClose={submitModal.close} />
      <AuthModal
        isOpen={authModal.isOpen}
        onClose={authModal.close}
        initialMode={authMode}
      />
      <Toaster position="bottom-center" />
    </div>
  );
};

export default Layout;
