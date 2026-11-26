import {test} from "node:test";
import assert from "node:assert/strict";
import {getMarketArticles,formatMarketDate} from "../src/app/markets/articles.ts";
test("market archive retains unique, source-linked editions in publication order",()=>{
 const articles=getMarketArticles();
 assert.ok(articles.length>=2);
 assert.equal(new Set(articles.map(a=>a.slug)).size,articles.length);
 for(const article of articles){
  assert.ok(article.sources.length);
  assert.ok(article.sources.every(s=>s.url.startsWith("https://")));
 }
 for(let i=1;i<articles.length;i++) assert.ok(Date.parse(articles[i-1].publishedAt)>=Date.parse(articles[i].publishedAt));
});
test("session dates are formatted in India time",()=>assert.equal(formatMarketDate("2026-11-26"),"26 November 2026"));
