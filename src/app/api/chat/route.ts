import { GoogleGenerativeAI } from "@google/generative-ai";

export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        // Ensure API key is present
        if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
            return new Response(JSON.stringify({ text: "API Key missing. Please add GOOGLE_GENERATIVE_AI_API_KEY to your environment variables." }), { status: 200 });
        }

        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `System: You are the GVB Assistant, an AI representative for GVB Tech Solutions. Your goal is to be helpful, professional, and guide users towards booking a consultation or exploring GVB's enterprise software and algorithmic trading services. Keep responses concise, premium, and intelligent. If you don't know an answer, direct them to contact us at hello@gvbtech.example.com.\n\nUser: ${messages[messages.length - 1].content}`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        return new Response(JSON.stringify({ text }), {
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error("AI Chat Error:", error);
        return new Response(JSON.stringify({ error: "Failed to process chat request" }), { status: 500 });
    }
}
