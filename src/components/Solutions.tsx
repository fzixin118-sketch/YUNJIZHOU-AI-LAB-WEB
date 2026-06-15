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
      title: language === "zh" ? "数字化 AI 转型咨询" : "Digital AI Advisory",
      desc: language === "zh"
        ? "深入企业业务细分场景，识别人工流中的自动化瓶颈，协助企业构筑切实可行的 AI 部署方案与高回报的 ROI 演进路线。"
        : "Diagnose operations workflows to pin automation bottlenecks, designing highly secure AI roadmaps with quantifiable ROI metrics.",
      colorClass: "bg-[#00F5A0]/10 dark:bg-[#00F5A0]/20 border border-[#00F5A0]/20 dark:border-[#00F5A0]/40 text-[#00E5A3]",
      hoverColor: "group-hover:border-[#00F5A0]/30 group-hover:bg-[#00F5A0]/5 dark:group-hover:border-[#00F5A0]/40"
    },
    {
      icon: Network,
      title: language === "zh" ? "智能化软硬件定制 & 系统集成" : "Hardware-Software Integration",
      desc: language === "zh"
        ? "具备强大的软硬件耦合开发底蕴；无缝接管工业 PLC、网络摄像头与既有物联网硬件总线，保障极端气温与断网下的高可用自治能力。"
        : "Coupling software with physical devices. Seamlessly interfaces with legacy PLCs, RTSP cameras, and IoT buses with fully offline fallback capability.",
      colorClass: "bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 text-[#1890ff]",
      hoverColor: "group-hover:border-[#1890ff]/30 group-hover:bg-blue-50/60 dark:group-hover:border-[#1890ff]/40"
    },
    {
      icon: Layers,
      title: language === "zh" ? "多模态 AI 算法精细化适配" : "Multimodal Algorithm Tuning",
      desc: language === "zh"
        ? "将主流开源/自研大模型（LLM）、视频密集神经网络融入日常，边缘处理计算配合智能局部推理，保障核心决策效率。"
        : "Fine-tune and compile large language models and vision CNNs onto edge-nodes, securing near-zero-latency local inference pipelines.",
      colorClass: "bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30 text-indigo-500",
      hoverColor: "group-hover:border-indigo-505/30 group-hover:bg-indigo-50/60"
    },
    {
      icon: Smartphone,
      title: language === "zh" ? "闭环管理平台与业务软件" : "Closed-Loop Software Suite",
      desc: language === "zh"
        ? "为大中型政企设计涵盖层级鉴权、抗抵赖日志、决策大屏为一体的中央集成软件体系，真正实现大模型成果与OA全链路合拢。"
        : "Design central dashboards with level authorization and audit-ready logging to close loops between AI outputs and legacy ERP/OA systems.",
      colorClass: "bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30 text-amber-500",
      hoverColor: "group-hover:border-amber-500/30 group-hover:bg-amber-50/60"
    }
  ];

  const METRICS = [
    { 
      value: "15+", 
      label: language === "zh" ? "落地服务保密单位与政法单位" : "Deployed Govt & Confidential Units", 
      unit: language === "zh" ? "个" : "Units" 
    },
    { 
      value: "99.2%", 
      label: language === "zh" ? "智能问答RAG系统精细召回率" : "Local RAG Precision Rate", 
      unit: "" 
    },
    { 
      value: "30%+", 
      label: language === "zh" ? "公安视频跟踪模型推理省电提速" : "Edge-Inference Power Saved", 
      unit: "" 
    },
    { 
      value: "28.5%", 
      label: language === "zh" ? "商业写字楼空调实测降碳降能率" : "Certified HVAC HVAC Carbon Saved", 
      unit: "" 
    }
  ];

  return (
    <section id="solutions" className="py-24 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center md:text-left max-w-3xl mb-16">
          <span className="px-3.5 py-1 rounded-full bg-[#00B2FE]/10 dark:bg-[#00F5A0]/15 text-[11px] font-mono font-bold tracking-widest text-[#00B2FE] dark:text-[#00F5A0] uppercase border border-[#00B2FE]/20 dark:border-[#00F5A0]/20">
            {language === "zh" ? "Core Expertise / 核心技术服务" : "Core Expertise / Technical Architecture"}
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
                Yunjizhou AI Synergy Blueprint
              </span>
              <h3 className="mt-4 text-2xl font-sans font-extrabold text-slate-900 dark:text-white tracking-tight">
                {language === "zh" ? "云极洲全要素数字化深度融合理念" : "Deep Multi-Factor Digital Hub"}
              </h3>
              <p className="mt-3 text-sm text-slate-550 dark:text-slate-400 font-normal leading-relaxed">
                {language === "zh"
                  ? "企业转型切忌脱节拼凑。我们将大模型、垂直感知、私有合规库和业务流程通过以下四路全闭环贯通："
                  : "We advocate against fragmented systems. Yunjizhou interlaces core elements into a closed loop:"}
              </p>
              
              <div className="mt-6 space-y-3.5">
                {[
                  {
                    title: language === "zh" ? "前沿大模型 (LLM) 赋脑" : "LLMs as Cognitive Core",
                    text: language === "zh" 
                      ? "充当认知中枢，精解码政策长文与非结构化指令。" 
                      : "Processes regulatory guidelines and decodes unstructured operational commands."
                  },
                  {
                    title: language === "zh" ? "高密度感知 model 赋眼" : "Vision Models as Eyes",
                    text: language === "zh"
                      ? "实时追踪百路RTSP画面异常，空间三维智能定位。"
                      : "Watches dozens of RTSP surveillance streams to pinpoint anomalies instantaneously."
                  },
                  {
                    title: language === "zh" ? "自研防幻觉私有数据库" : "Hallucination-Protected DBs",
                    text: language === "zh"
                      ? "重排关联文本片并拼接，避开AI造假与机密泄密。"
                      : "Ensures precise reference matching to guard enterprise security and prevent AI fabricating lies."
                  },
                  {
                    title: language === "zh" ? "既有流程和PLC智控联动" : "PLC Loop Integration",
                    text: language === "zh"
                      ? "不推倒重来，直通OA系统与末端冷源变频泵节电。"
                      : "Plugs securely into pre-existing OA software and smart physical terminal relays."
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
                  {language === "zh" ? "大模型 × 业务自控" : "Cognitive AI × Process Controls"}
                </h4>
                <p className="mt-1.5 text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
                  {language === "zh"
                    ? "让 AI 辅助公文归档、智能合同审查、核准查报、错漏初审核验，提升业务流效率超70%。"
                    : "Employs neural processing for document cataloging, intelligent compliance auditing, and contract sanitization."}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-gray-55/50 dark:bg-slate-900/30 border border-gray-100 dark:border-white/5 hover:border-[#1890ff]/30 hover:bg-white dark:hover:bg-[#060b19] hover:shadow-lg hover:shadow-blue-500/5 transition-all group duration-300">
                <div className="w-9 h-9 rounded-xl bg-blue-50/80 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 flex items-center justify-center text-[#1890ff] mb-4.5 group-hover:scale-110 transition-transform">
                  <Database className="w-5 h-5 text-[#1890ff]" />
                </div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  {language === "zh" ? "私有RAG × 知识避雷" : "Private RAG × Risk Prevention"}
                </h4>
                <p className="mt-1.5 text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
                  {language === "zh"
                    ? "自研双路合并算法配合精密密集编码和两阶段重排，严密杜绝大语言模型幻觉并拦截涉密泄漏。"
                    : "Protects sovereign compliance with multi-path embedding retrievals and two-stage rankers to shield data privacy."}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-gray-55/50 dark:bg-slate-900/30 border border-gray-100 dark:border-white/5 hover:border-indigo-500/30 hover:bg-white dark:hover:bg-[#060b19] hover:shadow-lg hover:shadow-indigo-500/5 transition-all group duration-300">
                <div className="w-9 h-9 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30 flex items-center justify-center text-indigo-500 mb-4.5 group-hover:scale-110 transition-transform">
                  <Eye className="w-5 h-5 text-indigo-550" />
                </div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  {language === "zh" ? "监控流 × 边缘轻算法" : "RTSP Feeds × Edge Inference"}
                </h4>
                <p className="mt-1.5 text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
                  {language === "zh"
                    ? "离线边缘硬件秒级解析多路局域视频流，支持极夜降噪和高密定标，极速感知突发报警无延迟。"
                    : "Low-footprint local servers process incoming RTSP camera tracks on-site, offering robust offline alerts."}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-gray-55/50 dark:bg-slate-900/30 border border-gray-100 dark:border-white/5 hover:border-amber-500/30 hover:bg-white dark:hover:bg-[#060b19] hover:shadow-lg hover:shadow-amber-500/5 transition-all group duration-300">
                <div className="w-9 h-9 rounded-xl bg-amber-50/80 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30 flex items-center justify-center text-amber-500 mb-4.5 group-hover:scale-110 transition-transform">
                  <Shield className="w-5 h-5 text-amber-550" />
                </div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  {language === "zh" ? "AI+IBMS × 立体安防联动" : "AI+IBMS × Security Linkage"}
                </h4>
                <p className="mt-1.5 text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
                  {language === "zh"
                    ? "将环境寻优降耗与公安安防体系交融织网。当视频AI判定异常，秒度反控新风风雨及隔离闸机，打通协同应急指挥。"
                    : "Marries thermodynamic HVAC saving with surveillance alert arrays. A single security breach triggers automatic elevator and barrier lock-downs."}
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
