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
                demoResponse = "GVB Tech Solutions specializes in automated tools & AI workflows, dashboards & analytics, custom web/app development, and strategy consultation. How can we help your business?";
            } else if (lastMessage.includes("contact") || lastMessage.includes("email")) {
                demoResponse = "You can reach our team at info@gvbtech.in or call us at +91 9381958045. We'd love to discuss your project!";
            } else if (lastMessage.includes("automation") || lastMessage.includes("tool")) {
                demoResponse = "We build custom workflow automation, background task processors, applied machine learning models, and API integrations tailored for high reliability.";
            }

            return new Response(JSON.stringify({ text: demoResponse }), { 
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `System: You are the GVB Assistant, an AI representative for GVB Tech Solutions. Your goal is to be helpful, professional, and guide users towards booking a consultation or exploring GVB's software development, automated tools, analytics dashboards, and technology consultation offerings. Keep responses concise, premium, and intelligent. If you don't know an answer, direct them to contact us at info@gvbtech.in.\n\nUser: ${messages[messages.length - 1].content}`;

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
