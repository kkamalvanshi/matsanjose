"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../lib/utils";

interface Message {
  id: string;
  content: string;
  sender: "user" | "agent";
  timestamp: Date;
}

interface ChatInterfaceProps {
  className?: string;
  agentId?: string;
  publicKey?: string;
  agentVersion?: string;
}

export const ChatInterface = ({ 
  className, 
  agentId = "YOUR_RETELL_CHAT_AGENT_ID",
  publicKey = "YOUR_RETELL_PUBLIC_KEY", 
  agentVersion = "YOUR_RETELL_CHAT_AGENT_VERSION" 
}: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hi! I'm here to help answer your questions about MAT San Jose. What would you like to know?",
      sender: "agent",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Removed auto-scroll on messages change to prevent unwanted scrolling

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    setIsTyping(true);

    try {
      // Call our API route which integrates with Retell AI
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content,
          agentId: agentId,
          conversationId: conversationId,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      
      // Update conversation ID if provided
      if (data.conversationId && data.conversationId !== 'fallback') {
        setConversationId(data.conversationId);
      }

      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        sender: "agent",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, agentMessage]);
      setIsLoading(false);
      setIsTyping(false);

    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I'm having trouble responding right now. Please try again.",
        sender: "agent",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
      setIsLoading(false);
      setIsTyping(false);
    }
  };



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={cn(
      "flex flex-col h-[600px] max-w-2xl mx-auto bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border border-gray-200 dark:border-neutral-700 overflow-hidden",
      className
    )}>
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold">MAT San Jose Assistant</h3>
            <p className="text-sm text-blue-100">
              {isTyping ? "Typing..." : "Online • Ready to help"}
            </p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={cn(
                "flex",
                message.sender === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div className={cn(
                "max-w-[80%] px-4 py-2 rounded-2xl",
                message.sender === "user" 
                  ? "bg-blue-600 text-white rounded-br-md" 
                  : "bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-gray-100 rounded-bl-md"
              )}>
                <p className="text-sm">{message.content}</p>
                <p className={cn(
                  "text-xs mt-1",
                  message.sender === "user" 
                    ? "text-blue-100" 
                    : "text-gray-500 dark:text-gray-400"
                )}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="bg-gray-100 dark:bg-neutral-800 rounded-2xl rounded-bl-md px-4 py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-neutral-700">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about MAT San Jose..."
            disabled={isLoading}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-neutral-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:text-white disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full transition-colors"
          >
            {isLoading ? (
              <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}; 