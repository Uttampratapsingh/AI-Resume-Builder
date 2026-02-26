import OpenAI from "openai";

const geminiAi = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: process.env.OPENAI_BASE_URL
});

export default geminiAi;