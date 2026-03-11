const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

async function check() {
    console.log("Checking commonly available models...");

    const candidates = [
        "gemini-1.5-flash-latest",
        "gemini-1.5-flash",
        "gemini-1.5-pro-latest",
        "gemini-pro",
        "gemini-1.0-pro"
    ];

    for (const m of candidates) {
        try {
            process.stdout.write(`Testing ${m}... `);
            const model = genAI.getGenerativeModel({ model: m });
            const result = await model.generateContent("Hi");
            console.log(`✅ OK`);
        } catch (e) {
            console.log(`❌ FAIL (${e.message.split('[')[1]?.split(']')[0] || 'Error'})`);
        }
    }
}

check();
