import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Registration() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // 模擬註冊成功，直接導向學習儀表板
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-slate-800 font-sans flex items-center justify-center p-6 animate-fade-in">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* 左側：歡迎區 (Welcome Section) */}
        <div className="space-y-8 hidden lg:block">
          <div className="inline-block px-3 py-1 bg-[#F0F4F8] text-slate-600 rounded-full text-xs font-bold tracking-widest uppercase mb-4">
            Code Your Way Up
          </div>
          <h1 className="text-5xl font-serif text-slate-900 leading-tight">
            掌握底層邏輯 <br />
            <span className="italic text-slate-600">突破演算法瓶頸</span>
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-md">
            歡迎來到 CS-201 演算法實戰平台。在這裡，我們用最高效的解題邏輯與精簡的程式架構，全面提升您的程式設計思維。
          </p>
          
          <div className="space-y-6 pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-xl">
                💻
              </div>
              <p className="text-sm font-medium text-slate-600">50+ 題經典 LeetCode 題型深度拆解</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-xl">
                🚀
              </div>
              <p className="text-sm font-medium text-slate-600">高效通過一線科技公司技術面試</p>
            </div>
          </div>
        </div>

        {/* 右側：註冊表單 (Registration Form) */}
        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 md:p-14 shadow-xl shadow-slate-200/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FDFCFB] rounded-full -mr-16 -mt-16 border border-slate-100"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-serif text-slate-900 mb-2">建立學習帳號</h2>
            <p className="text-slate-400 text-sm mb-10">立即開啟您的演算法修煉之旅。</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">電子郵件地址</label>
                <input 
                  type="email" 
                  required
                  className="w-full bg-[#F8FAFC] border border-slate-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all placeholder:text-slate-300"
                  placeholder="alex@example.com"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">設定密碼</label>
                <input 
                  type="password" 
                  required
                  className="w-full bg-[#F8FAFC] border border-slate-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all placeholder:text-slate-300"
                  placeholder="至少 8 個字元"
                />
              </div>

              <div className="flex items-center gap-3 py-2">
                <input type="checkbox" required className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900" id="terms" />
                <label htmlFor="terms" className="text-sm text-slate-500">
                  我已閱讀並同意 <span className="text-slate-900 underline font-medium cursor-pointer">線上課程學習契約</span>
                </label>
              </div>

              <button type="submit" className="w-full bg-slate-900 text-white rounded-2xl py-4 font-bold text-lg hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 active:scale-[0.98]">
                立即註冊並登入
              </button>
            </form>

            <div className="mt-10 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-widest text-slate-300">
                <span className="bg-white px-4 font-bold">或使用以下方式快捷登入</span>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <button onClick={() => navigate('/dashboard')} className="flex-1 border border-slate-200 rounded-2xl py-3 flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
                <span className="text-sm font-medium text-slate-600">Google</span>
              </button>
              <button onClick={() => navigate('/dashboard')} className="flex-1 border border-slate-200 rounded-2xl py-3 flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
                <span className="text-sm font-medium text-slate-600">GitHub</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}