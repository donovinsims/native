import React, { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useBookmarks } from "@/hooks/use-bookmarks";
import { App } from "@/lib/apps";
import WebsiteGrid from "./WebsiteGrid";
import { Container } from "../ui/container";
import { User, Mail, Loader2, Bookmark } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";

interface ProfileViewProps {
  onAppClick: (appId: string) => void;
  apps: App[];
}

export default function ProfileView({ onAppClick, apps }: ProfileViewProps) {
  const { user, profile, updateProfile } = useAuth();
  const { bookmarks, loading: bookmarksLoading } = useBookmarks();
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(profile?.full_name || "");
  const [isUpdating, setIsUpdating] = useState(false);

  const bookmarkedApps = apps.filter((app) => bookmarks.includes(app.id));

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    const { error } = await updateProfile({ full_name: fullName });
    setIsUpdating(false);
    if (error) {
      toast.error("Failed to update profile");
    } else {
      toast.success("Profile updated");
      setIsEditing(false);
    }
  };

  if (!user) {
    return (
      <Container className="py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Please sign in to view your profile</h2>
      </Container>
    );
  }

  return (
    <div className="space-y-12">
      {/* Profile Header */}
      <section className="bg-ui-1 border border-border-1 rounded-2xl p-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full bg-ui-2 flex items-center justify-center overflow-hidden border border-border-1">
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt={profile.full_name || ""} className="w-full h-full object-cover" />
              ) : (
                <User className="w-12 h-12 text-grey" />
              )}
            </div>
          </div>

          <div className="flex-1 space-y-4 w-full">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-text tracking-tight">Profile Settings</h1>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-body font-medium text-grey hover:text-text transition-colors"
                >
                  Edit Profile
                </button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-md">
                <div className="space-y-2">
                  <label className="text-caption font-medium text-grey uppercase tracking-wider">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-ui-3 border border-border-1 focus:border-text outline-none transition-colors"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    type="submit"
                    disabled={isUpdating}
                    className="rounded-xl"
                  >
                    {isUpdating && <Loader2 className="w-4 h-4 animate-spin" />}
                    Save Changes
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      setIsEditing(false);
                      setFullName(profile?.full_name || "");
                    }}
                    className="rounded-xl"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-3 text-grey">
                  <User className="w-5 h-5" />
                  <div>
                    <p className="text-caption font-medium uppercase tracking-wider text-grey">Full Name</p>
                    <p className="text-text font-medium">{profile?.full_name || "Not set"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-grey">
                  <Mail className="w-5 h-5" />
                  <div>
                    <p className="text-caption font-medium uppercase tracking-wider text-grey">Email Address</p>
                    <p className="text-text font-medium">{user.email}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Bookmarks Section */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <Bookmark className="w-6 h-6 text-[#ff4500] fill-[#ff4500]" />
          <h2 className="text-2xl font-bold text-text">Your Bookmarks</h2>
          <span className="px-2 py-0.5 rounded-full bg-ui-2 text-grey text-caption font-medium">
            {bookmarks.length}
          </span>
        </div>

        {bookmarksLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-grey" />
          </div>
        ) : bookmarkedApps.length > 0 ? (
          <WebsiteGrid items={bookmarkedApps} onItemClick={onAppClick} onLoginClick={() => {}} />
        ) : (
          <div className="text-center py-20 border border-dashed border-border-1 rounded-2xl bg-ui-1">
            <Bookmark className="w-12 h-12 text-grey mx-auto mb-4" />
            <p className="text-grey text-body font-medium">You haven't bookmarked any apps yet.</p>
            <p className="text-caption text-grey">Explore the directory and save your favorites here.</p>
          </div>
        )}
      </section>
    </div>
  );
}
