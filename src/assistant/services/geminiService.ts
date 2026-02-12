import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY as string;

// STEP 3: Runtime Validation Log
console.log("Using NEW Gemini SDK architecture");

if (!API_KEY) {
    throw new Error("Missing Gemini API key in .env");
}

const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({
    model: "gemini-flash-latest"
});

let lastCallTime = 0;

export async function generateGeminiResponse(userInput: string) {
    const now = Date.now();

    if (now - lastCallTime < 20000) {
        return "Please wait before sending another request.";
    }

    lastCallTime = now;

    const prompt = `
Give practical and complete farming advice for Indian farmers.
Keep answer concise but thorough.

Query: ${userInput}
`;

    try {
        const result = await model.generateContent({
            contents: [
                {
                    role: "user",
                    parts: [{ text: prompt }]
                }
            ],
            generationConfig: {
                maxOutputTokens: 1000,
                temperature: 0.7
            }
        });

        return result.response.text();

    } catch (error) {
        console.error("Gemini SDK Error:", error);
        return "AI service temporarily unavailable.";
    }
}
