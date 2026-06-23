import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function Registration() {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const navigate = useNavigate();

  // 🌟 UX 優化：如果已經登入，直接踢回 Dashboard，不讓他們看到登入頁面
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/dashboard');
      }
    };
    checkSession();
  }, [navigate]);

  // 處理註冊 (需要 Email 驗證)
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage({ text: error.message, type: 'error' });
    } else {
      // 註冊成功，提示去信箱收信
      setMessage({ 
        text: '註冊成功！請檢查您的信箱並點擊驗證連結，驗證後即可登入。', 
        type: 'success' 
      });
      // 註冊完後切換回登入畫面，等他們驗證完回來登入
      setIsLoginView(true); 
    }
    setLoading(false);
  };

  // 處理登入
  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // 若 Email 尚未驗證，Supabase 會在這裡報錯 "Email not confirmed"
      setMessage({ text: error.message, type: 'error' });
    } else {
      // 登入成功，跳轉到 Dashboard
      navigate('/dashboard');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] flex items-center justify-center p-6 animate-fade-in">
      <div className="max-w-md w-full">
        
        {/* Logo 區塊 */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg shadow-slate-900/20">
            D
          </div>
          <h1 className="text-3xl font-serif text-slate-900 mb-2">
            Data Structures & Algorithms
          </h1>
          <p className="text-slate-500 mb-4">基於學習科學的適應性演算法訓練平台</p>
          
          {/* 🌟 教授規定的姓名與學號標示區塊 (充滿設計感的開發者徽章) */}
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-4 py-2 rounded-full shadow-sm">
            
            <span className="text-sm font-bold text-blue-800 tracking-wide">
              1146023宋昱蓓
            </span>
          </div>
        </div>

        {/* 登入/註冊卡片 */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            {isLoginView ? '學員登入' : '建立帳號'}
          </h2>

          {/* 訊息提示區塊 (成功或錯誤) */}
          {message.text && (
            <div className={`p-4 rounded-xl mb-6 text-sm font-medium ${
              message.type === 'error' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-green-50 text-green-700 border border-green-100'
            }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={isLoginView ? handleSignIn : handleSignUp} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">電子郵件 (Email)</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                placeholder="alex@example.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">密碼 (Password)</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className={`w-full text-white font-bold py-3.5 rounded-xl shadow-lg transition-all ${
                loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-[#2563EB] hover:bg-blue-600 hover:-translate-y-0.5 shadow-blue-500/30'
              }`}
            >
              {loading ? '處理中...' : (isLoginView ? '登入系統' : '註冊帳號 (需 Email 驗證)')}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-500 border-t border-slate-100 pt-6">
            {isLoginView ? '還沒有帳號嗎？' : '已經有帳號了？'}
            <button 
              onClick={() => {
                setIsLoginView(!isLoginView);
                setMessage({ text: '', type: '' }); // 切換時清空訊息
              }} 
              className="font-bold text-[#2563EB] ml-2 hover:underline focus:outline-none"
            >
              {isLoginView ? '立即註冊' : '返回登入'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}