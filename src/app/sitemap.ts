import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://www.dovesphere.com/", lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: "https://www.dovesphere.com/about", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://www.dovesphere.com/services", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://www.dovesphere.com/training", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://www.dovesphere.com/contact", lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];
}
