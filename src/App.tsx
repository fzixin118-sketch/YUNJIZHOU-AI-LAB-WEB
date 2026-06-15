/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Header from "./components/Header";
import Hero from "./components/Hero";
import Solutions from "./components/Solutions";
import Sandbox from "./components/Sandbox";
import Assessment from "./components/Assessment";
import Team from "./components/Team";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

// Array of premium, lightweight background sparkling stars perfectly balanced vertically
const BACKDROP_STARS = [
  { top: "4%", left: "12%", size: 2, delay: "0s" },
  { top: "9%", left: "84%", size: 3, delay: "1.2s", color: "rgba(24, 144, 255, 0.85)" },
  { top: "15%", left: "45%", size: 1.5, delay: "0.6s" },
  { top: "24%", left: "21%", size: 2.5, delay: "2.1s" },
  { top: "31%", left: "78%", size: 1.5, delay: "3.4s" },
  { top: "38%", left: "14%", size: 3, delay: "1.7s", color: "rgba(0, 245, 160, 0.85)" },
  { top: "45%", left: "89%", size: 2, delay: "0.9s" },
  { top: "52%", left: "32%", size: 1.5, delay: "2.5s" },
  { top: "58%", left: "68%", size: 2.5, delay: "1.1s" },
  { top: "67%", left: "10%", size: 2, delay: "3.0s" },
  { top: "74%", left: "82%", size: 3, delay: "0.4s", color: "rgba(24, 144, 255, 0.8)" },
  { top: "81%", left: "26%", size: 1.5, delay: "2.2s" },
  { top: "88%", left: "70%", size: 2, delay: "1.5s" },
  { top: "94%", left: "38%", size: 2.5, delay: "0.8s" },
  { top: "97%", left: "85%", size: 1.5, delay: "2.7s" },
];

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#f8fafc] dark:bg-[#030712] text-slate-800 dark:text-slate-100 selection:bg-[#00B2FE]/30 dark:selection:bg-[#00F5A0]/25 selection:text-slate-900 dark:selection:text-slate-100 transition-colors duration-300 overflow-x-hidden">
      
      {/* Background Decorative Canvas Layer - Always visible above parent base color but behind content */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Transforming into majestic, moving fluid auroras matching the image's background gradient */}
        <div className="absolute top-0 left-[-15%] w-[650px] h-[650px] bg-[#00F5A0]/10 dark:bg-[#00F5A0]/6 rounded-full blur-[140px] animate-morph-glow-1" />
        <div className="absolute top-[20%] right-[-15%] w-[650px] h-[650px] bg-[#00A3FF]/12 dark:bg-[#006CBE]/8 rounded-full blur-[130px] animate-morph-glow-2" />
        <div className="absolute top-[45%] left-[-10%] w-[550px] h-[550px] bg-[#10B981]/8 dark:bg-[#10B981]/5 rounded-full blur-[120px] animate-morph-glow-3" />
        <div className="absolute top-[70%] right-[-10%] w-[600px] h-[600px] bg-[#005BAC]/10 dark:bg-[#005BAC]/6 rounded-full blur-[140px] animate-morph-glow-4" />
        <div className="absolute bottom-0 left-[-10%] w-[650px] h-[650px] bg-[#00B2FE]/10 dark:bg-[#00B2FE]/6 rounded-full blur-[130px] animate-morph-glow-1" />

        {/* Scattered Twinkling Starlight Canvas */}
        {BACKDROP_STARS.map((star, idx) => (
          <div
            key={idx}
            className="absolute rounded-full animate-starlight-twinkle"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: star.color || "var(--star-default-color)",
              animationDelay: star.delay,
              boxShadow: star.size >= 2.5 
                ? `0 0 8px ${star.color || "var(--star-default-color)"}` 
                : "none",
            }}
          />
        ))}

        {/* Absolute top grid background layer */}
        <div className="absolute inset-0 bg-grid-pattern opacity-85 dark:opacity-40" />
      </div>
      
      {/* Foreground Content Stack - Elevated on z-10 for interactivity */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Float Header Nav */}
        <Header />

        {/* Main Sections Stack */}
        <main className="grow">
          <Hero />
          <Solutions />
          <Sandbox />
          <Assessment />
          <Team />
          <Contact />
        </main>

        {/* Footer Details */}
        <Footer />
      </div>
    </div>
  );
}
