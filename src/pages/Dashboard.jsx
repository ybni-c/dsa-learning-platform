import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient'; 
import TaskList from '../components/TaskList';

export default function Dashboard() {
  const [currentUser, setCurrentUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [onlineHistory, setOnlineHistory] = useState({});
  const [currentViewDate, setCurrentViewDate] = useState(new Date(2026, 5, 1)); 
  const navigate = useNavigate();

  // 取得當前登入使用者
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setCurrentUser(user);
    });
  }, []);

  // 🌟 1. 在設定中加入 targetPhase
  const adaptiveTracks = {
    none: { trackTitle: "🌱 基礎概念建構軌道", scaffoldingLevel: "最高配置 Scaffolding", focusSkill: "引導漸進正式化", recommendedModule: "第 1 章：圖解線性結構與連續記憶體", nextStepRoute: "/classroom", nextStepLabel: "前往教室研習 Phase 1 生活譬喻", targetPhase: 1 },
    basic: { trackTitle: "🛡️ 邊界除錯與邏輯深化軌道", scaffoldingLevel: "漸進提示配置 Graduated Prompting", focusSkill: "後設認知監控", recommendedModule: "第 3 章前置：雙指標邊界練習", nextStepRoute: "/classroom", nextStepLabel: "前往教室挑戰 Phase 3 刻意練習區", targetPhase: 3 },
    advanced: { trackTitle: "⚡ 高階演算法與最佳化軌道", scaffoldingLevel: "自主探究配置 Autonomous Inquiry", focusSkill: "適應性專家知能", recommendedModule: "第 3 章進階：動態規劃狀態轉移最佳化", nextStepRoute: "/classroom", nextStepLabel: "接受 Phase 4 伺服器負載壓力任務", targetPhase: 4 }
  };

  const [diagnostic, setDiagnostic] = useState(() => {
    try {
      const saved = localStorage.getItem('dsa_learner_diagnostic');
      const parsed = saved ? JSON.parse(saved) : null;
      return (parsed && parsed.background && adaptiveTracks[parsed.background]) ? parsed : null;
    } catch { return null; }
  });
  
  const [tempBackground, setTempBackground] = useState('none'); 
  const [tempMisconception, setTempMisconception] = useState('yes'); 
  const [isDiagnosticExpanded, setIsDiagnosticExpanded] = useState(!diagnostic); 

  useEffect(() => {
    const fetchTasks = async () => {
      const { data, error } = await supabase.from('dsa_tasks').select('*').order('id', { ascending: true });
      if (!error && data) setTasks(data);
    };
    fetchTasks();
  }, []);

  const handleToggleTask = async (taskId) => {
    const targetTask = tasks.find(t => t.id === taskId);
    if (!targetTask) return;
    const newCompletedState = !targetTask.completed;
    setTasks(tasks.map(task => task.id === taskId ? { ...task, completed: newCompletedState } : task));
    await supabase.from('dsa_tasks').update({ completed: newCompletedState }).eq('id', taskId);
  };

  useEffect(() => {
    const fetchHistory = async () => {
      const { data } = await supabase.from('dsa_online_history').select('*');
      if (data) {
        const historyObj = {};
        data.forEach(item => { historyObj[item.date] = item.seconds; });
        setOnlineHistory(historyObj);
      }
    };
    fetchHistory();
    const interval = setInterval(fetchHistory, 5000); 
    return () => clearInterval(interval);
  }, []);

  const handleSaveDiagnostic = (e) => {
    e.preventDefault();
    const result = { background: tempBackground, misconception: tempMisconception, timestamp: new Date().toLocaleDateString() };
    localStorage.setItem('dsa_learner_diagnostic', JSON.stringify(result));
    setDiagnostic(result);
    setIsDiagnosticExpanded(false); 
  };

  const handleResetDiagnostic = () => {
    localStorage.removeItem('dsa_learner_diagnostic');
    setDiagnostic(null);
    setIsDiagnosticExpanded(true);
  };

  // 🌟 真實動態進度計算 ( LA 學習分析指標 )
  const completedCount = tasks.filter(task => task.completed).length;
  const macroProgress = tasks.length > 0 ? Math.round(45 + (completedCount * (55 / tasks.length))) : 45;

  const formatTime = (totalSeconds) => {
    if (!totalSeconds) return "0h 0m";
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    return `${h}h ${m}m`;
  };

  const getStats = () => {
    const todayStr = new Date().toISOString().split('T')[0];
    let totalSeconds = 0;
    Object.values(onlineHistory).forEach(secs => { totalSeconds += secs; });
    return { today: formatTime(onlineHistory[todayStr] || 0), total: formatTime(totalSeconds) };
  };

  const stats = getStats();
  const currentTrack = diagnostic ? adaptiveTracks[diagnostic.background] : adaptiveTracks['none'];
  const userName = currentUser?.email ? currentUser.email.split('@')[0] : 'Learner';

  const skillMeters = [
    { name: '時間複雜度 (Big O 分析能力)', progress: diagnostic?.background === 'advanced' ? 90 : 65, color: 'bg-blue-500' },
    { name: '線性資料結構 (連續記憶體直覺)', progress: 100, color: 'bg-indigo-500' },
    { name: '動態規劃演算法 (狀態轉移模型建構)', progress: macroProgress, color: 'bg-amber-500' },
  ];

  // 🌟 計算日曆格子
  const handlePrevMonth = () => setCurrentViewDate(new Date(currentViewDate.getFullYear(), currentViewDate.getMonth() - 1, 1));
  const handleNextMonth = () => setCurrentViewDate(new Date(currentViewDate.getFullYear(), currentViewDate.getMonth() + 1, 1));
  const generateCalendarDays = () => {
    const year = currentViewDate.getFullYear();
    const month = currentViewDate.getMonth();
    const firstDayOfWeek = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];
    for (let i = 0; i < firstDayOfWeek; i++) days.push({ id: `empty-start-${i}`, isEmpty: true });
    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const secs = onlineHistory[dateStr] || 0;
      days.push({ id: dateStr, dateStr: dateStr, trackedSeconds: secs, isActive: secs > 0, isEmpty: false });
    }
    while (days.length < 42) days.push({ id: `empty-end-${days.length}`, isEmpty: true });
    return days;
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans p-4 sm:p-8 md:p-12 animate-fade-in">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* 歡迎標頭 */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-2 border-b border-slate-200">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif text-slate-900 mb-1">
              歡迎回來，<span className="text-blue-600 capitalize">{userName}</span>
            </h1>
            <p className="text-slate-500 text-sm tracking-wide">
              {new Date().toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })} · 您的學習分析儀表板已更新。
            </p>
          </div>
          <Link to="/classroom" className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 whitespace-nowrap">
            進入虛擬教室 🚀
          </Link>
        </header>

        {/* 可收合的適應性診斷精靈 */}
        <section className="bg-white border border-blue-100 rounded-3xl p-6 shadow-sm overflow-hidden transition-all duration-500">
          <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsDiagnosticExpanded(!isDiagnosticExpanded)}>
            <div className="flex items-center gap-3">
              <span className="text-2xl">👤</span>
              <div>
                <h2 className="text-lg font-bold text-slate-900">適應性學習環境 (Learner-Centered Path)</h2>
                {diagnostic && !isDiagnosticExpanded && (
                  <p className="text-xs font-medium text-blue-600 mt-0.5">目前運行：{currentTrack.trackTitle} ({currentTrack.scaffoldingLevel})</p>
                )}
              </div>
            </div>
            <button className="text-xs font-bold text-slate-400 hover:text-slate-700 transition-colors bg-slate-50 px-3 py-1.5 rounded-xl">
              {isDiagnosticExpanded ? '▲ 收合面板' : '▼ 展開設定'}
            </button>
          </div>

          {isDiagnosticExpanded && (
            <div className="pt-6 mt-4 border-t border-slate-100 animate-fade-in">
              {!diagnostic ? (
                <form onSubmit={handleSaveDiagnostic} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">1. 程式設計先備經驗？</label>
                    <select value={tempBackground} onChange={(e) => setTempBackground(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium">
                      <option value="none">尚未接觸過任何程式語言 (純白紙新手)</option>
                      <option value="basic">了解基礎語法變數、迴圈，但沒寫過複雜專案</option>
                      <option value="advanced">寫過實務專案，但對演算法缺乏直覺</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">2. 遇到 Bug 時的直覺信念？</label>
                    <select value={tempMisconception} onChange={(e) => setTempMisconception(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium">
                      <option value="yes">「我不夠聰明，天生不適合學演算法。」 (本質論)</option>
                      <option value="no">「這只是邏輯盲點，除錯能讓我變強。」 (增進論)</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-6 py-2.5 rounded-xl shadow-md transition-colors">生成專屬學習軌道</button>
                  </div>
                </form>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-3">
                    <div className="text-xs font-bold uppercase tracking-widest text-blue-400">當前分流軌道</div>
                    <h3 className="text-base font-bold">{currentTrack.trackTitle}</h3>
                    <p className="text-xs text-slate-300">系統已因應您的先備心智模型，過濾不必要的認知負荷，並指定全域 AI 的引導方針。</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-100 p-5 rounded-2xl flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-widest text-blue-800">🎯 專屬推薦模組</div>
                      <p className="text-sm font-bold text-blue-900 mt-2">{currentTrack.recommendedModule}</p>
                    </div>
                    <button onClick={handleResetDiagnostic} className="text-xs font-bold text-blue-600 underline mt-4 text-left">重新評估先備知識</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        {/* 主要數據面版 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* 左側與中間：進度與模型 (共 8 格) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* 🌟 終極重頭戲：優化後的自適應模組進度工作艙 (Macro & Micro Syllabus Dashboard) */}
            <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex justify-between items-center flex-wrap gap-2">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">精準模組進度地圖 (Syllabus Architecture)</h3>
                  <p className="text-xs text-slate-400 mt-0.5">整合巨觀修課軌跡與微觀元件分析 (LA / Khan-style Trace)</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-slate-400 block uppercase">總體修課進度</span>
                  <span className="text-2xl font-mono font-black text-blue-600">{macroProgress}%</span>
                </div>
              </div>

              {/* 巨觀大進度條 */}
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200/50 shadow-inner">
                <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-1000 ease-out" style={{ width: `${macroProgress}%` }}></div>
              </div>

              {/* 微觀章節詳細對應地圖 */}
              <div className="mt-8 space-y-4 pt-2">
                
                {/* Chapter 1: 已自動抵免狀態 */}
                <div className="flex items-start gap-4 p-4 bg-slate-50 border border-slate-200/60 rounded-2xl opacity-75">
                  <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-sm shrink-0">✓</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <h4 className="text-sm font-bold text-slate-800 truncate">第 1 章：線性資料結構與記憶體配置 (Prerequisite)</h4>
                      <span className="text-xs font-mono font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded">免修解鎖</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">系統診斷：學員具備程式基礎，自動建構 Array / 連續空間的心智模型橋樑。</p>
                  </div>
                </div>

                {/* Chapter 3: 核心學習目標動態狀態線 (Knowledge-Centered 聯動) */}
                <div className="p-4 bg-white border-2 border-blue-50 rounded-2xl shadow-sm space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-mono font-bold text-sm shrink-0 animate-pulse">3</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline">
                        <h4 className="text-sm font-bold text-slate-900 truncate">第 3 章：動態規劃 (Dynamic Programming) 核心實實戰</h4>
                        <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">研習中 (Active)</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">當前追蹤進度：基於多模態歷程分析，您正在攻克爬樓梯解題邏輯。</p>
                    </div>
                  </div>

                  {/* 微觀元件狀態線 (完美與虛擬教室 4 個 Phase 數據連動) */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-center text-xs font-bold">
                    <div className="bg-emerald-50 text-emerald-700 border border-emerald-200 p-2 rounded-xl">
                      <div className="text-[10px] text-emerald-500 uppercase">Phase 1</div>
                      <p className="mt-0.5">生活直覺 [已通關]</p>
                    </div>
                    <div className="bg-emerald-50 text-emerald-700 border border-emerald-200 p-2 rounded-xl">
                      <div className="text-[10px] text-emerald-500 uppercase">Phase 2</div>
                      <p className="mt-0.5">正式公式 [已通關]</p>
                    </div>
                    <div className={`p-2 rounded-xl border ${tasks[0]?.completed ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
                      <div className="text-[10px] uppercase">Phase 3</div>
                      <p className="mt-0.5">刻意練習 {tasks[0]?.completed ? '[已完成]' : '[未固化]'}</p>
                    </div>
                    <div className={`p-2 rounded-xl border ${tasks[1]?.completed ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
                      <div className="text-[10px] uppercase">Phase 4</div>
                      <p className="mt-0.5">高壓任務 {tasks[1]?.completed ? '[解鎖]' : '[鎖定中]'}</p>
                    </div>
                  </div>

                  {/* 🎯 自適應精準導航按鈕：夾帶 targetPhase 狀態傳送到虛擬教室 */}
                  <div className="pt-2 border-t border-slate-100">
                    <button 
                      onClick={() => navigate(currentTrack.nextStepRoute, { state: { targetPhase: currentTrack.targetPhase } })}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md shadow-blue-500/10 flex items-center justify-center gap-2"
                    >
                      🎯 依據進度分析建議：{currentTrack.nextStepLabel} →
                    </button>
                  </div>

                </div>
              </div>
            </section>

            {/* OLM 技能量表 */}
            <section className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-900">開放式學習者模型 (Open Learner Model)</h3>
                <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded-full font-bold uppercase">Learning Analytics</span>
              </div>
              <div className="space-y-5">
                {skillMeters.map((skill, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-slate-700">{skill.name}</span>
                      <span className="text-slate-500 font-mono">{skill.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                      <div className={`h-2.5 rounded-full ${skill.color} transition-all duration-1000 ease-out`} style={{ width: `${skill.progress}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-6 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                💡 <strong>後設認知提示：</strong> 透過上述的技能量表 (Skill Meters)，您可以清楚看到目前知識狀態的落差，這將有助於您進行自我調整。
              </p>
            </section>
          </div>

          {/* 右側欄：活動摘要與任務清單 (共 4 格) */}
          <div className="lg:col-span-4 space-y-8">
            {/* 活動摘要卡片 */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 mb-4">研習活動統計 (Activity)</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-50">
                  <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">今日研習</div>
                  <div className="text-xl font-mono font-bold text-blue-600">{stats.today}</div>
                </div>
                <div className="bg-green-50/50 p-4 rounded-2xl border border-green-50">
                  <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">累積研習</div>
                  <div className="text-xl font-mono font-bold text-green-600">{stats.total}</div>
                </div>
              </div>
              
              {/* 貼心捷徑小日曆導航 */}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="flex justify-between items-center mb-3 bg-slate-50 py-1.5 px-3 rounded-xl border border-slate-100">
                  <button onClick={handlePrevMonth} className="text-xs bg-white border border-slate-200 rounded px-1.5 py-0.5 font-bold hover:bg-slate-100">←</button>
                  <span className="text-xs font-bold text-slate-700 font-mono">{currentViewDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                  <button onClick={handleNextMonth} className="text-xs bg-white border border-slate-200 rounded px-1.5 py-0.5 font-bold hover:bg-slate-100">→</button>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center mb-1 text-[9px] font-bold text-slate-400">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => <div key={i}>{d}</div>)}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {generateCalendarDays().map((day) => (
                    <div key={day.id} className={`w-full aspect-square rounded ${day.isEmpty ? 'bg-transparent' : day.isActive ? 'bg-emerald-200 border border-emerald-300' : 'bg-slate-100'}`}></div>
                  ))}
                </div>
              </div>
            </div>

            {/* 本週學習挑戰任務 */}
            <TaskList title="本週學習挑戰 (Weekly Tasks)" tasks={tasks} onToggleTask={handleToggleTask} />
          </div>

        </div>
      </div>
    </div>
  );
}