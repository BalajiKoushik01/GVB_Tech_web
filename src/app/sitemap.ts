import type {MetadataRoute} from "next";
export default function sitemap():MetadataRoute.Sitemap{
 const origin="https://gvbtech.in";
 return ["/","/about","/services","/contact","/brochure","/privacy"].map(path=>({url:origin+path,changeFrequency:path==="/"?"weekly":"monthly",priority:path==="/"?1:.6}));
}