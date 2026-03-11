const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

async function run() {
    try {
        console.log("Testing gemini-1.5-flash-001...");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-001" });
        const result = await model.generateContent("Hi");
        console.log(`PASS: ${result.response.text()}`);
    } catch (e) {
        console.log(`FAIL: ${e.message.split('\n')[0]}`);
    }
}

run();
