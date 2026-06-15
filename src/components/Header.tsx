/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Cpu, Menu, X, ArrowUpRight, Sun, Moon, Languages } from "lucide-react";
import { useApp } from "../context/AppContext";
import Logo from "./Logo";

export default function Header() {
  const { language, setLanguage, theme, setTheme } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { label: language === "zh" ? "首页" : "Home", href: "#home" },
    { label: language === "zh" ? "核心业务" : "Solutions", href: "#solutions" },
    { label: language === "zh" ? "样例展示" : "Sandbox", href: "#sandbox" },
    { label: language === "zh" ? "方案规划" : "Assessment", href: "#assessment" },
    { label: language === "zh" ? "能力资质" : "Qualifications", href: "#team" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-white/85 dark:bg-[#030712]/85 backdrop-blur-xl border-b border-[#00B2FE]/15 dark:border-[#00F5A0]/10 shadow-[0_8px_30px_rgba(0,178,254,0.05)]"
          : "py-5 bg-transparent"
      }`}
      id="site-header"
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center group" onClick={() => handleNavClick("#home")}>
          <Logo size="md" />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.href);
              }}
              className="font-sans text-sm font-semibold text-[#2d323c] dark:text-[#cbd5e1] hover:text-[#00B2FE] dark:hover:text-[#00F5A0] transition-colors relative group py-1.5"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00F5A0] to-[#00B2FE] transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Action Controls & Button */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === "zh" ? "en" : "zh")}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-[#00B2FE] dark:hover:text-[#00F5A0] hover:bg-slate-100 dark:hover:bg-slate-900 transition-all flex items-center gap-1 text-xs font-semibold cursor-pointer"
            title={language === "zh" ? "Switch to English" : "切换至中文"}
          >
            <Languages className="w-4 h-4" />
            <span>{language === "zh" ? "EN" : "中"}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-[#00B2FE] dark:hover:text-[#00F5A0] hover:bg-slate-100 dark:hover:bg-slate-900 transition-all cursor-pointer"
            title={theme === "dark" ? "Switch to Light Mode" : "切换至暗色模式"}
          >
            {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Call To Action */}
          <a
            href="#assessment"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#assessment");
            }}
            className="inline-flex items-center gap-1.5 px-5.5 py-2.5 rounded-full bg-gradient-to-r from-[#00F5A0] to-[#00B2FE] hover:shadow-[0_0_15px_rgba(0,245,160,0.3)] text-slate-950 dark:text-slate-950 font-sans text-xs font-bold tracking-wider transition-all hover:-translate-y-0.5 active:translate-y-0"
            id="nav-roi-btn"
          >
            {language === "zh" ? "免费方案评估" : "Free Evaluation"}
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-950" />
          </a>
        </div>

        {/* Mobile controls & Menu Toggle */}
        <div className="flex md:hidden items-center gap-2">
          {/* Mobile Language Toggle */}
          <button
            onClick={() => setLanguage(language === "zh" ? "en" : "zh")}
            className="p-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:text-[#00B2FE] dark:hover:text-[#00F5A0] flex items-center gap-0.5 text-xs font-bold"
          >
            <Languages className="w-4 h-4" />
            <span>{language === "zh" ? "EN" : "中"}</span>
          </button>

          {/* Mobile Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:text-[#00B2FE]"
          >
            {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-slate-700 dark:text-slate-300 hover:text-[#00B2FE] p-1 transition-colors"
            aria-label="Toggle Menu"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-[#030712]/95 backdrop-blur-xl border-b border-[#00B2FE]/15 dark:border-[#00F5A0]/10 shadow-xl px-6 py-4 flex flex-col gap-4"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="font-sans text-base font-semibold text-slate-700 dark:text-slate-300 hover:text-[#00B2FE] dark:hover:text-[#00F5A0] py-2 border-b border-gray-100 dark:border-white/5 last:border-0 transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#assessment"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#assessment");
              }}
              className="w-full text-center py-2.5 rounded-full bg-gradient-to-r from-[#00F5A0] to-[#00B2FE] text-slate-950 font-sans text-sm font-bold tracking-wider mt-2 shadow-md shadow-cyan-500/10"
            >
              {language === "zh" ? "免费方案评估" : "Free Evaluation"}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
