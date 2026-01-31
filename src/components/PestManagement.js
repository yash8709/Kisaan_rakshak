import React, { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";
import "./PestManagement.css";

const PestManagement = () => {
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    tf.ready().then(() => console.log("TensorFlow.js Loaded ✅"));
  }, []);

  const loadModelAndPredict = async (imgElement) => {
    setLoading(true);
    try {
      const model = await mobilenet.load();
      const predictions = await model.classify(imgElement);

      const pestKeywords = ["insect", "bug", "worm", "beetle", "fly", "aphid"];
      const detectedPest = predictions.some((p) =>
        pestKeywords.some((keyword) => p.className.toLowerCase().includes(keyword))
      );

      setPrediction(detectedPest ? "🚨 Pest Detected! Take Action!" : "✅ No Pest Found. Crop is Healthy.");
    } catch (error) {
      setPrediction("❌ Error detecting pests. Try again.");
    }
    setLoading(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imgElement = new Image();
      imgElement.src = URL.createObjectURL(file);
      imgElement.onload = () => loadModelAndPredict(imgElement);
      setImage(imgElement.src);
    }
  };

  return (
    <div className="pest-container">
      <h2>🌿 AI-Powered Pest Detection</h2>
      <p>Detect pests early, predict outbreaks, and automate pest control.</p>

      <input type="file" accept="image/*" onChange={handleImageUpload} className="file-input" />
      
      {image && <img src={image} alt="Uploaded Crop" className="uploaded-image" />}
      
      {loading ? <p className="loading">🔍 Analyzing...</p> : <p className="result">{prediction}</p>}
    </div>
  );
};

export default PestManagement;
