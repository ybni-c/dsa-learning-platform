import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient'; 
import CourseProgressCard from '../components/CourseProgressCard';
import TaskList from '../components/TaskList';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [onlineHistory, setOnlineHistory] = useState({});
  const [currentViewDate, setCurrentViewDate] = useState(new Date(2026, 5, 1)); 

  const adaptiveTracks = {
    none: {
      trackTitle: "🌱 基礎概念建構軌道 (Conceptual Grounding Track)",
      scaffoldingLevel: "最高配置 (High Support Scaffolding)",
      focusSkill: "引導漸進正式化 (From Informal to Formal Concept)",
      recommendedModule: "第 1 章：圖解線性結構與連續記憶體 (火車座位譬喻法)",
      systemInstruction: "系統已自動為您簡化程式碼複雜度，優先提供概念圖解 PDF 講義，並隱藏進階效能測資限制。",
      aiPersona: "引導型同伴（強調生活譬喻，不使用生硬專有名詞）"
    },
    basic: {
      trackTitle: "🛡️ 邊界除錯與邏輯深化軌道 (Logic Deepening Track)",
      scaffoldingLevel: "漸進提示配置 (Graduated Prompting)",
      focusSkill: "後設認知監控 (Self-Monitoring & Debugging Skills)",
      recommendedModule: "第 3 章前置：雙指標 (Two Pointers) 月台警戒線防呆邊界練習",
      systemInstruction: "系統任務已切換為「盲點除錯導向」，要求實作測試案例 (Test Cases)，並開啟執行錯誤分析工具。",
      aiPersona: "啟發式教練（絕不直接給出修正代碼，僅提示邏輯漏洞位置）"
    },
    advanced: {
      trackTitle: "⚡ 高階演算法與最佳化軌道 (Expert Optimization Track)",
      scaffoldingLevel: "自主探究配置 (Autonomous Inquiry)",
      focusSkill: "適應性專家知能 (Adaptive Expertise & Big O Optimization)",
      recommendedModule: "第 3 章進階：動態規劃 (DP) 記憶化矩陣與狀態轉移方程最佳化",
      systemInstruction: "系統已解鎖 Mission-based 壓力測試環境，加入嚴格的 Runtime Limit 限制，挑戰高難度複雜問題解決。",
      aiPersona: "資深審查員（嚴格挑剔時間/空間複雜度，要求提出重構方案）"
    }
  };

  const [diagnostic, setDiagnostic] = useState(() => {
    try {
      const saved = localStorage.getItem('dsa_learner_diagnostic');
      if (!saved) return null;
      const parsed = JSON.parse(saved);
      if (!parsed || !parsed.background || !adaptiveTracks[parsed.background]) {
        localStorage.removeItem('dsa_learner_diagnostic');
        return null;
      }
      return parsed;
    } catch (e) {
      localStorage.removeItem('dsa_learner_diagnostic');
      return null;
    }
  });
  
  const [tempBackground, setTempBackground] = useState('none'); 
  const [tempMisconception, setTempMisconception] = useState('yes'); 

  useEffect(() => {
    const fetchTasks = async () => {
      const { data, error } = await supabase
        .from('dsa_tasks')
        .select('*')
        .order('id', { ascending: true });
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
  };

  const handleResetDiagnostic = () => {
    localStorage.removeItem('dsa_learner_diagnostic');
    setDiagnostic(null);
  };

  const getCognitiveBridgeText = () => {
    if (!diagnostic) return null;
    if (diagnostic.background === 'none') {
      return "💡 日常用語橋樑：請把演算法裡的『陣列 (Array)』想像成『高鐵的連號座位』，大家都必須挨著坐。這樣就能直覺理解為什麼陣列在記憶體中必須是『連續配置』，且中間不能任意安插新乘客！";
    } else if (diagnostic.background === 'basic') {
      return "💡 日常用語橋樑：您在寫迴圈時常遇到跑過頭 (IndexOutOfBounds) 的錯誤。請把『邊界條件』想像成『捷運月台的黃色警戒線』，開火車必須精準停在線上，不能多前進一公分。";
    } else {
      return "💡 日常用語橋樑：請把生硬的『動態規劃 (DP) 公式』想像成『生活中的記帳本』。因為我們不想每次出門都重新算一遍歷史總花費，所以把算過的結果寫在小本本上以便重複利用（Memoization）。";
    }
  };

  const completedCount = tasks.filter(task => task.completed).length;
  const currentProgress = tasks.length > 0 ? 45 + (completedCount * (55 / tasks.length)) : 45;

  const formatTime = (totalSeconds) => {
    if (!totalSeconds) return "0h 0m 0s";
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    return `${h}h ${m}m ${totalSeconds % 60}s`;
  };

  const getStats = () => {
    const todayStr = new Date().toISOString().split('T')[0];
    const todaySeconds = onlineHistory[todayStr] || 0;
    let weekSeconds = 0;
    const currentWeekDays = ["2026-06-15", "2026-06-16", "2026-06-17", "2026-06-18", "2026-06-19", "2026-06-20", "2026-06-21"];
    currentWeekDays.forEach(date => { weekSeconds += onlineHistory[date] || 0; });
    let monthSeconds = 0;
    Object.keys(onlineHistory).forEach(date => { if (date.startsWith("2026-06")) monthSeconds += onlineHistory[date]; });
    return { today: formatTime(todaySeconds), week: formatTime(weekSeconds), month: formatTime(monthSeconds), total: formatTime(weekSeconds + monthSeconds) };
  };

  const stats = getStats();
  const currentTrack = diagnostic && adaptiveTracks[diagnostic.background] 
                        ? adaptiveTracks[diagnostic.background] 
                        : adaptiveTracks['none'];

  // 🌟 這裡就是剛剛被我不小心刪掉的日曆核心函式！現在加回來了！
  const handlePrevMonth = () => {
    setCurrentViewDate(new Date(currentViewDate.getFullYear(), currentViewDate.getMonth() - 1, 1));
  };
  const handleNextMonth = () => {
    setCurrentViewDate(new Date(currentViewDate.getFullYear(), currentViewDate.getMonth() + 1, 1));
  };

  const generateCalendarDays = () => {
    const year = currentViewDate.getFullYear();
    const month = currentViewDate.getMonth();
    const firstDayOfWeek = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];
    
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push({ id: `empty-start-${i}`, isActive: false, isEmpty: true });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const trackedSeconds = onlineHistory[dateStr] || 0;
      days.push({ id: dateStr, dateStr: dateStr, trackedSeconds: trackedSeconds, isActive: trackedSeconds > 0, isEmpty: false });
    }

    while (days.length < 42) {
      days.push({ id: `empty-end-${days.length}`, isActive: false, isEmpty: true });
    }
    return days;
  };

  const todayGreeting = (() => {
    const today = new Date();
    const days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    return `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日 ${days[today.getDay()]}`;
  })();

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-slate-800 font-sans p-6 md:p-12 animate-fade-in">
      <div className="max-w-6xl mx-auto space-y-10">
        
        <header className="pb-6 flex justify-between items-end border-b border-slate-100">
          <div>
            <h1 className="text-4xl font-serif text-slate-900 mb-2">學習主頁</h1>
            <p className="text-slate-500 text-sm tracking-wide">{todayGreeting} · 保持專注，Alex。</p>
          </div>
          <Link to="/classroom" className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-slate-800 shadow-sm transition-transform hover:-translate-y-0.5">進入虛擬教室</Link>
        </header>

        <section className="bg-white border-2 border-blue-100 rounded-3xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">👤</span>
              <div>
                <h2 className="text-lg font-bold text-slate-900">學習者中心：適應性診斷與軌道配置系統 (Adaptive Wizard)</h2>
                <p className="text-xs text-slate-400">本模組動態診斷學員的先備知識，並在「教什麼」與「怎麼教」上進行自適應的系統行為調整。</p>
              </div>
            </div>
            {diagnostic && (
              <button onClick={handleResetDiagnostic} className="text-xs font-bold text-[#2563EB] hover:text-blue-700 underline bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
                重新診斷 (修正先備知識)
              </button>
            )}
          </div>

          {!diagnostic ? (
            <form onSubmit={handleSaveDiagnostic} className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block">1. 您目前的程式設計先備經驗是？</label>
                <select value={tempBackground} onChange={(e) => setTempBackground(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700">
                  <option value="none">尚未接觸過任何程式語言 (純白紙新手)</option>
                  <option value="basic">了解基礎語法變數、迴圈，但沒寫過複雜專案</option>
                  <option value="advanced">寫過實務專案，但對演算法與 Big O 缺乏直覺</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block">2. 您寫程式遇到 Bug 失敗時，您的直覺信念是？</label>
                <select value={tempMisconception} onChange={(e) => setTempMisconception(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700">
                  <option value="yes">「我覺得我不夠聰明，天生不適合學演算法。」 (本質論信念)</option>
                  <option value="no">「這代表我的邏輯暫時有盲點，除錯能讓我變強。」 (增進論信念)</option>
                </select>
              </div>
              <div className="md:col-span-2"><button type="submit" className="bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-md transition-colors">送出診斷並自動調整系統環境</button></div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="p-4 bg-blue-50/60 border border-blue-100 rounded-2xl">
                <p className="text-sm text-slate-700 leading-relaxed font-medium">{getCognitiveBridgeText()}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-3 shadow-md">
                  <div className="text-xs font-bold uppercase tracking-widest text-blue-400">當前分流軌道 (Active Pathway)</div>
                  <h3 className="text-base font-bold">{currentTrack.trackTitle}</h3>
                  <div className="h-px bg-slate-800"></div>
                  <div className="text-xs text-slate-300 leading-relaxed space-y-1">
                    <p>• <strong>鷹架支持度：</strong> {currentTrack.scaffoldingLevel}</p>
                    <p>• <strong>核心素養焦點：</strong> {currentTrack.focusSkill}</p>
                    <p>• <strong>全域 AI 助教方針：</strong> {currentTrack.aiPersona}</p>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 p-5 rounded-2xl space-y-3 flex flex-col justify-between shadow-sm">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-slate-400">適應性教材與行為變更 (System Behavior)</div>
                    <p className="text-sm font-bold text-slate-800 mt-1">🎯 專屬推薦：{currentTrack.recommendedModule}</p>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">{currentTrack.systemInstruction}</p>
                  </div>
                  {diagnostic.misconception === 'yes' && (
                    <div className="text-[11px] text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-100">
                      🌱 **信念搭橋**：已為您過濾掉單純與同儕競爭的排行版，建立了一個允許犯錯、重視自我理解的安全學習環境。
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-4 pl-1">目前進度 (Running Course)</h2>
              <CourseProgressCard courseId="CS-201" title="資料結構與演算法核心實戰" chapter={diagnostic ? `適應性路徑推薦：${currentTrack.recommendedModule}` : "等待診斷以分派章節..."} progress={currentProgress} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-5">Online Time Statistics</h3>
                  <div className="space-y-3">
                    {[{ label: 'Today:', value: stats.today, highlight: true }, { label: 'This Week:', value: stats.week, highlight: false }, { label: 'This Month:', value: stats.month, highlight: false }, { label: 'This Semester:', value: stats.total, highlight: false }].map((stat, idx) => (
                      <div key={idx} className="bg-[#F8FAFC] p-3 rounded-2xl flex justify-between items-center border border-slate-50">
                        <span className="text-xs text-slate-500 font-medium">{stat.label}</span>
                        <span className={`text-sm font-bold font-mono ${stat.highlight ? 'text-green-600 animate-pulse' : 'text-[#2563EB]'}`}>{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-3">Online Calendar</h3>
                <div className="flex justify-between items-center mb-4 bg-slate-50 py-2 px-3 rounded-2xl border border-slate-100">
                  <button onClick={handlePrevMonth} className="w-7 h-7 rounded-full bg-[#2563EB] text-white flex items-center justify-center text-xs hover:bg-blue-700 transition-colors shadow-sm">←</button>
                  <span className="font-bold text-slate-800 text-sm">{currentViewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                  <button onClick={handleNextMonth} className="w-7 h-7 rounded-full bg-[#2563EB] text-white flex items-center justify-center text-xs hover:bg-blue-700 transition-colors shadow-sm">→</button>
                </div>
                <div className="grid grid-cols-7 gap-1.5 text-center mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (<div key={day} className="text-[10px] font-bold text-slate-400 uppercase">{day}</div>))}
                </div>
                <div className="grid grid-cols-7 gap-1.5">
                  {generateCalendarDays().map((day) => (
                    <div key={day.id} className={`relative group w-full aspect-square rounded-md transition-all duration-300 ${day.isEmpty ? 'bg-transparent' : day.isActive ? 'bg-[#A7F3D0] shadow-sm border border-green-300 hover:scale-110' : 'bg-[#F1F5F9] hover:bg-slate-200 cursor-pointer'}`}>
                      {!day.isEmpty && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-3 py-2 bg-slate-900 text-white text-xs rounded-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-200 z-10 shadow-xl text-center flex flex-col gap-1">
                          <span className="font-bold font-mono">{day.dateStr}</span>
                          <span className="text-slate-400">{formatTime(day.trackedSeconds)}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <TaskList title="學習任務 (Tasks)" tasks={tasks} onToggleTask={handleToggleTask} />
          </div>
        </div>

      </div>
    </div>
  );
}