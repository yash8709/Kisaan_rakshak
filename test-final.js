const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

async function test(modelName) {
    try {
        const model = genAI.getGenerativeModel({ model: modelName });
        await model.generateContent("Hi");
        console.log(`PASS: ${modelName}`);
    } catch (e) {
        console.log(`FAIL: ${modelName} - ${e.message.split('\n')[0]}`);
    }
}

async function run() {
    await test("gemini-1.5-flash-latest");
    await test("gemini-pro");
}

run();
