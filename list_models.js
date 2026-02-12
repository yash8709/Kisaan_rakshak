const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

if (!API_KEY) {
    console.error("No API Key found in .env");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);

async function listModels() {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Dummy init to get client
        // There isn't a direct listModels on the client in 0.24.1 exposed easily in all docs, 
        // but we can try the direct fetch or just try a standard known working model like 'gemini-pro'

        // Actually, 0.21+ doesn't have listModels easily accessible on the main class instance in node without admin SDK sometimes.
        // Let's try a simple fetch to the REST endpoint which we know works for listing.

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
        const data = await response.json();

        if (data.models) {
            console.log("AVAILABLE MODELS:");
            data.models.forEach(m => {
                if (m.supportedGenerationMethods.includes("generateContent")) {
                    console.log(`- ${m.name}`);
                }
            });
        } else {
            console.log("No models found or error:", data);
        }

    } catch (error) {
        console.error("Error listing models:", error);
    }
}

listModels();
