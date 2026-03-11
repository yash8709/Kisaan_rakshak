require('dotenv').config();

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

async function testRest() {
    console.log("Testing REST API for gemini-flash-latest...");

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${API_KEY}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: "Hello" }]
                    }]
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.log("❌ FAIL:", data);
        } else {
            console.log("✅ SUCCESS:", data.candidates?.[0]?.content?.parts?.[0]?.text || "No text");
        }

    } catch (e) {
        console.log("❌ CRITICAL FAIL:", e.message);
    }
}

testRest();
