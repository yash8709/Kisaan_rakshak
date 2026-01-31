import React, { useState, useEffect } from "react";
import Weather from "./components/Weather";
import PestManagement from "./components/PestManagement";
import Irrigation from "./components/Irrigation";
import "./App.css"; // Import the CSS file

function App() {
  const [backgroundUrl, setBackgroundUrl] = useState("");

  // Function to fetch a new image URL from Unsplash
  const fetchBackgroundImage = () => {
    const randomImageUrl = `https://source.unsplash.com/1920x1080/?farm,irrigation,crops,agriculture`;
    setBackgroundUrl(randomImageUrl);
  };

  useEffect(() => {
    fetchBackgroundImage();

    // Automatically update the background every 10 seconds
    const interval = setInterval(() => {
      fetchBackgroundImage();
    }, 10000); // 10,000ms = 10 seconds

    return () => clearInterval(interval); // Cleanup interval
  }, []);

  return (
    <div className="app-container" style={{ backgroundImage: `url(${backgroundUrl})` }}>
      <h1 className="title">🚜Smart Kisan Dashboard🌱</h1>
      <Weather />
      <PestManagement />
      <Irrigation />
    </div>
  );
}

export default App;
