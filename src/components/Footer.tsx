/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShieldAlert, Heart } from "lucide-react";
import { useApp } from "../context/AppContext";
import Logo from "./Logo";

export default function Footer() {
  const { language } = useApp();

  return (
    <footer className="bg-slate-50 dark:bg-[#0c0d10] text-slate-500 dark:text-slate-400 py-16 border-t border-gray-150 dark:border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1: Info and brief */}
          <div className="md:col-span-2 space-y-4">
            <Logo size="md" />
            
            <p className="text-xs text-slate-550 dark:text-slate-400 font-normal leading-relaxed max-w-sm">
              {language === "zh"
                ? "作为以人工智能为核心驱动力的创新科技企业，云极洲具备全要素软硬件集成研发、局域安全离线算法深度微调和企业级闭环系统的极速部署实施能力。"
                : "Combining custom deep vision frameworks, robust off-site retrieval index algorithms, and secure hardware-software integrations to empower modern physical enterprises."}
            </p>

            <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono font-semibold uppercase tracking-wider">
              PRACTICAL AI · PRIVATE DEPLOYMENT · SYSTEM INTEGRATION
            </div>
          </div>

          {/* Column 2: Deployed solutions reference */}
          <div>
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-4 font-sans">
              {language === "zh" ? "核心方向" : "Core Solutions"}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#sandbox" className="text-slate-650 dark:text-slate-405 hover:text-[#00E5A3] dark:hover:text-[#00F5A0] transition-colors">
                  {language === "zh" ? "内部资料智能问答" : "Private Knowledge Q&A"}
                </a>
              </li>
              <li>
                <a href="#sandbox" className="text-slate-650 dark:text-slate-405 hover:text-[#00E5A3] dark:hover:text-[#00F5A0] transition-colors">
                  {language === "zh" ? "视频巡检与异常提醒" : "Video Monitoring & Alerts"}
                </a>
              </li>
              <li>
                <a href="#sandbox" className="text-slate-650 dark:text-slate-405 hover:text-[#00E5A3] dark:hover:text-[#00F5A0] transition-colors">
                  {language === "zh" ? "楼宇节能与设备联动" : "Building Energy & Device Linkage"}
                </a>
              </li>
              <li>
                <a href="#assessment" className="text-slate-650 dark:text-slate-405 hover:text-[#00E5A3] dark:hover:text-[#00F5A0] transition-colors">
                  {language === "zh" ? "AI 场景评估与方案规划" : "AI Scenario Assessment"}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Base */}
          <div>
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-4 font-sans">
              {language === "zh" ? "联系方式" : "Contact"}
            </h4>
            <div className="space-y-2.5 text-xs text-slate-550 dark:text-slate-400 font-normal leading-relaxed">
              <p>Email: xingyunchuangkeji@outlook.com</p>
              <p>
                {language === "zh" 
                  ? "上海研发中心：上海银亿滨江中心壹号楼" 
                  : "Shanghai R&D: Yinyi Riverside Center, Tower 1"}
              </p>
            </div>
          </div>

        </div>

        {/* Bottom copyright barrier */}
        <div className="border-t border-gray-200/85 dark:border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
          
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left mb-4 sm:mb-0">
            <span>© 2026 云极洲科技 (Yunjizhou Intelligence). All Rights Reserved.</span>
            <span className="hidden sm:inline text-gray-200 dark:text-slate-800">|</span>
            <span className="font-mono flex items-center gap-1.5 text-slate-505 dark:text-slate-405 font-medium">
              <ShieldAlert className="w-4 h-4 text-[#00E5A3] shrink-0" />
              {language === "zh" 
                ? "支持本地私有化、内网与离线部署场景" 
                : "Supports private local, intranet, and offline deployment scenarios"}
            </span>
          </div>

          <div className="flex items-center gap-1.5 font-sans justify-center text-slate-400 dark:text-slate-500">
            <span>Designed with</span>
            <Heart className="w-3 h-3 text-[#00B2FE] fill-[#00B2FE]" />
            <span>by Yunjizhou ML Lab</span>
          </div>

        </div>

      </div>
    </footer>
  );
}
