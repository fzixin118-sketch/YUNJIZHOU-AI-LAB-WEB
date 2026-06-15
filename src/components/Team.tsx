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
      title: language === "zh" ? "本地私有化与离线部署" : "Private Local & Offline Deployment",
      subtitle: language === "zh" ? "适配内网、专网与高安全环境" : "For Intranets, Private Networks, and Secure Sites",
      icon: Lock,
      description: language === "zh"
        ? "针对不能使用公有云、不能把资料传出内网的客户，我们支持本地服务器、专网和物理隔离环境部署。数据留在客户现场，便于安全审计和内部管理。"
        : "For clients that cannot use public cloud or send data outside their network, we support local servers, private networks, and physically isolated environments.",
      tags: language === "zh"
        ? ["本地部署", "内网运行", "权限控制", "审计留痕"]
        : ["Local Deployment", "Intranet Ready", "Access Control", "Audit Logs"]
    },
    {
      title: language === "zh" ? "多种硬件与系统适配" : "Hardware and System Compatibility",
      subtitle: language === "zh" ? "兼容主流服务器、边缘设备与国产环境" : "Works With Servers, Edge Devices, and Localized Environments",
      icon: Cpu,
      description: language === "zh"
        ? "可根据客户现有设备选型部署，支持 NVIDIA、昇腾、瑞芯微、寒武纪等常见硬件，以及银河麒麟、统信和主流 Linux 环境。关键性能场景可做模型压缩与推理加速。"
        : "We adapt to the client's existing hardware where possible, including NVIDIA, Ascend, Rockchip, Cambricon, Kylin, UOS, and mainstream Linux environments.",
      tags: language === "zh"
        ? ["主流芯片适配", "边缘设备部署", "国产系统支持", "模型推理优化"]
        : ["Chipset Support", "Edge Deployment", "Localized OS Support", "Inference Tuning"]
    },
    {
      title: language === "zh" ? "内部知识检索与智能问答" : "Internal Knowledge Search & Q&A",
      subtitle: language === "zh" ? "减少翻资料时间，提高答复一致性" : "Less Manual Lookup, More Consistent Answers",
      icon: Layers,
      description: language === "zh"
        ? "适合制度文件多、政策更新快、人工翻阅慢的单位。系统可在内网中检索规章、合同、手册和专业材料，给出带来源的回答，帮助员工更快找到可靠依据。"
        : "Designed for teams with large document sets, frequent policy changes, and slow manual lookup. It searches regulations, contracts, manuals, and specialist files with source-backed answers.",
      tags: language === "zh"
        ? ["资料快速检索", "来源可追溯", "离线可运行", "减少重复咨询"]
        : ["Fast Search", "Traceable Sources", "Offline Ready", "Fewer Repeated Questions"]
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
              ? "可靠交付能力与安全适配经验" 
              : "Reliable Delivery and Secure Adaptation Experience"}
          </h2>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-350 font-normal leading-relaxed">
            {language === "zh"
              ? "我们关注的不只是模型效果，更关注系统能不能在客户现场长期稳定运行。云极洲具备从需求梳理、软件开发、硬件适配到部署维护的完整交付经验。"
              : "We care about more than model performance. Yunjizhou supports the full path from requirements and software development to hardware adaptation, deployment, and maintenance."}
          </p>
          <p className="mt-3 text-sm text-slate-605 dark:text-slate-305 font-normal leading-relaxed">
            {language === "zh" ? (
              <>
                在高安全和复杂现场项目中，我们重点保障<strong>“数据不外流、系统可接入、结果可追溯、运行可维护”</strong>，并在需要时提供 RAG、边缘推理、IBMS/PLC 接入等专项能力。
              </>
            ) : (
              <>
                For complex secure environments, we focus on <strong>"data staying local, systems integrating cleanly, results remaining traceable, and operations staying maintainable"</strong>, with RAG, edge inference, and IBMS/PLC integration where needed.
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
                    {language === "zh" ? "能力关键词" : "Key Capabilities"}
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
                      {language === "zh" ? "可按项目验收" : "Project Verifiable"}
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
                {language === "zh" ? "从试点到上线的交付支持" : "Delivery Support From Pilot to Launch"}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-normal leading-relaxed mt-1">
                {language === "zh"
                  ? "我们可提供需求调研、原型演示、现场部署、培训交接与持续维护支持，帮助客户把试点项目稳妥推进到正式使用。"
                  : "We support discovery, prototype demos, on-site deployment, handover training, and maintenance so pilots can move into real use."}
              </p>
            </div>
          </div>
          <a
            href="#assessment"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#1890ff] to-[#40a9ff] text-white font-sans text-xs font-bold tracking-wider shadow-sm hover:opacity-90 hover:shadow-md transition-all shrink-0 w-full md:w-auto text-center cursor-pointer"
          >
            {language === "zh" ? "预约方案沟通" : "Book a Solution Call"}
          </a>
        </div>

      </div>
    </section>
  );
}
