"use client";

import type { FormEvent } from "react";
import { useState, useRef, useEffect } from "react";
import type { AnimeCharacter } from "@/lib/characters";
import { chatWithAnimeCharacter } from "@/ai/flows/chat-with-anime-character";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatMessage from "./chat-message";
import { ArrowLeft, Send, Loader2, User, Sparkles } from "lucide-react";
import Link from "next/link";
// import Image from 'next/image'; // Not used directly here, but ChatMessage might use it via Avatar
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChatMessageItem {
  id: string;
  sender: "user" | "ai";
  text: string;
  characterName?: string;
  characterImage?: string;
  characterAiHint?: string;
}

export default function ChatInterface({
  character,
}: {
  character: AnimeCharacter;
}) {
  const [messages, setMessages] = useState<ChatMessageItem[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMessages([
      {
        id: crypto.randomUUID(),
        sender: "ai",
        text: `Hello! I'm ${character.name}. What would you like to talk about? You can start by saying "Hi"!`,
        characterName: character.name,
        characterImage: character.image,
        characterAiHint: character.aiHint,
      },
    ]);
    inputRef.current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [character.id]); // Depend on character.id to re-initialize if character changes (though not typical in this structure)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessageText = inputValue.trim();
    const userMessage: ChatMessageItem = {
      id: crypto.randomUUID(),
      sender: "user",
      text: userMessageText,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const aiResponse = await chatWithAnimeCharacter({
        characterName: character.name,
        characterPersonality: character.personality, // Pass personality here
        userMessage: userMessageText,
      });

      const aiMessage: ChatMessageItem = {
        id: crypto.randomUUID(),
        sender: "ai",
        text: aiResponse.characterResponse,
        characterName: character.name,
        characterImage: character.image,
        characterAiHint: character.aiHint,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      const errorMessage: ChatMessageItem = {
        id: crypto.randomUUID(),
        sender: "ai",
        text: "Sorry, I'm having a little trouble responding right now. Please try again in a moment.",
        characterName: character.name,
        characterImage: character.image,
        characterAiHint: character.aiHint,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <header className="flex items-center p-3 sm:p-4 border-b border-red-700 sticky top-0 bg-black/80 backdrop-blur-sm z-10 shadow-md shadow-red-800">
        <Link href="/" passHref legacyBehavior>
          <Button
            variant="ghost"
            size="icon"
            className="mr-2 sm:mr-4 text-red-400 hover:bg-red-700/30"
          >
            <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="sr-only">Back to character selection</span>
          </Button>
        </Link>
        <Avatar className="h-8 w-8 sm:h-10 sm:w-10 mr-3 sm:mr-4 ring-2 ring-red-600">
          <AvatarImage
            src={character.image}
            alt={character.name}
            data-ai-hint={character.aiHint}
          />
          <AvatarFallback>
            {character.name.substring(0, 1).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <h2 className="text-lg sm:text-xl font-semibold text-red-500 truncate">
          {character.name}
        </h2>
      </header>

      <ScrollArea
        className="flex-grow p-3 sm:p-6 chat-scrollbar"
        style={{ scrollbarGutter: "stable" }}
      >
        <div className="space-y-6">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          {isLoading && (
            <div className="flex items-center space-x-2 animate-pulse p-3 rounded-lg bg-red-900 self-start max-w-[70%] ml-0 mr-auto shadow-lg shadow-red-700/60">
              <Avatar className="h-8 w-8 sm:h-9 sm:w-9 self-start ring-2 ring-red-600">
                <AvatarImage
                  src={character.image}
                  alt={character.name}
                  data-ai-hint={character.aiHint}
                />
                <AvatarFallback>
                  <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
                </AvatarFallback>
              </Avatar>
              <div className="text-sm text-red-400">
                {character.name.split(" ")[0]} is typing...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <footer className="p-3 sm:p-4 border-t border-red-700 bg-black/90 sticky bottom-0">
        <form
          onSubmit={handleSubmit}
          className="flex items-center space-x-2 sm:space-x-3"
        >
          <Input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={`Message ${character.name.split(" ")[0]}...`}
            className="flex-grow text-sm sm:text-base rounded-full px-4 py-2.5 h-12 bg-gray-800 text-white placeholder-red-500 focus-visible:ring-red-600 focus-visible:ring-2"
            disabled={isLoading}
            autoComplete="off"
            aria-label={`Message ${character.name.split(" ")[0]}`}
          />
          <Button
            type="submit"
            size="icon"
            className="rounded-full w-12 h-12 bg-red-600 hover:bg-red-500 text-white shrink-0"
            disabled={isLoading || !inputValue.trim()}
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </footer>
    </div>
  );
}
