import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

const MONGODB_URI = process.env.MONGODB_URI;

// Edge caching client
let cachedClient: MongoClient | null = null;

async function connectToDatabase() {
    if (cachedClient) {
        return cachedClient;
    }

    if (!MONGODB_URI) {
        throw new Error('Please define the MONGODB_URI environment variable inside .env');
    }

    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    cachedClient = client;
    return client;
}

export async function POST(req: Request) {
    try {
        const data = await req.json();

        // Validate required fields
        if (!data.name || !data.email || !data.service || !data.message) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Initialize MongoDB connection
        const client = await connectToDatabase();
        // Access 'gvb-tech' database automatically via the URI or default fallback
        const db = client.db('gvb-tech-applicants');
        const applicantsCollection = db.collection('applicants');

        // Insert new applicant into MongoDB securely
        const result = await applicantsCollection.insertOne({
            name: data.name,
            email: data.email,
            phone: data.phone || null,
            service: data.service,
            message: data.message,
            createdAt: new Date()
        });

        return NextResponse.json({
            success: true,
            message: "Applicant documented successfully in MongoDB Atlas.",
            id: result.insertedId
        }, { status: 200 });

    } catch (error) {
        console.error("MongoDB Insertion Error:", error);
        return NextResponse.json({ error: "Failed to process applicant data" }, { status: 500 });
    }
}
