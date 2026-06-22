import React from 'react';
import { Link } from 'react-router-dom';

export default function CourseInfo() {
  return (
    <div className="min-h-screen bg-[#FDFCFB] text-slate-800 font-sans p-6 md:p-12 animate-fade-in">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* 頂部英雄區塊 */}
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
              本課程不僅傳授技術，更基於《How People Learn》學習科學設計。透過建構安全、允許犯錯的社群環境，培養您面對複雜問題的 AQ (挫折忍受力) 與解題思維。
            </p>
            
            <div className="flex flex-wrap gap-4">
              {/* 🌟 真實功能連結 */}
              <Link to="/dashboard" className="bg-white text-slate-900 px-8 py-3 rounded-full font-bold shadow-sm hover:bg-slate-50 transition-transform hover:-translate-y-0.5 inline-block">
                進入我的學習主頁
              </Link>
              <Link to="/classroom" className="bg-transparent border border-white/30 text-white px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-colors inline-block">
                預覽虛擬教室
              </Link>
            </div>
          </div>
        </header>

        {/* 教育理念展示區 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-12">
            <section>
              <div className="inline-block px-3 py-1 bg-[#F0F4F8] text-[#2563EB] rounded-full text-xs font-bold tracking-widest uppercase mb-4">
                Pedagogical Foundation
              </div>
              <h2 className="text-2xl font-serif text-slate-900 mb-6">四大核心學習環境 (HPL Framework)</h2>
              <p className="text-slate-600 leading-relaxed mb-8">
                本系統架構嚴格遵循學習環境設計原則，確保「教什麼」、「怎麼教」與「怎麼評量」達到高度一致性：
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: '學習者中心 (Learner-centered)', desc: '系統即時診斷先備知識，並透過動態儀表板與學習足跡，搭起演算法教材與學員之間的橋樑。', icon: '👤' },
                  { title: '知識中心 (Knowledge-centered)', desc: '採用結構化知識學習模式，引導學生進行「漸進正式化」，在促成理解與技能自動化間取得平衡。', icon: '🧠' },
                  { title: '評量中心 (Assessment-centered)', desc: '摒棄單一總結性考試。提供自我評量、實作任務打卡等「形成性評量」，隨時提供與時俱進的回饋。', icon: '📊' },
                  { title: '社群中心 (Community-centered)', desc: '建構允許「因學習而犯錯」的安全環境。透過 GitHub 貢獻度整合，鼓勵對社會與同儕貢獻所長。', icon: '🤝' },
                ].map((item, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-2xl mb-3">{item.icon}</div>
                    <h3 className="font-bold text-slate-800 mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-slate-900 mb-6">多元商數培養 (Expanded Goals)</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                面對未來的挑戰，工程師需要的遠不止是智商 (IQ)。本平台將複雜的演算法問題設計為「任務導向學習 (Mission-based learning)」，為學員提供以下全方位的能力訓練：
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 bg-[#F8FAFC] p-4 rounded-xl border border-slate-100">
                  <span className="w-8 h-8 rounded-full bg-[#E0E7FF] text-[#2563EB] flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">AQ</span>
                  <div>
                    <strong className="text-slate-800 block mb-1">挫折忍受力 (Adversity Quotient)</strong>
                    <span className="text-slate-600 text-sm">LeetCode 實戰常伴隨無數次的 Compile Error。我們透過 AI 條例輔助，訓練學員在失敗壓力下將障礙轉化為機會。</span>
                  </div>
                </li>
                <li className="flex items-start gap-3 bg-[#F8FAFC] p-4 rounded-xl border border-slate-100">
                  <span className="w-8 h-8 rounded-full bg-[#E0E7FF] text-[#2563EB] flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">CQ</span>
                  <div>
                    <strong className="text-slate-800 block mb-1">創造性問題解決 (Creativity Quotient)</strong>
                    <span className="text-slate-600 text-sm">鼓勵探究式學習，讓學員如科學家般提問與計畫，以多種時間與空間複雜度 (Big O) 的面向來創造最佳解法。</span>
                  </div>
                </li>
              </ul>
            </section>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-xs font-bold tracking-widest text-amber-700 uppercase mb-4 pl-1">系統學習機制</h2>
              <div className="bg-[#FFFDF5] border border-amber-200 rounded-3xl p-6 shadow-sm">
                <h3 className="font-serif text-lg text-amber-900 mb-3">網路學習模式 (Models)</h3>
                <div className="space-y-4 text-sm text-amber-800">
                  <p>
                    <strong>1. 結構化知識學習：</strong><br />
                    針對基礎演算法 (如 Array, DP)，系統配置 AI 助教作為「認知鷹架」，陪伴學員循序漸進。
                  </p>
                  <div className="w-full h-px bg-amber-200/50"></div>
                  <p>
                    <strong>2. 複雜問題學習：</strong><br />
                    針對跨領域應用，鼓勵學員透過外部 Library 與社群資源，將知識進行跨模塊的整合。
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>

      </div>
    </div>
  );
}