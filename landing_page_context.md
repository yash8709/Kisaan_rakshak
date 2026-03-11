# Kisaan Rakshak - Landing Page Context

Hello Claude! You are assisting with UI/UX improvements for the **Main Home Page (Landing Page)** of the "Kisaan Rakshak" application. 

## Project Architecture & Constraints
This is a React TypeScript application using Tailwind CSS, Framer Motion for animations, and Lucide React for icons. The app features a highly complex backend integrating Firebase Authentication, Cloud Firestore, TensorFlow.js (MobileNet), and Gemini AI.

### 🔴 STRICT CONSTRAINTS (DO NOT TOUCH)
- **Routing**: Do not alter `react-router-dom` navigation paths (`/dashboard`, `/detect`, `/login`).
- **Auth State**: Do not modify `useAuth()` hooks or any logic related to `currentUser`.
- **Global Theme**: The app utilizes a dark mode toggle wrapper. Ensure all new components support `dark:bg-*` and `dark:text-*` Tailwind classes.
- **Backend Services**: Do not modify `aiService.ts`, `historyService.ts`, or any Firebase configurations. 
- **Dependencies**: Do not introduce new heavy npm packages without explicit permission. Use `framer-motion` and `lucide-react` which are already installed.

## Scope of Work (Landing Page Only)
Your task is strictly limited to enhancing the visual appeal, layout, typography, and animations of the public-facing landing page. 

The user will provide you with specific files. You are free to heavily restructure the CSS and layout within these specific files:
1. `src/pages/LandingPage.tsx` (The main wrapper which contains the Features list)
2. `src/components/landing/HeroSection.tsx`
3. `src/components/ui/FeatureCard.tsx`
4. `src/components/landing/PestDetectionMarquee.tsx`
5. `src/components/Navbar.tsx`

**Design Guidelines:**
- The brand colors lean towards deep greens (`agri-green`, `emerald-500`, `teal`).
- Maintain a highly responsive design (`md:`, `lg:` breakpoints).
- Use `framer-motion` for smooth scroll-reveal and hover micro-interactions.
- The UI should feel modern, clean, and accessible (farm-tech focus).

Please review the provided component files and give the user your proposed UI enhancements!
