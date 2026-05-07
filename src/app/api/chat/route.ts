import { GoogleGenerativeAI } from "@google/generative-ai";

export const maxDuration = 30;
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        // Ensure API key is present
        if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
            const lastMessage = messages[messages.length - 1].content.toLowerCase();
            let demoResponse = "I am currently in Demo Mode. To enable full AI intelligence, please configure the GOOGLE_GENERATIVE_AI_API_KEY.";
            
            if (lastMessage.includes("service") || lastMessage.includes("do you do")) {
                demoResponse = "GVB Tech Solutions specializes in proprietary trading systems, enterprise software development, and algorithmic strategy consultation. How can we help your business scale?";
            } else if (lastMessage.includes("contact") || lastMessage.includes("email")) {
                demoResponse = "You can reach our team at info@gvbtech.in or call us at +91 9381958045. We'd love to discuss your project!";
            } else if (lastMessage.includes("trading")) {
                demoResponse = "Our proprietary trading algorithms are engineered for high-frequency execution and quantitative excellence across global markets.";
            }

            return new Response(JSON.stringify({ text: demoResponse }), { 
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `System: You are the GVB Assistant, an AI representative for GVB Tech Solutions. Your goal is to be helpful, professional, and guide users towards booking a consultation or exploring GVB's enterprise software and algorithmic trading services. Keep responses concise, premium, and intelligent. If you don't know an answer, direct them to contact us at balajikoushik01@gmail.com.\n\nUser: ${messages[messages.length - 1].content}`;

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
