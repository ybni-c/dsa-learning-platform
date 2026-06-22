import React, { useState, useEffect } from 'react';
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
  
  // 🌟 終端機與執行狀態
  const [consoleOutput, setConsoleOutput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);

  // 🌟 Phase 4: 任務導向學習狀態
  const [timeLeft, setTimeLeft] = useState(900); 
  const [missionStatus, setMissionStatus] = useState('idle'); // idle, running, deploying, success, failed

  // 計時器邏輯
  useEffect(() => {
    let timer;
    if (activePhase === 4 && missionStatus === 'running' && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && missionStatus === 'running') {
      setMissionStatus('failed'); // 時間到，伺服器崩潰
    }
    return () => clearInterval(timer);
  }, [activePhase, missionStatus, timeLeft]);

  const formatCountdown = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    setCode(starterCode[newLang]); 
  };

  const getFileExtension = (lang) => {
    const exts = { javascript: 'js', python: 'py', cpp: 'cpp', java: 'java' };
    return exts[lang];
  };

  // 處理切換 Phase 時的狀態重置
  const handlePhaseChange = (id) => {
    setActivePhase(id);
    setConsoleOutput('');
    setIsExecuting(false);
    if (id !== 4 && missionStatus !== 'idle') {
      setMissionStatus('idle');
      setTimeLeft(900);
    }
  };

  // 🌟 Phase 3: 模擬執行程式碼 (Run Code)
  const handleRunCode = () => {
    if (isExecuting) return;
    setIsExecuting(true);
    setConsoleOutput('> Initiating secure container...\n> Compiling code...');

    // 模擬網路延遲與執行時間
    setTimeout(() => {
      setConsoleOutput(prev => prev + '\n> Running 52 test cases...\n> \n> ✅ Accepted!\n> Runtime: 42 ms (Beats 89.5%)\n> Memory: 16.4 MB\n> Time Complexity: O(n) Validated\n> \n> 🎯 系統提示：您的肌肉記憶正在穩步強化！');
      setIsExecuting(false);
    }, 1500);
  };

  // 🌟 Phase 4: 啟動任務
  const startMission = () => {
    setTimeLeft(900);
    setMissionStatus('running');
    setConsoleOutput('> System under heavy load...\n> Awaiting emergency patch deployment...');
  };

  // 🌟 Phase 4: 模擬部署到正式環境 (Deploy)
  const handleDeploy = () => {
    if (missionStatus !== 'running') return;
    setMissionStatus('deploying');
    setConsoleOutput('> Initiating emergency deployment...\n> Bypassing standard CI/CD due to critical load...');

    setTimeout(() => {
      setConsoleOutput(prev => prev + '\n> Compiling optimal DP graph...\n> Routing traffic to new instances...');
    }, 1500);

    setTimeout(() => {
      setMissionStatus('success');
      setConsoleOutput(prev => prev + '\n> \n> 🚀 SUCCESS: Traffic stabilized!\n> Server load reduced by 85%. You saved the company!');
    }, 3500);
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
            <h2 className="text-base sm:text-lg font-serif">動態規劃 (Dynamic Programming) 核心概念</h2>
          </div>
        </div>
        <div className="text-[11px] sm:text-xs font-medium bg-blue-600 px-3 py-1.5 rounded-full whitespace-nowrap">
          自適應網路學習艙 (Learning Models)
        </div>
      </header>

      <div className="flex flex-col lg:flex-row flex-1 overflow-y-auto lg:overflow-hidden">
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-12">
          <div className="max-w-7xl mx-auto space-y-8">
            
            {activePhase === 1 && (
              <div className="space-y-6 animate-fade-in max-w-3xl">
                <div className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold tracking-widest uppercase">Structural-Knowledge: Phase 1</div>
                <h3 className="text-3xl font-serif text-slate-900">生活中的動態規劃：爬樓梯的哲學</h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  想像一下，您正在爬一個 10 階的樓梯。您每次只能跨 <strong>1 階</strong> 或 <strong>2 階</strong>。請問您有幾種方法可以爬到頂端？
                </p>
                <div className="bg-[#F8FAFC] border border-slate-200 p-6 rounded-2xl shadow-sm">
                  <h4 className="font-bold text-slate-800 mb-3">💡 認知鷹架 (Cognitive Scaffolding)：</h4>
                  <ul className="space-y-3 text-slate-600">
                    <li>• 如果只爬 1 階，只有 1 種方法。</li>
                    <li>• 如果爬 2 階，有 2 種方法 (1+1 或 直接跨2)。</li>
                    <li>• 如果要爬第 3 階呢？您必定是從「第1階跨兩步」或「第2階跨一步」上來的。</li>
                  </ul>
                  <div className="mt-6 p-4 bg-blue-50 text-blue-800 rounded-xl border border-blue-100 font-medium">
                    🎯 <strong>核心直覺：</strong>「今天問題的答案，其實就藏在昨天跟前天的答案裡！」這就是動態規劃的本質。
                  </div>
                </div>
              </div>
            )}

            {activePhase === 2 && (
              <div className="space-y-6 animate-fade-in max-w-3xl">
                <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold tracking-widest uppercase">Structural-Knowledge: Phase 2</div>
                <h3 className="text-3xl font-serif text-slate-900">漸進正式化：狀態轉移方程式</h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  現在，我們要把剛剛「爬樓梯」的直覺，轉化為電腦看得懂的<strong>數學模型與嚴謹的資料結構</strong>。
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Step A: 定義狀態</h4>
                    <p className="text-slate-700 font-medium font-mono bg-slate-50 p-3 rounded-lg border border-slate-100">dp[i] = 爬到第 i 階的方法總數</p>
                  </div>
                  <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Step B: 狀態轉移方程</h4>
                    <p className="text-slate-700 font-medium font-mono bg-slate-50 p-3 rounded-lg border border-slate-100 text-center text-lg">dp[i] = dp[i-1] + dp[i-2]</p>
                  </div>
                </div>
              </div>
            )}

            {activePhase === 3 && (
              <div className="space-y-4 animate-fade-in flex flex-col h-full">
                <div className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold tracking-widest uppercase mb-2 w-max">Structural-Knowledge: Phase 3</div>
                <h3 className="text-2xl sm:text-3xl font-serif text-slate-900">技能自動化：刻意練習區</h3>
                
                <div className="min-h-[70vh] flex flex-col bg-[#1E1E1E] rounded-2xl overflow-hidden border border-slate-700 shadow-2xl mt-2">
                  <div className="bg-[#2D2D2D] px-4 py-3 flex items-center justify-between border-b border-slate-700">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="ml-2 text-sm font-mono text-slate-300 font-bold">solution.{getFileExtension(language)}</span>
                    </div>
                    <select value={language} onChange={handleLanguageChange} className="bg-[#1E1E1E] text-slate-300 text-sm font-mono border border-slate-600 rounded px-3 py-1.5 focus:outline-none focus:border-blue-500">
                      <option value="javascript">JavaScript</option>
                      <option value="python">Python 3</option>
                      <option value="cpp">C++</option>
                      <option value="java">Java</option>
                    </select>
                  </div>
                  
                  <textarea 
                    value={code} onChange={(e) => setCode(e.target.value)} 
                    className="flex-1 w-full bg-transparent text-[#D4D4D4] font-mono text-base leading-relaxed p-6 focus:outline-none resize-none" spellCheck="false">
                  </textarea>

                  {/* 🌟 Phase 3 終端機畫面 */}
                  <div className="h-32 bg-[#0D0D0D] border-t border-slate-700 p-4 overflow-y-auto font-mono text-sm text-green-400 whitespace-pre-wrap shadow-inner">
                    {consoleOutput || '> Ready for execution. Press Run Code to start.'}
                  </div>
                  
                  <div className="bg-[#2D2D2D] px-6 py-4 flex justify-between items-center border-t border-slate-700">
                    <span className="text-sm text-slate-400 hidden sm:block">基礎鷹架輔助已開啟，無時間限制。</span>
                    <button 
                      onClick={handleRunCode}
                      disabled={isExecuting}
                      className={`text-white text-sm font-bold px-6 py-2.5 rounded-lg transition-all shadow-sm ${isExecuting ? 'bg-green-800 cursor-not-allowed opacity-70' : 'bg-green-600 hover:bg-green-500 hover:-translate-y-0.5'}`}
                    >
                      {isExecuting ? '⏳ Executing...' : '▶ Run Code'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activePhase === 4 && (
              <div className="space-y-6 animate-fade-in flex flex-col h-full">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div>
                    <div className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-bold tracking-widest uppercase mb-3">Complex-Problem Learning</div>
                    <h3 className="text-2xl sm:text-3xl font-serif text-slate-900">任務導向：雲端伺服器負載最佳化</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mt-1 max-w-4xl">
                      大流量衝擊情境。您必須在伺服器崩潰前（時間限制內），結合 DP 知識在左側畫板擬定策略，並在右側進行代碼部署。
                    </p>
                  </div>
                  
                  {/* 倒數計時器 */}
                  <div className={`text-center p-4 rounded-2xl border-2 shadow-sm shrink-0 w-full sm:w-auto ${timeLeft < 300 && missionStatus === 'running' ? 'bg-red-50 border-red-200 text-red-700 animate-pulse' : 'bg-slate-900 border-slate-800 text-white'}`}>
                    <div className="text-[10px] font-bold uppercase tracking-widest mb-1 opacity-80">Server Crash In</div>
                    <div className="text-2xl sm:text-3xl font-mono font-bold tracking-wider">{formatCountdown(timeLeft)}</div>
                    {missionStatus === 'idle' && (
                      <button onClick={startMission} className="mt-2 text-xs bg-white text-slate-900 px-3 py-1 rounded-md font-bold hover:bg-slate-200 transition-colors w-full">Accept Mission</button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-2">
                  
                  {/* 探究式計畫板 */}
                  <div className="grid lg:col-span-4 bg-purple-50/60 border border-purple-100 p-6 rounded-2xl flex flex-col min-h-[300px] lg:min-h-full">
                    <h4 className="font-bold text-purple-900 mb-2 flex items-center gap-2">
                      <span>🕵️‍♂️</span> 探究式計畫板 (Inquiry Plan)
                    </h4>
                    <p className="text-xs text-purple-700 mb-4 leading-relaxed">
                      科學家思考專區：請寫下您的變數假設、已知的流量限制、以及推導出的 DP 狀態轉移方程式。
                    </p>
                    <textarea 
                      className="flex-1 w-full bg-white border border-purple-200 rounded-xl p-4 text-base leading-relaxed text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-inner"
                      placeholder="1. 我的核心提問是...\n2. 已知流量極值為...\n3. 狀態方程式推導: dp[i] = ..."
                      disabled={missionStatus !== 'running'}
                    ></textarea>
                  </div>

                  {/* Coding Editor */}
                  <div className="grid lg:col-span-8 min-h-[75vh] bg-[#1E1E1E] rounded-2xl overflow-hidden border border-slate-700 shadow-2xl relative flex flex-col">
                    
                    {/* 🌟 任務失敗 Overlay */}
                    {missionStatus === 'failed' && (
                      <div className="absolute inset-0 bg-red-900/90 backdrop-blur-md z-30 flex flex-col items-center justify-center text-white p-6 text-center animate-fade-in">
                        <span className="text-6xl mb-4">💥</span>
                        <h3 className="text-3xl font-bold mb-2">伺服器已崩潰</h3>
                        <p className="text-slate-300 max-w-md mb-8">流量超載，系統未能及時獲得最佳化演算法。這就是真實工程世界的殘酷與限制。</p>
                        <button onClick={startMission} className="bg-white text-red-900 px-8 py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform">重新挑戰 (Respawn)</button>
                      </div>
                    )}

                    {/* 🌟 任務成功 Overlay */}
                    {missionStatus === 'success' && (
                      <div className="absolute inset-0 bg-green-900/90 backdrop-blur-md z-30 flex flex-col items-center justify-center text-white p-6 text-center animate-fade-in">
                        <span className="text-6xl mb-4">🏆</span>
                        <h3 className="text-3xl font-bold mb-2">危機解除！</h3>
                        <p className="text-green-100 max-w-md mb-8">您成功在時限內部署了 O(n) 的最佳化解法。這就是<strong>任務導向學習</strong>為您培養出的抗壓能力與 AQ！</p>
                        <button onClick={() => setMissionStatus('idle')} className="bg-white text-green-900 px-8 py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform">返回訓練艙</button>
                      </div>
                    )}

                    {/* 🌟 任務待命中 Overlay */}
                    {missionStatus === 'idle' && (
                      <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm z-20 flex flex-col items-center justify-center text-white p-6 animate-fade-in">
                        <span className="text-4xl mb-3">⚠️</span>
                        <h3 className="text-lg font-bold mb-1">任務導向壓力測試 (Mission-Based)</h3>
                        <p className="text-xs text-slate-400 max-w-md text-center mb-6">點擊上方 Accept Mission 開始計時。獨立突圍以建立面對逆境的 AQ 核心素養。</p>
                        <button onClick={startMission} className="bg-purple-600 hover:bg-purple-500 px-6 py-2.5 rounded-xl font-bold text-sm transition-transform hover:scale-105 shadow-md">點此開始鎖定計時</button>
                      </div>
                    )}
                    
                    <div className="bg-[#2D2D2D] px-4 py-3 flex items-center justify-between border-b border-slate-700">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="ml-2 text-sm font-mono text-slate-300 font-bold">optimize_server.{getFileExtension(language)}</span>
                      </div>
                      <select value={language} onChange={handleLanguageChange} disabled={missionStatus !== 'running'} className="bg-[#1E1E1E] text-slate-300 text-sm font-mono border border-slate-600 rounded px-3 py-1.5 focus:outline-none">
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python 3</option>
                      </select>
                    </div>

                    <textarea 
                      value={code} onChange={(e) => setCode(e.target.value)} disabled={missionStatus !== 'running'}
                      className="flex-1 w-full bg-transparent text-[#D4D4D4] font-mono text-base leading-relaxed p-6 focus:outline-none resize-none" spellCheck="false"
                    ></textarea>
                    
                    {/* 🌟 Phase 4 終端機畫面 */}
                    <div className="h-40 bg-[#0D0D0D] border-t border-slate-700 p-4 overflow-y-auto font-mono text-sm text-purple-400 whitespace-pre-wrap shadow-inner">
                      {consoleOutput || '> System standing by...'}
                    </div>

                    <div className="bg-[#2D2D2D] px-6 py-4 flex justify-between items-center border-t border-slate-700">
                      <span className="text-xs sm:text-sm text-amber-500 font-medium flex items-center gap-2 hidden sm:flex">
                        <span className="animate-pulse">🔥</span> 社會鷹架關閉，獨立除錯中
                      </span>
                      <button 
                        onClick={handleDeploy}
                        disabled={missionStatus !== 'running'} 
                        className={`text-white text-sm font-bold px-8 py-3 rounded-lg transition-all shadow-sm ${missionStatus === 'running' ? 'bg-purple-600 hover:bg-purple-500 hover:-translate-y-0.5 shadow-purple-500/30' : 'bg-slate-600 cursor-not-allowed opacity-50'}`}
                      >
                        {missionStatus === 'deploying' ? '⏳ Deploying...' : '🚀 Deploy to Production'}
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            )}

          </div>
        </main>

        <aside className="w-full lg:w-[340px] bg-white border-t lg:border-t-0 lg:border-l border-slate-200 p-6 shadow-[inset_1px_0_0_rgba(0,0,0,0.05)] flex flex-col shrink-0">
          <h3 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-6">Network Learning Models</h3>
          
          <div className="space-y-4 relative before:absolute before:inset-0 before:ml-[1.1rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-blue-500 before:to-purple-500 hidden lg:block"></div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {[
              { id: 1, type: 'Structural', title: '非正式概念 (Informal)', desc: '提供日常譬喻心智模型', icon: '🧠', color: 'blue' },
              { id: 2, type: 'Structural', title: '漸進正式化 (Formalization)', desc: '抽象為數學方程與 Big O', icon: '📐', color: 'blue' },
              { id: 3, type: 'Structural', title: '技能自動化 (Automation)', desc: '無壓力刻意練習固化語法', icon: '⌨️', color: 'blue' },
              { id: 4, type: 'Complex', title: '任務導向學習 (Mission-based)', desc: '高壓真實情境，探究式除錯', icon: '🔥', color: 'purple' },
            ].map((step) => (
              <button 
                key={step.id} onClick={() => handlePhaseChange(step.id)}
                className={`relative z-10 flex items-start gap-4 p-4 rounded-2xl text-left transition-all duration-300 w-full ${
                  activePhase === step.id 
                    ? (step.color === 'purple' ? 'bg-purple-50 border border-purple-200 shadow-sm scale-102' : 'bg-blue-50 border border-blue-200 shadow-sm scale-102') 
                    : 'bg-white border border-slate-100 hover:bg-slate-50 opacity-70 hover:opacity-100'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm text-lg ${
                  activePhase === step.id ? (step.color === 'purple' ? 'bg-purple-600 text-white' : 'bg-[#2563EB] text-white') : 'bg-slate-100 text-slate-500'
                }`}>
                  {step.icon}
                </div>
                <div>
                  <div className={`text-[10px] font-bold uppercase tracking-widest mb-0.5 ${activePhase === step.id ? (step.color === 'purple' ? 'text-purple-600' : 'text-blue-600') : 'text-slate-400'}`}>
                    {step.type} Space
                  </div>
                  <h4 className="text-sm font-bold text-slate-800">{step.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-tight">{step.desc}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-8 lg:mt-auto pt-6 border-t border-slate-100">
            <div className="bg-purple-50 border border-purple-100 p-4 rounded-2xl">
              <h4 className="text-[11px] font-bold text-purple-900 uppercase tracking-widest mb-2">HPL 網路學習模式適切性</h4>
              <p className="text-[11px] text-purple-800 leading-relaxed space-y-1">
                <span>• <strong>Phase 1~3 (結構化知識)</strong>：利用 AI 與圖像建立解題直覺。</span>
                <span className="block mt-1">• <strong>Phase 4 (複雜問題)</strong>：關閉提示、加載計畫板與 15 分鐘計時器，鍛鍊在壓力情境下將挫折轉換為機會的能力 (AQ)。</span>
              </p>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}