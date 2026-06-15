/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "zh" | "en";
export type Theme = "light" | "dark";

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem("app_lang");
      return stored === "en" ? "en" : "zh";
    } catch {
      return "zh";
    }
  });

  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const stored = localStorage.getItem("app_theme");
      if (stored === "dark" || stored === "light") return stored;
      return "dark";
    } catch {
      return "dark";
    }
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("app_lang", lang);
    } catch (e) {
      console.warn("localStorage not available", e);
    }
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem("app_theme", newTheme);
    } catch (e) {
      console.warn("localStorage not available", e);
    }
  };

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return (
    <AppContext.Provider value={{ language, setLanguage, theme, setTheme }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
