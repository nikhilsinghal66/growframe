import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://growframe.co/",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    { url: "https://growframe.co/services", lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: "https://growframe.co/portfolio", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://growframe.co/process", lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://growframe.co/contact", lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  ];
}