/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  BarChart3, Brain, Clipboard, ChevronRight, Download, 
  Printer, Sparkles, Building, Activity, Shield, Users, CheckCircle, X
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { ROIProposalResult } from "../types";

/// Deterministic McKinsey-style blueprint database
const BLUEPRINTS_ZH: Record<string, ROIProposalResult> = {
  "state-owned-docs": {
    title: "服务保密单位与高安全性规章语义 RAG 与知识闭环方案 (Confidential Unit Private Document Multi-Source Semantic Hybrid RAG Solutions)",
    overview: "针对大型高合规、涉密或安全性要求高的服务保密单位多源孤立文档及规章审计复杂的诉求，云极洲提供自研双路融合（Dense-Sparse Hybrid Retrieval）机密级 RAG 解决方案，支持完全物理隔离、涉密专用局域网等私有本地高安全部署。 (Engineered specifically for confidential units dealing with isolated repositories and intricate classification parameters. Offers fully offline high-security air-gapped sovereign cloud deployment.)",
    estimatedSaving: "38.5 万 / 年 (Est. ¥385k/Yr Saved)",
    productivityGain: "平均提效 72.0% (Avg. Speed +72.0%)",
    modules: [
      { name: "双路轻量密排向量索引 (Hybrid RAG Embedding)", desc: "自研高威密向量编码器，兼容离线国资私有链，支持高精度安全文档分割。 (Sovereign dense vectors, compatible with offline servers, guaranteeing optimal chunking resolution.)", iconName: "Database" },
      { name: "两阶段重排过滤器 (Yunjizhou Reranking Pipeline)", desc: "精确拦截 AI 长文本虚幻，引入关联重排序模型，符合 100% 可信披露机制。 (Hallucination filtration using custom relevance scorers, matching traceable auditing disclosure laws.)", iconName: "Workflow" },
      { name: "定制 OA 流程关联执行环 (Audit Workflow integrations)", desc: "与原有钉钉/泛微 OA 无缝交班，自动比对发票、合同文本并进入申报流。 (Interfaces seamlessly with legacy GEE/Weaver OA systems to automate verify pipelines.)", iconName: "CheckCircle" }
    ],
    timeline: [
      { phase: "第 1 阶段 / Phase 1", title: "语料规整与模型本地部署 (Corpus Ingestion & Local HW Setup)", duration: "1 - 2 个月 (Months)", details: "全面脱敏历史审计、合规手册与法规文件，梳理业务数据库并构建隔离物理专属向量存储中心。 (Anonymize auditing records, compliance templates, building secure custom vectors offline.)" },
      { phase: "第 2 阶段 / Phase 2", title: "知识双路重排算法对齐 (Hybrid Reranking Model Alignment)", duration: "3 - 4 个月 (Months)", details: "搭建高精向量索引与重排大模型链路，注入行业语义微调参数进行全幻觉安全对准测试。 (Calibrate local LLM responses with a custom Reranker for hallucination-free outputs.)" },
      { phase: "第 3 阶段 / Phase 3", title: "公文工作流打通及试运行 (Process Hooking & Beta Testing)", duration: "5 - 6 个月 (Months)", details: "对接内部 OA 权限链路与申报逻辑，进行跨科室业务流试运行，全闭环智能联调生产上线。 (Connect active directories, multi-tier privilege structures, and complete final production launch.)" }
    ],
    architectureDiagram: [
      { step: "Data Source", action: "导入服务保密单位规章/审计/制度条例 (Injest Confidential PDFs/DOCXs)", output: "非结构化涉密多格式包 (Raw Unstructured Datasets)" },
      { step: "LLM Pipeline", action: "高精度语义分割与两阶段混合重排 (Semantic Chunking & Re-ranking)", output: "外部关联防幻觉文本 (Hallucination-Protected Context)" },
      { step: "Integrations", action: "云极洲自研微调大模型解答并提交 OA (Synthesize & Post to OA)", output: "自动报承与双签审核 (Automated Sign-off & Audit)" }
    ]
  },
  "gov-video": {
    title: "政法公安实战：边缘端多视角智能解析与违规布防方案 (Enterprise Edge Analytics & Intelligent Surveillance)",
    overview: "为政法公安与高风险监控重地提供自研的极速检测跟踪框架（Vision Analytics Kernel）。利用边缘端微处理器完成百路网络实时低迟解码，支持违规人员入侵判定、聚集群众预警、安防危险反制等复杂实战需要。 (Supplies municipal safety and high-stakes facilities with Yunjizhou's Vision Analytics Kernel. Decodes RTSP feeds locally to detect border violations or distress without bandwidth overheads.)",
    estimatedSaving: "55.0 万 / 年 (Est. ¥550k/Yr Saved)",
    productivityGain: "反应耗时缩短至毫秒级 (Under 100ms)",
    modules: [
      { name: "多维空间实时标定引擎 (Spatial Tagging Model)", desc: "全帧率解构视频，提供目标、距离与轨迹跟踪预测，避免误报。 (Full framerate deconstructs, tracking targets, distance vectors, and movement paths.)", iconName: "Eye" },
      { name: "边缘算力多路解码分配 (Edge-node multiplex decoder)", desc: "仅需低成本服务器即可稳定对齐三十路高清晰摄像头，省去巨额带宽成本。 (Aligns RTSP streams on cost-effective edge chips, bypassing expensive server leasing.)", iconName: "Layers" },
      { name: "政务专网联防联动机制 (Police dispatch networks API)", desc: "秒级推送违警报警至移动警务终端，建立无缝布控警戒圈。 (Dispatches warnings in under a second to active police/guard handheld units.)", iconName: "Shield" }
    ],
    timeline: [
      { phase: "第 1 阶段 / Phase 1", title: "高清视频源接入及边缘网关调试 (RTSP Feed Hooks & Edge Tuning)", duration: "1 - 2 个月 (Months)", details: "定位重地监视死角，将多视角高清 RTSP 流稳定总线桥接至专有边缘处理器，标定物理空间边界。 (Audit camera blind-spots and direct feed buses onto local edge inference chips.)" },
      { phase: "第 2 阶段 / Phase 2", title: "多目标安全检测模型训练适配 (Tracking Parameter Alignment)", duration: "3 - 4 个月 (Months)", details: "训练极速目标检测与多轨迹跟踪融合算法（越线、聚众、高坠），多轮迭代回归并降低环境误报。 (Define target detection parameters like border crossing to minimize false positives.)" },
      { phase: "第 3 阶段 / Phase 3", title: "专网告警联防集成与业务交割 (Dispatch Systems Integration)", duration: "5 - 6 个月 (Months)", details: "深层联通警员调度终端、本地应急广播，建立毫秒级响应应急闭环，通过实战检验正式平滑交割。 (Integrate sirens and security communication networks, finalizing full-scale drills.)" }
    ],
    architectureDiagram: [
      { step: "Data Source", action: "多路监控专网 RTSP 及红外传感器 (Multi-source RTSP & Infrared)", output: "全天候高清视频流 (Surveillance CCTV Streams)" },
      { step: "LLM Pipeline", action: "边缘跟踪与空间关系标定 (Edge Tracking & Spatial Analysis)", output: "危险检测与行为标识 (Behavior Annotations & Alerts)" },
      { step: "Integrations", action: "联合布控和应急对讲警告 (Sync handheld alerts & alarms)", output: "毫秒级治安管制阻断 (Sub-Second Safety Interception)" }
    ]
  },
  "park-ibms": {
    title: "商业园区 AI+IBMS 智能楼控与安防联动指挥一体化方案 (Integrated Smart Chiller & Security Linkage Dispatch Solution)",
    overview: "将人工智能多变量能效预测回归算法与周界立体安防报警体系深度融合，直通物业 IBMS 管理总线。在实现大楼暖通空调动态寻优自适应节能的同时，当公安/视频 AI 检出入侵、火情或安全风险时，自动毫秒级跨系统反控冷热源、新风、风雨、梯控、电子导引牌等物理端点，开启一键协同应急指挥调度。 (Integrates multi-variable thermodynamic models with campus perimeter surveillance. Intercepts traditional IBMS buses to dynamically cut HVAC power bills by 28.5%, while instantly feedback-modulating escape maps, gate barriers, and ventilation systems upon critical safety events.)",
    estimatedSaving: "35.8 万 / 年 (Est. ¥358k/Yr Saved)",
    productivityGain: "联动响应缩短至毫秒级 (Active Dispatch <200ms)",
    modules: [
      { name: "应急联合安防调度中枢 (Unified Security Dispatch Kernel)", desc: "联合视频 AI 安全打标结果、常闭防火门状态、周界雷达，秒级智能下发警情地图并锁定入侵通道。 (Coordinating surveillance alerts, fire door status, and radar tracks to lock down corridors or route responders.)", iconName: "Shield" },
      { name: "IBMS-PLC 闭环反控总线 (IBMS-PLC Bidirectional Sync)", desc: "免去全套重构，直接接管传统西门子/霍尼韦尔系统，支持紧急防烟新风强切与通道电耦合锁定。 (Bypasses total hardware teardown, intercepting legacy PLC buses to regulate cycles.)", iconName: "Cpu" },
      { name: "三维立体融合指挥大屏 (Integrated Command Twin Dashboard)", desc: "三维虚拟孪生大屏端融合能耗曲线与立体高点警情实况，实现多方人员一键下达现场处置与阻击指令。 (Central UI mapping real-time COP, power curves, security alerts, and threat tracking camera zones.)", iconName: "Building" }
    ],
    timeline: [
      { phase: "第 1 阶段 / Phase 1", title: "楼自系统总线握手与数据采集 (Protocol Hooks & Telemetry Ingest)", duration: "1 - 2 个月 (Months)", details: "接管西门子、霍尼韦尔等传统 IBMS/PLC 网关总线，开展楼宇空间温度、人流活跃度与气象 telemetry 长期采样。 (Hook data wires onto outdoor thermometers, water valves, and smart energy meters.)" },
      { phase: "第 2 阶段 / Phase 2", title: "AI 寻优算法仿真与模型调教 (Environmental Optimization Modeling)", duration: "3 - 4 个月 (Months)", details: "在离线沙盒内构造物理环境温湿度、冷量负荷预测模型，运行高维度仿真策略调校。 (Establish temperature and building capacity grids to run reinforcement learning simulations.)" },
      { phase: "第 3 阶段 / Phase 3", title: "全自动在线调温合拢上线 (Total Closed-loop Commissioning)", duration: "5 - 6 个月 (Months)", details: "试运行极寒/极暑等大负荷水机温控寻优闭环，最终实现常态化、低能耗、无人工干预的双向微气候优化运行。 (Activate automatic water chiller pump frequency modulation to start unmanned smart thermodynamics.)" }
    ],
    architectureDiagram: [
      { step: "Data Source", action: "园区闸机/WIFI接入与末端水压 telemetry (Collect wifi logs & pressure)", output: "环境人流活跃变量 (Living Ambient Variables)" },
      { step: "LLM Pipeline", action: "AI 多变量回归与寻优算法 (Active regression load evaluation)", output: "阀频参数调整决策 (Valve Modulation Directives)" },
      { step: "Integrations", action: "直接注入园区原装 PLC / IBMS (Inject overrides into proprietary PLCs)", output: "暖通空调节能降耗 (Verified Power Bill Savings)" }
    ]
  },
  "default-solution": {
    title: "云极洲企业智能化工作流定制专属蓝图 (Yunjizhou Custom Digital AI Transformation Roadmap)",
    overview: "专为渴望进行数字化 AI 转型的企业提供轻量高能的“小步快跑”式转型方案。将大模型语义处理 and 自研行业小算法融合到日常流程体系中，以最小投资换取关键业务岗位的生产红利。 (Designed for small-to-medium firms seeking rapid, iterative productivity loops, marrying small local language models with specific vision scripts into current setups.)",
    estimatedSaving: "15.0 万 / 年 (Est. ¥150k/Yr Saved)",
    productivityGain: "平均人效提升 45.0% (Avg. Capacity +45.0%)",
    modules: [
      { name: "工作流端点连接枢纽 (Workflow automation HUB)", desc: "集成主流工作软体，用 AI 代替繁杂的人工文凭录入、报备追踪。 (Integrates standard enterprise messaging to replace manual receipts with automation.)", iconName: "Workflow" },
      { name: "多模态专有大模型精修 (Finetuned Small LLM)", desc: "轻量端算力模型微调（7B或14B），部署成本低，专精垂直部门业务。 (Deploy small optimized models tailored to your specific enterprise guidelines.)", iconName: "Brain" },
      { name: "数智业务分析追踪器 (Enterprise analytics tracker)", desc: "实时发现各流程瓶颈与异常值，并给决策层推送预警策略。 (Identifies system bottlenecks and logs operations KPIs inside live business reports.)", iconName: "LineChart" }
    ],
    timeline: [
      { phase: "第一阶段 / Phase 1", title: "瓶颈挖掘与数据对齐 (Operations Mapping & Target Alignment)", duration: "1 - 2 个月 (Months)", details: "精确挖掘梳理日常最消耗重复人工的科室审批瓶颈，整理并标注结构化与非结构化业务范例数据。 (Evaluate repetitive clerical tasks and format corporate training document guidelines.)" },
      { phase: "第二阶段 / Phase 2", title: "AI 枢纽集成及微调 (AI Hub Connectors & Local Syncing)", duration: "3 - 4 个月 (Months)", details: "定制并集成云极洲微调预训练端侧小参数，打通各个零碎办公系统，进行多轮局域场景集成部署。 (Connect operational databases and train lightweight models to automate data classification.)" },
      { phase: "第三阶段 / Phase 3", title: "流程打通与员工交付 (Operator Handover & Full Deploy)", duration: "5 - 6 个月 (Months)", details: "交付多岗位日常数字工作台、自动化质检审批，组织多轮岗位协同试运营，完成常态化常态交割落地。 (Engage employees with seamless, rapid tools, securing clean handover workflows.)" }
    ],
    architectureDiagram: [
      { step: "Data Source", action: "日常业务文本与业务审批历史 (Parse daily operation files & logs)", output: "传统流水线日志 (Legacy Operation Datasets)" },
      { step: "LLM Pipeline", action: "端侧场景模型微调与语义意图判定 (Finetuned language model parses intent)", output: "结构化流程处理命令 (Structured Operation Requests)" },
      { step: "Integrations", action: "自动派发待办、汇整与反馈终端 (Automate alerts & dispatch items)", output: "大幅节省手工流转 (Slashed Repetitive Clerical Work)" }
    ]
  }
};

const BLUEPRINTS_EN: Record<string, ROIProposalResult> = {
  "state-owned-docs": {
    title: "Confidential Unit Private Document Multi-Source Semantic Hybrid RAG Solutions",
    overview: "Engineered specifically for high-compliance confidential service units dealing with isolated repositories and intricate classification parameters. Offers Yunjizhou's self-developed hybrid (dense-sparse) RAG pipeline with fully offline sovereign cloud local installation.",
    estimatedSaving: "$54,000 / Year",
    productivityGain: "Avg. Process Speed +72.0%",
    modules: [
      { name: "Hybrid RAG Embedding Model", desc: "Sovereign high-dimensional dense encoders, compatible with offline servers, guaranteeing optimal chunking resolution.", iconName: "Database" },
      { name: "Two-Stage Reranking Pipeline", desc: "Strictly filters AI hallucinations using custom relevance scorers, matching 100% traceable auditing disclosure laws.", iconName: "Workflow" },
      { name: "Audit Workflow Integration", desc: "Interfaces seamlessly with legacy GEE/Weaver OA systems. Cross-evaluates invoice and legal texts into automated pipelines.", iconName: "CheckCircle" }
    ],
    timeline: [
      { phase: "Phase 1", title: "Corpus Ingestion & Local HW Setup", duration: "Month 1 - 2", details: "Anonymize auditing records, compliance templates, building secure custom vectors offline." },
      { phase: "Phase 2", title: "Hybrid Reranking Model Alignment", duration: "Month 3 - 4", details: "Calibrate local LLM responses with a custom Reranker for hallucination-free outputs." },
      { phase: "Phase 3", title: "Process Hooking & Beta Testing", duration: "Month 5 - 6", details: "Connect active directories, multi-tier privilege structures, and complete final production launch." }
    ],
    architectureDiagram: [
      { step: "Data Source", action: "Injest Confidential Unit Compliance/Auditing PDFs and DOCXs", output: "Raw Unstructured Datasets" },
      { step: "LLM Pipeline", action: "High-resolution Semantic Chunking, Dense-Sparse Hybrid Retriever, and Reranking", output: "Hallucination-Protected Context Fragments" },
      { step: "Integrations", action: "Custom fine-tuned LLM synthesizes compliance reports and posts directly into OA/ERP", output: "Automated Sign-off & Audit Logs" }
    ]
  },
  "gov-video": {
    title: "Police Operations: Real-Time Edge Analytics & Intelligent Surveillance",
    overview: "Supplies municipal safety and high-stakes facilities with Yunjizhou's Vision Analytics Kernel. Decodes up to 100 RTSP camera feeds locally to detect border violations, unauthorized gatherings, and worker distress without high bandwidth overheads.",
    estimatedSaving: "$78,000 / Year",
    productivityGain: "Under 100ms Response Time (95.4%)",
    modules: [
      { name: "Spatial Tagging Model", desc: "Full framerate deconstructs, tracking targets, distance vectors, and movement paths.", iconName: "Eye" },
      { name: "Edge-Device Multiplex Decoders", desc: "Simultaneously aligns 30+ HD RTSP streams on cost-effective edge chips, bypassing expensive server leasing.", iconName: "Layers" },
      { name: "Unified Dispatching API Hub", desc: "Dispathes warnings in under a second to active police/guard handheld units.", iconName: "Shield" }
    ],
    timeline: [
      { phase: "Phase 1", title: "RTSP Feed Hooks & Edge Gateway Tuning", duration: "Month 1 - 2", details: "Audit camera blind-spots and direct feed buses onto local edge inference chips." },
      { phase: "Phase 2", title: "Multi-Target Tracking Parameter Sync", duration: "Month 3 - 4", details: "Define target detection parameters (border cross, falling, loitering) to minimize false positives." },
      { phase: "Phase 3", title: "Dispatch Systems Integration", duration: "Month 5 - 6", details: "Integrate sirens and security communication networks, finalizing full-scale drills." }
    ],
    architectureDiagram: [
      { step: "Data Source", action: "Multi-source RTSP CCTV streams and thermal infrared sensors", output: "24/7 Surveillance Streams" },
      { step: "LLM Pipeline", action: "Yunjizhou Edge Tracking core detects targets and maps 3D physical boundaries", output: "Behavior Annotations & Alerts" },
      { step: "Integrations", action: "Dispathes urgent alerts to guard handhelds and activates broadcast systems", output: "Sub-Second Operational Interception" }
    ]
  },
  "park-ibms": {
    title: "Integrated Campus AI+IBMS: Energy Savings & Security Dispatch Blueprint",
    overview: "Injects multi-variable thermodynamic regression models with physical video surveillance arrays, hooking directly onto legacy property PLCs. Trims annual HVAC utilities by over 28.5%, while unleashing sub-second cross-system response overrides - executing emergency smoke exhaustion, security perimeter isolations, elevator ground-recall, and evacuation guidance upon detecting fire, intrusion or public safety breaches.",
    estimatedSaving: "$48,000 / Year",
    productivityGain: "Active Linkage Dispatch <200ms",
    modules: [
      { name: "Unified Command & Response Dispatch Core", desc: "Cross-checks radar borders and surveillance AI alerts to coordinate automated building lock-down, emergency lighting, and map dispatch.", iconName: "Shield" },
      { name: "IBMS-PLC Bidirectional Override bus", desc: "Directly overrides Siemens/Honeywell HVAC relays and gate turnstiles during security breaches without structural rebuilds.", iconName: "Cpu" },
      { name: "Stereoscopic 3D Command HUD", desc: "Interactive twin dashboard mapping thermal energy load curves parallel to multi-angle live CCTV threat feeds.", iconName: "Building" }
    ],
    timeline: [
      { phase: "Phase 1", title: "Protocol Shakehands & Telemetry Ingestion", duration: "Month 1 - 2", details: "Hook data wires onto outdoor thermometers, water valves, and smart energy meters." },
      { phase: "Phase 2", title: "Environmental Optimization Modeling", duration: "Month 3 - 4", details: "Establish temperature and building capacity grids to run reinforcement learning simulations." },
      { phase: "Phase 3", title: "Total Closed-loop Commissioning", duration: "Month 5 - 6", details: "Activate automatic water chiller pump frequency modulation to start unmanned smart thermodynamics." }
    ],
    architectureDiagram: [
      { step: "Data Source", action: "Collect entry turnstile wifi logs, water valve pressure and barometric pressure data", output: "Living Ambient Variables" },
      { step: "LLM Pipeline", action: "Active regression calculations evaluate loads and map optimal frequency parameters", output: "Optimized Valve Modulation Directives" },
      { step: "Integrations", action: "Injects runtime variable overrides directly into proprietary campus PLC and IBMS modules", output: "Verified Power Bill Savings" }
    ]
  },
  "default-solution": {
    title: "Yunjizhou Custom Digital AI Transformation Roadmap",
    overview: "Designed for small-to-medium firms seeking rapid, iterative productivity loops. Marries small local language models with specific vision scripts into current operational setups with minimal capital.",
    estimatedSaving: "$21,000 / Year",
    productivityGain: "Avg. Employee Capacity +45.0%",
    modules: [
      { name: "Workflow Automation Hub", desc: "Integrates standard enterprise messaging. Replaces manual receipt entries and data syncing with LLM automation.", iconName: "Workflow" },
      { name: "Finetuned Local Language Models", desc: "Deploy small optimized models (7B or 14B parameters) tailored to your specific guidelines.", iconName: "Brain" },
      { name: "Digital Analytics Tracker", desc: "Identifies system bottlenecks and logs operations KPIs inside live business reports.", iconName: "LineChart" }
    ],
    timeline: [
      { phase: "Phase 1", title: "Operations Mapping & Target Alignment", duration: "Month 1 - 2", details: "Evaluate repetitive clerical tasks and format corporate training document guidelines." },
      { phase: "Phase 2", title: "AI Hub Connectors & Local Syncing", duration: "Month 3 - 4", details: "Connect operational databases and train lightweight models to automate data classification." },
      { phase: "Phase 3", title: "Operator Handover & Full Deploy", duration: "Month 5 - 6", details: "Engage employees with seamless, rapid tools, securing clean handover workflows." }
    ],
    architectureDiagram: [
      { step: "Data Source", action: "Daily operation logs, customer tickets and document files", output: "Legacy Operation Datasets" },
      { step: "LLM Pipeline", action: "Fine-tuned lightweight language model parses intent", output: "Structured Operation Requests" },
      { step: "Integrations", action: "Automates notifications, categorizes documents, and auto-dispatches checklist items", output: "Slashed Repetitive Clerical Work" }
    ]
  }
};

export default function Assessment() {
  const { language } = useApp();
  const [industry, setIndustry] = useState("docs");
  const [teamSize, setTeamSize] = useState(150);
  const [problem, setProblem] = useState("manual");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<ROIProposalResult | null>(null);
  const [showToast, setShowToast] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setResult(null);

    // Simulate McKinsey Consulting report construction delay
    setTimeout(() => {
      let key = "default-solution";
      if (industry === "docs" || problem === "manual") {
        key = "state-owned-docs";
      } else if (industry === "police" || problem === "security") {
        key = "gov-video";
      } else if (industry === "park" || problem === "energy") {
        key = "park-ibms";
      }

      const dataSource = language === "zh" ? BLUEPRINTS_ZH : BLUEPRINTS_EN;
      setResult(dataSource[key]);
      setIsGenerating(false);
    }, 1200);
  };

  const triggerExport = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 4500);
  };

  return (
    <section id="assessment" className="py-24 bg-transparent relative overflow-hidden">
      
      {/* Absolute top grid background layer */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-40 -z-30" />

      {/* Custom Clean Toast Banner instead of window.alert */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 p-4 rounded-xl bg-emerald-50 dark:bg-[#0c1e15] border border-emerald-250 dark:border-emerald-900 shadow-xl shadow-emerald-500/10 flex items-center gap-3 max-w-md w-[calc(100%-2rem)]"
          >
            <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
            <div className="flex-1 text-xs">
              <p className="font-bold text-emerald-900 dark:text-emerald-100">
                {language === "zh" ? "快照成功打包！" : "Snapshot Compiled Successfully!"}
              </p>
              <p className="text-emerald-700 dark:text-emerald-400 mt-0.5">
                {language === "zh"
                  ? "评估草图与规划文件已储存在本地。我们系统的架构专家与研发顾问组将在会谈时为您展示更丰富的物理设备解构与系统联动拓扑。"
                  : "Draft blueprints have been structured locally. Our systems development and safety advisory group will demonstrate live deep hardware & software topologies."}
              </p>
            </div>
            <button 
              onClick={() => setShowToast(false)} 
              className="text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-200 shrink-0 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] font-mono font-extrabold tracking-widest text-[#1890ff] uppercase bg-blue-50 dark:bg-blue-950/30 px-2.5 py-1 rounded-md border border-blue-100 dark:border-blue-900/40">
            {language === "zh" ? "AI Blueprint Planner / 转型与评估枢纽" : "AI Blueprint Planner / Evaluation Hub"}
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl font-sans font-extrabold tracking-tight text-slate-900 dark:text-white">
            {language === "zh" 
              ? "仅用 15 秒，自动精算您的企业数字化转型报告" 
              : "Generate Your Corporate Digitization Report in 15 Seconds"}
          </h2>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-305 font-normal leading-relaxed">
            {language === "zh"
              ? "告别华而不实、没有交付场景的假想宏图。输入您的真实企业概貌需求，云极洲专家大脑将为您立即输出客观的项目蓝图与估值。"
              : "Forget theoretical plans with no physical anchors. Describe your operational bounds to get realistic architectures and metrics compiled by our experts."}
          </p>
        </div>

        {/* Dynamic Split Screen Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Input Configuration Panel (Left) */}
          <div className="lg:col-span-5 bg-white dark:bg-[#111317] border border-gray-150 dark:border-white/5 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-lg shadow-gray-200/50 dark:shadow-none">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-[#00E5A3]" />
                <span className="text-sm font-extrabold text-[#1f2329] dark:text-white">
                  {language === "zh" ? "业务及痛点特征配置台" : "Workflows & Issue Configurer"}
                </span>
              </div>

              {/* Input 1: Sector / Industry */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2.5">
                  {language === "zh" ? "1. 企业类型或核心场景" : "1. Enterprise Sector & Main Scenario"}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setIndustry("docs")}
                    className={`p-3 text-left rounded-xl border text-xs gap-2 flex items-center transition-all duration-200 cursor-pointer ${
                      industry === "docs" 
                        ? "bg-blue-50 dark:bg-blue-950/30 border-blue-300 dark:border-blue-800 shadow-sm text-[#1890ff] font-bold" 
                        : "bg-slate-50/50 dark:bg-[#15181e]/30 hover:bg-slate-100 dark:hover:bg-slate-800/80 border-gray-150 dark:border-white/5 text-slate-650 dark:text-slate-300"
                    }`}
                  >
                    <Building className="w-4 h-4 text-slate-400" />
                    <span>{language === "zh" ? "服务保密单位 / 专属制度" : "Confidential Unit / Compliance"}</span>
                  </button>
                  <button
                    onClick={() => setIndustry("police")}
                    className={`p-3 text-left rounded-xl border text-xs gap-2 flex items-center transition-all duration-200 cursor-pointer ${
                      industry === "police" 
                        ? "bg-blue-50 dark:bg-blue-950/30 border-blue-300 dark:border-blue-800 shadow-sm text-[#1890ff] font-bold" 
                        : "bg-slate-50/50 dark:bg-[#15181e]/30 hover:bg-slate-100 dark:hover:bg-slate-800/80 border-gray-150 dark:border-white/5 text-slate-650 dark:text-slate-300"
                    }`}
                  >
                    <Shield className="w-4 h-4 text-slate-400" />
                    <span>{language === "zh" ? "政法公安 / 工业报警" : "Police / Heavy Works"}</span>
                  </button>
                  <button
                    onClick={() => setIndustry("park")}
                    className={`p-3 text-left rounded-xl border text-xs gap-2 flex items-center transition-all duration-200 cursor-pointer ${
                      industry === "park" 
                        ? "bg-blue-50 dark:bg-blue-950/30 border-blue-300 dark:border-blue-800 shadow-sm text-[#1890ff] font-bold" 
                        : "bg-slate-50/50 dark:bg-[#15181e]/30 hover:bg-slate-100 dark:hover:bg-slate-800/80 border-gray-150 dark:border-white/5 text-slate-650 dark:text-slate-300"
                    }`}
                  >
                    <Activity className="w-4 h-4 text-slate-400" />
                    <span>{language === "zh" ? "商业园区 / 工业智控" : "Campus / Smart HVAC"}</span>
                  </button>
                  <button
                    onClick={() => setIndustry("other")}
                    className={`p-3 text-left rounded-xl border text-xs gap-2 flex items-center transition-all duration-200 cursor-pointer ${
                      industry === "other" 
                        ? "bg-blue-50 dark:bg-blue-950/30 border-blue-300 dark:border-blue-800 shadow-sm text-[#1890ff] font-bold" 
                        : "bg-slate-50/50 dark:bg-[#15181e]/30 hover:bg-slate-100 dark:hover:bg-slate-800/80 border-gray-150 dark:border-white/5 text-slate-650 dark:text-slate-300"
                    }`}
                  >
                    <Users className="w-4 h-4 text-slate-400" />
                    <span>{language === "zh" ? "商业私企 / 流程服务" : "SMBs / Process Service"}</span>
                  </button>
                </div>
              </div>

              {/* Input 2: Core Bottleneck */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2.5">
                  {language === "zh" ? "2. 阻碍当前生产力的核心瓶颈" : "2. Primary Operational Bottleneck"}
                </label>
                <select
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  className="w-full text-xs p-3.5 bg-white dark:bg-[#15181e] border border-gray-250 dark:border-white/10 rounded-xl outline-none text-slate-700 dark:text-slate-200 transition-all font-sans focus:border-[#1890ff]"
                >
                  {language === "zh" ? (
                    <>
                      <option value="manual">公文/审计/合规规章庞杂，检索困难效率低</option>
                      <option value="security">高危重工周界需要人肉盯防，漏哨存在重大隐患</option>
                      <option value="energy">商业楼宇或库房空调能耗、HVAC电费开支巨大</option>
                      <option value="workflow">审批流转繁琐割裂，跨系统数据孤立人肉搬运</option>
                    </>
                  ) : (
                    <>
                      <option value="manual">Complex regulatory manuals, making manual audits extremely slow</option>
                      <option value="security">Heavy industrial borders require manual patrol, risking blind spots</option>
                      <option value="energy">Enormous power expenditures on building cooling & HVAC relays</option>
                      <option value="workflow">Fragmented approval chains requiring repetitive data transits</option>
                    </>
                  )}
                </select>
              </div>

              {/* Input 3: Employee scale */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2.5">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    {language === "zh" ? "3. 影响部门/员工规模估算" : "3. Estimated Department Size Affected"}
                  </label>
                  <span className="text-xs font-mono font-bold text-[#1890ff] bg-blue-50 dark:bg-blue-950/40 px-2.5 py-0.5 rounded border border-blue-150 dark:border-blue-900/30">
                    {teamSize === 500 
                      ? (language === "zh" ? "500+ (大型单位)" : "500+ (Enterprise)") 
                      : `${teamSize} ${language === "zh" ? "人" : "Staff"}`}
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="500"
                  step="20"
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#1890ff]"
                />
                <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-1 font-semibold">
                  <span>20 {language === "zh" ? "人" : "Staff"}</span>
                  <span>250 {language === "zh" ? "人" : "Staff"}</span>
                  <span>500+ {language === "zh" ? "人" : "Staff"}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-gray-150 dark:border-white/5 pt-6">
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full py-3.5 bg-gradient-to-r from-[#00F5A0] to-[#00B2FE] disabled:from-slate-300 disabled:to-slate-400 disabled:text-slate-100 text-slate-950 font-sans text-xs font-extrabold rounded-xl tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-[#00F5A0]/10 cursor-pointer hover:shadow-[#00F5A0]/25 hover:opacity-95"
                id="generate-blueprint-btn"
              >
                {isGenerating ? (
                  <>
                    <Printer className="w-4 h-4 animate-spin text-slate-950" />
                    <span>
                      {language === "zh" 
                        ? "系统正在组装AI专家方案并预算ROI..." 
                        : "Compiling Expert Formulas & Calibrating ROI..."}
                    </span>
                  </>
                ) : (
                  <>
                    <BarChart3 className="w-4 h-4 text-slate-950" />
                    <span>
                      {language === "zh" 
                        ? "免费生成数字化 AI 转型架构蓝图报告" 
                        : "Generate My Customized AI Blueprint Report"}
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Interactive Output Report Container (Right) */}
          <div className="lg:col-span-7 bg-white dark:bg-[#111317] rounded-3xl border border-gray-150 dark:border-white/5 p-6 sm:p-8 flex flex-col justify-between min-h-[520px] shadow-lg shadow-gray-200/50 dark:shadow-none">
            
            <AnimatePresence mode="wait">
              
              {/* Scenario 1: Idle state (No report generated yet) */}
              {!result && !isGenerating && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col items-center justify-center text-center py-20 px-4"
                >
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-gray-200 dark:border-white/5 flex items-center justify-center text-slate-400 mb-6 font-mono font-extrabold shadow-inner text-lg">
                    📊
                  </div>
                  <h3 className="font-sans font-extrabold text-slate-800 dark:text-slate-100 text-base">
                    {language === "zh" ? "报告预览控制台" : "Report Generation Dashboard"}
                  </h3>
                  <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 max-w-sm font-normal leading-relaxed font-sans">
                    {language === "zh"
                      ? "在左侧面板配置您的业务场景与痛点诉求，点击“免费生成数字化 AI 转型架构蓝图报告”按钮，系统AI大脑将立即为您在线精算排布。"
                      : "Configure your parameters in the left configurer panel. Click 'Generate' to run our data-model regression and output McKinsey-style blueprints."}
                  </p>
                </motion.div>
              )}

              {/* Scenario 2: Processing simulation loader */}
              {isGenerating && (
                <motion.div
                  key="loader"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col items-center justify-center py-24"
                >
                  <div className="relative mb-6">
                    <div className="w-12 h-12 rounded-full border-4 border-slate-100 dark:border-slate-800 border-t-[#1890ff] animate-spin" />
                    <Brain className="w-5 h-5 text-[#1890ff] absolute inset-0 m-auto animate-pulse" />
                  </div>
                  <div className="space-y-1.5 text-center font-mono text-[10px] text-slate-400 dark:text-slate-500 leading-relaxed font-semibold">
                    <p className="text-slate-850 dark:text-slate-200 text-xs font-extrabold font-sans mb-1">
                      {language === "zh" ? "正在进行场景契合度数据流校准..." : "Calibrating Segment-Bottleneck Compatibility..."}
                    </p>
                    <p>ANALYZING SEGMENT BOTTLENECK FREQUENCY &gt;</p>
                    <p>ESTIMATING RESOURCE REORGANIZATION [STAFF: {teamSize}] &gt;</p>
                    <p>GENERATING COMPLIANT ARCHITECTURE BLUEPRINT &gt;</p>
                  </div>
                </motion.div>
              )}

              {/* Scenario 3: Report Successfully Generated! */}
              {result && !isGenerating && (
                <motion.div
                  key="report"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex-1 flex flex-col justify-between"
                  id="rendered-roi-report"
                >
                  <div>
                    {/* Report Watermark */}
                    <div className="flex justify-between items-center text-[9px] font-mono text-slate-400 dark:text-slate-500 border-b border-gray-150 dark:border-white/5 pb-3 mb-6">
                      <span className="flex items-center gap-1.5 font-bold">
                        <Clipboard className="w-3.5 h-3.5 text-[#1890ff]" />
                        {language === "zh" ? "云极洲 AI 转型顶层委员会专属评估报告" : "Yunjizhou AI Committee Advisory Report"}
                      </span>
                      <span className="font-semibold">REPORT ID: #YJZ-2026-ROI</span>
                    </div>

                    {/* Report Header */}
                    <div className="mb-6">
                      <span className="inline-block px-2.5 py-0.5 rounded text-[10px] bg-blue-50 dark:bg-blue-950/20 text-[#1890ff] font-mono font-extrabold mb-2 tracking-wide border border-blue-100 dark:border-blue-900/40">
                        EXECUTIVE ARCHITECTURE BLUEPRINT
                      </span>
                      <h3 className="text-xl sm:text-2xl font-sans font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug">
                        {result.title}
                      </h3>
                      <p className="mt-3 text-xs text-slate-500 dark:text-slate-450 leading-relaxed font-normal font-sans">
                        {result.overview}
                      </p>
                    </div>

                    {/* ROI Highlight Dashboard */}
                    <div className="grid grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-900/40 border border-gray-150 dark:border-white/5 p-4.5 rounded-xl text-center mb-6">
                      <div>
                        <span className="text-[10px] font-mono text-slate-450 dark:text-slate-500 block uppercase font-extrabold">
                          {language === "zh" ? "预估年均综合能源及人力降本" : "Est. Annual Resource Expense Saved"}
                        </span>
                        <span className="text-lg sm:text-xl font-mono font-extrabold text-[#00E5A3] block mt-1">{result.estimatedSaving}</span>
                      </div>
                      <div className="border-l border-gray-200 dark:border-white/5">
                        <span className="text-[10px] font-mono text-slate-450 dark:text-slate-500 block uppercase font-extrabold">
                          {language === "zh" ? "核心业务端到端自动化能效提升" : "Process Efficiency Leverage Metric"}
                        </span>
                        <span className="text-lg sm:text-xl font-mono font-extrabold text-[#1890ff] block mt-1">{result.productivityGain}</span>
                      </div>
                    </div>

                    {/* Dynamic Architecture Flowchart */}
                    <div className="mb-6">
                      <span className="block text-[10px] font-mono font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
                        {language === "zh" ? "系统拓扑展现 (Integration Pipeline Flow)" : "Operational Integration Pipeline Flow"}
                      </span>
                      <div className="space-y-2 text-[11px] font-mono">
                        {result.architectureDiagram.map((dia, idx) => (
                          <div key={idx} className="flex flex-col sm:flex-row items-stretch border border-gray-150 dark:border-white/5 rounded bg-slate-50/50 dark:bg-slate-900/20">
                            <div className="sm:w-1/4 p-2.5 bg-blue-50/85 dark:bg-blue-950/20 text-[#1890ff] font-bold border-r border-gray-150 dark:border-white/5 text-center flex items-center justify-center shrink-0 uppercase tracking-wide">
                              {dia.step}
                            </div>
                            <div className="p-2.5 text-slate-600 dark:text-slate-300 flex-1 flex items-center">
                              <span className="font-sans font-normal italic leading-relaxed">{dia.action}</span>
                            </div>
                            <div className="p-2.5 sm:w-1/3 bg-slate-50 dark:bg-slate-900/40 text-slate-505 dark:text-slate-400 border-l border-gray-150 dark:border-white/5 text-[10px] flex items-center">
                              <ChevronRight className="w-3.5 h-3.5 text-slate-400 inline mr-1 shrink-0" />
                              <span className="font-sans font-medium">{dia.output}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Core System Module Recommendations */}
                    <div className="mb-6">
                      <span className="block text-[10px] font-mono font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2.5">
                        {language === "zh" ? "推荐核心组件推荐列表 (Recommends)" : "Recommended Core System Component Builds"}
                      </span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {result.modules.map((mod, idx) => (
                          <div key={idx} className="p-3 border border-gray-150 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/10 rounded-lg flex items-start gap-2.5">
                            <div className="w-2 h-2 rounded-full bg-[#1890ff] shrink-0 mt-1.5 animate-pulse" />
                            <div>
                              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">{mod.name}</h4>
                              <p className="mt-1 text-[10px] text-slate-550 dark:text-slate-400 leading-normal font-normal">{mod.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Timeline roadmap progression */}
                    <div>
                      <span className="block text-[10px] font-mono font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
                        {language === "zh" ? "3阶段敏捷推进交割历程 (Agile Deliver Roadmap)" : "Iterative Agile Delivery Roadmap"}
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {result.timeline.map((tl, idx) => (
                          <div key={idx} className="p-3 border border-gray-150 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/10 rounded-xl flex flex-col justify-between">
                            <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-gray-100 dark:border-white/5">
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-extrabold bg-slate-100/80 dark:bg-slate-800 text-slate-650 dark:text-slate-400 uppercase shrink-0">
                                {tl.phase}
                              </span>
                              <span className="font-mono text-[10px] text-[#1890ff] font-extrabold shrink-0">{tl.duration}</span>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-slate-800 dark:text-slate-200 text-[11px] leading-tight mb-1.5">{tl.title}</h4>
                              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-normal leading-relaxed">{tl.details}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Actions inside report print / contact */}
                  <div className="mt-8 pt-4 border-t border-gray-150 dark:border-white/5 flex flex-col sm:flex-row gap-3 items-center justify-between">
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-sans font-normal italic leading-relaxed max-w-md">
                      {language === "zh"
                        ? "*本估算系基于云极洲历史交付数据模型离线推演，不构成要约，实际部署细节可会谈协商。"
                        : "*Evaluations are model-based simulations derived from Yunjizhou historical deliveries. Actual parameters are negotiated in official quotes."}
                    </span>
                    <button
                      onClick={triggerExport}
                      className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#00E5A3] hover:text-[#00F5A0] transition-colors font-sans cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 shrink-0" />
                      <span>{language === "zh" ? "导出专家规划书.PDF" : "Export Blueprint Brochure.PDF"}</span>
                    </button>
                  </div>

                </motion.div>
              )}

            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
