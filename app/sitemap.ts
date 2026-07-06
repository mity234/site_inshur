import type { MetadataRoute } from "next";
import { articles } from "@/lib/articles";

const siteUrl = "https://topinshur.ru";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...articles.map((article) => ({
      url: `${siteUrl}/articles/${article.slug}`,
      lastModified: new Date(article.publishedDate),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
