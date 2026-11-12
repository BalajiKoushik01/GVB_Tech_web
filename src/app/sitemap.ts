import type { MetadataRoute } from "next";
import { articles } from "./blog/articles";
export default function sitemap(): MetadataRoute.Sitemap {
  const base="https://gvbtech.in";
  const pages=["/","/about","/services","/contact","/brochure","/blog","/portfolio","/careers","/privacy","/terms"];
  const urls=pages.map(path=>({url:base+path,changeFrequency:(path==="/"?"weekly":"monthly") as "weekly"|"monthly",priority:path==="/"?1:.6}));
  return [...urls,...articles.map(article=>({url:base+"/blog/"+article.slug,changeFrequency:"monthly" as const,priority:.5}))];
}
