/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from "react";
import { motion } from "motion/react";
import { ArrowRight, Bot, Shield, Building, Search, Sparkles } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Hero() {
  const { language } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchStatus, setSearchStatus] = useState<string | null>(null);

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const feedback = language === "zh" 
      ? `正在为您检索“${searchQuery}”相关的核心工作流模块...`
      : `Searching for core modules related to "${searchQuery}"...`;

    setSearchStatus(feedback);
    setTimeout(() => {
      setSearchStatus(null);
      scrollToSection("#sandbox");
    }, 900);
  };

  const handleTagClick = (tag: string) => {
    setSearchQuery(tag);
    const feedback = language === "zh"
      ? `已选择“${tag}”，正在为您导向智能演示沙箱...`
      : `Selected "${tag}", redirecting you to the live sandbox...`;

    setSearchStatus(feedback);
    setTimeout(() => {
      setSearchStatus(null);
      scrollToSection("#sandbox");
    }, 800);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen pt-36 pb-24 flex items-center justify-center bg-transparent overflow-hidden bg-grid-pattern"
    >
      <div className="max-w-7xl mx-auto px-6 w-full text-center relative z-10 flex flex-col items-center">
        {/* Top Tag - Elegant theme brand badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#00B2FE]/8 dark:bg-[#00F5A0]/10 border border-[#00B2FE]/15 dark:border-[#00F5A0]/15 text-[#00B2FE] dark:text-[#00F5A0] font-semibold text-xs tracking-wider mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#00F5A0] animate-ping" />
          <span className="text-xs font-mono tracking-wider">
            {language === "zh" 
              ? "YUNJIZHOU AI • 携手保密单位与政产园的智能化转型设计器"
              : "YUNJIZHOU AI • Custom Transformation Designer for Confidential Units & Parks"}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6.5xl font-sans font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4.5xl leading-[1.12]"
        >
          {language === "zh" ? (
            <>
              融合前沿大模型与多维视觉
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F5A0] via-[#00B2FE] to-[#3B82F6]">
                打造有活力的企业定制化 AI 引擎
              </span>
            </>
          ) : (
            <>
              Integrating Frontier LLMs & Multimodal Vision
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F5A0] via-[#00B2FE] to-[#3B82F6]">
                To Forge Active Custom Enterprise AI Engines
              </span>
            </>
          )}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed font-normal text-balance"
        >
          {language === "zh" ? (
            <>
              云极洲致力于将先进大模型与多维视觉深植于真实产业场景。
              <br className="hidden sm:block" />
              为您提供集私有知识库、智能视频分析与 AI+IBMS 智能楼宇控制安防联动指挥于一体的数智方案。
            </>
          ) : (
            <>
              Yunjizhou focuses on deeply rooting bleeding-edge algorithms into onsite operations.
              <br className="hidden sm:block" />
              Co-engineered by leading research scientists and veteran integration experts for real results.
            </>
          )}
        </motion.p>

        {/* Dynamic Iconfont Style Portal Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="w-full max-w-2xl mt-10"
        >
          <form
            onSubmit={handleSearchSubmit}
            className="relative flex items-center p-1 bg-white/90 dark:bg-[#060b19]/95 backdrop-blur-md rounded-full border border-gray-200/90 dark:border-cyan-500/25 shadow-[0_15px_35px_rgba(0,178,254,0.06)] focus-within:border-[#00B2FE]/50 focus-within:shadow-[0_0_25px_rgba(0,245,160,0.25)] transition-all duration-300"
          >
            <div className="pl-5 text-gray-400 shrink-0">
              <Search className="w-5.5 h-5.5 text-gray-450 dark:text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === "zh" ? "搜索感兴趣的板块：自研RAG、视频AI、IBMS安防联动..." : "Search: Custom RAG, Vision AI, IBMS Dispatch..."}
              className="w-full pl-3 pr-4 py-3.5 bg-transparent border-0 outline-none text-slate-800 dark:text-slate-100 text-sm font-sans placeholder:text-gray-400/85"
            />
            <button
              type="submit"
              className="px-6 sm:px-8 py-3 bg-gradient-to-r from-[#00F5A0] to-[#00B2FE] text-slate-950 font-sans text-xs font-extrabold rounded-full tracking-wide transition-all shadow-md shadow-cyan-500/10 cursor-pointer hover:scale-103 hover:shadow-[0_0_15px_rgba(0,245,160,0.4)] active:scale-97 shrink-0 flex items-center gap-1.5"
            >
              <span>{language === "zh" ? "立即定制建议" : "Get Instant Advice"}</span>
              <Sparkles className="w-3.5 h-3.5 text-slate-950" />
            </button>
          </form>

          {/* Search suggestions / chips with high-vitality hover */}
          <div className="mt-4 flex flex-wrap justify-center items-center gap-2 text-xs text-gray-500">
            <span className="font-semibold text-gray-400 dark:text-gray-500">
              {language === "zh" ? "热门板块探索:" : "Popular Tags:"}
            </span>
            {[
              {
                text: language === "zh" ? "自研RAG系统" : "Custom RAG System",
                color: "hover:bg-[#00F5A0]/8 hover:text-[#00F5A0] hover:border-[#00F5A0]"
              },
              {
                text: language === "zh" ? "智能视频分析" : "Intelligent Vision",
                color: "hover:bg-[#00B2FE]/8 hover:text-[#00B2FE] hover:border-[#00B2FE]"
              },
              {
                text: language === "zh" ? "AI+IBMS安防联动" : "AI+IBMS Security Linkage",
                color: "hover:bg-[#10B981]/8 hover:text-[#10B981] hover:border-[#10B981]"
              },
              {
                text: language === "zh" ? "大模型本地部署" : "Local Deployment",
                color: "hover:bg-purple-500/8 hover:text-purple-400 hover:border-purple-400"
              }
            ].map((tag, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleTagClick(tag.text)}
                className={`px-3 py-1 bg-white dark:bg-[#060b19] border border-gray-200/80 dark:border-white/10 rounded-full text-[11px] font-sans text-gray-650 dark:text-slate-300 transition-all cursor-pointer hover:-translate-y-0.5 shadow-sm active:translate-y-0 ${tag.color}`}
              >
                {tag.text}
              </button>
            ))}
          </div>

          {/* Feedback log message */}
          {searchStatus && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 text-xs font-mono font-medium text-[#00B2FE] dark:text-[#00F5A0]"
            >
              {searchStatus}
            </motion.p>
          )}
        </motion.div>

        {/* Deployed Field Icons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-20 w-full max-w-5xl"
        >
          <div className="text-center mb-8">
            <span className="px-3.5 py-1 rounded bg-gray-100/90 dark:bg-slate-900 text-[10px] font-mono text-gray-550 dark:text-slate-400 font-bold uppercase tracking-widest border border-gray-200/50 dark:border-white/5">
              {language === "zh" 
                ? "三大核心落地业务生态 • 场景实打" 
                : "3 Core Production Ecosystems • Deployment Field-Tested"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Field 1 */}
            <div
              onClick={() => scrollToSection("#sandbox")}
              className="p-7.5 rounded-3xl bg-white dark:bg-[#060b19]/80 backdrop-blur-md border border-gray-100 dark:border-cyan-500/10 hover:border-[#00F5A0]/50 dark:hover:border-[#00F5A0]/60 hover:shadow-[0_20px_45px_rgba(0,245,160,0.08)] hover:-translate-y-2 transition-all duration-300 shadow-md group cursor-pointer text-left flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#00F5A0]/10 dark:bg-[#00F5A0]/20 text-[#00F5A0] border border-[#00F5A0]/20 dark:border-[#00F5A0]/40 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                  <Bot className="w-6 h-6 text-[#00E5A3]" />
                </div>
                <h3 className="font-sans font-bold text-slate-800 dark:text-white text-base tracking-wide flex items-center justify-between">
                  <span>{language === "zh" ? "保密单位落地 • 自研RAG" : "Confidential Unit • Custom RAG"}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gray-300 dark:text-slate-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </h3>
                <p className="mt-3 text-xs text-gray-500 dark:text-slate-400 leading-relaxed font-normal">
                  {language === "zh"
                    ? "针对大型保密单位、军民融合非结构化知识、私有合规业务手册做深度安全训练理解，置信匹配度达99.2%，完全支持高度脱网和物理隔离部署。"
                    : "Deeply trained on unstructured knowledge bases & safety leaflets for confidential service units. Achieves 99.2% accuracy fully offline under physical isolation."}
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-gray-50 dark:border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400">
                  {language === "zh" ? "DEPLOYED: 集团审计科" : "DEPLOYED: Corp Audit Dept"}
                </span>
                <span className="text-[10px] font-sans font-bold text-[#00E5A3] bg-[#00F5A0]/10 dark:bg-[#00F5A0]/20 px-2 py-0.5 rounded">
                  {language === "zh" ? "免幻觉质检" : "Hallucination Free"}
                </span>
              </div>
            </div>

            {/* Field 2 */}
            <div
              onClick={() => scrollToSection("#sandbox")}
              className="p-7.5 rounded-3xl bg-white dark:bg-[#111317] border border-gray-100 dark:border-white/5 hover:border-[#1890ff]/30 dark:hover:border-[#1890ff]/40 hover:shadow-[0_20px_45px_rgba(24,144,255,0.06)] hover:-translate-y-2 transition-all duration-300 shadow-md group cursor-pointer text-left flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/20 text-[#1890ff] border border-blue-100/55 dark:border-blue-900/40 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:-rotate-3 transition-transform">
                  <Shield className="w-6 h-6 text-[#1890ff]" />
                </div>
                <h3 className="font-sans font-bold text-slate-800 dark:text-white text-base tracking-wide flex items-center justify-between">
                  <span>{language === "zh" ? "公安实战 • 智能视频分析" : "Police Operations • Vision AI"}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gray-300 dark:text-slate-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </h3>
                <p className="mt-3 text-xs text-gray-500 dark:text-slate-400 leading-relaxed font-normal">
                  {language === "zh"
                    ? "搭载边缘轻量实时视觉感知模型，支持跨区域多源RTSP，高精度抓铺异常行为及多警协同反应。"
                    : "Lightweight edge inference engines processing multi-source RTSP over borders. Real-time anomalous behavior detection & dispatching."}
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-gray-50 dark:border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400">
                  {language === "zh" ? "DEPLOYED: 三重治安岗" : "DEPLOYED: Station Security"}
                </span>
                <span className="text-[10px] font-sans font-bold text-[#1890ff] bg-blue-50/50 dark:bg-blue-950/40 px-2 py-0.5 rounded">
                  {language === "zh" ? "毫秒级反应" : "Sub-second Alert"}
                </span>
              </div>
            </div>

            {/* Field 3 */}
            <div
              onClick={() => scrollToSection("#sandbox")}
              className="p-7.5 rounded-3xl bg-white dark:bg-[#111317] border border-gray-100 dark:border-white/5 hover:border-amber-500/30 dark:hover:border-amber-500/40 hover:shadow-[0_20px_45px_rgba(245,158,11,0.06)] hover:-translate-y-2 transition-all duration-300 shadow-md group cursor-pointer text-left flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/20 text-amber-500 border border-amber-100/55 dark:border-amber-900/40 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                  <Building className="w-6 h-6 text-amber-500" />
                </div>
                <h3 className="font-sans font-bold text-slate-800 dark:text-white text-base tracking-wide flex items-center justify-between">
                  <span>{language === "zh" ? "商业园区 • AI+IBMS能效安防联动" : "Campus • AI+IBMS & Security Linkage"}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gray-300 dark:text-slate-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </h3>
                <p className="mt-3 text-xs text-gray-500 dark:text-slate-400 leading-relaxed font-normal">
                  {language === "zh"
                    ? "能效自调节算法无缝耦合多维安防体系。任一传感器、高清热成像和周界围网触警时，物理层卷帘瞬间下锁封阻，调引应急逃生牌并实时指挥安保终端。"
                    : "Thermodynamic HVAC optimization coupled with smart video analytics. Triggers automatic building overrides (ventilation shutdown, automatic turnstile lockdowns, and dynamic route dispatch) upon detecting security threats."}
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-gray-50 dark:border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400">
                  {language === "zh" ? "DEPLOYED: 综合智慧调度厅" : "DEPLOYED: Unified Command Center"}
                </span>
                <span className="text-[10px] font-sans font-bold text-amber-600 bg-amber-50/50 dark:bg-amber-950/40 px-2 py-0.5 rounded">
                  {language === "zh" ? "立体安防闭环" : "Security & Energy Dispatch"}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
