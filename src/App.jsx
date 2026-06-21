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
  
  // 🌟 全域在線時間追蹤器 (跨頁面計時)
  useEffect(() => {
    const trackTime = () => {
      // 取得本地時間的 YYYY-MM-DD 字串
      const now = new Date();
      const offset = now.getTimezoneOffset();
      const localDate = new Date(now.getTime() - (offset * 60 * 1000));
      const todayStr = localDate.toISOString().split('T')[0];

      // 取出舊的歷史紀錄
      const savedHistory = localStorage.getItem('dsa_online_history');
      const history = savedHistory ? JSON.parse(savedHistory) : {};

      // 今天的在線秒數 + 1
      history[todayStr] = (history[todayStr] || 0) + 1;

      // 存回 localStorage
      localStorage.setItem('dsa_online_history', JSON.stringify(history));
    };

    // 每 1 秒執行一次計時
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