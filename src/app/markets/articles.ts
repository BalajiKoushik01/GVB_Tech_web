import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { z } from "zod";

const schema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  publishedAt: z.iso.datetime({offset:true}),
  category: z.enum(["Market pulse","Closing bell","Corporate news","Sector radar","Economy","Weekly review"]),
  title: z.string().min(1).max(180),
  summary: z.string().min(1).max(500),
  sections: z.array(z.object({heading:z.string().min(1).max(120),body:z.string().min(1).max(1500)})).min(1).max(10),
  sources:z.array(z.object({name:z.string().min(1),url:z.url().refine(url=>new URL(url).protocol==="https:")})).min(1).max(15)
});
export type MarketArticle = z.infer<typeof schema>;
export function getMarketArticles(): MarketArticle[] {
  const directory = join(process.cwd(),"src/app/markets/content");
  return readdirSync(directory).filter(file=>file.endsWith(".json")).map(file=>{
    const article=schema.parse(JSON.parse(readFileSync(join(directory,file),"utf8")));
    if(file!==article.slug+".json") throw new Error("Market article filename must match slug");
    return article;
  }).sort((a,b)=>Date.parse(b.publishedAt)-Date.parse(a.publishedAt)||b.date.localeCompare(a.date)||b.slug.localeCompare(a.slug));
}
export function formatMarketDate(date:string) {
  return new Intl.DateTimeFormat("en-IN",{day:"numeric",month:"long",year:"numeric",timeZone:"Asia/Kolkata"}).format(new Date(date.length===10?date+"T12:00:00+05:30":date));
}
