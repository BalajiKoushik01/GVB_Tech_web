import type { MetadataRoute } from "next";
import { getMarketArticles } from "./markets/articles";
import { articles } from "./blog/articles";
import { studies } from "./portfolio/studies";
export default function sitemap(): MetadataRoute.Sitemap {
  const base="https://gvbtech.in";
  const pages=["/","/about","/services","/contact","/brochure","/blog","/markets","/portfolio","/careers","/privacy","/terms","/tools/workflow-estimator","/tools/weavecore"];
  const urls=pages.map(path=>({url:base+path,changeFrequency:(path==="/"?"weekly":"monthly") as "weekly"|"monthly",priority:path==="/"?1:.6}));
  return [...urls,...getMarketArticles().map(a=>({url:base+"/markets/"+a.slug,lastModified:new Date(a.publishedAt),changeFrequency:"monthly" as const,priority:.6})),...articles.map(article=>({url:base+"/blog/"+article.slug,changeFrequency:"monthly" as const,priority:.5})),...studies.map(study=>({url:base+"/portfolio/"+study.slug,changeFrequency:"monthly" as const,priority:.5}))];
}
