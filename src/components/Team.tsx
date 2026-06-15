/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { Award, ShieldCheck, Cpu, Layers, Lock, CheckCircle2 } from "lucide-react";
import { useApp } from "../context/AppContext";

interface CapabilityBlock {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  description: string;
  tags: string[];
}

export default function Team() {
  const { language } = useApp();

  const CAPABILITIES: CapabilityBlock[] = [
    {
      title: language === "zh" ? "特制物理隔离与涉密网合规" : "Hardened Isolation & Air-Gap Compliance",
      subtitle: language === "zh" ? "100% 局域网离线自主流部署" : "100% Air-Gapped Local Deployment",
      icon: Lock,
      description: language === "zh"
        ? "针对服务保密单位和高安全性政企，支持完全物理隔离、涉密专用局域网等离线环境部署。内置特制的数据安全沙箱与主动防御引擎，物理层面杜绝敏感信息外泄，支持无网环境的完整离线审计合规。"
        : "Engineered specifically for confidential service units needing on-premises installations. Fully supports hardware physical isolation with built-in sandbox security walls, ensuring zero diagnostic data leaks to outer public connections.",
      tags: language === "zh"
        ? ["物理脱网部署", "安全防注入", "国家保密规范评估", "局域脱敏审计"]
        : ["Air-Gap Isolated", "Zero External Hooks", "Confidential Standard Compliant", "Sovereign Air-Gap Sandbox"]
    },
    {
      title: language === "zh" ? "国内外主流硬件与异构算力全方位适配" : "Mainstream Global & Sovereign Hardware Adaptation",
      subtitle: language === "zh" ? "英伟达/昇腾异构异源编译器级重排优化" : "Optimization on Global & Local Heterogeneous Compute",
      icon: Cpu,
      description: language === "zh"
        ? "全面适配并高度兼容英伟达 NVIDIA, 昇腾 Ascend、瑞芯微 Rockchip、寒武纪 Cambricon 等国内外主流异质芯片体系，支持银河麒麟、统信及主流 Linux 操作系统。自研低时延全平台编译器，将端侧视觉与语言大模型指令优化度提升 45%。"
        : "Fully optimized and highly compatible with both global and local high-performance hardware (NVIDIA, Ascend, Rockchip, Cambricon chipsets). Low-level compiler optimization reduces memory footprints, yielding up to 45% latency gains and enabling responsive cross-platform edge inference.",
      tags: language === "zh"
        ? ["国内外主流芯片适配", "异构算力调度", "端侧编译重排", "极致算力释放"]
        : ["NVIDIA & Ascend Tuned", "Heterogeneous Scheduling", "Compiler Optimizations", "Cross-Platform Scaling"]
    },
    {
      title: language === "zh" ? "政企智能知识检索与秒级问答" : "On-Premises Intelligent Document Search & Live Q&A",
      subtitle: language === "zh" ? "告别繁琐翻查，彻底降本增效" : "Eradicate manual lookups, 10x staff productivity",
      icon: Layers,
      description: language === "zh"
        ? "专为保密单位、政企知识库设计。彻底解决‘业务资料繁杂、政策更新频繁、人工翻阅极慢、外网 AI 工具禁入’的实际痛点。系统在完全不连接外网的环境下，数秒内即可从千万字规章制度、合同方案或专业卷宗中，精准找出所需条款并提炼出答案，回答精准不胡编，工作效率直观提升 90% 以上。"
        : "Tailored for confidential units and internal knowledge centers. Resolves the critical pain points of massive, fragmented data, slow manual lookups, and strict no-cloud security policies. Operating entirely offline, it contextually crawls millions of words in regulations, manuals, or contracts within seconds to generate verified, accurate answers—instantly boosting retrieval speed by over 90%.",
      tags: language === "zh"
        ? ["海量规章秒级翻查", "100% 离线不泄密", "告别大海捞针", "回答精准不胡编"]
        : ["Instant File Crawl", "100% Safe Offline", "No More Manual Search", "Precision Factual Output"]
    }
  ];

  return (
    <section id="team" className="py-24 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center md:text-left max-w-3xl mb-16">
          <span className="text-[11px] font-mono font-extrabold tracking-widest text-[#1890ff] uppercase bg-blue-50 dark:bg-blue-950/20 px-2.5 py-1 rounded-md border border-blue-100 dark:border-blue-900/40">
            {language === "zh" ? "CAPABILITIES & QUALIFICATIONS / 能力资质" : "Capabilities & Qualifications"}
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl font-sans font-extrabold tracking-tight text-slate-900 dark:text-white">
            {language === "zh" 
              ? "自研核心能力与高合规资质体系" 
              : "Sovereign Technology Core & Compliance Qualifications"}
          </h2>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-350 font-normal leading-relaxed">
            {language === "zh"
              ? "云极洲构筑了高安全标准的自主可控软硬件一体方案，致力于将一流的技术深度融入重点保密单位与高安全性政企的转型进程中。我们专注于高要求、硬屏障的真实物理场景落地。"
              : "Yunjizhou architects high-compliance hardware-software integration schemes. We strictly transform complex constraints of specialized air-gapped environments into reliable and secure functional outcomes."}
          </p>
          <p className="mt-3 text-sm text-slate-605 dark:text-slate-305 font-normal leading-relaxed">
            {language === "zh" ? (
              <>
                在实践部署中，我们完全通过了多项安全合规度测试，支持将<strong>“完全离线私有化、全栈主流与异构硬件适配、精准防幻觉算法防护、低延迟端侧物联分析”</strong>做全生命周期的履约质量承托。
              </>
            ) : (
              <>
                Across critical systems deployment, we remain intensely committed to <strong>"air-gapped integrity, native heterogeneous compute adaptions, zero-leak sandboxing, and ultra-high recall RAG filters"</strong> with lifetime update guarantees.
              </>
            )}
          </p>
        </div>

        {/* Capabilities Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {CAPABILITIES.map((cap, index) => {
            const IconComponent = cap.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-[#111317] border border-gray-150 dark:border-white/5 rounded-3xl p-6.5 flex flex-col justify-between hover:border-[#1890ff]/30 hover:shadow-xl hover:shadow-[#1890ff]/5 transition-all duration-300 relative overflow-hidden group"
              >
                {/* Decorative border accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#1890ff] to-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                <div>
                  {/* Icon & Title Block */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#1890ff] to-cyan-500 flex items-center justify-center text-white shadow-md shrink-0">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-sans font-extrabold text-slate-900 dark:text-white text-sm tracking-tight">{cap.title}</h3>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono block mt-0.5">{cap.subtitle}</span>
                    </div>
                  </div>

                  {/* Description Paragraph */}
                  <p className="text-xs text-slate-500 dark:text-slate-405 font-normal leading-relaxed mb-6 font-sans">
                    {cap.description}
                  </p>
                </div>

                {/* Tags tag cloud */}
                <div>
                  <span className="block text-[9px] font-mono font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2.5">
                    {language === "zh" ? "核心标准资质指标 (Key Specifications)" : "Key Specifications"}
                  </span>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {cap.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded text-[10px] bg-slate-50 dark:bg-slate-900 border border-gray-200 dark:border-white/5 text-slate-600 dark:text-slate-400 font-medium font-sans"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Secure assurance footer element inside card */}
                  <div className="flex items-center gap-2 justify-end border-t border-gray-150 dark:border-white/5 pt-4 mt-4">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">
                      {language === "zh" ? "通过高等级评测" : "Audit Verified"}
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Commitment Statement */}
        <div className="mt-16 p-6.5 rounded-3xl border border-gray-150 dark:border-white/5 bg-slate-50 dark:bg-slate-900/10 text-center max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6 justify-between shadow-sm">
          <div className="flex gap-4 items-center text-left">
            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-950/20 text-[#1890ff] border border-blue-100 dark:border-blue-900/40 flex items-center justify-center shrink-0 animate-pulse">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-sans font-bold text-slate-900 dark:text-white text-sm">
                {language === "zh" ? "自研系统交付与整体履约质量承托" : "Yunjizhou Security Delivery & Integration SLA"}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-normal leading-relaxed mt-1">
                {language === "zh"
                  ? "我们承诺，由云极洲自主研发交付的所有算法版本、异构计算硬件，均满足业内极高安全评级。提供 24 个月物理伴随式升级与离线部署维护服务。"
                  : "We formally commit that all firmware drivers, air-gapped pipelines, and custom heteregenous clusters deployed by Yunjizhou benefit from 24 months of on-premises SLA support."}
              </p>
            </div>
          </div>
          <a
            href="#assessment"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#1890ff] to-[#40a9ff] text-white font-sans text-xs font-bold tracking-wider shadow-sm hover:opacity-90 hover:shadow-md transition-all shrink-0 w-full md:w-auto text-center cursor-pointer"
          >
            {language === "zh" ? "与系统规划专家会谈" : "Consult System Architects"}
          </a>
        </div>

      </div>
    </section>
  );
}
