import React from 'react';
import { Link } from 'react-router-dom';

export default function Completion() {
  return (
    <div className="min-h-screen bg-[#FDFCFB] text-slate-800 font-sans p-6 md:p-12 animate-fade-in flex flex-col items-center justify-center relative overflow-hidden">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-slate-100 to-[#FFFDF5] rounded-full blur-3xl -z-10"></div>

      <div className="max-w-4xl w-full text-center space-y-10">
        
        <div>
          <div className="inline-block px-4 py-1.5 bg-[#F4F5F4] text-[#2E6A4B] rounded-full text-sm font-bold tracking-widest uppercase mb-6 shadow-sm border border-[#E8F0EA]">
            Course Completion
          </div>
          <h1 className="text-5xl md:text-6xl font-serif text-slate-900 leading-tight mb-4">
            恭喜完成修煉，Alex！
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            您已成功通過「資料結構與演算法核心實戰」的所有章節考核，並在 LeetCode 實戰工作坊中取得了卓越的解題表現。
          </p>
        </div>

        {/* 證書卡片 (Diploma) */}
        <div className="relative mx-auto w-full max-w-2xl aspect-[1.414/1] bg-white border-8 border-slate-50 shadow-2xl rounded-sm p-10 flex flex-col items-center justify-center transform rotate-1 hover:rotate-0 transition-transform duration-500">
          <div className="absolute inset-4 border-2 border-slate-200 border-double"></div>
          
          <div className="relative z-10 text-center space-y-6">
            <h2 className="text-3xl font-serif text-slate-800 tracking-widest uppercase mb-8">Certificate of Completion</h2>
            <p className="text-slate-500 italic font-serif">This is to certify that</p>
            {/* 🌟 名字已安全替換為普遍常見代稱 Alex */}
            <h3 className="text-4xl font-serif text-slate-900 border-b border-slate-300 pb-2 inline-block px-10">
              Alex
            </h3>
            <p className="text-slate-500 italic font-serif max-w-md mx-auto">
              has successfully mastered the concepts of Data Structures, Complexity Analysis, and Advanced Dynamic Programming.
            </p>
            <div className="mt-12 flex justify-between w-full px-12 items-end">
              <div className="text-center">
                <div className="w-32 border-b border-slate-400 mb-2"></div>
                <span className="text-xs text-slate-400 uppercase tracking-widest">Date</span>
              </div>
              <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center shadow-inner">
                <span className="text-2xl opacity-50">🎖️</span>
              </div>
              <div className="text-center">
                <div className="w-32 border-b border-slate-400 mb-2"></div>
                <span className="text-xs text-slate-400 uppercase tracking-widest">Instructor</span>
              </div>
            </div>
          </div>
        </div>

        {/* 底部按鈕區 */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
          <button className="bg-slate-900 text-white px-8 py-3.5 rounded-full font-bold shadow-lg hover:bg-slate-800 transition-transform hover:-translate-y-0.5 flex items-center justify-center gap-3">
            <span>📄</span> 下載電子證書 (PDF)
          </button>
          {/* 🌟 真實路由跳轉回首頁 */}
          <Link to="/dashboard" className="bg-white border border-slate-200 text-slate-700 px-8 py-3.5 rounded-full font-bold shadow-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-3">
            返回學習儀表板
          </Link>
        </div>

      </div>
    </div>
  );
}