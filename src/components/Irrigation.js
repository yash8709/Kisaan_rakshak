import React, { useState } from "react";
import "./irrigation.css"; // Ensure you create this CSS file for styling
import { FaTint, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

const Irrigation = () => {
  const [status, setStatus] = useState("Checking...");
  const [moistureLevel, setMoistureLevel] = useState(50);

  const checkIrrigationStatus = () => {
    const soilMoisture = Math.floor(Math.random() * 100); // Simulated sensor data
    setMoistureLevel(soilMoisture);

    if (soilMoisture > 50) {
      setStatus("No irrigation needed, soil moisture is sufficient.");
    } else {
      setStatus("Irrigation needed, soil moisture is low!");
    }
  };

  return (
    <div className="irrigation-container">
      <h2 className="title">🌱 Smart Irrigation System</h2>
      <div className="status-box">
        <p className="moisture-level">
          <FaTint /> Soil Moisture: <strong>{moistureLevel}%</strong>
        </p>
        <p className={`status-text ${moistureLevel > 50 ? "safe" : "warning"}`}>
          {moistureLevel > 50 ? <FaCheckCircle /> : <FaExclamationTriangle />} {status}
        </p>
        <div className="progress-bar">
          <div
            className={`progress ${moistureLevel > 50 ? "green" : "red"}`}
            style={{ width: `${moistureLevel}%` }}
          ></div>
        </div>
      </div>
      <button className="check-btn" onClick={checkIrrigationStatus}>
        Check Irrigation Status
      </button>
    </div>
  );
};

export default Irrigation;
