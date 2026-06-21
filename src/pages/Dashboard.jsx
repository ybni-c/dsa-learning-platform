import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // 🌟 引入我們剛剛設定好的 Supabase 客戶端
import CourseProgressCard from '../components/CourseProgressCard';
import TaskList from '../components/TaskList';

export default function Dashboard() {
  // 🌟 1. 任務狀態現在預設為空陣列，等待從雲端抓取
  const [tasks, setTasks] = useState([]);
  const [onlineHistory, setOnlineHistory] = useState({});
  const [currentViewDate, setCurrentViewDate] = useState(new Date(2026, 5, 1)); 

  // 🌟 2. 網頁載入時，從 Supabase 抓取任務資料
  useEffect(() => {
    const fetchTasks = async () => {
      const { data, error } = await supabase
        .from('dsa_tasks')
        .select('*')
        .order('id', { ascending: true }); // 依照 ID 排序確保順序固定

      if (error) {
        console.error("讀取任務失敗:", error);
      } else if (data) {
        setTasks(data); // 將雲端資料存入狀態
      }
    };

    fetchTasks();
  }, []);

  // 🌟 3. 當使用者打勾/取消打勾時，同步更新到 Supabase 雲端
  const handleToggleTask = async (taskId) => {
    // 找出當前點擊的任務
    const targetTask = tasks.find(t => t.id === taskId);
    if (!targetTask) return;

    const newCompletedState = !targetTask.completed;

    // 先做「樂觀更新 (Optimistic UI)」：直接改畫面，讓使用者感覺瞬間完成
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: newCompletedState } : task
    ));

    // 在背景偷偷發送 API 到 Supabase 進行真實更新
    const { error } = await supabase
      .from('dsa_tasks')
      .update({ completed: newCompletedState })
      .eq('id', taskId);

    if (error) {
      console.error("雲端更新失敗:", error);
      // 如果雲端更新失敗，理論上這裡要把狀態改回來，但為了教學簡潔先印出錯誤
    }
  };


  useEffect(() => {
    const fetchHistory = async () => {
      const { data } = await supabase.from('dsa_online_history').select('*');
      if (data) {
        // 將陣列轉回我們日曆需要的物件格式
        const historyObj = {};
        data.forEach(item => {
          historyObj[item.date] = item.seconds;
        });
        setOnlineHistory(historyObj);
      }
    };

    fetchHistory();
    // 設置一個輕量的定時刷新，確保畫面上的秒數會動
    const interval = setInterval(fetchHistory, 5000); 
    return () => clearInterval(interval);
  }, []);

  const completedCount = tasks.filter(task => task.completed).length;
  // 🌟 進度條動態計算 (根據真實的雲端任務數量)
  const currentProgress = tasks.length > 0 ? 45 + (completedCount * (55 / tasks.length)) : 45;

  const formatTime = (totalSeconds) => {
    if (!totalSeconds) return "0h 0m 0s";
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  const getStats = () => {
    const todayObj = new Date();
    const todayStr = todayObj.toISOString().split('T')[0];
    const todaySeconds = onlineHistory[todayStr] || 0;

    let weekSeconds = 0;
    const currentWeekDays = [
      "2026-06-15", "2026-06-16", "2026-06-17", 
      "2026-06-18", "2026-06-19", "2026-06-20", "2026-06-21"
    ];
    currentWeekDays.forEach(date => { weekSeconds += onlineHistory[date] || 0; });

    let monthSeconds = 0;
    Object.keys(onlineHistory).forEach(date => {
      if (date.startsWith("2026-06")) monthSeconds += onlineHistory[date];
    });

    let totalSeconds = 0;
    Object.values(onlineHistory).forEach(secs => { totalSeconds += secs; });

    return {
      today: formatTime(todaySeconds), week: formatTime(weekSeconds),
      month: formatTime(monthSeconds), total: formatTime(totalSeconds)
    };
  };

  const stats = getStats();

  const getTodayGreeting = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const dayName = days[today.getDay()];
    return `${year}年${month}月${date}日 ${dayName}`;
  };
  const todayGreeting = getTodayGreeting();

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

  const monthYearDisplay = currentViewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-slate-800 font-sans p-6 md:p-12 animate-fade-in">
      <div className="max-w-6xl mx-auto space-y-12">
        
        <header className="pb-8 flex justify-between items-end gap-6">
          <div>
            <h1 className="text-4xl font-serif text-slate-900 mb-3">學習主頁</h1>
            <p className="text-slate-500 text-sm tracking-wide">
              {todayGreeting} · 保持專注，Alex。
            </p>
          </div>
          <Link to="/classroom" className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-slate-800 shadow-sm transition-transform hover:-translate-y-0.5 inline-block text-center">
            進入虛擬教室
          </Link>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            
            <div>
              <h2 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-4 pl-1">目前進度 (Running Course)</h2>
              <CourseProgressCard 
                courseId="CS-201"
                title="資料結構與演算法核心實戰"
                chapter="第 3 章：動態規劃 (DP)。本章節將探討如何將複雜問題分解為重疊的子問題，並實作記憶化搜尋..."
                progress={currentProgress} 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-5">Online Time Statistics</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Today:', value: stats.today, highlight: true },
                      { label: 'This Week:', value: stats.week, highlight: false },
                      { label: 'This Month:', value: stats.month, highlight: false },
                      { label: 'This Semester:', value: stats.total, highlight: false },
                    ].map((stat, idx) => (
                      <div key={idx} className="bg-[#F8FAFC] p-3 rounded-2xl flex justify-between items-center border border-slate-50">
                        <span className="text-xs text-slate-500 font-medium">{stat.label}</span>
                        <span className={`text-sm font-bold font-mono ${stat.highlight ? 'text-green-600 animate-pulse' : 'text-[#2563EB]'}`}>{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-[10px] text-slate-400 mt-4 text-center">系統正透過全域狀態即時記錄您的學習時數</div>
              </div>

              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-slate-900 mb-3">Online Calendar</h3>
                <div className="flex justify-between items-center mb-4 bg-slate-50 py-2 px-3 rounded-2xl border border-slate-100">
                  <button onClick={handlePrevMonth} className="w-7 h-7 rounded-full bg-[#2563EB] text-white flex items-center justify-center text-xs hover:bg-blue-700 transition-colors shadow-sm">←</button>
                  <span className="font-bold text-slate-800 text-sm">{monthYearDisplay}</span>
                  <button onClick={handleNextMonth} className="w-7 h-7 rounded-full bg-[#2563EB] text-white flex items-center justify-center text-xs hover:bg-blue-700 transition-colors shadow-sm">→</button>
                </div>
                <p className="text-xs text-slate-500 mb-4 text-center">Daily online activity for this month</p>
                <div className="grid grid-cols-7 gap-1.5 text-center mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (<div key={day} className="text-[10px] font-bold text-slate-400 uppercase">{day}</div>))}
                </div>
                <div className="grid grid-cols-7 gap-1.5">
                  {generateCalendarDays().map((day) => (
                    <div key={day.id} className={`relative group w-full aspect-square rounded-md transition-all duration-300 ${day.isEmpty ? 'bg-transparent' : day.isActive ? 'bg-[#A7F3D0] shadow-sm cursor-pointer border border-green-300 hover:scale-110' : 'bg-[#F1F5F9] hover:bg-slate-200 cursor-pointer'}`}>
                      {!day.isEmpty && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-3 py-2 bg-slate-900 text-white text-xs rounded-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-10 shadow-xl shadow-slate-900/20 text-center flex flex-col gap-1">
                          <span className="font-bold font-mono tracking-wider">{day.dateStr}</span>
                          <span className="text-slate-400">{formatTime(day.trackedSeconds)}</span>
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
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
            
            <div>
              <h2 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-4 pl-1">系統導航 (Access)</h2>
              <div className="bg-white border border-slate-200 rounded-3xl p-6">
                <ul className="space-y-2">
                  <li>
                    <Link to="/course/cs-201" className="flex items-center gap-3 p-3 rounded-xl text-slate-600 hover:bg-[#F8FAFC] hover:text-slate-900 transition-colors">
                      <span className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100 shadow-sm">📚</span>
                      <span className="text-sm font-medium">課程大綱 (Course Info)</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/library" className="flex items-center gap-3 p-3 rounded-xl text-slate-600 hover:bg-[#F8FAFC] hover:text-slate-900 transition-colors">
                      <span className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100 shadow-sm">🗂️</span>
                      <span className="text-sm font-medium">程式碼資源庫 (Library)</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}