# 🌿 Kisaan Rakshak - Enterprise AI Platform

**Kisaan Rakshak** is a production-grade AI platform empowering farmers with instant pest detection, multilingual support, and data-driven analytics.

![Status](https://img.shields.io/badge/Status-Production%20Ready-success)
![Tech](https://img.shields.io/badge/Stack-React%20%7C%20TypeScript%20%7C%20Tailwind%20%7C%20TensorFlow-blue)

## 🚀 Enterprise Features (Phase 2)

- **🌍 Multilingual Support**: Fully localized in **English** and **Hindi** (हिंदी).
- **🌗 Dark Mode**: System-wide dark theme optimized for low-light field conditions.
- **🩺 Remedies Engine**: AI not only detects pests but suggests **Organic** & **Chemical** treatments.
- **📊 Analytics Dashboard**: Tracks scan history and visualizes crop health trends over time.
- **📱 PWA Ready**: Installable on mobile devices with offline capabilities.

## 🛠️ Tech Stack

- **Core**: React 19, TypeScript
- **Styling**: Tailwind CSS (Dark Mode enabled)
- **AI/ML**: TensorFlow.js (Client-side inference)
- **State/Storage**: Context API, LocalStorage, IndexedDB
- **Visualization**: Recharts
- **Internationalization**: i18next

## 📂 Project Structure

```
src/
├── components/       # UI Components (Navbar, Cards)
├── pages/            # Landing, Detect, Dashboard
├── services/         # aiService, historyService
├── hooks/            # useDarkMode
├── locales/          # Translation files (en.json, hi.json)
├── data/             # Static data (remedies.json)
└── types/            # TS Definitions
```

## 🏗️ How to Run

1.  **Install Dependencies**
    ```bash
    npm install --legacy-peer-deps
    ```

2.  **Start Development Server**
    ```bash
    npm start
    ```

3.  **Build for Production**
    ```bash
    npm run build
    ```

## 🔮 Future Roadmap

- **Backend Integration**: Python/FastAPI for advanced model training.
- **Geolocation**: Map pest outbreaks using GPS data.
- **Community Forum**: Connect farmers with experts.

---
**Empowering Agriculture with Technology.** 🌾
