import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Bot, Key, Send, Sparkles, RefreshCw } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/context/user-context";
import { askAIAssistant } from "@/lib/openai";
import { Button } from "@/components/ui/button";

interface Message {
  id: number;
  sender: "user" | "ai";
  content: string;
  timestamp: Date;
}

const AiAssistant = () => {
  const { user } = useUser();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isResponseLoading, setIsResponseLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const loadInitialMessages = async () => {
      setIsLoading(true);
      try {
        // Initial welcome message
        const initialMessages: Message[] = [
          {
            id: 1,
            sender: "ai",
            content: "Hello! I'm Cosmos AI, your educational assistant. I can help with:\n\n• General information about academic subjects\n• Study tips and guidance\n• Explaining basic concepts\n• Suggesting learning resources\n• Answering questions about your courses\n\nHow can I assist your learning journey today?",
            timestamp: new Date()
          }
        ];
        
        setMessages(initialMessages);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to load initial messages:", error);
        setIsLoading(false);
      }
    };
    
    loadInitialMessages();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    
    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px";
  };
  
  // Handle Ctrl+Enter or Cmd+Enter to submit
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleSendMessage(e);
    }
  };

  const handleRetry = async () => {
    if (messages.length < 2) return;
    
    // Find the last user message
    const lastUserMessageIndex = [...messages].reverse().findIndex(m => m.sender === "user");
    if (lastUserMessageIndex === -1) return;
    
    const lastUserMessage = messages[messages.length - lastUserMessageIndex - 1];
    
    // Remove the last AI response
    setMessages(messages.slice(0, -1));
    setIsResponseLoading(true);
    setError(null);
    
    try {
      // Call the AI API with the last user message
      const aiResponse = await askAIAssistant(lastUserMessage.content);
      
      const newAiMessage: Message = {
        id: messages.length + 1,
        sender: "ai",
        content: aiResponse.response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newAiMessage]);
      setIsResponseLoading(false);
    } catch (error) {
      console.error("Failed to get AI response:", error);
      setError("Sorry, I couldn't generate a response. Please try again.");
      setIsResponseLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    const newUserMessage: Message = {
      id: messages.length + 1,
      sender: "user",
      content: inputValue,
      timestamp: new Date()
    };
    
    setMessages([...messages, newUserMessage]);
    setInputValue("");
    setIsResponseLoading(true);
    setError(null);
    
    // Reset textarea height
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
    }
    
    try {
      // Call the AI API
      const aiResponse = await askAIAssistant(inputValue);
      
      const newAiMessage: Message = {
        id: messages.length + 2,
        sender: "ai",
        content: aiResponse.response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newAiMessage]);
      setIsResponseLoading(false);
    } catch (error) {
      console.error("Failed to get AI response:", error);
      setError("Sorry, I couldn't generate a response. Please try again.");
      setIsResponseLoading(false);
    }
  };

  return (
    <motion.div 
      className="rounded-2xl p-6 relative bg-gradient-to-br from-cosmicPurple/20 to-nebulaPink/20 backdrop-blur-md border border-white/10 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-nebulaPink/20 blur-2xl"></div>
      
      <h3 className="text-xl font-bold font-montserrat mb-4 flex items-center">
        <Bot className="mr-2 text-nebulaPink" /> Cosmos AI Assistant
      </h3>
      
      {isLoading ? (
        <div className="space-y-3">
          <Skeleton className="h-20 bg-white/5" />
          <Skeleton className="h-10 bg-white/5 w-3/4 ml-auto" />
        </div>
      ) : (
        <>
          <div className="bg-spaceBlack/70 rounded-xl p-4 mb-3 relative chatbot-orbit h-[260px] overflow-y-auto">
            <div className="flex flex-col space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex w-full ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex items-start max-w-[90%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                      message.sender === "user" 
                        ? "bg-cosmicPurple/20 ml-2" 
                        : "bg-nebulaPink/20 mr-2"
                    }`}>
                      {message.sender === "user" ? (
                        <span className="text-xs text-starWhite">
                          {user?.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      ) : (
                        <Bot className="h-4 w-4 text-nebulaPink" />
                      )}
                    </div>
                    
                    <div className={`relative rounded-lg px-4 py-2 ${
                      message.sender === "user" 
                        ? "bg-cosmicPurple/30 rounded-tr-none" 
                        : "bg-nebulaPink/10 rounded-tl-none"
                    }`}>
                      <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                      <div className="text-[10px] text-white/40 mt-1 text-right">
                        {new Intl.DateTimeFormat('en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        }).format(message.timestamp)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {isResponseLoading && (
              <div className="flex items-start mt-4">
                <div className="w-8 h-8 rounded-full bg-nebulaPink/20 flex items-center justify-center mr-2">
                  <Bot className="h-4 w-4 text-nebulaPink" />
                </div>
                <div className="flex space-x-1 items-center bg-nebulaPink/10 rounded-lg rounded-tl-none px-4 py-3">
                  <div className="w-2 h-2 bg-nebulaPink/50 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-nebulaPink/50 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  <div className="w-2 h-2 bg-nebulaPink/50 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {error && (
            <div className="mb-4 px-3 py-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg text-sm">
              <p>{error}</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-2 bg-transparent border-red-500/30 hover:bg-red-500/10 text-red-400"
                onClick={handleRetry}
              >
                <RefreshCw className="h-3 w-3 mr-2" /> Retry
              </Button>
            </div>
          )}

          <form onSubmit={handleSendMessage} className="relative">
            <div className="relative bg-white/90 border border-white/10 rounded-lg focus-within:border-nebulaPink/50 overflow-hidden">
              <textarea
                ref={inputRef}
                placeholder="Ask anything about your courses..."
                className="w-full bg-transparent py-3 px-4 pr-12 focus:outline-none resize-none text-sm text-black min-h-[48px] max-h-[120px]"
                value={inputValue}
                onChange={handleTextareaChange}
                onKeyDown={handleKeyDown}
                disabled={isResponseLoading}
                rows={1}
              />
              
              <div className="absolute right-2 bottom-2 flex items-center gap-1">
                <span className="text-xs text-gray-400 mr-1 hidden sm:inline-block">
                  {inputValue.length > 0 ? "Ctrl+Enter to send" : ""}
                </span>
                <button
                  type="submit"
                  className={`p-1.5 rounded-md ${
                    !inputValue.trim() || isResponseLoading
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-nebulaPink text-white hover:bg-nebulaPink/90"
                  } flex items-center justify-center`}
                  disabled={isResponseLoading || !inputValue.trim()}
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
            
            <div className="flex justify-between mt-2 text-xs text-white/40">
              <div className="flex items-center">
                <Sparkles className="h-3 w-3 mr-1 text-starYellow" />
                <span>Powered by Cosmos AI</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="text-white/40 hover:text-white/60 transition-colors"
                  onClick={() => {
                    setMessages([
                      {
                        id: 1,
                        sender: "ai",
                        content: "Hello! I'm Cosmos AI, your educational assistant. I can help with:\n\n• General information about academic subjects\n• Study tips and guidance\n• Explaining basic concepts\n• Suggesting learning resources\n• Answering questions about your courses\n\nHow can I assist your learning journey today?",
                        timestamp: new Date()
                      }
                    ]);
                    setError(null);
                  }}
                >
                  Clear chat
                </button>
              </div>
            </div>
          </form>
        </>
      )}
      
      {/* Cosmic effects for the chatbot */}
      <div className="cosmic-dust absolute inset-0 opacity-30 overflow-hidden pointer-events-none" />
      <div className="cosmic-ring absolute -right-20 -bottom-20 w-40 h-40 opacity-20 pointer-events-none" />
      
      <style dangerouslySetInnerHTML={{
        __html: `
          .chatbot-orbit::before,
          .chatbot-orbit::after {
            content: "";
            position: absolute;
            border-radius: 50%;
            animation: orbit linear infinite;
          }
          
          .chatbot-orbit::before {
            width: 8px;
            height: 8px;
            background-color: #FFD700;
            animation-duration: 8s;
          }
          
          .chatbot-orbit::after {
            width: 4px;
            height: 4px;
            background-color: #8BE9FD;
            animation-duration: 12s;
            animation-delay: -3s;
          }
          
          @keyframes orbit {
            0% { transform: rotate(0deg) translateX(120px) rotate(0deg); }
            100% { transform: rotate(360deg) translateX(120px) rotate(-360deg); }
          }
          
          .cosmic-dust {
            background-image: 
              radial-gradient(circle at 20% 30%, rgba(139, 233, 253, 0.1) 0%, transparent 8%),
              radial-gradient(circle at 80% 40%, rgba(255, 184, 108, 0.1) 0%, transparent 8%),
              radial-gradient(circle at 40% 80%, rgba(80, 250, 123, 0.1) 0%, transparent 8%),
              radial-gradient(circle at 60% 10%, rgba(189, 147, 249, 0.1) 0%, transparent 8%);
          }
          
          .cosmic-ring {
            border: 2px solid rgba(139, 233, 253, 0.1);
            border-radius: 50%;
            animation: pulse 4s ease infinite;
          }
          
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.2; }
            50% { transform: scale(1.05); opacity: 0.3; }
          }
        `
      }} />
    </motion.div>
  );
};

export default AiAssistant;
