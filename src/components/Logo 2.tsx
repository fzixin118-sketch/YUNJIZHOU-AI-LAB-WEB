/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  showSubtitle?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function Logo({
  className = "",
  iconOnly = false,
  showSubtitle = true,
  size = "md",
}: LogoProps) {
  // Dimensions based on size preset
  const dims = {
    sm: { icon: "w-8 h-8", text: "text-sm sm:text-base", sub: "text-[8px]" },
    md: { icon: "w-9 h-9 sm:w-10 sm:h-10", text: "text-base sm:text-lg", sub: "text-[9px]" },
    lg: { icon: "w-14 h-14", text: "text-2xl", sub: "text-xs" },
    xl: { icon: "w-24 h-24", text: "text-4xl", sub: "text-sm" },
  }[size];

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Cloud Icon (Emblem) */}
      <div className={`relative ${dims.icon} transition-all duration-300 group-hover:scale-105 group-hover:rotate-3 shrink-0`}>
        <svg
          viewBox="0 0 40 40"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Defs for precise brand gradients */}
          <defs>
            <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00F5A0" />
              <stop offset="60%" stopColor="#00D2FF" />
              <stop offset="100%" stopColor="#00B2FE" />
            </linearGradient>
            <linearGradient id="logoGradSubtle" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00B2FE" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#00F5A0" stopOpacity="0.05" />
            </linearGradient>
            <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="1.5" stdDeviation="2" floodColor="#00F5A0" floodOpacity="0.3" />
            </filter>
          </defs>

          {/* Symmetrical Tech-grid Ring */}
          <circle 
            cx="20" 
            cy="20" 
            r="17" 
            stroke="url(#logoGradSubtle)" 
            strokeWidth="1.2" 
            strokeDasharray="2 3" 
            className="opacity-70 dark:opacity-50"
          />
          
          {/* Main Beautiful Geometric Tech Cloud Loop */}
          <path
            d="M 12 26 
               C 8.5 26 6 23.5 6 20 
               C 6 16.5 8.5 14 12 14 
               C 12.3 14 12.7 14.1 13 14.2
               C 14.3 9.8 18.2 7 22.5 8
               C 26.8 9 29.5 12.8 30 16.8
               C 32.5 16.8 34 18.5 34 21
               C 34 23.5 32 25.5 29.5 26
               H 12"
            stroke="url(#logoGrad)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#logoGlow)"
          />

          {/* Central stylized 'Z' (signifying Yunjizhou's core) */}
          <path
            d="M 16.5 17.5 H 24.5 L 17 24 H 25"
            stroke="url(#logoGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Core Pulsing Tech Node */}
          <circle cx="21" cy="20.5" r="1.2" fill="#FFFFFF" />
        </svg>
      </div>

      {/* Brand Text labels */}
      {!iconOnly && (
        <div className="flex flex-col select-none justify-center">
          {/* Main Title "云极洲科技" with clean high contrast & elegant weight */}
          <span
            className={`font-sans font-extrabold tracking-wide text-slate-800 dark:text-white leading-none transition-colors duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#00F5A0] group-hover:to-[#00B2FE] ${dims.text}`}
          >
            云极洲
            <span className="font-medium text-slate-550 dark:text-slate-350 bg-clip-text group-hover:bg-none group-hover:text-slate-900 group-hover:dark:text-white">科技</span>
          </span>
          {/* Subtitle "YUN JI ZHOU TECHNOLOGY" with high precision monospace tracker */}
          {showSubtitle && (
            <span
              className={`font-mono text-slate-400 dark:text-slate-500 tracking-widest font-bold uppercase mt-1 leading-none ${dims.sub}`}
            >
              YUNJIZHOU AI LAB
            </span>
          )}
        </div>
      )}
    </div>
  );
}
