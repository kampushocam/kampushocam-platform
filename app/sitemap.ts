import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://koc.kampushocam.com/kampus-koc",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}