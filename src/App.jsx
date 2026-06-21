import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopNavigation from './components/TopNavigation';
import AIAssistant from './components/AIAssistant';

import Registration from './pages/Registration';
import Dashboard from './pages/Dashboard';
import CourseInfo from './pages/CourseInfo';
import VirtualClassroom from './pages/VirtualClassroom';
import Library from './pages/Library';
import Feedback from './pages/Feedback';
import Completion from './pages/Completion';

export default function App() {
  
  // 🌟 改良後的全域計時器：即時同步到 Supabase
  useEffect(() => {
    const trackTime = async () => {
      const todayStr = new Date().toISOString().split('T')[0];

      // 1. 先從 Supabase 抓取當前資料
      const { data } = await supabase
        .from('dsa_online_history')
        .select('seconds')
        .eq('date', todayStr)
        .single();

      const currentSeconds = data ? data.seconds : 0;

      // 2. 更新資料庫
      await supabase
        .from('dsa_online_history')
        .upsert({ date: todayStr, seconds: currentSeconds + 1 }, { onConflict: 'date' });
    };

    const interval = setInterval(trackTime, 1000);
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