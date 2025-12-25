import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://yoload.asia";
  const now = new Date();
  const routes = ["/", "/privacy", "/terms"];
  return routes.map((path) => ({
    url: `${baseUrl}${path === "/" ? "/" : path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "monthly" : "yearly",
    priority: path === "/" ? 1 : 0.3,
  }));
}
