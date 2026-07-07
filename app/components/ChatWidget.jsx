"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Mic, Volume2, Bot, Sparkles } from "lucide-react";
import { useFormContext } from "../context/FormContext";

const SUGGESTIONS = [
  "How do I apply for a passport?",
  "Check scheme eligibility",
  "Report a civic issue",
  "What documents do I need for Aadhaar?",
  "Find scholarships for students",
];

export default function ChatWidget() {
  const { isFormActive, getFormSummary, fillMultipleFields } = useFormContext();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "🇮🇳 Namaste! I'm **Smart Bharat AI**, your civic companion. I can help you with:\n\n• 🔍 Discover government services & schemes\n• 📋 Check eligibility for benefits\n• 📄 Understand document requirements\n• 🏗️ Report civic issues\n• 📊 Track your applications\n\nHow can I assist you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async (text) => {
    const messageText = text || input.trim();
    if (!messageText || isLoading) return;

    const userMessage = { role: "user", content: messageText };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      // Gather form context if user is currently filling a form
      const formContext = isFormActive ? getFormSummary() : null;

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          formContext,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply },
        ]);

        // If AI extracted form values, fill them automatically
        if (data.formData && Object.keys(data.formData).length > 0) {
          fillMultipleFields(data.formData);
          const fieldsCount = Object.keys(data.formData).length;
          
          // Add a notification message inside the chat
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: `✨ **Agentic Assistant:** Auto-filled **${fieldsCount}** field${fieldsCount > 1 ? "s" : ""} on the form using the details you provided!`,
            },
          ]);
        }
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `⚠️ ${data.error || "Something went wrong. Please try again."}`,
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "⚠️ Unable to connect. Please check your internet connection and try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatMessage = (content) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br/>")
      .replace(/• /g, "• ");
  };

  if (!isOpen) {
    return (
      <button
        className="chat-fab"
        onClick={() => setIsOpen(true)}
        aria-label="Open Smart Bharat AI Assistant"
      >
        <span className="pulse-ring"></span>
        <MessageCircle size={26} />
      </button>
    );
  }

  return (
    <div className="chat-window" role="dialog" aria-label="Smart Bharat AI Chat">
      {/* Header */}
      <div className="chat-header">
        <div className="chat-header-info">
          <div className="chat-avatar">🇮🇳</div>
          <div className="chat-header-text">
            <h3>Smart Bharat AI</h3>
            <span>Your Civic Companion</span>
          </div>
        </div>
        <button
          className="chat-close"
          onClick={() => setIsOpen(false)}
          aria-label="Close chat"
        >
          <X size={18} />
        </button>
      </div>

      {/* Messages */}
      <div className="chat-messages" role="log" aria-live="polite">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-message ${msg.role}`}>
            <div
              className="chat-message-bubble"
              dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
            />
          </div>
        ))}
        {isLoading && (
          <div className="chat-message assistant">
            <div className="chat-typing">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="chat-suggestions">
          {SUGGESTIONS.map((suggestion, i) => (
            <button
              key={i}
              className="chat-suggestion-btn"
              onClick={() => sendMessage(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="chat-input-area">
        <input
          ref={inputRef}
          className="chat-input"
          type="text"
          placeholder="Ask about services, schemes, documents..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          aria-label="Type your message"
        />
        <button
          className="chat-send"
          onClick={() => sendMessage()}
          disabled={!input.trim() || isLoading}
          aria-label="Send message"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
