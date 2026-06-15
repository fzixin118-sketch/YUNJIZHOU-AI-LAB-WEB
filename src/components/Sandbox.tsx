/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Bot, Shield, Building2, Search, Send, Cpu, 
  Play, Pause, Sliders, AlertCircle, RefreshCw,
  TrendingDown, Zap, FileText, CheckCircle
} from "lucide-react";

import { useApp } from "../context/AppContext";

// Types/structures inside component
interface RagQA {
  question: string;
  matchedChunks: { doc: string; content: string; score: number }[];
  answer: string;
}

const RAG_PRESETS: RagQA[] = [
  {
    question: "保密单位人员因公出差，每日住宿费限额与餐补标准是多少？",
    matchedChunks: [
      { doc: "集团差旅与报销核算细则第12页.pdf", content: "一类地区（北京、上海、广州、深圳、深圳特区）员工出差住宿费限额最高为550元/天，伙食补助标准为120元/天。", score: 0.942 },
      { doc: "集团差旅与报销核算细则第14页.pdf", content: "二类地区出差住宿费上限为450元/天，伙食补助100元/天。因公接待不享受重复餐补。", score: 0.887 },
      { doc: "合规条例汇编第4章.pdf", content: "所有报销须凭国家正式增值税专用发票或普通发票并附有详尽日程节点表方可承报。", score: 0.812 }
    ],
    answer: "根据已匹配到的差旅与报销细则，第12-14页给出的标准如下：\n\n1. **住宿费标准**：一类地区每日限额最高为 **550元**；二类地区每日限额最高为 **450元**。\n2. **餐补标准**：一类地区为 **120元/天**；二类地区为 **100元/天**。如当天已有公务接待安排，通常不重复申领普通餐补。\n3. **报销要求**：需提交合规发票、行程说明和审批记录，便于后续财务与审计核对。"
  },
  {
    question: "如何办理集团固定资产报废手续，需要通过哪些部门审批？",
    matchedChunks: [
      { doc: "集团固定资产管理制度第28条.docx", content: "原值在10万元以上的固定资产损坏报废，必须提供技术鉴定报告，并由财务部和总工办联合签署初审意见。", score: 0.925 },
      { doc: "受控资产与涉密装备监督管理合规手册.pdf", content: "单笔原值超过50万元人民币的受控保密资产报废或处置，需报安全委员会决策通过之日起10个工作日内报保密业务部门备案。", score: 0.891 },
      { doc: "集团固定资产管理制度第31条.docx", content: "报废申报单应由资产使用部门发起，经企管部、财务部会签，报分管副总经理批准。", score: 0.865 }
    ],
    answer: "固定资产报废建议按以下流程办理：\n\n1. **使用部门发起申请**：说明资产损坏原因、当前状态和拟处置方式。\n2. **技术与财务核验**：原值超过 **10万元** 的资产，需要提供技术鉴定报告，并由财务部和相关管理部门会签。\n3. **审批链路**：通常由使用部门发起，经企管部、财务部会签后，提交分管负责人审批。\n4. **备案要求**：单笔原值超过 **50万元** 的受控资产，审批通过后应在规定时间内完成备案。"
  },
  {
    question: "单位在重大项目和重要资产管理中，通常需要注意哪些审批和审计要求？",
    matchedChunks: [
      { doc: "受控资产与涉密装备监督管理合规手册.pdf", content: "明确受控重大项目和关乎安全体系的事项必须经安全委员会集体充分评估论证做出决定，严禁单人独断决策部署。", score: 0.957 },
      { doc: "服务保密单位管理责任暂行条例.pdf", content: "开展重要合作或敏感设备采购前，必须经具有相应保密资质的第三方评估机构完成独立系统安全测试与保密合规调查。", score: 0.874 }
    ],
    answer: "重大项目和重要资产管理一般建议关注三类要求：\n\n1. **集体决策**：涉及关键资产、重要采购或重大系统变更时，应由相关委员会或管理层集体评估，避免单人决策。\n2. **第三方评估**：对于安全要求高的合作、设备采购或系统接入，可引入具备资质的第三方机构做安全测试与合规评估。\n3. **过程留痕**：保留评估报告、审批记录、会议纪要和执行结果，便于后续审计、复盘和责任界定。"
  }
];

export default function Sandbox() {
  const { language, theme } = useApp();
  const [activeTab, setActiveTab ] = useState<"rag" | "vision" | "ibms">("rag");

  // === RAG State ===
  const [selectedRagPreset, setSelectedRagPreset] = useState<number>(0);
  const [ragState, setRagState] = useState<"idle" | "filtering" | "reranking" | "generating" | "completed">("idle");
  const [ragOutput, setRagOutput] = useState<string>("");
  const [customQuestion, setCustomQuestion] = useState("");
  const [ragSteps, setRagSteps] = useState<string[]>([]);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // === Vision State ===
  const [visionMode, setVisionMode] = useState<"patrol" | "border" | "crowd" | "loiter" | "fall" | "sleep" | "interrogate" | "keyperson" | "bagdrift">("patrol");
  const [isPlaying, setIsPlaying] = useState(true);
  const [threshold, setThreshold] = useState(75);
  const [isAnnotated, setIsAnnotated] = useState(true);
  const [fps, setFps] = useState(25);
  const [visionLogs, setVisionLogs] = useState<string[]>([
    "08:30:12 系统初始化：视频巡检演示已启动",
    "08:30:15 边缘分析设备就绪 [FPS: 25, 延迟: 14ms]",
  ]);

  // === IBMS State ===
  const [occupancy, setOccupancy] = useState(45); // %
  const [outdoorTemp, setOutdoorTemp] = useState(33); // °C
  const [aiMode, setAiMode] = useState<"economy" | "comfort" | "safety">("economy");
  const [securityStatus, setSecurityStatus] = useState<"normal" | "intrusion" | "fire" | "panic">("normal");
  const [ibmsLogs, setIbmsLogs] = useState<string[]>([
    "[日常布防] AI+IBMS 智能楼控与安防联动专网激活, 256位PLC加密链路已建立且处于心跳连通状态",
    "[环境巡检] 楼宇客流自动回馈温控、气象寻优寻低碳机制已启动 [AI能控核心在线]",
  ]);

  const triggerSecurityLinkage = (type: "intrusion" | "fire" | "panic") => {
    const ts = new Date().toLocaleTimeString();
    setSecurityStatus(type);
    if (type === "intrusion") {
      setIbmsLogs(prev => [
        `[${ts} 【入侵提醒】] 视频分析识别到 B 栋 5 层外立面疑似攀爬行为，置信度 96.8%。`,
        `[${ts} 【IBMS联动】] 已触发照明、门禁与现场广播演练流程，并记录 PLC 联动指令。`,
        `[${ts} 【安保通知】] 已将可疑位置和建议处置路线推送至当值安保终端。`,
        `[${ts} 【通道控制】] A 门与 B 门禁临时收紧，便于现场确认。`,
        ...prev
      ]);
    } else if (type === "fire") {
      setIbmsLogs(prev => [
        `[${ts} 【火情提醒】] C 区地下机房温度与红外信号异常，系统建议现场复核。`,
        `[${ts} 【IBMS联动】] 新风、排烟、电梯与广播进入火警演练流程。`,
        `[${ts} 【疏散提示】] 电子导引屏已切换为应急路线提示。`,
        `[${ts} 【多端协同】] 物业大屏、视频画面和设备状态已同步更新。`,
        ...prev
      ]);
    } else if (type === "panic") {
      setIbmsLogs(prev => [
        `[${ts} 【公共治安警报】] 大楼大堂主换乘区热力微感检出: 发生聚集性群体异动与剧烈冲突推搡!`,
        `[${ts} 【IBMS自动反控】] 连带断开关键区域的自动直梯下行。前台安保物理隔离合金障降锁闭锁!`,
        `[${ts} 【应急指挥调度】] 自动接入分局联合指挥视频网。向方圆500米所属治安分队、交巡执法等触发定位求救指令!`,
        `[${ts} 【指控疏解通道】] 正向指配非警情闸门为全开快速路, 引导群众30秒内流转撤离现场危险区!`,
        ...prev
      ]);
    }
  };

  const resetSecurityLinkage = () => {
    const ts = new Date().toLocaleTimeString();
    setSecurityStatus("normal");
    setIbmsLogs(prev => [
      `[${ts} 【指令恢复】] 管理员手动恢复日常状态! 消防卷帘开闸, 防火闸解锁, 楼宇PLC阀开度恢复正常能碳控制模型运行。`,
      `[${ts} 【日常安防】] 回归三维轮班监控防御, AI能效能耗预测寻优接管空调主机运行。`,
      ...prev
    ]);
  };

  // Simulate RAG Pipeline
  const runRagQA = () => {
    setRagState("filtering");
    setRagOutput("");
    setRagSteps(["正在理解问题并生成检索向量...", "正在匹配最相关的内部资料..."]);
    
    setTimeout(() => {
      setRagState("reranking");
      setRagSteps(prev => [...prev, "正在过滤低相关内容...", "正在把 Top-3 资料片段交给大模型生成回答..."]);
      
      setTimeout(() => {
        setRagState("generating");
        setRagSteps(prev => [...prev, "正在生成带来源依据的回答..."]);
        
        let targetText = RAG_PRESETS[selectedRagPreset].answer;
        if (customQuestion.trim()) {
          targetText = `这是针对您的自定义问题「${customQuestion}」的演示回答：\n\n1. **先找依据**：系统会先在内部制度、合同、手册等资料中查找相关片段，而不是直接凭空回答。\n\n2. **再生成结论**：在真实项目中，我们会根据资料类型设置分段策略，并结合向量检索（Cosine Similarity）、关键词检索和重排模型，提高答案命中率与可追溯性。\n\n3. **适合场景**：如果您需要在内网或离线环境中使用，我们可以进一步演示私有知识库、权限控制、来源引用和后台审计等完整能力。`;
        }
        
        let index = 0;
        const interval = setInterval(() => {
          if (index < targetText.length) {
            setRagOutput(prev => prev + targetText.charAt(index));
            index += 2; // Speed up rendering slightly
          } else {
            clearInterval(interval);
            setRagState("completed");
            setRagSteps(prev => [...prev, "回答已生成，可查看引用来源。"]);
          }
        }, 15);
      }, 1000);
    }, 1000);
  };

  // Autoscroll chat
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [ragOutput, ragSteps, ragState]);

  // Handle preset change
  const handleRagPresetSelect = (id: number) => {
    setSelectedRagPreset(id);
    setCustomQuestion("");
    setRagState("idle");
    setRagOutput("");
    setRagSteps([]);
  };

  // Simulate Vision logs
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      const timestamps = new Date().toLocaleTimeString();
      let logMsg = "";
      const currentThresh = threshold / 100;
      
      if (visionMode === "patrol") {
        const rand = Math.random();
        if (rand > 0.7) {
          logMsg = `[安全告警] 检测区域 A 疑似发生激烈肢体冲突与打架斗殴, 置信度 ${(0.83 + rand * 0.15).toFixed(3)} [高于设定置信度阀值 ${currentThresh}]`;
        } else if (rand > 0.4) {
          logMsg = `[告警提示] 追踪框 101# 识别到多名目标剧烈推搡及肢体拉扯等异常动作`;
        } else {
          logMsg = `[日常监察] 区域画面内秩序良好，未发生打架斗殴或冲突迹象。冲突危险系数 ${(1 + rand * 4).toFixed(1)}%`;
        }
      } else if (visionMode === "interrogate") {
        const rand = Math.random();
        if (rand > 0.5) {
          logMsg = `[提审合规检查] 提审室 02# 在岗两名办案人员（1名提问人、1名记录人均在框），就绪率 100%`;
        } else if (rand > 0.2) {
          logMsg = `[提审行为检测] 发现提审官与在押人员处于安全距离分区。物理软包隔离物无异常触碰。`;
        } else {
          logMsg = `[提审违规提示] 提审行为全流程自动时间锚点打标完成，未检出单人违规提审现象。`;
        }
      } else if (visionMode === "loiter") {
        const rand = Math.random();
        if (rand > 0.6) {
          logMsg = `[提醒] 监测到 203# 目标在重点区域连续徘徊超过 120 秒，建议现场关注`;
        } else if (rand > 0.3) {
          logMsg = `[意图分析] 徘徊轨迹热度异常，越界企图可能性评估: ${(65 + rand * 20).toFixed(1)}%`;
        } else {
          logMsg = `[空闲监审] 监控通道无异常滞留，人员流转向正常。`;
        }
      } else if (visionMode === "fall") {
        const rand = Math.random();
        if (rand > 0.7) {
          logMsg = `[风险提醒] 041# 区域传感器与视觉检测同时触发：疑似人员倒地或撞击墙面`;
        } else if (rand > 0.4) {
          logMsg = `[生命体征估算] 倒地目标体态夹角异常（平行地面 < 15度），已触发一键紧急通传医护广播。`;
        } else {
          logMsg = `[体态自检] 当前舍内监管人员体态良好，站立/坐姿平衡状态正常。`;
        }
      } else if (visionMode === "sleep") {
        const rand = Math.random();
        if (rand > 0.7) {
          logMsg = `[工作纪律告警] 主控操作台 02# 坐席检测异常：目标头部长期下垂呈静止睡眠姿态（3分钟无显著位移）`;
        } else if (rand > 0.4) {
          logMsg = `[值班状态告警] 检测区域离岗人数为 1, 判断为“脱岗”违纪，正在自动拨通岗位蜂鸣器。`;
        } else {
          logMsg = `[状态巡检] 值班人员当前状态健康，面部微表情判定为“清醒/在岗状态”。`;
        }
      } else if (visionMode === "border") {
        const rand = Math.random();
        if (rand > 0.6) {
          logMsg = `[告警] 反触网隔离带B线发生入侵标识。告警编号: #W-${Math.floor(Math.random() * 900) + 100} - 持续跟踪中`;
        } else {
          logMsg = `[隔离区] 分界传感网监控状态 - 无入侵触发`;
        }
      } else if (visionMode === "keyperson") {
        const rand = Math.random();
        if (rand > 0.6) {
          logMsg = `[重点行为监控] 302#监控点 重点人员(ID:0409) 在特定隔离区发生异常挥手或站立攀高姿态 [告警触发]`;
        } else if (rand > 0.3) {
          logMsg = `[体貌状态更新] 重点监管受众 0409 当前处于静态面床睡眠，呼吸浮动与热成像热值测定正常`;
        } else {
          logMsg = `[日常监视] 重点关注目标3名均在安全视区保持常规坐立姿态，无狂躁或过激体外偏移。`;
        }
      } else if (visionMode === "bagdrift") {
        const rand = Math.random();
        if (rand > 0.6) {
          logMsg = `[重度违规告警] 2号闸口气锁室 识别到遗留包袋。检测到“人包分离”过限超 15秒，触发安全防渡防私藏机制！`;
        } else if (rand > 0.3) {
          logMsg = `[分离物识别] 疑似违规自主包裹带入卡口 (规格: 42x35x20cm)，判定存在“脱离持有人”异常。`;
        } else {
          logMsg = `[行物检查] 闸口及通道保持高洁净无障流动，未见未挂牌、未经报备的游离箱包物品。`;
        }
      } else {
        const density = Math.floor(occupancy * 1.5 + Math.random() * 10);
        logMsg = `[密度判定] 2号测距框当前区域人流密度: 估计值 ${density} 人/100平米`;
      }

      setVisionLogs(prev => {
        const currentLogs = [ `${timestamps} ${logMsg}`, ...prev];
        return currentLogs.slice(0, 8); // Keep last 8 logs
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [visionMode, isPlaying, threshold, occupancy]);

  // IBMS dynamic HVAC calculation formula
  const getIbmsCalculations = () => {
    const outdoorD = outdoorTemp - 24; // Base cooling diff
    const occD = occupancy / 100;
    
    let baseCooling = 10;
    let savingsFactor = 1.0;
    
    if (aiMode === "economy") {
      baseCooling = 25;
      savingsFactor = 0.35; // 35% savings
    } else if (aiMode === "comfort") {
      baseCooling = 45;
      savingsFactor = 0.12; // 12% savings
    } else {
      baseCooling = 15;
      savingsFactor = 0.22;
    }
    
    const coolingRate = Math.round((baseCooling + outdoorD * 3.5 + occD * 15) * (1 - savingsFactor * 0.4));
    const airFlow = Math.round((350 + occD * 600) * (aiMode === "economy" ? 0.75 : 1.0));
    const energySaving = Math.min(45, Math.max(8, Math.round((savingsFactor * 100) + (outdoorTemp > 30 ? (outdoorTemp - 30) * 1.5 : 0) - (occupancy > 70 ? (occupancy - 70) * 0.2 : 0))));
    
    return { coolingRate, airFlow, energySaving };
  };

  const ibmsMetrics = getIbmsCalculations();

  // Simulate IBMS logs
  useEffect(() => {
    const interval = setInterval(() => {
      const ts = new Date().toLocaleTimeString();
      let log = "";
      const rand = Math.random();
      
      if (rand > 0.6) {
        log = `[寻优动作] AI引擎识别到楼内人流降为 ${occupancy}%, 自动将冷却泵变频下调, 实时能效提升。`;
      } else if (rand > 0.3) {
        log = `[参数调整] 针对环境温度 ${outdoorTemp}°C, 开启预测性温控修正, 避免楼宇末端产生过热死区。`;
      } else {
        log = `[低碳控制] 机房末端一阶热负荷控制阀开度设为 ${Math.max(10, 100 - occupancy)}%, 安全联动无误。`;
      }
      
      setIbmsLogs(prev => {
        const cur = [`${ts} ${log}`, ...prev];
        return cur.slice(0, 6);
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [occupancy, outdoorTemp, aiMode]);

  return (
    <section id="sandbox" className="py-24 bg-transparent relative bg-dot-pattern">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3.5 py-1 rounded bg-[#00F5A0]/10 dark:bg-[#00F5A0]/15 text-[11px] font-mono font-bold tracking-widest text-[#00E5A3] uppercase border border-[#00F5A0]/20">
            {language === "zh" ? "样例展示" : "Interactive Operations Sandbox"}
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl font-sans font-extrabold tracking-tight text-slate-900 dark:text-white">
            {language === "zh" ? "实机演示：亲自启动云极洲的 AI 生产力" : "Interactive Sandbox: Boot Yunjizhou's Custom AI"}
          </h2>
          <p className="mt-3.5 text-sm text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
            {language === "zh"
      ? "这里用几个典型场景演示云极洲能做什么：内部资料问答、视频异常提醒、楼宇节能与联动控制。您可以先感受效果，再进一步讨论真实项目。"
      : "Try a few typical scenarios: internal knowledge Q&A, video alerts, and building energy/linkage control. See the effect before discussing a real project."}
          </p>
        </div>

        {/* Tab Buttons bar - High vitality & bouncy shadow on active */}
        <div className="flex flex-col sm:flex-row justify-center gap-3.5 mb-12">
          
          <button
            onClick={() => setActiveTab("rag")}
            className={`flex items-center gap-3 px-6 py-3.5 rounded-2xl text-left border transition-all duration-300 cursor-pointer hover:-translate-y-0.5 active:translate-y-0 ${
              activeTab === "rag"
                ? "bg-gradient-to-r from-[#00F5A0] to-[#00B2FE] text-slate-950 border-transparent shadow-lg shadow-cyan-500/20 font-extrabold"
                : "bg-white dark:bg-[#060b19]/80 backdrop-blur-md text-slate-600 dark:text-slate-300 border-gray-150 dark:border-cyan-500/10 shadow-sm hover:bg-gray-50 dark:hover:bg-slate-900/50 hover:text-[#00B2FE] dark:hover:text-[#00F5A0]"
            }`}
          >
            <Bot className={`w-5 h-5 shrink-0 transition-colors ${activeTab === 'rag' ? 'text-slate-950' : 'text-[#00F5A0]'}`} />
            <div>
              <div className="text-sm font-bold">{language === "zh" ? "内部资料智能问答" : "Internal Knowledge Q&A"}</div>
              <div className="text-[10px] font-mono opacity-70">
                {language === "zh" ? "私有知识库 · RAG 溯源" : "Private Knowledge · RAG Sources"}
              </div>
            </div>
          </button>

          <button
            onClick={() => setActiveTab("vision")}
            className={`flex items-center gap-3 px-6 py-3.5 rounded-2xl text-left border transition-all duration-300 cursor-pointer hover:-translate-y-0.5 active:translate-y-0 ${
              activeTab === "vision"
                ? "bg-gradient-to-r from-[#00B2FE] to-indigo-600 text-white border-transparent shadow-lg shadow-blue-500/15 font-semibold"
                : "bg-white dark:bg-[#060b19]/80 backdrop-blur-md text-slate-600 dark:text-slate-300 border-gray-150 dark:border-cyan-500/10 shadow-sm hover:bg-gray-50 dark:hover:bg-slate-900/50 hover:text-[#00B2FE] dark:hover:text-[#00B2FE]"
            }`}
          >
            <Shield className={`w-5 h-5 shrink-0 transition-colors ${activeTab === 'vision' ? 'text-white' : 'text-[#00B2FE]'}`} />
            <div>
              <div className="text-sm font-bold">{language === "zh" ? "视频巡检与异常提醒" : "Video Monitoring & Alerts"}</div>
              <div className="text-[10px] font-mono opacity-70">
                {language === "zh" ? "边缘分析 · 实时告警" : "Edge Analysis · Live Alerts"}
              </div>
            </div>
          </button>

          <button
            onClick={() => setActiveTab("ibms")}
            className={`flex items-center gap-3 px-6 py-3.5 rounded-2xl text-left border transition-all duration-300 cursor-pointer hover:-translate-y-0.5 active:translate-y-0 ${
              activeTab === "ibms"
                ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-transparent shadow-lg shadow-indigo-500/15 font-semibold"
                : "bg-white dark:bg-[#060b19]/80 backdrop-blur-md text-slate-600 dark:text-slate-300 border-gray-150 dark:border-cyan-500/10 shadow-sm hover:bg-gray-50 dark:hover:bg-slate-900/50 hover:text-purple-400 dark:hover:text-purple-400"
            }`}
          >
            <Building2 className={`w-5 h-5 shrink-0 transition-colors ${activeTab === 'ibms' ? 'text-white' : 'text-purple-400'}`} />
            <div>
              <div className="text-sm font-bold">{language === "zh" ? "楼宇节能与 AI+IBMS" : "Building Energy & AI+IBMS"}</div>
              <div className="text-[10px] font-mono opacity-70">
                {language === "zh" ? "空调优化 · 设备联动" : "HVAC Optimization · Device Linkage"}
              </div>
            </div>
          </button>
        </div>

        {/* Console Box Outer Frame */}
        <div className="p-8 rounded-[2rem] bg-white dark:bg-[#060b19]/85 backdrop-blur-md border border-gray-150 dark:border-cyan-500/15 shadow-[0_20px_50px_rgba(0,178,254,0.04)] overflow-hidden min-h-[550px] relative">
          
          <AnimatePresence mode="wait">
            
            {/* === RAG TAB === */}
            {activeTab === "rag" && (
              <motion.div
                key="rag"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8"
              >
                
                {/* RAG Controller panel */}
                <div className="lg:col-span-5 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-gray-150 pb-6 lg:pb-0 lg:pr-8">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-[#00F5A0]/10 text-[#00E5A3] font-bold font-mono border border-[#00F5A0]/20">CASE 01</span>
                      <span className="text-xs text-[#00B2FE] font-[#00B2FE] font-semibold">{language === "zh" ? "内部制度查询示例" : "Internal Policy Search Example"}</span>
                    </div>

                    <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-2.5">带来源的内部资料问答</h3>
                    <p className="text-xs text-slate-500 font-normal leading-relaxed mb-6">
                      把制度、手册和合同接入私有知识库，员工可直接提问。系统会先检索相关材料，再基于来源生成回答；高要求场景可加入 RAG、重排模型和离线部署。
                    </p>

                    {/* Pre-set questions selectors */}
                    <div className="space-y-2.5 mb-6">
                      <span className="block text-[10px] font-mono font-extrabold text-[#00B2FE] uppercase tracking-wider mb-2">选择一个示例问题</span>
                      {RAG_PRESETS.map((p, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleRagPresetSelect(idx)}
                          className={`w-full text-left p-2.5 rounded-xl text-xs transition-all duration-200 flex gap-2.5 items-start cursor-pointer ${
                            selectedRagPreset === idx && !customQuestion
                              ? "bg-[#00F5A0]/10 border border-[#00F5A0]/20 font-semibold text-[#00E5A3] shadow-sm"
                              : "bg-slate-55 bg-slate-50/50 hover:bg-slate-100 border border-gray-100 text-slate-600"
                          }`}
                        >
                          <FileText className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${selectedRagPreset === idx && !customQuestion ? 'text-[#00E5A3]' : 'text-slate-400'}`} />
                          <span className="font-sans leading-relaxed">{p.question}</span>
                        </button>
                      ))}
                    </div>

                    {/* Custom User Question Input */}
                    <div className="relative mb-4">
                      <input
                        type="text"
                        placeholder="也可以输入您关心的内部制度问题..."
                        value={customQuestion}
                        onChange={(e) => setCustomQuestion(e.target.value)}
                        className="w-full text-xs p-3 pr-10 rounded-xl bg-slate-50 border border-gray-150 outline-none text-slate-800 placeholder:text-slate-400 focus:border-[#00B2FE]/30 focus:bg-white transition-all font-sans"
                      />
                      <Search className="absolute right-3.5 top-3.5 w-4 h-4 text-slate-400" />
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={runRagQA}
                      disabled={ragState !== "idle" && ragState !== "completed"}
                      className="w-full py-3.5 bg-gradient-to-r from-[#00F5A0] to-[#00B2FE] text-slate-950 font-sans text-xs font-extrabold rounded-xl tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-cyan-500/10 hover:shadow-[0_0_15px_rgba(0,245,160,0.3)]"
                      id="rag-run-btn"
                    >
                      <Cpu className="w-4 h-4 text-slate-950 animate-pulse" />
                      <span>开始检索并生成回答</span>
                    </button>
                  </div>
                </div>

                {/* Simulated RAG Output Container */}
                <div className="lg:col-span-7 bg-slate-50/70 border border-gray-150 rounded-2xl p-5 text-slate-800 font-mono flex flex-col justify-between min-h-[420px] shadow-inner relative">
                  
                  {/* Console Header */}
                  <div className="border-b border-gray-200 pb-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 font-sans">
                      <span className="w-2 h-2 rounded-full bg-[#00F5A0] animate-pulse" />
                      <span className="text-[11px] font-bold text-slate-700">Yunjizhou LLM-RAG V3.4 Engine Control</span>
                    </div>
                    <span className="text-[9px] font-mono text-[#00E5A3] bg-[#00F5A0]/10 border border-[#00F5A0]/20 px-1.5 py-0.5 rounded font-bold">SECURE PIPELINE</span>
                  </div>

                  {/* Console Body showing matched fragments and generated answer */}
                  <div className="flex-1 overflow-y-auto py-4 space-y-4 max-h-[300px] text-[11px]">
                    
                    {/* Prompt Asked */}
                    <div className="text-[#00B2FE] flex items-start gap-2 font-sans">
                      <span className="text-slate-500 font-bold font-mono">QUESTION_INPUT &gt;</span>
                      <span className="text-xs font-semibold text-slate-800">
                        {customQuestion || RAG_PRESETS[selectedRagPreset].question}
                      </span>
                    </div>

                    {/* Step Processing Log */}
                    {ragSteps.length > 0 && (
                      <div className="space-y-1 bg-slate-100/60 p-3 rounded-xl border border-gray-150">
                        <span className="text-[#00B2FE] font-extrabold block mb-1">RAG PIPELINE STEPS LOGS:</span>
                        {ragSteps.map((step, sIdx) => {
                          let isLast = sIdx === ragSteps.length - 1;
                          return (
                            <div key={sIdx} className="flex gap-2 items-center text-[10px] text-slate-600">
                              {isLast && ragState !== "completed" ? (
                                <RefreshCw className="w-3 h-3 text-[#00E5A3] animate-spin shrink-0" />
                              ) : (
                                <CheckCircle className="w-3 h-3 text-emerald-500 shrink-0" />
                              )}
                              <span className="font-sans font-medium">{step}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Chunks Matched Visualization */}
                    {ragState !== "idle" && (
                      <div className="space-y-2 bg-slate-100/40 p-3 rounded-xl border border-gray-150">
                        <span className="text-indigo-600 font-extrabold block mb-1">VECTOR CHUNK RETRIEVED (VECTOR_INDEX):</span>
                        {customQuestion.trim() ? (
                          <div className="text-[10px] text-slate-500 leading-relaxed italic">
                            正在检索相似资料片段，本地向量检索会优先匹配更相关的内容...
                          </div>
                        ) : (
                          RAG_PRESETS[selectedRagPreset].matchedChunks.map((chunk, cIdx) => (
                            <div key={cIdx} className="p-2.5 bg-white rounded-lg text-[10px] border-l-3 border-[#00F5A0] shadow-sm">
                              <div className="flex justify-between text-slate-400 font-mono text-[9px] mb-0.5">
                                <span className="text-slate-600 font-mono font-bold truncate max-w-[200px]">{chunk.doc}</span>
                                <span className="text-[#00E5A3] shrink-0 font-bold">相似度: {chunk.score.toFixed(3)}</span>
                              </div>
                              <p className="text-slate-700 leading-relaxed font-sans font-medium">{chunk.content}</p>
                            </div>
                          ))
                        )}
                      </div>
                    )}

                    {/* Generative Text Stream */}
                    {ragOutput && (
                      <div className="text-slate-800 font-sans leading-relaxed text-xs p-3.5 bg-[#00F5A0]/5 border border-[#00F5A0]/15 rounded-xl">
                        <strong className="text-[#00E5A3] block font-extrabold mb-1.5">云极洲本地大模型回复（基于上方来源生成）：</strong>
                        <p className="whitespace-pre-line text-slate-700 font-medium">{ragOutput}</p>
                        {ragState !== "completed" && <span className="inline-block w-1.5 h-4 bg-[#00F5A0] ml-1 animate-pulse" />}
                      </div>
                    )}

                    <div ref={chatBottomRef} />
                  </div>

                  {/* Status footer inside console */}
                  <div className="border-t border-gray-200 pt-3 flex items-center justify-between text-[10px] text-slate-400">
                    <span className="font-bold">STATUS: {ragState.toUpperCase()}</span>
                    <span className="font-mono">MEMORY STATS: 12.8 GB / LOCAL ENG</span>
                  </div>

                </div>

              </motion.div>
            )}


            {/* === VISION TAB === */}
            {activeTab === "vision" && (
              <motion.div
                key="vision"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8"
              >
                
                {/* Vision Controller panel */}
                <div className="lg:col-span-5 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-8">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-blue-50 text-[#1890ff] font-bold font-mono border border-blue-100">CASE 02</span>
                      <span className="text-xs text-[#1890ff] font-semibold">重点区域视频巡检示例</span>
                    </div>

                    <h3 className="text-lg font-extrabold text-[#1f2329] dark:text-white mb-3">自动识别异常情况的视频巡检</h3>
                    <p className="text-xs text-slate-500 font-normal leading-relaxed mb-6 font-sans">
                      接入现有摄像头后，系统可对徘徊、跌倒、越界、拥堵等情况做自动提醒，减少人工长时间盯屏。对网络和安全要求高的场景，可在边缘设备本地分析视频流。
                    </p>

                    {/* Mode selector */}
                    <div className="space-y-2 mb-6">
                      <span className="block text-[10px] font-mono font-extrabold text-[#1890ff] uppercase tracking-wider mb-2.5">切换多场景异常检测演示</span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        <button
                          onClick={() => setVisionMode("patrol")}
                          className={`py-2 px-1 text-center rounded-lg text-xs font-semibold border cursor-pointer transition-all duration-200 ${
                            visionMode === "patrol"
                              ? "bg-blue-50 border-blue-200 text-[#1890ff] font-bold shadow-sm"
                              : "bg-slate-50 hover:bg-slate-100 border-gray-150 text-slate-600"
                          }`}
                        >
                          打架斗殴
                        </button>
                        <button
                          onClick={() => setVisionMode("interrogate")}
                          className={`py-2 px-1 text-center rounded-lg text-xs font-semibold border cursor-pointer transition-all duration-200 ${
                            visionMode === "interrogate"
                              ? "bg-blue-50 border-blue-200 text-[#1890ff] font-bold shadow-sm"
                              : "bg-slate-50 hover:bg-slate-100 border-gray-150 text-slate-600"
                          }`}
                        >
                          提审规范
                        </button>
                        <button
                          onClick={() => setVisionMode("loiter")}
                          className={`py-2 px-1 text-center rounded-lg text-xs font-semibold border cursor-pointer transition-all duration-200 ${
                            visionMode === "loiter"
                              ? "bg-blue-50 border-blue-200 text-[#1890ff] font-bold shadow-sm"
                              : "bg-slate-50 hover:bg-slate-100 border-gray-150 text-slate-600"
                          }`}
                        >
                          异常徘徊
                        </button>
                        <button
                          onClick={() => setVisionMode("fall")}
                          className={`py-2 px-1 text-center rounded-lg text-xs font-semibold border cursor-pointer transition-all duration-200 ${
                            visionMode === "fall"
                              ? "bg-blue-50 border-blue-200 text-[#1890ff] font-bold shadow-sm"
                              : "bg-slate-50 hover:bg-slate-100 border-gray-150 text-slate-600"
                          }`}
                        >
                          倒地撞墙
                        </button>
                        <button
                          onClick={() => setVisionMode("sleep")}
                          className={`py-2 px-1 text-center rounded-lg text-xs font-semibold border cursor-pointer transition-all duration-200 ${
                            visionMode === "sleep"
                              ? "bg-blue-50 border-blue-200 text-[#1890ff] font-bold shadow-sm"
                              : "bg-slate-50 hover:bg-slate-100 border-gray-150 text-slate-600"
                          }`}
                        >
                          脱岗睡岗
                        </button>
                        <button
                          onClick={() => setVisionMode("keyperson")}
                          className={`py-2 px-1 text-center rounded-lg text-[11px] font-semibold border cursor-pointer transition-all duration-200 ${
                            visionMode === "keyperson"
                              ? "bg-blue-50 border-blue-200 text-[#1890ff] font-bold shadow-sm"
                              : "bg-slate-50 hover:bg-slate-100 border-gray-150 text-slate-600"
                          }`}
                        >
                          重点人行为
                        </button>
                        <button
                          onClick={() => setVisionMode("bagdrift")}
                          className={`py-2 px-1 text-center rounded-lg text-[11px] font-semibold border cursor-pointer transition-all duration-200 ${
                            visionMode === "bagdrift"
                              ? "bg-blue-50 border-blue-200 text-[#1890ff] font-bold shadow-sm"
                              : "bg-slate-50 hover:bg-slate-100 border-gray-150 text-slate-600"
                          }`}
                        >
                          包分离进区
                        </button>
                        <button
                          onClick={() => setVisionMode("border")}
                           className={`py-2 px-1 text-center rounded-lg text-xs font-semibold border cursor-pointer transition-all duration-200 ${
                            visionMode === "border"
                              ? "bg-blue-50 border-blue-200 text-[#1890ff] font-bold shadow-sm"
                              : "bg-slate-50 hover:bg-slate-100 border-gray-150 text-slate-600"
                          }`}
                        >
                          周界防越
                        </button>
                        <button
                          onClick={() => setVisionMode("crowd")}
                          className={`py-2 px-1 text-center rounded-lg text-xs font-semibold border cursor-pointer transition-all duration-200 ${
                            visionMode === "crowd"
                              ? "bg-blue-50 border-blue-200 text-[#1890ff] font-bold shadow-sm"
                              : "bg-slate-50 hover:bg-slate-100 border-gray-150 text-slate-600"
                          }`}
                        >
                          高密拥堵
                        </button>
                      </div>
                    </div>

                    {/* Vision variables adjustment sliders */}
                    <div className="space-y-4 bg-white/[0.02] p-4 rounded-xl border border-white/5 mb-6">
                      <div>
                        <div className="flex justify-between text-xs text-slate-300 font-medium mb-1">
                        <span>告警敏感度 (Threshold)</span>
                          <span className="font-mono text-emerald-400">{threshold}%</span>
                        </div>
                        <input
                          type="range"
                          min="50"
                          max="95"
                          value={threshold}
                          onChange={(e) => setThreshold(Number(e.target.value))}
                          className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-300 font-medium">视频分析帧率</span>
                        <select
                          className="text-xs p-1 bg-slate-900 border border-white/10 rounded outline-none text-slate-300"
                          value={fps}
                          onChange={(e) => setFps(Number(e.target.value))}
                        >
                          <option value="15">15 FPS (低功耗)</option>
                          <option value="25">25 FPS (均衡)</option>
                          <option value="40">40 FPS (更实时)</option>
                        </select>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-300 font-medium">显示识别框 (Annotations)</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={isAnnotated}
                            onChange={(e) => setIsAnnotated(e.target.checked)}
                            className="sr-only peer" 
                          />
                          <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-600 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className={`flex-1 py-3.5 border text-xs font-bold rounded-xl tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                        isPlaying 
                          ? "bg-transparent border-gray-200 hover:bg-slate-50 text-slate-600" 
                          : "bg-gradient-to-r from-[#1890ff] to-[#40a9ff] border-transparent text-white shadow-md shadow-blue-500/15 hover:shadow-lg"
                      }`}
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="w-4 h-4 text-slate-500 shrink-0" />
                          <span>暂停演示</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 text-white shrink-0" />
                          <span>继续演示</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Simulated Vision Surveillance Monitor */}
                <div className="lg:col-span-7 flex flex-col gap-4">
                  
                  {/* Digital screen */}
                  <div id="vision-surveillance-screen" className="aspect-[16/10] bg-[#111625] rounded-2xl relative overflow-hidden flex flex-col justify-end border border-gray-150 shadow-lg shadow-[#1890ff]/5">
                    
                    {/* Top camera overlay info */}
                    <div className="absolute top-4 left-4 z-20 flex gap-2 items-center text-[10px] font-mono text-white/90 bg-indigo-950/75 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 shadow-sm">
                      <span className={`w-1.5 h-1.5 rounded-full bg-rose-500 ${isPlaying ? "animate-pulse" : ""}`} />
                      <span>CAM_302_MAIN_STREET</span>
                      <span>FPS: {fps}</span>
                    </div>

                    <div className="absolute top-4 right-4 z-20 text-[10px] font-mono text-white/90 bg-indigo-950/75 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 shadow-sm">
                      2026-06-12 LIVE
                    </div>

                    {/* Camera Feed Mock Graphic (Animated using pure elements or layered SVG illustration) */}
                    <div className="absolute inset-0 bg-slate-950 flex flex-row -z-0 pb-[42px]" id="vision-split-container">
                      {/* Left Side: Live Feed Container */}
                      <div className="flex-1 h-full relative overflow-hidden flex items-center justify-center bg-slate-950">
                      
                      {/* Grid background representing depth analysis mapping */}
                      <div className="absolute inset-0 bg-sky-950/[0.1] bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-40"></div>

                      {/* Scenario-specific Blueprint/Schematic Illustration (示意图) of every scenario function */}
                      {visionMode === "patrol" && (
                        <div className="absolute inset-0 opacity-20 pointer-events-none p-4 flex flex-col justify-between">
                          <svg className="w-full h-full" viewBox="0 0 400 240">
                            <path d="M 0,240 L 160,110 L 240,110 L 400,240 M 160,110 L 160,0 M 240,110 L 240,0" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" fill="none" />
                            <line x1="0" y1="180" x2="400" y2="180" stroke="rgba(239,68,68,0.15)" strokeWidth="1" strokeDasharray="4,4" />
                            <circle cx="150" cy="140" r="18" stroke="rgba(239,68,68,0.2)" strokeWidth="1" fill="none" className="animate-ping" />
                            <circle cx="230" cy="135" r="14" stroke="rgba(239,68,68,0.2)" strokeWidth="1" fill="none" />
                          </svg>
                        </div>
                      )}

                      {visionMode === "interrogate" && (
                        <div className="absolute inset-0 opacity-25 pointer-events-none p-4">
                          <div className="w-full h-full border border-sky-500/10 rounded flex flex-col items-center justify-center relative">
                            <div className="w-48 h-10 border border-sky-400/20 bg-sky-950/20 rounded flex items-center justify-around text-[6px] text-sky-400/40">
                              <span>办案人员席 01#</span>
                              <span>记录人员席 02#</span>
                            </div>
                            <div className="w-64 h-1 border-t border-emerald-500/40 my-5 flex items-center justify-center">
                              <span className="bg-slate-950 px-2 text-[5px] text-emerald-400/60 uppercase tracking-widest font-mono">物理软包隔离安全线: 3.2M</span>
                            </div>
                            <div className="w-16 h-10 border border-rose-500/30 bg-rose-950/10 rounded flex items-center justify-center text-[6px] text-rose-400/40">
                              在押人员席
                            </div>
                          </div>
                        </div>
                      )}

                      {visionMode === "loiter" && (
                        <div className="absolute inset-0 opacity-20 pointer-events-none p-4">
                          <svg className="w-full h-full" viewBox="0 0 400 240">
                            <path d="M 40,20 L 360,20 L 360,220 L 40,220 Z" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" fill="none" />
                            <path d="M 40,80 L 40,160" stroke="#f59e0b" strokeWidth="2.5" fill="none" />
                            <path d="M 100,120 Q 200,60 300,120 T 100,120" stroke="#eab308" strokeWidth="1.5" strokeDasharray="3,3" fill="none" className="animate-[dash_6s_linear_infinite]" />
                            <circle cx="200" cy="120" r="30" fill="rgba(234,179,8,0.05)" stroke="rgba(234,179,8,0.1)" strokeWidth="1" />
                            <text x="165" y="123" fill="rgba(234,179,8,0.4)" fontSize="6" fontFamily="monospace">CORRIDOR_DWELL_HOTSPOT</text>
                          </svg>
                        </div>
                      )}

                      {visionMode === "fall" && (
                        <div className="absolute inset-0 opacity-20 pointer-events-none p-4">
                          <svg className="w-full h-full" viewBox="0 0 400 240">
                            <path d="M 0,180 L 400,180 M 120,180 L 120,40 M 280,180 L 280,40" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" fill="none" />
                            <rect x="0" y="40" width="120" height="140" fill="rgba(239,68,68,0.01)" stroke="rgba(239,68,68,0.03)" />
                            <rect x="280" y="40" width="120" height="140" fill="rgba(239,68,68,0.01)" stroke="rgba(239,68,68,0.03)" />
                            <path d="M 120,100 L 135,85 L 135,115 Z" fill="rgba(220,38,38,0.2)" />
                            <line x1="120" y1="100" x2="180" y2="100" stroke="#ef4444" strokeWidth="1" strokeDasharray="2,2" />
                            <circle cx="120" cy="100" r="10" fill="none" stroke="#ef4444" strokeWidth="1.5" className="animate-ping" />
                          </svg>
                        </div>
                      )}

                      {visionMode === "sleep" && (
                        <div className="absolute inset-0 opacity-20 pointer-events-none p-4 flex items-center justify-center">
                          <svg className="w-[80%] h-[80%]" viewBox="0 0 300 180">
                            <rect x="50" y="20" width="200" height="100" rx="3" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
                            <line x1="10" y1="130" x2="290" y2="130" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                            <path d="M 130,160 L 170,160 M 150,160 L 150,130 M 120,90 L 180,90 L 170,130 L 130,130 Z M 130,60 L 170,60 L 170,85 L 130,85 Z" fill="none" stroke="#f97316" strokeWidth="1" strokeDasharray="3,2" />
                            <circle cx="150" cy="45" r="10" fill="none" stroke="rgba(249,115,22,0.15)" strokeWidth="1" />
                          </svg>
                        </div>
                      )}

                      {visionMode === "keyperson" && (
                        <div className="absolute inset-0 opacity-25 pointer-events-none p-4 flex items-center justify-center">
                          <svg className="w-full h-full" viewBox="0 0 400 240">
                            <path d="M 20,40 L 40,40 L 40,20 L 20,20 Z" stroke="#10b981" strokeWidth="1.5" fill="none" />
                            <path d="M 380,40 L 360,40 L 360,20 L 380,20 Z" stroke="#10b981" strokeWidth="1.5" fill="none" />
                            <path d="M 20,200 L 40,200 L 40,220 L 20,220 Z" stroke="#10b981" strokeWidth="1.5" fill="none" />
                            <path d="M 380,200 L 360,200 L 360,220 L 380,220 Z" stroke="#10b981" strokeWidth="1.5" fill="none" />
                            
                            <circle cx="200" cy="65" r="12" fill="rgba(16,185,129,0.1)" stroke="#10b981" strokeWidth="1.5" />
                            <line x1="200" y1="77" x2="200" y2="135" stroke="#10b981" strokeWidth="2" />
                            <line x1="170" y1="90" x2="230" y2="90" stroke="#10b981" strokeWidth="2" />
                            <line x1="170" y1="90" x2="150" y2="120" stroke="#10b981" strokeWidth="1.5" />
                            <line x1="150" y1="120" x2="165" y2="140" stroke="#f59e0b" strokeWidth="1.5" />
                            <line x1="230" y1="90" x2="255" y2="65" stroke="#ef4444" strokeWidth="2" />
                            <line x1="255" y1="65" x2="275" y2="40" stroke="#ef4444" strokeWidth="2" />
                            <circle cx="275" cy="40" r="4" fill="#ef4444" />
                            <line x1="180" y1="135" x2="220" y2="135" stroke="#10b981" strokeWidth="2" />
                            <line x1="180" y1="135" x2="175" y2="175" stroke="#10b981" strokeWidth="1.5" />
                            <line x1="175" y1="175" x2="185" y2="215" stroke="#10b981" strokeWidth="1.5" />
                            <line x1="220" y1="135" x2="225" y2="175" stroke="#10b981" strokeWidth="1.5" />
                            <line x1="225" y1="175" x2="215" y2="215" stroke="#10b981" strokeWidth="1.5" />
                            <text x="210" y="83" fill="#10b981" fontSize="6" fontFamily="monospace">SHOULDER_R_ANGLE: 135°</text>
                            <text x="210" y="93" fill="#ef4444" fontSize="6" fontFamily="monospace" className="animate-pulse">WARNING: POSE_EXTREME</text>
                          </svg>
                        </div>
                      )}

                      {visionMode === "bagdrift" && (
                        <div className="absolute inset-0 opacity-20 pointer-events-none p-4">
                          <svg className="w-full h-full" viewBox="0 0 400 240">
                            <line x1="80" y1="40" x2="80" y2="200" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                            <line x1="320" y1="40" x2="320" y2="200" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                            
                            <circle cx="130" cy="90" r="10" fill="none" stroke="#10b981" strokeWidth="1.5" />
                            <line x1="130" y1="100" x2="130" y2="150" stroke="#10b981" strokeWidth="1.5" />
                            
                            <rect x="260" y="155" width="26" height="18" rx="2" fill="none" stroke="#ef4444" strokeWidth="1.5" />
                            <path d="M 268,155 Q 273,148 278,155" fill="none" stroke="#ef4444" strokeWidth="1.5" />
                            
                            <line x1="130" y1="150" x2="260" y2="164" stroke="#eab308" strokeWidth="1" strokeDasharray="3,3" />
                            <text x="165" y="145" fill="#eab308" fontSize="7" fontFamily="monospace">SEPARATION: 5.8m</text>
                          </svg>
                        </div>
                      )}

                      {visionMode === "border" && (
                        <div className="absolute inset-0 opacity-20 pointer-events-none p-4">
                          <svg className="w-full h-full" viewBox="0 0 400 240">
                            <path d="M 0,40 L 400,40 M 0,80 L 400,80 M 0,120 L 400,120 M 0,160 L 400,160 M 0,200 L 400,200" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                            <path d="M 50,0 L 50,240 M 100,0 L 100,240 M 150,0 L 150,240 M 200,0 L 200,240 M 255,0 L 255,240 M 310,0 L 310,240 M 365,0 L 365,240" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                            <line x1="0" y1="140" x2="400" y2="140" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,2" />
                          </svg>
                        </div>
                      )}

                      {visionMode === "crowd" && (
                        <div className="absolute inset-0 opacity-20 pointer-events-none p-4 flex items-center justify-center">
                          <svg className="w-full h-full" viewBox="0 0 400 240">
                            <circle cx="200" cy="120" r="60" fill="rgba(245,158,11,0.04)" stroke="rgba(245,158,11,0.1)" strokeWidth="1" />
                            <circle cx="210" cy="115" r="40" fill="rgba(239,68,68,0.04)" stroke="rgba(239,68,68,0.1)" strokeWidth="1.5" />
                            <circle cx="205" cy="110" r="15" fill="rgba(220,38,38,0.06)" className="animate-pulse" />
                            <text x="175" y="112" fill="#ef4444" fontSize="7" fontFamily="monospace" className="font-bold">CONGESTION CORE</text>
                          </svg>
                        </div>
                      )}

                      {/* Mock targets on scene */}
                      <AnimatePresence>
                        {isAnnotated && isPlaying && (
                          <>
                            {visionMode === "patrol" && (
                              <div className="absolute w-full h-full">
                                {/* Attacker Tag Mock */}
                                <div className="absolute top-[28%] left-[25%] border-2 border-red-500 rounded-sm px-2 py-1 text-red-300 font-mono text-[9px] bg-red-950/25 select-none animate-pulse">
                                  <div className="absolute -top-4 -left-0.5 bg-red-600 text-white text-[8px] px-1 font-bold rounded">
                                    VIOLENT_FIGHT: 96%
                                  </div>
                                  <div className="w-20 h-32 border border-red-400/40"></div>
                                </div>

                                {/* Target/Defender Tag Mock */}
                                <div className="absolute top-[26%] left-[48%] border-2 border-red-500 rounded-sm px-2 py-1 text-red-300 font-mono text-[9px] bg-red-950/25 select-none animate-pulse">
                                  <div className="absolute -top-4 -left-0.5 bg-red-600 text-white text-[8px] px-1 font-bold rounded">
                                    BRAWL_AGGRESSION: 94%
                                  </div>
                                  <div className="w-18 h-32 border border-red-400/40"></div>
                                </div>
                              </div>
                            )}

                            {visionMode === "interrogate" && (
                              <div className="absolute w-full h-full">
                                {/* Interrogator 1 Tag */}
                                <div className="absolute top-[25%] left-[10%] border border-blue-400 rounded-sm px-1.5 py-0.5 text-blue-300 font-mono text-[8px] bg-blue-950/20 select-none">
                                  <div className="absolute -top-3.5 left-0 bg-blue-600 text-white text-[7px] px-0.5 rounded">
                                    OFFICER_01: 99%
                                  </div>
                                  <div className="w-14 h-24 border border-blue-300/20"></div>
                                </div>

                                {/* Interrogator 2 Tag */}
                                <div className="absolute top-[25%] left-[30%] border border-blue-400 rounded-sm px-1.5 py-0.5 text-blue-300 font-mono text-[8px] bg-blue-950/20 select-none">
                                  <div className="absolute -top-3.5 left-0 bg-blue-600 text-white text-[7px] px-0.5 rounded">
                                    RECORDING_OFFICER: 97%
                                  </div>
                                  <div className="w-14 h-24 border border-blue-300/20"></div>
                                </div>

                                {/* Prisoner Tag */}
                                <div className="absolute top-[32%] right-[20%] border-2 border-emerald-500 rounded-sm px-2 py-1 text-emerald-300 font-mono text-[8px] bg-emerald-950/20 select-none">
                                  <div className="absolute -top-4 -left-0.5 bg-emerald-600 text-white text-[7px] px-1 font-bold rounded">
                                    DETAINEE_OK: 95%
                                  </div>
                                  <div className="w-16 h-28 border border-emerald-400/35"></div>
                                </div>

                                {/* Compliance Info panel overlay */}
                                <div className="absolute bottom-12 left-4 p-2 bg-slate-900/90 border border-blue-500/30 rounded text-[8px] font-mono whitespace-pre text-sky-400 leading-tight select-none">
                                  [提审规范实时自检]<br />
                                  双人在场 / 录播同步: OK<br />
                                  人机物理距离: 3.2m (合规)<br />
                                  安全防护护栏触碰度: 0%
                                </div>
                              </div>
                            )}

                            {visionMode === "loiter" && (
                              <div className="absolute w-full h-full">
                                {/* Loitering Tag Mock */}
                                <div className="absolute top-[35%] left-[35%] border-2 border-yellow-500 rounded-sm px-2 py-1 text-yellow-300 font-mono text-[9px] bg-yellow-950/25 select-none animate-pulse">
                                  <div className="absolute -top-4 -left-0.5 bg-yellow-600 text-white text-[8px] px-1 font-bold rounded">
                                    SUSPICIOUS_LOITER: 91%
                                  </div>
                                  <div className="w-18 h-32 border border-yellow-400/40"></div>
                                  <span className="absolute bottom-1 right-1 text-[7px] text-yellow-400 font-sans shadow">徘徊: 142秒</span>
                                </div>
                              </div>
                            )}

                            {visionMode === "fall" && (
                              <div className="absolute w-full h-full">
                                {/* Fall Tag Mock */}
                                <div className="absolute top-[50%] left-[30%] rotate-12 border-2 border-red-600 rounded-sm px-2 py-1 text-red-300 font-mono text-[9px] bg-red-950/40 select-none animate-pulse">
                                  <div className="absolute -top-4 -left-0.5 bg-red-700 text-white text-[8px] px-1 font-bold rounded">
                                    BODY_FALL_WALL_COLLISION: 99%
                                  </div>
                                  <div className="w-36 h-16 border border-red-400/40"></div>
                                </div>
                              </div>
                            )}

                            {visionMode === "sleep" && (
                              <div className="absolute w-full h-full">
                                {/* Sleeping/Absence Tag Mock */}
                                <div className="absolute top-[30%] left-[40%] border-2 border-orange-500 rounded-sm px-2 py-1 text-orange-300 font-mono text-[9px] bg-orange-950/25 select-none animate-pulse">
                                  <div className="absolute -top-4 -left-0.5 bg-orange-600 text-white text-[8px] px-1 font-bold rounded">
                                    OFF_POST_OR_SLEEPING: 93%
                                  </div>
                                  <div className="w-24 h-24 border border-orange-400/30"></div>
                                  <span className="absolute bottom-1 right-1 text-[7px] text-orange-400 font-sans shadow">静止: 21分</span>
                                </div>
                              </div>
                            )}

                            {visionMode === "border" && (
                              <div className="absolute w-full h-full">
                                {/* Safe zone border line overlay */}
                                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                                  <line x1="10%" y1="70%" x2="90%" y2="50%" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="6,4" className="animate-[dash_10s_linear_infinite]" />
                                  <text x="50%" y="64%" fill="#ef4444" fontSize="10" fontFamily="monospace" className="font-bold fill-rose-500 bg-black">
                                    !! ALERT RANGE D04 TRIGGER WIRE (公安防区线) !!
                                  </text>
                                </svg>
                                
                                {/* Violator Tag */}
                                <div className="absolute top-[35%] left-[45%] border-2 border-rose-500 rounded px-2 py-1 text-rose-300 font-mono text-[9px] bg-rose-950/40 animate-bounce select-none">
                                  <div className="absolute -top-4 -left-0.5 bg-rose-600 text-white text-[8px] px-1 font-bold rounded flex items-center gap-1">
                                    <AlertCircle className="w-2.5 h-2.5" />
                                    <span>INTRUDER ALERT: 94.7%</span>
                                  </div>
                                  <div className="w-14 h-28 border border-rose-400/40"></div>
                                </div>
                              </div>
                            )}

                            {visionMode === "crowd" && (
                              <div className="absolute w-full h-full">
                                {/* Crowded block matrix simulation */}
                                <div className="absolute top-[20%] left-[30%] w-60 h-44 border-2 border-amber-400 bg-amber-900/10 rounded flex items-center justify-center">
                                  <div className="absolute -top-4 left-0 bg-amber-500 text-white font-mono text-[8px] px-1 font-bold rounded">
                                    DENSITY EXCEED: ACCUMULATED
                                  </div>
                                  <div className="grid grid-cols-4 gap-2 opacity-60">
                                    {[...Array(12)].map((_, i) => (
                                      <div key={i} className="w-6 h-6 rounded-full bg-amber-400/20 border border-amber-300 flex items-center justify-center text-[7px] text-amber-200">
                                        P_D
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                
                                <div className="absolute bottom-6 right-6 p-2 bg-slate-900/80 border border-amber-500/20 rounded text-[9px] font-mono text-amber-400 animate-pulse">
                                  当前预测拥挤度: {(occupancy * 1.3).toFixed(0)}人/监测区(阈值超发)
                                </div>
                              </div>
                            )}

                            {visionMode === "keyperson" && (
                              <div className="absolute w-full h-full">
                                {/* High precision target indicator card */}
                                <div className="absolute top-[20%] left-[38%] border border-emerald-500 rounded-sm px-1.5 py-0.5 text-emerald-300 font-mono text-[7px] bg-emerald-950/20 select-none">
                                  <div className="absolute -top-3.5 -left-0.5 bg-emerald-600 text-white text-[7px] px-1 font-bold rounded flex items-center gap-1">
                                    重点在押人员 (SPECIAL_0409)
                                  </div>
                                  <div className="w-[100px] h-[145px] border border-emerald-400/35"></div>
                                  <span className="absolute bottom-1 right-1 text-[7px] text-red-400 animate-pulse font-mono">攀爬预警触发</span>
                                </div>
                                
                                <div className="absolute bottom-12 right-4 p-2 bg-slate-900/95 border border-emerald-500/30 rounded text-[8px] font-mono whitespace-pre text-emerald-400 leading-tight select-none">
                                  [重心位移实时测算评分]<br />
                                  双臂张角: 112度 (异常)<br />
                                  足部距地高程: 0.82m (在床沿)<br />
                                  肢体剧烈等级: MID_HIGH
                                </div>
                              </div>
                            )}

                            {visionMode === "bagdrift" && (
                              <div className="absolute w-full h-full">
                                {/* Owner box */}
                                <div className="absolute top-[22%] left-[24%] border border-emerald-400 rounded-sm px-1 py-0.5 text-emerald-300 font-mono text-[7px] bg-emerald-950/10">
                                  <div className="absolute -top-3 left-0 bg-emerald-600 text-white text-[6px] px-0.5 rounded">
                                    本位人 OK (ID:902)
                                  </div>
                                  <div className="w-16 h-32 border border-emerald-300/20"></div>
                                </div>

                                {/* Unattended Luggage box */}
                                <div className="absolute top-[60%] right-[25%] border-2 border-red-600 rounded-sm px-1.5 py-0.5 text-red-300 font-mono text-[8px] bg-red-950/20 animate-pulse">
                                  <div className="absolute -top-3.5 left-0 bg-red-700 text-white text-[7px] px-1 font-medium rounded">
                                    ALERT: 人包分离 (ABANDONED_OBJECT)
                                  </div>
                                  <div className="w-[110px] h-[45px] border border-red-400/40"></div>
                                </div>

                                <div className="absolute top-14 left-4 p-2 bg-slate-900/90 border border-red-500/30 rounded text-[7px] font-mono text-red-400 leading-normal select-none">
                                  [防区违禁品隔离警报]<br />
                                  人包直线距离: 6.4 米 (危型 &gt; 2m)<br />
                                  静止无主时长: 15.2 秒 (高危)
                                </div>
                              </div>
                            )}
                          </>
                        )}
                        
                        {!isPlaying && (
                          <div className="absolute text-center select-none text-slate-500 text-xs font-mono">
                            <span className="block border border-slate-700 px-3 py-1.5 rounded-lg bg-slate-900 text-slate-300">
                              Surveillance Feed Paused / 视频流检测已挂起
                            </span>
                          </div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Right Side: Space Sensing Topology Diagram (35% width, 220px) */}
                    <div className="w-[220px] hidden md:flex h-full bg-slate-900 border-l border-white/5 flex-col justify-between p-3 select-none text-slate-400 font-mono relative overflow-y-auto" id="vision-topology-panel">
                      <div className="space-y-3">
                        {/* Title Banner */}
                        <div className="flex justify-between items-center border-b border-white/5 pb-1.5 shrink-0">
                          <span className="text-[9px] text-slate-300 font-bold uppercase tracking-wider flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                            感知空间示意图
                          </span>
                          <span className="text-[7.5px] bg-emerald-950 text-emerald-400 border border-emerald-500/20 px-1 py-0.2 rounded font-mono">
                            TOPOLOGYMAP
                          </span>
                        </div>

                        {/* Dynamic Topological Description and SVGs for each state */}
                        <div>
                          {visionMode === "patrol" && (
                            <div className="space-y-2.5">
                              <div className="text-[8px] text-slate-400 leading-relaxed font-sans">
                                提取及计算图像中双人或多人骨骼关节点的瞬时加速度与牵扯拉力，通过突变特征识别剧烈搏斗与拉扯冲突。
                              </div>
                              <div className="p-1 px-[1.5px] border border-white/5 rounded bg-slate-950/40">
                                <svg className="w-full h-[95px]" viewBox="0 0 200 120">
                                  <line x1="0" y1="100" x2="200" y2="100" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                                  <path d="M 0,100 Q 30,100 40,80 T 60,110 T 80,40 T 100,100 T 130,100 T 150,20 T 170,110 T 200,100" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="2,1" />
                                  <circle cx="80" cy="40" r="3" fill="#ef4444" />
                                  <circle cx="150" cy="20" r="3" fill="#ef4444" className="animate-ping" />
                                  <text x="10" y="20" fill="#ef4444" className="text-[7px]">DETECT_FIGHT: 96%</text>
                                  <path d="M 100,5 L 180,95 L 20,95 Z" fill="rgba(56,189,248,0.02)" stroke="rgba(56,189,248,0.1)" strokeWidth="0.5" />
                                </svg>
                              </div>
                              <div className="space-y-1 text-[7.5px] text-slate-400 border-t border-white/5 pt-2">
                                <div className="flex justify-between"><span>碰撞加速度 Accel:</span><span className="text-rose-400">8.4 m/s² (过阀)</span></div>
                                <div className="flex justify-between"><span>警示输出 Status:</span><span className="text-rose-400">打架斗殴报警</span></div>
                              </div>
                            </div>
                          )}

                          {visionMode === "interrogate" && (
                            <div className="space-y-2.5">
                              <div className="text-[8px] text-slate-400 leading-relaxed font-sans">
                                三维重构办案人与嫌疑人桌椅间距。依据司法部监区提审、讯问规范，物理隔离安全距离须不低于3.0米。
                              </div>
                              <div className="p-1 px-[1.5px] border border-white/5 rounded bg-slate-950/40">
                                <svg className="w-full h-[95px]" viewBox="0 0 200 120">
                                  <rect x="25" y="15" width="150" height="90" rx="4" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                                  <rect x="45" y="30" width="110" height="15" rx="1" fill="rgba(56,189,248,0.1)" stroke="rgba(56,189,248,0.3)" />
                                  <circle cx="70" cy="22" r="4" fill="#38bdf8" />
                                  <circle cx="130" cy="22" r="4" fill="#38bdf8" />
                                  <line x1="25" y1="65" x2="175" y2="65" stroke="#10b981" strokeWidth="1" strokeDasharray="3,3" />
                                  <rect x="85" y="80" width="30" height="15" rx="1" fill="rgba(239,68,68,0.1)" stroke="#ef4444" strokeWidth="1" />
                                  <circle cx="100" cy="88" r="3" fill="#ef4444" />
                                  <text x="30" y="11.5" fill="#38bdf8" className="text-[6px]">ZONE_INTER_02 (3.2m SAFE)</text>
                                </svg>
                              </div>
                              <div className="space-y-1 text-[7.5px] text-slate-400 border-t border-white/5 pt-2">
                                <div className="flex justify-between"><span>安全间距 Dist:</span><span className="text-emerald-400">3.2 米 (合规)</span></div>
                                <div className="flex justify-between"><span>审讯警力 Officers:</span><span className="text-emerald-400">2名在监 (合规)</span></div>
                              </div>
                            </div>
                          )}

                          {visionMode === "loiter" && (
                            <div className="space-y-2.5">
                              <div className="text-[8px] text-slate-400 leading-relaxed font-sans">
                                监测重点禁入走廊、死角、围栏旁的未授权人员停留。基于轨迹的时间累加器，单次滞留超120秒即触发。
                              </div>
                              <div className="p-1 px-[1.5px] border border-white/5 rounded bg-slate-950/40">
                                <svg className="w-full h-[95px]" viewBox="0 0 200 120">
                                  <path d="M 20,20 L 160,20 L 180,100 L 40,100 Z" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                                  <circle cx="100" cy="60" r="25" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2,2" />
                                  <circle cx="100" cy="60" r="12" fill="rgba(245,158,11,0.08)" stroke="#f59e0b" strokeWidth="1" className="animate-ping" />
                                  <path d="M 30,40 Q 150,30 110,70 T 80,90" fill="none" stroke="#eab308" strokeWidth="1.2" />
                                  <text x="25" y="15" fill="#f59e0b" className="text-[6px]">DWELL_HOTSPOT: #301</text>
                                </svg>
                              </div>
                              <div className="space-y-1 text-[7.5px] text-slate-400 border-t border-white/5 pt-2">
                                <div className="flex justify-between"><span>滞留时间 Duration:</span><span className="text-amber-400">142秒 (超时未走)</span></div>
                                <div className="flex justify-between"><span>滞留标签 Event Type:</span><span className="text-amber-400">异常徘徊报警</span></div>
                              </div>
                            </div>
                          )}

                          {visionMode === "fall" && (
                            <div className="space-y-2.5">
                              <div className="text-[8px] text-slate-400 leading-relaxed font-sans">
                                监测在押人员躺卧不起、极严重撞击墙面自残等恶性动作行为。重心高度及肢体夹角异常、速率突变时即触发。
                              </div>
                              <div className="p-1 px-[1.5px] border border-white/5 rounded bg-slate-950/40">
                                <svg className="w-full h-[95px]" viewBox="0 0 200 120">
                                  <line x1="10" y1="100" x2="190" y2="100" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                                  <path d="M 60,100 A 40,40 0 0,1 140,100" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" strokeDasharray="3,1" />
                                  <line x1="100" y1="100" x2="145" y2="92" stroke="#ef4444" strokeWidth="1.5" />
                                  <circle cx="145" cy="92" r="3" fill="#ef4444" />
                                  <path d="M 100,100 A 15,15 0 0,1 114,98 Z" fill="none" stroke="#ef4444" strokeWidth="1" />
                                  <text x="115" y="85" fill="#ef4444" className="text-[7px]">ALPHA: 11° (LOW)</text>
                                </svg>
                              </div>
                              <div className="space-y-1 text-[7.5px] text-slate-400 border-t border-white/5 pt-2">
                                <div className="flex justify-between"><span>体位偏角 Angle:</span><span className="text-rose-500">11° (极度倾侧)</span></div>
                                <div className="flex justify-between"><span>诊断判意 Reason:</span><span className="text-rose-500">倒地撞墙自残警示</span></div>
                              </div>
                            </div>
                          )}

                          {visionMode === "sleep" && (
                            <div className="space-y-2.5">
                              <div className="text-[8px] text-slate-400 leading-relaxed font-sans">
                                值勤民警及看守值班专属岗度微息感应。一旦看守人在值守座圈长时静态呼吸特征归零即视为睡岗。
                              </div>
                              <div className="p-1 px-[1.5px] border border-white/5 rounded bg-slate-950/40">
                                <svg className="w-full h-[95px]" viewBox="0 0 200 120">
                                  <rect x="75" y="30" width="50" height="50" rx="3" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                                  <circle cx="100" cy="55" r="28" fill="rgba(249,115,22,0.06)" stroke="#f97316" strokeWidth="0.5" strokeDasharray="3,3" />
                                  <path d="M 85,90 Q 100,45 100,25" fill="none" stroke="rgba(249,115,22,0.3)" strokeWidth="1.2" />
                                  <line x1="20" y1="100" x2="180" y2="100" stroke="#f97316" strokeWidth="1" />
                                  <text x="15" y="15" fill="#f97316" className="text-[6px]">WATCH_DUTY: 02# [STATIC]</text>
                                </svg>
                              </div>
                              <div className="space-y-1 text-[7.5px] text-slate-400 border-t border-white/5 pt-2">
                                <div className="flex justify-between"><span>微振频次 Freq:</span><span className="text-orange-400">0.05 Hz (静态特征)</span></div>
                                <div className="flex justify-between"><span>脱岗判定 Event:</span><span className="text-orange-400">脱岗睡岗预报警</span></div>
                              </div>
                            </div>
                          )}

                          {visionMode === "keyperson" && (
                            <div className="space-y-2.5">
                              <div className="text-[8px] text-slate-400 leading-relaxed font-sans">
                                针对特级监管在押人员实施持续高精度的骨格关节点重构，及时发现反常跨高、越床攀爬等越狱意图。
                              </div>
                              <div className="p-1 px-[1.5px] border border-white/5 rounded bg-slate-950/40">
                                <svg className="w-full h-[95px]" viewBox="0 0 200 120">
                                  <circle cx="100" cy="30" r="8" fill="none" stroke="#10b981" strokeWidth="1.2" />
                                  <line x1="100" y1="38" x2="100" y2="70" stroke="#10b981" strokeWidth="1.5" />
                                  <line x1="100" y1="45" x2="60" y2="25" stroke="#ef4444" strokeWidth="1.2" />
                                  <line x1="60" y1="25" x2="45" y2="10" stroke="#ef4444" strokeWidth="1.2" />
                                  <circle cx="45" cy="10" r="2.5" fill="#ef4444" className="animate-ping" />
                                  <line x1="100" y1="45" x2="135" y2="55" stroke="#10b981" strokeWidth="1.2" />
                                  <line x1="135" y1="55" x2="150" y2="75" stroke="#10b981" strokeWidth="1.2" />
                                  <line x1="100" y1="70" x2="80" y2="105" stroke="#10b981" strokeWidth="1.2" />
                                  <line x1="100" y1="70" x2="120" y2="105" stroke="#10b981" strokeWidth="1.2" />
                                  <text x="15" y="15" fill="#10b981" className="text-[6px]">KEYPERSON pose map (#0409)</text>
                                </svg>
                              </div>
                              <div className="space-y-1 text-[7.5px] text-slate-400 border-t border-white/5 pt-2">
                                <div className="flex justify-between"><span>对象评级 Level:</span><span className="text-emerald-400">一级防控重点人行为</span></div>
                                <div className="flex justify-between"><span>姿态遥测 Telemetry:</span><span className="text-emerald-400">重点人行为监控报警</span></div>
                              </div>
                            </div>
                          )}

                          {visionMode === "bagdrift" && (
                            <div className="space-y-2.5">
                              <div className="text-[8px] text-slate-400 leading-relaxed font-sans">
                                监区通道及高敏过渡禁区防护。重点捕获人与随身携带包袋的动态剥离，超过2米即拉起人包分离警报。
                              </div>
                              <div className="p-1 px-[1.5px] border border-white/5 rounded bg-slate-950/40">
                                <svg className="w-full h-[95px]" viewBox="0 0 200 120">
                                  <rect x="25" y="20" width="150" height="80" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                                  <circle cx="50" cy="55" r="6" fill="#10b981" />
                                  <circle cx="50" cy="55" r="14" fill="none" stroke="#10b981" strokeWidth="0.5" strokeDasharray="2,2" />
                                  <rect x="140" y="50" width="14" height="10" rx="1" fill="none" stroke="#ef4444" strokeWidth="1.2" className="animate-pulse" />
                                  <circle cx="147" cy="55" r="18" fill="none" stroke="#ef4444" strokeWidth="0.5" />
                                  <line x1="56" y1="55" x2="138" y2="55" stroke="#eab308" strokeWidth="1.2" strokeDasharray="3,2" />
                                  <text x="65" y="48" fill="#eab308" className="text-[6px]">GAP: 6.4m (&gt;2.0m ALERT)</text>
                                </svg>
                              </div>
                              <div className="space-y-1 text-[7.5px] text-slate-400 border-t border-white/5 pt-2">
                                <div className="flex justify-between"><span>随包距离 Dist:</span><span className="text-rose-400">6.4 米 (危急阈过)</span></div>
                                <div className="flex justify-between"><span>场景描述 Zone:</span><span className="text-rose-400">包分离进监区报警</span></div>
                              </div>
                            </div>
                          )}

                          {visionMode === "border" && (
                            <div className="space-y-2.5">
                              <div className="text-[8px] text-slate-400 leading-relaxed font-sans">
                                高精电子防线及高墙红外入侵网。毫秒级提取接触目标、跨越跨高速度向量并自动输出警告并联动阻断反制。
                              </div>
                              <div className="p-1 px-[1.5px] border border-white/5 rounded bg-slate-950/40">
                                <svg className="w-full h-[95px]" viewBox="0 0 200 120">
                                  <line x1="20" y1="85" x2="180" y2="55" stroke="#ef4444" strokeWidth="2" className="animate-pulse" />
                                  <line x1="100" y1="70" x2="100" y2="20" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="2,2" />
                                  <ellipse cx="100" cy="70" rx="14" ry="14" fill="rgba(239,68,68,0.08)" stroke="#ef4444" strokeWidth="1" strokeDasharray="1,1" />
                                  <line x1="80" y1="70" x2="120" y2="70" stroke="#ef4444" strokeWidth="0.8" />
                                  <line x1="100" y1="50" x2="100" y2="90" stroke="#ef4444" strokeWidth="0.8" />
                                  <text x="15" y="15" fill="#ef4444" className="text-[6px]">LASER_BEAM_BREACH</text>
                                </svg>
                              </div>
                              <div className="space-y-1 text-[7.5px] text-slate-400 border-t border-white/5 pt-2">
                                <div className="flex justify-between"><span>击穿通道 Channel:</span><span className="text-rose-500">周界电网B通道</span></div>
                                <div className="flex justify-between"><span>警示响应 Level:</span><span className="text-rose-500">毫秒电网击穿告警</span></div>
                              </div>
                            </div>
                          )}

                          {visionMode === "crowd" && (
                            <div className="space-y-2.5">
                              <div className="text-[8px] text-slate-400 leading-relaxed font-sans">
                                实时统计公用通道及放风活动场等高密积聚。预防多人扎堆、暴力集聚等倾向，即时反馈通告。
                              </div>
                              <div className="p-1 px-[1.5px] border border-white/5 rounded bg-slate-950/40">
                                <svg className="w-full h-[95px]" viewBox="0 0 200 120">
                                  <polygon points="100,20 140,40 140,80 100,100 60,80 60,40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                                  <circle cx="100" cy="60" r="30" fill="rgba(239,68,68,0.12)" stroke="#ef4444" strokeWidth="1" />
                                  <circle cx="95" cy="55" r="1.5" fill="white" />
                                  <circle cx="108" cy="62" r="1.5" fill="white" />
                                  <circle cx="102" cy="70" r="1.5" fill="white" />
                                  <circle cx="88" cy="65" r="1.5" fill="white" />
                                  <circle cx="112" cy="52" r="1.5" fill="white" />
                                </svg>
                              </div>
                              <div className="space-y-1 text-[7.5px] text-slate-400 border-t border-white/5 pt-2">
                                <div className="flex justify-between"><span>拥挤度 Count:</span><span className="text-amber-400">{(occupancy * 1.3).toFixed(0)} 人 (报警值)</span></div>
                                <div className="flex justify-between"><span>状态诊断 Index:</span><span className="text-amber-400">重度受阻/建议疏导</span></div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Bottom metrics label inside schematic panel */}
                      <div className="shrink-0 pt-2 border-t border-white/5 text-[7.5px] text-slate-500 uppercase flex justify-between items-center bg-slate-950/40 py-1.5 px-2 rounded mt-2 select-none">
                        <span>MATRIX VER: V2.10</span>
                        <span>ACTIVE SCAN</span>
                      </div>
                    </div>

                  </div>

                    {/* Operational controls bottom overlay */}
                    <div className="relative z-10 w-full bg-[#121626] text-[#93c5fd] p-3 flex justify-between items-center text-xs border-t border-white/10 font-mono rounded-b-2xl">
                      <span className="text-[#38bdf8] flex items-center gap-1.5 font-bold">
                        <span className="w-1.5 h-1.5 bg-[#1890ff] rounded-full animate-ping" />
                        INFERENCE ACTIVE / EDGE NODES 102
                      </span>
                      <span className="font-semibold text-slate-400">INFERENCE LATENCY: {(12 + (40 - fps) * 0.2).toFixed(1)}ms</span>
                    </div>

                  </div>

                  {/* Logs box */}
                  <div className="bg-slate-50 rounded-2xl p-4 min-h-[125px] font-mono text-[10px] text-slate-700 border border-gray-150">
                    <span className="text-[#1890ff] block font-extrabold mb-2 uppercase tracking-wide">智能安防实时决策情报流:</span>
                    <div className="space-y-1.5 max-h-[85px] overflow-y-auto font-sans text-slate-500 font-medium">
                      {visionLogs.map((log, lIdx) => (
                        <div key={lIdx} className="flex gap-2">
                          <span className="text-slate-400 text-[9px] shrink-0 font-mono select-none">{log.split(" ")[0]}</span>
                          <span className="text-xs text-slate-700 select-all font-mono leading-relaxed">{log.substring(log.indexOf(" ") + 1)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </motion.div>
            )}


            {/* === IBMS TAB === */}
            {activeTab === "ibms" && (
              <motion.div
                key="ibms"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8"
              >
                
                {/* IBMS Controller panel */}
                <div className="lg:col-span-5 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-gray-150 pb-6 lg:pb-0 lg:pr-8">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-purple-50 text-[#722ed1] font-bold font-mono border border-purple-100">CASE 03</span>
                      <span className="text-xs text-[#722ed1] font-semibold font-sans">楼宇节能与设备联动示例</span>
                    </div>

                    <h3 className="text-lg font-extrabold text-[#1f2329] dark:text-white mb-3">AI+IBMS 楼宇节能与联动控制</h3>
                    <p className="text-xs text-slate-500 font-normal leading-relaxed mb-6">
                      根据人流、天气和设备状态动态调整空调运行，帮助降低能耗。遇到火警、入侵等事件时，可联动 IBMS、门禁、电梯、广播和导引屏，形成统一响应。
                    </p>

                    {/* Integrated security linkage dispatch panel */}
                    <div className="p-4 rounded-xl border border-rose-500/25 bg-rose-500/5 mb-6">
                      <div className="flex items-center gap-2 mb-2.5">
                        <Shield className="w-4 h-4 text-rose-500 animate-pulse" />
                        <span className="text-xs font-extrabold text-[#1f2329] dark:text-rose-400">跨系统联动演练面板</span>
                      </div>
                      
                      {securityStatus === "normal" ? (
                        <div className="text-[11px] text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 p-2 rounded border border-emerald-500/20 mb-3 flex items-center gap-1.5 font-medium">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                          <span>系统状态：运行正常，空调策略正在根据人流与天气自动调整</span>
                        </div>
                      ) : (
                        <div className="text-[11px] text-rose-600 dark:text-rose-450 bg-rose-500/10 p-2.5 rounded border border-rose-500/25 mb-3 flex flex-col gap-2 font-medium">
                          <div className="flex items-start gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0 mt-1"></span>
                            <span>
                              联动指令已下发: {
                                securityStatus === "intrusion" ? "🟠 B5 区域疑似入侵。已联动照明、门禁与安保终端，并生成处置提示" :
                                securityStatus === "fire" ? "🔴 地下机房疑似火情。已联动排烟、新风、电梯和楼内广播演练流程" :
                                "🟡 大堂疑似冲突聚集。已联动安保通知、闸机疏导和现场广播提示"
                              }
                            </span>
                          </div>
                          <button
                            onClick={resetSecurityLinkage}
                            className="bg-rose-600 dark:bg-rose-500 hover:opacity-90 text-white text-[10px] font-extrabold py-1.5 px-3 rounded transition-all cursor-pointer border-0 shadow-sm shadow-rose-500/10 hover:shadow-rose-500/25 self-start"
                          >
                            恢复日常运行 (Reset)
                          </button>
                        </div>
                      )}

                      <span className="block text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">一键触发联动演练:</span>
                      <div className="grid grid-cols-3 gap-1.5">
                        <button
                          onClick={() => triggerSecurityLinkage("intrusion")}
                          className={`py-1.5 px-1 text-center rounded text-[10px] font-bold cursor-pointer transition-colors border ${
                            securityStatus === "intrusion"
                              ? "bg-amber-500 text-slate-950 border-amber-500"
                              : "bg-white/[0.04] dark:bg-[#060b19] hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200"
                          }`}
                        >
                          入侵联动
                        </button>
                        <button
                          onClick={() => triggerSecurityLinkage("fire")}
                          className={`py-1.5 px-1 text-center rounded text-[10px] font-bold cursor-pointer transition-colors border ${
                            securityStatus === "fire"
                              ? "bg-red-500 text-white border-red-500"
                              : "bg-white/[0.04] dark:bg-[#060b19] hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200"
                          }`}
                        >
                          火警联动
                        </button>
                        <button
                          onClick={() => triggerSecurityLinkage("panic")}
                          className={`py-1.5 px-1 text-center rounded text-[10px] font-bold cursor-pointer transition-colors border ${
                            securityStatus === "panic"
                              ? "bg-yellow-500 text-slate-950 border-yellow-500"
                              : "bg-white/[0.04] dark:bg-[#060b19] hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200"
                          }`}
                        >
                          大堂疏导
                        </button>
                      </div>
                    </div>

                    {/* Mode selector */}
                    <div className="space-y-3 mb-6">
                      <span className="block text-[10px] font-mono font-extrabold text-[#722ed1] uppercase tracking-wider mb-2">切换能耗控制策略</span>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          onClick={() => {
                            setAiMode("economy");
                            setIbmsLogs(p => ["系统指令：已切换至「节能优先」策略，优先降低空调能耗", ...p]);
                          }}
                          className={`py-2 px-1 text-center rounded-lg text-xs font-semibold border cursor-pointer transition-colors ${
                            aiMode === "economy"
                              ? "bg-indigo-600/15 border-indigo-500/35 text-white font-semibold"
                              : "bg-white/[0.02] hover:bg-white/[0.06] border-white/5 text-slate-300"
                          }`}
                        >
                          节能优先
                        </button>
                        <button
                          onClick={() => {
                            setAiMode("comfort");
                            setIbmsLogs(p => ["系统指令：已切换至「舒适优先」策略，优先保持体感稳定", ...p]);
                          }}
                          className={`py-2 px-1 text-center rounded-lg text-xs font-semibold border cursor-pointer transition-colors ${
                            aiMode === "comfort"
                              ? "bg-indigo-600/15 border-indigo-500/35 text-white font-semibold"
                              : "bg-white/[0.02] hover:bg-white/[0.06] border-white/5 text-slate-300"
                          }`}
                        >
                          舒适优先
                        </button>
                        <button
                          onClick={() => {
                            setAiMode("safety");
                            setIbmsLogs(p => ["系统指令：已切换至「设备保护」策略，优先控制负载波动", ...p]);
                          }}
                          className={`py-2 px-1 text-center rounded-lg text-xs font-semibold border cursor-pointer transition-colors ${
                            aiMode === "safety"
                              ? "bg-indigo-600/15 border-indigo-500/35 text-white font-semibold"
                              : "bg-white/[0.02] hover:bg-white/[0.06] border-white/5 text-slate-300"
                          }`}
                        >
                          设备保护
                        </button>
                      </div>
                    </div>

                    {/* IBMS Environmental controls Sliders */}
                    <div className="space-y-4 bg-white/[0.02] p-4 rounded-xl border border-white/5 mb-6">
                      <div>
                        <div className="flex justify-between text-xs text-slate-300 font-medium mb-1">
                          <span>模拟楼内人流量 (Occupancy)</span>
                          <span className="font-mono text-indigo-400 font-semibold">{occupancy}%</span>
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="100"
                          value={occupancy}
                          onChange={(e) => setOccupancy(Number(e.target.value))}
                          className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 font-medium mb-1">
                          <span>模拟园区室外温度 (Outdoor Heat)</span>
                          <span className="font-mono text-indigo-400 font-semibold">{outdoorTemp}°C</span>
                        </div>
                        <input
                          type="range"
                          min="15"
                          max="41"
                          value={outdoorTemp}
                          onChange={(e) => setOutdoorTemp(Number(e.target.value))}
                          className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-slate-400 font-light italic flex items-center gap-1.5">
                    <Sliders className="w-4 h-4 text-slate-400 shrink-0" />
                    建议拖动两个滑块，观察右侧冷量消耗和能效仪表盘的瞬时变化。
                  </div>
                </div>

                {/* Simulated IBMS Dashboard Metrics Grid */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                  
                  {/* Dashboard metrics top cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    
                    {/* Saving Rate Display (BIG FOCUS) */}
                    <div className="p-4 rounded-xl border border-indigo-500/20 bg-indigo-500/5 text-center flex flex-col justify-between">
                      <div className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-wide">AI能耗瞬间节省比例</div>
                      <div className="my-3 text-3xl font-mono font-bold text-indigo-400 flex items-center justify-center gap-1">
                        <TrendingDown className="w-5 h-5 text-indigo-400" />
                        <span>{ibmsMetrics.energySaving}%</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-light">较传统变频控制能效明显提速</span>
                    </div>

                    {/* Cooling Power outputs */}
                    <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] text-center flex flex-col justify-between">
                      <div className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wide">制冷主机瞬时输出功率</div>
                      <div className="my-3 text-3xl font-mono font-bold text-white flex items-center justify-center gap-1">
                        <Zap className="w-5 h-5 text-amber-500 animate-pulse" />
                        <span>{ibmsMetrics.coolingRate} kW</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-light">空调末端冷机动力输出</span>
                    </div>

                    {/* Operational factor details */}
                    <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] text-center flex flex-col justify-between">
                      <div className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wide">风柜变频主风道管压</div>
                      <div className="my-3 text-3xl font-mono font-bold text-white">
                        <span>{ibmsMetrics.airFlow} m³/h</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-light">自适应多区域送风量</span>
                    </div>

                  </div>

                  {/* AI HVAC Control graph mimic using beautiful styled borders */}
                  <div className="p-4.5 rounded-xl border border-slate-200 bg-slate-900 text-white min-h-[160px] flex flex-col justify-between font-mono">
                    
                    <div className="flex justify-between items-center text-xs border-b border-white/[0.08] pb-2 mb-3">
                      <span className="text-[10px] tracking-wider text-sky-400 font-semibold">[AI+IBMS DECISION GRAPH]</span>
                      <span className="text-[9px] text-slate-500">OPTIMIZING REALTIME</span>
                    </div>

                    <div className="grid grid-cols-5 gap-3 items-end h-24 mb-2">
                      <div className="flex flex-col items-center">
                        <div className="w-full bg-slate-800 rounded-t h-16 relative">
                          <div className="absolute bottom-0 left-0 w-full bg-indigo-500 rounded-t transition-all" style={{ height: `${occupancy}%` }}></div>
                        </div>
                        <span className="text-[8px] text-slate-500 mt-1 uppercase scale-90">客流量</span>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className="w-full bg-slate-800 rounded-t h-16 relative">
                          <div className="absolute bottom-0 left-0 w-full bg-rose-500 rounded-t transition-all" style={{ height: `${(outdoorTemp - 15) * 3.8}%` }}></div>
                        </div>
                        <span className="text-[8px] text-slate-500 mt-1 uppercase scale-90">环境温</span>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className="w-full bg-slate-800 rounded-t h-16 relative">
                          <div className="absolute bottom-0 left-0 w-full bg-sky-500 rounded-t transition-all" style={{ height: `${ibmsMetrics.coolingRate * 0.8}%` }}></div>
                        </div>
                        <span className="text-[8px] text-slate-500 mt-1 uppercase scale-90">冷负荷</span>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className="w-full bg-slate-800 rounded-t h-16 relative">
                          <div className="absolute bottom-0 left-0 w-full bg-emerald-500 rounded-t transition-all" style={{ height: `${ibmsMetrics.energySaving * 2}%` }}></div>
                        </div>
                        <span className="text-[8px] text-slate-500 mt-1 uppercase scale-90">节能率</span>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className="w-full bg-slate-800 rounded-t h-16 relative">
                          <div className="absolute bottom-0 left-0 w-full bg-indigo-400 rounded-t transition-all" style={{ height: `${aiMode === "economy" ? 35 : aiMode === "comfort" ? 90 : 60}%` }}></div>
                        </div>
                        <span className="text-[8px] text-slate-500 mt-1 uppercase scale-90">AI权重</span>
                      </div>
                    </div>

                    <p className="text-[9px] text-slate-400 font-light leading-relaxed truncate">
                      当前决策：在大楼人流量为{occupancy}%和最高环境气温为{outdoorTemp}°C场景下，AI核算出能效最优峰值，变频泵降频
                      {aiMode === "economy" ? "35%" : "20%"}以维持恒温，有效降低碳足迹。
                    </p>

                  </div>

                  {/* IBMS logs output screen */}
                  <div className="p-3 bg-zinc-950 rounded-xl font-mono text-[9px] border border-slate-900 text-slate-300 min-h-[110px]">
                    <span className="text-sky-400 font-bold block mb-1 uppercase tracking-wide">IBMS 控制器在线日志流:</span>
                    <div className="space-y-1 max-h-[70px] overflow-y-auto">
                      {ibmsLogs.map((log, idx) => (
                        <div key={idx} className="flex gap-2 text-slate-400 text-xs">
                          <span className="text-slate-600 text-[9px] font-mono shrink-0">{log.split(" ")[0]}</span>
                          <span className="text-[10px] select-all font-mono text-slate-300">{log.substring(log.indexOf(" ") + 1)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </motion.div>
            )}

          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
