import { GoogleGenAI } from "@google/genai";

const geminiAi = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: process.env.OPENAI_BASE_URL,
});

export default geminiAi;