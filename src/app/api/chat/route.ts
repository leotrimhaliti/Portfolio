import Groq from "groq-sdk";

export async function POST(req: Request) {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
        return new Response("Missing GROQ_API_KEY", { status: 500 });
    }

    const groq = new Groq({
        apiKey: apiKey,
    });

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

    // Create a readable stream from the Groq response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
        async start(controller) {
            for await (const chunk of response) {
                const text = chunk.choices[0]?.delta?.content || "";
                if (text) {
                    // Format as data stream protocol for useChat
                    controller.enqueue(encoder.encode(`0:${JSON.stringify(text)}\n`));
                }
            }
            controller.close();
        },
    });

    return new Response(stream, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
        },
    });
}
