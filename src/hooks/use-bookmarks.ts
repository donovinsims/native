import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from './use-auth';

export const useBookmarks = () => {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookmarks = useCallback(async () => {
    if (!user) {
      setBookmarks([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('bookmarks')
        .select('app_id')
        .eq('user_id', user.id);

      if (error) throw error;
      setBookmarks(data.map((b: { app_id: string }) => b.app_id));
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchBookmarks();

    // Subscribe to changes
    if (user) {
      const channel = supabase
        .channel('bookmarks-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'bookmarks',
            filter: `user_id=eq.${user.id}`,
          },
          () => {
            fetchBookmarks();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user, fetchBookmarks]);

  const toggleBookmark = async (appId: string) => {
    if (!user) return { error: 'Please sign in to bookmark' };

    const isBookmarkedNow = bookmarks.includes(appId);

    try {
      if (isBookmarkedNow) {
        const { error } = await supabase
          .from('bookmarks')
          .delete()
          .eq('user_id', user.id)
          .eq('app_id', appId);
        if (error) throw error;
        setBookmarks(prev => prev.filter(id => id !== appId));
      } else {
        const { error } = await supabase
          .from('bookmarks')
          .insert([{ user_id: user.id, app_id: appId }]);
        if (error) throw error;
        setBookmarks(prev => [...prev, appId]);
      }
      return { error: null };
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      return { error };
    }
  };

  const isBookmarked = (appId: string) => bookmarks.includes(appId);

  return { bookmarks, loading, toggleBookmark, isBookmarked, refreshBookmarks: fetchBookmarks };
};
