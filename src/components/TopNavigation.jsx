import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function TopNavigation() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 控制手機選單開關的狀態

  const navLinks = [
    { path: '/', label: '1. 註冊' },
    { path: '/dashboard', label: '2. 儀表板' },
    { path: '/course/ai-102', label: '3. 課程資訊' },
    { path: '/classroom', label: '4. 虛擬教室' },
    { path: '/library', label: '5. 資源庫' },
    { path: '/feedback', label: '6. 回饋' },
    { path: '/completion', label: '7. 結業' },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* 左側 Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-serif font-bold tracking-widest text-xs">
            LMS
          </div>
          <span className="font-serif font-bold text-slate-800 tracking-wide">學習系統</span>
        </div>
        
        {/* 電腦版選單 (大螢幕才顯示: md:flex) */}
        <div className="hidden md:flex gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link 
                key={link.path} 
                to={link.path} 
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-slate-900 text-white shadow-sm' 
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* 手機版漢堡按鈕 (大螢幕隱藏: md:hidden) */}
        <button 
          className="md:hidden p-2 text-slate-600 hover:text-slate-900"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          )}
        </button>
      </div>

      {/* 手機版下拉選單 */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-2 shadow-lg absolute w-full">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link 
                key={link.path} 
                to={link.path} 
                onClick={() => setIsMenuOpen(false)} // 點擊後自動收起選單
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-slate-900 text-white shadow-sm' 
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}