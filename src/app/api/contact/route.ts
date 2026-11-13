import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import { z } from "zod";
import { readJsonRequest } from "@/lib/request-json";

export const dynamic = "force-dynamic";

const enquirySchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.email().max(254),
  service: z.string().trim().min(1).max(120),
  message: z.string().trim().min(10).max(5000),
  phone: z.string().trim().max(30).optional(),
  // A populated hidden field indicates a likely bot. Accept it here so it can
  // be dropped silently without storing data or disclosing the spam trap.
  website: z.string().max(200).optional(),
}).strict();

let clientPromise: Promise<MongoClient> | undefined;

function mongoClient(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("Contact storage is not configured");
  if (!clientPromise) {
    clientPromise = new MongoClient(uri, {
      serverSelectionTimeoutMS: 6000,
      maxPoolSize: 5,
    }).connect().catch((error: unknown) => {
      clientPromise = undefined;
      throw error;
    });
  }
  return clientPromise;
}

function json(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  try {
    const body = await readJsonRequest(request);
    if (!body.ok) return json({ error: body.error }, body.status);

    const parsed = enquirySchema.safeParse(body.value);
    if (!parsed.success) return json({ error: "Invalid form fields" }, 400);

    const { website, ...enquiry } = parsed.data;
    if (website) return json({ success: true });

    const client = await mongoClient();
    await client.db("gvb-tech").collection("enquiries").insertOne({
      ...enquiry,
      createdAt: new Date(),
    });

    return json({
      success: true,
      message: "Thank you. Your message has been received.",
    });
  } catch (error) {
    console.error("Contact submission failed", error instanceof Error ? error.name : "unknown");
    return json({ error: "Unable to process your request" }, 500);
  }
}
