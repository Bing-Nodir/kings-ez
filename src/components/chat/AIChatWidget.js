// src/components/chat/AIChatWidget.js
"use client";
import { useState, useRef, useEffect } from "react";
import { Bot, X, Send, Minimize2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

const WELCOME = "Salom! Men Kings Education Zone AI Mentorman. 🎓\n\nIT ta'lim haqida istalgan savolni bering — qaysi kurs mos, qanday o'rganish kerak, kod savollar — hammasi!";

export default function AIChatWidget() {
  const [open,     setOpen]     = useState(false);
  const [messages, setMessages] = useState([{ role: "assistant", content: WELCOME }]);
  const [input,    setInput]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const bottomRef = useRef(null);
  const inputRef  = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { role: "user", content: text };
    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs);
    setInput("");
    setLoading(true);

    // Add empty assistant message for streaming
    setMessages(prev => [...prev, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ messages: newMsgs }),
      });

      if (!res.ok) throw new Error("API error");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let full = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") break;
            try {
              const { text } = JSON.parse(data);
              if (text) {
                full += text;
                setMessages(prev => {
                  const updated = [...prev];
                  updated[updated.length - 1] = { role: "assistant", content: full };
                  return updated;
                });
              }
            } catch {}
          }
        }
      }
    } catch (err) {
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: "assistant", content: "Kechirasiz, xatolik yuz berdi. Qayta urinib ko'ring." };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">

      {/* Chat Panel */}
      {open && (
        <div className="w-[360px] glass rounded-2xl overflow-hidden shadow-2xl animate-fade-up">
          {/* Header */}
          <div className="px-4 py-3 flex items-center gap-3 border-b border-teal-DEFAULT/15 bg-gradient-to-r from-teal-DEFAULT/10 to-transparent">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-DEFAULT to-teal-light flex items-center justify-center text-navy text-sm font-bold">🤖</div>
            <div className="flex-1">
              <p className="font-semibold text-sm">KEZ AI Mentor</p>
              <p className="text-xs text-teal-DEFAULT flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-DEFAULT animate-pulse inline-block" />
                Claude bilan ishlaydi
              </p>
            </div>
            <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/40 hover:text-white">
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="h-72 overflow-y-auto p-3 space-y-2.5">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-teal-DEFAULT/15 border border-teal-DEFAULT/25 rounded-br-sm"
                    : "bg-white/5 border border-white/8 rounded-bl-sm"
                }`}>
                  {m.role === "assistant" ? (
                    <div className="prose prose-sm prose-invert max-w-none">
                      <ReactMarkdown>{m.content || (loading && i === messages.length - 1 ? "▌" : "")}</ReactMarkdown>
                    </div>
                  ) : m.content}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-white/5 flex gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
              placeholder="Savol yozing..."
              rows={1}
              disabled={loading}
              className="input resize-none py-2 text-sm flex-1"
              style={{ maxHeight: "80px" }}
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              className="w-10 h-10 min-w-[2.5rem] rounded-xl bg-gradient-to-br from-teal-DEFAULT to-teal-light text-navy flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_4px_15px_rgba(0,188,212,.3)]"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Trigger button */}
      <button
        onClick={() => setOpen(p => !p)}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-DEFAULT to-teal-light text-navy text-xl flex items-center justify-center shadow-[0_8px_30px_rgba(0,188,212,.4)] animate-pulse-glow hover:scale-110 transition-transform"
      >
        {open ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
      </button>
    </div>
  );
}
