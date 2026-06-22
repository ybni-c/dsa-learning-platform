import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, Link, useLocation } from 'react-router-dom';
import TopNavigation from './components/TopNavigation';
import AIAssistant from './components/AIAssistant';
import { supabase } from './supabaseClient'; 

import Registration from './pages/Registration';
import Dashboard from './pages/Dashboard';
import CourseInfo from './pages/CourseInfo';
import VirtualClassroom from './pages/VirtualClassroom';
import Library from './pages/Library';
import Feedback from './pages/Feedback';
import Completion from './pages/Completion';

// 🛡️ 路由守衛組件：用來保護需要登入才能看的頁面
const ProtectedRoute = ({ children, session }) => {
  if (!session) {
    return <Navigate to="/" replace />;
  }
  return children;
};

// 內部主要包裝組件，以便正常呼叫 react-router-dom 的 hooks (如 useLocation)
const AppContent = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation(); // 取得當前網址路徑

  useEffect(() => {
    // 1. 初始化抓取 Session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // 2. 監聽登入狀態變化
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (_event === 'SIGNED_OUT') {
        navigate('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  // 全域在線計時器 (每秒自動同步累加至 Supabase)
  useEffect(() => {
    if (!session) return; 

    const trackTime = async () => {
      const now = new Date();
      const offset = now.getTimezoneOffset();
      const localDate = new Date(now.getTime() - (offset * 60 * 1000));
      const todayStr = localDate.toISOString().split('T')[0];

      try {
        const { data } = await supabase
          .from('dsa_online_history')
          .select('seconds')
          .eq('date', todayStr)
          .single(); 

        const currentSeconds = data ? data.seconds : 0;

        await supabase
          .from('dsa_online_history')
          .upsert(
            { date: todayStr, seconds: currentSeconds + 1 }, 
            { onConflict: 'date' } 
          );
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

  // 自動判斷當前頁面路徑，動態套用藍色高亮底線樣式
  const getNavLinkClass = (path) => {
    const baseClass = "h-16 flex items-center px-1 pt-0.5 border-b-2 text-sm font-semibold tracking-wide transition-all ";
    return location.pathname === path 
      ? `${baseClass} border-blue-600 text-blue-600 font-bold` 
      : `${baseClass} border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300`;
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-slate-800 font-sans relative flex flex-col">
      
      {/* 導覽列：登入後自動加載完備的 6 大模組選單連結 */}
      {session ? (
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm shrink-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            
            {/* 左側 BRAND LOGO + 完全體選單連結 */}
            <div className="flex items-center gap-8">
              <Link to="/dashboard" className="flex items-center gap-2 group shrink-0">
                <div className="w-8 h-8 bg-slate-900 group-hover:bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold transition-colors">D</div>
                <span className="font-serif font-bold text-slate-900 tracking-wide hidden lg:block">Algorithms</span>
              </Link>
              
              {/* 💻 電腦桌面版：完備的 6 大核心頁面導覽選單 */}
              <nav className="hidden md:flex items-center gap-6 lg:gap-8">
                <Link to="/dashboard" className={getNavLinkClass('/dashboard')}>學習主頁</Link>
                <Link to="/course/cs-201" className={getNavLinkClass('/course/cs-201')}>課程大綱</Link>
                <Link to="/classroom" className={getNavLinkClass('/classroom')}>虛擬教室</Link>
                <Link to="/library" className={getNavLinkClass('/library')}>共學資源</Link>
                <Link to="/feedback" className={getNavLinkClass('/feedback')}>自我評量</Link>
                <Link to="/completion" className={getNavLinkClass('/completion')}>結業證書</Link>
              </nav>
            </div>
            
            {/* 右側 使用者狀態與登出按鈕 */}
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

          {/* 📱 手機行動版底部/下方快捷導航面板 (因應按鈕增加至 6 個，加入自適應 flex-wrap 與間距優化) */}
          <nav className="md:hidden flex flex-wrap justify-around border-t border-slate-100 bg-white py-2 px-1 text-[11px] font-bold shadow-inner gap-x-2 gap-y-1">
            <Link to="/dashboard" className={`px-2 py-0.5 rounded-md ${location.pathname === '/dashboard' ? 'bg-blue-50 text-blue-600' : 'text-slate-500'}`}>主頁</Link>
            <Link to="/course/cs-201" className={`px-2 py-0.5 rounded-md ${location.pathname === '/course/cs-201' ? 'bg-blue-50 text-blue-600' : 'text-slate-500'}`}>大綱</Link>
            <Link to="/classroom" className={`px-2 py-0.5 rounded-md ${location.pathname === '/classroom' ? 'bg-blue-50 text-blue-600' : 'text-slate-500'}`}>教室</Link>
            <Link to="/library" className={`px-2 py-0.5 rounded-md ${location.pathname === '/library' ? 'bg-blue-50 text-blue-600' : 'text-slate-500'}`}>資源</Link>
            <Link to="/feedback" className={`px-2 py-0.5 rounded-md ${location.pathname === '/feedback' ? 'bg-blue-50 text-blue-600' : 'text-slate-500'}`}>評量</Link>
            <Link to="/completion" className={`px-2 py-0.5 rounded-md ${location.pathname === '/completion' ? 'bg-blue-50 text-blue-600' : 'text-slate-500'}`}>證書</Link>
          </nav>
        </header>
      ) : (
        <TopNavigation /> // 尚未登入時，顯示預設的簡單未登入導覽列
      )}
      
      {/* 核心內容路由渲染區 */}
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
      
      {/* AI 助教懸浮球 */}
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