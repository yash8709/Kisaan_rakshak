const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

async function test(modelName) {
    console.log(`Testing: ${modelName}`);
    try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("Hello");
        console.log(`✅ SUCCESS: ${modelName}`);
        return true;
    } catch (error) {
        console.log(`❌ FAILED: ${modelName} - ${error.message.split('\n')[0]}`);
        return false;
    }
}

async function run() {
    // Try latest alias
    await test("gemini-1.5-flash-latest");
    // Try specific versions
    await test("gemini-1.5-flash-001");
    await test("gemini-1.5-flash-002");
    // Try older stable
    await test("gemini-pro");
    await test("gemini-1.0-pro");
}

run();
