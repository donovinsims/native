import { useNavigate, useOutletContext } from "react-router-dom";
import { Container } from "../ui/container";
import HeroHeader from "../sections/HeroHeader";
import WebsiteGrid from "../sections/WebsiteGrid";
import { App as AppType } from "../../lib/apps";
import { OutletContextType } from "../../types";

interface HomePageProps {
  apps: AppType[];
  loading: boolean;
}

const HomePage = ({ apps, loading }: HomePageProps) => {
  const navigate = useNavigate();
  const { onLoginClick, onSubscribeClick } = useOutletContext<OutletContextType>();
  return (
    <main>
      <Container className="py-md md:py-xl">
        <HeroHeader onSubscribeClick={onSubscribeClick} />
        {loading && <div className="text-center">Loading...</div>}
        {apps.length > 0 && (
          <WebsiteGrid items={apps} onItemClick={(appId) => navigate(`/apps/${appId}`)} onLoginClick={onLoginClick} />
        )}
      </Container>
    </main>
  );
};

export default HomePage;
