import { useNavigate } from "react-router-dom";
import { Container } from "../ui/container";
import ProfileView from "../sections/ProfileView";
import { App as AppType } from "../../lib/apps";

interface ProfilePageProps {
  apps: AppType[];
  loading: boolean;
}

const ProfilePage = ({ apps, loading }: ProfilePageProps) => {
  const navigate = useNavigate();
  return (
    <Container className="py-md md:py-xl">
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <ProfileView apps={apps} onItemClick={(appId) => navigate(`/apps/${appId}`)} />
      )}
    </Container>
  );
};

export default ProfilePage;
