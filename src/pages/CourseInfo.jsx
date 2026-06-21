import React from 'react';
import { Link } from 'react-router-dom';

export default function CourseInfo() {
  return (
    <div className="min-h-screen bg-[#FDFCFB] text-slate-800 font-sans p-6 md:p-12 animate-fade-in">
      <div className="max-w-5xl mx-auto space-y-12">
        
        <header className="bg-slate-900 text-white rounded-3xl p-10 md:p-14 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 rounded-full bg-white opacity-5 blur-3xl"></div>
          
          <div className="relative z-10 max-w-3xl">
            <div className="flex gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase">Computer Science</span>
              <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase">CS-201</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-serif leading-tight mb-6">
              資料結構與演算法 <br />核心實戰課程
            </h1>
            
            <p className="text-slate-300 text-lg leading-relaxed mb-10 max-w-2xl">
              本課程旨在填補語法基礎與高階演算法之間的落差。帶您從底層理解記憶體配置，並熟練掌握 Tree、Graph、DP 等在軟體工程師面試中最核心的解題技巧。
            </p>
            
            <div className="flex flex-wrap gap-4">
              {/* 🌟 點擊後直接進入儀表板開始學習 */}
              <Link to="/dashboard" className="bg-white text-slate-900 px-8 py-3 rounded-full font-bold shadow-sm hover:bg-slate-50 transition-transform hover:-translate-y-0.5 inline-block">
                立即加入課程
              </Link>
              <Link to="/classroom" className="bg-transparent border border-white/30 text-white px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-colors inline-block">
                預覽教學大綱
              </Link>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-serif text-slate-900 mb-6">課程說明 (Course Description)</h2>
              <p className="text-slate-600 leading-relaxed mb-8">
                不論是前端、後端還是全端開發，優秀的資料結構能力是寫出高效能程式碼的根本。我們將透過超過 50 題經典的 LeetCode 實戰演練，帶您建立起直覺式的演算法思維。
              </p>
              
              <h3 className="text-lg font-bold text-slate-800 mb-4">學習目標 (Course Objectives)</h3>
              <ul className="space-y-4">
                {[
                  '理解 Big O Notation，精準評估程式碼的時間與空間複雜度。',
                  '實作核心資料結構：Linked List、Stack、Queue、Hash Table 等。',
                  '掌握進階演算法思維：Divide & Conquer、Greedy、Dynamic Programming。',
                  '具備通過頂尖科技公司 (FAANG) 軟體工程師技術面試的能力。'
                ].map((objective, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#E8F0EA] text-[#2E6A4B] flex items-center justify-center shrink-0 mt-0.5 text-sm">✓</span>
                    <span className="text-slate-700">{objective}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-xs font-bold tracking-widest text-amber-700 uppercase mb-4 pl-1">系統必備條件</h2>
              <div className="bg-[#FFFDF5] border border-amber-200 rounded-3xl p-6 shadow-sm">
                <h3 className="font-serif text-lg text-amber-900 mb-3">技術要求 (Technical Req.)</h3>
                <ul className="text-sm text-amber-800 space-y-2 list-disc pl-4">
                  <li>具備任一程式語言基礎 (Python/Java/C++ 皆可)</li>
                  <li>已註冊 LeetCode 與 GitHub 帳號</li>
                  <li>熟悉基礎的 Git 版本控制指令</li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}