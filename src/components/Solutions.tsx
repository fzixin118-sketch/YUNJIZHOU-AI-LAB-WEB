/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Layers, Lightbulb, Smartphone, Network, ArrowRight, Workflow, Database, Eye, LineChart, Shield } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Solutions() {
  const { language } = useApp();

  const CORE_CAPABILITIES = [
    {
      icon: Lightbulb,
      title: language === "zh" ? "AI 场景梳理与落地规划" : "AI Opportunity Planning",
      desc: language === "zh"
        ? "先和业务团队一起找到最费时、最容易出错、最值得自动化的环节，再给出可分阶段实施的 AI 改造路线与投入产出测算。"
        : "Identify where work is slow, repetitive, or error-prone, then shape a phased AI roadmap with clear cost and benefit estimates.",
      colorClass: "bg-[#00F5A0]/10 dark:bg-[#00F5A0]/20 border border-[#00F5A0]/20 dark:border-[#00F5A0]/40 text-[#00E5A3]",
      hoverColor: "group-hover:border-[#00F5A0]/30 group-hover:bg-[#00F5A0]/5 dark:group-hover:border-[#00F5A0]/40"
    },
    {
      icon: Network,
      title: language === "zh" ? "软硬件定制与系统打通" : "Software-Hardware Integration",
      desc: language === "zh"
        ? "尽量复用客户已有摄像头、门禁、PLC、楼控和业务系统，减少推倒重来的成本，让新 AI 能力真正接入日常工作。"
        : "Reuse existing cameras, access controls, PLCs, building systems, and business tools wherever possible, lowering rebuild cost.",
      colorClass: "bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 text-[#1890ff]",
      hoverColor: "group-hover:border-[#1890ff]/30 group-hover:bg-blue-50/60 dark:group-hover:border-[#1890ff]/40"
    },
    {
      icon: Layers,
      title: language === "zh" ? "专用 AI 模型适配" : "Custom AI Model Adaptation",
      desc: language === "zh"
        ? "根据客户资料、现场视频和业务规则做针对性适配。必要时使用 LLM、视觉模型和边缘推理，让系统更懂本单位的实际场景。"
        : "Adapt LLMs, vision models, and edge inference to each client's documents, video feeds, and operating rules.",
      colorClass: "bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30 text-indigo-500",
      hoverColor: "group-hover:border-indigo-505/30 group-hover:bg-indigo-50/60"
    },
    {
      icon: Smartphone,
      title: language === "zh" ? "管理平台与工作台开发" : "Operational Software Suite",
      desc: language === "zh"
        ? "把智能问答、告警、审批、看板和日志集中到一个清晰的工作台，让一线人员、管理人员和技术人员都能顺手使用。"
        : "Bring Q&A, alerts, approvals, dashboards, and logs into a clear workspace for operators, managers, and IT teams.",
      colorClass: "bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30 text-amber-500",
      hoverColor: "group-hover:border-amber-500/30 group-hover:bg-amber-50/60"
    }
  ];

  const METRICS = [
    { 
      value: "15+", 
      label: language === "zh" ? "已服务政企与高安全客户场景" : "Public-Sector & Secure Client Scenarios", 
      unit: language === "zh" ? "个" : "Units" 
    },
    { 
      value: "99.2%", 
      label: language === "zh" ? "知识问答来源匹配准确率" : "Knowledge Source Matching Accuracy", 
      unit: "" 
    },
    { 
      value: "30%+", 
      label: language === "zh" ? "视频巡检边缘部署综合优化" : "Edge Video Deployment Efficiency Gain", 
      unit: "" 
    },
    { 
      value: "28.5%", 
      label: language === "zh" ? "楼宇空调能耗优化参考值" : "Building HVAC Energy Reduction Reference", 
      unit: "" 
    }
  ];

  return (
    <section id="solutions" className="py-24 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center md:text-left max-w-3xl mb-16">
          <span className="px-3.5 py-1 rounded-full bg-[#00B2FE]/10 dark:bg-[#00F5A0]/15 text-[11px] font-mono font-bold tracking-widest text-[#00B2FE] dark:text-[#00F5A0] uppercase border border-[#00B2FE]/20 dark:border-[#00F5A0]/20">
            {language === "zh" ? "Core Services / 核心服务" : "Core Services"}
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl font-sans font-extrabold tracking-tight text-slate-900 dark:text-white">
            {language === "zh" 
              ? "让智能化深入真实场景，扎实提升生产力" 
              : "Rooting Intelligence in Operative Scenarios for Solid Productivity Outlets"}
          </h2>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
            {language === "zh"
              ? "云极洲自研大模型系统不主张“泛泛对话”，我们相信 AI 必须结合工况场景。我们深耕软件工程与硬件连接，将大模型、视频感知、私有数据库串联成直观高效的生产引擎。"
              : "Yunjizhou eschews 'generic chat UI'. We believe active intelligence must couple with physical workloads, engineering custom software stacks connecting LLMs, real-time cameras, and local databases to secure physical outcomes."}
          </p>
        </div>

        {/* Fusion core big bento center card - High vitality style */}
        <div className="p-8 sm:p-10 rounded-[2rem] bg-white dark:bg-[#060b19]/85 backdrop-blur-md border border-gray-150/90 dark:border-cyan-500/15 shadow-[0_15px_45px_rgba(0,178,254,0.035)] mb-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#00B2FE]/5 dark:bg-[#00B2FE]/2 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#00F5A0]/5 dark:bg-[#00F5A0]/2 rounded-full blur-3xl -z-10" />
          
          <div className="lg:grid lg:grid-cols-5 gap-10 items-center">
            
            <div className="lg:col-span-2 mb-8 lg:mb-0">
              <span className="px-3.5 py-1 rounded bg-[#00F5A0]/10 text-[10px] font-mono tracking-wider text-[#00E5A3] font-bold uppercase border border-[#00F5A0]/20">
                Yunjizhou Practical AI Blueprint
              </span>
              <h3 className="mt-4 text-2xl font-sans font-extrabold text-slate-900 dark:text-white tracking-tight">
                {language === "zh" ? "一套系统，连接资料、现场与流程" : "One System Connecting Knowledge, Sites, and Workflows"}
              </h3>
              <p className="mt-3 text-sm text-slate-550 dark:text-slate-400 font-normal leading-relaxed">
                {language === "zh"
                  ? "很多项目失败不是因为技术不够新，而是系统彼此孤立。云极洲会把关键能力按业务路径串起来："
                  : "Many projects fail because tools stay isolated. Yunjizhou connects the key capabilities along real workflows:"}
              </p>
              
              <div className="mt-6 space-y-3.5">
                {[
                  {
                    title: language === "zh" ? "大模型理解资料与指令" : "LLMs Understand Knowledge and Requests",
                    text: language === "zh" 
                      ? "帮助员工快速理解制度、合同、报告和非结构化文本。" 
                      : "Help teams understand policies, contracts, reports, and unstructured text."
                  },
                  {
                    title: language === "zh" ? "视觉模型看懂现场变化" : "Vision Models Read Site Changes",
                    text: language === "zh"
                      ? "识别摄像头画面中的异常行为、区域越界和人流变化。"
                      : "Detect abnormal behavior, boundary crossing, and crowd changes in camera feeds."
                  },
                  {
                    title: language === "zh" ? "私有知识库让答案有出处" : "Private Knowledge Base Keeps Answers Grounded",
                    text: language === "zh"
                      ? "通过 RAG 和来源匹配，让回答尽量基于客户自己的可信资料。"
                      : "Use RAG and source matching so answers stay grounded in trusted client materials."
                  },
                  {
                    title: language === "zh" ? "接入现有流程与设备" : "Connect Existing Workflows and Devices",
                    text: language === "zh"
                      ? "对接 OA、门禁、楼控、PLC 等系统，尽量少改造、多复用。"
                      : "Connect OA, access control, IBMS, PLCs, and other existing systems with minimal rebuild."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-start text-xs font-normal text-slate-650 dark:text-slate-300">
                    <div className="w-5 h-5 rounded-full bg-[#00F5A0]/15 text-[#00E5A3] flex items-center justify-center font-bold font-mono shrink-0 text-[10px]">
                      {idx + 1}
                    </div>
                    <span>
                      <strong className="text-slate-800 dark:text-slate-100 font-semibold">{item.title}</strong> - {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Grid representing fusion with high-vitality hover */}
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-gray-55/50 dark:bg-slate-900/30 border border-gray-100 dark:border-[#00F5A0]/10 hover:border-[#00F5A0]/50 hover:bg-white dark:hover:bg-[#060b19] hover:shadow-lg hover:shadow-cyan-500/5 transition-all group duration-300">
                <div className="w-9 h-9 rounded-xl bg-[#00F5A0]/10 dark:bg-[#00F5A0]/20 border border-[#00F5A0]/20 dark:border-[#00F5A0]/40 flex items-center justify-center text-[#00E5A3] mb-4.5 group-hover:scale-110 transition-transform">
                  <Workflow className="w-5 h-5 text-[#00E5A3]" />
                </div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  {language === "zh" ? "大模型 × 日常办公" : "LLM × Daily Operations"}
                </h4>
                <p className="mt-1.5 text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
                  {language === "zh"
                    ? "用于公文归档、制度查询、合同初审、报表核对等高频工作，让员工少做重复查找。"
                    : "Support document filing, policy lookup, contract pre-checks, and report verification."}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-gray-55/50 dark:bg-slate-900/30 border border-gray-100 dark:border-white/5 hover:border-[#1890ff]/30 hover:bg-white dark:hover:bg-[#060b19] hover:shadow-lg hover:shadow-blue-500/5 transition-all group duration-300">
                <div className="w-9 h-9 rounded-xl bg-blue-50/80 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 flex items-center justify-center text-[#1890ff] mb-4.5 group-hover:scale-110 transition-transform">
                  <Database className="w-5 h-5 text-[#1890ff]" />
                </div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  {language === "zh" ? "私有 RAG × 答案溯源" : "Private RAG × Source Traceability"}
                </h4>
                <p className="mt-1.5 text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
                  {language === "zh"
                    ? "回答展示参考来源，关键场景可加入向量检索、关键词检索和重排模型，提高准确性与可审计性。"
                    : "Show answer sources and use vector search, keyword search, and reranking where accuracy matters."}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-gray-55/50 dark:bg-slate-900/30 border border-gray-100 dark:border-white/5 hover:border-indigo-500/30 hover:bg-white dark:hover:bg-[#060b19] hover:shadow-lg hover:shadow-indigo-500/5 transition-all group duration-300">
                <div className="w-9 h-9 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30 flex items-center justify-center text-indigo-500 mb-4.5 group-hover:scale-110 transition-transform">
                  <Eye className="w-5 h-5 text-indigo-550" />
                </div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  {language === "zh" ? "视频流 × 边缘分析" : "Video Feeds × Edge Inference"}
                </h4>
                <p className="mt-1.5 text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
                  {language === "zh"
                    ? "在本地服务器或边缘盒子上处理 RTSP 视频，减少上云带宽压力，也便于敏感场景使用。"
                    : "Process RTSP streams on local servers or edge boxes, reducing cloud bandwidth and supporting sensitive sites."}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-gray-55/50 dark:bg-slate-900/30 border border-gray-100 dark:border-white/5 hover:border-amber-500/30 hover:bg-white dark:hover:bg-[#060b19] hover:shadow-lg hover:shadow-amber-500/5 transition-all group duration-300">
                <div className="w-9 h-9 rounded-xl bg-amber-50/80 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30 flex items-center justify-center text-amber-500 mb-4.5 group-hover:scale-110 transition-transform">
                  <Shield className="w-5 h-5 text-amber-550" />
                </div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  {language === "zh" ? "AI+IBMS × 楼宇联动" : "AI+IBMS × Building Linkage"}
                </h4>
                <p className="mt-1.5 text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
                  {language === "zh"
                    ? "把空调节能、门禁、电梯、广播和安防告警放到同一套联动逻辑里，便于统一管理。"
                    : "Connect HVAC savings, access control, elevators, broadcasts, and security alerts into one operating logic."}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Core Capabilities Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CORE_CAPABILITIES.map((cap, index) => {
            const Icon = cap.icon;
            return (
              <div
                key={index}
                className="p-7 rounded-[1.5rem] bg-white dark:bg-[#060b19]/80 backdrop-blur-md border border-gray-100 dark:border-cyan-500/10 hover:border-[#00F5A0]/50 hover:shadow-[0_15px_30px_rgba(0,245,160,0.06)] transition-all duration-300 group cursor-pointer hover:-translate-y-1 text-left flex flex-col"
              >
                <div>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-105 ${cap.colorClass}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-sans font-extrabold text-slate-950 dark:text-white text-base tracking-wide">
                    {cap.title}
                  </h3>
                  <p className="mt-3 text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                    {cap.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Metrics Bar with colorful highlights */}
        <div className="mt-20 pt-16 border-t border-gray-200/80 dark:border-white/10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {METRICS.map((metric, index) => (
              <div key={index} className="flex flex-col text-center lg:text-left">
                <span className="text-3xl sm:text-4.5xl font-mono font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00F5A0] to-[#00B2FE] tracking-tight">
                  {metric.value}
                </span>
                <span className="mt-2.5 text-xs text-slate-500 dark:text-slate-450 font-semibold tracking-wide">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
