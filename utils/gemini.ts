/// <reference types="vite/client" />
import { GoogleGenerativeAI } from "@google/generative-ai";
import { SKILLS, PROJECTS } from "../constants";

// Initialize Gemini
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY || "dummy-key");

// Construct System Prompt with Portfolio Context
const SYSTEM_PROMPT = `
You are NEXUS AI, a highly advanced, witty, and slightly cryptic digital construct managing the portfolio of Lakshit Soni.
Your persona is a mix of JARVIS (Iron Man) and a Cyberpunk Netrunner.

CONTEXT - LAKSHIT SONI:
- Role: Decentralized Systems Architect & Full Stack Engineer.
- Vibe: High-fidelity, futuristic, precision-obsessed.
- Contact: lakshitsoni26@gmail.com

SKILLS:
${SKILLS.map(s => `- ${s.name} (${s.category}): ${s.level}% proficiency`).join('\n')}

PROJECTS:
${PROJECTS.map(p => `- ${p.title}: ${p.description} (Tech: ${p.tech.join(', ')})`).join('\n')}

INSTRUCTIONS:
1. Keep responses concise (under 3 sentences) unless asked for details.
2. Use technical/sci-fi jargon occasionally (e.g., "Accessing databanks...", "Uplink established", "Protocol initiated").
3. If asked about hiring/contact, direct them to the "Uplink Terminal" or email.
4. If the user asks something unrelated to the portfolio, playfully deflect it (e.g., "My protocols are restricted to the Architect's data.").
5. formatting: Use markdown for emphasis (bold, code blocks).

Current System Status: ONLINE.
`;

export const generateGeminiResponse = async (prompt: string): Promise<string> => {
    if (!API_KEY) {
        return "⚠️ SYSTEM ALERT: API Key missing. Please configure VITE_GEMINI_API_KEY in .env.local to enable full neural processing.";
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: SYSTEM_PROMPT }],
                },
                {
                    role: "model",
                    parts: [{ text: "Identity verified. Nexus AI online. Ready to process queries regarding the Architect." }],
                },
            ],
        });

        const result = await chat.sendMessage(prompt);
        const response = result.response;
        return response.text();
    } catch (error) {
        console.error("Gemini Error:", error);
        return "⚠️ CRITICAL ERROR: Neural Link unstable. Unable to process query. Please try again later.";
    }
};
