import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Terminal, Cpu, Sparkles, Activity } from 'lucide-react';
import { generateGeminiResponse } from '../../utils/gemini';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
}

export const AIChatTerminal: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Initial Greeting
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            // Small delay for realism
            setTimeout(() => {
                addMessage("Identity verified. Nexus AI online. How can I assist you with the Architect's data?", 'ai');
            }, 500);
        }
    }, [isOpen]);

    // Auto-scroll
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const addMessage = (text: string, sender: 'user' | 'ai') => {
        const newMessage: Message = {
            id: Date.now().toString(),
            text,
            sender,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, newMessage]);
    };

    const handleSend = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputValue.trim()) return;

        const userText = inputValue;
        setInputValue('');
        addMessage(userText, 'user');
        setIsTyping(true);

        try {
            // Call Gemini API
            const response = await generateGeminiResponse(userText);
            setIsTyping(false);
            addMessage(response, 'ai');
        } catch (error) {
            setIsTyping(false);
            addMessage("⚠️ CONNECTION ERROR: Neural Link severed. Please try again.", 'ai');
        }
    };

    return (
        <>
            {/* Trigger Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                className={`fixed bottom-16 right-28 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] ${isOpen ? 'bg-cyber-primary text-black' : 'bg-black/80 border border-cyber-primary/50 text-cyber-primary backdrop-blur-md'}`}
            >
                {isOpen ? (
                    <X className="w-6 h-6" />
                ) : (
                    // Custom Nexus AI Logo
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                        <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="12" cy="12" r="3" fill="currentColor" className="animate-pulse" />
                        <path d="M12 12L12 2M12 12L20.66 17M12 12L3.34 17M12 12L20.66 7M12 12L3.34 7" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
                    </svg>
                )}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-28 right-8 z-50 w-[90vw] md:w-[400px] h-[600px] bg-black/90 border border-cyber-primary/30 rounded-xl backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Holographic Background Grid */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

                        {/* Header */}
                        <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between relative z-10">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                <span className="font-orbitron text-sm text-cyber-primary tracking-widest">NEXUS_AI // V2.0</span>
                            </div>
                            <div className="flex gap-2">
                                <Activity className="w-4 h-4 text-cyber-primary/50 animate-pulse" />
                                <Cpu className="w-4 h-4 text-cyber-primary/50" />
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 p-4 overflow-y-auto space-y-4 font-mono text-sm scrollbar-thin scrollbar-thumb-cyber-primary/20 scrollbar-track-transparent relative z-10">
                            {messages.map((msg) => (
                                <motion.div
                                    initial={{ opacity: 0, x: msg.sender === 'user' ? 20 : -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    key={msg.id}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] p-3 rounded-lg ${msg.sender === 'user'
                                            ? 'bg-cyber-primary/10 border border-cyber-primary/30 text-cyber-primary rounded-br-none'
                                            : 'bg-white/5 border border-white/10 text-gray-300 rounded-bl-none'
                                            }`}
                                    >
                                        {msg.sender === 'ai' && (
                                            <div className="flex items-center gap-2 mb-1 border-b border-white/5 pb-1">
                                                <Sparkles className="w-3 h-3 text-cyber-secondary" />
                                                <span className="text-[10px] text-cyber-secondary font-bold">NEXUS_CORE</span>
                                            </div>
                                        )}
                                        <div className="whitespace-pre-wrap leading-relaxed">
                                            {msg.text}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Typing Indicator */}
                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex justify-start"
                                >
                                    <div className="bg-white/5 border border-white/10 p-3 rounded-lg rounded-bl-none flex items-center gap-2">
                                        <span className="text-[10px] text-cyber-primary animate-pulse">PROCESSING</span>
                                        <div className="flex gap-1">
                                            <motion.div
                                                animate={{ height: [4, 12, 4] }}
                                                transition={{ repeat: Infinity, duration: 0.5 }}
                                                className="w-1 bg-cyber-primary rounded-full"
                                            />
                                            <motion.div
                                                animate={{ height: [4, 12, 4] }}
                                                transition={{ repeat: Infinity, duration: 0.5, delay: 0.1 }}
                                                className="w-1 bg-cyber-primary rounded-full"
                                            />
                                            <motion.div
                                                animate={{ height: [4, 12, 4] }}
                                                transition={{ repeat: Infinity, duration: 0.5, delay: 0.2 }}
                                                className="w-1 bg-cyber-primary rounded-full"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSend} className="p-4 border-t border-white/10 bg-black/50 relative z-10">
                            <div className="relative flex items-center">
                                <Terminal className="absolute left-3 w-4 h-4 text-gray-500" />
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Enter command..."
                                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-10 text-white font-mono text-sm focus:outline-none focus:border-cyber-primary/50 focus:bg-white/10 transition-all placeholder:text-gray-600"
                                />
                                <button
                                    type="submit"
                                    disabled={!inputValue.trim() || isTyping}
                                    className="absolute right-2 p-1.5 text-cyber-primary hover:bg-cyber-primary/20 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
