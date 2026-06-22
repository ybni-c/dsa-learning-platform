import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function VirtualClassroom() {
  const [activePhase, setActivePhase] = useState(1);

  const starterCode = {
    javascript: "function solve(n) {\n  // 請在此處實作您的解法\n  \n}",
    python: "def solve(n):\n    # 請在此處實作您的解法\n    pass",
    cpp: "class Solution {\npublic:\n    int solve(int n) {\n        // 請在此處實作您的解法\n        \n    }\n};",
    java: "class Solution {\n    public int solve(int n) {\n        // 請在此處實作您的解法\n        return 0;\n    }\n}"
  };

  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState(starterCode['javascript']);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    setCode(starterCode[newLang]); 
  };

  const getFileExtension = (lang) => {
    const exts = { javascript: 'js', python: 'py', cpp: 'cpp', java: 'java' };
    return exts[lang];
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-slate-800 font-sans flex flex-col animate-fade-in">
      
      <header className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center shrink-0 shadow-md z-10">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
            ←
          </Link>
          <div>
            <h1 className="text-sm font-bold tracking-widest text-blue-400 uppercase">CS-201 / Chapter 3</h1>
            <h2 className="text-lg font-serif">動態規劃 (Dynamic Programming) 核心概念</h2>
          </div>
        </div>
        <div className="text-xs font-medium bg-blue-600 px-3 py-1.5 rounded-full">
          知識中心 (Knowledge-Centered) 學習艙
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        
        {/* 左側：動態切換的教學內容 */}
        <main className="flex-1 overflow-y-auto p-8 lg:p-12">
          {/* 🌟 修改點：將 max-w-3xl 改為 max-w-5xl，讓整個內容區塊更寬，適合放編輯器 */}
          <div className="max-w-5xl mx-auto space-y-8">
            
            {activePhase === 1 && (
              <div className="space-y-6 animate-fade-in max-w-3xl">
                <div className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold tracking-widest uppercase">Phase 1: Informal Concept</div>
                <h3 className="text-3xl font-serif text-slate-900">生活中的動態規劃：爬樓梯的哲學</h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  想像一下，您正在爬一個 10 階的樓梯。您每次只能跨 <strong>1 階</strong> 或 <strong>2 階</strong>。請問您有幾種方法可以爬到頂端？
                </p>
                <div className="bg-[#F8FAFC] border border-slate-200 p-6 rounded-2xl shadow-sm">
                  <h4 className="font-bold text-slate-800 mb-3">💡 認知鷹架 (Scaffolding)：</h4>
                  <ul className="space-y-3 text-slate-600">
                    <li>• 如果只爬 1 階，只有 1 種方法。</li>
                    <li>• 如果爬 2 階，有 2 種方法 (1+1 或 直接跨2)。</li>
                    <li>• 如果要爬第 3 階呢？您必定是從「第1階跨兩步」或「第2階跨一步」上來的。</li>
                  </ul>
                  <div className="mt-6 p-4 bg-blue-50 text-blue-800 rounded-xl border border-blue-100 font-medium">
                    🎯 <strong>核心直覺：</strong>「今天問題的答案，其實就藏在昨天跟前天的答案裡！」這就是動態規劃的本質。我們不需要從頭計算，只需要把舊的答案記在筆記本上。
                  </div>
                </div>
              </div>
            )}

            {activePhase === 2 && (
              <div className="space-y-6 animate-fade-in max-w-3xl">
                <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold tracking-widest uppercase">Phase 2: Formalization</div>
                <h3 className="text-3xl font-serif text-slate-900">漸進正式化：狀態轉移方程式</h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  現在，我們要把剛剛「爬樓梯」的直覺，轉化為電腦看得懂的<strong>數學模型與嚴謹的資料結構</strong>。
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Step A: 定義狀態</h4>
                    <p className="text-slate-700 font-medium font-mono bg-slate-50 p-3 rounded-lg border border-slate-100">
                      dp[i] = 爬到第 i 階的方法總數
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Step B: 狀態轉移方程</h4>
                    <p className="text-slate-700 font-medium font-mono bg-slate-50 p-3 rounded-lg border border-slate-100 text-center text-lg">
                      dp[i] = dp[i-1] + dp[i-2]
                    </p>
                  </div>
                </div>

                <div className="mt-8 bg-slate-900 text-white p-6 rounded-2xl shadow-lg">
                  <h4 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-4">時間複雜度分析 (Big O)</h4>
                  <p className="text-slate-300 leading-relaxed text-sm">
                    如果使用暴力的遞迴 (Recursion) 展開，時間複雜度會呈現指數爆炸 <strong>O(2^n)</strong>。但透過建立 DP 陣列紀錄結果 (Memoization)，我們能將複雜度壓低至線性的 <strong>O(n)</strong>，這就是知識從「直覺」昇華至「工程科學」的關鍵。
                  </p>
                </div>
              </div>
            )}

            {activePhase === 3 && (
              <div className="space-y-4 animate-fade-in flex flex-col h-full">
                <div>
                  <div className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold tracking-widest uppercase mb-4">Phase 3: Skill Automation</div>
                  <div className="flex justify-between items-end">
                    <h3 className="text-3xl font-serif text-slate-900">技能自動化：刻意練習區</h3>
                    <p className="text-sm text-slate-500 font-medium">Topic: 70. Climbing Stairs</p>
                  </div>
                </div>
                
                {/* 🌟 修改點：加入 min-h-[65vh] 強制把編輯器撐大，並加上陰影與更清晰的邊界 */}
                <div className="min-h-[65vh] flex flex-col bg-[#1E1E1E] rounded-2xl overflow-hidden border border-slate-700 shadow-2xl mt-4">
                  
                  <div className="bg-[#2D2D2D] px-4 py-3 flex items-center justify-between border-b border-slate-700">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="ml-2 text-sm font-mono text-slate-300 font-bold">solution.{getFileExtension(language)}</span>
                    </div>
                    
                    <select 
                      value={language} 
                      onChange={handleLanguageChange}
                      className="bg-[#1E1E1E] text-slate-300 text-sm font-mono border border-slate-600 rounded px-3 py-1.5 focus:outline-none focus:border-blue-500 hover:bg-[#3D3D3D] transition-colors cursor-pointer"
                    >
                      <option value="javascript">JavaScript</option>
                      <option value="python">Python 3</option>
                      <option value="cpp">C++</option>
                      <option value="java">Java</option>
                    </select>
                  </div>

                  {/* 🌟 放大文字字體 (text-base) 並優化行距 (leading-relaxed) */}
                  <textarea 
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="flex-1 w-full h-full bg-transparent text-[#D4D4D4] font-mono text-base leading-relaxed p-6 focus:outline-none resize-none"
                    spellCheck="false"
                  ></textarea>
                  
                  <div className="bg-[#2D2D2D] px-6 py-4 flex justify-between items-center border-t border-slate-700">
                    <span className="text-sm text-slate-400">Press Run to validate constraints (O(n) runtime)</span>
                    <button className="bg-green-600 hover:bg-green-500 text-white text-sm font-bold px-6 py-2.5 rounded-lg transition-colors shadow-sm">
                      ▶ Run Code
                    </button>
                  </div>
                </div>

              </div>
            )}

          </div>
        </main>

        {/* 右側導覽列保持不變 */}
        <aside className="w-80 bg-white border-l border-slate-100 p-6 shadow-[inset_1px_0_0_rgba(0,0,0,0.05)] flex flex-col shrink-0">
          <h3 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-6">Learning Path</h3>
          
          <div className="space-y-4 relative before:absolute before:inset-0 before:ml-[1.1rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-blue-500 before:to-slate-200">
            {[
              { id: 1, title: '非正式概念 (Informal)', desc: '使用日常譬喻建立心智模型', icon: '🧠' },
              { id: 2, title: '漸進正式化 (Formalization)', desc: '抽象為數學方程與 Big O', icon: '📐' },
              { id: 3, title: '技能自動化 (Automation)', desc: '透過刻意練習固化程式語法', icon: '⌨️' },
            ].map((step) => (
              <button 
                key={step.id}
                onClick={() => setActivePhase(step.id)}
                className={`relative z-10 flex items-start gap-4 p-4 rounded-2xl text-left transition-all duration-300 w-full ${
                  activePhase === step.id 
                    ? 'bg-blue-50 border border-blue-200 shadow-sm scale-105' 
                    : 'bg-white hover:bg-slate-50 opacity-60 hover:opacity-100'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm text-lg ${
                  activePhase === step.id ? 'bg-[#2563EB] text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {step.icon}
                </div>
                <div>
                  <h4 className={`text-sm font-bold ${activePhase === step.id ? 'text-blue-900' : 'text-slate-700'}`}>
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-auto pt-8 border-t border-slate-100">
            <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl">
              <h4 className="text-xs font-bold text-amber-800 uppercase tracking-widest mb-2">HPL 理論實踐</h4>
              <p className="text-xs text-amber-700 leading-relaxed">
                本頁面展示了《How People Learn》中<strong>「知識中心」</strong>的設計。幫助學習者在「促成理解 (Phase 1 & 2)」與「技能自動化 (Phase 3)」之間取得完美平衡。編輯器更支援多語系切換，以降低外在認知負荷。
              </p>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}