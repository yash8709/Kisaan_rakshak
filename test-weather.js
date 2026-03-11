const fs = require('fs');

async function testWeather() {
    try {
        console.log("🔍 Reading .env file...");
        const envContent = fs.readFileSync('.env', 'utf-8');
        const keyMatch = envContent.match(/REACT_APP_WEATHER_API_KEY=(.+)/);

        if (!keyMatch) {
            console.error("❌ Could not find REACT_APP_WEATHER_API_KEY in .env");
            return;
        }

        const API_KEY = keyMatch[1].trim();
        console.log(`🔑 Found API Key: ${API_KEY.substring(0, 5)}...`);

        if (API_KEY === 'YOUR_WEATHER_API_KEY_HERE') {
            console.error("❌ API Key is still the placeholder text!");
            return;
        }

        const city = "New Delhi";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

        console.log(`🌐 Testing Connection to: ${url.replace(API_KEY, 'HIDDEN_KEY')}`);

        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            console.log("\n✅ SUCCESS: Weather API is working!");
            console.log(`📍 Location: ${data.name}`);
            console.log(`🌡️ Temp: ${data.main.temp}°C`);
            console.log(`📝 Description: ${data.weather[0].description}`);
        } else {
            console.log("\n❌ FAILED: API Error");
            console.log(`Status: ${response.status} ${response.statusText}`);
            console.log("Error Message:", data.message);
        }

    } catch (e) {
        console.error("CRITICAL ERROR:", e.message);
    }
}

testWeather();
