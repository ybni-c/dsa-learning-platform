import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // 🌟 引入 Link 讓按鈕具備真實導航功能
import CourseProgressCard from '../components/CourseProgressCard';
import TaskList from '../components/TaskList';

export default function Dashboard() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('dsa_learning_tasks');
    if (savedTasks) return JSON.parse(savedTasks);
    return [
      { id: 1, text: "完成 LeetCode Daily Challenge (動態規劃)", completed: false },
      { id: 2, text: "至 GitHub 推送 Graph Theory 實作進度", completed: false },
      { id: 3, text: "複習 Big O 時間複雜度筆記", completed: false }
    ];
  });

  useEffect(() => {
    localStorage.setItem('dsa_learning_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleToggleTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const completedCount = tasks.filter(task => task.completed).length;
  const currentProgress = 45 + (completedCount * 10);

  const generateCalendarDays = () => {
    const days = [];
    for (let i = 0; i < 35; i++) {
      const isActive = [3, 4, 10, 17, 18, 22, 24].includes(i);
      const isEmpty = i === 0 || i > 30;
      days.push({ id: i, isActive, isEmpty });
    }
    return days;
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-slate-800 font-sans p-6 md:p-12 animate-fade-in">
      <div className="max-w-6xl mx-auto space-y-12">
        
        <header className="pb-8 flex justify-between items-end gap-6">
          <div>
            <h1 className="text-4xl font-serif text-slate-900 mb-3">學習主頁</h1>
            <p className="text-slate-500 text-sm tracking-wide">
              2026年6月21日 星期日 · 保持專注，Alex。
            </p>
          </div>
          {/* 🌟 按鈕轉換為真實路由 Link */}
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
              {/* Online Time Statistics */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-slate-900 mb-5">Online Time Statistics</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: '今日:', value: '1h 30m' },
                    { label: '本週:', value: '8h 45m' },
                    { label: '本月:', value: '32h 10m' },
                    { label: 'AC 題數:', value: '124 題' },
                  ].map((stat, idx) => (
                    <div key={idx} className="bg-[#F8FAFC] p-3 rounded-2xl flex flex-col justify-center border border-slate-50">
                      <div className="flex justify-between items-center gap-2">
                         <span className="text-xs text-slate-500 font-medium whitespace-nowrap">{stat.label}</span>
                         <span className="text-sm font-bold text-[#2563EB] whitespace-nowrap">{stat.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Online Calendar */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-bold text-slate-900">Online Calendar</h3>
                </div>
                <div className="flex justify-between items-center mb-4 bg-slate-50 py-2 px-3 rounded-2xl border border-slate-100">
                  <button className="w-8 h-8 rounded-full bg-[#2563EB] text-white flex items-center justify-center hover:bg-blue-700 transition-colors shadow-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                  </button>
                  <span className="font-bold text-slate-800 text-sm">June 2026</span>
                  <button className="w-8 h-8 rounded-full bg-[#2563EB] text-white flex items-center justify-center hover:bg-blue-700 transition-colors shadow-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                  </button>
                </div>
                <div className="grid grid-cols-7 gap-1.5 text-center mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-[10px] font-bold text-slate-400 uppercase">{day}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1.5">
                  {generateCalendarDays().map((day) => (
                    <div 
                      key={day.id} 
                      className={`w-full aspect-square rounded-md ${
                        day.isEmpty 
                          ? 'bg-transparent' 
                          : day.isActive 
                            ? 'bg-[#A7F3D0] shadow-sm' 
                            : 'bg-[#F1F5F9]'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <TaskList 
              title="學習任務 (Tasks)" 
              tasks={tasks} 
              onToggleTask={handleToggleTask} 
            />
            
            {/* 🌟 側邊導航轉換為真實路由 */}
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
                  <li>
                    <Link to="/feedback" className="flex items-center gap-3 p-3 rounded-xl text-slate-600 hover:bg-[#F8FAFC] hover:text-slate-900 transition-colors">
                      <span className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100 shadow-sm">📝</span>
                      <span className="text-sm font-medium">學習回饋 (Feedback)</span>
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