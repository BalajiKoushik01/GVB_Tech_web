import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import { z } from "zod";
const schema=z.object({name:z.string().trim().min(2).max(120),email:z.email().max(254),service:z.string().trim().min(1).max(120),message:z.string().trim().min(10).max(5000),phone:z.string().trim().max(30).optional(),website:z.string().max(0).optional()}).strict();
let cached:MongoClient|null=null;
async function dbClient(){if(cached)return cached;const uri=process.env.MONGODB_URI;if(!uri)throw new Error("Contact service is not configured");const client=new MongoClient(uri,{serverSelectionTimeoutMS:6000,maxPoolSize:5});await client.connect();cached=client;return client;}
export async function POST(req:Request){
 try{
 const origin=req.headers.get("origin");
 if(origin && new URL(origin).host!==new URL(req.url).host)return NextResponse.json({error:"Cross-origin request denied"},{status:403});
 const length=Number(req.headers.get("content-length")||"0");if(length>12000)return NextResponse.json({error:"Request too large"},{status:413});
 const raw=await req.text();if(raw.length>12000)return NextResponse.json({error:"Request too large"},{status:413});
 let parsed:unknown;try{parsed=JSON.parse(raw)}catch{return NextResponse.json({error:"Invalid JSON"},{status:400})}
 const result=schema.safeParse(parsed);if(!result.success)return NextResponse.json({error:"Invalid form fields"},{status:400});
 const {website,...enquiry}=result.data;
 if(website)return NextResponse.json({success:true},{headers:{"Cache-Control":"no-store"}});
 const client=await dbClient();await client.db("gvb-tech").collection("enquiries").insertOne({...enquiry,createdAt:new Date()});
 return NextResponse.json({success:true,message:"Thank you. Your message has been received."},{status:200,headers:{"Cache-Control":"no-store"}});
 }catch(e){console.error("Contact submission failed",e instanceof Error?e.name:"unknown");return NextResponse.json({error:"Unable to process your request"},{status:500});}
}