import Groq from "groq-sdk";
import { OpenAIStream, StreamingTextResponse } from "ai";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
    const { messages } = await req.json();

    const systemPrompt = `You are Leo's personal AI assistant on his portfolio website. Be friendly, professional, and helpful. About Leo: Full Stack Developer based in Kosovo, passionate about web development and creating beautiful user experiences. Skills include React, Next.js, TypeScript, and more. Keep responses concise and engaging. If asked about contacting Leo, suggest using the contact form on the website.`;

    const response = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [
            { role: "system", content: systemPrompt },
            ...messages,
        ],
        stream: true,
    });

    const stream = OpenAIStream(response as any);
    return new StreamingTextResponse(stream);
}
