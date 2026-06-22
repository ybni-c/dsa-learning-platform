import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function Completion() {
  const [userEmail, setUserEmail] = useState('Loading...');
  const [stats, setStats] = useState({
    completedTasks: 0,
    totalHours: '0'
  });

  // 🌟 從雲端抓取真實登入的使用者與歷程數據
  useEffect(() => {
    const fetchCertData = async () => {
      // 1. 抓取當前帳號的 Email
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email);
      }

      // 2. 統計完成的學習任務
      const { data: tasks } = await supabase.from('dsa_tasks').select('completed');
      let completedCount = 0;
      if (tasks) {
        completedCount = tasks.filter(t => t.completed).length;
      }

      // 3. 統計累積的雲端在線時數
      let totalSeconds = 0;
      if (user) {
        // 🌟 修改點：加上 eq('user_id', user.id)
        const { data: history } = await supabase.from('dsa_online_history').select('seconds').eq('user_id', user.id);
        if (history) {
          history.forEach(h => totalSeconds += h.seconds);
        }
      }
      const hours = (totalSeconds / 3600).toFixed(1);

      setStats({
        completedTasks: completedCount,
        totalHours: hours
      });
    };

    fetchCertData();
  }, []);

  // 🌟 實作真實的列印功能 (列印時會自動隱藏按鈕，只留下證書本體)
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-slate-800 font-sans p-4 sm:p-12 flex flex-col items-center justify-center animate-fade-in print:bg-white print:p-0">
      <div className="max-w-4xl w-full space-y-8 print:space-y-0">
        
        {/* 頂部控制列 (列印時會自動隱藏) */}
        <div className="flex justify-between items-center bg-white border border-slate-200 p-4 rounded-2xl shadow-sm print:hidden">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Summative Certificate Verified</span>
          </div>
          <div className="flex gap-3">
            <button onClick={handlePrint} className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-5 py-2 rounded-xl transition-transform hover:-translate-y-0.5 shadow-sm">
              🖨️ 列印 / 儲存為 PDF
            </button>
            <Link to="/dashboard" className="border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold px-5 py-2 rounded-xl transition-colors">
              返回學習主頁
            </Link>
          </div>
        </div>

        {/* 📜 經典學術證書本體 */}
        <div className="bg-white border-[16px] border-double border-slate-800 rounded-3xl p-8 sm:p-16 text-center relative shadow-2xl print:shadow-none print:border-[12px] print:my-0">
          
          {/* 四角古典花紋裝飾 */}
          <div className="absolute top-4 left-4 text-slate-300 font-serif text-xl select-none hidden sm:block">❖</div>
          <div className="absolute top-4 right-4 text-slate-300 font-serif text-xl select-none hidden sm:block">❖</div>
          <div className="absolute bottom-4 left-4 text-slate-300 font-serif text-xl select-none hidden sm:block">❖</div>
          <div className="absolute bottom-4 right-4 text-slate-300 font-serif text-xl select-none hidden sm:block">❖</div>

          <div className="space-y-8">
            {/* 證書大標題 */}
            <div className="space-y-2">
              <div className="text-amber-600 font-serif font-bold tracking-widest text-sm uppercase">Certificate of Completion</div>
              <h1 className="text-4xl sm:text-5xl font-serif text-slate-900 font-medium tracking-wide">結業證明書</h1>
            </div>

            <div className="w-24 h-0.5 bg-slate-300 mx-auto"></div>

            {/* 頒發內文 */}
            <div className="space-y-4 max-w-2xl mx-auto">
              <p className="text-slate-400 font-serif italic text-sm">此證明榮譽頒發予平台認證學員</p>
              <h2 className="text-2xl sm:text-3xl font-mono font-bold text-blue-700 bg-blue-50/50 inline-block px-6 py-2 rounded-2xl border border-blue-100/50 shadow-inner">
                {userEmail}
              </h2>
              <p className="text-slate-600 leading-relaxed text-base sm:text-lg font-medium pt-4">
                該學員已成功修畢雲端網際網路精準指引課程<strong>《CS-201 資料結構與演算法核心實戰》</strong>。在學習歷程中，表現出優異的自主探究精神與後設認知監控能力。
              </p>
            </div>

            {/* e-Portfolio 實體驗證數據 (與雲端同步) */}
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto bg-slate-50 border border-slate-200/60 p-4 rounded-2xl text-left shadow-inner">
              <div className="border-r border-slate-200 pl-2">
                <span className="text-[11px] text-slate-400 block uppercase font-bold tracking-wider">已克復學習任務</span>
                <span className="text-xl font-serif font-bold text-slate-800">{stats.completedTasks} / 3 個演算法任務</span>
              </div>
              <div className="pl-4">
                <span className="text-[11px] text-slate-400 block uppercase font-bold tracking-wider">累積在線研習時數</span>
                <span className="text-xl font-serif font-bold text-green-600">{stats.totalHours} 實際小時</span>
              </div>
            </div>

            <p className="text-slate-500 text-xs max-w-md mx-auto leading-relaxed pt-2">
              特發此證，以茲證明。本證書數據經由全域狀態即時分析，並由雲端資料庫 permanent 儲存驗證。
            </p>

            {/* 證書底部簽章區 */}
            <div className="flex justify-between items-end pt-12 max-w-xl mx-auto flex-wrap gap-6 text-left">
              <div className="space-y-1">
                <div className="text-xs text-slate-400 font-serif">發證日期 (Issued Date)</div>
                <div className="text-sm font-bold text-slate-700 font-mono">{new Date().toLocaleDateString('zh-TW')}</div>
              </div>
              
              {/* 金色認證徽章 */}
              <div className="w-16 h-16 bg-amber-100 border-2 border-dashed border-amber-400 rounded-full flex items-center justify-center text-3xl mx-auto sm:mx-0 shadow-sm select-none" title="HPL Certified">
                🏅
              </div>

              <div className="space-y-1 border-t border-slate-300 pt-2 w-44 text-center">
                <div className="font-serif text-sm font-bold text-slate-800">數位學習系統</div>
                <div className="text-[10px] text-slate-400 tracking-wider">AI TUTOR SYSTEM</div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}