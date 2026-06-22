import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, Link, useLocation } from 'react-router-dom';
import AIAssistant from './components/AIAssistant';
import { supabase } from './supabaseClient'; 

import Registration from './pages/Registration';
import Dashboard from './pages/Dashboard';
import CourseInfo from './pages/CourseInfo';
import VirtualClassroom from './pages/VirtualClassroom';
import Library from './pages/Library';
import Feedback from './pages/Feedback';
import Completion from './pages/Completion';

const ProtectedRoute = ({ children, session }) => {
  if (!session) return <Navigate to="/" replace />;
  return children;
};

const AppContent = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation(); 

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (_event === 'SIGNED_OUT') navigate('/');
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  // 🌟 修改：精準寫入專屬 user_id 的時間
  useEffect(() => {
    if (!session) return; 

    const trackTime = async () => {
      const now = new Date();
      const offset = now.getTimezoneOffset();
      const localDate = new Date(now.getTime() - (offset * 60 * 1000));
      const todayStr = localDate.toISOString().split('T')[0];
      const userId = session.user.id; // 取得當前使用者 ID

      try {
        // 先查詢今天該使用者是否已有紀錄
        const { data } = await supabase
          .from('dsa_online_history')
          .select('id, seconds')
          .eq('user_id', userId)
          .eq('date', todayStr)
          .maybeSingle(); 

        if (data) {
          // 如果有紀錄，秒數 +1
          await supabase.from('dsa_online_history').update({ seconds: data.seconds + 1 }).eq('id', data.id);
        } else {
          // 如果沒有，創建一筆新的
          await supabase.from('dsa_online_history').insert({ user_id: userId, date: todayStr, seconds: 1 });
        }
      } catch (err) {
        console.error("計時器同步錯誤:", err);
      }
    };

    const interval = setInterval(trackTime, 1000);
    return () => clearInterval(interval);
  }, [session]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#FDFCFB]">載入系統中...</div>;
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const getNavLinkClass = (path) => {
    const baseClass = "h-16 flex items-center px-1 pt-0.5 border-b-2 text-sm font-semibold tracking-wide transition-all ";
    return location.pathname === path 
      ? `${baseClass} border-blue-600 text-blue-600 font-bold` 
      : `${baseClass} border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300`;
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-slate-800 font-sans relative flex flex-col">
      
      {/* 🌟 修改：只在 session 存在 (已登入) 時才渲染導覽列，未登入時完全隱藏 */}
      {session && (
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm shrink-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link to="/dashboard" className="flex items-center gap-2 group shrink-0">
                <div className="w-8 h-8 bg-slate-900 group-hover:bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold transition-colors">D</div>
                <span className="font-serif font-bold text-slate-900 tracking-wide hidden lg:block">Algorithms</span>
              </Link>
              
              <nav className="hidden md:flex items-center gap-6 lg:gap-8">
                <Link to="/dashboard" className={getNavLinkClass('/dashboard')}>學習主頁</Link>
                <Link to="/course/cs-201" className={getNavLinkClass('/course/cs-201')}>課程大綱</Link>
                <Link to="/classroom" className={getNavLinkClass('/classroom')}>虛擬教室</Link>
                <Link to="/library" className={getNavLinkClass('/library')}>共學資源</Link>
                <Link to="/feedback" className={getNavLinkClass('/feedback')}>自我評量</Link>
                <Link to="/completion" className={getNavLinkClass('/completion')}>結業證書</Link>
              </nav>
            </div>
            
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs font-semibold text-slate-500 hidden sm:inline-block bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-full shadow-inner max-w-[140px] lg:max-w-[200px] truncate" title={session.user.email}>
                👤 {session.user.email}
              </span>
              <button 
                onClick={handleSignOut} 
                className="text-xs font-bold text-red-500 hover:text-white border border-red-200 hover:bg-red-500 px-3.5 py-1.5 rounded-full transition-all"
              >
                登出
              </button>
            </div>
          </div>

          <nav className="md:hidden flex flex-wrap justify-around border-t border-slate-100 bg-white py-2 px-1 text-[11px] font-bold shadow-inner gap-x-2 gap-y-1">
            <Link to="/dashboard" className={`px-2 py-0.5 rounded-md ${location.pathname === '/dashboard' ? 'bg-blue-50 text-blue-600' : 'text-slate-500'}`}>主頁</Link>
            <Link to="/course/cs-201" className={`px-2 py-0.5 rounded-md ${location.pathname === '/course/cs-201' ? 'bg-blue-50 text-blue-600' : 'text-slate-500'}`}>大綱</Link>
            <Link to="/classroom" className={`px-2 py-0.5 rounded-md ${location.pathname === '/classroom' ? 'bg-blue-50 text-blue-600' : 'text-slate-500'}`}>教室</Link>
            <Link to="/library" className={`px-2 py-0.5 rounded-md ${location.pathname === '/library' ? 'bg-blue-50 text-blue-600' : 'text-slate-500'}`}>資源</Link>
            <Link to="/feedback" className={`px-2 py-0.5 rounded-md ${location.pathname === '/feedback' ? 'bg-blue-50 text-blue-600' : 'text-slate-500'}`}>評量</Link>
            <Link to="/completion" className={`px-2 py-0.5 rounded-md ${location.pathname === '/completion' ? 'bg-blue-50 text-blue-600' : 'text-slate-500'}`}>證書</Link>
          </nav>
        </header>
      )}
      
      <main className="flex-1 flex flex-col">
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/dashboard" element={<ProtectedRoute session={session}><Dashboard /></ProtectedRoute>} />
          <Route path="/course/cs-201" element={<ProtectedRoute session={session}><CourseInfo /></ProtectedRoute>} />
          <Route path="/classroom" element={<ProtectedRoute session={session}><VirtualClassroom /></ProtectedRoute>} />
          <Route path="/library" element={<ProtectedRoute session={session}><Library /></ProtectedRoute>} />
          <Route path="/feedback" element={<ProtectedRoute session={session}><Feedback /></ProtectedRoute>} />
          <Route path="/completion" element={<ProtectedRoute session={session}><Completion /></ProtectedRoute>} />
        </Routes>
      </main>
      
      {session && <AIAssistant />}
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}