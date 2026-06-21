import React from 'react';
import { Link } from 'react-router-dom';

export default function Library() {
  return (
    <div className="min-h-screen bg-[#FDFCFB] text-slate-800 font-sans p-6 md:p-12 animate-fade-in">
      <div className="max-w-6xl mx-auto space-y-10">
        
        <header className="border-b border-slate-200 pb-8 flex flex-col sm:flex-row justify-between sm:items-end gap-4">
          <div>
            <h1 className="text-4xl font-serif text-slate-900 mb-2">程式碼資源庫</h1>
            <p className="text-slate-500 text-sm tracking-wide">
              DSA Materials · 演算法範例程式碼、複習講義與工具
            </p>
          </div>
          <div>
            <div className="relative">
              <input type="text" placeholder="搜尋動態規劃, 樹狀結構..." className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-full text-sm w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-slate-100" />
              <span className="absolute left-4 top-2.5 text-slate-400 text-xs">🔍</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* 講義 */}
          <div className="bg-white border border-slate-200 p-8 rounded-3xl hover:shadow-lg transition-all duration-300 group cursor-pointer flex flex-col justify-between min-h-[250px]">
            <div>
              <div className="w-14 h-14 bg-[#F0F4F8] text-slate-700 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-inner group-hover:scale-110 transition-transform">
                📚
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">複雜度分析速查表</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                包含所有核心排序與搜尋演算法的 Best/Average/Worst Case 時間與空間複雜度 (Big O) 圖解。
              </p>
            </div>
            <div className="mt-6 text-xs font-bold text-slate-400 uppercase tracking-widest group-hover:text-slate-900 transition-colors">
              下載 PDF 講義 →
            </div>
          </div>

          {/* 實作專案 */}
          <Link to="/classroom" className="bg-white border border-slate-200 p-8 rounded-3xl hover:shadow-lg transition-all duration-300 group cursor-pointer flex flex-col justify-between min-h-[250px]">
            <div>
              <div className="w-14 h-14 bg-[#FFFDF5] text-amber-700 border border-amber-100 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-inner group-hover:scale-110 transition-transform">
                💻
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">經典題型範例 (Git)</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                提供精簡且通過 LeetCode 效能最佳化的 Python / C++ / Java 雙指標與滑動視窗範例原始碼。
              </p>
            </div>
            <div className="mt-6 text-xs font-bold text-amber-600 uppercase tracking-widest group-hover:text-amber-800 transition-colors">
              前往虛擬教室觀看 →
            </div>
          </Link>

          {/* 外部參考 */}
          <a href="https://leetcode.com" target="_blank" rel="noreferrer" className="bg-white border border-slate-200 p-8 rounded-3xl hover:shadow-lg transition-all duration-300 group cursor-pointer flex flex-col justify-between min-h-[250px]">
            <div>
              <div className="w-14 h-14 bg-[#F4F5F4] text-[#2E6A4B] rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-inner group-hover:scale-110 transition-transform">
                🌐
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">LeetCode 官方題庫</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                直接連結至外部測試平台，配合課程大綱進度進行線上即時編譯與 Debug。
              </p>
            </div>
            <div className="mt-6 text-xs font-bold text-[#2E6A4B] uppercase tracking-widest group-hover:text-slate-900 transition-colors">
              開啟外部視窗 →
            </div>
          </a>

          {/* 快速引導 */}
          <Link to="/feedback" className="bg-slate-900 border border-slate-800 p-8 rounded-3xl hover:shadow-lg transition-all duration-300 group cursor-pointer flex flex-col justify-between min-h-[250px]">
            <div>
              <div className="w-14 h-14 bg-white/10 text-white rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-inner group-hover:scale-110 transition-transform">
                📝
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-2">填寫盲點意見</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                如果在刷題或理解動態規劃推導公式時遇到瓶頸，請隨時向我們回饋。
              </p>
            </div>
            <div className="mt-6 text-xs font-bold text-white/50 uppercase tracking-widest group-hover:text-white transition-colors">
              前往意見表單 →
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
}