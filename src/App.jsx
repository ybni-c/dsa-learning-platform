import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopNavigation from './components/TopNavigation';
import AIAssistant from './components/AIAssistant';

// 🌟 匯入 Supabase 客戶端
import { supabase } from './supabaseClient'; 

import Registration from './pages/Registration';
import Dashboard from './pages/Dashboard';
import CourseInfo from './pages/CourseInfo';
import VirtualClassroom from './pages/VirtualClassroom';
import Library from './pages/Library';
import Feedback from './pages/Feedback';
import Completion from './pages/Completion';

export default function App() {
  
  // 🌟 升級版全域計時器：即時同步到 Supabase 雲端
  useEffect(() => {
    const trackTime = async () => {
      // 取得本地時間的 YYYY-MM-DD
      const now = new Date();
      const offset = now.getTimezoneOffset();
      const localDate = new Date(now.getTime() - (offset * 60 * 1000));
      const todayStr = localDate.toISOString().split('T')[0];

      try {
        // 1. 先從 Supabase 抓取當天目前的秒數
        const { data, error: selectError } = await supabase
          .from('dsa_online_history')
          .select('seconds')
          .eq('date', todayStr)
          .single(); // 只抓單一筆

        // 就算找不到當天的資料 (selectError) 也沒關係，代表今天是第一次上線，秒數從 0 開始
        const currentSeconds = data ? data.seconds : 0;

        // 2. 把秒數 + 1 後，更新 (upsert) 回資料庫
        // upsert 的好處是：如果今天還沒有紀錄就「新增」，有紀錄就「更新」
        const { error: upsertError } = await supabase
          .from('dsa_online_history')
          .upsert(
            { date: todayStr, seconds: currentSeconds + 1 }, 
            { onConflict: 'date' } // 告訴資料庫，如果 date 欄位重複了，就用更新的
          );

        if (upsertError) {
          console.error("雲端計時同步失敗:", upsertError);
        }
      } catch (err) {
        console.error("計時器發生未預期錯誤:", err);
      }
    };

    // 為了不要讓資料庫被塞爆 (每秒寫入太頻繁)，我們改成每 5 秒同步一次雲端，一次加 5 秒
    // 這樣既能保持準確，又能減輕 Supabase 伺服器的負擔
    const interval = setInterval(() => {
      // 實際專案中，這裡可以寫成每 5 秒執行一次，然後 currentSeconds + 5
      // 但為了讓您馬上看到畫面上的跳動，我們維持 1 秒更新 1 次測試看看！
      trackTime();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-[#FDFCFB] text-slate-800 font-sans relative">
        <TopNavigation />
        <main>
          <Routes>
            <Route path="/" element={<Registration />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/course/cs-201" element={<CourseInfo />} />
            <Route path="/classroom" element={<VirtualClassroom />} />
            <Route path="/library" element={<Library />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/completion" element={<Completion />} />
          </Routes>
        </main>
        <AIAssistant />
      </div>
    </Router>
  );
}