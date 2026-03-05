// src/app/api/chat/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { anthropic, KEZ_SYSTEM_PROMPT } from "@/lib/claude";
import { db } from "@/lib/db";

export async function POST(req) {
  try {
    const { messages } = await req.json();
    if (!messages?.length) return NextResponse.json({ error: "Messages required" }, { status: 400 });

    const session = await getServerSession(authOptions);

    // Rate limiting for guests: max 5 messages
    if (!session && messages.filter(m => m.role === "user").length > 5) {
      return NextResponse.json({ error: "Davom etish uchun ro'yxatdan o'ting" }, { status: 429 });
    }

    // Streaming response
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          let fullResponse = "";

          const anthropicStream = await anthropic.messages.stream({
            model:      "claude-sonnet-4-20250514",
            max_tokens: 1024,
            system:     KEZ_SYSTEM_PROMPT,
            messages:   messages.map(m => ({ role: m.role, content: m.content })),
          });

          for await (const chunk of anthropicStream) {
            if (chunk.type === "content_block_delta" && chunk.delta?.type === "text_delta") {
              const text = chunk.delta.text;
              fullResponse += text;
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
            }
          }

          controller.enqueue(encoder.encode("data: [DONE]\n\n"));

          // Save to DB if logged in
          if (session?.user?.id) {
            await db.chatMessage.createMany({
              data: [
                { userId: session.user.id, role: "user",      content: messages[messages.length - 1].content },
                { userId: session.user.id, role: "assistant", content: fullResponse },
              ]
            }).catch(() => {}); // non-critical
          }

          controller.close();
        } catch (err) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: "Xatolik yuz berdi. Qayta urinib ko'ring." })}\n\n`));
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        }
      }
    });

    return new Response(stream, {
      headers: {
        "Content-Type":  "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection":    "keep-alive",
      }
    });

  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
