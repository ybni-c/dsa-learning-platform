import React, { useState } from 'react';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* 展開後的對話視窗 */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 md:w-96 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col origin-bottom-right animate-fade-in">
          
          {/* 頂部標題 */}
          <div className="bg-slate-900 text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-xl">🤖</span>
              <div>
                <h3 className="text-sm font-bold tracking-wide">學習助教 (Alpha)</h3>
                <p className="text-xs text-slate-400">隨時為您解答課程疑問</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          {/* 對話內容區塊 */}
          <div className="p-4 h-64 overflow-y-auto bg-[#F8FAFC] space-y-4 text-sm">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center shrink-0">🤖</div>
              <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-none shadow-sm text-slate-600">
                您好！我們目前進展到第 3 章的實作環節。關於強化學習或構建 Agentic AI 應用程式，有任何需要我補充說明的嗎？
              </div>
            </div>
            <div className="flex gap-3 flex-row-reverse">
              <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center shrink-0 text-xs">Y</div>
              <div className="bg-slate-900 text-white p-3 rounded-2xl rounded-tr-none shadow-sm">
                可以簡單解釋一下什麼是 Reward Function 嗎？
              </div>
            </div>
          </div>

          {/* 底部輸入框 */}
          <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
            <input 
              type="text" 
              placeholder="輸入您的問題..." 
              className="flex-1 bg-[#F8FAFC] border border-slate-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
            <button className="w-9 h-9 bg-slate-900 text-white rounded-full flex items-center justify-center hover:bg-slate-800 transition-colors shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
            </button>
          </div>
        </div>
      )}

      {/* 懸浮按鈕本體 */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-slate-900 text-white rounded-full shadow-lg shadow-slate-900/20 flex items-center justify-center hover:bg-slate-800 hover:scale-105 transition-all duration-300"
      >
        {isOpen ? (
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        ) : (
          <span className="text-2xl">💬</span>
        )}
      </button>
    </div>
  );
}