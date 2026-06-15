/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, CheckCircle2, Send, Cpu, Building2, Shield, Calendar, PhoneCall, Smile, AlertCircle } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Contact() {
  const { language } = useApp();
  const [form, setForm] = useState({
    name: "",
    company: "",
    role: "",
    contactInfo: "",
    intendedArea: "docs",
    notes: "",
  });
  const [isJoined, setIsJoined] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.contactInfo) {
      setErrorMsg(language === "zh" ? "请填写您的姓名与联络方式！" : "Please provide both your Name and Contact Info!");
      return;
    }

    setErrorMsg("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsJoined(true);
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 bg-transparent relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Card outer frame */}
        <div className="bg-white dark:bg-[#111317] text-slate-800 dark:text-slate-100 rounded-3xl border border-gray-150 dark:border-white/5 p-8 sm:p-12 shadow-xl shadow-gray-200/50 dark:shadow-none relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/20 dark:bg-blue-950/10 rounded-full blur-3xl -z-10" />
          
          <AnimatePresence mode="wait">
            {!isJoined ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Header info */}
                <div className="text-center sm:text-left max-w-xl mb-10">
                  <span className="px-3 py-1.5 rounded-md bg-blue-50 dark:bg-blue-950/20 text-[10px] font-mono tracking-widest text-[#1890ff] font-bold uppercase border border-blue-100 dark:border-blue-900/40">
                    {language === "zh" ? "Contact Us / 联系我们" : "Contact Us"}
                  </span>
                  <h2 className="mt-5 text-2xl sm:text-3xl font-sans font-extrabold text-[#1f2329] dark:text-white tracking-tight">
                    {language === "zh" ? "即刻开启数字化 AI 转型第一步" : "Take the First Step in Sourcing AI Transformation"}
                  </h2>
                  <p className="mt-2.5 text-xs text-slate-500 dark:text-slate-400 font-normal leading-relaxed">
                    {language === "zh"
                      ? "简单留下需求和联系方式，我们会先判断场景是否适合 AI 改造，再给出下一步建议。沟通会尽量围绕业务价值、实施难度和预算边界展开。"
                      : "Share your needs and contact details. We will first assess whether the scenario is suitable for AI, then suggest practical next steps."}
                  </p>
                </div>

                {/* Inline error feedback */}
                {errorMsg && (
                  <div className="p-3 mb-5 text-xs bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 text-red-500 rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Form fields */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] font-mono font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                        {language === "zh" ? "您的姓名 / Name *" : "Your Name *"}
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder={language === "zh" ? "例如：陈经理" : "e.g. Director Chen (Fang Zixin's team)"}
                        className="w-full text-xs p-3.5 rounded-lg bg-slate-50 dark:bg-[#15181e]/40 border border-gray-200 dark:border-white/5 outline-none focus:border-[#1890ff] focus:bg-white dark:focus:bg-[#15181e] transition-all text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 font-sans"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                        {language === "zh" ? "公司 / 单位 / 部门" : "Company / Department"}
                      </label>
                      <input
                        type="text"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        placeholder={language === "zh" ? "例如：某园区运营部 / 信息化科" : "e.g. Operations or IT Department"}
                        className="w-full text-xs p-3.5 rounded-lg bg-slate-50 dark:bg-[#15181e]/40 border border-gray-200 dark:border-white/5 outline-none focus:border-[#1890ff] focus:bg-white dark:focus:bg-[#15181e] transition-all text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 font-sans"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] font-mono font-extrabold text-[#555] dark:text-slate-400 uppercase tracking-wider mb-2">
                        {language === "zh" ? "微信号/邮箱/联系电话 / Tel or WeChat *" : "WeChat / Email / Phone *"}
                      </label>
                      <input
                        type="text"
                        required
                        value={form.contactInfo}
                        onChange={(e) => setForm({ ...form, contactInfo: e.target.value })}
                        placeholder={language === "zh" ? "微信、座机或手机，便于及时响应" : "Where we can quickly reach you"}
                        className="w-full text-xs p-3.5 rounded-lg bg-slate-50 dark:bg-[#15181e]/40 border border-gray-200 dark:border-white/5 outline-none focus:border-[#1890ff] focus:bg-white dark:focus:bg-[#15181e] transition-all text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 font-sans"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                        {language === "zh" ? "关注方向 / Interested Area" : "Interested Area"}
                      </label>
                      <select
                        value={form.intendedArea}
                        onChange={(e) => setForm({ ...form, intendedArea: e.target.value })}
                        className="w-full text-xs p-3.5 rounded-lg bg-slate-50 dark:bg-[#15181e] border border-gray-200 dark:border-white/10 outline-none focus:border-[#1890ff] focus:bg-white dark:focus:bg-[#15181e] transition-all text-slate-700 dark:text-slate-200 font-sans"
                      >
                        {language === "zh" ? (
                          <>
                            <option value="docs" className="bg-white dark:bg-[#111317]">内部资料问答 / 私有知识库</option>
                            <option value="police" className="bg-white dark:bg-[#111317]">视频巡检与异常提醒</option>
                            <option value="park" className="bg-white dark:bg-[#111317]">楼宇节能与 AI+IBMS 联动</option>
                            <option value="custom" className="bg-white dark:bg-[#111317]">其他定制化系统集成</option>
                          </>
                        ) : (
                          <>
                            <option value="docs" className="bg-white dark:bg-[#111317]">Private Knowledge Base / RAG</option>
                            <option value="police" className="bg-white dark:bg-[#111317]">Video Monitoring & Alerts</option>
                            <option value="park" className="bg-white dark:bg-[#111317]">Energy Saving & AI+IBMS Linkage</option>
                            <option value="custom" className="bg-white dark:bg-[#111317]">Custom System Integration</option>
                          </>
                        )}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                      {language === "zh" ? "简单描述您的需求" : "Briefly Describe Your Need"}
                    </label>
                    <textarea
                      rows={3}
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      placeholder={
                        language === "zh"
                          ? "例如：资料太多不好查、视频巡检压力大、空调能耗高、想接入现有门禁/楼控系统..."
                          : "For example: too many documents to search, heavy video monitoring workload, high HVAC cost, or existing access/IBMS integration..."
                      }
                      className="w-full text-xs p-3.5 rounded-lg bg-slate-50 dark:bg-[#15181e]/40 border border-gray-200 dark:border-white/5 outline-none focus:border-[#1890ff] focus:bg-white dark:focus:bg-[#15181e] transition-all text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 resize-none font-sans"
                    />
                  </div>

                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#00F5A0] to-[#00B2FE] text-slate-950 font-sans text-xs font-extrabold rounded-xl tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-[#00F5A0]/10 cursor-pointer hover:shadow-[#00F5A0]/25 hover:opacity-95"
                    >
                      {loading ? (
                        <>
                          <Send className="w-4 h-4 animate-spin text-slate-950" />
                          <span>{language === "zh" ? "正在提交..." : "Submitting..."}</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-slate-950" />
                          <span>{language === "zh" ? "预约方案沟通" : "Book a Solution Call"}</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-10 flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-950/20 border border-blue-150 dark:border-blue-900/40 text-[#1890ff] flex items-center justify-center mb-6 shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                
                <h3 className="text-xl sm:text-2xl font-sans font-extrabold text-slate-900 dark:text-white">
                  {language === "zh" ? "提交成功！" : "Submitted Successfully!"}
                </h3>
                
                <p className="mt-3.5 text-xs text-slate-600 dark:text-slate-300 max-w-md leading-relaxed font-normal">
                  {language === "zh" ? (
                    <>
                      感谢您的留言，<strong>{form.name}</strong> {form.company ? `（${form.company}）` : ""}。
                      <br className="my-2 block" />
                      我们已记录您的关注方向 <strong>（{form.intendedArea === "docs" ? "内部资料问答" : form.intendedArea === "police" ? "视频巡检与异常提醒" : form.intendedArea === "park" ? "楼宇节能与 AI+IBMS" : "定制化系统集成"}）</strong>。
                      后续沟通会围绕实际业务问题、现有系统情况、部署方式和预期收益展开。我们会通过 <strong>{form.contactInfo}</strong> 与您联系。
                    </>
                  ) : (
                    <>
                      Thank you, <strong>{form.name}</strong> {form.company ? `from ${form.company}` : ""}.
                      <br className="my-2 block" />
                      We recorded your interest in <strong>({form.intendedArea === "docs" ? "Private Knowledge Q&A" : form.intendedArea === "police" ? "Video Monitoring & Alerts" : form.intendedArea === "park" ? "Energy & AI+IBMS" : "Custom Integration"})</strong>.
                      Our follow-up will focus on your real workflow, existing systems, deployment needs, and expected value. We will reach you through <strong>{form.contactInfo}</strong>.
                    </>
                  )}
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-gray-150 dark:border-white/5 rounded-xl text-[11px] font-mono text-slate-600 dark:text-slate-400 flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#1890ff]" />
                    <span>{language === "zh" ? "后续：需求确认与场景判断" : "Next: Need Review & Scenario Fit"}</span>
                  </div>
                  <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-gray-150 dark:border-white/5 rounded-xl text-[11px] font-mono text-slate-600 dark:text-slate-400 flex items-center gap-2">
                    <PhoneCall className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
                    <span>{language === "zh" ? "建议预留：30分钟沟通时间" : "Suggested: 30-Min Call"}</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsJoined(false)}
                  className="mt-10 px-6 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-gray-200 dark:border-white/5 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 tracking-wide transition-all cursor-pointer"
                >
                  {language === "zh" ? "修改新表单" : "Edit Submission Form"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
