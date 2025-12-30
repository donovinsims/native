import { App } from "./apps";

export const MOCK_APPS: App[] = [
  {
    id: "mock-1",
    title: "Mock Application",
    description: "This is a placeholder app used for development and testing.",
    shortDescription: "A mock app for testing.",
    category: "Development",
    platforms: ["Web", "Mac"],
    pricing: "Free",
    developer: "Mock Developer",
    lastUpdated: new Date().toISOString(),
    websiteUrl: "https://example.com",
    faviconUrl: "https://placehold.co/32",
    previewImage: "https://placehold.co/600x400",
    about: "This app serves as a placeholder when the backend is unreachable or for testing purposes.",
    features: ["Mock Feature 1", "Mock Feature 2", "Mock Feature 3"],
    relatedAppIds: [],
    createdAt: new Date().toISOString(),
    href: "/apps/mock-1"
  }
];
