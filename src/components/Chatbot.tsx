import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import allConversations from '@/../src/all_conversations.json'; // Adjust path if needed

// Define the structure of a chat message
interface Message {
  sender: 'user' | 'aura';
  text: string;
}

// --- The Chatbot Component ---
export const Chatbot: React.FC = () => {
  // State to hold the chat messages
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'aura', text: "Hi! I'm Aura, your AI health assistant. Ask me anything about Rohan's journey." }
  ]);
  // State for the user's current input
  const [input, setInput] = useState('');
  // State to show a loading indicator while the AI is thinking
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle sending a message
  const handleSendMessage = async () => {
    if (!input.trim()) return; // Don't send empty messages

    // Add user's message to the chat UI immediately
    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Prepare the context and prompt for the Gemini API
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("Missing Gemini API Key in .env.local");
      }
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-preview-0514:generateContent?key=${apiKey}`;

      // Convert the imported JSON conversations into a single string context
      const conversationContext = Object.values(allConversations)
        .flatMap(phase => Object.values(phase))
        .join('\n\n');

      const fullPrompt = `
        ### Persona
        You are an empathetic and helpful AI assistant for Elyx, a personalized healthcare service. Your name is Aura. Your purpose is to help the Elyx clinical team quickly understand a member's health journey by answering their questions. You must be factual and base your answers ONLY on the provided conversation history. Maintain a supportive and clear tone.

        ### Core Instructions
        1. Analyze the User's Question: Understand what the user is asking about the member, Rohan.
        2. Scan the Provided Context: Read through the entire 32-week conversation history provided below to find the relevant information.
        3. Synthesize and Answer: Formulate a concise, empathetic, and factual answer based ONLY on the information found in the context.
        4. Cite Your Sources: At the end of your answer, always cite the week(s) you used to find the information, like this: (Source: Week 8, Week 9).
        5. Handle Unknown Information: If you cannot find the answer in the provided context, you must respond with: "I'm sorry, I couldn't find information on that in Rohan's conversation history." Do not make up or infer information.

        ### Context: Rohan's 32-Week Health Journey
        ${conversationContext}

        ### User Question
        ${input}
      `;

      // Make the API call
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: fullPrompt }] }] })
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      const auraResponseText = data.candidates[0].content.parts[0].text;
      
      // Add Aura's response to the chat UI
      const auraMessage: Message = { sender: 'aura', text: auraResponseText };
      setMessages(prev => [...prev, auraMessage]);

    } catch (error) {
      console.error("Error calling Gemini API:", error);
      const errorMessage: Message = { sender: 'aura', text: "Sorry, I'm having trouble connecting right now. Please check the API key and try again." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <span className="text-2xl mr-2">🤖</span> Ask Aura about Rohan's Journey
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] w-full pr-4">
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                {msg.sender === 'aura' && <span className="text-2xl">👩‍⚕️</span>}
                <div className={`rounded-lg px-4 py-2 ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-900'}`}>
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-end gap-2">
                <span className="text-2xl">👩‍⚕️</span>
                <div className="rounded-lg px-4 py-2 bg-slate-200 text-slate-900">
                  <p className="text-sm">Aura is thinking...</p>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="mt-4 flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., Why did Rohan go to the ER?"
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            disabled={isLoading}
          />
          <Button onClick={handleSendMessage} disabled={isLoading}>
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
