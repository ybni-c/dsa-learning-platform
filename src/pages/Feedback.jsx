import React from 'react';

export default function Feedback() {
  return (
    <div className="min-h-screen bg-[#FDFCFB] text-slate-800 font-sans p-6 md:p-12 animate-fade-in flex items-center justify-center">
      <div className="max-w-3xl w-full">
        
        <div className="text-center mb-10">
          <h1 className="text-4xl font-serif text-slate-900 mb-3">您的意見對我們很重要</h1>
          <p className="text-slate-500 text-sm tracking-wide">
            Post-course Feedback · 請花幾分鐘時間填寫課後問卷
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-[2rem] p-10 md:p-12 shadow-sm">
          <form className="space-y-10">
            
            {/* 滿意度評分 (Pre-course / Post-course survey) */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4">1. 您對「CS-201」課程的整體滿意度？</h3>
              <div className="flex justify-between items-center bg-[#F8FAFC] p-2 rounded-2xl border border-slate-100">
                {[1, 2, 3, 4, 5].map((score) => (
                  <label key={score} className="flex-1 cursor-pointer group">
                    <input type="radio" name="rating" className="peer sr-only" />
                    <div className="text-center py-4 rounded-xl text-slate-500 font-bold peer-checked:bg-slate-900 peer-checked:text-white peer-hover:bg-slate-200 transition-colors">
                      {score}
                    </div>
                  </label>
                ))}
              </div>
              <div className="flex justify-between text-xs text-slate-400 mt-2 px-4">
                <span>非常不滿意</span>
                <span>非常滿意</span>
              </div>
            </div>

            {/* 文字意見區 (Comment form) */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4">2. 您有什麼具體的建議或心得嗎？ (Comment form)</h3>
              <textarea 
                className="w-full bg-[#F8FAFC] border border-slate-100 rounded-2xl p-5 h-40 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all placeholder:text-slate-300 resize-none"
                placeholder="例如：教材的清晰度、實作專題的難度等..."
              ></textarea>
            </div>

            {/* 提交按鈕 */}
            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button type="button" className="bg-slate-900 text-white px-8 py-3 rounded-full font-bold shadow-sm hover:bg-slate-800 transition-transform hover:-translate-y-0.5">
                送出回饋
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
}