import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function Feedback() {
  // 🌟 形成性評量狀態：學員對各學習目標的「自信度 (Confidence Level)」
  const [assessments, setAssessments] = useState({
    bigO: 2,
    twoPointers: 3,
    dp: 1,
    graphs: 2
  });

  // 檔案評量狀態：從雲端抓取學員的學習軌跡
  const [portfolioStats, setPortfolioStats] = useState({
    completedTasks: 0,
    totalTasks: 0,
    activeDays: 0
  });

  useEffect(() => {
    // 抓取學習檔案數據 (Portfolio Data)
    const fetchPortfolio = async () => {
      // 1. 抓取任務完成度
      const { data: tasks } = await supabase.from('dsa_tasks').select('*');
      if (tasks) {
        setPortfolioStats(prev => ({
          ...prev,
          totalTasks: tasks.length,
          completedTasks: tasks.filter(t => t.completed).length
        }));
      }

      // 2. 抓取活躍天數
      const { data: history } = await supabase.from('dsa_online_history').select('*');
      if (history) {
        setPortfolioStats(prev => ({
          ...prev,
          activeDays: history.filter(h => h.seconds > 0).length
        }));
      }
    };
    fetchPortfolio();
  }, []);

  const handleSliderChange = (topic, value) => {
    setAssessments(prev => ({ ...prev, [topic]: parseInt(value) }));
  };

  // 🌟 動態回饋引擎 (Dynamic Feedback Engine)
  const getFeedbackMessage = (topic, level) => {
    const messages = {
      bigO: {
        1: "Big O 是很抽象的概念。建議您回到『學習主頁』重新填寫先備知識問卷，系統會為您切換至『基礎概念軌道』。",
        2: "您已經能分辨 O(n) 和 O(n^2) 了！下一步，試著在實作迴圈時，在心裡默念它執行的次數。",
        3: "很棒！您已經掌握了時間複雜度的分析。可以開始挑戰空間複雜度 (Space Complexity) 的優化了。",
        4: "完美掌握！您現在的程度已經足以在面試中與考官討論各種資料結構的效能取捨了。"
      },
      dp: {
        1: "DP (動態規劃) 被公認是演算法中最具挫折感的一關。請千萬不要氣餒！建議您前往『虛擬教室』，先看 Phase 1 的爬樓梯圖解，不要急著寫程式。",
        2: "您已經理解了『記憶化 (Memoization)』的概念。接下來的難關是找出『狀態轉移方程式』，這需要大量的紙筆輔助。",
        3: "太好了！您已經能獨立寫出一維的 DP 陣列。您可以嘗試挑戰二維 DP（如背包問題）來深化技能自動化。",
        4: "這是一項了不起的成就！DP 已經成為您的直覺工具，您可以試著在討論區擔任同儕的『認知鷹架』了。"
      }
    };
    return messages[topic]?.[level] || "持續保持這個學習節奏，您正在穩步前進中！";
  };

  // 評估標籤對應
  const labels = ["需要協助 (Need Help)", "正在理解 (Getting There)", "具備信心 (Confident)", "能教導他人 (Can Teach)"];
  const getLabelColor = (level) => {
    const colors = ["text-red-600 bg-red-50", "text-amber-600 bg-amber-50", "text-blue-600 bg-blue-50", "text-green-600 bg-green-50"];
    return colors[level - 1];
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-slate-800 font-sans p-6 md:p-12 animate-fade-in">
      <div className="max-w-6xl mx-auto space-y-10">
        
        <header className="pb-6 flex justify-between items-end border-b border-slate-100">
          <div>
            <h1 className="text-4xl font-serif text-slate-900 mb-2">形成性評量與反思</h1>
            <p className="text-slate-500 text-sm tracking-wide">
              Formative Assessment & e-Portfolio
            </p>
          </div>
          <Link to="/dashboard" className="bg-white border border-slate-200 text-slate-600 px-6 py-2.5 rounded-full text-sm font-medium hover:bg-slate-50 shadow-sm transition-colors">
            返回主頁
          </Link>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* 左側：自我評量問卷 (Self-Assessment) */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
              <div className="mb-8">
                <div className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold tracking-widest uppercase mb-4">Self-Reflection</div>
                <h2 className="text-2xl font-serif text-slate-900 mb-2">學習目標自信度評估</h2>
                <p className="text-slate-500 text-sm">請誠實評估您對以下核心演算法的掌握度。本系統不會為您打分數，而是會根據您的狀態動態提供學習建議（形成性回饋）。</p>
              </div>

              <div className="space-y-10">
                {/* 評量項目 1: Big O */}
                <div>
                  <div className="flex justify-between items-end mb-4">
                    <h3 className="font-bold text-slate-800">Big O 複雜度分析</h3>
                    <span className={`text-xs font-bold px-3 py-1 rounded-md ${getLabelColor(assessments.bigO)}`}>
                      {labels[assessments.bigO - 1]}
                    </span>
                  </div>
                  <input 
                    type="range" min="1" max="4" step="1" 
                    value={assessments.bigO} 
                    onChange={(e) => handleSliderChange('bigO', e.target.value)}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="mt-4 p-4 bg-[#F8FAFC] rounded-xl border border-slate-100 text-sm text-slate-600 leading-relaxed flex gap-3">
                    <span className="text-lg">🤖</span>
                    <p>{getFeedbackMessage('bigO', assessments.bigO)}</p>
                  </div>
                </div>

                {/* 評量項目 2: DP */}
                <div>
                  <div className="flex justify-between items-end mb-4">
                    <h3 className="font-bold text-slate-800">動態規劃 (Dynamic Programming)</h3>
                    <span className={`text-xs font-bold px-3 py-1 rounded-md ${getLabelColor(assessments.dp)}`}>
                      {labels[assessments.dp - 1]}
                    </span>
                  </div>
                  <input 
                    type="range" min="1" max="4" step="1" 
                    value={assessments.dp} 
                    onChange={(e) => handleSliderChange('dp', e.target.value)}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="mt-4 p-4 bg-[#F8FAFC] rounded-xl border border-slate-100 text-sm text-slate-600 leading-relaxed flex gap-3">
                    <span className="text-lg">🤖</span>
                    <p>{getFeedbackMessage('dp', assessments.dp)}</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* 右側：學習檔案評量 (e-Portfolio) 與 HPL 解說 */}
          <div className="space-y-8">
            
            <section className="bg-slate-900 text-white rounded-3xl p-6 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full blur-2xl -mr-10 -mt-10"></div>
              <h3 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-6">學習檔案 (e-Portfolio)</h3>
              
              <div className="space-y-6 relative z-10">
                <div>
                  <p className="text-slate-400 text-xs mb-1">已解鎖任務 (Completed Tasks)</p>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-serif text-white">{portfolioStats.completedTasks}</span>
                    <span className="text-slate-500 mb-1">/ {portfolioStats.totalTasks || 3}</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full mt-3 overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full transition-all duration-1000"
                      style={{ width: `${portfolioStats.totalTasks ? (portfolioStats.completedTasks / portfolioStats.totalTasks) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <p className="text-slate-400 text-xs mb-1">累積活躍天數 (Active Days)</p>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-serif text-green-400">{portfolioStats.activeDays}</span>
                    <span className="text-slate-500 mb-1">天</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-amber-50 border border-amber-100 rounded-3xl p-6 shadow-sm">
              <h4 className="text-xs font-bold text-amber-800 uppercase tracking-widest mb-3">HPL 理論實踐：評量中心</h4>
              <p className="text-sm text-amber-900 leading-relaxed mb-4">
                本系統摒棄了傳統的「總結性測驗 (只給對錯與分數)」，改採 <strong>自我反思評量</strong> 與 <strong>學習檔案紀錄 (e-Portfolio)</strong>。
              </p>
              <ul className="text-xs text-amber-800 space-y-2">
                <li>✅ <strong>評量與目標一致：</strong> 評估項目精準對應 Big O 與 DP 等核心學習目標。</li>
                <li>✅ <strong>形成性回饋：</strong> 當您拉動滑桿時，系統會立即給予「下一步該怎麼做」的具體建議，將評量視為修正的機會，而非懲罰。</li>
              </ul>
            </section>

          </div>
        </div>

      </div>
    </div>
  );
}