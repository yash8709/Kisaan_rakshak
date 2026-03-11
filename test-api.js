const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
console.log("Testing API Key:", apiKey ? "Present" : "Missing");

const genAI = new GoogleGenerativeAI(apiKey);

async function testModel(modelName) {
    console.log(`\nTesting Model: ${modelName}`);
    try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("Hello, are you working?");
        console.log(`✅ Success [${modelName}]:`, result.response.text());
    } catch (error) {
        console.error(`❌ Failed [${modelName}]:`, error.message);
    }
}

async function run() {
    await testModel("gemini-flash-latest"); // Current
    await testModel("gemini-1.5-flash");    // Stable Alternative
}

run();
