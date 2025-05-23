"use client";

import * as React from "react"; // Added React import
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown'; 

interface ChatMessageItem {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  characterName?: string;
  characterImage?: string;
  characterAiHint?: string;
}

interface ChatMessageProps {
  message: ChatMessageItem;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === 'user';

  return (
    <div
      className={cn(
        "flex items-start space-x-2 sm:space-x-3 max-w-[85%] sm:max-w-[75%] animate-fadeIn",
        isUser ? "ml-auto flex-row-reverse space-x-reverse" : "mr-auto"
      )}
    >
      <Avatar className="h-8 w-8 sm:h-9 sm:w-9 shrink-0">
        {isUser ? (
          <AvatarFallback className="bg-secondary text-secondary-foreground">
            <User className="h-4 w-4 sm:h-5 sm:w-5" />
          </AvatarFallback>
        ) : (
          <>
            <AvatarImage src={message.characterImage} alt={message.characterName} data-ai-hint={message.characterAiHint}/>
            <AvatarFallback className="bg-primary/20 text-primary">
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
            </AvatarFallback>
          </>
        )}
      </Avatar>
      
      <div
        className={cn(
          "p-3 sm:p-4 rounded-2xl shadow-md min-w-[60px]", // min-w to prevent collapsing on short words
          isUser
            ? "bg-primary text-primary-foreground rounded-br-none"
            : "bg-card text-card-foreground rounded-bl-none border border-border"
        )}
      >
        {!isUser && message.characterName && (
          <p className="text-xs font-medium mb-1 text-muted-foreground">{message.characterName}</p>
        )}
        <div className="prose prose-sm dark:prose-invert max-w-none break-words text-inherit">
          <ReactMarkdown
            components={{
              p: React.Fragment, // Use React.Fragment to avoid adding extra <p> tags around message text
              // You can add more custom renderers here if needed, e.g., for links, code blocks
            }}
          >
            {message.text}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
