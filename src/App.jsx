import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopNavigation from './components/TopNavigation';
import AIAssistant from './components/AIAssistant'; // 👈 1. 引入新做的 AI 助教積木

import Registration from './pages/Registration';
import Dashboard from './pages/Dashboard';
import CourseInfo from './pages/CourseInfo';
import VirtualClassroom from './pages/VirtualClassroom';
import Library from './pages/Library';
import Feedback from './pages/Feedback';
import Completion from './pages/Completion';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#FDFCFB] text-slate-800 font-sans relative">
        
        <TopNavigation />

        <main>
          <Routes>
            <Route path="/" element={<Registration />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/course/:courseId" element={<CourseInfo />} />
            <Route path="/classroom" element={<VirtualClassroom />} />
            <Route path="/library" element={<Library />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/completion" element={<Completion />} />
          </Routes>
        </main>

        {/* 👈 2. 將 AI 助教放在這裡，它就會固定出現在所有頁面的右下角 */}
        <AIAssistant />

      </div>
    </Router>
  );
}