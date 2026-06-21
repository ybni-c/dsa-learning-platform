import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function VirtualClassroom() {
  const [activeChapter, setActiveChapter] = useState(3);
  const navigate = useNavigate(); // 使用 navigate 進行程式化導航

  const syllabus = [
    { id: 1, title: '1. 陣列與字串操作 (Arrays & Strings)', time: '42:10', status: '✅' },
    { id: 2, title: '2. 鏈結串列與雙向指標 (Linked Lists)', time: '28:35', status: '✅' },
    { id: 3, title: '3. 動態規劃與記憶化 (Dynamic Programming)', time: '45:00', status: '▶️' },
    { id: 4, title: '4. 樹與圖的走訪 (Trees & Graphs)', time: '55:20', status: '🔒' },
    { id: 5, title: '5. 進階：最短路徑演算法 (Shortest Path)', time: '1:20:00', status: '🔒' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-slate-800 font-sans p-6 md:p-12 animate-fade-in">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <header className="border-b border-slate-200 pb-6 flex flex-col md:flex-row justify-between md:items-end gap-6">
          <div>
            <div className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-2 pl-1">
              Courses / CS-201 / Chapter {activeChapter}
            </div>
            <h1 className="text-3xl font-serif text-slate-900">
              {syllabus.find(item => item.id === activeChapter)?.title.split('. ')[1]}
            </h1>
          </div>
          <div className="flex gap-3">
            {/* 🌟 導航返回按鈕 */}
            <Link to="/dashboard" className="bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-full text-sm font-medium hover:bg-slate-50 transition-transform hover:-translate-y-0.5 inline-block">
              返回儀表板
            </Link>
            {/* 🌟 標記完成並導向證書頁面 */}
            <button 
              onClick={() => navigate('/completion')}
              className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-slate-800 transition-transform hover:-translate-y-0.5 shadow-sm"
            >
              標記為已完成
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            
            {/* 自訂義高質感播放器 */}
            <div className="bg-slate-900 rounded-3xl overflow-hidden aspect-video relative shadow-lg group flex flex-col justify-between border border-slate-800">
              <div className="p-6 bg-gradient-to-b from-black/80 to-transparent relative z-10 flex justify-between items-start">
                <div>
                  <div className="text-white/60 text-xs tracking-widest uppercase mb-1 font-semibold">Now Playing</div>
                  <h3 className="text-white font-medium text-lg tracking-wide">
                    {syllabus.find(item => item.id === activeChapter)?.title}
                  </h3>
                </div>
                <div className="bg-white/10 backdrop-blur px-3 py-1.5 rounded-lg text-white text-xs tracking-wider">HD 1080p</div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <button className="w-20 h-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110 pointer-events-auto hover:bg-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                  <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </button>
              </div>
              <div className="p-6 bg-gradient-to-t from-black/90 to-transparent relative z-10 pt-16">
                <div className="flex items-center gap-4 text-white">
                  <span className="text-xs font-medium tracking-wider font-mono opacity-80">12:04</span>
                  <div className="flex-1 bg-white/20 h-1.5 rounded-full overflow-hidden cursor-pointer relative">
                    <div className="absolute top-0 left-0 bg-white h-full w-[30%] rounded-full"></div>
                  </div>
                  <span className="text-xs font-medium tracking-wider font-mono opacity-80">45:00</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
              <h2 className="text-xl font-serif text-slate-900 mb-4">章節簡介 (Introduction)</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                動態規劃 (DP) 是演算法面試中最常出現的難題。本章節我們將從費氏數列出發，帶您了解 Top-down 的 Memoization 與 Bottom-up 的 Tabulation，並實際在 LeetCode 上解決經典的「背包問題 (Knapsack Problem)」。
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#" className="flex items-center gap-2 text-sm font-medium text-slate-700 bg-[#F4F5F4] border border-slate-100 px-5 py-2.5 rounded-xl hover:bg-[#E8EAE8] transition-colors">
                  📄 下載演算法圖解 PDF
                </a>
                <Link to="/library" className="flex items-center gap-2 text-sm font-medium text-slate-700 bg-[#F4F5F4] border border-slate-100 px-5 py-2.5 rounded-xl hover:bg-[#E8EAE8] transition-colors">
                  💻 前往 LeetCode 題庫
                </Link>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-4 pl-1">教學大綱 (Syllabus)</h2>
              <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                <ul className="divide-y divide-slate-100">
                  {syllabus.map((item) => (
                    <li 
                      key={item.id} 
                      onClick={() => setActiveChapter(item.id)}
                      className={`p-4 hover:bg-[#F8FAFC] cursor-pointer transition-colors ${
                        activeChapter === item.id 
                          ? 'bg-[#F8FAFC] border-l-4 border-slate-800' 
                          : 'border-l-4 border-transparent'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className={`text-sm font-medium ${activeChapter === item.id ? 'text-slate-900 font-bold' : 'text-slate-600'}`}>{item.title}</span>
                        <span className="text-xs pl-2">{item.status}</span>
                      </div>
                      <div className="text-xs text-slate-400 pl-1">{item.time}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-4 pl-1">課程名單 (Roster)</h2>
              <div className="bg-[#F5F3F0] border border-slate-100 rounded-3xl p-6">
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-800 text-white flex items-center justify-center font-serif font-bold text-sm shadow-inner">Dr.</div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">授課講師</p>
                      <p className="text-xs text-slate-500">Google Sr. Engineer</p>
                    </div>
                  </li>
                  <div className="h-px bg-slate-200/60 my-2"></div>
                  <li className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center font-serif text-slate-600 text-sm shadow-sm">A</div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">Alex (您)</p>
                      <p className="text-xs text-slate-500">Student</p>
                    </div>
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