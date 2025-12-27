import { supabase } from './supabase';

export interface App {
  id: string;
  title: string;
  description: string;
  shortDescription?: string;
  category: string;
  platforms: string[];
  pricing: string;
  developer: string;
  lastUpdated: string;
  websiteUrl: string;
  faviconUrl: string;
  previewImage: string;
  about: string;
  features: string[];
  relatedAppIds: string[];
  createdAt: string;
  href: string;
}

export interface RelatedApp {
  id: string;
  title: string;
  description: string;
  shortDescription?: string;
  previewImage: string;
  faviconUrl: string;
  category: string;
  href: string;
}

export interface AppDetail extends App {
  relatedApps?: RelatedApp[];
}

const mapApp = (row: any): App => ({
  id: row.id,
  title: row.title,
  description: row.description,
  shortDescription: row.short_description,
  category: row.category,
  platforms: row.platforms || [],
  pricing: row.pricing,
  developer: row.developer,
  lastUpdated: row.last_updated,
  websiteUrl: row.website_url,
  faviconUrl: row.favicon_url,
  previewImage: row.preview_image,
  about: row.about,
  features: row.features || [],
  relatedAppIds: row.related_app_ids || [],
  createdAt: row.created_at,
  href: `/apps/${row.id}`
});

export const getApps = async (): Promise<App[]> => {
  console.log('Fetching apps from Supabase...');
  const { data, error } = await supabase
    .from('apps')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching apps:', error);
    return [];
  }
  
  console.log(`Successfully fetched ${data?.length || 0} apps`);
  if (data && data.length > 0) {
    console.log('First app data:', data[0]);
  }
  
  return (data || []).map(mapApp);
};

export const getAppDetail = async (id: string): Promise<AppDetail | null> => {
  console.log(`Fetching app detail for ID: ${id}`);
  const { data: row, error } = await supabase
    .from('apps')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    if (error.code !== 'PGRST116') {
      console.error('Error fetching app detail:', error);
    }
    return null;
  }

  const app = mapApp(row);
  let relatedApps: RelatedApp[] = [];

  if (app.relatedAppIds && app.relatedAppIds.length > 0) {
    const { data: relatedData, error: relatedError } = await supabase
      .from('apps')
      .select('id, title, description, short_description, preview_image, favicon_url, category')
      .in('id', app.relatedAppIds);
    
    if (!relatedError && relatedData) {
      relatedApps = relatedData.map(r => ({
        id: r.id,
        title: r.title,
        description: r.description,
        shortDescription: r.short_description,
        previewImage: r.preview_image,
        faviconUrl: r.favicon_url,
        category: r.category,
        href: `/apps/${r.id}`
      }));
    }
  }

  return { ...app, relatedApps };
};
